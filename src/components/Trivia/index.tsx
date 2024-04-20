import { useEffect, useState } from 'react';
import AddTrivia from './AddTrivia';
import Loader from '../../common/Loader';
import EditTrivia from './EditTrivia';

const TriviaComponents = () => {
  const [triviaData, setTriviaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  let userData = localStorage.getItem('user');
  const [reloadData, setReloadData] = useState(false);
  const toggleRole = async (selectedUserData: any) => {
    console.log('SELECTED USER DATA : ', selectedUserData);
    const url = `https://api.needtopoop.com/trivia/changeStatus/${selectedUserData.id}`;

    try {
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
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  if (userData) {
    userData = JSON.parse(userData).access_token;
  }
  console.log('USER DATA', userData);
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      // Add other headers as needed
      Authorization: `Bearer ${userData}`,
    };

    fetch('https://api.needtopoop.com/trivia', {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setTriviaData([]);
        } else {
          setTriviaData(data.reverse());
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [reloadData]);
  console.log(triviaData);

  const deleteTrivia = (id: any) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData}`,
    };

    fetch(`https://api.needtopoop.com/trivia/${id}`, {
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
  };
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = triviaData.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(triviaData.length / itemsPerPage);

  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1);
  return (
    <>
      {' '}
      <div className=" px-5 pt-6 pb-2.5">
        <AddTrivia reloadData={reloadData} setReloadData={setReloadData} />
      </div>
      <div className="relative overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
        <table className="w-full  table-auto text-left  ">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 fond-bold text-xl text-black dark:text-white xl:pl-11">
                Trivia
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-xl	 text-black dark:text-white">
                Like
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-xl	text-black dark:text-white">
                Dislike
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Created At
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Approved
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((data, key) => {
                console.log('o : ', data);
                return (
                  <>
                    <tr className="" key={key}>
                      <th
                        scope="row"
                        className=" max-w-28	 border-b border-[#eee] px-6 py-4  dark:border-strokedark"
                      >
                        {data['trivia'] ?? '--'}
                      </th>
                      <td className=" border-b border-[#eee] px-6 py-4  dark:border-strokedark">
                        {' '}
                        {data['like'] ?? '--'}
                      </td>
                      <td className=" border-b border-[#eee] px-6 py-4  dark:border-strokedark">
                        {' '}
                        {data['dislike'] ?? '--'}
                      </td>
                      <td className="border-b border-[#eee] px-6 py-4  dark:border-strokedark">
                        {new Date(data['createdAt'])
                          .toLocaleString()
                          .replaceAll('/', '-') ?? '--'}
                      </td>
                      <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            id="switch"
                            type="checkbox"
                            className="peer sr-only"
                            checked={data['approved']}
                            onChange={() => toggleRole(data)}
                          />
                          <label htmlFor="switch" className="hidden"></label>
                          <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                        </label>
                      </td>
                      <td className="border-b border-[#eee] px-6 py-4  dark:border-strokedark">
                        <span className="inline-flex space-x-2">
                          <button
                            onClick={() => deleteTrivia(data['id'])}
                            className="mb-4 block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            type="button"
                          >
                            Delete
                          </button>{' '}
                          <EditTrivia
                            reloadData={reloadData}
                            setReloadData={setReloadData}
                            data={data}
                          />
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        {triviaData.length > itemsPerPage && (
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

export default TriviaComponents;
