import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Invalid access. Please signup first.");
      navigate('/signup');
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Email verified successfully! Please login.");
        navigate('/login');
      } else {
        toast.error(result.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="max-w-md w-full p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl">
        <h2 className="text-3xl font-bold mb-2">Verify OTP</h2>
        <p className="text-slate-400 mb-8 text-sm">
          We've sent a 6-digit code to <span className="text-blue-400 font-bold">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="000000"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-center text-3xl tracking-[1rem] font-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/20 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Verify & Continue"}
          </button>
        </form>

        <p className="text-center text-slate-500 mt-8 text-sm">
          Didn't receive the code? <button className="text-blue-400 hover:underline">Resend OTP</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;