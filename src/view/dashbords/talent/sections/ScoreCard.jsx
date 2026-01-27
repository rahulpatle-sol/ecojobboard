import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../../../../api/client'; // Tera axios helper

export default function Scorecard() {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await API.get('/users/my-assessment');
        if (response.data.success) {
          setAssessment(response.data.assessment);
        }
      } catch (err) {
        console.error("Scorecard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScore();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">Analysing Performance Data...</div>;

  // Real-time metrics from Database
  const metrics = [
    { 
      label: 'Aptitude Subjects', 
      value: assessment?.aptitudeLinks ? Object.keys(assessment.aptitudeLinks).length : 0, 
      total: 16, 
      category: 'Aptitude' 
    },
    { 
      label: 'Online Test Score', 
      value: assessment?.onlineTestScore || 0, 
      total: 100, 
      category: 'Assessment' 
    },
    { 
      label: 'Project Verification', 
      value: assessment?.status === "VERIFIED" ? 1 : 0, 
      total: 1, 
      category: 'Projects' 
    }
  ];

  const overallScore = assessment?.onlineTestScore || 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Dynamic Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl mb-8 text-center text-white border-b-8 border-blue-600"
      >
        <h2 className="text-xl font-black tracking-widest uppercase opacity-50 mb-4">Official Performance Index</h2>
        <div className="text-7xl font-black mb-2">{overallScore}%</div>
        <p className="text-blue-400 font-bold tracking-widest uppercase text-xs">
          Status: {assessment?.status || "NOT STARTED"}
        </p>
      </motion.div>

      {/* Grid for categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, i) => {
          const percent = Math.round((metric.value / metric.total) * 100);
          return (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-slate-400 uppercase">{metric.category}</span>
                <span className="text-lg font-bold text-slate-900">{percent}%</span>
              </div>
              <h3 className="font-bold text-slate-700 mb-3">{metric.label}</h3>
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  className={`h-full ${percent > 70 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}