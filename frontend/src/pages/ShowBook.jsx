import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaRegClock, FaRegCalendarAlt, FaPencilAlt } from 'react-icons/fa'; 
import { FaHome } from 'react-icons/fa'; // Import Font Awesome Home icon
import axios from 'axios';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const { id } = useParams(); // Get book ID from URL params
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data); // Assuming the response contains book details
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setLoading(false);
      });
  }, [id]); // Re-run effect whenever ID changes

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
  <Link to="/" className="text-blue-500 mb-6 block text-lg font-semibold hover:underline flex items-center justify-center border border-blue-500 rounded-md py-2 px-4 hover:bg-blue-500 hover:text-white transition duration-300">
    <FaHome className="mr-2 text-blue-500" /> Back to Home
  </Link>
    {loading ? (
      <div className="flex justify-center items-center h-32">
        <Spinner />
      </div>
    ) : book ? (
      <div>
        <h2 className="text-3xl font-semibold mb-4">{book.title}</h2>
        <div className="mb-2 text-gray-600 flex items-center">
          <FaPencilAlt className="mr-2 text-gray-500" />
          <span className="font-semibold">ID:</span> {book._id}
        </div>
        <div className="mb-2 text-gray-600 flex items-center">
          <FaRegCalendarAlt className="mr-2 text-gray-500" />
          <span className="font-semibold">Publication Year:</span> {book.publicationYear}
        </div>
        <div className="mb-2 text-gray-600 flex items-center">
          <FaRegClock className="mr-2 text-gray-500" />
          <span className="font-semibold">Create Time:</span> {book.createdAt}
        </div>
        <div className="mb-4 text-gray-600 flex items-center">
          <FaRegClock className="mr-2 text-gray-500" />
          <span className="font-semibold">Last Update Time:</span> {book.updatedAt}
        </div>
        {/* Add more book details as needed */}
      </div>
    ) : (
      <div className="text-red-500 font-semibold">Book not found.</div>
    )}
  </div>

  );
};

export default ShowBook;