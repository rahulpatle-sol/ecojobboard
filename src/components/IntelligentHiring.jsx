import React from 'react'

const features = [
  {
    label: 'Test',
    title: 'Online candidate screening',
    description: 'Precise technical and aptitude evaluation methods.',
    button: 'Demo',
  },
  {
    label: 'Interview',
    title: 'HR assessment process',
    description: 'Comprehensive candidate performance tracking.',
    button: 'Review',
  },
  {
    label: 'Scorecard',
    title: 'Detailed performance metrics and insights',
    description: 'Comprehensive candidate evaluation framework.',
    button: 'Analyze',
  },
]

const IntelligentHiring = () => {
  return (
    <section className="w-full px-6 md:px-12 py-16 bg-amber-50  font-['Zen_Dots']">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Intelligent hiring solutions
        </h2>
        <p className="text-base md:text-lg  ">
          Streamline recruitment with data-driven technology.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
          >
            <div className="text-sm uppercase text-blue-500 mb-2 tracking-wide">
              {feature.label}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {feature.description}
            </p>
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
              {feature.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default IntelligentHiring
