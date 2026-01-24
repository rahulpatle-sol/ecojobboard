const BASE_URL = 'http://localhost:8000/api/v1/users';

/**
 * 1. GOOGLE LOGIN
 * User ko backend ke passport route par bhejta hai
 */
export const loginWithGoogle = () => {
    const currentOrigin = window.location.origin;
    // Origin bhej rahe hain taaki backend wahi wapas redirect kare (5173 or 5174)
    window.location.href = `${BASE_URL}/auth/google?origin=${currentOrigin}`;
};

/**
 * 2. MANUAL SIGNUP
 * FormData use kar rahe hain kyunki image (Profile Pic) bhi ho sakti hai
 */
export const signup = async (userData) => {
    try {
        const formData = new FormData();
        formData.append("fullName", userData.fullName);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("role", userData.role); // Role should be TALENT or HR
        
        if (userData.profilePic) {
            formData.append("profilePic", userData.profilePic);
        }

        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    } catch (err) {
        return { success: false, message: "Signup failed. Server unreachable." };
    }
};

/**
 * 3. VERIFY OTP
 * Success par localStorage set karta hai, Fail par toast ke liye message deta hai
 */
export const verifyOTP = async (email, otp) => {
    try {
        const response = await fetch(`${BASE_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // ✅ Token save karna dashboard access ke liye zaroori hai
            localStorage.setItem("accessToken", result.data.accessToken);
            localStorage.setItem("user", JSON.stringify(result.data.user));
            return { success: true, data: result.data };
        } else {
            // ❌ Invalid OTP ke liye message
            return { 
                success: false, 
                message: result.message || "Invalid OTP. Please check your mail." 
            };
        }
    } catch (err) {
        return { success: false, message: "Network error. Try again." };
    }
};

/**
 * 4. RESEND OTP
 * Naya OTP generate karke mail bhejta hai
 */
export const resendOTP = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        
        return await response.json();
    } catch (err) {
        return { success: false, message: "Could not resend OTP." };
    }
};

/**
 * 5. MANUAL LOGIN
 */
export const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        
        const result = await response.json();
        if (response.ok && result.success) {
            localStorage.setItem("accessToken", result.data.accessToken);
            localStorage.setItem("user", JSON.stringify(result.data.user));
            return { success: true, user: result.data.user };
        }
        return { success: false, message: result.message || "Invalid Credentials" };
    } catch (err) {
        return { success: false, message: "Login failed." };
    }
};

/**
 * 6. FORGOT & RESET PASSWORD
 */
export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        return await response.json();
    } catch (err) {
        return { success: false, message: "Network error." };
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await fetch(`${BASE_URL}/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: newPassword }),
        });
        return await response.json();
    } catch (err) {
        return { success: false, message: "Link expired or invalid." };
    }
};

/**
 * 7. LOGOUT
 * Clear everything from client side
 */
export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
};