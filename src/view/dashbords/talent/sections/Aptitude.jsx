import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link as LinkIcon, CloudUpload, CheckCircle, Info } from 'lucide-react';
import API from '../../../../api/client';

const SUBJECTS = [
  'Logical Reasoning', 'Verbal Ability', 'Quantitative Aptitude', 'Visual Reasoning',
  'UI/UX Fundamentals', 'Programming Concepts', 'Computer Basics', 'Data Interpretation',
  'Coding Challenges', 'System Design Basics', 'Database Concepts', 'Operating Systems',
  'Networking Fundamentals', 'Cybersecurity Awareness', 'Excel & Spreadsheets', 'Communication Skills'
];

export default function Aptitude() {
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch existing data if any
  useEffect(() => {
    const loadSavedLinks = async () => {
      try {
        const res = await API.get('/users/my-assessment');
        if (res.data.assessment?.aptitudeLinks) {
          setLinks(res.data.assessment.aptitudeLinks);
        }
      } catch (err) { console.error("Error loading links", err); }
    };
    loadSavedLinks();
  }, []);

  const handleChange = (subject, value) => {
    setLinks((prev) => ({ ...prev, [subject]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Direct call to your backend route
      await API.post('/users/submit-assessment', { aptitudeLinks: links });
      toast.success("Progress Synchronized with Cloud Storage");
    } catch (err) {
      toast.error("Synchronization failed. Check network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Professional Header */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">APTITUDE ARTIFACTS</h2>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <Info size={16} className="text-blue-500" /> Submit your hosted solution links for managerial verification.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-lg shadow-blue-200 active:scale-95"
        >
          {loading ? "SAVING..." : <><CloudUpload size={20} /> SYNC ALL LINKS</>}
        </button>
      </div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SUBJECTS.map((subject, i) => (
          <motion.div
            key={subject}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`p-6 rounded-[2rem] border transition-all duration-300 ${
              links[subject] ? 'bg-white border-emerald-200 shadow-md shadow-emerald-50' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">{subject}</h3>
              {links[subject] && <CheckCircle className="text-emerald-500" size={18} />}
            </div>
            
            <div className="relative group">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input
                type="url"
                placeholder="Paste solution URL"
                value={links[subject] || ''}
                onChange={(e) => handleChange(subject, e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}