import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  RiGridFill,
  RiNotification3Fill,
  RiEdit2Line,
  RiAddCircleFill
} from 'react-icons/ri';
import { FcBusinessman } from "react-icons/fc";

function DashboardHR() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

 useEffect(() => {
  console.log('HR ID:', id);
  fetch(`http://localhost:3000/hrProfiles`)
    .then(res => res.json())
    .then(data => {
      console.log('HR Profile:', data);
      if (data.length > 0) setProfile(data[0]);
    })
    .catch(err => console.error('Error fetching HR profile:', err));
}, [id]);


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

  if (!profile) {
    return <div className="text-center mt-20 text-gray-600">Loading your HR profile...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Left Toolbar */}
      <div className="w-16 bg-white shadow-md flex flex-col items-center py-6 space-y-6 text-purple-600 text-xl">
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
            className="px-4 py-2 w-1/2 border border-gray-300 rounded-md"
          />
          <div className="w-10 h-10 rounded-full bg-gray-300" />
        </div>

        {/* HR Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome HR 👋</h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100">
              {profile.companyLogo ? (
                <img src={profile.companyLogo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <FcBusinessman className="text-5xl" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{profile.companyName}</h3>
              <button className="mt-2 px-3 py-1 bg-purple-600 text-white rounded flex items-center gap-1 text-sm">
                <RiEdit2Line /> Edit Company Info
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-700">{profile.companyDesc}</p>
        </div>

        {/* Posted Jobs */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">Jobs You’ve Posted</h2>
        {loadingJobs ? (
          <p className="text-gray-600">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet. Click the + icon to post one.</p>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="mb-6 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{job.hiringRole}</h3>
              <p className="text-gray-700">{job.jobDesc}</p>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.employmentType}</p>
                <p><strong>Payout:</strong> {job.payoutScale}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardHR;
