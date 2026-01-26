// .env se URL uthayega
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1/users';

// --- RATE LIMITING (Spam Control) ---
const lastClickTime = { login: 0, signup: 0, otp: 0, resend: 0 };
const isRateLimited = (type) => {
    const now = Date.now();
    if (now - lastClickTime[type] < 3000) return true; // 3 sec lock
    lastClickTime[type] = now;
    return false;
};

/** 1. GOOGLE LOGIN */
export const loginWithGoogle = () => {
    const currentOrigin = window.location.origin;
    window.location.href = `${BASE_URL}/auth/google?origin=${currentOrigin}`;
};

/** 2. SIGNUP (FormData for Images) */
export const signup = async (userData) => {
    if (isRateLimited('signup')) return { success: false, message: "Bhai thoda ruko! Itni jaldi request mat bhejo." };
    try {
        const formData = new FormData();
        // Frontend 'name' ko Backend 'fullName' mein map kar rahe hain
        formData.append("fullName", userData.name); 
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("role", userData.role); 
        
        if (userData.profilePic) {
            formData.append("profilePic", userData.profilePic); 
        }

        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body: formData, 
        });

        const result = await response.json();
        return response.ok ? { success: true, ...result } : { success: false, ...result };
    } catch (err) {
        return { success: false, message: "Signup failed. Server unreachable." };
    }
};

/** 3. VERIFY OTP */
export const verifyOTP = async (email, otp) => {
    if (isRateLimited('otp')) return { success: false, message: "Sabar rakho, OTP verify ho raha hai." };
    try {
        const response = await fetch(`${BASE_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
        });

        const result = await response.json();
        if (response.ok && result.success) {
            // Dashboard access ke liye data save karo
            localStorage.setItem("accessToken", result.data.accessToken);
            localStorage.setItem("user", JSON.stringify(result.data.user));
            return { success: true, data: result.data };
        }
        return { success: false, message: result.message || "Invalid OTP" };
    } catch (err) {
        return { success: false, message: "Network error." };
    }
};

/** 4. RESEND OTP */
export const resendOTP = async (email) => {
    if (isRateLimited('resend')) return { success: false, message: "Wait 3s." };
    try {
        const response = await fetch(`${BASE_URL}/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        return await response.json();
    } catch (err) {
        return { success: false, message: "Resend failed." };
    }
};

/** 5. LOGIN */
export const login = async (email, password) => {
    if (isRateLimited('login')) return { success: false, message: "Ek baar mein ek hi login request!" };
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        
        const result = await response.json();
        if (response.ok && result.success) {
            localStorage.clear(); 
            localStorage.setItem("accessToken", result.data.accessToken);
            localStorage.setItem("user", JSON.stringify(result.data.user));
            return { success: true, user: result.data.user };
        }
        return { success: false, message: result.message || "Invalid Credentials" };
    } catch (err) {
        return { success: false, message: "Server connection error." };
    }
};

/** 6. LOGOUT */
export const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
};