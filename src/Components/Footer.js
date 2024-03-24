import React from 'react';
import Card from 'react-bootstrap/Card';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white rounded-lg m-5">
      <Card>
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            qolvap © {currentYear}. All Rights Reserved.
          </span>
        </div>
      </Card>
    </footer>
  );
};

export default Footer;
