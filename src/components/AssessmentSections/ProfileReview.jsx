export default function ProfileReview() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Profile Review</h2>
      <p className="text-sm text-slate-600 mb-6">Get feedback on your resume, portfolio, and LinkedIn.</p>
      <div className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
        <p className="text-sm text-gray-700 mb-2">Upload your resume or portfolio for review.</p>
        <input type="file" className="mb-4" />
        <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">Submit for Review</button>
      </div>
    </div>
  );
}
