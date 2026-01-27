import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, MapPin, Award, CheckCircle, Zap, Mail, MessageSquare } from 'lucide-react';
import API from '../../api/client';

const UserProfileView = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/public/profile/${username}`);
        setUser(res.data.data);
      } catch (err) { console.error("Profile not found"); }
      finally { setLoading(false); }
    };
    fetchProfile();
  }, [username]);

  if (loading) return <div className="h-screen flex items-center justify-center font-black uppercase tracking-[0.5em] text-slate-300 animate-pulse">Loading Profile...</div>;
  if (!user) return <div className="h-screen flex items-center justify-center font-black text-red-500 uppercase">Profile Not Found!</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFF] pb-20">
      {/* HEADER / COVER */}
      <div className="h-64 bg-slate-900 relative">
        <div className="absolute -bottom-20 left-10 flex items-end gap-6">
          <div className="relative">
            <img src={user.profilePic || `https://ui-avatars.com/api/?name=${user.fullName}`} 
                 className="w-40 h-40 rounded-[3rem] border-8 border-[#F8FAFF] object-cover shadow-2xl" alt="pfp" />
            <div className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-xl text-white border-4 border-[#F8FAFF]">
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">{user.fullName}</h1>
            <p className="text-blue-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              <Zap size={14} fill="currentColor"/> {user.role === 'MENTOR' ? `Expert in ${user.subject}` : 'Verified Talent'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-28 px-10 grid grid-cols-12 gap-8">
        {/* LEFT COLUMN: ABOUT & SKILLS */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-50">
            <h4 className="font-black text-slate-800 uppercase italic tracking-tighter mb-4">Professional Bio</h4>
            <p className="text-slate-600 leading-relaxed font-medium">{user.bio || "No bio added yet."}</p>
          </div>

          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-50">
            <h4 className="font-black text-slate-800 uppercase italic tracking-tighter mb-6">Verified Skill Matrix</h4>
            <div className="flex flex-wrap gap-4">
              {user.skills?.map(skill => (
                <div key={skill} className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-600 hover:text-white transition-all cursor-default">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STATS & CONNECT */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl">
            <h4 className="font-black uppercase italic tracking-tighter text-yellow-400 mb-6">Quick Connect</h4>
            <div className="space-y-4">
              <SocialLink icon={<Linkedin size={18}/>} label="LinkedIn" link={user.socials?.linkedin} />
              <SocialLink icon={<Github size={18}/>} label="GitHub" link={user.socials?.github} />
              <SocialLink icon={<Mail size={18}/>} label="Send Email" link={`mailto:${user.email}`} />
            </div>
            <button className="w-full mt-8 bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-blue-600 transition-all shadow-xl shadow-blue-900/20">
              {user.role === 'MENTOR' ? 'Book a Session' : 'Hire Talent'}
            </button>
          </div>

          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-50">
            <h4 className="font-black text-slate-800 uppercase italic tracking-tighter mb-6">Identity</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase">
                <MapPin size={16} className="text-blue-500"/> {user.location || 'Remote / Global'}
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase">
                <Globe size={16} className="text-blue-500"/> English, Hindi
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialLink = ({ icon, label, link }) => (
  <a href={link} target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-all"/>
  </a>
);

const ArrowUpRight = ({size, className}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
);

export default UserProfileView;