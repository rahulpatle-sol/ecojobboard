import React from 'react'

const BenefitsSection = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200 text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Platform Benefits</h2>
        <p className="text-lg text-gray-700">
          More than recruitment — we deliver readiness<br />
          <span className="text-amber-700 font-medium">
            Validated talent. Production-ready hires. Real impact.
          </span>
        </p>
      </div>

      {/* Dual Blocks */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Seekers Block */}
        <div className="bg-white border border-amber-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h4 className="text-sm font-semibold text-amber-600 uppercase mb-2 tracking-wide">For Talent</h4>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Industry-standard preparation & skill validation</h3>
          <p className="text-gray-700 mb-4">
            Go beyond learning — prove your skills through assessments, mentorship, and real-world projects. Get job-ready with confidence.
          </p>
          <img
            src="https://imgs.search.brave.com/1gJcTerUCcyi3hLNACcOkTaWd8SuBt2JhNn8mlBsZYM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/bWFuLXNlYXJjaC1o/aXJpbmctam9iLW9u/bGluZS1mcm9tLWxh/cHRvcF8xMTUwLTUy/NzI4LmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA"
            alt="Emerging talent"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <a href="#" className="text-amber-600 font-medium hover:underline">Explore pathways &gt;</a>
        </div>

        {/* Recruiters Block */}
        <div className="bg-white border border-amber-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h4 className="text-sm font-semibold text-amber-600 uppercase mb-2 tracking-wide">For Recruiters</h4>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Hire production-ready talent instantly</h3>
          <p className="text-gray-700 mb-4">
            Skip the guesswork. Access candidates who’ve already been vetted, mentored, and tested — saving you time, cost, and onboarding effort.
          </p>
          <img
            src="https://imgs.search.brave.com/yXS6I6jakGPh3avATtCN_DZg6dzHujzlUAu9leNphJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC85/NC85MC9jb25maWRl/bnQtam9iLWFwcGxp/Y2FudC13aXRoLXJl/c3VtZS12ZWN0b3It/Mzk3Nzk0OTAuanBn"
            alt="Recruiters"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <a href="#" className="text-amber-600 font-medium hover:underline">See how it works &gt;</a>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
