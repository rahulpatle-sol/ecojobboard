import React, { useState } from 'react';
import { Send, Github, Link as LinkIcon } from 'lucide-react';
import { toast } from 'react-toastify';

const ProjectSubmission = () => {
  const [data, setData] = useState({ github: '', live: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call to submit project for Manager Review
    toast.success("Project submitted! Manager will review and badge you soon.");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-[32px] shadow-xl border border-slate-100">
      <h2 className="text-3xl font-black text-slate-900 mb-2">Final Step: Project Submission</h2>
      <p className="text-slate-500 mb-8">Submit your best work to get the 'Verified' badge.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold flex items-center gap-2"><Github size={18}/> GitHub Repository</label>
          <input 
            type="url" placeholder="https://github.com/..." required
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setData({...data, github: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-bold flex items-center gap-2"><LinkIcon size={18}/> Live Demo Link</label>
          <input 
            type="url" placeholder="https://my-project.vercel.app"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setData({...data, live: e.target.value})}
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
          Submit for Review <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ProjectSubmission;