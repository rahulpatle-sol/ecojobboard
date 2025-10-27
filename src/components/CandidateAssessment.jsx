import React from 'react';
import { RiCheckboxCircleFill ,FaCircleDot } from 'react-icons/ri';

const steps = [
  'Learning - We prefer to learn the stuff',
  'Aptitude - Test your skill',
  'Discussion with mentor',
  'Project submission',
  'Profile Review',
  'Online Test',
  'Scorecard',
  'Recommended Jobs',
  'Recruitment',
];

const resources = [
  { label: 'Ref Link 1', status: 'Completed' },
  { label: 'Ref Link 2', status: 'Pending' },
  { label: 'Ref Link 3', status: 'In Progress' },
  { label: 'Ref Link 4', status: 'Completed' },
];

export default function CandidateAssessment() {
  return (
    <div className="flex h-screen w-screen font-sans bg-gray-100 overflow-hidden">
      {/* Left: Steps List */}
      <div className="w-1/3 bg-white p-6 overflow-y-auto border-r border-gray-300">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Candidate Journey</h2>
        <ul className="space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg mt-1">
                <FaCircleDot />
              </div>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Resources + Status */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Try Out the Best Resources</h2>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-300">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                <RiCheckboxCircleFill />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{res.label}</h3>
                <p className="text-sm text-gray-500">Status: {res.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Resource */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-300">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Node.js & Express.js for Web Apps and APIs</h3>
          <img
            src="/assets/node-express-book.png"
            alt="Node.js Book"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Get Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
