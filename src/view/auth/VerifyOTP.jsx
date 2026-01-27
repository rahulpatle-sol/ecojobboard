import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../../api/auth';
import { toast } from 'react-toastify';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function VerifyOtp() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Important: Get email from navigation state
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            toast.error("Pehle registration details bharo bhai!");
            navigate('/signup');
        }
        if (timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        } else setCanResend(true);
    }, [timer, email, navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await verifyOTP(email, otp);
        
        if (res.success) {
            toast.success("Verified! Maze karo bhai.");
            const user = res.data.user;
            const userId = user.id || user._id;

            // Mapping to respective dashboards
            const routeMap = { 
                TALENT: `/DashboardJobseeker/${userId}`, 
                HR: '/DashboardHR', 
                MENTOR: '/MentorDashboard' 
            };
            
            navigate(routeMap[user.role] || '/');
        } else {
            toast.error(res.message || "Galt OTP daala hai!");
        }
        setLoading(false);
    };

    const handleResend = async () => {
        if (!canResend) return;
        const res = await resendOTP(email);
        if (res.success) {
            toast.success("Naya OTP bhej diya hai!");
            setTimer(60); 
            setCanResend(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] text-white px-4 font-sans">
            <div className="max-w-md w-full p-10 bg-slate-900 border border-slate-800 rounded-[2.5rem] text-center shadow-2xl">
                <div className="w-20 h-20 bg-yellow-200/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                   <ShieldCheck className="text-yellow-200" size={40} />
                </div>
                <h2 className="text-3xl font-black mb-2 uppercase italic tracking-tighter">Verify Code</h2>
                <p className="text-slate-400 mb-8 text-sm">Bhai, code ispe bheja hai: <br/> <span className="text-yellow-200 font-bold">{email}</span></p>

                <form onSubmit={handleVerify} className="space-y-6">
                    <input 
                        type="text" 
                        maxLength="6" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-5 text-center text-4xl font-black tracking-[1rem] text-yellow-200 focus:border-yellow-200 outline-none transition-all" 
                        placeholder="000000" 
                    />
                    <button 
                        type="submit" 
                        disabled={loading || otp.length < 6} 
                        className="w-full bg-yellow-200 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-300 transition shadow-lg shadow-yellow-200/10 flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Verify & Enter"}
                    </button>
                </form>

                <div className="mt-8 text-sm font-bold">
                    {canResend ? (
                        <button onClick={handleResend} className="text-yellow-200 hover:underline">Resend OTP Now</button>
                    ) : (
                        <span className="text-slate-600 italic">Resend available in {timer}s</span>
                    )}
                </div>
            </div>
        </div>
    );
}