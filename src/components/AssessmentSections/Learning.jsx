

export default function Learning() {
  const resources = [
    { title: 'DSA Mastery', category: 'Tech', link: '#' },
    { title: 'Generative AI Fundamentals', category: 'Tech', link: '#' },
    { title: 'MERN Stack Development', category: 'Tech', link: '#' },
    { title: 'Digital Marketing Basics', category: 'Non-Tech', link: '#' },
    { title: 'Product Management', category: 'Non-Tech', link: '#' },
    { title: 'UI/UX Design Essentials', category: 'Tech', link: '#' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Learning Resources</h2>
      <p className="text-sm text-slate-600 mb-6">Explore curated resources across tech and non-tech domains.</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((res, i) => (
          <li key={i} className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg border border-amber-200 transition">
            <h3 className="text-lg font-semibold text-amber-700">{res.title}</h3>
            <p className="text-sm text-gray-600 mb-2">Category: {res.category}</p>
            <a href={res.link} className="text-sm text-amber-600 hover:underline">View Resource →</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
