import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiUploadCloud2Line } from 'react-icons/ri';

const PostJob = () => {
  const [form, setForm] = useState({
    hiringRole: '',
    companyName: '',
    location: '',
    employmentType: '',
    education: '',
    payoutScale: '',
    category: '',
    website: '',
    jobDesc: '',
    companyLogo: null
  });

  const locationHook = useLocation();
  const navigate = useNavigate();
  const userId = locationHook.state?.userId;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, companyLogo: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...form,
      postedBy: userId,
      id: `j${Date.now()}`
    };

    const res = await fetch('http://localhost:3000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });

    if (res.ok) {
      alert('Job posted successfully!');
      navigate(`/DashboardHR`);
    } else {
      alert('Failed to post job.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Post A Job</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-md">
        {/* Left Side */}
        <div className="space-y-4">
          <input
            type="text"
            name="hiringRole"
            value={form.hiringRole}
            onChange={handleChange}
            placeholder="Job Profile"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            placeholder="Job Type"
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Upload Company Logo</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
                <RiUploadCloud2Line className="text-xl text-blue-600" />
                <span className="text-sm text-gray-700">Choose File</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
              {form.companyLogo && (
                <img src={form.companyLogo} alt="Logo Preview" className="w-12 h-12 object-cover rounded border" />
              )}
            </div>
          </div>

          <input
            type="text"
            name="education"
            value={form.education}
            onChange={handleChange}
            placeholder="Education Required"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="payoutScale"
            value={form.payoutScale}
            onChange={handleChange}
            placeholder="Payout Scale"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website Link /https://www.ibm.com/think/topics/artificial-intelligence Post"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            name="jobDesc"
            value={form.jobDesc}
            onChange={handleChange}
            placeholder="Description of Job"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-start">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Post A Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
