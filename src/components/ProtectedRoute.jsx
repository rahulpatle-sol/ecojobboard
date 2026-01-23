import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    
    const token = localStorage.getItem("accessToken");
    let user = null;

    // Try-Catch taaki agar JSON corrupt ho toh app crash na kare
    try {
        const storedUser = localStorage.getItem("user");
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("User parsing error:", error);
        localStorage.clear(); // Clear corrupt data
    }

    // 1. Check if authenticated
    if (!token || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Role-based Authorization check
    // user.role should be "TALENT", "HR", or "MENTOR"
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        const redirectPath = {
            TALENT: `/DashboardJobseeker/${user.id || user._id}`, // Check if your backend uses _id
            HR: '/DashboardHR',
            MENTOR: '/MentorDashboard',
            ADMIN: '/AdminDashboard'
        };

        return <Navigate to={redirectPath[user.role] || "/"} replace />;
    }

    return children;
};

export default ProtectedRoute;