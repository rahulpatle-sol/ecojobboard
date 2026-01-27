import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Briefcase, Users, Settings, LogOut, Bell, Plus, Zap, Target } from 'lucide-react';
import API from '../../../api/client';
import PostJob from './PostJob';
import DashboardHome from "./DashbordHome"
import ManageJobs from './ManageJobs';
import TalentAnalytics from './TelentAnalytics';
import HrSettings from './HrSettings';

const HrDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recruiter, setRecruiter] = useState({ name: "Pili", company: "Skill2Hire" });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await API.get('/jobs/my-jobs');
      if (res.data.success) {
        setJobs(res.data.data);
        const user = JSON.parse(localStorage.getItem("user"));
        setRecruiter({ name: user?.fullName || "Pili", company: res.data.data[0]?.recruiter?.companyName || "Skill2Hire" });
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFF] p-6 gap-6 overflow-hidden font-sans">
      {/* 🟢 PERSISTENT SIDEBAR */}
      <aside className="w-24 bg-white rounded-[3rem] shadow-xl flex flex-col items-center py-10 justify-between shrink-0 border border-slate-100">
        <div className="flex flex-col items-center gap-12">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg"><Zap size={28} fill="currentColor" /></div>
          <nav className="flex flex-col gap-6">
            <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={24}/>} label="Home" />
            <NavItem active={activeTab === 'jobs'} onClick={() => setActiveTab('jobs')} icon={<Briefcase size={24}/>} label="Jobs" />
            <NavItem active={activeTab === 'talent'} onClick={() => setActiveTab('talent')} icon={<Users size={24}/>} label="Talent" />
            <NavItem active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={24}/>} label="Config" />
          </nav>
        </div>
        <button className="p-4 bg-slate-50 hover:bg-red-50 rounded-2xl transition-all group"><LogOut size={24} className="text-slate-300 group-hover:text-red-500" /></button>
      </aside>

      <main className="flex-1 flex flex-col gap-8 overflow-hidden">
        {/* TOP NAVBAR */}
        <header className="flex justify-between items-center px-4 pt-2">
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-2">
             <Target className="text-blue-600" /> {activeTab === 'settings' ? 'Settings' : activeTab === 'jobs' ? 'Manage Listings' : `Hi, ${recruiter.name}`}
          </h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-slate-900 text-white px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl">+ New Listing</button>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:0.2}}>
              {activeTab === 'dashboard' && <DashboardHome jobs={jobs} recruiter={recruiter} />}
              {activeTab === 'jobs' && <ManageJobs jobs={jobs} refreshData={fetchData} />}
              {activeTab === 'talent' && <TalentAnalytics jobs={jobs} />}
              {activeTab === 'settings' && <HrSettings recruiter={recruiter} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* MODAL */}
      <AnimatePresence>{isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/20 backdrop-blur-xl">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[4rem] p-12 shadow-2xl w-full max-w-2xl border border-white relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-12 right-12 text-slate-300 hover:text-red-500"><X size={28}/></button>
            <PostJob onClose={() => setIsModalOpen(false)} onSuccess={fetchData} />
          </motion.div>
        </div>
      )}</AnimatePresence>
    </div>
  );
};

const NavItem = ({ icon, active, onClick, label }) => (
  <div onClick={onClick} className="flex flex-col items-center gap-1 group cursor-pointer">
    <div className={`p-4 rounded-[1.5rem] transition-all duration-300 ${active ? 'bg-slate-900 text-white shadow-2xl scale-110' : 'text-slate-300 hover:bg-slate-50 hover:text-slate-500'}`}>{icon}</div>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
  </div>
);

export default HrDashboard;