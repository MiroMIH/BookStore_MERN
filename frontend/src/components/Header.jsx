import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          My Book App
        </Link>
        {/* Add additional navigation links here */}
      </nav>
    </header>
  );
};

export default Header;
