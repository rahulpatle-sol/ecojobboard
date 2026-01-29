
import { toast } from 'react-toastify';

const onVerify = async () => {
    const res = await verifyOTP(email, otp);
    if (res.success) {
        toast.success("Verification Successful!");
        // Navigate to Dashboard
    } else {
        // 🔥 Ye line "Invalid OTP" wala toaster dikhayegi
        toast.error(res.message); 
    }
}

const onResend = async () => {
    const res = await resendOTP(email);
    if (res.success) {
        toast.info("A new OTP has been sent to your email.");
    } else {
        toast.error(res.message);
    }
}
export async function verifyOTP(email, otp) {
  try {
    const response = await fetch(`${VITE_API_BASE_URL}/users/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const result = await response.json();

    if (response.ok) {
      // ✅ Sabse Zaroori Step: Token aur User data save karo
      // result.data backend ke ApiResponse se aa raha hai
      if (result.data?.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("user", JSON.stringify(result.data.user));
      }
      return { success: true, data: result.data };
    } else {
      return { success: false, message: result.message || "Invalid OTP" };
    }
  } catch (err) {
    console.error('OTP Verification error:', err);
    return { success: false, message: "Network error. Try again." };
  }
}