import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Using Lucide icons instead of Ri for a more modern, clean look
import { ChevronDown, Menu, X } from 'lucide-react';

const NavBar = () => {
  // NOTE: Assuming the existence of 'react-router-dom' environment (Link, useNavigate)
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginRedirect = (role) => {
    // FIX: Uncommenting the navigate call to enable routing
    navigate(`/Login?role=${role}`);
    // console.log(`Redirecting to Login as ${role}`);
    setShowDropdown(false);
    setMenuOpen(false);
  };

  // Framer Motion variants for the Mobile Menu
  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3, staggerChildren: 0.1, staggerDirection: -1 }
    },
    open: { 
      opacity: 1, 
      height: "auto", 
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  // Framer Motion variants for the Dropdown Menu
  const dropdownVariants = {
    closed: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <div className="h-24 w-full flex items-center justify-between px-6 md:px-12 bg-amber-50 font-sans relative z-50 border-b border-amber-200 shadow-sm">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
        jobboard
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex gap-6 text-sm md:text-base font-medium text-gray-800">
          <li><Link to="/talent" className="hover:text-amber-600 transition">Talent</Link></li>
          <li><Link to="/mentors" className="hover:text-amber-600 transition">Mentors</Link></li>
          <li><Link to="/recruiters" className="hover:text-amber-600 transition">Recruiters</Link></li>
          <li><Link to="/jobs" className="hover:text-amber-600 transition">Jobs</Link></li>
        </ul>

        {/* Action Buttons */}
        <div className="flex gap-4 relative">
          
          {/* Login Dropdown Toggle */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-4 py-2 border border-gray-400 rounded-lg flex items-center gap-1 hover:border-black transition text-sm font-medium text-gray-800"
          >
            Login <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          {/* Animated Login Dropdown Panel */}
          <motion.div
            initial="closed"
            animate={showDropdown ? "open" : "closed"}
            variants={dropdownVariants}
            className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 origin-top-right"
            // Stop propagation to prevent immediate closing when clicking inside
            onClick={(e) => e.stopPropagation()} 
          >
            {showDropdown && (
                <div>
                    {['Mentor', 'Candidate', 'Recruiter'].map((role) => (
                        <button
                          key={role}
                          onClick={() => handleLoginRedirect(role.toLowerCase())}
                          className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-amber-50 transition"
                        >
                          {role} Login
                        </button>
                    ))}
                </div>
            )}
          </motion.div>

          {/* Hire Button */}
          <button
            onClick={() => navigate('/hire')}
            className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-md text-sm font-semibold"
          >
            Hire Talent
          </button>
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-800 p-2 rounded-md hover:bg-amber-100 transition">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Animated Mobile Menu Panel */}
      <motion.div
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        // Use hidden to ensure content is gone when closed
        className={`absolute top-24 left-0 w-full bg-white border-t border-amber-200 shadow-lg z-40 px-6 py-4 md:hidden overflow-hidden ${menuOpen ? 'block' : 'hidden'}`}
      >
        <ul className="flex flex-col gap-4 text-gray-800 text-base font-medium">
          <motion.li variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}><Link to="/talent" onClick={() => setMenuOpen(false)} className="block py-1">Talent</Link></motion.li>
          <motion.li variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}><Link to="/mentors" onClick={() => setMenuOpen(false)} className="block py-1">Mentors</Link></motion.li>
          <motion.li variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}><Link to="/recruiters" onClick={() => setMenuOpen(false)} className="block py-1">Recruiters</Link></motion.li>
          <motion.li variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}><Link to="/jobs" onClick={() => setMenuOpen(false)} className="block py-1">Jobs</Link></motion.li>
        </ul>

        <div className="mt-6 space-y-3 pt-4 border-t border-gray-100">
          {['Mentor', 'Candidate', 'Recruiter'].map((role) => (
            <motion.button
              key={role}
              variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}
              onClick={() => handleLoginRedirect(role.toLowerCase())}
              className="w-full text-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-amber-50 transition text-sm font-semibold"
            >
              {role} Login
            </motion.button>
          ))}
          <motion.button
            variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}
            onClick={() => {
              navigate('/hire');
              setMenuOpen(false);
            }}
            className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-md text-sm font-semibold"
          >
            Hire Talent
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default NavBar;
