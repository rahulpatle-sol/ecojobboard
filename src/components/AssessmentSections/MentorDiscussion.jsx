import { useState } from 'react';
import { motion } from 'framer-motion';
import mentorAvatar from '../../assets/mentor.png'; // Add your PNG here

export default function MentorDiscussion() {
  const mentors = [
    {
      name: 'Aarav Mehta',
      role: 'DSA & System Design',
      slot: 'Monday, 4 PM IST',
      meetLink: 'https://meet.google.com/aarav-session',
    },
    {
      name: 'Ishita Verma',
      role: 'UI/UX & Portfolio Review',
      slot: 'Tuesday, 6 PM IST',
      meetLink: 'https://meet.google.com/ishita-session',
    },
    {
      name: 'Rohan Kapoor',
      role: 'Web3 & Rust Debugging',
      slot: 'Wednesday, 8 PM IST',
      meetLink: 'https://meet.google.com/rohan-session',
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4 text-slate-800"
      >
        Chill Chat with Mentors 🎙️
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-base text-slate-600 mb-8"
      >
        Pick your mentor, drop in for a session, and get feedback that actually helps. No fluff, just real talk 💬
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor, i) => (
          <motion.div
            key={mentor.name}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="p-5 bg-white rounded-xl shadow-md border border-amber-200 hover:shadow-lg transition"
          >
            <img
              src={mentorAvatar}
              alt="Mentor Avatar"
              className="w-16 h-16 rounded-full mb-4 mx-auto"
            />
            <h3 className="text-lg font-semibold text-amber-700 text-center">{mentor.name}</h3>
            <p className="text-sm text-gray-600 text-center mb-2">{mentor.role}</p>
            <p className="text-sm text-gray-700 text-center mb-4">
              Next slot: <strong>{mentor.slot}</strong>
            </p>
            <a
              href={mentor.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              Join Meet →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
