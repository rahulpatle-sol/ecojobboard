export default function Aptitude() {
  const questions = [
    { question: 'What is the next number in the sequence: 2, 4, 8, 16, ?', type: 'Logical Reasoning' },
    { question: 'If A = 1, B = 2, then Z = ?', type: 'Verbal Ability' },
    { question: 'Solve: (3x + 5)(x - 2) = 0', type: 'Quantitative Aptitude' },
    { question: 'Which shape has the most sides?', type: 'Visual Reasoning' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Aptitude Questions</h2>
      <p className="text-sm text-slate-600 mb-6">Test your reasoning, verbal, and quantitative skills.</p>
      <ul className="space-y-4">
        {questions.map((q, i) => (
          <li key={i} className="p-4 bg-white rounded-xl shadow-md border border-amber-200">
            <h3 className="text-base font-semibold text-amber-700">{q.question}</h3>
            <p className="text-sm text-gray-600">Type: {q.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
