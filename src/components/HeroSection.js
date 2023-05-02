import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export const HeroSection = ({
  waitlistData,
  error,
  loading,
  submitWaitlist,
}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <header className="container mx-auto px-4 py-20 flex flex-col items-center md:items-start md:flex-row ">
      <div className="md:w-1/2 self-center">
        <h1 className="text-4xl font-semibold text-white text-center md:text-left">
          Boost Your Learning with AI-Powered Homework and Exam Help
        </h1>
        <p className="mt-4 text-lg text-white text-center md:text-left">
          Upload your homework pdf and let our AI generate comprehensive,
          easy-to-understand study notes tailored to help you learn and excel.
          Improve your test-taking strategies, achieve academic success, and
          master learning strategies with ease.
        </p>

        <div className="mt-4 w-full md:w-auto">
          {!waitlistData ? (
            <>
              <button
                onClick={openModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 w-full transition duration-300 "
              >
                Sign Up for Newsletter
              </button>
              {showModal && (
                <>
                  <div
                    onClick={closeModal}
                    className="fixed z-0 inset-0 bg-black opacity-50"
                  ></div>
                  <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="relative bg-white p-8 rounded shadow-md w-full max-w-md">
                        <button
                          onClick={closeModal}
                          className="mr-2 absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                        >
                          &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">
                          Sign up for our newsletter
                        </h2>
                        <form className="w-full">
                          <div className="flex flex-col space-y-4">
                            <div className="flex flex-col space-y-2">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Please enter your email"
                                autoComplete="email"
                                onChange={(e) => e.stopPropagation()}
                                required
                                className="rounded-md border border-gray-200 text-base p-2 text-gray-700"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              disabled={loading}
                              onClick={() => {
                                submitWaitlist({
                                  email: document.getElementById("email").value,
                                });
                                closeModal();
                              }}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 w-full transition duration-300"
                            >
                              {loading ? (
                                <ClipLoader
                                  size={25}
                                  color={"#ffffff"}
                                  loading={true}
                                />
                              ) : (
                                "Join the Waitlist"
                              )}
                            </button>
                            {error && (
                              <div className="text-center mt-2 text-xs text-red-500 px-6">
                                {error}
                              </div>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-white">Thank you for signing up.</div>
          )}
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 w-full transition duration-300 mt-4">
            <Link to="/tool">Start Using the Tool</Link>
          </button>
        </div>
      </div>
      <div className="mt-8 md:mt-0 md:w-1/2">
        {/* <img src={logo} alt="Logo" className="w-full h-auto" /> */}
        <img
          src="/hero.png"
          alt="Modern computer displaying online tool"
          className="w-full h-auto"
        />
      </div>
    </header>
  );
};
