import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DashboardJobseeker() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // ✅ Fetch jobseeker profile
  useEffect(() => {
    fetch(`http://localhost:3000/profiles?userId=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setProfile(data[0]);
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, [id]);

  // ✅ Fetch jobs from /jobs endpoint
  useEffect(() => {
    fetch('http://localhost:3000/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoadingJobs(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoadingJobs(false);
      });
  }, []);

  const handleApply = async (jobId) => {
    const application = {
      jobId,
      userId: id,
      appliedAt: new Date().toISOString()
    };

    const res = await fetch('http://localhost:3000/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application)
    });

    if (res.ok) {
      alert('Applied successfully!');
    } else {
      alert('Failed to apply.');
    }
  };

  if (!profile) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      
      {/* 👤 Profile Section */}
      <div className="mb-10 border-b pb-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          Welcome, {profile.headline || 'Candidate'} 👋
        </h2>
        <p className="text-gray-700 mb-6">
          Role: <span className="font-semibold capitalize">{profile.role}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <div>
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <p>{profile.skills}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            <p>{profile.experience}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p>{profile.education}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <p>{profile.projects}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Certifications</h3>
            <p>{profile.certification}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Social Profiles</h3>
            <p>
              GitHub: <a href={profile.github} className="text-blue-600 underline">{profile.github}</a><br />
              LinkedIn: <a href={profile.linkedin} className="text-blue-600 underline">{profile.linkedin}</a>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            View Resume
          </a>
        </div>
      </div>

      {/* 💼 Job Recommendations */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Recommended Jobs</h2>
      {loadingJobs ? (
        <p className="text-gray-600">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600">No jobs posted yet. Please check back later.</p>
      ) : (
        jobs.map(job => (
          <div key={job.id} className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-900">{job.hiringRole}</h3>
            <p className="text-gray-700">{job.jobDesc}</p>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.employmentType}</p>
              <p><strong>Payout:</strong> {job.payoutScale}</p>
            </div>
            <button
              onClick={() => handleApply(job.id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Apply
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DashboardJobseeker;
