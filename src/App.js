import React from 'react';
import logo from './hero_image.png';


function App() {
  return (
    <div className="bg-[#252D62]">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-lg">
            <span>Your Tool Name</span>
          </div>
          <div>
            <ul className="flex items-center space-x-6">
              <li>
                <a href="#features" className="text-white hover:text-gray-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-white hover:text-gray-300">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-gray-300">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <h1 className="text-4xl font-semibold text-white">
            Free & Instant AI Help with Homework
            </h1>
            <p className="mt-4 text-lg text-white">
            Upload your PDF slides and let our AI transform them into comprehensive, easy-to-understand notes.
            </p>
            <button className="mt-6 px-6 py-2 bg-white text-252D62 font-semibold rounded-lg">
              Join Waitlist
            </button>
          </div>
          <div className="w-1/2">
            <img src={logo} alt="Logo" className="w-full h-auto" />
          </div>
        </div>
      </header>

      {/* Add more sections as needed */}
    </div>
  );
}

export default App;
