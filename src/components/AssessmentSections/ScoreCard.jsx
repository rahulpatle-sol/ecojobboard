export default function Scorecard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Scorecard</h2>
      <p className="text-sm text-slate-600 mb-6">View your performance across all stages.</p>
      <div className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
        <ul className="space-y-2 text-sm text-gray-700">
          <li>Learning: ✅</li>
          <li>Aptitude: ✅</li>
          <li>Project: ⏳</li>
          <li>Interview: ⏳</li>
        </ul>
      </div>
    </div>
  );
}
