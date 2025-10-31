import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// Using Lucide Icons for a clean, professional look (replacing react-icons)
import { 
  LayoutDashboard, List, Bell, Edit, CheckCircle, AlertTriangle, X, User, Briefcase, MapPin, DollarSign, Clock, Search, ShieldCheck, Square // <-- FIX: Added Square
} from 'lucide-react';

// --- HELPER COMPONENTS ---

// 1. Custom Notification Component (Replaces alert())
const Notification = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  const typeClasses = {
    success: 'bg-green-50 border-green-400 text-green-700',
    error: 'bg-red-50 border-red-400 text-red-700',
  };
  
  const Icon = type === 'success' ? CheckCircle : AlertTriangle;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000); // Auto-hide after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className="fixed top-4 right-4 z-[100] w-full max-w-sm transition-opacity duration-300 ease-in-out opacity-100">
      <div 
        className={`flex items-center p-4 rounded-xl border-l-4 shadow-xl ${typeClasses[type]}`}
        role="alert"
      >
        <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
        <button 
          onClick={onClose} 
          className="ml-auto p-1.5 rounded-full hover:bg-opacity-80 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 2. Skeleton Loader for Job Cards (Premium Loading State)
const JobCardSkeleton = () => (
  <div className="animate-pulse mb-6 p-6 rounded-2xl bg-white shadow-lg border border-slate-100">
    <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-slate-100 rounded w-full mb-4"></div>
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div className="h-3 bg-slate-100 rounded w-5/6"></div>
      <div className="h-3 bg-slate-100 rounded w-5/6"></div>
      <div className="h-3 bg-slate-100 rounded w-2/3"></div>
      <div className="h-3 bg-slate-100 rounded w-2/3"></div>
    </div>
    <div className="mt-4 h-10 bg-indigo-200 rounded-xl w-24"></div>
  </div>
);


// --- MAIN COMPONENT ---
function DashboardJobseeker() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  // Mock Data Fetching (Simulating API calls)
  useEffect(() => {
    setLoadingProfile(true);
    // Note: Localhost calls are not runnable in the sandbox, but the structure is maintained.
    fetch(`http://localhost:3000/jobseekerProfiles?userId=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setProfile(data[0]);
        setLoadingProfile(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setLoadingProfile(false);
      });
  }, [id]);

  useEffect(() => {
    setLoadingJobs(true);
    fetch('http://localhost:3000/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoadingJobs(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoadingJobs(false);
      });
  }, []);

  const handleApply = async (jobId) => {
    // Prevent double notifications
    setNotification({ ...notification, visible: false }); 

    const application = {
      jobId,
      userId: id,
      appliedAt: new Date().toISOString()
    };

    try {
      // Simulate successful/failed application based on environment
      const isMockSuccess = Math.random() > 0.3; // 70% chance of success for mock
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay

      if (isMockSuccess) {
        // SUCCESS Notification
        setNotification({ 
          message: 'Application submitted successfully! Good luck.', 
          type: 'success', 
          visible: true 
        });
      } else {
        // FAILURE Notification
        setNotification({ 
          message: 'Failed to apply. Please try again.', 
          type: 'error', 
          visible: true 
        });
      }

      // const res = await fetch('http://localhost:3000/applications', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(application)
      // });

      // if (res.ok) {
      //   setNotification({ message: 'Applied successfully!', type: 'success', visible: true });
      // } else {
      //   setNotification({ message: 'Failed to apply.', type: 'error', visible: true });
      // }
    } catch (e) {
      setNotification({ message: 'Network error during application.', type: 'error', visible: true });
    }
  };

  const handleCloseNotification = () => setNotification({ ...notification, visible: false });

  const filteredJobs = jobs.filter(job =>
    job.hiringRole.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Profile Skeleton Loader
  const ProfileSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-100 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
        <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-slate-200 flex-shrink-0"></div>
            <div>
                <div className="h-5 bg-slate-200 rounded w-48 mb-2"></div>
                <div className="h-8 bg-indigo-100 rounded-xl w-28"></div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
            {[...Array(6)].map((_, i) => (
                <div key={i}><div className="h-3 bg-slate-100 rounded w-full"></div></div>
            ))}
        </div>
    </div>
  );


  return (
    <div className="flex min-h-screen bg-amber-50 font-sans">
      
      {/* Custom Notification Mount */}
      <Notification 
        message={notification.message} 
        type={notification.type} 
        isVisible={notification.visible} 
        onClose={handleCloseNotification} 
      />

      {/* Left Toolbar (Animated & Premium) */}
      <div className="w-20 bg-slate-800 shadow-2xl flex flex-col items-center py-6 space-y-8 text-slate-400 text-xl transition-all duration-300">
        <Link 
          to="/" 
          className="p-3 rounded-xl hover:bg-slate-700 hover:text-amber-300 transition-colors duration-200 group"
          title="Dashboard"
        >
          <LayoutDashboard className="text-indigo-400 w-7 h-7 mb-4" />
        </Link>
        
        {/* Navigation Items */}
        {/* <Link 
        to="/DashboardJobseeker/{id}" 
          className="p-3 rounded-xl hover:bg-slate-700 hover:text-indigo-300 transition-colors duration-200 group"
          title="Dashboard"
        >
          <List className="w-6 h-6" />
        </Link> */}
        <Link 
          to="/Assessment" 
          className="p-3 rounded-xl hover:bg-slate-700 hover:text-amber-300 transition-colors duration-200 group"
          title="Assessment"
        >
          <Square className="w-6 h-6" />
        </Link>
        <Link 
          to="/Verified" 
          className="p-3 rounded-xl hover:bg-slate-700 hover:text-amber-300 transition-colors duration-200 group"
          title="Verification"
        >
          <ShieldCheck className="w-6 h-6" />
        </Link>
        <Link 
          to="/Notification" 
          className="p-3 rounded-xl hover:bg-slate-700 hover:text-amber-300 transition-colors duration-200 group"
          title="Notifications"
        >
          <Bell className="w-6 h-6" />
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Top Bar with Search & User Avatar */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-10 py-3 w-full border border-slate-300 rounded-xl shadow-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-500 shadow-lg flex-shrink-0" />
        </div>

        {/* Profile Header Card */}
        {loadingProfile ? <ProfileSkeleton /> : (
          <div className="bg-amber-50 rounded-2xl shadow-xl p-6 md:p-8 mb-10 border border-slate-100 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-4 text-slate-800">
              Welcome back, <span className="text-amber-600">{profile?.fullName.split(' ')[0]}</span> 👋
            </h2>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-6 border-t pt-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-200 flex items-center justify-center bg-gray-100 shadow-md flex-shrink-0">
                {profile.profilePic ? (
                  <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-amber-500 w-12 h-12" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-slate-800">{profile.fullName}</h3>
                <p className="text-amber-700 font-medium mb-3">{profile.profileHeadline || 'A passionate jobseeker.'}</p>
                <button className="px-4 py-2 bg-amber-600 text-white rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-indigo-700 transition transform hover:scale-[1.01] shadow-md">
                  <Edit className="w-4 h-4" /> Update Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-sm text-slate-700 border-t pt-4">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" /><strong>Location:</strong> {profile.location || 'Global'}</div>
              <div className="flex items-center gap-2"><User className="w-4 h-4 text-amber-400" /><strong>Nickname:</strong> {profile.nickName || 'N/A'}</div>
              <div className="flex items-center gap-2"><Bell className="w-4 h-4 text-amber-400" /><strong>Email:</strong> {profile.email || 'Hidden'}</div>
              <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-amber-400" /><strong>Country:</strong> {profile.country || 'India'}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-400" /><strong>Gender:</strong> {profile.gender || 'N/A'}</div>
            </div>

          </div>
        )}

        {/* Job Recommendations Section */}
        <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">Top Job Opportunities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingJobs ? (
            <>
              <JobCardSkeleton /><JobCardSkeleton /><JobCardSkeleton />
            </>
          ) : filteredJobs.length === 0 ? (
            <p className="text-slate-600 col-span-full p-8 text-center bg-white rounded-xl shadow-lg">
              No matching jobs found. Try adjusting your search query.
            </p>
          ) : (
            filteredJobs.map(job => (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-900">{job.hiringRole}</h3>
                  <div className="text-xs font-semibold text-white bg-amber-500 px-3 py-1 rounded-full">{job.employmentType || 'Full-Time'}</div>
                </div>

                <p className="text-slate-500 mb-4 line-clamp-2">{job.jobDesc}</p>
                
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-500" />
                    <strong>{job.companyName || 'Confidential'}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span>{job.location || 'Remote'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-indigo-500" />
                    <span>{job.payoutScale || 'Competitive'}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleApply(job.id)}
                  className="mt-6 w-full px-4 py-3 bg-amber-400 text-white rounded-xl font-semibold hover:bg-gray-700 transition transform hover:scale-[1.01] shadow-md shadow-indigo-300"
                >
                  Apply Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardJobseeker;
