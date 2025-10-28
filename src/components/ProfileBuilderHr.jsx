import React, { useState } from 'react';
import { RiUploadCloud2Line } from 'react-icons/ri';

export default function ProfileBuilder() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    country: '',
    company: '',
    designation: '',
    profilePic: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profilePic: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    alert('Profile submitted!');
    // navigate('/dashboard') or save to backend
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Left Panel */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
        <div className="w-24 h-24 bg-white rounded-lg mb-6" />
        <pre className="text-sm whitespace-pre-wrap text-center leading-6">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi eligendi quasi nihil voluptas animi voluptatibus dolorum, iusto veritatis magni quam fugit voluptatem temporibus necessitatibus rerum numquam dolores quae quidem illo!
        </pre>
      </div>

      {/* Right Form */}
      <div className="w-1/2 bg-gray-100 flex flex-col justify-center px-10 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Builder</h2>

        {/* Upload Profile Pic */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Upload Profile Pic</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition">
              <RiUploadCloud2Line className="text-xl text-blue-600" />
              <span className="text-sm text-gray-700">Choose File</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {form.profilePic && (
              <img src={form.profilePic} alt="Preview" className="w-12 h-12 rounded-full object-cover border" />
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="p-3 border border-gray-300 rounded bg-white"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-3 border border-gray-300 rounded bg-white"
          />
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="p-3 border border-gray-300 rounded bg-white"
          />
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="p-3 border border-gray-300 rounded bg-white"
          />
          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="p-3 border border-gray-300 rounded bg-white"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
