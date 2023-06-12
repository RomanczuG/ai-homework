import React, { useState, useEffect } from "react";
import { Button } from "../utils/ToolUtils";
import { Modal, handleLogout } from "../utils/DashboardUtils";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Upgrade } from "../components/Upgrade";
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import { motion } from 'framer-motion';

const fetchSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting user session:", error);
  } else {
    console.log(data);
  }
};

const Card = ({ children }) => {
  return (
    <div className="p-5 min-h-fit bg-white rounded-lg shadow-lg">
      {children}
    </div>
  );
};

export const Account = () => {
  const [upgradeModal, setUpgradeModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <motion.div
      className="flex min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-2 sm:px-8 lg:px-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-10 text-gray-900">
        Your
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          {" "}
          Account
        </span>
      </h1>

      <div className="flex flex-col w-full md:w-3/5 xl:w-2/5 space-y-6">
        <Card>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">
            Change account information
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <AiOutlineMail className="text-[#FF6E00]" />
                <p>Email:</p>
              </span>
              <Button variant="outline" color="primary">
                Change email
              </Button>
            </div>
            <p className="bg-gray-200 p-2 rounded-md">romanczug@icloud.com</p>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <AiOutlineLock className="text-[#FF6E00]" />
                <p>Password:</p>
              </span>
              <Button variant="outline" color="primary">
                Change password
              </Button>
            </div>
            <p className="bg-gray-200 p-2 rounded-md">****************</p>
          </div>
        </Card>
        <Upgrade />
      </div>
      {/* Log out button */}
      <div className="mt-3">
        <Button variant="solid" color="primary" onClick={() => handleLogout(navigate)}>
          Sign out
        </Button>
      </div>
    </motion.div>
  );
};