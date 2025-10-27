import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { title: 'Learn with us', description: 'Get access to learning resources' },
  { title: 'Aptitude Round', description: 'Get access to aptitude resources' },
  { title: 'Discussion with mentor', description: 'Get access to mentorship' },
  { title: 'Project submission round', description: 'Get the resources to work on projects' },
  { title: 'Profile review', description: 'Get the resume reviewed' },
  { title: 'Online Test & Skill Badge', description: 'Get the resources to crack the test' },
  { title: 'Recommended job', description: 'Get access to recommended jobs' },
];

export default function RoadmapCanvas() {

  
  const dotPositions = [
    { x: 70, y: 100 },
    { x: 120, y: 80 },
    { x: 240, y: 60 },
    { x: 360, y: 80 },
    { x: 480, y: 100 },
    { x: 600, y: 120 },
    { x: 720, y: 100 },
  ];

  return (
 <div className="w-screen h-screen bg-white overflow-hidden ">
      <img
        src="https://ik.imagekit.io/y8vbhvt7s/persenal%20fun%20stuff%20/job%20seeker%20feed.png?updatedAt=1761549861974
        " // Replace with actual image path
        alt="Roadmap"
        className="w-full h-full object-contain "
      />
    </div>
  );
}
