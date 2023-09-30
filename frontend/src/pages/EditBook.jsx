import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const EditBook = () => {
  const { id } = useParams(); // Get book ID from URL params
  const [data, setData] = useState({
    title: '',
    ISBN: '',
    publicationYear: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        const bookData = response.data; // Assuming the response contains book details
        setData(bookData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSaveBook = async () => {
    try {
      setLoading(true);
      // Sending updated data to the backend using Axios PUT request
      await axios.put(`http://localhost:5555/books/${id}`, data);
      setLoading(false);
      // Navigate back to the home page after successful book edit
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
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
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Title:</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">ISBN:</label>
            <input
              type="text"
              value={data.ISBN}
              onChange={(e) => setData({ ...data, ISBN: e.target.value })}
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Publication Year:</label>
            <input
              type="text"
              value={data.publicationYear}
              onChange={(e) => setData({ ...data, publicationYear: e.target.value })}
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </div>
          <button
            onClick={handleSaveBook}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
