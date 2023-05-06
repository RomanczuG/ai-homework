import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-between px-20 py-16 bg-[#F0FFE0]">
      <div className="text-black w-1/2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
            Study Smarter
          </span>{" "}
          with AI-Powered{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
            Strategies
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Upload your homework or test PDF and let our AI generate
          comprehensive, easy-to-understand study notes tailored to help you
          learn and excel. Improve your test-taking strategies, study
          smarter, achieve academic success, and master learning strategies
          with ease.
        </p>
        <h2 className="text-xl font-bold mb-2">85% of students started getting better grades</h2>
      </div>
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 w-1/2">
        <img
          className="w-full h-full object-cover rounded-lg shadow-md "
          src="/hero.png" // Replace with your preferred image URL
          alt="Hero Image"
        />
      </div>
    </section>
  );
};
