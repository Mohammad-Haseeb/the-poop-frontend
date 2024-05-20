import React, { useState } from 'react';
import { baseUrl } from '../../constants/data';
import { CiEdit } from 'react-icons/ci';

const EditReviewComment = ({
  reloadData,
  setReloadData,
  data,
}: {
  reloadData: boolean;
  setReloadData: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [joke, setJoke] = useState(data['joke'] ?? '');
  const [comment, setComment] = useState(data['comments'] ?? '');
  let userData = localStorage.getItem('user');
  if (userData) {
    userData = JSON.parse(userData).access_token;
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const url = `${baseUrl}/review/${data.id}`;
    const body = {
      ...data,
      comments: comment,
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
        console.log('poop updated successfully:', data);
        setIsModalOpen(false);
        return data;
      } else {
        throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating poop:', error);
    }
  };
  return (
    <>
      <CiEdit
        onClick={toggleModal}
        className='size-8 cursor-pointer' />
      {/* <button
        onClick={toggleModal}
        className="mb-4 block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        type="button"
      >
        Edit Comment
      </button> */}

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
                    <label className="mb-2.5 block font-medium text-gray-900 dark:text-gray-300">
                      Comment
                    </label>
                    <textarea
                      placeholder="Latitude"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-black outline-none focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Edit Toilet"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-red-800 p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                </form>

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

export default EditReviewComment;
