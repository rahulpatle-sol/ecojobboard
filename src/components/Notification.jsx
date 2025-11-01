import React, { useState } from 'react';
import { RiSendPlane2Fill, RiSearchLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

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
    <div className="h-screen w-screen bg-gradient-to-br from-amber-50 via-yellow-100 to-beige-200 font-sans flex flex-col">
      {/* Top Bar */}
      <div className="bg-white px-6 py-4 text-xl font-bold text-gray-800 border-b border-amber-200 shadow-sm">
        Notifications
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Chat Section */}
        <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
          <div className="space-y-4 overflow-y-auto pr-2">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`max-w-md px-4 py-2 rounded-xl shadow-md ${
                  msg.sender === 'you'
                    ? 'bg-amber-100 self-end text-right'
                    : 'bg-white self-start text-left border border-amber-200'
                }`}
              >
                <p className="text-sm font-semibold text-amber-700">{msg.sender}</p>
                <p className="text-gray-800">{msg.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="mt-6 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition shadow-md"
            >
              <RiSendPlane2Fill />
            </motion.button>
          </div>
        </div>

        {/* Right: Profile Cards */}
        <div className="hidden md:flex w-1/3 bg-white p-6 flex-col gap-6 border-l border-amber-200">
          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-4">
            <RiSearchLine className="text-amber-600 text-xl" />
            <input
              type="text"
              placeholder="Search profiles..."
              className="flex-1 px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Profile Cards */}
          {[
            { name: 'Aditya Shetty', title: 'Co-founder of Suo Da', color: 'bg-amber-300' },
            { name: 'Riya Kapoor', title: 'Hiring Lead at NovaTech', color: 'bg-yellow-400' },
          ].map((profile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="flex items-center gap-4 p-4 border border-amber-200 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition"
            >
              <div className={`w-12 h-12 rounded-full ${profile.color} shadow-inner`} />
              <div>
                <h3 className="font-semibold text-gray-800">{profile.name}</h3>
                <p className="text-sm text-gray-500">{profile.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
