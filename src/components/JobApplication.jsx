import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ShieldCheck, FileText, Mail, Phone, ExternalLink, 
  ArrowLeft, CheckCircle, XCircle, Clock 
} from 'lucide-react';
import { toast } from 'react-toastify';

const JobApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/jobs/applicants/${jobId}`, {
  headers: { Authorization: `Bearer ${token}` }
});
        // Backend se job title aur uske andar ke applicants aayenge
        setApplications(response.data.data.applications);
        setJobDetails(response.data.data.job);
      } catch (error) {
        toast.error("Applications load nahi ho payi!");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobId, token]);

  const handleStatusUpdate = async (appId, status) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/applications/${appId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Candidate ${status.toLowerCase()}!`);
      // UI update
      setApplications(apps => apps.map(a => a.id === appId ? { ...a, status } : a));
    } catch (err) {
      toast.error("Status update fail!");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Checking Applicants...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      {/* Back Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition">
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <div className="text-right">
          <h1 className="text-2xl font-black text-slate-900">{jobDetails?.title}</h1>
          <p className="text-slate-500 text-sm">{applications.length} Candidates Applied</p>
        </div>
      </div>

      {/* Applicants List */}
      <div className="max-w-6xl mx-auto grid gap-4">
        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium text-lg">Bhai, abhi tak kisi ne apply nahi kiya.</p>
          </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between hover:shadow-md transition-all">
              
              {/* Candidate Profile Info */}
              <div className="flex items-center gap-5 flex-1">
                <div className="relative">
                  <img 
                    src={app.talent.user.profilePic || `https://ui-avatars.com/api/?name=${app.talent.user.fullName}`} 
                    className="w-16 h-16 rounded-2xl object-cover" 
                    alt="Candidate" 
                  />
                  {app.talent.isVerified && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-sm" title="Verified Talent">
                      <ShieldCheck size={14} fill="white" />
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    {app.talent.user.fullName}
                    {app.talent.isVerified && <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified</span>}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-slate-500 text-sm">
                    <span className="flex items-center gap-1"><Mail size={14}/> {app.talent.user.email}</span>
                    <span className="flex items-center gap-1 font-bold text-amber-600 italic">Score: {app.talent.aptitudeScore || 'N/A'}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6 md:mt-0">
                <a 
                  href={app.talent.resumeUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition"
                >
                  <FileText size={16} /> Resume
                </a>
                
                <button 
                  onClick={() => navigate(`/profile/${app.talent.user.id}`)}
                  className="p-2 text-slate-400 hover:text-blue-500"
                >
                  <ExternalLink size={20} />
                </button>

                <div className="h-10 w-[1px] bg-slate-100 mx-2 hidden md:block"></div>

                {/* Status Toggle */}
                {app.status === 'PENDING' ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                      className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition"
                    >
                      <CheckCircle size={22} />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                      className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition"
                    >
                      <XCircle size={22} />
                    </button>
                  </div>
                ) : (
                  <span className={`px-4 py-2 rounded-xl text-xs font-black tracking-widest uppercase ${
                    app.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {app.status}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobApplications;