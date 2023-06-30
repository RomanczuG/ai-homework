import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu } from "react-icons/hi";

export const DashboardNavbar = ({ onUpgradeClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <div className="bg-[#F8F9FA] shadow sticky top-0 z-10 md:px-20 ">
      <nav className="mx-auto px-6 md:px-20 py-6">
        <div className="flex items-center justify-between md:justify-between">
          <div className={`${isMenuOpen ? "hidden" : "block"} text-[#212529] font-semibold text-lg`}>
            <Link to="/" className="hover:text-[#FF6E00]">
              Study Smarter Now!
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-6 nav-menu">
            <AnimatePresence>
              {(isMenuOpen || window.innerWidth > 768) && (
                <motion.ul
                  className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={variants}
                >
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-[#212529] hover:text-[#FF6E00] transition-all duration-200"
                    >
                      My Classes
                    </Link>
                  </li>
                  {/* <li>
                    <div
                      className="text-[#212529] hover:text-[#FF6E00] transition-all duration-200 cursor-pointer"
                      onClick={onUpgradeClick}
                    >
                      Upgrade
                    </div>
                  </li> */}
                  <li>
                    <Link
                      to="/dashboard/account"
                      className={`text-white bg-[#FFC700] hover:bg-[#FF6E00] px-4 py-2 border text-md border-[#FFC700] rounded-md transition-all duration-200`}
                    >
                      Account
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="md:hidden">
            <button aria-label="Toggle menu" onClick={toggleMenu}>
              <HiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
