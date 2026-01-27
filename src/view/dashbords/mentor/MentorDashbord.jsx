import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Users, MessageSquare, Star, CheckCircle, Clock, Zap, ArrowUpRight, ShieldCheck, TrendingUp } from 'lucide-react';
import API from '../../../api/client';
import { toast } from 'react-toastify';

const MentorDashboard = () => {
  const [meetLink, setMeetLink] = useState("");
  const [requests, setRequests] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentorData();
  }, []);

  const fetchMentorData = async () => {
    try {
      const res = await API.get('/mentors/dashboard-data');
      if (res.data.success) {
        setRequests(res.data.requests || []);
        setFeedbacks(res.data.feedbacks || []);
        setMeetLink(res.data.currentLink || "");
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleAccept = async (requestId) => {
    if (!meetLink) return toast.error("Bhai, pehle meeting link toh dalo!");
    try {
      await API.patch(`/mentors/accept-session/${requestId}`, { meetLink });
      toast.success("Accepted! Talent ko link bhej diya gaya hai.");
      fetchMentorData();
    } catch (err) { toast.error("Error accepting request"); }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-6 bg-[#F8FAFF] min-h-screen">
      
      {/* 🚀 HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Mentor <span className="text-blue-600">Command Center</span></h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Manage your sessions and talent growth</p>
        </div>
        <div className="flex gap-3">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Live Status: Active</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* --- LEFT SIDE: STATS & LINK (8 COLS) --- */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Active Requests" value={requests.filter(r => r.status === 'PENDING').length} icon={<Clock/>} color="text-orange-500" bg="bg-orange-50" />
            <StatCard title="Total Mentees" value={requests.length} icon={<Users/>} color="text-blue-600" bg="bg-blue-50" />
            <StatCard title="Avg Rating" value="4.9" icon={<Star/>} color="text-yellow-500" bg="bg-yellow-50" />
          </div>

          {/* MEETING CONFIG (PREMIUM CARD) */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/10 rounded-2xl"><Video size={24} className="text-blue-400"/></div>
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Instant Meet Link</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <input 
                        type="url" value={meetLink} onChange={(e) => setMeetLink(e.target.value)}
                        placeholder="https://meet.google.com/xxx-xxxx-xxx"
                        className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                    />
                    <button onClick={() => { API.patch('/users/update-mentor-link', { meetLink }); toast.success("Link Updated!"); }}
                        className="bg-blue-600 hover:bg-blue-500 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                        Sync to DB
                    </button>
                </div>
            </div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
          </div>

          {/* INCOMING REQUESTS TABLE */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <h3 className="text-sm font-black text-slate-800 uppercase italic tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-600"/> Session Backlog
            </h3>
            <div className="space-y-3">
               <AnimatePresence>
                {requests.filter(r => r.status === 'PENDING').map((req) => (
                    <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, scale:0.9}} key={req.id} 
                        className="flex items-center justify-between p-5 bg-slate-50/50 rounded-[1.5rem] border border-transparent hover:border-blue-100 hover:bg-white transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center font-black text-slate-600 uppercase">
                                {req.talentName?.[0]}
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-800 uppercase italic">{req.talentName}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Career Guidance Request</p>
                            </div>
                        </div>
                        <button onClick={() => handleAccept(req.id)} 
                            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase hover:bg-green-600 transition-all shadow-md">
                            Approve <CheckCircle size={14}/>
                        </button>
                    </motion.div>
                ))}
               </AnimatePresence>
               {requests.length === 0 && <p className="text-center py-10 text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">No Pending Tasks</p>}
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: PROFILE & FEEDBACK (4 COLS) --- */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* PROFILE CARD */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
             <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                    <img src={`https://ui-avatars.com/api/?name=Mentor&background=0f172a&color=fff`} className="rounded-[2rem] border-4 border-slate-50 shadow-lg" alt="pfp" />
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 p-1.5 rounded-lg border-2 border-white"><ShieldCheck size={14}/></div>
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tighter italic uppercase">Expert Mentor</h2>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Verified Instructor</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Sessions</p>
                        <p className="text-lg font-black italic">42</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Hours</p>
                        <p className="text-lg font-black italic">128h</p>
                    </div>
                </div>
             </div>
          </div>

          {/* TESTIMONIALS / FEEDBACK WALL */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex-1">
            <h3 className="text-sm font-black text-slate-800 uppercase italic tracking-widest mb-8 flex items-center justify-between">
                Mentee Reviews <MessageSquare size={16} className="text-slate-300"/>
            </h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {feedbacks.map((f, i) => (
                    <div key={i} className="border-l-4 border-blue-500 pl-4 py-1">
                        <p className="text-xs font-medium text-slate-600 leading-relaxed italic">"{f.comment}"</p>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">@{f.talentName}</span>
                            <div className="flex gap-0.5 text-yellow-400"><Star size={10} fill="currentColor"/> <span className="text-[10px] text-slate-800 font-black">{f.rating}</span></div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-component for Stats
const StatCard = ({ title, value, icon, color, bg }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50 flex items-center justify-between group hover:shadow-xl transition-all duration-500">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <h2 className={`text-4xl font-black ${color} tracking-tighter italic`}>{value}</h2>
    </div>
    <div className={`p-4 ${bg} ${color} rounded-2xl group-hover:rotate-12 transition-transform`}>{icon}</div>
  </div>
);

export default MentorDashboard;