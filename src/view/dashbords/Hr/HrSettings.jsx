import React from 'react';
import { User, Building, Shield, BellRing, Globe } from 'lucide-react';

const HrSettings = ({ recruiter }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-[3.5rem] p-12 shadow-sm border border-slate-50">
        <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter mb-10 underline decoration-blue-500 decoration-4 underline-offset-8">Account Config</h3>
        
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Building size={14}/> Company Details</h4>
            <div className="space-y-4">
              <input type="text" defaultValue={recruiter.company} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Company Name" />
              <input type="text" placeholder="Industry" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold outline-none" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Shield size={14}/> Security</h4>
            <div className="space-y-4">
              <button className="w-full text-left bg-slate-50 rounded-2xl p-4 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">Change Password</button>
              <button className="w-full text-left bg-slate-50 rounded-2xl p-4 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">Enable 2FA</button>
            </div>
          </div>
        </div>
        
        <button className="mt-12 bg-blue-600 text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-100">Save Configuration</button>
      </div>
    </div>
  );
};
export default HrSettings;