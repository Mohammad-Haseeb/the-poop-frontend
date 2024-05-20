import React, { useEffect, useState } from 'react';
// import AddPoop from './AddPoop';
import Loader from '../../common/Loader';
import { FaCheck, FaX } from 'react-icons/fa6';
import { FaCheck as FaCheck2 } from "react-icons/fa";
import { baseUrl } from '../../constants/data';

// import EditPoop from './EditPoop';

const PoopComponents = () => {
  const [poopData, setPoopData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showConfirmModel, setShowConfirmModel] = useState(false)
  let userData = localStorage.getItem('user');
  const [reloadData, setReloadData] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [loading, setLoading] = useState < boolean > (true);

  if (userData) {
    userData = JSON.parse(userData).access_token;
  }

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData}`,
    };

    setLoading(true)
    fetch(`${baseUrl}/users`, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setPoopData([]);
        } else {
          setPoopData(
            data.sort(
              (a: Date, b: Date) =>
                new Date(b.createdAt) - new Date(a.createdAt),
            ),
          );
        }
        setLoading(false)
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [reloadData]);

  const toggleRole = async (selectedUserData: any) => {
    console.log('SELECTED USER DATA : ', selectedUserData);
    const url = `https://api.needtopoop.com/users/changeRole/${selectedUserData.id}`;

    try {
      setLoading(true)
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData}`,
        },

        // body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        // setReloadData(true);
        setReloadData(!reloadData);
        console.log('user role updated successfully:', data);
        return data;
      } else {
        throw new Error(`HTTP error: ${response.status}`);
      }
      setLoading(false)
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  const deleteTrivia = (id: any) => {
    console.log(id)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData}`,
    };

    // fetch(`https://api.needtopoop.com/users/${id}`, {
    setLoading(true)
    fetch(`${baseUrl}/users/${id}`, {
      method: 'DELETE',
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete trivia');
        }
        setReloadData(!reloadData); // Refresh the data after deletion
      })
      .catch((error) => console.error('Error deleting trivia:', error));
    setLoading(false)
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = poopData.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(poopData.length / itemsPerPage);

  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1);

  const handleConfirmModel = (id: any) => {
    setIdToDelete(id);
    setShowConfirmModel(true)
  }

  return (
    <>
      {showConfirmModel && <div className='w-full h-full grid place-items-center absolute top-0 left-0 bg-black/20 z-[999999]'>
        <div className='bg-white p-4 rounded-md shadow w-fit'>
          <p>Are you sure want to delete this user!</p>
          <div className='flex gap-8 mt-3 w-fit mx-auto'>
            <span onClick={() => setShowConfirmModel(false)} className='py-1 cursor-pointer text-red-500'>Cancel</span>
            <span onClick={() => {
              deleteTrivia(idToDelete);
              setShowConfirmModel(false)
            }} className='py-1 cursor-pointer text-green-600'>Yes</span>
          </div>
        </div>
      </div>}
      <div className="px-5 pt-6 pb-2.5">
        {/* <AddPoop reloadData={reloadData} setReloadData={setReloadData} /> */}
      </div>
      {loading && <div style={{ animationDuration: "1s" }} className='w-14 z-[999] h-15 animate-rotating  border-4 rounded-xl border-red-700 bg-transparent 500 absolute top[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>

      </div>}
      <div className="relative overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-bold text-xl text-black dark:text-white">
                Id
              </th>
              <th className="py-4 px-4 font-bold text-xl text-black dark:text-white">
                Email
              </th>

              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Verified
              </th>

              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Created At
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Change Role
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => {
              console.log(
                'Name : ',
                data['userName'],
                ' :role ',
                data['admin'],
              );
              const itemIndex = firstItemIndex + index + 1; // +1 to start index from 1 instead of 0
              return (
                <tr key={itemIndex}>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {itemIndex}
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {data['email'] ?? '--'}
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {data['userName'] ?? '--'}
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {data['admin'] ? 'Admin' : 'User'}
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {data['autoFlushingToilets'] === null ? (
                      '--'
                    ) : data['is_verified'] ? (
                      <FaCheck />
                    ) : (
                      <FaX />
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {data['createdAt']
                      ? new Date(data['createdAt'])
                        .toLocaleString()
                        .replaceAll('/', '-')
                      : '--'}
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        id="switch"
                        type="checkbox"
                        className="peer sr-only"
                        checked={data['admin']}
                        onChange={() => toggleRole(data)}
                      />
                      <label htmlFor="switch" className="hidden"></label>
                      <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                    </label>
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    <span className="inline-flex space-x-2">
                      <button
                        onClick={() => handleConfirmModel(data['id'])}
                        // onClick={() => deleteTrivia(data['id'])}
                        className="mb-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        type="button"
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {poopData.length > itemsPerPage && (
          <div className="pagination flex justify-center my-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PoopComponents;
