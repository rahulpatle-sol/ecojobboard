import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../auth/signup'; 
import { FcGoogle } from "react-icons/fc";
import { HiCube } from "react-icons/hi";
import { toast } from 'react-toastify';
import { Camera, Loader2 } from 'lucide-react';

const Signup = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'TALENT', // Default as per Prisma Enum
    profilePic: null 
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profilePic: file });
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signup(form); 

    if (result) {
      toast.success('Registration successful! OTP sent to your email.');
      // Verify OTP page par email pass kar rahe hain navigation state mein
      navigate('/verify-otp', { state: { email: form.email } });
    } else {
      toast.error('Signup failed. Please check your details or try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex w-full bg-[#0f172a] text-white font-sans overflow-hidden">
      {/* Left Side: Illustration Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 items-center justify-center p-12 relative">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px]"></div>
        <div className="z-10 text-center">
            <h1 className="text-6xl font-black mb-6 leading-tight tracking-tight">
              Unlock Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Career Potential.</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-md mx-auto">
              Join the elite community of job seekers, recruiters, and mentors.
            </p>
        </div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px]"></div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative bg-[#0f172a]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 mb-4">
               <HiCube className="text-4xl text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="text-slate-400 mt-2 text-sm">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar Upload Section */}
            <div className="flex justify-center mb-2">
               <label className="relative cursor-pointer group">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden bg-slate-800/50 hover:border-blue-500 transition-colors">
                    {preview ? (
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <Camera className="mx-auto text-slate-500 mb-1" size={24} />
                        <span className="text-[10px] text-slate-500 font-medium">UPLOAD</span>
                      </div>
                    )}
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] font-bold">
                    CHANGE
                  </div>
               </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" 
                  onChange={(e) => setForm({...form, name: e.target.value})} 
                  required 
                />
              </div>

              <div className="space-y-1">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" 
                  onChange={(e) => setForm({...form, email: e.target.value})} 
                  required 
                />
              </div>

              <div className="space-y-1">
                <input 
                  type="password" 
                  placeholder="Create Password" 
                  className="w-full p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600" 
                  onChange={(e) => setForm({...form, password: e.target.value})} 
                  required 
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-slate-500 ml-1">Select Your Role</label>
                <select 
                  className="w-full p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer text-slate-300" 
                  value={form.role} 
                  onChange={(e) => setForm({...form, role: e.target.value})}
                >
                  <option value="TALENT">Job Seeker (Talent)</option>
                  <option value="HR">HR / Recruiter</option>
                  <option value="MENTOR">Mentor</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center group"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="relative py-2 text-center">
            <span className="bg-[#0f172a] px-4 text-slate-500 text-xs uppercase tracking-widest font-bold relative z-10">OR</span>
            <hr className="border-slate-800 absolute top-1/2 w-full" />
          </div>

          <button 
            type="button"
            onClick={() => window.location.href = "http://localhost:8000/api/v1/users/auth/google"} 
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 p-3.5 rounded-xl font-bold hover:bg-slate-100 transition shadow-sm"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center text-slate-500 text-sm">
            Already have an account? <span onClick={() => navigate('/login')} className="text-blue-400 font-bold cursor-pointer hover:text-blue-300 transition-colors">Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;