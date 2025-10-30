import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RiUserSmileLine,
  RiBriefcaseLine,
  RiRocketLine,
  RiLightbulbLine,
  RiBuildingLine,
} from 'react-icons/ri'

const iconSet = [RiUserSmileLine, RiBriefcaseLine, RiRocketLine, RiLightbulbLine, RiBuildingLine]

export default function WelcomeSection() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-screen font-sans bg-gradient-to-br from-amber-50 via-yellow-100 to-beige-200">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome, Future Builder 👋</h1>
        <p className="text-base text-gray-700 mb-8 text-center max-w-md">
          Create your profile and unlock job matches, mentorship, and verified hiring opportunities.
        </p>
        <button
          onClick={() => navigate('/CreateProfile')}
          className="px-6 py-3 bg-amber-600 text-white rounded-lg shadow-md hover:bg-amber-700 transition"
        >
          Create Profile
        </button>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden bg-gradient-to-tr from-purple-600 to-indigo-600">
        <h2 className="absolute top-10 left-10 text-white text-2xl font-semibold">
          Build your Career
        </h2>

        {/* Floating Icon Circles */}
        {iconSet.map((Icon, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 rounded-full bg-white text-purple-600 shadow-xl flex items-center justify-center text-2xl animate-bounce"
            style={{
              top: `${80 + i * 60}px`,
              left: `${100 + (i % 2) * 120}px`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <Icon />
          </div>
        ))}

        {/* Decorative Shapes */}
        <div className="absolute bottom-20 right-20 w-24 h-10 bg-white rounded-full opacity-20 blur-sm" />
        <div className="absolute bottom-32 right-40 w-24 h-10 bg-white rounded-full opacity-20 blur-sm" />
      </div>
    </div>
  )
}
