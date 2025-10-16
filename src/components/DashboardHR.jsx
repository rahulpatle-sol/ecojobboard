import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function CreateProfile() {
  const [form, setForm] = useState({
    // Jobseeker fields
    headline: '',
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

    // HR fields
    companyName: '',
    companyLogo: '',
    companyDesc: '',
    hiringRole: '',
    jobDesc: '',
    workProfile: '',
    fresherAllowed: '',
    requiredEducation: '',
    category: '',
    payoutScale: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const role = location.state?.role;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      ...form,
      userId,
      role,
      id: Date.now()
    };

    try {
      const res = await fetch('http://localhost:3000/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      if (res.ok) {
        alert(role === 'hr' ? 'Profile created! You can now post jobs.' : 'Profile created successfully!');
        navigate(`/Dashboard${role === 'hr' ? 'HR' : 'Jobseeker'}/${userId}`);
      } else {
        alert('Failed to submit.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting form.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full p-8 bg-white rounded-xl shadow-xl text-black">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {role === 'hr' ? 'Create Your HR Profile' : 'Create Your Jobseeker Profile'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {role === 'jobseeker' && (
            <>
              <h3 className="text-xl font-semibold text-gray-800">Personal & Career Info</h3>
              {[
                { label: 'Profile Headline', name: 'headline' },
                { label: 'Skills', name: 'skills' },
                { label: 'Experience', name: 'experience' },
                { label: 'Education', name: 'education' },
                { label: 'IT Skills', name: 'itSkills' },
                { label: 'Projects', name: 'projects' },
                { label: 'Career Profile', name: 'careerProfile' },
                { label: 'Job Role', name: 'jobRole' },
                { label: 'Employment Type', name: 'employmentType' },
                { label: 'Location', name: 'location' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block mb-1 font-medium">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded"
                  />
                </div>
              ))}

              <h3 className="text-xl font-semibold text-gray-800 mt-6">Online Profiles & Resume</h3>
              {[
                { label: 'GitHub Profile', name: 'github' },
                { label: 'LinkedIn Profile', name: 'linkedin' },
                { label: 'Certifications', name: 'certification' },
                { label: 'Achievements', name: 'achievements' },
                { label: 'Languages', name: 'languages' },
                { label: 'Upload Resume (URL or filename)', name: 'resume' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block mb-1 font-medium">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                  />
                </div>
              ))}
            </>
          )}

          {role === 'hr' && (
            <>
              <h3 className="text-xl font-semibold text-gray-800">Company Info</h3>
              {[
                { label: 'Company Name', name: 'companyName' },
                { label: 'Company Logo URL', name: 'companyLogo' },
                { label: 'Company Description', name: 'companyDesc' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block mb-1 font-medium">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded"
                  />
                </div>
              ))}

              <h3 className="text-xl font-semibold text-gray-800 mt-6">Hiring Preferences</h3>
              {[
                { label: 'Hiring Position / Job Role', name: 'hiringRole' },
                { label: 'Job Description', name: 'jobDesc' },
                { label: 'Work Profile', name: 'workProfile' },
                { label: 'Experience Required', name: 'experience' },
                { label: 'Freshers Allowed (Yes/No)', name: 'fresherAllowed' },
                { label: 'Required Education', name: 'requiredEducation' },
                { label: 'Category', name: 'category' },
                { label: 'Employment Type', name: 'employmentType' },
                { label: 'Work Location', name: 'location' },
                { label: 'Payout Scale', name: 'payoutScale' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block mb-1 font-medium">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded"
                  />
                </div>
              ))}
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            {role === 'hr' ? 'Create HR Profile' : 'Submit Jobseeker Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
