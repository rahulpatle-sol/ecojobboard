export async function verifyOTP(email, otp) {
  try {
    const response = await fetch('http://localhost:8000/api/v1/users/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.message };
    } else {
      return { success: false, message: result.message || "Invalid OTP" };
    }
  } catch (err) {
    console.error('OTP Verification error:', err);
    return { success: false, message: "Network error. Try again." };
  }
}