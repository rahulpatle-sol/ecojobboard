import React from 'react';

const FinalCTASection = () => {
  return (
    <section className="bg-white text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to revolutionize your hiring process?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of startups and creators transforming recruitment with smart technology.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">
              Start free trial
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition">
              Book demo
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src="https://source.unsplash.com/featured/?team,hiring"
            alt="Hiring visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
