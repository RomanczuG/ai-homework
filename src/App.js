import React, { useState, useMemo, useCallback } from "react";


import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { AboutAuthorSection } from "./components/AboutAuthorSection";


function App() {
  const [waitlistData, setWaitlistData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*3(\.\w{2,3})+$/.test(email);
  };

  const submitWaitlist = useCallback((data) => {
    if (!data.email) {
      setError("Please enter your email");
      return;
    }
    if (validateEmail(data.email) === false) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    data.waitlist_id = 6443;
    data.referral_link = document.URL;

    fetch("https://api.getwaitlist.com/api/v1/waiter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setWaitlistData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  } ,[]);
  const appContent = useMemo(
    () => (
      <div className="bg-[#252D62] min-h-screen">
        <Navbar />
        <HeroSection
          {...{ waitlistData, error, loading, submitWaitlist }}
        />
        <FeaturesSection />
        <AboutAuthorSection />
      </div>
    ),
    [waitlistData, error, loading, submitWaitlist]
  );

  return appContent;
}

export default App;
