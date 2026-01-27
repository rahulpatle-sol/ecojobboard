import React, { useState } from 'react';
import { X, PlusCircle, Briefcase, MapPin, DollarSign } from 'lucide-react';
import API from '../../../api/client';
import { toast } from 'react-toastify';

const PostJob = ({ onClose, onSuccess }) => {
  const [jobForm, setJobForm] = useState({ 
    title: '', 
    location: '', 
    salary: '', 
    description: '', 
    requiredSkills: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend array expect karta hai, isliye string ko array mein convert kiya
      const skillsArray = jobForm.requiredSkills.split(',').map(s => s.trim());
      
      const res = await API.post('/jobs/post-job', { 
        ...jobForm, 
        requiredSkills: skillsArray 
      });

      if (res.data.success) {
        toast.success("Job Deployed Successfully! 🚀");
        onSuccess(); // Dashboard refresh karne ke liye
        onClose();   // Modal close karne ke liye
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
      console.error("Posting failed", err);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={onClose} 
        className="absolute -top-4 -right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all text-slate-500"
      >
        <X size={20}/>
      </button>
      
      <h2 className="text-3xl font-black italic mb-8 uppercase tracking-tighter">Deploy New Role</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Briefcase className="absolute left-4 top-5 text-slate-400" size={18}/>
            <input 
              required 
              className="w-full bg-slate-50 p-5 pl-12 rounded-3xl outline-none border-2 border-transparent focus:border-blue-500 transition-all font-bold" 
              placeholder="Job Title" 
              onChange={e => setJobForm({...jobForm, title: e.target.value})} 
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-5 text-slate-400" size={18}/>
            <input 
              required 
              className="w-full bg-slate-50 p-5 pl-12 rounded-3xl outline-none border-2 border-transparent focus:border-blue-500 transition-all font-bold" 
              placeholder="Location" 
              onChange={e => setJobForm({...jobForm, location: e.target.value})} 
            />
          </div>
        </div>

        <div className="relative">
          <DollarSign className="absolute left-4 top-5 text-slate-400" size={18}/>
          <input 
            className="w-full bg-slate-50 p-5 pl-12 rounded-3xl outline-none border-2 border-transparent focus:border-blue-500 transition-all font-bold" 
            placeholder="Salary (e.g. 50k - 80k)" 
            onChange={e => setJobForm({...jobForm, salary: e.target.value})} 
          />
        </div>

        <input 
          className="w-full bg-slate-50 p-5 rounded-3xl outline-none border-2 border-transparent focus:border-blue-500 transition-all font-bold" 
          placeholder="Skills (React, Node, MongoDB...)" 
          onChange={e => setJobForm({...jobForm, requiredSkills: e.target.value})} 
        />

        <textarea 
          required 
          className="w-full bg-slate-50 p-5 rounded-3xl outline-none h-32 border-2 border-transparent focus:border-blue-500 transition-all font-bold" 
          placeholder="Describe the mission and responsibilities..." 
          onChange={e => setJobForm({...jobForm, description: e.target.value})} 
        />

        <button className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black hover:bg-blue-600 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 shadow-xl">
          Publish Opportunity <PlusCircle size={20}/>
        </button>
      </form>
    </div>
  );
};

export default PostJob;