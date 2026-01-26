import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPassword } from '../../api/auth';
import { toast } from 'react-toastify';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await forgotPassword(email);
    if (res.success) toast.success("Reset link sent!");
    else toast.error("Failed to send link.");
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="max-w-md w-full bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl">
        <Link to="/login" className="flex items-center text-blue-400 mb-8 hover:gap-2 transition-all text-sm font-bold">
          <ArrowLeft size={18} className="mr-2" /> BACK TO LOGIN
        </Link>
        <h2 className="text-3xl font-bold text-white mb-2">Lost Access?</h2>
        <p className="text-slate-400 mb-8">No worries, it happens. Enter your email to recover your account.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-500" size={20} />
            <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-xl outline-none focus:border-blue-500 text-white" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center">
            {loading ? <Loader2 className="animate-spin" /> : "Send Recovery Link"}
          </button>
        </form>
      </div>
    </div>
  );
}