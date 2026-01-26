import React, { useState, useEffect } from 'react';
import { RiSendPlane2Fill, RiSearchLine, RiCheckDoubleLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ShieldCheck, Bell } from 'lucide-react';

export default function Notification() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  // 1. Fetch Real Notifications from Backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Agar pehle se messages hain toh mock data hatakar real data set karein
        setMessages(res.data.data);
      } catch (err) {
        // Fallback for demo
        setMessages([
          { sender: 'System', text: 'Congratulations! Your Aptitude links were reviewed.', type: 'badge' },
          { sender: 'Aditya Shetty', text: 'Hey, your project is impressive. Let’s talk!', type: 'chat' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [token]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'you', text: input, type: 'chat' }]);
      setInput('');
      // Yahan axios.post karke chat message bhej sakte ho backend pe
    }
  };

  return (
    <div className="h-screen w-full bg-[#FDFBF7] font-sans flex flex-col overflow-hidden">
      {/* Top Bar with Badge Status */}
      <div className="bg-white px-8 py-4 flex justify-between items-center border-b border-amber-100 shadow-sm">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Bell size={20}/></div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Activity Center</h1>
        </div>
        <div className="flex gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">2 New Alerts</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Interactive Feed */}
        <div className="w-full md:w-2/3 p-4 md:p-8 flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.sender === 'you' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${msg.sender === 'you' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] px-5 py-3 rounded-[24px] shadow-sm ${
                    msg.type === 'badge' 
                    ? 'bg-blue-600 text-white' // Highlighting important system alerts
                    : msg.sender === 'you'
                      ? 'bg-amber-400 text-slate-900 rounded-tr-none'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                        {msg.type === 'badge' && <ShieldCheck size={14} fill="white" className="text-blue-600"/>}
                        <span className={`text-[10px] font-bold uppercase ${msg.type === 'badge' ? 'text-blue-100' : 'text-amber-700 opacity-70'}`}>
                            {msg.sender}
                        </span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-2 uppercase font-bold tracking-tighter">Just Now</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Box - Floating Style */}
          <div className="mt-6 p-2 bg-white rounded-[24px] border border-slate-100 shadow-xl flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for feedback or reply..."
              className="flex-1 px-4 py-3 bg-transparent text-sm focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-amber-500 transition-colors shadow-lg"
            >
              <RiSendPlane2Fill size={20} />
            </motion.button>
          </div>
        </div>

        {/* Right: Connected Recruiters & Mentors */}
        <div className="hidden lg:flex w-1/3 bg-white p-8 flex-col gap-6 border-l border-slate-50">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[2px]">Quick Connects</h2>
          
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search people..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-xs focus:ring-1 focus:ring-amber-300"
            />
          </div>

          <div className="space-y-3">
            {[
              { name: 'Aditya Shetty', role: 'Verified Recruiter', img: 'https://i.pravatar.cc/100?u=1' },
              { name: 'Aarav Mehta', role: 'DSA Mentor', img: 'https://i.pravatar.cc/100?u=2' },
            ].map((user, i) => (
              <motion.div
                whileHover={{ x: 5 }}
                key={i}
                className="flex items-center gap-4 p-4 rounded-3xl border border-transparent hover:border-amber-100 hover:bg-amber-50/30 transition-all cursor-pointer group"
              >
                <img src={user.img} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="avatar" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-800">{user.name}</h3>
                  <p className="text-[10px] text-slate-500 font-medium">{user.role}</p>
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}