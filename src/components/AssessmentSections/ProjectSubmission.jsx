export default function ProjectSubmission() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Project Submission</h2>
      <p className="text-sm text-slate-600 mb-6">Submit your project for review and feedback.</p>
      <div className="bg-white p-6 rounded-xl shadow-md border border-amber-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Topic</label>
          <input type="text" placeholder="e.g., Real-time Chat App" className="mt-1 w-full px-4 py-2 border border-amber-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea rows="4" placeholder="Brief overview of your project..." className="mt-1 w-full px-4 py-2 border border-amber-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Submission Link</label>
          <input type="url" placeholder="GitHub or hosted link" className="mt-1 w-full px-4 py-2 border border-amber-300 rounded-md" />
        </div>
        <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">Submit Project</button>
      </div>
    </div>
  );
}
