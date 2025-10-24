import React from 'react'

const NavBar = () => {
  return (
    <div className="h-24 w-full flex items-center justify-between px-6 md:px-12 bg-white font-['Zen_Dots']">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide">
        jobboard
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <ul className="flex gap-6 text-sm md:text-base font-medium">
          <li><a href="#" className="hover:text-blue-500 transition">Talent</a></li>
          <li><a href="#" className="hover:text-blue-500 transition">Careers</a></li>
          <li><a href="#" className="hover:text-blue-500 transition">Jobs</a></li>
          <li><a href="#" className="hover:text-blue-500 transition">Solutions</a></li>
        </ul>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-gray-400 rounded-md hover:border-black dark:hover:border-white transition">
            Login
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
            Hire
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavBar
