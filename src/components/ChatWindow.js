import React, { useState, useEffect } from "react";
import { Button } from "../utils/ToolUtils";
import axios from "axios";

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

  return (
    <div className="flex flex-col h-[75vh]">
      {/* Messages */}

      <div className="overflow-auto mb-4 flex-grow">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`
                my-2 px-4 py-2 rounded-lg 
                ${
                  message.sender === "you"
                    ? "bg-orange-300 ml-auto"
                    : "bg-orange-500 mr-auto"
                }
              `}
          >
            <b>{message.sender == "bot" ? "Your AI tutor" : "You"}:</b>{" "}
            {message.text.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
        {waiting && (
          <div className="my-2 px-4 py-2 rounded-lg bg-orange-300 ml-auto">
            Bot is typing...
          </div>
        )}
      </div>

      {/* Send message form */}
      <form onSubmit={sendMessage} className="mt-auto flex">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border rounded px-2 py-1 mr-2 flex-grow"
        />
        <Button onClick={sendMessage} disabled={waiting}>Send</Button>
      </form>
    </div>
  );
};

export default ChatWindow;
