import React from "react";
import { motion } from "framer-motion";
import { ActionButtons } from "../utils/ToolUtils"; // assuming you've this component defined
import { Button } from "../utils/ToolUtils";
import { useState } from "react";
import { AiFillCheckCircle } from 'react-icons/ai'; // add this

export const Upgrade = () => {
    const handleMonthly = () => {
        console.log("monthly");
    };
  
    const handleYearly = () => {
        console.log("yearly");
    };

    const [plan , setPlan] = useState("monthly");

    const features = [
      'No PDF page limit',
      'No daily upload limit',
      'No daily questions limit',
      'Unlimited chats',
      'Unlimited study notes',
    ];

    const variants = {
      hidden: { scale: 0 },
      visible: { scale: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
      child: { opacity: 0, y: 20 },
      childVisible: { opacity: 1, y: 0 }
    };

    return (
      <motion.div 
        className="w-full p-5 min-h-fit bg-white rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Upgrade 
        </h2>
        <div className="flex flex-col space-y-3 mb-3">
          <ActionButtons setAction={setPlan} func1={handleMonthly} func2={handleYearly} action1="monthly" action2="yearly" text1="Monthly" text2="Yearly" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Premium includes:</h2>
        <ul className="mb-4 pl-5">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="text-gray-600 flex items-center space-x-2"
              variants={{hidden: variants.child, visible: variants.childVisible}}
            >
              <AiFillCheckCircle className="text-green-500" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
        <div className="flex space-x-2">
          <h3 className="text-5xl font-bold mb-2 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">{plan == "monthly" ? <span> $10 </span>: <span>$100</span> }</h3>
          <div className="flex flex-col justify-center">
            <span className="text-gray-500">per</span>
            <span className="text-gray-500">{plan == "monthly" ? <span> month </span>: <span>year</span> }</span>
          </div>
        </div>
        <div className="mt-4">
          <Button>Upgrade</Button>
        </div>
      </motion.div>
    );
};
