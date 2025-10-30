import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const jobData = [
  {
    id: 1,
    title: 'UI/UX Designer',
    location: 'Remote',
    description: 'Design intuitive interfaces for our edtech platform.'
  },
  {
    id: 2,
    title: 'Frontend Developer',
    location: 'Bangalore',
    description: 'Build responsive React components with GSAP animations.'
  },
  {
    id: 3,
    title: 'Backend Developer',
    location: 'Hyderabad',
    description: 'Design scalable APIs and manage MongoDB schemas.'
  }
]

export default function JobSearch() {
  const [query, setQuery] = useState('')

  const filteredJobs = jobData.filter(job =>
    job.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="w-full max-w-xl mx-auto space-y-6">
      {/* Search Input */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Search jobs like UI/UX, Dev..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        />
      </div>

      {/* Filtered Results */}
      {query.trim() && (
        <div className="grid gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div
                key={job.id}
                className="p-4 rounded-xl shadow-lg border border-amber-200 bg-white/30 backdrop-blur-md transition hover:shadow-xl"
              >
                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                <p className="text-sm text-amber-700">{job.location}</p>
                <p className="mt-2 text-sm text-gray-700">{job.description}</p>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-600 italic">No matching jobs found.</div>
          )}
        </div>
      )}
    </section>
  )
}
