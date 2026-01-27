import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Linkedin, Globe, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../../../api/client';

export default function ProfileReview() {
  const [file, setFile] = useState(null);
  const [links, setLinks] = useState({ portfolio: '', linkedin: '' });
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      if (file) formData.append('resume', file);
      formData.append('portfolio', links.portfolio);
      formData.append('linkedin', links.linkedin);

      // Backend Route: /api/v1/users/submit-profile-for-review
      const res = await API.post('/users/submit-profile-review', formData);
      
      if (res.data.success) {
        toast.success("Profile sent to Manager for manual audit!");
      }
    } catch (err) {
      toast.error("Submission failed. Check file size/format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-[2.5rem] p-10 text-white mb-10 shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">Professional Audit</h2>
          <p className="text-slate-400 mt-2 font-medium max-w-xl">
            Our management team manually reviews your resume and social presence to verify your 'Market-Ready' status.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CheckCircle size={120} />
        </div>
      </motion.div>

      <motion.form 
        onSubmit={handleUpload}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-8"
      >
        {/* Resume Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
            Master Resume (ATS Friendly PDF)
          </label>
          <div className="relative group">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div className="w-full py-10 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
              <UploadCloud className="text-slate-400 group-hover:text-blue-600 mb-2" size={40} />
              <p className="text-sm font-bold text-slate-500">
                {file ? file.name : "Drag & drop or click to upload"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portfolio */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
              <Globe size={14} /> Portfolio Link
            </label>
            <input
              type="url"
              placeholder="https://yourwork.com"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-medium"
              onChange={(e) => setLinks({...links, portfolio: e.target.value})}
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
              <Linkedin size={14} /> LinkedIn Profile
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/user"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-medium"
              onChange={(e) => setLinks({...links, linkedin: e.target.value})}
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Request Manager Review"}
        </button>
      </motion.form>
    </div>
  );
}