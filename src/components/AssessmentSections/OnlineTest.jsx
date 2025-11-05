import { motion } from 'framer-motion';

export default function OnlineTest() {
  const testCategories = [
    { title: 'DSA & Problem Solving', duration: '45 mins' },
    { title: 'Quantitative Aptitude', duration: '30 mins' },
    { title: 'Verbal Ability', duration: '25 mins' },
    { title: 'Logical Reasoning', duration: '30 mins' },
    { title: 'Visual Reasoning', duration: '20 mins' },
    { title: 'UI/UX Fundamentals', duration: '35 mins' },
    { title: 'Programming Concepts', duration: '40 mins' },
    { title: 'Computer Basics', duration: '30 mins' },
    { title: 'System Design Basics', duration: '45 mins' },
    { title: 'Web3 & Blockchain', duration: '40 mins' },
    { title: 'Cybersecurity Awareness', duration: '25 mins' },
    { title: 'Communication Skills', duration: '20 mins' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4 text-slate-800"
      >
        Online Test Dashboard 🧠
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-base text-slate-600 mb-8"
      >
        Choose a subject and start your timed test. Each section is designed to validate your skills 🎯
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testCategories.map((test, i) => (
          <motion.div
            key={test.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-amber-200 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-amber-700 mb-2">{test.title}</h3>
            <p className="text-sm text-gray-600 mb-4">Test Duration: <strong>{test.duration}</strong></p>
            <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              Start Test →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
