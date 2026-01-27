import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';

export default function OnlineTest() {
  const instructions = [
    "Check your registered Gmail/Outlook for the official test invite.",
    "The test link (Google Form/Meet) will be shared 5 minutes before the slot.",
    "Ensure a stable internet connection and a working webcam.",
    "Results will be audited and synced to your scorecard within 24 hours."
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      
      {/* --- HERO SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl"
      >
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-black tracking-widest text-xs uppercase">
            <ShieldCheck size={18} /> Secure Assessment Environment
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase italic">Online Examination Hub</h1>
          <p className="text-slate-400 max-w-2xl font-medium">
            Your assessments are managed directly by our technical board. High-proctoring standards apply. 
            All test links are dispatched via authorized managerial emails.
          </p>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- INSTRUCTIONS PANEL --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm"
        >
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <AlertCircle className="text-blue-600" /> CANDIDATE INSTRUCTIONS
          </h3>
          <div className="space-y-4">
            {instructions.map((text, i) => (
              <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <p className="text-slate-700 font-semibold text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- STATUS & ACTION PANEL --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Waiting Card */}
          <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-100 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Mail size={32} className="text-white" />
            </div>
            <h4 className="text-xl font-black uppercase">Check Your Inbox</h4>
            <p className="text-blue-100 text-sm mt-2 mb-6 font-medium">
              The Manager will send the test link to your registered email address.
            </p>
            <a 
              href="https://mail.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-black text-sm hover:bg-slate-100 transition shadow-lg"
            >
              Go to Gmail <ExternalLink size={16} />
            </a>
          </div>

          {/* Time Warning */}
          <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-200 flex items-center gap-4">
            <Clock className="text-slate-400" size={24} />
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Typical Response Time</p>
              <p className="text-sm font-bold text-slate-700">Within 15-30 mins of slot</p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}