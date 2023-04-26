import React from "react";
import logo from "../hero.svg";
import { ClipLoader } from "react-spinners";
export const HeroSection = ({
  waitlistData,
  error,
  loading,
  submitWaitlist,
}) => {
  return (
<header className="container mx-auto px-4 py-20 flex flex-col items-center md:items-start md:flex-row ">
        <div className="md:w-1/2 self-center">
          <h1 className="text-4xl font-semibold text-white text-center md:text-left">
            Boost Your Learning with AI-Powered Homework Help
          </h1>
          <p className="mt-4 text-lg text-white text-center md:text-left">
            Upload your homework pdf and let our AI generate comprehensive,
            easy-to-understand study notes tailored to help you learn and excel.
          </p>
          <div className="mt-4 w-full md:w-auto">
            {!waitlistData ? (
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
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 w-full transition duration-300"
                  >
                    {loading ? (
                      <ClipLoader size={25} color={"#ffffff"} loading={true} />
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
            ) : (
              <div className="text-white">Thank you for signing up.</div>
            )}
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2">
          <img src={logo} alt="Logo" className="w-full h-auto" />
        </div>
      </header>
  );
};
