import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import { FaCheck, FaX } from 'react-icons/fa6';

const ReviewComponents = () => {
  const [poopData, setPoopData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [addressData, setAddressData] = useState({});
  const [selectedRowData, setSelectedRowData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  let userData = localStorage.getItem('user');
  const [reloadData, setReloadData] = useState(false);

  if (userData) {
    userData = JSON.parse(userData).access_token;
  }

  const toggleRole = async (selectedUserData: any) => {
    console.log('SELECTED USER DATA : ', selectedUserData);
    const url = `https://api.needtopoop.com/review/changeStatus/${selectedUserData.id}`;

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

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData}`,
    };

    fetch('https://api.needtopoop.com/review', {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.status) {
          setPoopData([]);
        } else {
          setPoopData(data);

          // Fetch address for each latitude and longitude pair
          const promises = data.map(async (item: any) => {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${item.latitude},${item.longitude}&key=AIzaSyAio7xWYbTSPn9tXZygNECd5h0Rejwoagc`,
            );
            const json = await response.json();
            setAddressData((prevData) => ({
              ...prevData,
              [item.id]:
                json.results[0]?.formatted_address ?? 'Address not found',
            }));
          });
          await Promise.all(promises);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [reloadData]);
  const deleteTrivia = (id: any) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData}`,
    };

    fetch(`https://api.needtopoop.com/review/${id}`, {
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
  const currentItems = poopData.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(poopData.length / itemsPerPage);

  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
      <div className="px-5 pt-6 pb-2.5"></div>
      <div className="relative overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-red dark:bg-boxdark ">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-bold text-xl text-black dark:text-white">
                Id
              </th>
              <th className="py-4 px-4 font-medium text-xl text-black dark:text-white">
                Address
              </th>
              <th className="py-4 px-4 font-medium text-xl text-black dark:text-white">
                Comments
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Created At
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Created By
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
            {currentItems.map((data, index) => {
              const itemIndex = firstItemIndex + index + 1; // +1 to start index from 1 instead of 0
              return (
                <tr key={itemIndex}>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {itemIndex}
                  </td>

                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {addressData[data['id']] ?? '--'}
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {data['comments'] ?? '--'}
                  </td>

                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {data['createdAt']
                      ? new Date(data['createdAt'])
                          .toLocaleString()
                          .replaceAll('/', '-')
                      : '--'}
                  </td>
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    {data['user']['userName'] ?? '--'}
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
                  <td className="border-b border-[#eee] px-6 py-4 dark:border-strokedark">
                    <span className="inline-flex space-x-2">
                      <button
                        onClick={() => deleteTrivia(data['id'])}
                        className="mb-4 text-white bg-red-700	 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        type="button"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRowData(data);
                          toggleModal();
                        }}
                        className="mb-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        type="button"
                      >
                        View Details
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
      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
        >
          <div className="relative p-4 w-full max-w-md h-auto">
            <div className="relative px-4 bg-white rounded-lg shadow dark:bg-gray-700">
              <h1 className="py-4 font-bold text-xl text-black text-center">
                Details
              </h1>
              <h1 className="py-4 text-xl text-black flex items-center">
                <span className="font-bold">Auto Flushing Toilets:</span>
                <span className="ml-2">
                  {selectedRowData['autoFlushingToilets'] === null ? (
                    '--'
                  ) : selectedRowData['autoFlushingToilets'] ? (
                    <FaCheck />
                  ) : (
                    <FaX />
                  )}
                </span>
              </h1>
              <h1 className="py-4  text-xl text-black flex items-center">
                <span className="font-bold"> Baby Changing Table: </span>
                <span className="ml-2">
                  {selectedRowData['babyChangingtable'] === null ? (
                    '--'
                  ) : selectedRowData['babyChangingtable'] ? (
                    <FaCheck />
                  ) : (
                    <FaX />
                  )}
                </span>
              </h1>
              <h1 className="py-4  text-xl text-black flex items-center">
                <span className="font-bold">Free Toilet: </span>
                <span className="ml-2">
                  {selectedRowData['freeToilet'] === null ? (
                    '--'
                  ) : selectedRowData['freeToilet'] ? (
                    <FaCheck />
                  ) : (
                    <FaX />
                  )}
                </span>
              </h1>
              <h1 className="py-4  text-xl text-black flex items-center">
                <span className="font-bold">Hand Dryer: </span>
                <span className="ml-2">
                  {selectedRowData['handDryer'] === null ? (
                    '--'
                  ) : selectedRowData['handDryer'] ? (
                    <FaCheck />
                  ) : (
                    <FaX />
                  )}
                </span>
              </h1>
              <h1 className="py-4 text-xl text-black flex items-center">
                <span className="font-bold">Handicap Accessible: </span>
                <span className="ml-2">
                  {selectedRowData['handicapAccessible'] === null ? (
                    '--'
                  ) : selectedRowData['handicapAccessible'] ? (
                    <FaCheck />
                  ) : (
                    <FaX />
                  )}
                </span>
              </h1>
              <h1 className="py-4 text-xl text-black flex items-center">
                <span className="font-bold">Motion Activates Fixtures: </span>
                <span className="ml-2">
                  {selectedRowData['motionActivatesFixtures'] === null ? (
                    '--'
                  ) : selectedRowData['motionActivatesFixtures'] ? (
                    <FaCheck />
                  ) : (
                    <FaX />
                  )}
                </span>
              </h1>
              <h1 className="py-4  text-xl text-black">
                <span className="font-bold">Number Of Stalls: </span>
                <span className="ml-2">
                  {selectedRowData['numberOfStalls'] ?? '--'}
                </span>
              </h1>
              <h1 className="py-4 text-xl text-black flex items-center">
                <span className="font-bold">Paper Towels: </span>
                <span className="ml-2">
                  {selectedRowData['paperTowels'] === null ? (
                    '--'
                  ) : selectedRowData['paperTowels'] ? (
                    <FaCheck />
                  ) : (
                    <FaX />
                  )}
                </span>
              </h1>
              <h1 className="py-4  text-xl text-black">
                <span className="font-bold">Ratings: </span>
                <span className="ml-2">
                  {selectedRowData['ratings'] ?? '--'}
                </span>
              </h1>
              <h1 className="py-4  text-xl text-black flex items-center">
                <span className="font-bold">Seat Covers: </span>
                <span className="ml-2">
                  {selectedRowData['seatCovers'] === null ? (
                    '--'
                  ) : selectedRowData['seatCovers'] ? (
                    <FaCheck />
                  ) : (
                    <FaX />
                  )}
                </span>
              </h1>
              <h1 className="py-4  text-xl text-black">
                <span className="font-bold">Latitude: </span>
                <span className="ml-2">
                  {selectedRowData['latitude'] ?? '--'}
                </span>
              </h1>
              <h1 className="py-4  text-xl text-black">
                <span className="font-bold">Longitude: </span>
                <span className="ml-2">
                  {selectedRowData['longitude'] ?? '--'}
                </span>
              </h1>
              <div className="pagination flex justify-center my-6">
                <button
                  onClick={toggleModal}
                  type="button"
                  className=" cursor-pointer rounded-lg border border-primary bg-primary py-3 px-8 mb-6 text-white transition hover:bg-opacity-90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewComponents;
