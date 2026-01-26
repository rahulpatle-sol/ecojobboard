import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup, loginWithGoogle } from '../../api/auth'; 
import { FcGoogle } from "react-icons/fc";
import { HiCube } from "react-icons/hi";
import { toast } from 'react-toastify';
import { Camera, Loader2 } from 'lucide-react';

export default function Signup() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'TALENT', profilePic: null });
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
    const res = await signup(form); 
    if (res.success) {
      toast.success('Registration successful! Check OTP.');
      navigate('/verify-otp', { state: { email: form.email } });
    } else {
      toast.error(res.message || 'Signup failed.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-indigo-950 to-blue-900 items-center justify-center p-12">
        <div className="max-w-md text-center">
           <h1 className="text-6xl font-black mb-6 tracking-tight">Level Up <br/> Your <span className="text-blue-400">Career.</span></h1>
           <p className="text-blue-200 text-xl font-medium">Join 50k+ professionals on India's smartest job platform.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-10">
          <div className="text-center mb-8">
            <HiCube className="text-5xl text-blue-500 mx-auto mb-2" />
            <h2 className="text-3xl font-bold">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-center mb-4">
               <label className="relative cursor-pointer">
                  <div className="w-24 h-24 rounded-3xl border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden bg-slate-800/50 hover:border-blue-500 transition-all">
                    {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover" /> : <Camera className="text-slate-500" size={28} />}
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
               </label>
            </div>

            <input type="text" placeholder="Full Name" className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-blue-500 outline-none" onChange={(e) => setForm({...form, fullName: e.target.value})} required />
            <input type="email" placeholder="Email Address" className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-blue-500 outline-none" onChange={(e) => setForm({...form, email: e.target.value})} required />
            <input type="password" placeholder="Create Password" className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-blue-500 outline-none" onChange={(e) => setForm({...form, password: e.target.value})} required />
            
            <div className="grid grid-cols-3 gap-3">
              {['TALENT', 'HR', 'MENTOR'].map(role => (
                <button key={role} type="button" onClick={()=>setForm({...form, role})} className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${form.role === role ? 'bg-blue-600 border-blue-600' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                  {role}
                </button>
              ))}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center">
              {loading ? <Loader2 className="animate-spin" /> : "Get Started"}
            </button>
          </form>

          <div className="text-center mt-6">
             <p className="text-slate-500">Already have an account? <Link to="/login" className="text-blue-400 font-bold">Log in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}