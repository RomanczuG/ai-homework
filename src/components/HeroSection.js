import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { Button } from "../utils/DashboardUtils";
import { Link } from "react-router-dom";
export const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-around px-6 md:px-20 py-16 min-h-[55vh] bg-[#F0FFE0]">
      <div className="text-black mb-8 md:mb-0 md:w-1/2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
            Study Smarter
          </span>{" "}
          with the power of  {" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          AI
          </span>
        </h1>
        <h2 className="text-base md:text-lg xl:text-xl mb-6">
          Upload homework, textbook, or lecture notes and harness power of AI. Enhance your study sessions with
          study guide, and AI tutor for further
          insight. Improve your test-taking strategies, study smarter, achieve
          academic success, and improve learning strategies with ease.
        </h2>
        <p className="text-3xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          Study Tools:
        </p>
        <div className="space-y-4 mb-6 text-lg md:text-xl xl:text-2xl">
          <div className="flex items-center">
            <HiCheckCircle className="text-[#FFC700] mr-2" size={24} />
            <p className="font-semibold">Ask AI tutor about context of your notes, hw or textbook</p>
          </div>
          <div className="flex items-center">
            <HiCheckCircle className="text-[#FFC700] mr-2" size={24} />
            <p className="font-semibold">Generate study guide from your HW </p>
          </div>
        </div>
        
        {/* <Link to="/dashboard">
          <div className="py-2 max-w-fit text-white bg-[#FFC700] font-bold hover:bg-[#FF6E00] px-4  border text-xl border-[#FFC700] rounded-md transition-all duration-200">
          START FOR FREE!
          </div>
        </Link> */}
        
      </div>

      <div className="relative space-y-4 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
        <img
          className="w-full h-full object-cover rounded-lg shadow-md"
          src="/study-smarter-ai.png" // Replace with your preferred image URL
          alt="study smarter ai"
        />

        <div>
          <a
            href="https://www.producthunt.com/products/free-ai-tool-study-smarter-now#study-smarter-now"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=393767&theme=light"
              alt="Study&#0032;Smarter&#0032;Now - Unlock&#0032;your&#0032;study&#0032;potential&#0032;&#0045;&#0032;AI&#0045;powered&#0032;help&#0032;for&#0032;students | Product Hunt"
              style={{ width: "250px", height: "54px" }}
              width="250"
              height="54"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
