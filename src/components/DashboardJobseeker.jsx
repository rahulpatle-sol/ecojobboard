import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  RiGridFill,
  RiSquareFill,
  RiNotification3Fill,
  RiEdit2Line,
  RiVerifiedBadgeFill
} from 'react-icons/ri'
import { FcBusinessman } from 'react-icons/fc'

function DashboardJobseeker() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3000/jobseekerProfiles?userId=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setProfile(data[0])
      })
      .catch(err => console.error('Error fetching profile:', err))
  }, [id])

  useEffect(() => {
    fetch('http://localhost:3000/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoadingJobs(false)
      })
      .catch(err => {
        console.error('Error fetching jobs:', err)
        setLoadingJobs(false)
      })
  }, [])

  const handleApply = async (jobId) => {
    const application = {
      jobId,
      userId: id,
      appliedAt: new Date().toISOString()
    }

    const res = await fetch('http://localhost:3000/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application)
    })

    if (res.ok) {
      alert('Applied successfully!')
    } else {
      alert('Failed to apply.')
    }
  }

  const filteredJobs = jobs.filter(job =>
    job.hiringRole.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!profile) {
    return <div className="text-center mt-20 text-gray-600">Loading your profile...</div>
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-100 to-beige-200 font-sans">
      {/* Left Toolbar */}
      <div className="w-16 bg-white shadow-md flex flex-col items-center py-6 space-y-6 text-amber-600 text-xl">
        <RiGridFill />
        <a href="/Assessment"><RiSquareFill /></a>
        <a href="/Verified"><RiVerifiedBadgeFill /></a>
        <a href="/Notification"><RiNotification3Fill /></a>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search jobs by role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-1/2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <div className="w-10 h-10 rounded-full bg-amber-200 shadow-inner" />
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome {profile.fullName} 👋</h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-amber-300 flex items-center justify-center bg-gray-100">
              {profile.profilePic ? (
                <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FcBusinessman className="text-5xl" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{profile.fullName}</h3>
              <button className="mt-2 px-3 py-1 bg-amber-600 text-white rounded flex items-center gap-1 text-sm hover:bg-amber-700 transition">
                <RiEdit2Line /> Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div><label className="font-medium">Full Name</label><p>{profile.fullName}</p></div>
            <div><label className="font-medium">Nick Name</label><p>{profile.nickName || '—'}</p></div>
            <div><label className="font-medium">Gender</label><p>{profile.gender || '—'}</p></div>
            <div><label className="font-medium">Country</label><p>{profile.country || 'India'}</p></div>
            <div><label className="font-medium">Your Tagline</label><p>{profile.profileHeadline}</p></div>
            <div><label className="font-medium">State / Zone</label><p>{profile.location}</p></div>
          </div>

          <div className="mt-6 border-t pt-4">
            <label className="block font-medium text-gray-700 mb-1">My Email Address</label>
            <div className="flex items-center justify-between">
              <p className="text-gray-800">{profile.email || 'ameenasingh@gmail.com'}</p>
              <button className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">
                Hidden Email
              </button>
            </div>
          </div>
        </div>

        {/* Job Recommendations */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recommended Jobs</h2>
        {loadingJobs ? (
          <p className="text-gray-600">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-gray-600">No matching jobs found.</p>
        ) : (
          filteredJobs.map(job => (
            <div
              key={job.id}
              className="mb-6 p-4 rounded-xl border border-amber-200 bg-white/30 backdrop-blur-md shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-gray-900">{job.hiringRole}</h3>
              <p className="text-gray-700">{job.jobDesc}</p>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p><strong>Company:</strong> {job.companyName}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.employmentType}</p>
                <p><strong>Payout:</strong> {job.payoutScale}</p>
              </div>
              <button
                onClick={() => handleApply(job.id)}
                className="mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
              >
                Apply
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DashboardJobseeker
