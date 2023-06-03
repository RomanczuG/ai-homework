import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
// Mock data
const chats = [
  { id: 1, name: 'ECE362', pdf: ['textbook1', 'hw2'] },
  { id: 2, name: 'ECE473', pdf: ['textbook1', 'hw2']  },
  { id: 3, name: 'MA132', pdf: ['textbook1', 'hw2']  },
];

export const ChatPage = () => {
const location = useLocation();
const { uploadedFilename } = location.state;
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: 'calc(100vh - (60px + 75px))' }}
    >

    <div className="flex flex-row h-full">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="mb-4 font-bold">Classes</h2>
        {chats.map(chat => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`w-full text-left p-2 my-2 ${selectedChat.id === chat.id ? 'bg-gray-300' : ''}`}
          >
            {chat.name}
          </button>
          {chat}
        ))}
      </div>
      
      {/* Chat area */}
      <div className="w-3/4 p-4 overflow-auto">
        <h2 className="mb-4 font-bold">Chat with {selectedChat.name}</h2>
        {/* The chat messages will be displayed here */}
        <ChatWindow chat={selectedChat} />
      </div>
    </div>
    </motion.div>
  );
};


