import React from "react";
// import { motion } from 'framer-motion';
import YouTubeVideo from "./YouTubeVideo";
export const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-around px-6 md:px-20 py-16 min-h-[55vh] bg-[#F0FFE0]">
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
          Upload your homework or textbook and allow our AI to provide comprehensive
          study notes, or interact with the AI bot for further insight. Improve
          your test-taking strategies, study smarter, achieve academic success,
          and master learning strategies with ease.
        </p>
        <p className="text-3xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
            Study Tools:
          </p>
        <div className="space-y-4 mb-6 text-lg md:text-xl xl:text-2xl">
        
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#FFC700] mr-4"></div>
            <p className="font-semibold">Chat about textbooks with an AI bot (soon)</p>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#FFC700] mr-4"></div>
            <p className="font-semibold">Get easy-to-understand study notes</p>
          </div>
        </div>
        {/* <h2 className="text-lg md:text-xl font-bold mb-4">
          &#11088;&#11088;&#11088;&#11088;&#11088; rates and hundreds of happy
          students
        </h2> */}
        <a
          href="#features"
          className="py-2 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-md border-[#FFC700] rounded-md transition-all duration-200"
        >
          Learn more
        </a>
      </div>

      <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
        <img
          className="w-full h-full object-cover rounded-lg shadow-md"
          src="/hero.webp" // Replace with your preferred image URL
          alt="Hero Image"
        />
      </div>
    </section>
  );
};
