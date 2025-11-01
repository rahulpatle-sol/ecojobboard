import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth/auth';
import { FcGoogle } from "react-icons/fc";
import { HiCube } from "react-icons/hi";

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login(form.email, form.password);

    if (user) {
      alert('Login successful!');
      const routeMap = {
        jobseeker: `/DashboardJobseeker/${user.id}`,
        hr: `/DashboardHR/${user.id}`,
        mentor: `/MentorDashboard/${user.id}`
      };
      navigate(routeMap[user.role] || '/WelcomeSection', {
        state: { userId: user.id, role: user.role }
      });
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex h-screen w-screen font-sans bg-gradient-to-br from-amber-50 via-yellow-100 to-beige-200">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-md mx-auto w-full">
          <HiCube className="text-6xl text-amber-600 mb-4" />
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Login</h2>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md mb-4 hover:bg-gray-100 transition">
            <FcGoogle className="text-xl" />
            <span>Login with Google</span>
          </button>

          {/* Email Login */}
          <p className="text-sm text-gray-500 mb-2">Login with Email & Password</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="alex@email.com"
              required
              className="w-full border border-amber-300 rounded-md px-4 py-2 shadow-sm focus:ring-amber-400 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-amber-300 rounded-md px-4 py-2 shadow-sm focus:ring-amber-400 focus:outline-none"
            />

            <div className="flex justify-between text-xs text-gray-500">
              <label><input type="checkbox" className="mr-1" />Remember me</label>
              <a href="/ForgetPassword" className="hover:underline">Forget Password</a>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700 transition shadow-md"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            No account? <a href="/signup" className="text-amber-600 hover:underline">Sign up here</a>
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            New user? <a href="/WelcomeSection" className="text-amber-600 hover:underline">Explore platform</a>
          </p>
        </div>
      </div>

      {/* Right: Decorative Panel */}
      <div className="hidden md:flex w-1/2 bg-amber-100 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-yellow-100 to-beige-100 opacity-60" />
        <img
          src="https://cdn.pixabay.com/photo/2018/07/11/14/09/hiring-3531130_640.jpg"
          alt="Hiring"
          className="absolute top-10 left-10 w-48 h-auto object-contain rounded-xl shadow-md"
        />
        <img
          src="https://cdn.pixabay.com/photo/2020/07/03/09/01/outsourcing-5365729_960_720.png"
          alt="Outsourcing"
          className="absolute top-40 left-32 w-48 h-auto object-contain rounded-xl shadow-md"
        />
        <img
          src="https://cdn.pixabay.com/photo/2023/03/04/06/53/office-7829030_640.jpg"
          alt="Office"
          className="absolute bottom-10 right-10 w-48 h-auto object-contain rounded-xl shadow-md"
        />
        <p className="absolute bottom-10 left-10 text-amber-700 text-4xl font-bold">
          We build the future
        </p>
      </div>
    </div>
  );
}

export default Login;
