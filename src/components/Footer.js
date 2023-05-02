import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#252D62] py-4">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="flex space-x-4">
          <Link to="/privacy-policy" className="text-white font-semibold text-base">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-white font-semibold text-base">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
