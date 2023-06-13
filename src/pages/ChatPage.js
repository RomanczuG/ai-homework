
import ChatWindow from "../components/ChatWindow";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
  console.log('In ChatPage, hashedFaissFilename:', hashedFaissFilename);
  console.log('In ChatPage, pdfFilename:', pdfFilename);
  console.log('In ChatPage, hashedFilename:', hashedFilename);
  


  useEffect(() => {
    client.get(`/${hashedFilename}`, {
      responseType: 'blob' // Force to receive data in a Blob Format
    })
    .then(response => {
      //Create a Blob from the PDF Stream
      const file = new Blob(
        [response.data], 
        {type: 'application/pdf'});
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      setPdfUrl(fileURL);
    })
    .catch(error => {
      console.log(error);
    });
  }, [hashedFilename]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // style={{ height: "calc(100vh - (60px + 75px))" }}
    >
      <div className="flex flex-row h-full">
        {/* Sidebar */}
        <div className="w-1/2 bg-gray-200 p-4">
        <h2 className="mb-4 font-bold">{pdfFilename}</h2>
        {pdfUrl && <iframe src={pdfUrl} width="100%" height="600px" title="PDF Document"></iframe>}
      </div>

        {/* Chat area */}
        <div className="w-1/2 p-4 overflow-auto">
          {/* <h2 className="mb-4 font-bold">Chat with {selectedChat.name}</h2> */}
          <h2 className="mb-4 font-bold">Chat </h2>
          {/* The chat messages will be displayed here */}
          <ChatWindow hashedFaissFilename={hashedFaissFilename} />
        </div>
      </div>
    </motion.div>
  );
};
