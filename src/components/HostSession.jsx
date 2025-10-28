
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HostSession = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    mode: '',
    platform: '',
    maxParticipants: ''
  });

  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionData = {
      ...form,
      mentorId: userId,
      id: `s${Date.now()}`
    };

    const res = await fetch('http://localhost:3000/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    });

    if (res.ok) {
      alert('Session hosted successfully!');
      navigate(`/MentorDashboard/${userId}`);
    } else {
      alert('Failed to host session.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Host a Mentorship Session</h2>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Session Title"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Session Description"
          rows={4}
          required
          className="w-full p-3 border border-gray-300 rounded resize-none"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <input
            type="text"
            name="platform"
            value={form.platform}
            onChange={handleChange}
            placeholder="Platform / Location"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <input
          type="number"
          name="maxParticipants"
          value={form.maxParticipants}
          onChange={handleChange}
          placeholder="Max Participants"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Host Session
        </button>
      </form>
    </div>
  );
};

export default HostSession;
