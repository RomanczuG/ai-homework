import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#F0FFE0] py-4">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="flex space-x-4">
          <Link to="/privacy-policy" className="text-black font-semibold text-base hover:text-[#FF6E00]">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-black font-semibold text-base hover:text-[#FF6E00]">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
