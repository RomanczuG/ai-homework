import React from "react";

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="mx-auto px-6 md:px-20 py-20 text-black bg-[#F0FFE0]"
    >
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center border-r-2 border-gray-200 md:border-none">
          {/* <i className="fas fa-brain text-6xl mb-4"></i> */}
          <h3 className="text-xl md:text-2xl font-semibold">AI-Powered Study Strategies</h3>
          <p className="mt-4">
            Enhance your learning experience with our AI-generated study
            strategies tailored to your specific needs. Make the most of your
            study sessions by focusing on the most important concepts and
            techniques.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center border-r-2 border-gray-200 md:border-none">
          {/* <i className="fas fa-upload text-6xl mb-4"></i> */}
          <h3 className="text-xl md:text-2xl font-semibold">Easy Homework and Test Upload</h3>
          <p className="mt-4">
            Upload your homework or test PDF with a simple drag-and-drop or
            file selection. StudyBoost's user-friendly interface makes it easy
            to start the AI-driven note generation process.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center border-r-2 border-gray-200 md:border-none">
          {/* <i className="fas fa-file-alt text-6xl mb-4"></i> */}
          <h3 className="text-xl md:text-2xl font-semibold">Comprehensive Study Notes</h3>
          <p className="mt-4">
            Get access to detailed, AI-generated study notes that cover all the
            essential information you need to excel. Say goodbye to manual
            note-taking and focus on understanding key concepts and solving
            problems.
          </p>
        </div>
        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center">
          {/* <i className="fas fa-check-double text-6xl mb-4"></i> */}
          <h3 className="text-xl md:text-2xl font-semibold">Improved Test-Taking Skills</h3>
          <p className="mt-4">
            Learn effective test-taking strategies and boost your confidence
            during exams. StudyBoost provides valuable tips and resources to
            help you manage time, handle difficult questions, and prepare for
            various test formats.
          </p>
        </div>
      </div>
    </section>
  );
};
