import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-24 w-full flex items-center justify-between px-6 md:px-12 bg-white font-['Zen_Dots']">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        jobboard
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <ul className="flex gap-6 text-sm md:text-base font-medium">
          <li><Link to="/talent" className="hover:text-blue-500 transition">Talent</Link></li>
          <li><Link to="/careers" className="hover:text-blue-500 transition">Careers</Link></li>
          <li><Link to="/jobs" className="hover:text-blue-500 transition">Jobs</Link></li>
          <li><Link to="/solutions" className="hover:text-blue-500 transition">Solutions</Link></li>
        </ul>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/Login')}
            className="px-4 py-2 border border-gray-400 rounded-md hover:border-black dark:hover:border-white transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/hire')}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Hire
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
