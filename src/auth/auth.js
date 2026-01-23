const BASE_URL = 'http://localhost:8000/api/v1/users';

// 1. Manual Signup
export const signup = async (userData) => {
  try {
    const formData = new FormData();
    formData.append("fullName", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("role", userData.role.toUpperCase());
    if (userData.profilePic) formData.append("profilePic", userData.profilePic);

    const response = await fetch(`${BASE_URL}/register`, { method: 'POST', body: formData });
    return await response.json();
  } catch (err) {
    return null;
  }
};

// 2. Manual Login
export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      return result.data.user;
    }
    return null;
  } catch (err) {
    return null;
  }
};

// 3. Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (err) {
    return null;
  }
};