import React from "react";

export const FeaturesSection = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-20 text-white">
      <h2 className="text-4xl font-semibold text-center mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row justify-center items-center">
          {/* <div className="md:w-1/2 mb-6 md:mb-0"> */}
          {/* <img
  src={feature_1}
  alt="Download Your Notes"
  className="w-full h-auto mb-6 md:mb-0 rounded-lg"
  style={{ maxWidth: "100%", maxHeight: "100%" }}
/> */}
          {/* </div> */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold">
              Get Started with StudyBoost
            </h3>
            <p className="mt-4">
              Drag and drop or select your homework PDF to access the best
              AI-driven homework help website. StudyBoost's intuitive interface
              makes it simple to upload your files and start the AI-driven note
              generation process.
            </p>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row justify-center items-center ">
          {/* <div className="md:w-1/2 md:mb-2"> */}
          {/* <img
  src={feature_2}
  alt="Download Your Notes"
  className="w-full h-auto mb-6 md:mb-0 rounded-lg"
  style={{ maxWidth: "100%", maxHeight: "100%" }}
/> */}
          {/* </div> */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold">
              Download Your AI-Generated Study Notes
            </h3>
            <p className="mt-4">
              Our powerful AI creates comprehensive notes, are ready for you to
              download and study effortlessly. Say goodbye to manually searching
              for terms, formulas, descriptions etc. and focus on learning and
              solving problems more efficiently with StudyBoost's AI-powered
              learning strategies.
            </p>
          </div>
        </div>
      </div>
      {/* Demo Button */}
      <div className="text-center mt-12 ">
        <a href="https://twitter.com/betterMateusz">
          <button className="text-black mt-4 w-full md:w-auto px-6 py-2 bg-white text-252D62 font-semibold rounded-lg">
            Check out my demo
          </button>
        </a>
      </div>
    </section>
  );
};
