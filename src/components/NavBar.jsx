import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';

const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLoginRedirect = (role) => {
    navigate(`/Login?role=${role}`);
    setShowDropdown(false);
  };

  return (
    <div className="h-24 w-full flex items-center justify-between px-6 md:px-12 bg-white font-['Zen_Dots'] relative z-50 border">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        jobboard
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {/* <ul className="flex gap-6 text-sm md:text-base font-medium">
          <li><Link to="/talent" className="hover:text-blue-500 transition">Talent</Link></li>
          <li><Link to="/careers" className="hover:text-blue-500 transition">Careers</Link></li>
          <li><Link to="/jobs" className="hover:text-blue-500 transition">Jobs</Link></li>
          <li><Link to="/solutions" className="hover:text-blue-500 transition">Solutions</Link></li>
        </ul> */}

        {/* Action Buttons */}
        <div className="flex gap-4 relative">
          {/* Login Dropdown */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-4 py-2 border border-gray-400 rounded-md flex items-center gap-1 hover:border-black transition"
          >
            Login <RiArrowDownSLine />
          </button>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              {['mentor', 'candidate', 'recruiter'].map((role) => (
                <button
                  key={role}
                  onClick={() => handleLoginRedirect(role)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)} Login
                </button>
              ))}
            </div>
          )}

          {/* Hire Button */}
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
