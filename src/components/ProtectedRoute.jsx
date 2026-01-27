import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const token = localStorage.getItem("accessToken");
    const userJson = localStorage.getItem("user");

    if (!token || !userJson) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const user = JSON.parse(userJson);

    // Role check logic
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        const dashMap = {
            TALENT: `/DashboardJobseeker/${user.id || user._id}`,
            HR: '/DashboardHR',
            MENTOR: '/MentorDashboard'
        };
        return <Navigate to={dashMap[user.role]} replace />;
    }

    return children;
};

export default ProtectedRoute;