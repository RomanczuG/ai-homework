import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-[#F0FFE0] sticky top-0 z-10">
      <nav className="mx-auto px-6 md:px-20 py-6">
        <div className="flex items-center justify-around">
          <div className="text-[#252D62] font-semibold text-lg">
            <Link to="/" className="hover:text-[#FF6E00]">
              Study Smarter Now!
            </Link>
          </div>
          <button
            className="md:hidden text-[#252D62] focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className={`flex items-center justify-center space-x-6 ${mobileMenuOpen ? '' : 'hidden'} md:flex`}>
            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <li>
                <span
                  onClick={handleFeaturesClick}
                  className="text-[#252D62] hover:text-[#FF6E00] cursor-pointer transition-all duration-200"
                >
                  Features
                </span>
              </li>
              <li>
                <span
                  onClick={handleAuthorClick}
                  className="text-[#252D62] hover:text-[#FF6E00] cursor-pointer transition-all duration-200"
                >
                  About the Author
                </span>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-[#252D62] hover:text-[#FF6E00] transition-all duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-[#252D62] hover:text-[#FF6E00] transition-all duration-200"
                >
                  How It Works
                </Link>
              </li>
            </ul>
            
          </div>
          <div>
              <Link
                to="/tool"
                className="text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4 py-2 border border-[#FFC700] rounded-md transition-all duration-200"
              >
                Start Using the Tool
              </Link>
            </div>
       
          </div>
      </nav>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-0"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};
