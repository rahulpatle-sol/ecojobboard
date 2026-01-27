import React, { useState, useEffect } from 'react';
import { Search, Video, MessageCircle, Star, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../../../api/client';
import { toast } from 'react-toastify';

const MentorDiscussion = () => {
  const [mentors, setMentors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await API.get('/mentors/all'); // Saare mentors aur unka current status
      if (res.data.success) setMentors(res.data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const requestSession = async (mentorId) => {
    try {
      await API.post(`/mentors/request/${mentorId}`);
      toast.info("Request bhej di gayi hai! Mentor ke accept karne ka wait karo.");
      fetchMentors();
    } catch (err) { toast.error("Pehle se ek request pending hai!"); }
  };

  const filteredMentors = mentors.filter(m => 
    m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* 🔍 SEARCH BAR */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search Mentor by Subject (e.g. React, Python, HR)..."
            className="w-full pl-16 pr-6 py-5 bg-slate-50 border-none rounded-[1.5rem] text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 👨‍🏫 MENTORS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredMentors.map((mentor) => (
          <motion.div 
            whileHover={{ y: -10 }}
            key={mentor.id} 
            className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-50 group relative overflow-hidden"
          >
            {/* TOP INFO */}
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <img src={mentor.profilePic || `https://ui-avatars.com/api/?name=${mentor.name}`} className="w-16 h-16 rounded-2xl object-cover" alt="mentor" />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-4 border-white"></div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                <Star size={12} className="text-yellow-500" fill="currentColor" />
                <span className="text-[10px] font-black text-yellow-700">{mentor.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter leading-tight">{mentor.name}</h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-1">
              <ShieldCheck size={12}/> Expert in {mentor.subject}
            </p>

            <div className="text-xs text-slate-500 font-medium mb-8 line-clamp-2">
              {mentor.bio || "Helping students to crack top product-based companies."}
            </div>

            {/* ⚡ ACTION BUTTONS */}
            <div className="flex flex-col gap-3">
              {mentor.sessionStatus === 'ACCEPTED' ? (
                <a 
                  href={mentor.meetLink} 
                  target="_blank" 
                  className="w-full py-4 bg-green-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-green-100 hover:bg-green-600 transition-all animate-pulse"
                >
                  <Video size={14} /> Join Live Session
                </a>
              ) : mentor.sessionStatus === 'PENDING' ? (
                <button className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 cursor-not-allowed">
                  <Clock size={14} /> Request Pending...
                </button>
              ) : (
                <button 
                  onClick={() => requestSession(mentor.id)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"
                >
                  <MessageCircle size={14} /> Request Session
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MentorDiscussion;