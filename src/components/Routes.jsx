// src/Routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from '../App';
import Login from './Login';
import Signup from './Signup';
import CreateProfile from './CreateProfile';
import DashboardJobseeker from './DashboardJobseeker';
import DashboardHR from './DashboardHR';
import ProfileGate from './ProfileGate';
import JobSearch from './Jobsearch';
import WelcomeSection from './WelcomeSection';
import Notification from './Notification';
import CandidateAssessment from './CandidateAssessment';
import Verified from './Verified';
import Apptitude from './Aptitude';
import ProfileBuilder from './ProfileBuilderHr';
import PostJob from './PostJob';

import MentorDashbaord from './MentorDashboard'
import HostSession from './HostSession';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/CreateProfile" element={<CreateProfile />} />
      <Route path="/DashboardJobseeker/:id" element={<DashboardJobseeker />} />
      <Route path="/DashboardHR" element={<DashboardHR />} />
      <Route path="/create-profile" element={<ProfileGate />} />
      <Route path="/Jobsearch" element={<JobSearch />} />
      <Route path="/WelcomeSection" element={<WelcomeSection />} />
      <Route path="/Notification" element={<Notification />} />
      <Route path="/Assessment" element={<CandidateAssessment />} />
      <Route path="/verified" element={<Verified />} />
    <Route path="/Aptitude" element={<Apptitude />} />

       <Route path="/ProfileBuilderHr" element={<ProfileBuilder />} />
       <Route path="/PostJOB" element={<PostJob/>}></Route>
       <Route path='/MentorDashboard' element={<MentorDashbaord/>}></Route>
       <Route path='/HostSession' element={<HostSession/>}></Route>
    </Routes>
  );
}
