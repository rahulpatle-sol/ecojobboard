import React from 'react';
import { CheckCircle, XCircle, Clock, Eye, Download } from 'lucide-react';

const TalentAnalytics = ({ jobs }) => {
  // Saare jobs ke applicants ko ek list mein merge karna
  const allApplicants = jobs.flatMap(job => 
    job.applications.map(app => ({ ...app, jobTitle: job.title }))
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-green-50">
          <p className="text-[10px] font-black text-green-500 uppercase">Hired</p>
          <h4 className="text-3xl font-black italic">02</h4>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-blue-50">
          <p className="text-[10px] font-black text-blue-500 uppercase">Shortlisted</p>
          <h4 className="text-3xl font-black italic">08</h4>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50">
          <p className="text-[10px] font-black text-orange-500 uppercase">Pending</p>
          <h4 className="text-3xl font-black italic">{allApplicants.length}</h4>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-8 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 uppercase tracking-tighter">Recent Talent Inflow</h3>
        <div className="space-y-4">
          {allApplicants.map((app, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold uppercase">
                  {app.talent?.user?.fullName[0]}
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800">{app.talent?.user?.fullName}</h5>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{app.jobTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 bg-white rounded-lg text-blue-600 shadow-sm"><Eye size={16}/></button>
                <button className="p-2 bg-white rounded-lg text-green-600 shadow-sm"><CheckCircle size={16}/></button>
                <button className="p-2 bg-white rounded-lg text-red-400 shadow-sm"><XCircle size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentAnalytics;