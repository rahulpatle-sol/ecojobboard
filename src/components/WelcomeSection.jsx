import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiUserSmileLine,
  RiBriefcaseLine,
  RiRocketLine,
  RiLightbulbLine,
  RiBuildingLine,
} from 'react-icons/ri';

const iconSet = [RiUserSmileLine, RiBriefcaseLine, RiRocketLine, RiLightbulbLine, RiBuildingLine];

export default function WelcomeSection() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center px-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome User!</h1>
        <button
          onClick={() => navigate('/CreateProfile')}
          className="px-6 py-3 bg-white border border-gray-400 rounded-lg shadow-md hover:border-black transition"
        >
          Create Profile
        </button>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 bg-purple-600 relative items-center justify-center overflow-hidden">
        <h2 className="absolute top-10 left-10 text-white text-2xl font-semibold">
          Build your Career
        </h2>

        {/* Random Icon Circles */}
        {iconSet.map((Icon, i) => (
          <div
            key={i}
            className={`absolute w-16 h-16 rounded-full bg-white text-purple-600 shadow-lg flex items-center justify-center text-2xl`}
            style={{
              top: `${80 + i * 60}px`,
              left: `${100 + (i % 2) * 120}px`,
            }}
          >
            <Icon />
          </div>
        ))}

        {/* Decorative Shapes */}
        <div className="absolute bottom-20 right-20 w-24 h-10 bg-white rounded-full opacity-30" />
        <div className="absolute bottom-32 right-40 w-24 h-10 bg-white rounded-full opacity-30" />
      </div>
    </div>
  );
}
