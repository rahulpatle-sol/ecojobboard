import { useState } from 'react';

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
];

function JobSearch() {
  const [query, setQuery] = useState('');

  const filteredJobs = jobData.filter(job =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="p-6">
      <input
        type="text"
        placeholder="Search jobs like UI/UX, Dev..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
      />
      <div className="mt-6 grid gap-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="p-4 border rounded shadow bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-sm">{job.location}</p>
            <p className="mt-2">{job.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default JobSearch;
