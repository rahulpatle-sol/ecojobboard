import React from 'react'

const features = [
  {
    title: 'Aptitude Testing',
    description: 'Precision screening to identify top talent quickly.',
  },
  {
    title: 'Profile Submission',
    description: 'Seamless candidate profile management and tracking.',
  },
  {
    title: 'Skill Assessment',
    description: 'In-depth evaluation of candidate capabilities and potential.',
  },
]

const Roadmap = () => {
  return (
    <section className="w-full px-6 md:px-12 py-16 bg-white text-black font-['Zen_Dots']">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Comprehensive hiring journey for modern teams
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Transform recruitment with intelligent, data-driven solutions.
        </p>
      </div>

      {/* Feature Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition"
          >
            <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center text-gray-400">
              {/* Placeholder for image/icon */}
              Image
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="mt-12 flex justify-center gap-6">
        <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
          Learn more
        </button>
        <button className="px-6 py-3 border border-gray-400 dark:border-gray-600 rounded-md hover:border-black dark:hover:border-white transition">
          Watch demo
        </button>
      </div>
    </section>
  )
}

export default Roadmap
