import { motion } from 'framer-motion';

export default function Scorecard() {
  const metrics = [
    { label: 'DSA Questions Attempted', value: 42, total: 50, category: 'Technical Skills' },
    { label: 'Aptitude Subjects Completed', value: 13, total: 15, category: 'Aptitude' },
    { label: 'Real-life Projects Submitted', value: 3, total: 5, category: 'Projects' },
    { label: 'Mentor Discussions Attended', value: 2, total: 3, category: 'Mentorship' },
    { label: 'Profile Review Status', value: 1, total: 1, category: 'Profile' },
    { label: 'Online Test Score', value: 78, total: 100, category: 'Assessment' },
    { label: 'Recruitment Stages Cleared', value: 2, total: 4, category: 'Recruitment' },
  ];

  const categories = [...new Set(metrics.map((m) => m.category))];

  const overallScore = Math.round(
    metrics.reduce((acc, m) => acc + (m.value / m.total), 0) / metrics.length * 100
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-md border border-amber-300 mb-8 text-center"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Overall Score 🏆</h2>
        <p className="text-5xl font-extrabold text-amber-600">{overallScore}%</p>
        <p className="text-sm text-slate-600 mt-2">Based on all modules completed so far</p>
      </motion.div>

      {/* Category Cards */}
      <div className="space-y-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-amber-200"
          >
            <h3 className="text-xl font-semibold text-amber-700 mb-4">{cat}</h3>
            <div className="space-y-4">
              {metrics
                .filter((m) => m.category === cat)
                .map((metric, j) => {
                  const percent = Math.round((metric.value / metric.total) * 100);
                  return (
                    <div key={j}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-800">{metric.label}</span>
                        <span className="text-sm text-amber-700 font-medium">{metric.value}/{metric.total}</span>
                      </div>
                      <div className="w-full bg-amber-100 h-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
