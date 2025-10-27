import { motion } from 'framer-motion';
import { RiCheckboxCircleFill } from 'react-icons/ri';

export default function Verified() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center font-sans text-center">
      {/* Animated Checkmark */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        className="text-purple-600 bg-white rounded-full p-6 shadow-lg"
      >
        <RiCheckboxCircleFill className="text-[120px]" />
      </motion.div>

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-4xl font-bold mt-8 text-gray-800"
      >
        Congratulations 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-lg text-gray-600 mt-2"
      >
        You are verified
      </motion.p>

      {/* CTA or Redirect */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
        onClick={() => window.location.href = '/DashboardJobseeker/:id'}
      >
        Go to Dashboard
      </motion.button>
    </div>
  );
}
