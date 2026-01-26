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
    const email = location.state?.email;

    useEffect(() => {
        if (!email) navigate('/login');
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
            toast.success("Verified!");
            const user = res.data.user;
            const routeMap = { TALENT: `/DashboardJobseeker/${user.id || user._id}`, HR: '/DashboardHR', MENTOR: '/MentorDashboard' };
            navigate(routeMap[user.role] || '/');
        } else {
            toast.error(res.message);
        }
        setLoading(false);
    };

    const handleResend = async () => {
        if (!canResend) return;
        const res = await resendOTP(email);
        if (res.success) {
            toast.success("New OTP sent!");
            setTimer(60); setCanResend(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] text-white px-4">
            <div className="max-w-md w-full p-10 bg-slate-900 border border-slate-800 rounded-3xl text-center">
                <ShieldCheck className="text-blue-500 mx-auto mb-6" size={60} />
                <h2 className="text-3xl font-bold mb-2">Verify Account</h2>
                <p className="text-slate-400 mb-8 text-sm">Code sent to: <br/> <span className="text-blue-400 font-bold">{email}</span></p>

                <form onSubmit={handleVerify} className="space-y-6">
                    <input type="text" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 text-center text-3xl font-black tracking-widest focus:border-blue-500 outline-none" placeholder="000000" />
                    <button type="submit" disabled={loading || otp.length < 6} className="w-full bg-blue-600 py-4 rounded-xl font-bold transition flex items-center justify-center">
                        {loading ? <Loader2 className="animate-spin" /> : "Verify Code"}
                    </button>
                </form>

                <div className="mt-8 text-sm">
                    {canResend ? <button onClick={handleResend} className="text-blue-400 font-bold hover:underline">Resend Now</button> : <span className="text-slate-500">Resend in {timer}s</span>}
                </div>
            </div>
        </div>
    );
}