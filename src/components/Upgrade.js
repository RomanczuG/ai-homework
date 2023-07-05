import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ActionButtons } from "../utils/ToolUtils"; // assuming you've this component defined
import { Button } from "../utils/ToolUtils";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai"; // add this
import { supabase } from "../supabaseClient";
import axios from "axios";

async function getUserEmail() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting user session:", error);
    throw error;
  }

  return data["session"]["user"]["email"];
}

const client = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://studyboost.uc.r.appspot.com",
});

async function getUserId() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting user session:", error);
    throw error;
  }

  return data["session"]["user"]["id"];
}


export const Upgrade = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("monthly_plan");
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const checkSubscription = async() => {
    const user_id = await getUserId();
    console.log("checkSubscription user_id:", user_id);
    const formData = new FormData();
    formData.append("user_id", user_id);
    
    client.post("/check-subscription", formData)
      .then((response) => {
        console.log("checkSubscription response:", response);
        if (response.status === 200) {
          console.log("checkSubscription response:", response.data);
          setSubscribed(response.data["subscribed_status"]);
          // return response.data;
        } else {
          console.log("checkSubscription error");
          setSubscribed(false);
          // throw new Error(`Request failed with status code ${response.status}`);
        }
      })
      .catch((error) => {
        console.log("checkSubscription error:", error);
        
        // throw error; // re-throw the error so it can be caught in the checkSub function
      });
      console.log("checkSubscription end");
  }
  
  useEffect(() => {
    const getUser = async () => {
      const user_id = await getUserId();
      const user_email = await getUserEmail();
      setUserID(user_id);
      setEmail(user_email);
    };
    
    const checkSub = async () => {
      console.log("checkSub");
      try {
        console.log("checkSub try");
       await checkSubscription();
      } catch (error) {
        console.error('Failed to check subscription:', error);
      }
    };  
    checkSub();
    getUser();
  }, []);
  
  const handleMonthly = () => {
    console.log("monthly");
    setPlan("monthly_plan");
  };

  const handleYearly = () => {
    console.log("yearly");
    setPlan("yearly_plan");
  };

  const features = [
    "No PDF page limit",
    "No daily upload limit",
    "No daily questions limit",
    "Unlimited chats",
    "Unlimited study notes",
  ];

  const variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
    child: { opacity: 0, y: 20 },
    childVisible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="w-full p-5 min-h-fit bg-white rounded-lg shadow-lg"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <h2 className="text-2xl font-bold mb-3 text-gray-800">Upgrade</h2>
      <div className="flex flex-col space-y-3 mb-3">
        <ActionButtons
          setAction={setPlan}
          func1={handleMonthly}
          func2={handleYearly}
          action1="monthly"
          action2="yearly"
          text1="Monthly"
          text2="Yearly"
        />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-gray-800">
        Premium includes:
      </h2>
      <ul className="mb-4 pl-5">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="text-gray-600 flex items-center space-x-2"
            variants={{
              hidden: variants.child,
              visible: variants.childVisible,
            }}
          >
            <AiFillCheckCircle className="text-green-500" />
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>
      <div className="flex space-x-2">
        <h3 className="text-5xl font-bold mb-2 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          {plan == "monthly_plan" ? <span> $10 </span> : <span>$100</span>}
        </h3>
        <div className="flex flex-col justify-center">
          <span className="text-gray-500">per</span>
          <span className="text-gray-500">
            {plan == "monthly_plan" ? <span> month </span> : <span>year</span>}
          </span>
        </div>
      </div>
      <div className="mt-4">
        {subscribed == "active" ? (
          <form
            action="https://studyboost.uc.r.appspot.com/create-checkout-session"
            method="POST"
          >
            {/* Add a hidden field with the lookup_key of your Price */}
            <input type="hidden" name="lookup_key" value={plan} />
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="user_id" value={userID} />
            <Button
              type="submit"
              disabled={loading}
              onClick={() => setLoading(true)}
            >
              {loading ? "Loading..." : "Subscribe"}
            </Button>
          </form>
        ) : (
          <form
            action="https://studyboost.uc.r.appspot.com/create-customer-portal-session"
            method="POST"
          >
            <input type="hidden" name="user_id" value={userID} />
            <div className="mt-4">
              <Button>Manage Subscription</Button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};
