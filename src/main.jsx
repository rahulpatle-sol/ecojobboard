import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css'
import Login from './components/Login';
import Signup from './components/Signup';
import CreateProfile from './components/CreateProfile'; 
import DashboardJobseeker from './components/DashboardJobseeker';
import DashboardHR from './components/DashboardHR';

import ProfileGate from './components/ProfileGate';
import JobSearch from './components/Jobsearch';
import WelcomeSection from './components/WelcomeSection'
import Notification from './components/Notification';
import CandidateAssessment from './components/CandidateAssessment';

import Verified from './components/Verified';

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
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
    <Route path="/Notification" element={<Notification/>}></Route>
     <Route path="/Assessment" element={<CandidateAssessment/>}></Route> 
          <Route path="/verified" element={<Verified/>}></Route> 
  </Routes>
</BrowserRouter>

);
