import { motion } from 'framer-motion';
import {
  FaGithub,
  FaFigma,
  FaAmazon,
  FaMicrosoft,
  FaLinkedin,
  FaSlack,
  FaChrome,
  FaCloud,
  FaDatabase,
  FaReact
} from 'react-icons/fa';

const icons = [
  FaGithub,
  FaFigma,
  FaAmazon,
  FaMicrosoft,
  FaLinkedin,
  FaSlack,
  FaChrome,
  FaCloud,
  FaDatabase,
  FaReact
];

export default function PartnersCircle() {
  return (
    <div className="w-full bg-gradient-to-r from-green-50 via-yellow-50 to-amber-200 py-12 font-sans overflow-hidden">
      <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">Our Partners</h2>
      <p className="text-xl font-medium text-center text-gray-700 mb-8">Build the trust</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full overflow-hidden"
      >
        <motion.div
          className="flex gap-12 px-6"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear'
          }}
        >
          {[...icons, ...icons].map((Icon, i) => (
            <div
              key={i}
              className="w-50  flex items-center justify-center bg-white p-8 rounded-full shadow-md border border-amber-200 hover:scale-105 transition"
            >
              <Icon className="w-10 h-10 text-amber-600 shadow-blue-500" />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
