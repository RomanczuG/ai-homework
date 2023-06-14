import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
// import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { AboutAuthorSection } from "./components/AboutAuthorSection";
import { Helmet } from "react-helmet";
import ToolBlock from "./components/ToolBlock";
import { Button } from "./utils/ToolUtils";
// import YouTubeVideo from "./components/YouTubeVideo";

function App() {
  const [showToolBlock, setShowToolBlock] = useState(false);
  const appContent = useMemo(() => (
    <>
      <Helmet>
        <title>Study Smarter Now: Achieve academic success with AI</title>
        <meta
          name="description"
          content="Boost your learning with StudyBoost, an AI-powered homework help tool that generates comprehensive study notes from your homework PDFs. Improve test-taking strategies, achieve academic success, and master learning strategies with ease."
        />
      </Helmet>
      <div className="bg-[#F0FFE0] min-h-screen">
        <HeroSection />
        <div className="text-center justify-between">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          Try it for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
            FREE
          </span>{" "}
          now!
        </h2>
        <p className="mt-4 text-center">
          We are currently in beta. Create an account and take advantage of our platform for free!
        </p>
        <div className="mt-3">
        <Link to="/dashboard">
          <Button>Start</Button>
        </Link>
        </div>
        </div>
        {/* <p className="mt-4 text-center">
          Simply upload your PDF hw or exam file below to see how to get better
          grades and study better.
        </p>
        <ToolBlock /> */}
        {/* <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            This is a {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
              REVOLUTION
            </span>{" "}
            for students!
          </h2>
          <div className="flex text-center justify-center mt-4 ">
          <YouTubeVideo embedId="1EKv4aLhygw" />
          </div>
        </div> */}
        <FeaturesSection />
        <AboutAuthorSection />
      </div>
    </>
  ));

  return appContent;
}

export default App;
