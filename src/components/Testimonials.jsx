import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const testimonialData = {
  candidates: [
    { quote: "I got hired within 2 weeks. The platform is a game changer.", name: "Ayesha Khan" },
    { quote: "The job matching was so accurate, I didn’t even need to apply twice.", name: "Ravi Mehta" },
    { quote: "Cinematic onboarding made me feel valued instantly.", name: "Sneha Roy" },
  ],
  recruiters: [
    { quote: "We sourced top talent in half the time. Brilliant system.", name: "Neha Sharma" },
    { quote: "Candidate profiles were instantly usable.", name: "James Lee" },
    { quote: "Role-based routing saved us hours.", name: "Priya Desai" },
  ],
  mentors: [
    { quote: "Mentoring here feels impactful. The flow is frictionless.", name: "Anita Verma" },
    { quote: "Loved guiding candidates through real-world challenges.", name: "Karan Patel" },
    { quote: "Finally a platform where mentorship scales.", name: "Arjun Rao" },
  ],
}

const CategoryCarousel = ({ title, items }) => {
  const [index, setIndex] = useState(0)
  const total = items.length

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  return (
    <div className="flex flex-col items-center w-full md:w-1/3 px-4">
      {/* Category Box */}
      <div className="border rounded-lg px-6 py-4 mb-6 text-center text-lg font-semibold tracking-wide">
        {title}
      </div>

      {/* Arrows */}
      <div className="flex items-center justify-center mb-6">
        <button onClick={prev} className="w-6 h-1mx-2 rotate-180" />
        <button onClick={next} className="w-6 h-1  mx-2" />
      </div>

      {/* Dots */}
      <div className="flex gap-2 mb-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-black" : "bg-grey-400"}`}
          />
        ))}
      </div>

      {/* Animated Card */}
      <div className="w-full h-40 relative overflow-hidden ">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full  border rounded-lg p-4text-sm"
          >
            <p className="italic mb-2">“{items[index].quote}”</p>
            <p className="text-xs font-medium ">{items[index].name}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function TestimonialMatrix() {
  return (
    <section className="w-full min-h-screen bg-amber-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold  text-center mb-16">
          Real Impact Across Roles
        </h2>

        {/* Category Carousels */}
        <div className="flex flex-col md:flex-row bg-amber-50 justify-between gap-12">
          <CategoryCarousel title="Candidates" items={testimonialData.candidates} />
          <CategoryCarousel title="Recruiters" items={testimonialData.recruiters} />
          <CategoryCarousel title="Mentors" items={testimonialData.mentors} />
        </div>
      </div>
    </section>
  )
}
