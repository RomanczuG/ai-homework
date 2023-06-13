import ChatWindow from "../components/ChatWindow";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../utils/ToolUtils";

const client = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://studyboost.uc.r.appspot.com",
});

export const ChatPage = () => {
  const location = useLocation();
  const hashedFaissFilename = location.state.hashedFaissFilename;
  const pdfFilename = location.state.pdfFilename;
  const hashedFilename = location.state.hashedFilename;
  const [numPages, setNumPages] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  console.log("In ChatPage, hashedFaissFilename:", hashedFaissFilename);
  console.log("In ChatPage, pdfFilename:", pdfFilename);
  console.log("In ChatPage, hashedFilename:", hashedFilename);

  useEffect(() => {
    client
      .get(`/download_pdf/${hashedFilename}`, {
        responseType: "blob", // Force to receive data in a Blob Format
      })
      .then((response) => {
        console.log("In ChatPage, response:", response);
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        console.log("In ChatPage, fileURL:", fileURL);
        //Open the URL on new Window
        setPdfUrl(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
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
          {pdfUrl && (
            <div className="w-full flex-grow overflow-auto rounded-lg shadow-lg">
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
