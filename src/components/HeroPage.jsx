function HeroWhite() {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center bg-white text-center px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
        Unlock Hiring Features Like Never Before
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl">
        Explore the essential hiring features to save time and scale your recruiting processes
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
        <a
          href="/signup"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
        >
          Join Waitlist
        </a>
        <span className="text-sm text-gray-500">
          Sign up now and enjoy free trial at launch! Limited time offer.
        </span>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md text-left">
          <h3 className="text-xl font-bold text-indigo-700 mb-2">Job Board Forms</h3>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Survey</li>
            <li>Forms</li>
            <li>Custom Job Application</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md text-left">
          <h3 className="text-xl font-bold text-indigo-700 mb-2">Schedule Interview</h3>
          <p className="text-gray-700 mb-4">
            Build an interview-ready experience that saves time and improves candidate experience.
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Schedule</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Reschedule</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroWhite;
