import React, { useState } from 'react';
import {
  ArrowRightCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Importing all modular sections
import Learning from './AssessmentSections/Learning';
import Aptitude from './AssessmentSections/Aptitude';
import MentorDiscussion from './AssessmentSections/MentorDiscussion';
import OnlineTest from './AssessmentSections/OnlineTest';
import ProfileReview from './AssessmentSections/ProfileReview';
import Scorecard from './AssessmentSections/ScoreCard';
import RecommnedateJob from './AssessmentSections/RecommnedateJob';


const steps = [
  { label: 'Learning - We prefer to learn the stuff', path: 'learning', status: 'Completed' },
  { label: 'Aptitude - Test your skill', path: 'Aptitude', status: 'In Progress' },
  { label: 'Discussion with mentor', path: 'mentor-discussion', status: 'Pending' },
  { label: 'Project submission', path: 'project-submission', status: 'Pending' },
  { label: 'Profile Review', path: 'profile-review', status: 'Pending' },
  { label: 'Online Test', path: 'online-test', status: 'Pending' },
  { label: 'Scorecard', path: 'scorecard', status: 'Pending' },
  { label: 'Recommended Jobs', path: 'recommended-jobs', status: 'Pending' },
  { label: 'Recruitment', path: 'recruitment', status: 'Pending' },
];

// Amber-themed status styles
const getStepStyles = (status) => {
  const icon = status === 'Completed' ? CheckCircle : status === 'In Progress' ? Clock : ArrowRightCircle;
  return { icon, classes: 'bg-amber-100 text-amber-600 border-amber-300' };
};

export default function CandidateAssessment() {
  const [activeSection, setActiveSection] = useState('learning');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'learning': return <Learning />;
      case 'Aptitude': return <Aptitude />;
      case 'mentor-discussion': return <MentorDiscussion />;
      case 'project-submission': return <ProjectSubmission />;
      case 'profile-review': return <ProfileReview />;
      case 'online-test': return <OnlineTest />;
      case 'scorecard': return <Scorecard />;
      case 'recommended-jobs': return <RecommendedJobs />;
      case 'recruitment': return <Recruitment />;
      default: return <Learning />;
    }
  };

  return (
    <div className="flex h-screen w-full font-sans bg-gradient-to-br from-amber-50 via-yellow-100 to-beige-200">
      {/* Left: Steps List */}
      <div className="w-full md:w-1/3 bg-white p-6 overflow-y-auto border-r border-slate-200 shadow-xl">
        <h2 className="text-2xl font-extrabold mb-6 text-slate-800 border-b pb-2">Candidate Journey</h2>
        <ul className="space-y-3">
          {steps.map((step, i) => {
            const { icon: StepIcon, classes } = getStepStyles(step.status);
            return (
              <li
                key={i}
                onClick={() => setActiveSection(step.path)}
                className={`flex items-center gap-4 text-slate-700 p-3 rounded-xl cursor-pointer transition-all duration-300 
                            hover:bg-amber-50 hover:shadow-lg hover:scale-[1.02] border border-transparent hover:border-amber-300 
                            ${activeSection === step.path ? 'bg-amber-100 border-amber-300' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-inner flex-shrink-0 ${classes}`}>
                  <StepIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-semibold text-slate-800 block">{step.label.split(' - ')[0]}</span>
                  <span className="text-xs text-slate-500">{step.label.split(' - ')[1]} - <strong className='font-medium'>{step.status}</strong></span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right: Dynamic Section Renderer */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {renderActiveSection()}
      </div>
    </div>
  );
}
