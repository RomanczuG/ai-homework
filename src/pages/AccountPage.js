import React, { useState, useEffect } from "react";
import { Button } from "../utils/ToolUtils";
import { Modal, handleLogout } from "../utils/DashboardUtils";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Upgrade } from "../components/Upgrade";

const fetchSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting user session:", error);
  } else {
    console.log(data);
  }
};



export const Account = () => {
  const [upgradeModal, setUpgradeModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div className="flex min-h-fit bg-gray-100 flex flex-col items-center justify-center py-8 px-2 sm:px-8 lg:px-10">
      

      <h1 className="text-3xl font-bold mb-10 text-gray-900 bg-clip-text  ">
        Your
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          {" "}
          Account
        </span>
      </h1>

      <div className="flex flex-col w-4/5 md:w-2/5 space-y-6">
        <div className="p-5 min-h-fit bg-white rounded-lg shadow-lg ">
          <h2 className="text-2xl font-bold mb-3 text-gray-800  ">
            Change account information
          </h2>
          <div className="flex flex-col space-y-3">
            <p>Email:</p>
            <text className="bg-gray-200 p-2 rounded-md">
              {" "}
              romanczug@icloud.com{" "}
            </text>
            <Button>Change email</Button>
            <p>Password:</p>
            <text className="bg-gray-200 p-2 rounded-md">
              {" "}
              ****************{" "}
            </text>
            <Button>Change password</Button>
          </div>

          
        </div>
        <Upgrade />
        
      </div>
      {/* Log out button */}
        <div className="mt-3">
      <Button
      onClick={() => handleLogout(navigate)}
      >
        

      Sign out
      </Button>
      </div>

    </div>
  );
};
