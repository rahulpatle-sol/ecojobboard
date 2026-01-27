import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, DollarSign, Send, Filter, CheckCircle } from 'lucide-react';
import API from '../../../../api/client';

const RecommendedJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs/all'); // Backend endpoint to get all jobs
      if (res.data.success) setJobs(res.data.data);
    } catch (err) { console.error("Jobs fetch error:", err); }
    finally { setLoading(false); }
  };

  const handleApply = async (jobId) => {
    try {
      const res = await API.post(`/applications/apply/${jobId}`);
      if (res.data.success) {
        alert("Applied Successfully! HR ko tumhari profile bhej di gayi hai.");
        fetchJobs(); // Refresh to update button status
      }
    } catch (err) { alert(err.response?.data?.message || "Already Applied!"); }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search roles, companies, or keywords..."
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-lg">
          <Filter size={20} />
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full text-center py-20 font-black text-slate-300 italic uppercase tracking-[0.3em]">Scanning Opportunities...</p>
        ) : filteredJobs.map((job) => (
          <motion.div 
            whileHover={{ y: -10 }}
            key={job.id} 
            className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-50 hover:shadow-2xl hover:shadow-blue-100/50 transition-all group relative overflow-hidden"
          >
            {/* Company Badge */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {job.companyName?.[0] || 'C'}
              </div>
              <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
            </div>

            {/* Job Details */}
            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter leading-tight mb-2 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{job.companyName}</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-slate-500 font-bold text-[11px] uppercase tracking-tighter">
                <MapPin size={14} className="text-blue-500" /> {job.location || 'Remote'}
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-bold text-[11px] uppercase tracking-tighter">
                <Briefcase size={14} className="text-blue-500" /> {job.experience || 'Entry Level'}
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-bold text-[11px] uppercase tracking-tighter">
                <DollarSign size={14} className="text-blue-500" /> {job.salary || 'Competitive'}
              </div>
            </div>

            {/* Apply Button */}
            <button 
              onClick={() => handleApply(job.id)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-slate-100"
            >
              <Send size={14} /> Quick Apply
            </button>

            {/* Decor */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-0 group-hover:scale-150 -z-0"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJob;