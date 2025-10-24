import React from 'react'

const Hero = () => {
  return (
    <section className="w-full px-6 md:px-12 py-16 bg-white font-['Zen_Dots']">
      {/* Headline */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Find your dream job now
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          5 lakh+ jobs for you to explore
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by skills, title, company..."
          className="w-full md:flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700  text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-3  text-white rounded-md hover:bg-gray-800 transition">
          Search
        </button>
      </div>
    </section>
  )
}

export default Hero
