import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { HiOutlineLink, HiOutlineSave } from 'react-icons/hi';

const LinkSubmission = ({ userId }) => {
  const [links, setLinks] = useState({
    aptitude: '',
    learning: '',
    assessment: '',
    project: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Yahan API call hogi jo DB me status "PENDING" ke saath save karegi
    toast.info("Links submitted! Manager verification ka intezar karein.");
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
      <h3 className="font-bold text-xl mb-6">🔗 Submit Proof of Work</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup label="Aptitude Solution Link" value={links.aptitude} onChange={(v) => setLinks({...links, aptitude: v})} />
          <InputGroup label="Learning Resource Link" value={links.learning} onChange={(v) => setLinks({...links, learning: v})} />
          <InputGroup label="Assessment Results Link" value={links.assessment} onChange={(v) => setLinks({...links, assessment: v})} />
          <InputGroup label="Major Project Link (GitHub/Live)" value={links.project} onChange={(v) => setLinks({...links, project: v})} />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
          <HiOutlineSave size={20} /> Submit for Manager Verification
        </button>
      </form>
    </div>
  );
};

const InputGroup = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold text-slate-500 ml-1">{label}</label>
    <div className="relative">
      <HiOutlineLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input 
        type="url" 
        placeholder="https://..." 
        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 outline-none text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  </div>
);