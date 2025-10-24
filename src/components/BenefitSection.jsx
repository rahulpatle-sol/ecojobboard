import React from 'react';

const BenefitsSection = () => {
  return (
    <section className="bg-white text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits</h2>
        <p className="text-lg text-gray-600">
          Transforming recruitment experience<br />
          <span className="text-indigo-600 font-medium">
            Innovative platform designed for modern professionals and companies
          </span>
        </p>
      </div>

      {/* Dual Blocks */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Seekers Block */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-indigo-600 uppercase mb-2">Seekers</h4>
          <h3 className="text-xl font-bold mb-2">Opportunities for emerging talent</h3>
          <p className="text-gray-600 mb-4">
            Discover meaningful career paths and growth potential.
          </p>
          <img
            src="https://source.unsplash.com/featured/?young-professional"
            alt="Emerging talent"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <a href="#" className="text-indigo-600 font-medium hover:underline">Learn &gt;</a>
        </div>

        {/* Recruiters Block */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-indigo-600 uppercase mb-2">Recruiters</h4>
          <h3 className="text-xl font-bold mb-2">Efficient talent acquisition strategy</h3>
          <p className="text-gray-600 mb-4">
            Access top-tier candidates with precision matching.
          </p>
          <img
            src="https://source.unsplash.com/featured/?recruitment,team"
            alt="Recruiters"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        </div>
      </div>

      {/* Optional CTA */}

    </section>
  );
};

export default BenefitsSection;
