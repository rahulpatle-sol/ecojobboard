import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectSubmission() {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    github: '',
    live: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      alert('Project submitted successfully 🚀');
      setFormData({ topic: '', description: '', github: '', live: '' });
    } catch (err) {
      alert('Submission failed. Try again later.');
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-3xl font-bold mb-4 text-slate-800"
      >
        Project Submission 🎯
      </motion.h2>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.2 }}
        className="text-base text-slate-600 mb-8"
      >
        Drop your project details below — GitHub repo, live link, and a short pitch. Let’s gooo 💻🔥
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-white p-6 rounded-xl shadow-md border border-amber-200 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Topic</label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            placeholder="e.g., Real-time Chat App"
            className="mt-1 w-full px-4 py-2 border border-amber-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Brief overview of your project..."
            className="mt-1 w-full px-4 py-2 border border-amber-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub Repo Link</label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="e.g., https://github.com/yourname/project"
            className="mt-1 w-full px-4 py-2 border border-amber-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Live Project Link</label>
          <input
            type="url"
            value={formData.live}
            onChange={(e) => handleChange('live', e.target.value)}
            placeholder="e.g., https://yourproject.vercel.app"
            className="mt-1 w-full px-4 py-2 border border-amber-300 rounded-md"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
        >
          Submit Project 🚀
        </button>
      </motion.div>
    </div>
  );
}
