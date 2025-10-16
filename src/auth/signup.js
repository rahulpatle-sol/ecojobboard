// src/auth/signup.js

export async function signup(userData) {
  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!res.ok) {
      throw new Error('Failed to signup');
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Signup error:', err);
    return null;
  }
}
