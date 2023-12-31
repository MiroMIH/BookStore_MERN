import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center absolute bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} My Book App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
