import React from "react";

export const AboutAuthorSection = () => {
  return (
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
                href="https://twitter.com/bettermateusz"
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
  );
};
