import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import mentorAvatar from '../../assets/mentor.png';

export default function MentorDiscussion() {
  const navigate = useNavigate();

  const mentors = [
    { name: 'Aarav Mehta', role: 'DSA Fundamentals, System Design' },
    { name: 'Ishita Verma', role: 'UI/UX, Portfolio Review, Frontend' },
    { name: 'Rohan Kapoor', role: 'Web3, Rust, MERN Stack' },
    { name: 'Sneha Rao', role: 'Java, Android, Swift' },
    { name: 'Kabir Singh', role: 'Communication, Interview Prep, HR Management' },
    { name: 'Neha Joshi', role: 'General Awareness, Computer Basics, Soft Skills' },
  ];

  const [query, setQuery] = useState('');

  const filteredMentors = mentors.filter((mentor) =>
    mentor.role.toLowerCase().includes(query.toLowerCase())
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
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
        Chill Chat with Mentors 🎙️
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-base text-slate-600 mb-6"
      >
        Search by topic or skill — DSA, UI/UX, MERN, Java, Interview, Soft Skills… and book your session 💬
      </motion.p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by topic (e.g. DSA, MERN, Interview)"
        className="w-full px-4 py-2 border border-amber-300 rounded-md text-sm mb-8 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor, i) => (
          <motion.div
            key={mentor.name}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="p-5 bg-white rounded-xl shadow-md border border-amber-200 hover:shadow-lg transition"
          >
            <img src={mentorAvatar} alt="Mentor Avatar" className="w-16 h-16 rounded-full mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-amber-700 text-center">{mentor.name}</h3>
            <p className="text-sm text-gray-600 text-center mb-4">{mentor.role}</p>
            <button
              onClick={() => navigate(`/mentor/${encodeURIComponent(mentor.name)}`)}
              className="block w-full text-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              View Profile →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
