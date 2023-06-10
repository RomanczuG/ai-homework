import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const DashboardNavbar = ({ onUpgradeClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };




  return (
    <div className="bg-[#F0FFE0] sticky top-0 z-10 px-20 ">
      <nav className="mx-auto px-6 md:px-20 py-6">
        <div className="flex items-center justify-between md:justify-between">
          <div className= {`${isMenuOpen ? "hidden" : "block"} text-[#252D62] font-semibold text-lg`}>
            <Link to="/" className="hover:text-[#FF6E00]">
              Study Smarter Now!
            </Link>
          </div>
          
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex items-center justify-center space-x-6 nav-menu`}
          >
            <ul
              className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
            >
              <li>
                <Link
                  to="/dashboard"
                  className="text-[#252D62] hover:text-[#FF6E00] transition-all duration-200"
                >
                  My Classes
                </Link>
              </li>
              <li>
              <div
        className="text-[#252D62] hover:text-[#FF6E00] transition-all duration-200"
        onClick={onUpgradeClick}
      >
        Upgrade
      </div>
              </li>
              <li>
              <Link
                to="/dashboard/account"
                className={`text-white bg-[#FFC700] hover:bg-[#FF6E00] px-4 py-2 border text-md border-[#FFC700] rounded-md transition-all duration-200`}
              >
                Account
              </Link>
            </li>
            </ul>
            {/* <div className={`md:block`}> */}
             
            {/* </div>/ */}
          </div>
          <div className="md:hidden">
            <button aria-label="buy product" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="24"
                height="24"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a1 1 0 0 1 0 2H2a1 1 0 1 1 0-2h16zM3 5a1 1 0 1 0 0-2h12a1 1 0 1 0 0 2H3zm0 14a1 1 0 1 0 0-2h12a1 1 0 1 0 0 2H3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        
      </nav>
    </div>
  );
};
