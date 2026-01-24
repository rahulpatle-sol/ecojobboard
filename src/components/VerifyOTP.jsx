import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../auth/auth'; // Path check kar lena
import { toast } from 'react-toastify';
import { Loader2, ShieldCheck } from 'lucide-react';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60); // 60 seconds ka timer
    const [canResend, setCanResend] = useState(false);
    
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Email nikalne ka logic (Signup se ya Google URL se)
    const email = location.state?.email || searchParams.get('email');

    // Timer Logic
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (!email) {
            toast.error("Session expired. Please login again.");
            navigate('/login');
        }
    }, [email, navigate]);

    // OTP Verify karne ka function
    const handleVerify = async (e) => {
        e.preventDefault();
        if (otp.length < 6) return toast.warning("Please enter 6-digit code");

        setLoading(true);
        try {
            const result = await verifyOTP(email, otp);

            if (result.success) {
                toast.success("Account Verified Successfully!");
                
                const user = result.data.user;
                // Role check karke sahi dashboard par bhejo
                if (user.role === "TALENT") {
                    navigate(`/DashboardJobseeker/${user.id}`);
                } else if (user.role === "HR") {
                    navigate('/DashboardHR');
                } else {
                    navigate('/');
                }
            } else {
                toast.error(result.message || "Invalid OTP");
            }
        } catch (err) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP ka function
const handleResendClick = async () => {
    if (!canResend) return; // Jab tak timer khatam na ho, click na ho
    
    setLoading(true);
    try {
        const res = await resendOTP(email);
        if (res.success) {
            toast.success("Naya OTP bhej diya hai, check kar bhai!");
            
            // 🔥 Ye zaroori hai: Timer ko wapas 60s par reset karo
            setTimer(60);
            setCanResend(false);
            setOtp(''); // Purana OTP saaf kardo
        } else {
            toast.error(res.message);
        }
    } catch (error) {
        toast.error("Resend fail ho gaya!");
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] text-white px-4">
            <div className="max-w-md w-full p-8 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-amber-500/10 rounded-full">
                        <ShieldCheck className="text-amber-500" size={40} />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center mb-2 text-white">Security Check</h2>
                <p className="text-slate-400 text-center mb-8 text-sm">
                    Enter the code sent to <br/>
                    <span className="text-amber-400 font-semibold">{email}</span>
                </p>

                <form onSubmit={handleVerify} className="space-y-6">
                    <input
                        type="text"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-4 text-center text-3xl font-bold tracking-[0.5rem] focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                        placeholder="000000"
                    />

                    <button
                        type="submit"
                        disabled={loading || otp.length < 6}
                        className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify & Continue"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm">
                        Didn't receive code? {canResend ? (
                            <button 
                                onClick={handleResendClick}
                                className="text-amber-500 hover:underline font-bold ml-1"
                            >
                                Resend Now
                            </button>
                        ) : (
                            <span className="text-slate-400 ml-1">Resend in {timer}s</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;