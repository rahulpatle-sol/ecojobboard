import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mentorAvatar from '../../assets/mentor.png';
import { CheckCircle, XCircle } from 'lucide-react';

const mentorData = {
  'Aarav Mehta': {
    name: 'Aarav Mehta',
    experience: '5+ years in DSA & System Design',
    expertise: ['DSA Fundamentals', 'System Design', 'Mock Interviews'],
    price: '₹499',
    meetLink: 'https://meet.google.com/aarav-session',
    agenda: [
      'DSA patterns and problem-solving strategies',
      'System design basics and real-world architecture',
      'Live mock interview with feedback',
    ],
  },
  'Ishita Verma': {
    name: 'Ishita Verma',
    experience: '4+ years in UI/UX & Frontend',
    expertise: ['UI/UX', 'Portfolio Review', 'Frontend'],
    price: '₹399',
    meetLink: 'https://meet.google.com/ishita-session',
    agenda: [
      'Portfolio review and visual storytelling',
      'UI/UX principles and design systems',
      'Frontend code walkthrough and feedback',
    ],
  },
  // Add other mentors here...
};

export default function MentorProfile() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const mentor = mentorData[decodedName];
  const [showAgenda, setShowAgenda] = useState(false);

  if (!mentor) return <p className="text-center mt-10 text-slate-500">Mentor not found</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-md border border-amber-200"
      >
        <div className="flex items-center gap-4 mb-4">
          <img src={mentorAvatar} alt="Mentor" className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {mentor.name}
              <CheckCircle className="w-5 h-5 text-amber-500" title="Verified" />
            </h2>
            <p className="text-sm text-gray-600">{mentor.experience}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowAgenda(true)}
            className="text-sm text-amber-600 underline hover:text-amber-700 transition"
          >
            View Meet Agenda →
          </button>
        </div>

        <AnimatePresence>
          {showAgenda && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 relative"
            >
              <button
                onClick={() => setShowAgenda(false)}
                className="absolute top-2 right-2 text-amber-600 hover:text-amber-800"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <h4 className="text-sm font-semibold text-amber-700 mb-2">Discussion Agenda</h4>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                {mentor.agenda.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <p className="text-sm text-gray-700 mb-2">Session Price: <strong>{mentor.price}</strong></p>
          <button
            onClick={() => window.open(mentor.meetLink, '_blank')}
            className="w-full px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            Pay & Join 1:1 Meet →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
