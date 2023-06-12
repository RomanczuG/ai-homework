import React, { useState } from 'react';
import { Button } from '../utils/ToolUtils';

const ChatWindow = ({hashedFaissFilename} ) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
  
    // Mock send message function
    const sendMessage = (e) => {
      e.preventDefault();
      if (newMessage !== '') {
        setMessages([...messages, { text: newMessage, sender: 'you' }]);
        fetch('/chat', {   // replace '/chat' with the URL of your chat endpoint
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: newMessage, hashedFaissFilename: hashedFaissFilename }),
        })

          .then(response => response.json())
          .then(data => setMessages([...messages, { text: data.message, sender: 'bot' }]))
          .catch(e => console.error('Error:', e));
        setNewMessage('');
      }
    };
  
    return (
      <div className="flex flex-col h-[75vh]">
        {/* Messages */}

        <div className="overflow-auto mb-4 flex-grow">
          {messages.map((message, i) => (
            <div 
              key={i} 
              className={`
                my-2 px-4 py-2 rounded-lg 
                ${message.sender === 'you' ? 'bg-orange-300 ml-auto' : 'bg-orange-500 mr-auto'}
              `}
            >
              <b>{message.sender}:</b> {message.text}
            </div>
          ))}
        </div>
  
        {/* Send message form */}
        <form onSubmit={sendMessage} className="mt-auto flex">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border rounded px-2 py-1 mr-2 flex-grow"
          />
          <Button onClick={sendMessage}>Send</Button>
        </form>
      </div>
    );
};

export default ChatWindow;
