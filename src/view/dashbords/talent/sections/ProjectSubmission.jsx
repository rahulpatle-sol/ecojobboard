import React, { useState } from 'react';
import { Send, Github, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../../../api/client'; // Tera axios helper with .env config

const ProjectSubmission = () => {
  const [data, setData] = useState({ github: '', live: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend route: /api/v1/users/submit-assessment
      const response = await API.post('/users/submit-assessment', {
        github: data.github,
        liveLink: data.live
      });

      if (response.data.success) {
        toast.success("Project artifacts submitted. Manager review initiated.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed. Please verify connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden">
      {/* Decorative Branding */}
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Github size={120} />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase italic">
          Manager's Assignment
        </h2>
        <p className="text-slate-500 mb-8 font-medium">
          Submit the repository and live deployment links for the project assigned by your manager.
        </p>

        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl flex items-start gap-3">
          <AlertCircle className="text-blue-600 mt-1" size={20} />
          <p className="text-sm text-blue-800 font-semibold leading-relaxed">
            Ensure the repository is public or has granted access to the management team for auditing.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Source Code (GitHub/GitLab)
            </label>
            <div className="relative">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
              <input 
                type="url" 
                placeholder="https://github.com/username/project" 
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                onChange={(e) => setData({...data, github: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Deployment Link (Vercel/Netlify)
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
              <input 
                type="url" 
                placeholder="https://your-project.vercel.app"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                onChange={(e) => setData({...data, live: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-[20px] font-black hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 uppercase tracking-widest active:scale-95 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Submit for Manager Audit"} <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectSubmission;