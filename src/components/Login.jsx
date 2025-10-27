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
      if (user.role === 'jobseeker') {
        navigate(`/DashboardJobseeker/${user.id}`, {
          state: { userId: user.id, role: user.role }
        });
      } else if (user.role === 'hr') {
        navigate('/DashboardHR', {
          state: { userId: user.id, role: user.role }
        });
      } else if (!user.role || user.role === 'new') {
        navigate('/WelcomeSection', {
          state: { userId: user.id }
        });
      }
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-white ">
        <div className="max-w-md mx-auto w-full">
          <HiCube className="text-6xl text-purple-600 mb-4" />
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Login</h2>

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
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="random pass"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />

            <div className="flex justify-between text-xs text-gray-500">
              <label><input type="checkbox" className="mr-1" />Remember me</label>
              <a href="/ForgetPassword" className="hover:underline">Forget Password</a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            No account? <a href="/signup" className="text-purple-600 hover:underline">Sign up here</a>
          </p>
          <p> new user <a href="/WelcomeSection"> new user</a> </p>
        </div>
      </div>

      {/* Right: Decorative Panel with Illustrations */}
      <div className="hidden md:flex w-1/2 bg-purple-600 relative items-center justify-center overflow-hidden">
        {/* Illustration Images */}
        <img
          src="/illustrations/hire.svg"
          alt="Hire"
          className="absolute top-10 left-10 w-20 h-20 object-contain"
        />
        <img
          src="/illustrations/job.svg"
          alt="Job"
          className="absolute top-40 left-32 w-20 h-20 object-contain"
        />
        <img
          src="/illustrations/office.svg"
          alt="Office"
          className="absolute bottom-20 right-20 w-20 h-20 object-contain"
        />

        {/* Slogan */}
        <p className="absolute bottom-10 right-10 text-white text-lg font-semibold">
          We build the future
        </p>
      </div>
    </div>
  );
}

export default Login;
