import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Users, Briefcase, CheckCircle, Clock, ArrowUpRight, Zap } from 'lucide-react';

// ✅ Registration zaroori hai error fix karne ke liye
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const DashboardHome = ({ jobs, recruiter }) => {
  
  // Calculations
  const totalApps = jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0);
  const hiredCount = jobs.reduce((acc, job) => 
    acc + (job.applications?.filter(a => a.status === 'HIRED').length || 0), 0);
  const activeListings = jobs.length;

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'New Applications',
      data: [15, 25, 18, 40, 35, 50, 48],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#3b82f6'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { 
        type: 'linear', // Iske liye LinearScale register kiya hai
        display: false 
      },
      x: { 
        type: 'category', // Iske liye CategoryScale register kiya hai
        grid: { display: false }, 
        ticks: { font: { size: 10, weight: 'bold' } } 
      }
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 pb-6">
      {/* Quick Stats */}
      <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-6">
        <StatCard title="Active Roles" value={activeListings} icon={<Briefcase size={20}/>} trend="+2 new" color="bg-blue-600" />
        <StatCard title="Total Applicants" value={totalApps} icon={<Users size={20}/>} trend="+14% up" color="bg-indigo-600" />
        <StatCard title="Final Hires" value={hiredCount} icon={<CheckCircle size={20}/>} trend="Target: 10" color="bg-emerald-600" />
        
        {/* Chart Section */}
        <div className="col-span-3 bg-white rounded-[3rem] p-8 shadow-sm border border-slate-50 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div>
              <h4 className="font-black text-slate-800 uppercase italic tracking-tighter text-xl">Recruitment Velocity</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Application flow per week</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-[10px] font-black text-green-600">LIVE TRACKING</span>
            </div>
          </div>
          <div className="h-60 relative z-10">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>

      {/* Profile Sidebar */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <img 
              src={`https://ui-avatars.com/api/?name=${recruiter.name}&background=fff&color=000`} 
              className="w-16 h-16 rounded-2xl border-2 border-white/20" 
              alt="pfp" 
            />
            <div>
              <h3 className="font-black text-lg italic tracking-tight uppercase">{recruiter.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{recruiter.company}</p>
            </div>
          </div>
          <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-[10px] font-black uppercase py-3 rounded-xl transition-all tracking-widest border border-white/10">
            Edit Dashboard
          </button>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={80} fill="white" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-50 flex-1">
          <h4 className="font-black text-slate-800 uppercase italic tracking-tighter mb-6 underline decoration-blue-500 decoration-2 underline-offset-4">Recent Inflow</h4>
          <div className="space-y-6">
            {jobs.slice(0, 3).flatMap(j => j.applications?.slice(0, 1) || []).map((app, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 font-black group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    {app.talent?.user?.fullName?.[0] || 'T'}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 uppercase italic leading-none">{app.talent?.user?.fullName}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">applied just now</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-200 group-hover:text-blue-600 transition-all" />
              </div>
            ))}
            {totalApps === 0 && <p className="text-center text-[10px] text-slate-300 font-bold uppercase py-10 tracking-[0.3em]">Quiet Day...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50 relative overflow-hidden group transition-all hover:shadow-xl"
  >
    <div className={`w-10 h-10 ${color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
    <h2 className="text-4xl font-black text-slate-800 mt-1 italic tracking-tighter">
      {value < 10 ? `0${value}` : value}
    </h2>
    <p className="text-[9px] font-bold text-green-500 mt-2 flex items-center gap-1 uppercase tracking-tight">
      <Clock size={10}/> {trend}
    </p>
  </motion.div>
);

export default DashboardHome;