import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth/auth';
import { FcGoogle } from "react-icons/fc";
import { HiCube } from "react-icons/hi";
import { toast } from 'react-toastify';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await login(form.email, form.password);

    if (user) {
      toast.success('Bhai, swagat hai!');
      
      // Backend Enum Roles Mapping: TALENT, HR, MENTOR
      const routeMap = {
        TALENT: `/DashboardJobseeker/${user.id}`,
        HR: `/DashboardHR`,
        MENTOR: `/MentorDashboard`
      };
      
      // Agar role match nahi hota toh default WelcomeSection
      navigate(routeMap[user.role] || '/WelcomeSection');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    // Passport.js endpoint for Google Auth
    window.location.href = "http://localhost:8000/api/v1/users/auth/google";
  };

  return (
    <div className="flex h-screen w-screen font-sans bg-[#0f172a] text-white">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-[#0f172a]">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center gap-2 mb-6">
            <HiCube className="text-5xl text-blue-500" />
            <h1 className="text-2xl font-bold tracking-tight">Skill2Hire</h1>
          </div>
          
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-slate-400 mb-8">Login to access your dashboard</p>

          {/* Google Login Button */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-100 transition shadow-lg mb-6"
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </button>

          <div className="relative py-4 text-center">
            <span className="bg-[#0f172a] px-4 text-slate-500 text-xs uppercase tracking-widest font-bold z-10 relative">OR LOGIN WITH EMAIL</span>
            <hr className="border-slate-800 absolute top-1/2 w-full" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="alex@email.com"
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />

            <div className="flex justify-between text-sm text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-blue-500" /> Remember me
              </label>
              <button 
                type="button"
                onClick={() => navigate('/ForgetPassword')} 
                className="text-blue-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-8">
            Don't have an account? <button onClick={() => navigate('/signup')} className="text-blue-400 font-bold hover:underline">Sign up</button>
          </p>
        </div>
      </div>

      {/* Right: Decorative Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900 to-indigo-950 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="z-10 text-center">
            <div className="bg-blue-500/10 p-6 rounded-3xl inline-block mb-6 backdrop-blur-3xl border border-white/10">
                <img src="https://cdn.pixabay.com/photo/2020/07/03/09/01/outsourcing-5365729_960_720.png" className="w-64 h-auto" alt="Hero" />
            </div>
            <h2 className="text-4xl font-black mb-4">Connecting Talent <br/> with Opportunity</h2>
            <p className="text-blue-200 text-lg">Your gateway to the next big step in your career.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;