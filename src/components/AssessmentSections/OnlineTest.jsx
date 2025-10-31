export default function OnlineTest() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Online Test</h2>
      <p className="text-sm text-slate-600 mb-6">Take a timed test to validate your skills.</p>
      <div className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
        <p className="text-sm text-gray-700 mb-2">Test Duration: <strong>45 minutes</strong></p>
        <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">Start Test</button>
      </div>
    </div>
  );
}
