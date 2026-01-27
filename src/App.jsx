// src/App.jsx
import React from 'react';
import AppRoutes from './routes/AppRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      
      {/* Ab sirf AppRoutes chalega, Home apne aap sahi path pe dikhega */}
      <AppRoutes />
    </div>
  );
};

export default App;