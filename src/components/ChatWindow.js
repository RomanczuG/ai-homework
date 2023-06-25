import React, { useState, useEffect } from "react";
import { Button } from "../utils/ToolUtils";
import axios from "axios";
import { motion } from "framer-motion";
import { IoSendSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { supabase } from "../supabaseClient";

const client = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://studyboost.uc.r.appspot.com",
});

const ChatWindow = ({ hashedFaissFilename }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [waiting, setWaiting] = useState(false);
  const saveMessage = async (hashedFaissFilename, message, sender) => {
    try {
      const { data, error } = await supabase
        .from("chats")
        .insert([
          { hashedFaissFilename, message, sender, timestamp: new Date() },
        ]);

      if (error) {
        console.log(error);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChatHistory = async (hashedFaissFilename) => {
    try {
      console.log("In fetchChatHistory, hashedFaissFilename:", hashedFaissFilename);
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("hashedFaissFilename", hashedFaissFilename)
        .order("timestamp", { ascending: true });

      console.log("In fetchChatHistory, data:", data);
      if (error) {
        console.log(error);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // Mock send message function
  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      setWaiting(true);
      setMessages([...messages, { text: newMessage, sender: "you" }]);
      saveMessage(hashedFaissFilename, newMessage, 'you');
      const dataToSend = {
        question: newMessage,
        hashedFaissFilename: hashedFaissFilename,
      };
      // console.log("Sending:", dataToSend);
      client
        .post("/chat", dataToSend)
        .then((response) => {
          const data = response.data;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.message, sender: "bot" },
          ]);
          saveMessage(hashedFaissFilename, data.message, 'bot');
          setWaiting(false);
        })
        .catch((e) => {
          console.error("Error:", e);
          setWaiting(false);
        });
      setNewMessage("");
    }
  };

  useEffect(() => {
    setWaiting(true);
    const loadChatHistory = async () => {
      const chatHistory = await fetchChatHistory(hashedFaissFilename);
      setMessages(chatHistory);
    };

    loadChatHistory();
    if (messages.length === 0) {
      // Initial question
      const initialQuestion =
        "You are an AI tutor. Please tell me who are you? How can you help me? Can you give me example questions I can ask you related to the terms, problems, questions, definitions provided as context?";
      const dataToSend = {
        question: initialQuestion,
        hashedFaissFilename: hashedFaissFilename,
      };
      // console.log("Sending:", dataToSend);
      client
        .post("/chat", dataToSend)
        .then((response) => {
          const data = response.data;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.message, sender: "bot" },
          ]);
          saveMessage(hashedFaissFilename, data.message, 'bot');
          setWaiting(false);
        })
        .catch((e) => {
          console.error("Error:", e);
          setWaiting(false);
        });
    }
  }, []);

  const messageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col  space-y-4 p-4">
      {/* Messages */}
      <div className="overflow-auto mb-4 flex-grow space-y-4">
        {messages.map((message, i) => (
          <motion.div
            key={i}
            className={`my-2 px-4 py-2 rounded-lg 
              ${
                message.sender === "you"
                  ? "bg-[#FF6E00] text-white ml-auto"
                  : "bg-gray-200 mr-auto"
              }`}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
          >
            <b>{message.sender === "bot" ? "AI Tutor" : "You"}:</b>{" "}
            {message.text?.split("\n").map((line, i) => (
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
      <form
        onSubmit={sendMessage}
        className="mt-auto flex rounded-lg overflow-hidden shadow-lg"
      >
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow px-4 py-2"
          placeholder="Type your message here..."
          disabled={waiting}
        />

        <button
          onClick={sendMessage}
          className="flex bg-[#FF6E00] px-4 py-2 items-center justify-between"
          disabled={waiting}
        >
          {!waiting ? (
            <IoSendSharp className="text-white" />
          ) : (
            <ClipLoader color="white" size={20} />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
