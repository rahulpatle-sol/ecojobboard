import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { HiOutlineLink, HiOutlineCloudUpload } from 'react-icons/hi';

export default function LinkSubmission() {
  const [links, setLinks] = useState({ aptitude: '', learning: '', assessment: '', project: '' });
  const [loading, setLoading] = useState(false);

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // API Call: Yahan tumhara Backend route aayega (e.g. /api/v1/users/submit-links)
    setTimeout(() => {
      toast.success("Links submitted! Manager will verify soon.");
      setLoading(false);
    }, 1500);
  };

  const InputField = ({ label, id }) => (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-black text-slate-500 uppercase ml-1">{label}</label>
      <div className="relative">
        <HiOutlineLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="url" 
          placeholder="https://github.com/..." 
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-sm font-medium"
          value={links[id]}
          onChange={(e) => setLinks({...links, [id]: e.target.value})}
          required
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <h2 className="text-xl font-black mb-6 flex items-center gap-2">
        <HiOutlineCloudUpload className="text-blue-600" /> PROOF OF WORK LINKS
      </h2>
      <form onSubmit={handleLinkSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Aptitude Solution Link" id="aptitude" />
        <InputField label="Learning Journey Link" id="learning" />
        <InputField label="External Assessment" id="assessment" />
        <InputField label="GitHub Project Link" id="project" />
        
        <button type="submit" disabled={loading} className="md:col-span-2 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition duration-300">
          {loading ? "Uploading..." : "Submit for Manager Approval"}
        </button>
      </form>
    </div>
  );
}