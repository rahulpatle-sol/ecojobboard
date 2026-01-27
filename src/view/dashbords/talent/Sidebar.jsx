import React from 'react';
import { LayoutDashboard, Search, Briefcase, GraduationCap, Code, FileSearch, MessageCircle, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'scorecard', label: 'My Progress', icon: <LayoutDashboard size={20}/> },
    { id: 'discover', label: 'Find Mentors', icon: <Search size={20}/> }, // 👈 Search ke liye
    { id: 'jobs', label: 'Job Board', icon: <Briefcase size={20}/> },
    { id: 'learning', label: 'Skills Lab', icon: <GraduationCap size={20}/> },
    { id: 'projects', label: 'Submissions', icon: <Code size={20}/> },
    { id: 'mentors', label: 'Live Sessions', icon: <MessageCircle size={20}/> },
  ];

  return (
    <aside className="w-64 bg-slate-900 h-full p-6 flex flex-col gap-8 hidden lg:flex border-r border-white/5">
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic">S2H</div>
        <h2 className="text-white font-black italic tracking-tighter text-xl">Skill2Hire</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <button className="flex items-center gap-4 px-4 py-4 text-red-400 font-black text-[10px] uppercase tracking-widest hover:bg-red-500/10 rounded-2xl transition-all">
        <LogOut size={20}/> Logout
      </button>
    </aside>
  );
};

export default Sidebar;