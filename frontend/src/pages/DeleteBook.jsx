import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const DeleteBook = () => {
  const { id } = useParams(); // Get book ID from URL params
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteBook = async () => {
    try {
      setLoading(true);
      // Sending DELETE request to the backend using Axios
      await axios.delete(`http://localhost:5555/books/${id}`);
      setLoading(false);
      // Navigate back to the home page after successful book deletion
      navigate('/');
    } catch (error) {
      console.error('Error deleting book:', error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 mb-6 block text-lg font-semibold hover:underline">
        &larr; Back to Home
      </Link>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Spinner />
        </div>
      ) : (
        <div>
          <p className="text-red-500 font-semibold mb-4">
            Are you sure you want to delete this book? This action cannot be undone.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setConfirmDelete(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Delete
            </button>
            <button
              onClick={() => navigate(`/books/details/${id}`)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Cancel
            </button>
          </div>
          {confirmDelete && (
            <div className="mt-6">
              <button
                onClick={handleDeleteBook}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                Confirm Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
