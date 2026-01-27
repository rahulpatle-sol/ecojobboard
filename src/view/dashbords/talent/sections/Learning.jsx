import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Monitor, Briefcase, Rocket } from 'lucide-react';

export default function Learning() {
  const resources = [
    // --- Tech Resources ---
    { title: 'DSA Mastery & LeetCode Guide', category: 'Tech', link: 'https://roadmap.sh/dsa', icon: <Monitor className="text-blue-500" /> },
    { title: 'Advanced Generative AI Agents', category: 'Tech', link: 'https://learn.deeplearning.ai/', icon: <Rocket className="text-purple-500" /> },
    { title: 'Full Stack MERN Architecture', category: 'Tech', link: 'https://www.mongodb.com/mern-stack', icon: <Monitor className="text-emerald-500" /> },
    { title: 'DevOps & Cloud Native (AWS)', category: 'Tech', link: 'https://roadmap.sh/devops', icon: <Monitor className="text-orange-500" /> },
    
    // --- Non-Tech Resources ---
    { title: 'UI/UX Design Systems (Figma)', category: 'Design', link: 'https://www.figma.com/resource-library/', icon: <BookOpen className="text-pink-500" /> },
    { title: 'Product Management Strategy', category: 'Business', link: 'https://www.reforge.com/', icon: <Briefcase className="text-amber-500" /> },
    { title: 'Digital Growth & Analytics', category: 'Marketing', link: 'https://learndigital.withgoogle.com/', icon: <Briefcase className="text-cyan-500" /> },
    { title: 'Technical Writing & Documentation', category: 'Soft Skills', link: 'https://developers.google.com/tech-writing', icon: <BookOpen className="text-slate-500" /> },
  ];

  const categories = ['Tech', 'Design', 'Business', 'Soft Skills'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      
      {/* --- HEADER --- */}
      <section className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-black uppercase italic tracking-tight">Skill Acquisition Hub</h2>
          <p className="text-slate-400 max-w-2xl font-medium leading-relaxed">
            Access curated, high-impact resources verified by our technical board. 
            Accelerate your learning journey with industry-standard documentation and roadmaps.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full blur-[140px] opacity-20 -mr-20 -mt-20"></div>
      </section>

      {/* --- RESOURCE GRID --- */}
      <div className="space-y-10">
        {['Tech', 'Design', 'Business', 'Soft Skills'].map((cat) => {
          const filtered = resources.filter(r => r.category === cat || (cat === 'Design' && r.category === 'Design'));
          if (filtered.length === 0) return null;

          return (
            <div key={cat} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-200 flex-grow"></div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">{cat} Vertical</h3>
                <div className="h-px bg-slate-200 flex-grow"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filtered.map((res, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        {res.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight">{res.title}</h4>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          {res.category} Module
                        </span>
                      </div>
                    </div>
                    
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- CTA SECTION --- */}
      <footer className="bg-blue-600 rounded-[2.5rem] p-10 text-center text-white">
        <h3 className="text-2xl font-black mb-2">Missing a Resource?</h3>
        <p className="text-blue-100 mb-6 font-medium">Notify the management board to suggest high-value learning assets.</p>
        <button className="bg-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
          Suggest Resource
        </button>
      </footer>

    </div>
  );
}