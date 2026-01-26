import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Sidebar({ role }) {
  const { logout } = useAuthStore();
  
  const menus = {
    HR: [{ label: 'Dashboard', path: '/hr/dashboard' }, { label: 'Post Job', path: '/hr/post-job' }],
    TALENT: [{ label: 'My Dashboard', path: '/jobseeker/dashboard' }, { label: 'Find Jobs', path: '/jobseeker/jobs' }],
    MENTOR: [{ label: 'Mentor Hub', path: '/mentor/dashboard' }]
  };

  return (
    <div className="w-64 bg-[#0f172a] text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-8">Skill2Hire</h2>
        <nav className="space-y-2">
          {menus[role]?.map(item => (
            <Link key={item.path} to={item.path} className="block p-3 hover:bg-slate-800 rounded-xl transition">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <button onClick={logout} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition">
        Logout
      </button>
    </div>
  );
}