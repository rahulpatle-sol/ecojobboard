import { useState } from 'react';
import Sidebar from './Sidebar';

// Sections Imports
import Aptitude from './sections/Aptitude';
import Learning from './sections/Learning';
import OnlineTest from './sections/OnlineTest';
import ProjectSubmission from './sections/ProjectSubmission';
import Scorecard from './sections/ScoreCard';
import RecommendedJob from './sections/RecommnedateJob';
import MentorDiscussion from './sections/MentorDiscussion';
import ProfileReview from './sections/ProfileReview';
import PublicProfiles from '../../public/PublicProfiles'; // 👈 Naya Import

export default function TalentDashboard() {
  const [activeTab, setActiveTab] = useState('scorecard'); 
  const user = JSON.parse(localStorage.getItem("user"));

  // Tab switcher logic
  const renderSection = () => {
    switch (activeTab) {
      case 'scorecard': return <Scorecard />;
      case 'aptitude': return <Aptitude />;
      case 'learning': return <Learning />;
      case 'projects': return <ProjectSubmission />;
      case 'test': return <OnlineTest />;
      case 'jobs': return <RecommendedJob />;
      case 'mentors': return <MentorDiscussion />;
      case 'discover': return <PublicProfiles defaultView="mentors" />; // 👈 Talent ke liye Mentors search
      case 'review': return <ProfileReview />;
      default: return <Scorecard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8faff] overflow-hidden">
      {/* 1. Sidebar Component - Isme hum setActiveTab bhej rahe hain */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50">
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">
              Dashboard / <span className="text-blue-600 italic">{activeTab}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{user?.fullName}</p>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{user?.role}</p>
            </div>
            <img 
              src={user?.profilePic || `https://ui-avatars.com/api/?name=${user?.fullName}`} 
              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-md" 
              alt="profile" 
            />
          </div>
        </header>

        {/* Dynamic Section Content */}
        <div className="p-4 md:p-10 animate-in slide-in-from-bottom-4 duration-500">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}