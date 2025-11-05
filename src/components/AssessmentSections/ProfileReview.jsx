import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';

export default function ProfileReview() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4 text-slate-800"
      >
        Profile Review 🔍
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-base text-slate-600 mb-8"
      >
        Upload your resume, portfolio, or LinkedIn profile. Get feedback that actually helps — no fluff, just real talk 💬
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-md border border-amber-200 space-y-6"
      >
        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (PDF/DOC)</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
            />
            <UploadCloud className="w-6 h-6 text-amber-600" />
          </div>
        </div>

        {/* Portfolio Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Link</label>
          <input
            type="url"
            placeholder="e.g., https://yourportfolio.com"
            className="w-full px-4 py-2 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* LinkedIn Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
          <input
            type="url"
            placeholder="e.g., https://linkedin.com/in/yourname"
            className="w-full px-4 py-2 border border-amber-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
          Submit for Review 🚀
        </button>
      </motion.div>
    </div>
  );
}
