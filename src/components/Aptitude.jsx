import React from 'react';
import {
  PiPiBold,
  PiMonitorBold,
  PiCodeBold,
  PiBookBold,
  PiSquaresFourBold,
  PiLightningBold
} from 'react-icons/pi';

const courses = [
  {
    icon: <PiPiBold />,
    title: 'Application Fundamentals',
    duration: '30 min',
    subject: 'Math',
    method: 'Reading',
    difficulty: 'Advanced'
  },
  {
    icon: <PiMonitorBold />,
    title: 'Computer Fundamentals',
    duration: '30 min',
    subject: 'Math',
    method: 'Reading',
    difficulty: 'Advanced'
  },
  {
    icon: <PiCodeBold />,
    title: 'Code Fundamentals',
    duration: '30 min',
    subject: 'Math',
    method: 'Reading',
    difficulty: 'Advanced'
  },
  {
    icon: <PiBookBold />,
    title: 'EDU Fundamentals',
    duration: '30 min',
    subject: 'Math',
    method: 'Reading',
    difficulty: 'Advanced'
  },
  {
    icon: <PiSquaresFourBold />,
    title: 'System Design Fundamentals',
    duration: '30 min',
    subject: 'Math',
    method: 'Reading',
    difficulty: 'Advanced'
  },
  {
    icon: <PiLightningBold />,
    title: 'Quick Fundamentals',
    duration: '30 min',
    subject: 'Math',
    method: 'Reading',
    difficulty: 'Advanced'
  }
];

export default function Apptitude() {
  return (
    <div className="min-h-screen w-full bg-gray-100 px-6 py-12 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Assessment Modules</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="text-purple-600 text-3xl mb-4">{course.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li><strong>Duration:</strong> {course.duration}</li>
              <li><strong>Subject:</strong> {course.subject}</li>
              <li><strong>Method:</strong> {course.method}</li>
              <li><strong>Difficulty:</strong> {course.difficulty}</li>
            </ul>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              Visit Item
            </button>
            <p className="mt-3 text-xs text-blue-600 font-medium">+1 new based question</p>
          </div>
        ))}
      </div>
    </div>
  );
}
