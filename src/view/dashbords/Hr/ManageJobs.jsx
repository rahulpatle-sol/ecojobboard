import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, FileText, Mail, MapPin, Search } from 'lucide-react';
import API from '../../../api/client';

const ManageJobs = ({ jobs, refreshData }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  const updateStatus = async (appId, status) => {
    try {
      await API.put(`/applications/${appId}/status`, { status });
      refreshData(); // Dashboard stats update honge
    } catch (err) { console.error(err); }
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* LEFT: JOB LISTING */}
      <div className={`${selectedJob ? 'col-span-4' : 'col-span-12'} space-y-4 overflow-y-auto no-scrollbar transition-all duration-500`}>
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Live Listings</h3>
        {jobs.map(job => (
          <motion.div 
            key={job.id} onClick={() => setSelectedJob(job)}
            className={`p-6 rounded-[2rem] cursor-pointer border-2 transition-all ${selectedJob?.id === job.id ? 'bg-white border-blue-600 shadow-xl scale-[1.02]' : 'bg-white/50 border-transparent hover:border-slate-200'}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-black text-slate-800 uppercase italic tracking-tighter">{job.title}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{job.location} • {job.salary}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black">{job.applications?.length || 0} APPS</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* RIGHT: APPLICANT POOL */}
      {selectedJob && (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="col-span-8 bg-white rounded-[3.5rem] p-10 shadow-2xl flex flex-col border border-slate-50">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Applicants Pool</h3>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">{selectedJob.title}</p>
            </div>
            <button onClick={() => setSelectedJob(null)} className="p-3 bg-slate-50 rounded-full text-slate-300 hover:text-red-500 transition-all"><X size={22}/></button>
          </div>

          <div className="space-y-4 overflow-y-auto no-scrollbar">
            {selectedJob.applications?.map((app, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-[2.5rem] flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-50">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {app.talent?.user?.fullName[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase tracking-tight italic">{app.talent?.user?.fullName}</h4>
                    <div className="flex gap-4 mt-1">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter"><Mail size={12}/> {app.talent?.user?.email}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${app.status === 'HIRED' ? 'text-green-500' : 'text-blue-500'}`}>{app.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button onClick={() => updateStatus(app.id, 'SHORTLISTED')} className="p-4 bg-white rounded-2xl text-blue-500 hover:bg-blue-500 hover:text-white shadow-sm transition-all" title="Shortlist"><CheckCircle size={20} /></button>
                  <button onClick={() => updateStatus(app.id, 'HIRED')} className="p-4 bg-slate-900 text-white rounded-2xl shadow-lg hover:bg-green-600 transition-all" title="Final Hire"><CheckCircle size={20} /></button>
                  <a href={app.talent?.resume} target="_blank" className="p-4 bg-white rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all"><FileText size={20}/></a>
                </div>
              </div>
            ))}
            {(!selectedJob.applications || selectedJob.applications.length === 0) && (
              <div className="text-center py-20 text-slate-300 font-black uppercase tracking-[0.4em] italic">No Applications Yet</div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default ManageJobs;