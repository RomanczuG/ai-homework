import React from "react";
import logo from "./hero.svg";
import feature_1 from "./feature_1.svg";
import feature_2 from "./feature_2.svg";

function App() {
  return (
    <div className="bg-[#252D62] min-h-screen">
      {/* Navbar */}
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

      {/* Hero Section */}

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
            <input
              type="email"
              className="w-full px-3 py-2 md:w-60 bg-white text-252D62 rounded-lg"
              placeholder="Your Email"
            />
          </div>
          <button className="mt-4 w-full md:w-auto px-6 py-2 bg-white text-252D62 font-semibold rounded-lg">
            Join the Waitlist
          </button>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2">
          <img src={logo} alt="Logo" className="w-full h-auto" />
        </div>
      </header>

      {/* Features Section */}

      <section
        id="features"
        className="container mx-auto px-4 py-20 text-white"
      >
        <h2 className="text-4xl font-semibold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col-reverse md:flex-row items-center md:space-x-8">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src={feature_1}
                alt="Get Started"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold">Get Started</h3>
              <p className="mt-4">
                Drag and drop or select your HW in PDF format! StudyBoost's
                intuitive interface makes it simple to upload your files and
                start the AI-driven note generation process.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="md:w-1/2 md:mb-2">
              <img
                src={feature_2}
                alt="Download Your Notes"
                className="w-full h-auto mb-6 md:mb-0 rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold">Download Your Notes</h3>
              <p className="mt-4">
                Our powerful AI creates comprehensive notes, are ready for you
                to download and study effortlessly. Say goodbye to manually
                searching for terms, formulas, descriptions etc. and focus on
                learning and solving the problems more efficiently.
              </p>
            </div>
          </div>
        </div>
        {/* Demo Button */}
        <div className="text-center mt-12 ">
          <button className="text-black mt-4 w-full md:w-auto px-6 py-2 bg-white text-252D62 font-semibold rounded-lg">
            Check out my demo
          </button>
        </div>
      </section>

      {/* About the Author Section */}
      {/* About the Author Section */}
      <section
        id="about-author"
        className="container mx-auto px-4 py-20 text-white"
      >
        <h2 className="text-4xl font-semibold text-center mb-12">
          About the Author
        </h2>
        <div className="flex flex-col items-center">
          {/* Author Bio */}
          <div className="w-full md:w-2/3 text-center">
            <h3 className="text-2xl font-semibold mb-4">Mateusz Romaniuk</h3>
            <p>
              I am a student, and this is one of my side projects. If you love
              coding like me, please consider using another free tool that I
              have made called{" "}
              <a
                href="https://codescribe.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-500"
              >
                codescribe.app
              </a>
              . It helps you document, explain, optimize, and debug code thanks
              to AI.
            </p>
            <p className="mt-4">
              If you like my work, consider following me on Twitter or buying me
              a coffee.
            </p>
            <div className="mt-8 flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-center md:space-x-4">
              <a
                href="https://twitter.com/your_username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black px-6 py-2 bg-white text-252D62 font-semibold rounded-lg"
              >
                Follow on Twitter
              </a>
              <a
                href="https://www.buymeacoffee.com/mateuszcoder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black px-6 py-2 bg-white text-252D62 font-semibold rounded-lg"
              >
                Buy me a coffee
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Add more sections as needed */}
    </div>
  );
}

export default App;
