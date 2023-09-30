import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const CreateBooks = () => {
  const [data, setData] = useState({
    title: '',
    ISBN: '',
    publicationYear: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = async () => {
    try {
      setLoading(true);
      // Sending data to the backend using Axios POST request
      await axios.post('http://localhost:5555/books', data);
      setLoading(false);
      // Navigate back to the home page after successful book creation
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
            Save Book
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBooks;




/* we are going to create a book using react
i am going ot assume we are going to need to save the input by the user
and useState hook or something to save the data
then pass the data the backend which iam  going to assume we
will have to use useEffect hook to connect it 
we will be using the spinner and backbutton alreadty defined and axios
with useNaviate from routerd dom
i will want to save the title the ISBN and the publich year of the book
using useState hook with null and loading setloading usestate hook
and navigate constant with usenavigate
and define const handlesavebook function with the data constant and setloading axios with post
define return with backbutton and the loading? with the  input for each data already mentioned

*/