import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  RiGridFill,
  RiNotification3Fill,
  RiEdit2Line,
  RiAddCircleFill,
  RiVerifiedBadgeFill
} from 'react-icons/ri';
import { FcBusinessman } from 'react-icons/fc';

export default function DashboardHR() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [recommendedCandidates, setRecommendedCandidates] = useState([]);

  // Fetch HR profile
  useEffect(() => {
    fetch(`http://localhost:3000/hrProfiles`)
      .then(res => res.json())
      .then(data => setProfile(data[0]))
      .catch(err => console.error('Error fetching HR profile:', err));
  }, [id]);

  // Fetch jobs posted by HR
  useEffect(() => {
    fetch(`http://localhost:3000/jobs?postedBy=${id}`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoadingJobs(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoadingJobs(false);
      });
  }, [id]);

  // Fetch recommended candidates
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const hrRes = await fetch(`http://localhost:3000/hrProfiles?userId`);
        const hrData = await hrRes.json();
        const postedJobs = hrData[0]?.postedJobs || [];

        const appRes = await fetch(`http://localhost:3000/applications`);
        const allApplications = await appRes.json();
        const matchedApps = allApplications.filter(app => postedJobs.includes(app.jobId));

        const userIds = [...new Set(matchedApps.map(app => app.userId))];
        const profileRes = await fetch(`http://localhost:3000/jobseekerProfiles`);
        const allProfiles = await profileRes.json();
        const matchedProfiles = allProfiles.filter(profile => userIds.includes(profile.userId));

        setRecommendedCandidates(matchedProfiles);
      } catch (err) {
        console.error('Error fetching recommended candidates:', err);
      }
    };

    fetchRecommended();
  }, [id]);

  if (!profile) {
    return <div className="text-center mt-20 text-gray-600">Loading your HR profile...</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-100 to-beige-200 font-sans">
      {/* Sidebar */}
      <div className="w-16 bg-white shadow-md flex flex-col items-center py-6 space-y-6 text-amber-600 text-xl">
        <RiGridFill />
        <a href="/Notification"><RiNotification3Fill /></a>
        <button onClick={() => navigate('/PostJob', { state: { userId: id } })}>
          <RiAddCircleFill />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search jobs or candidates"
            className="px-4 py-2 w-1/2 border border-amber-300 rounded-md shadow-sm focus:ring-amber-400 focus:outline-none"
          />
          <div className="w-10 h-10 rounded-full bg-amber-200 shadow-inner" />
        </div>

        {/* HR Profile */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome HR 👋</h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-amber-300 flex items-center justify-center bg-gray-100">
              {profile.companyLogo ? (
                <img src={profile.companyLogo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <FcBusinessman className="text-5xl" />
              )}
              <RiVerifiedBadgeFill className="absolute bottom-0 right-0 text-amber-600 bg-white rounded-full p-0.5 w-5 h-5 shadow-md" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{profile.companyName}</h3>
              <button className="mt-2 px-3 py-1 bg-amber-600 text-white rounded flex items-center gap-1 text-sm hover:bg-amber-700 transition">
                <RiEdit2Line /> Edit Company Info
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
            <p><strong>Experience:</strong> {profile.experience || '—'} years</p>
            <p><strong>Domains:</strong> {profile.domains?.join(', ') || '—'}</p>
            <p><strong>Tech Stack:</strong> {profile.techStack?.join(', ') || '—'}</p>
            <p><strong>Expertise:</strong> {profile.expertise || '—'}</p>
          </div>
          <p className="text-sm text-gray-700"><strong>About Company:</strong> {profile.companyDesc || '—'}</p>
        </div>

        {/* Jobs Posted */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">Jobs You’ve Posted</h2>
        {loadingJobs ? (
          <p className="text-gray-600">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet. Click the + icon to post one.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {jobs.map(job => (
              <div key={job.id} className="p-6 border border-amber-200 rounded-xl bg-white shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-900">{job.hiringRole}</h3>
                <p className="text-gray-700">{job.jobDesc}</p>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Type:</strong> {job.employmentType}</p>
                  <p><strong>Payout:</strong> {job.payoutScale}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommended Candidates */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recommended Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedCandidates.map(candidate => (
            <div key={candidate.id} className="p-6 bg-white rounded-xl border border-amber-200 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={candidate.profilePic || '/default.png'}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{candidate.fullName}</h3>
                  <p className="text-sm text-gray-600">{candidate.jobRole}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2"><strong>Skills:</strong> {candidate.skills}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Experience:</strong> {candidate.experience}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Resume:</strong> <a href={candidate.resume} className="text-amber-600 hover:underline">View</a></p>
              <button className="mt-3 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition">
                Shortlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
