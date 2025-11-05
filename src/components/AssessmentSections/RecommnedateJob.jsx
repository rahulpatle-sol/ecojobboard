import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RecommendedJob = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Replace this with your actual API call
    fetch('http://localhost:3000/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch(() => {
        // Fallback mock data
        setJobs([
          {
            id: 1,
            title: 'Frontend Developer',
            company: 'TechNova',
            location: 'Remote',
            type: 'Full-time',
            link: 'https://example.com/apply/frontend',
          },
          {
            id: 2,
            title: 'UI/UX Designer',
            company: 'Designify',
            location: 'Bangalore',
            type: 'Internship',
            link: 'https://example.com/apply/uiux',
          },
          {
            id: 3,
            title: 'Blockchain Engineer',
            company: 'Solana Labs',
            location: 'Remote',
            type: 'Contract',
            link: 'https://example.com/apply/blockchain',
          },
        ]);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-slate-800"
      >
        Recommended Jobs for You 💼
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-amber-200 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-amber-700 mb-1">{job.hiringRole}</h3>
            <p className="text-sm text-gray-600 mb-1">{job.companyName}</p>
            <p className="text-sm text-gray-500 mb-2">{job.location} • {job.type}</p>
            
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              Apply →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJob;
