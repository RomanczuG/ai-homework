import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFeaturesClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    scrollToSection("features");
  };

  const handleAuthorClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    scrollToSection("about-author");
  };
  return (
    <div className="bg-[#252D62] sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold text-lg">
            <Link to="/" className="hover:text-gray-300">
              Study Smarter Now!
            </Link>
          </div>
          <div>
            <ul className="hidden md:flex items-center space-x-6">
              <li>
              <span
          onClick={handleFeaturesClick}
          className="text-white hover:text-gray-300 cursor-pointer"
        >
          Features
        </span>
              </li>
              <li>
              <span
          onClick={handleAuthorClick}
          className="text-white hover:text-gray-300 cursor-pointer"
        >
          About the Author
        </span>
              </li>
              <li>
                <Link to="/faq" className="text-white hover:text-gray-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-white hover:text-gray-300"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/tool"
                  className="text-white hover:text-gray-300 px-4 py-2 border border-white rounded-md"
                >
                  Start Using the Tool
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
