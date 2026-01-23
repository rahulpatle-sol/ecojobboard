import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth & Protection
import ProtectedRoute from '../components/ProtectedRoute'; // Ye humne abhi banaya tha

// Components/Pages
import App from '../App';
import Login from './Login';
import Signup from './Signup';
import VerifyOTP from './VerifyOTP';
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
import MentorProfile from  "./AssessmentSections/Mentorprofile"
import ForgotPassword from './ForgotPassword';

export default function AppRoutes() {
  return (
    <Routes>
      {/* --- Public Routes (Sab dekh sakte hain) --- */}
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/WelcomeSection" element={<WelcomeSection />} />

      {/* --- Protected Routes (Sirf Login ke baad) --- */}
      
      {/* Jobseeker Section */}
      <Route path="/DashboardJobseeker/:id" element={
        <ProtectedRoute> <DashboardJobseeker /> </ProtectedRoute>
      } />
      <Route path="/Jobsearch" element={<ProtectedRoute> <JobSearch /> </ProtectedRoute>} />
      <Route path="/Assessment" element={<ProtectedRoute> <CandidateAssessment /> </ProtectedRoute>} />
      <Route path="/Aptitude" element={<ProtectedRoute> <Apptitude /> </ProtectedRoute>} />
      <Route path="/verified" element={<ProtectedRoute> <Verified /> </ProtectedRoute>} />

      {/* HR Section */}
      <Route path="/DashboardHR" element={
        <ProtectedRoute> <DashboardHR /> </ProtectedRoute>
      } />
      <Route path="/ProfileBuilderHr" element={<ProtectedRoute> <ProfileBuilder /> </ProtectedRoute>} />
      <Route path="/PostJOB" element={<ProtectedRoute> <PostJob /> </ProtectedRoute>} />

      {/* Mentor Section */}
      <Route path='/MentorDashboard' element={
        <ProtectedRoute> <MentorDashbaord /> </ProtectedRoute>
      } />
      <Route path='/HostSession' element={<ProtectedRoute> <HostSession /> </ProtectedRoute>} />
      
      {/* Profiles & Misc */}
      <Route path="/create-profile" element={<ProtectedRoute> <ProfileGate /> </ProtectedRoute>} />
      <Route path="/CreateProfile" element={<ProtectedRoute> <CreateProfile /> </ProtectedRoute>} />
      <Route path="/mentor/:name" element={<MentorProfile />} />
      <Route path="/Notification" element={<ProtectedRoute> <Notification /> </ProtectedRoute>} />
       <Route path='/forget-password' element={<ForgotPassword/>}/>
      {/* 404 Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}