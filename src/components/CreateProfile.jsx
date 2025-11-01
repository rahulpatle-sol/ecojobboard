import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateProfile = () => {
  const [form, setForm] = useState({
    profileHeadline: '',
    skills: '',
    experience: '',
    education: '',
    itSkills: '',
    projects: '',
    github: '',
    linkedin: '',
    certification: '',
    achievements: '',
    languages: '',
    careerProfile: '',
    jobRole: '',
    employmentType: '',
    location: '',
    resume: '',
    profilePic: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || '';
  const role = location.state?.role || 'jobseeker';

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic') {
      setForm({ ...form, profilePic: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('User ID missing. Please login again.');
      return;
    }

    const profileData = {
      ...form,
      userId,
      role,
      id: Date.now(),
      profilePic: form.profilePic ? URL.createObjectURL(form.profilePic) : '',
    };

    try {
      const res = await fetch('http://localhost:3000/jobseekerProfiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        alert('Profile created successfully!');
        navigate(`/DashboardJobseeker/${userId}`, {
          state: { userId, role }
        });
      } else {
        alert('Failed to submit.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting form.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-yellow-100 to-beige-200 px-6 py-12 overflow-y-auto font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-amber-200">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create Your Endless Profile
        </h1>

        {/* Profile Pic Upload */}
        <div className="mb-8 flex flex-col items-center">
          <label className="text-sm font-medium text-gray-700 mb-2">Upload Profile Pic</label>
          <div className="w-28 h-28 rounded-full overflow-hidden border border-amber-300 bg-gray-100 flex items-center justify-center shadow-sm">
            {form.profilePic ? (
              <img
                src={URL.createObjectURL(form.profilePic)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-500">No image</span>
            )}
          </div>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
            className="mt-2 text-sm"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Profile Headline', name: 'profileHeadline' },
            { label: 'Skills', name: 'skills' },
            { label: 'Experience', name: 'experience' },
            { label: 'Education', name: 'education' },
            { label: 'IT Skills', name: 'itSkills' },
            { label: 'Projects', name: 'projects' },
            { label: 'GitHub Profile', name: 'github' },
            { label: 'LinkedIn Profile', name: 'linkedin' },
            { label: 'Certifications', name: 'certification' },
            { label: 'Achievements / Accomplishments', name: 'achievements' },
            { label: 'Languages', name: 'languages' },
            { label: 'Career Profile', name: 'careerProfile' },
            { label: 'Job Role', name: 'jobRole' },
            { label: 'Employment Type', name: 'employmentType' },
            { label: 'Location', name: 'location' },
            { label: 'Upload Resume (URL or filename)', name: 'resume' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-medium text-gray-700">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-amber-300 rounded-md shadow-sm focus:ring-amber-400 focus:outline-none"
              />
            </div>
          ))}

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition shadow-md"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
