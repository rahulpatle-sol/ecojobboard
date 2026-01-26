import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';

// Views
import Login from '../views/auth/Login';
import DashboardHR from '../views/hr/DashboardHR';
import DashboardJobseeker from '../views/jobseeker/DashboardJobseeker';
import MentorDashboard from '../views/mentor/MentorDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />

      {/* HR ZONE */}
      <Route path="/hr" element={<ProtectedRoute allowedRoles={['HR']}><DashboardLayout role="HR" /></ProtectedRoute>}>
        <Route path="dashboard" element={<DashboardHR />} />
        <Route path="post-job" element={<div>Post Job Page</div>} />
      </Route>

      {/* JOBSEEKER ZONE */}
      <Route path="/jobseeker" element={<ProtectedRoute allowedRoles={['TALENT']}><DashboardLayout role="TALENT" /></ProtectedRoute>}>
        <Route path="dashboard/:id" element={<DashboardJobseeker />} />
        <Route path="jobs" element={<div>Job Search Page</div>} />
      </Route>

      {/* MENTOR ZONE */}
      <Route path="/mentor" element={<ProtectedRoute allowedRoles={['MENTOR']}><DashboardLayout role="MENTOR" /></ProtectedRoute>}>
        <Route path="dashboard" element={<MentorDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}