export async function signup(userData) {
  try {
    const formData = new FormData();
    formData.append("fullName", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    
    // Direct enum values: TALENT, HR, or MENTOR
    formData.append("role", userData.role); 
    
    // Profile picture handling
    if (userData.profilePic) {
      formData.append("profilePic", userData.profilePic); 
    }

    const response = await fetch(`${VITE_API_BASE_URL}/users/register`, {
      method: 'POST',
      body: formData, 
    });

    const result = await response.json();

    if (response.ok) {
      return result; // Isme success aur message hoga
    } else {
      console.error("Signup error result:", result);
      return null;
    }
  } catch (err) {
    console.error("Connection error during signup:", err);
    return null;
  }
}