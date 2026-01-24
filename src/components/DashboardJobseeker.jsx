import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, ShieldCheck, Square, User, LogOut, Briefcase } from 'lucide-react';

const SidebarIcon = ({ icon, path, active, label }) => (
  <Link 
    to={path}
    title={label}
    className={`p-4 rounded-2xl transition-all duration-300 relative group ${
      active ? 'bg-amber-400 text-slate-900 shadow-lg' : 'text-slate-500 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="absolute left-20 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
      {label}
    </span>
  </Link>
);

function DashboardJobseeker() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data.data);
      } catch (err) { navigate('/login'); }
    };
    fetchProfile();
  }, [id, token]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-24 bg-slate-900 flex flex-col items-center py-8 gap-10 border-r border-slate-800">
        <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center">
          <Briefcase className="text-slate-900" size={24} />
        </div>
        
        <nav className="flex flex-col gap-6">
          <SidebarIcon 
            icon={<LayoutDashboard size={24} />} 
            path={`/DashboardJobseeker/${id}`} 
            label="Dashboard" 
            active={location.pathname.includes('DashboardJobseeker')} 
          />
          <SidebarIcon 
            icon={<Square size={24} />} 
            path="/assessment/aptitude" 
            label="Aptitude Test" 
            active={location.pathname.includes('aptitude')} 
          />
          <SidebarIcon 
            icon={<ShieldCheck size={24} />} 
            path="/assessment/project" 
            label="Get Verified" 
            active={location.pathname.includes('project')} 
          />
          <SidebarIcon 
            icon={<User size={24} />} 
            path={`/profile/${profile?.fullName?.split(' ')[0].toLowerCase()}`} 
            label="My Profile" 
            active={location.pathname.includes('profile')} 
          />
        </nav>

        <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="mt-auto p-4 text-slate-500 hover:text-rose-400">
          <LogOut size={24} />
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        <header className="p-10 border-b bg-white/50 backdrop-blur">
            <h1 className="text-2xl font-black">Shuru Karein, {profile?.fullName}? 🚀</h1>
            <p className="text-slate-500">Complete your aptitude to unlock premium jobs.</p>
        </header>
        
        {/* Yahan tera Jobs Mapping wala code ayega jo pehle diya tha */}
      </main>
    </div>
  );
}

export default DashboardJobseeker;