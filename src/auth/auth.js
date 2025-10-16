export async function login(email, password) {
  try {
    const res = await fetch('http://localhost:3000/users');
    const users = await res.json();

    // Match user by email and password
    const user = users.find(
      u => u.email === email && u.password === password
    );

    // Return full user object or null
    return user || null;
  } catch (err) {
    console.error('Login error:', err);
    return null;
  }
}
