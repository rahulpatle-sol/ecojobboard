import React, { useState } from 'react';
import { RiSendPlane2Fill, RiSearchLine } from 'react-icons/ri';

export default function Notification() {
  const [messages, setMessages] = useState([
    { sender: 'aditya', text: 'Hey, we reviewed your profile!' },
    { sender: 'you', text: 'Thanks! Looking forward to it.' },
    { sender: 'you', text: 'Can I get feedback?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'you', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-00 font-sans flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-100 px-6 py-4 text-xl font-semibold">
        Notifications
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Chat Section */}
        <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
          <div className="space-y-4 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === 'you'
                    ? 'bg-gray-200 self-end text-right'
                    : 'bg-blue-200 self-start text-left'
                }`}
              >
                <p className="text-sm font-medium">{msg.sender}</p>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="mt-6 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <RiSendPlane2Fill />
            </button>
          </div>
        </div>

        {/* Right: Profile Cards */}
        <div className="hidden md:flex w-1/3 bg-white p-6 flex-col gap-6 border-l border-gray-300">
          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-4">
            <RiSearchLine className="text-gray-500 text-xl" />
            <input
              type="text"
              placeholder="Search profiles..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Profile Cards */}
          {[
            { name: 'Aditya Shetty', title: 'Co-founder of Suo Da', color: 'bg-green-400' },
            { name: 'Aditya Shetty', title: 'Co-founder of Suo Da', color: 'bg-pink-400' },
          ].map((profile, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
              <div className={`w-12 h-12 rounded-full ${profile.color}`} />
              <div>
                <h3 className="font-semibold text-gray-800">{profile.name}</h3>
                <p className="text-sm text-gray-500">{profile.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
