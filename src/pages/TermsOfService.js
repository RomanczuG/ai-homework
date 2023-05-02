import React from 'react';

export const TermsOfService = () => {
  return (
    <div className="bg-[#252D62] min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="mb-4">
          By using our website, StudyBoost.app, you agree to be bound by these Terms of Service and to use the website in accordance with these Terms of Service, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of the website or to products and services available through the website.
        </p>
        <p className="mb-4">
          Accessing the website, in any manner, whether automated or otherwise, constitutes use of the website and your agreement to be bound by these Terms of Service.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Intellectual Property Rights</h2>
        <p className="mb-4">
          All copyrights, trademarks, patents, and other intellectual property rights in and on our website and all content and software located on the site shall remain the sole property of StudyBoost.app or its licensors. The use of our trademarks, content, and intellectual property is forbidden without the express written consent from StudyBoost.app.
        </p>
        {/* Add more terms as needed */}
      </div>
    </div>
  );
};
