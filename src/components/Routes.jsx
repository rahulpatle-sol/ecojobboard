import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Hero from '../view/public/HeroPage';
// Sare imports check kar lena...

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HeroPage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Talent Dashboard */}
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
          <MentorDashbaord />
        </ProtectedRoute>
      } />

      {/* Common Pages */}
      <Route path="/PostJOB" element={
        <ProtectedRoute allowedRoles={['HR']}><PostJob /></ProtectedRoute>
      } />
      <Route path="/Jobsearch" element={
        <ProtectedRoute allowedRoles={['TALENT']}><JobSearch /></ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}