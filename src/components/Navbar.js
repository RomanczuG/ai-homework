import React from "react";

export const Navbar = () => {
  return (
    <div className="bg-[#252D62] sticky top-0 z-10">
    <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-lg">
            <span>StudyBoost.app</span>
          </div>
          <div>
            <ul className="hidden md:flex items-center space-x-6">
              <li>
                <a href="#features" className="text-white hover:text-gray-300">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about-author"
                  className="text-white hover:text-gray-300"
                >
                  About the Author
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
  );
};
