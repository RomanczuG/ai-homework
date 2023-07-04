import ChatWindow from "../components/ChatWindow";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../utils/ToolUtils";
import { ClipLoader } from "react-spinners";
import { supabase } from "../supabaseClient";

const client = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://studyboost.uc.r.appspot.com",
});

export const getAuthToken = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting user session:", error);
    throw error;
  }
  // console.log("Session:", data["session"]["access_token"]);
  return data ? data.session.access_token : null;
};

const getPDFUrl = async (hashedFilename) => {
  const token = await getAuthToken();
  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }

  return client
    .get(`/download_pdf_dev/${hashedFilename}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      // Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: "application/pdf" });
      // Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      // Return the fileURL
      return fileURL;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const ChatPage = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const location = useLocation();
  const hashedFaissFilename = location.state.hashedFaissFilename;
  const pdfFilename = location.state.pdfFilename;
  const hashedFilename = location.state.hashedFilename;

  useEffect(() => {
    const fetchPDFUrl = async () => {
      const url = await getPDFUrl(hashedFilename);
      setPdfUrl(url);
    };
    fetchPDFUrl();
    console.log("In ChatPage, pdfUrl:", pdfUrl);
  }, [hashedFilename]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: "calc(100vh - 80px)" }} // 80px is approximated navbar height
      className="h-full"
    >
      <div className="flex flex-col sm:flex-row h-full">
        {/* Sidebar */}
        <div className="w-full sm:w-1/2 bg-gray-200 p-4 flex flex-col">
          <h2 className="mb-4 font-bold">{pdfFilename}</h2>
          {pdfUrl ? (
            <div className="w-full flex-grow overflow-auto shadow-lg">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                title="PDF Document"
                style={{
                  border: "none",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          ) : (
            <ClipLoader size={20} color={"#FF6E00"} loading={true} />
          )}
          {pdfUrl && (
            <div className="mt-3">
              <Button
                onClick={() => window.open(pdfUrl, "_blank")}
                className="mt-4"
              >
                Open PDF in new tab
              </Button>
            </div>
          )}
        </div>

        {/* Chat area */}
        <div className="w-full sm:w-1/2 p-4 overflow-auto mt-4 sm:mt-0">
          <h2 className="mb-4 font-bold">Chat </h2>

          <ChatWindow hashedFaissFilename={hashedFaissFilename} />
        </div>
      </div>
    </motion.div>
  );
};
