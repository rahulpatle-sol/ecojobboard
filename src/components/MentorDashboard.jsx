import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  RiGridFill,
  RiNotification3Fill,
  RiEdit2Line,
  RiAddCircleFill,
  RiVerifiedBadgeFill
} from 'react-icons/ri'
import { FcBusinessman } from 'react-icons/fc'

function MentorDashboard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [sessions, setSessions] = useState([])
  const [loadingSessions, setLoadingSessions] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3000/mentorProfiles`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setProfile(data[0])
      })
      .catch(err => console.error('Error fetching mentor profile:', err))
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:3000/sessions?mentorId=${id}`)
      .then(res => res.json())
      .then(data => {
        setSessions(data)
        setLoadingSessions(false)
      })
      .catch(err => {
        console.error('Error fetching sessions:', err)
        setLoadingSessions(false)
      })
  }, [id])

  if (!profile) {
    return <div className="text-center mt-20 text-gray-600">Loading your mentor profile...</div>
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-100 to-beige-200 font-sans">
      {/* Left Toolbar */}
      <div className="w-16 bg-white shadow-md flex flex-col items-center py-6 space-y-6 text-amber-600 text-xl">
        <RiGridFill />
        <a href="/Notification"><RiNotification3Fill /></a>
        <button onClick={() => navigate('/HostSession', { state: { userId: id } })}>
          <RiAddCircleFill />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search mentees or sessions"
            className="px-4 py-2 w-1/2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <div className="w-10 h-10 rounded-full bg-amber-200 shadow-inner" />
        </div>

        {/* Mentor Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome{} 👋</h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-amber-300 flex items-center justify-center bg-gray-100">
              {profile.profilePic ? (
                <img src={profile.profilePic} alt="Mentor" className="w-full h-full object-cover" />
              ) : (
                <FcBusinessman className="text-5xl" />
              )}
              {profile.verified && (
                <RiVerifiedBadgeFill className="absolute bottom-0 right-0 text-amber-600 bg-white rounded-full p-0.5 w-5 h-5 shadow-md" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{profile.fullName || 'Mentor Name'}</h3>
              <button className="mt-2 px-3 py-1 bg-amber-600 text-white rounded flex items-center gap-1 text-sm hover:bg-amber-700 transition">
                <RiEdit2Line /> Edit Profile
              </button>
            </div>
          </div>

          {/* Mentor Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
            <p><strong>Experience:</strong> {profile.experience} years</p>
            <p><strong>Company:</strong> {profile.company}</p>
            <p><strong>Domains:</strong> {profile.domains?.join(', ')}</p>
            <p><strong>Tech Stack:</strong> {profile.techStack?.join(', ')}</p>
            <p><strong>Expertise:</strong> {profile.expertise}</p>
            <p><strong>Problems Solved:</strong> {profile.problemsSolved}</p>
            <p><strong>DSA Solved:</strong> {profile.dsaSolved}</p>
            <p><strong>Mentorships:</strong> {profile.mentorshipCount}</p>
            <p><strong>Referrals:</strong> {profile.referralConnections}</p>
            <p><strong>Scorecard:</strong> {profile.scoreCard}</p>
            <p><strong>Rating:</strong> ⭐ {profile.rating}</p>
            <p><strong>Reviews:</strong> {profile.reviews}</p>
          </div>

          <p className="text-sm text-gray-700"><strong>Bio:</strong> {profile.bio}</p>
        </div>

        {/* Sessions List */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">Sessions You’ve Hosted</h2>
        {loadingSessions ? (
          <p className="text-gray-600">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="text-gray-600">No sessions hosted yet. Click the + icon to host one.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map(session => (
              <div
                key={session.id}
                className="p-6 rounded-xl border border-amber-200 bg-white/30 backdrop-blur-md shadow-lg hover:shadow-xl transition"
              >
                <h4 className="text-lg font-bold text-gray-900">{session.title}</h4>
                <p className="text-gray-700 mt-1">{session.description}</p>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p><strong>Date:</strong> {session.date}</p>
                  <p><strong>Time:</strong> {session.time}</p>
                  <p><strong>Mode:</strong> {session.mode}</p>
                  <p><strong>Platform:</strong> {session.platform}</p>
                  <p><strong>Max Participants:</strong> {session.maxParticipants}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MentorDashboard
