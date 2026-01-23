import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, Bell, Edit, CheckCircle, AlertTriangle, X, User, Briefcase, 
  MapPin, DollarSign, Clock, Search, ShieldCheck, Square, LogOut, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // For Premium Animations

// --- FIXED NOTIFICATION COMPONENT ---
const AppNotification = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;
  const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-rose-500';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className={`fixed top-5 right-5 z-[100] ${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3`}
    >
      {type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="hover:rotate-90 transition-transform"><X size={18} /></button>
    </motion.div>
  );
};

function DashboardJobseeker() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const token = localStorage.getItem("accessToken");

  // --- FETCH DATA ---
  useEffect(() => {
    if (!token) { navigate('/login'); return; }

    const fetchData = async () => {
      try {
        const [profRes, jobsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/users/me', { headers: { Authorization: `Bearer ${token}` }}),
          axios.get('http://localhost:8000/api/v1/jobs', { headers: { Authorization: `Bearer ${token}` }})
        ]);
        setProfile(profRes.data.data);
        setJobs(jobsRes.data.data || []);
      } catch (err) {
        if (err.response?.status === 401) navigate('/login');
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchData();
  }, [navigate, token]);

  const handleApply = async (jobId) => {
    try {
      await axios.post(`http://localhost:8000/api/v1/jobs/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotification({ message: 'Applied Successfully! 🚀', type: 'success', visible: true });
    } catch (e) {
      setNotification({ message: 'Already Applied or Error!', type: 'error', visible: true });
    }
  };

  if (loadingProfile) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 font-medium animate-pulse">Setting up your console...</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <AnimatePresence>
        <AppNotification {...notification} onClose={() => setNotification({ ...notification, visible: false })} />
      </AnimatePresence>

      {/* --- PREMIUM SIDEBAR --- */}
      <aside className="w-24 bg-slate-900 flex flex-col items-center py-8 gap-10 border-r border-slate-800">
        <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          <Briefcase className="text-slate-900" size={24} />
        </div>
        
        <nav className="flex flex-col gap-6">
          <SidebarIcon icon={<LayoutDashboard size={24} />} active />
          <SidebarIcon icon={<Square size={24} />} />
          <SidebarIcon icon={<ShieldCheck size={24} />} />
          <SidebarIcon icon={<User size={24} />} />
        </nav>

        <button 
          onClick={() => { localStorage.clear(); navigate('/login'); }}
          className="mt-auto p-4 text-slate-500 hover:text-rose-400 transition-colors"
        >
          <LogOut size={24} />
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-10 py-6 flex justify-between items-center border-b border-slate-200">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Welcome Back, {profile?.fullName.split(' ')[0]} 👋</h1>
            <p className="text-sm text-slate-500">Here’s what’s happening with your applications.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-1 pr-4 rounded-full shadow-sm border border-slate-100">
            <img 
              src={profile?.profilePic || `https://ui-avatars.com/api/?name=${profile?.fullName}&background=FBBF24&color=fff`} 
              className="w-10 h-10 rounded-full object-cover" 
              alt="User" 
            />
            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-800 leading-none">{profile?.fullName}</p>
              <p className="text-[10px] text-amber-600 font-bold uppercase mt-1 tracking-wider">{profile?.role}</p>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatsCard label="Applied Jobs" value="12" icon={<Briefcase className="text-blue-500" />} />
            <StatsCard label="Interview Invites" value="04" icon={<Clock className="text-amber-500" />} />
            <StatsCard label="Profile Strength" value="85%" icon={<ShieldCheck className="text-emerald-500" />} />
          </div>

          {/* Recommended Jobs */}
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Recommended Jobs</h3>
            <button className="text-amber-600 font-bold text-sm hover:underline flex items-center gap-1">View All <ChevronRight size={16} /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={() => handleApply(job.id)} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- REUSABLE PREMIUM UI COMPONENTS ---

const SidebarIcon = ({ icon, active = false }) => (
  <div className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${active ? 'bg-amber-400 text-slate-900 shadow-lg' : 'text-slate-500 hover:bg-slate-800 hover:text-white'}`}>
    {icon}
  </div>
);

const StatsCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">{icon}</div>
    <p className="text-slate-500 text-sm font-medium">{label}</p>
    <h4 className="text-2xl font-black text-slate-900 mt-1">{value}</h4>
  </div>
);

const JobCard = ({ job, onApply }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-amber-200 transition-colors">
        <Briefcase className="text-slate-400 group-hover:text-amber-500" size={28} />
      </div>
      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Full Time</span>
    </div>
    
    <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">{job.title}</h4>
    <p className="text-slate-500 font-medium text-sm mb-6">{job.company || 'Unknown Tech'} • {job.location || 'Remote'}</p>
    
    <div className="flex items-center gap-4 mb-8 text-slate-400">
      <div className="flex items-center gap-1 text-xs"><MapPin size={14}/> India</div>
      <div className="flex items-center gap-1 text-xs"><DollarSign size={14}/> 12-18 LPA</div>
    </div>

    <button 
      onClick={onApply}
      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-amber-400 hover:text-slate-900 transition-all shadow-lg hover:shadow-amber-200/50 flex items-center justify-center gap-2"
    >
      Apply Now <ChevronRight size={18} />
    </button>
  </motion.div>
);

export default DashboardJobseeker;