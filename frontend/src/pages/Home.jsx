import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Header from '../components/Header'; // Import Header component
import Footer from '../components/Footer'; // Import Footer component

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Header /> {/* Include Header component */}
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {loading ? (
        <Spinner />
      ) : (
        books.map((book, index) => (
          <div key={book._id} className="border border-gray-300 rounded-md p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-500 mb-1">{book.ISBN}</p>
              <p className="text-gray-500 mb-4">{book.publicationYear}</p>
              <div className="flex items-center">
                <BsInfoCircle className="text-green-600 mr-2" />
                <span className="text-sm text-gray-600 hover:underline">
                  <Link to={`/books/details/${book._id}`}>Details</Link>
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Link to={`/books/edit/${book._id}`} className="text-yellow-600 hover:underline">
                <AiOutlineEdit className="text-2xl mr-2" />
                Edit
              </Link>
              <Link to={`/books/delete/${book._id}`} className="text-red-600 hover:underline">
                <MdOutlineDelete className="text-2xl mr-2" />
                Delete
              </Link>
            </div>
          </div>
        ))
      )}
      <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col justify-center items-center">
        <Link to="/books/create" className="text-sky-400 text-5xl">
          <MdOutlineAddBox />
        </Link>
        <span className="text-gray-600 mt-2">Add New Book</span>
      </div>
    </div>
    <Footer /> {/* Include Footer component */}
    </div>
  );
};

export default Home;
