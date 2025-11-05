import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Aptitude() {
  const subjects = [
    'Logical Reasoning',
    'Verbal Ability',
    'Quantitative Aptitude',
    'Visual Reasoning',
    'UI/UX Fundamentals',
    'Programming Concepts',
    'Computer Basics',
    'Data Interpretation',
    'Coding Challenges',
    'System Design Basics',
    'Database Concepts',
    'Operating Systems',
    'Networking Fundamentals',
    'Cybersecurity Awareness',
    'Excel & Spreadsheets',
    'Communication Skills',
  ];

  const [links, setLinks] = useState({});

  const handleChange = (subject, value) => {
    setLinks((prev) => ({ ...prev, [subject]: value }));
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4 text-slate-800"
      >
        Aptitude Submission 
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-base text-slate-600 mb-8"
      >
        Provide your solutions for the following aptitude subjects by submitting relevant links.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, i) => (
          <motion.div
            key={subject}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="p-5 bg-white rounded-xl shadow-md border border-amber-200 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-amber-700 mb-2">{subject}</h3>
            <p className="text-sm text-gray-600 mb-3">Drop your solution link below 👇</p>
            <input
              type="url"
              placeholder="Paste your link here"
              value={links[subject] || ''}
              onChange={(e) => handleChange(subject, e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </motion.div>
        ))}
      </div>

      {/* <div className="mt-10 p-4 bg-slate-50 rounded-md border border-slate-200 text-sm text-slate-700">
        <strong>ad.json preview:</strong>
        <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(links, null, 2)}</pre>
      </div> */}
    </div>
  );
}
