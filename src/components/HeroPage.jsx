import { motion } from "framer-motion"
import JobSearchBox from "./Jobsearch"

export default function Hero() {
  return (
    <section className="w-full px-4 md:px-12 py-20 bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-2"
          >
            {/* Profile Card */}
            <div className="col-span-1 bg-orange-100 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://media.istockphoto.com/id/1274948583/photo/male-programmer-working-on-new-project.jpg?s=2048x2048&w=is&k=20&c=VppjIAYK1F0WA-tl79S9VC8Hy1OOBaaAFc9OZ6Zw2p0="
                alt="developer"
                className="w-full aspect-square object-cover"
              />
            </div>

            {/* Designer Card */}
            <div className="col-span-1 bg-purple-100 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500"
                alt="designer"
                className="w-full aspect-square object-cover"
              />
            </div>

            {/* Job Details Card */}
            <div className="col-span-1 bg-black text-white rounded-xl p-4 text-sm shadow-xl">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Weekly Hours</span>
                  <span>40/40</span>
                </div>
                <div className="flex justify-between">
                  <span>Employee Type</span>
                  <span>Full-time</span>
                </div>
                <div className="flex justify-between">
                  <span>Location</span>
                  <span>Remote</span>
                </div>
              </div>
            </div>

            {/* Pattern Card */}
            <div className="col-span-1 bg-orange-100 rounded-xl overflow-hidden shadow-xl">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 40px)",
                  minHeight: "160px",
                }}
              />
            </div>

            {/* Open Jobs Card */}
            <div className="col-span-2 bg-gradient-to-r from-orange-100 to-blue-200 rounded-xl p-6 flex items-center justify-between shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Open Roles</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">32 jobs found</p>
                <p className="text-sm text-gray-700">matching your profile</p>
                <a href="#" className="text-xs text-gray-600 mt-1 inline-block hover:underline">
                  View all →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Search Box */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative w-full max-w-md">
              <JobSearchBox />
            </motion.div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Land your dream job <br className="hidden sm:block" /> with industry-standard skills
            </h1>

            {/* Description */}
            <p className="text-base text-gray-700 max-w-md leading-relaxed">
              The largest pool of remote job offers tailored to your skillset. Join great teams and build the future together.
            </p>

            {/* Decorative Line */}
            <div className="w-full max-w-md">
              <svg viewBox="0 0 300 100" className="w-full h-auto">
                <path
                  d="M 10 80 Q 75 20, 150 50 T 290 80"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-300"
                />
              </svg>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition">
                <span className="inline-flex items-center justify-center w-5 h-5">
                  <span className="text-xs">▶</span>
                </span>
                <span className="text-sm font-medium">Watch video</span>
              </button>
              <button className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition">
                Find a job
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
