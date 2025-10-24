import React from 'react';

const JobSearchSection = () => {
  return (
    <section className="bg-white text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Search</h2>
          <p className="text-lg text-gray-600 mb-6">
            <span className="font-semibold text-indigo-600">Find jobs instantly</span><br />
            Powerful search technology connecting talent with opportunity.
          </p>

          <h3 className="text-xl font-semibold mb-2">Live</h3>
          <p className="text-gray-600 mb-6">
            Intelligent job and company matching<br />
            Real-time results tailored to your professional profile.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">
              Search
            </button>
            <button className="text-indigo-600 font-medium hover:underline">
              Explore &gt;
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src="https://source.unsplash.com/featured/?career,workspace"
            alt="Job search visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default JobSearchSection;
