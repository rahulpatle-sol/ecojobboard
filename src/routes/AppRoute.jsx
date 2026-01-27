import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import HeroPage from '../view/public/HeroPage';
import Login from '../view/auth/Login';
import Signup from '../view/auth/Signup';
import Home from '../view/public/Home'
import { verifyOTP } from '../api/auth';
import VerifyOtp from '../view/auth/VerifyOTP'
// Dashboards
import DashboardJobseeker from '../view/dashbords/talent/TalentDashbord';
import DashboardHR from '../view/dashbords/Hr/HrDashbord'
import MentorDashboard from '../view/dashbords/mentor/MentorDashbord'
import PublicProfiles from '../view/public/PublicProfiles';
import UserProfileView from '../view/public/UserProfileView';
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
 <Route path="/verify-otp" element={<VerifyOtp/>} />
 <Route path="/discover" element={<PublicProfiles />} />
<Route path="/profile/:username" element={<UserProfileView />} />
      {/* Talent / Jobseeker */}
      <Route path="/DashboardJobseeker/:id" element={
        <ProtectedRoute allowedRoles={['TALENT']}>
          <DashboardJobseeker />
        </ProtectedRoute> 
      } />

      {/* HR Dashboard */}
      <Route path="/DashboardHR" element={
        <ProtectedRoute allowedRoles={['HR']}>
          <DashboardHR />
        </ProtectedRoute>
      } />

      {/* Mentor Dashboard */}
      <Route path="/MentorDashboard" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <MentorDashboard />
        </ProtectedRoute>
      } />

      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}