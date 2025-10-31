export default function MentorDiscussion() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Discussion with Mentor</h2>
      <p className="text-sm text-slate-600 mb-6">Schedule a session, ask questions, and get feedback.</p>
      <div className="p-6 bg-white rounded-xl shadow-md border border-amber-200">
        <p className="text-sm text-gray-700 mb-2">Next available slot: <strong>Monday, 4 PM IST</strong></p>
        <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">Book Session</button>
      </div>
    </div>
  );
}
