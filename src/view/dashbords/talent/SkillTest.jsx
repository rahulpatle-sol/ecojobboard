import React, { useState } from 'react';
import { HiOutlineClock, HiCheckCircle } from "react-icons/hi";

const SkillTest = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      {!started ? (
        <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] text-center shadow-2xl">
          <div className="w-20 h-20 bg-yellow-200/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <HiOutlineClock className="text-yellow-200 text-4xl" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 uppercase italic">Ready to Prove Your Skills?</h2>
          <p className="text-slate-400 mb-8 font-medium">Test mein 20 questions honge. Tera scorecard seedha dashboard par dikhega.</p>
          
          <div className="bg-slate-950 p-6 rounded-2xl mb-8 border border-slate-800 text-left space-y-3">
            <p className="text-slate-300 flex items-center gap-2"><HiCheckCircle className="text-yellow-200"/> 30 Minutes Duration</p>
            <p className="text-slate-300 flex items-center gap-2"><HiCheckCircle className="text-yellow-200"/> Dynamic Scorecard Generation</p>
            <p className="text-slate-300 flex items-center gap-2"><HiCheckCircle className="text-yellow-200"/> Verified Badge eligibility</p>
          </div>

          <button 
            onClick={() => setStarted(true)}
            className="w-full bg-yellow-200 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-300 shadow-xl"
          >
            Start Assessment Now
          </button>
        </div>
      ) : (
        <div className="text-white text-2xl font-bold animate-pulse">
           🛠️ Question Engine Loading... Bhai taiyar reh!
        </div>
      )}
    </div>
  );
};

export default SkillTest;