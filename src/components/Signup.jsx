import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../auth/signup';
import { FcGoogle } from "react-icons/fc";
import { HiCube } from "react-icons/hi";

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobseeker'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      ...form,
      id: Date.now()
    };

    const result = await signup(newUser);

    if (result) {
      alert('Signup successful!');
      navigate('/login');
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Left: Signup Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-white">
        <div className="max-w-md mx-auto w-full">
          <HiCube className="text-6xl text-purple-600 mb-4" />
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Create Account 🚀</h2>

          {/* Google Signup */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md mb-4 hover:bg-gray-100 transition">
            <FcGoogle className="text-xl" />
            <span>Signup with Google</span>
          </button>

          {/* Email Signup */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create password"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="hr">HR / Recruiter</option>
              <option value="mentor">Mentor</option>
            </select>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Signup
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <a href="/login" className="text-purple-600 hover:underline">Log in</a>
          </p>
        </div>
      </div>

      {/* Right: Decorative Panel */}
      <div className="hidden md:flex w-1/2 bg-purple-600 relative items-center justify-center overflow-hidden">
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
        <p className="absolute bottom-10 right-10 text-white text-lg font-semibold">
          We build the future
        </p>
      </div>
    </div>
  );
}

export default Signup;
