import React, { useState, useEffect } from "react";
import { Button } from "../utils/ToolUtils";
import axios from "axios";
import { motion } from "framer-motion";
import { IoSendSharp } from "react-icons/io5";

const ChatWindow = ({ hashedFaissFilename }) => {
  console.log("In ChatWindow, hashedFaissFilename:", hashedFaissFilename);
  const client = axios.create({
    // baseURL: "http://127.0.0.1:5000",
    baseURL: "https://studyboost.uc.r.appspot.com",
  });
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [waiting, setWaiting] = useState(false);

  // Mock send message function
  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage !== '') {
      setWaiting(true);
      setMessages([...messages, { text: newMessage, sender: 'you' }]);
      const dataToSend = { question: newMessage, hashedFaissFilename: hashedFaissFilename };
      console.log('Sending:', dataToSend);
      client.post('/chat', dataToSend)
        .then(response => {
          const data = response.data;
          setMessages(prevMessages => [...prevMessages, { text: data.message, sender: 'bot' }]);
          setWaiting(false);
        })
        .catch(e => {
          console.error('Error:', e);
          setWaiting(false);
        });
      setNewMessage('');
    }
  };

  useEffect(() => {
    setWaiting(true);
    // Initial question
    const initialQuestion = "Who are you? How can you help me? Can you give me example questions I can ask you related to the terms, problems, questions, definitions provided as context?";
    const dataToSend = {
      question: initialQuestion,
      hashedFaissFilename: hashedFaissFilename,
    };
    console.log("Sending:", dataToSend);
    client
      .post("/chat", dataToSend)
      .then((response) => {
        const data = response.data;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, sender: "bot" },
        ]);
        setWaiting(false);
      })
      .catch((e) => {
        console.error("Error:", e);
        setWaiting(false);
      });
  }, []);

  const messageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col h-[75vh] space-y-4 p-4">
      {/* Messages */}
      <div className="overflow-auto mb-4 flex-grow space-y-4">
        {messages.map((message, i) => (
          <motion.div
            key={i}
            className={`my-2 px-4 py-2 rounded-lg 
              ${message.sender === "you" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 mr-auto"}`}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
          >
            <b>{message.sender === "bot" ? "AI Tutor" : "You"}:</b>{" "}
            {message.text.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </motion.div>
        ))}
        {waiting && (
          <div className="my-2 px-4 py-2 rounded-lg bg-gray-200 mr-auto animate-pulse">
            Bot is typing...
          </div>
        )}
      </div>

      {/* Send message form */}
      <form onSubmit={sendMessage} className="mt-auto flex rounded-lg overflow-hidden shadow-lg">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow px-4 py-2"
          placeholder="Type your message here..."
          disabled={waiting}
        />
        <button onClick={sendMessage} className="bg-blue-500 px-4 py-2" disabled={waiting}>
          <IoSendSharp className="text-white"/>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
