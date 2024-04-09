import React, { useState } from 'react';

const EditJoke = ({
  reloadData,
  setReloadData,
  data,
}: {
  reloadData: boolean;
  setReloadData: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joke, setJoke] = useState(data['joke'] ?? '');
  let userData = localStorage.getItem('user');
  if (userData) {
    userData = JSON.parse(userData).access_token;
  }
  console.log('USER DATA', userData);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const url = `https://api.needtopoop.com/jokes/${data.id}`;
    const body = {
      joke: joke,
    };

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData}`,
        },

        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        // setReloadData(true);
        setReloadData(!reloadData);
        console.log('joke updated successfully:', data);
        setIsModalOpen(false);
        return data;
      } else {
        throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating joke:', error);
    }
  };
  return (
    <>
      <button
        onClick={toggleModal}
        className="mb-4 block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        type="button"
      >
        Edit Joke
      </button>

      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
        >
          <div className="relative p-4 w-full max-w-md h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={toggleModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <form onSubmit={submit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Joke
                    </label>
                    {/* <input
                      type="text"
                      placeholder="add joke"
                      required
                      className="w-full rounded-lg border border-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={joke}
                      onChange={(e) => setJoke(e.target.value)}
                    /> */}
                    <textarea
                      placeholder="Edit joke"
                      required
                      className="w-full rounded-lg border border-black bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={joke}
                      onChange={(e) => setJoke(e.target.value)}
                      rows={7} // You can adjust the number of rows based on your design
                    />
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Edit joke"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                </form>
                {/* <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3> */}
                {/* <button
                  onClick={toggleModal}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Yes, I'm sure
                </button> */}
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mb-2 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditJoke;
