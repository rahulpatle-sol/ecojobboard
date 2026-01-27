import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { login, loginWithGoogle } from '../../api/auth';
import { FcGoogle } from "react-icons/fc";
import { HiCube } from "react-icons/hi";
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL se role uthana (e.g. ?role=MENTOR)
  const roleFromQuery = searchParams.get('role');

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user.id || user._id;
      
      // Agar pehle se logged in hai, toh dhakka maaro dashboard pe
      const routeMap = { 
        TALENT: `/DashboardJobseeker/${userId}`, 
        HR: '/DashboardHR', 
        MENTOR: '/MentorDashboard' 
      };
      
      if (user.role && routeMap[user.role]) {
        navigate(routeMap[user.role], { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await login(form.email, form.password);

    if (res.success) {
      toast.success('Bhai, swagat hai!');
      const user = res.user;
      const userId = user.id || user._id;

      // Role check karke sahi dashboard pe bhejna
      if (user.role === 'TALENT') {
        navigate(`/DashboardJobseeker/${userId}`);
      } else if (user.role === 'HR') {
        navigate('/DashboardHR');
      } else if (user.role === 'MENTOR') {
        navigate('/MentorDashboard');
      } else {
        navigate('/');
      }
    } else {
      toast.error(res.message || 'Galt email ya password hai bhai.');
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0f172a] text-white overflow-hidden">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <HiCube className="text-5xl text-blue-500" />
            <h1 className="text-2xl font-black tracking-tighter uppercase">Skill2Hire</h1>
          </div>
          
          <h2 className="text-4xl font-bold mb-2">
            {roleFromQuery ? `${roleFromQuery} Login` : 'Welcome Back'}
          </h2>
          <p className="text-slate-400 mb-8">Ready to take the next step in your career?</p>

          <button onClick={loginWithGoogle} className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition shadow-lg mb-6">
            <FcGoogle className="text-2xl" /> <span>Continue with Google</span>
          </button>

          <div className="relative py-4 text-center mb-4">
            <span className="bg-[#0f172a] px-4 text-slate-500 text-xs font-bold relative z-10">OR LOGIN WITH EMAIL</span>
            <hr className="border-slate-800 absolute top-1/2 w-full" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
               type="email" 
               placeholder="Email Address" 
               required 
               className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 focus:border-blue-500 outline-none transition" 
               onChange={(e)=>setForm({...form, email: e.target.value})} 
            />
            <input 
               type="password" 
               placeholder="Password" 
               required 
               className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 focus:border-blue-500 outline-none transition" 
               onChange={(e)=>setForm({...form, password: e.target.value})} 
            />
            
            <div className="text-right">
              <Link to="/forget-password" title="reset" className="text-blue-400 text-sm hover:underline">Forgot Password?</Link>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center">
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-8">
            Don't have an account? <Link to="/signup" className="text-blue-400 font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right Side Image/Gradient Area */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900 to-indigo-950 items-center justify-center">
         <div className="text-center p-12">
            <h2 className="text-5xl font-black mb-6">Connecting Talent <br/> with Opportunity</h2>
            <p className="text-blue-200 text-lg">The bridge between your dreams and your destiny.</p>
         </div>
      </div>
    </div>
  );
}