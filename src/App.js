import React, { useState, useMemo, useCallback } from "react";


// import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { AboutAuthorSection } from "./components/AboutAuthorSection";
import { Helmet } from "react-helmet";

function App() {
  
  const appContent = useMemo(
    () => (
      <>
      <Helmet>
        <title>StudyBoost: AI-Powered Homework Help</title>
        <meta
          name="description"
          content="Boost your learning with StudyBoost, an AI-powered homework help tool that generates comprehensive study notes from your homework PDFs. Improve test-taking strategies, achieve academic success, and master learning strategies with ease."
        />
      </Helmet>
      <div className="bg-[#F0FFE0] min-h-screen">
        {/* <Navbar /> */}
        <HeroSection/>
        <FeaturesSection />
        <AboutAuthorSection />
      </div>
      </>
    ),
  );

  return appContent;
}

export default App;
