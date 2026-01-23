import React, { useState } from 'react';
import { forgotPassword } from '../auth/auth';
import { toast } from 'react-toastify';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await forgotPassword(email);
    if (res) {
      toast.success("Reset link sent to your email!");
    } else {
      toast.error("Failed to send reset link.");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-amber-100">
        <button onClick={() => navigate('/login')} className="flex items-center text-amber-600 mb-6 hover:gap-2 transition-all">
          <ArrowLeft size={18} className="mr-2" /> Back to Login
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
        <p className="text-gray-500 mb-6">Enter your email to receive a password reset link.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="email" 
              placeholder="alex@email.com" 
              className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold hover:bg-amber-700 transition disabled:bg-amber-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;