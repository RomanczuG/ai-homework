import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16 bg-[#F0FFE0]">
      <div className="text-black mb-8 md:mb-0 md:w-1/2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
            Study Smarter
          </span>{" "}
          with AI-Powered{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
            Strategies
          </span>
        </h1>
        <p className="text-base md:text-lg xl:text-xl mb-6">
          Upload your homework or test PDF and let our AI generate
          comprehensive, easy-to-understand study notes tailored to help you
          learn and excel. Improve your test-taking strategies, study
          smarter, achieve academic success, and master learning strategies
          with ease.
        </p>
        <h2 className="text-lg md:text-xl font-bold mb-2">85% of students started getting better grades</h2>
      </div>
      <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
        <img
          className="w-full h-full object-cover rounded-lg shadow-md"
          src="/hero.png" // Replace with your preferred image URL
          alt="Hero Image"
        />
      </div>
    </section>
  );
};
