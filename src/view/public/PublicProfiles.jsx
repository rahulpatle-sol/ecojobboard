import React, { useState, useEffect } from 'react';
import { Search, User, Star } from 'lucide-react';

const PublicProfiles = ({ defaultView = 'mentors' }) => {
  const [view, setView] = useState(defaultView);
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([
    // Dummy Data test karne ke liye
    { id: 1, name: "Ritesh Mentor", subject: "React JS", role: "MENTOR", rating: 4.8 },
    { id: 2, name: "Aman Expert", subject: "Node JS", role: "MENTOR", rating: 4.9 },
    { id: 3, name: "Sagar Talent", subject: "Full Stack", role: "TALENT", rating: 4.5 },
  ]);

  const filteredData = profiles.filter(p => 
    p.role.toLowerCase() === view.slice(0, -1) && // mentors -> mentor
    (p.name.toLowerCase().includes(search.toLowerCase()) || 
     p.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full space-y-6">
      {/* 🔍 SEARCH BAR AREA */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder={`Search ${view} by name or skill...`}
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
          <button 
            onClick={() => setView('mentors')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'mentors' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            Mentors
          </button>
          <button 
            onClick={() => setView('talents')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'talents' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            Talents
          </button>
        </div>
      </div>

      {/* 🎴 RESULTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map(profile => (
          <div key={profile.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-md transition-all group">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <User size={30} />
            </div>
            <h3 className="font-black text-slate-800 uppercase italic tracking-tighter text-lg">{profile.name}</h3>
            <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">{profile.subject}</p>
            <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
              <Star size={14} fill="currentColor" /> {profile.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicProfiles;