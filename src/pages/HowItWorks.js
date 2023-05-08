import React from 'react';

export const HowItWorks = () => {
  return (
    <div className="bg-[#F0FFE0] min-h-screen text-black">
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">How StudyBoost.app Works</h1>
      <p className="mb-4">
        StudyBoost.app is designed to help college students achieve academic success by providing personalized study tips, learning strategies, and test-taking strategies. Here's how our platform works:
      </p>
      <ol className="list-decimal list-outside pl-6 mb-4">
        <li className="mb-2">
          <strong>Upload your homework PDF:</strong> Simply upload your homework, lecture notes, or study materials in PDF format.
        </li>
        <li className="mb-2">
          <strong>AI-powered analysis:</strong> Our advanced AI algorithms analyze your materials to identify key concepts, important topics, and potential areas for improvement.
        </li>
        <li className="mb-2">
          <strong>Personalized study tips and learning strategies:</strong> Based on the AI analysis, StudyBoost.app generates a comprehensive study guide with tailored study tips and learning strategies to help you excel in your coursework.
        </li>
        {/* <li className="mb-2">
          <strong>Continuous improvement:</strong> As you use StudyBoost.app, the platform will continue to learn from your progress and refine its recommendations to provide even more effective study tips and test-taking strategies.
        </li> */}
      </ol>
      <p>
        Join StudyBoost.app today and unlock the full potential of AI-powered academic support!
      </p>
    </div>
    </div>
  );
};
