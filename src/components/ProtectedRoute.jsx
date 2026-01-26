import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    // 1. Agar token ya user missing hai
    if (!token || !storedUser) {
        console.log("No Token found, redirecting to login...");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    let user;
    try {
        user = JSON.parse(storedUser);
    } catch (e) {
        console.error("User data corrupt!");
        return <Navigate to="/login" replace />;
    }

    // 2. Role Check (Agar roles pass kiye gaye hain)
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        console.log(`Role mismatch! User: ${user.role}, Allowed: ${allowedRoles}`);
        
        // Sahi dashboard dhundho
        const dashMap = {
            TALENT: `/DashboardJobseeker/${user.id || user._id}`,
            HR: '/DashboardHR',
            MENTOR: '/MentorDashboard'
        };
        return <Navigate to={dashMap[user.role] || "/login"} replace />;
    }

    return children;
};

export default ProtectedRoute;