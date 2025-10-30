import { motion } from "framer-motion"

const testimonialData = {
  candidates: [
    {
      quote: "I got hired within 2 weeks. The platform is a game changer.",
      name: "Ayesha Khan",
      location: "Mumbai, India",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote: "The job matching was so accurate, I didn’t even need to apply twice.",
      name: "Ravi Mehta",
      location: "Delhi, India",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote: "Cinematic onboarding made me feel valued instantly.",
      name: "Sneha Roy",
      location: "Bangalore, India",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ],
  recruiters: [
    {
      quote: "We sourced top talent in half the time. Brilliant system.",
      name: "Neha Sharma",
      location: "Pune, India",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      quote: "Candidate profiles were instantly usable.",
      name: "James Lee",
      location: "San Francisco, USA",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      quote: "Role-based routing saved us hours.",
      name: "Priya Desai",
      location: "Hyderabad, India",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
    },
  ],
  mentors: [
    {
      quote: "Mentoring here feels impactful. The flow is frictionless.",
      name: "Anita Verma",
      location: "Chennai, India",
      image: "https://randomuser.me/api/portraits/women/18.jpg",
    },
    {
      quote: "Loved guiding candidates through real-world challenges.",
      name: "Karan Patel",
      location: "Ahmedabad, India",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
      quote: "Finally a platform where mentorship scales.",
      name: "Arjun Rao",
      location: "Goa, India",
      image: "https://randomuser.me/api/portraits/men/29.jpg",
    },
  ],
}

const CategoryScroller = ({ title, items }) => (
  <div className="w-full md:w-1/3 px-4">
    {/* Category Title */}
    <div className="text-center text-base font-semibold tracking-wide mb-4 border rounded-lg py-2 bg-white shadow-md">
      {title}
    </div>

    {/* Scrollable Container */}
    <div className="relative overflow-hidden">
      <motion.div
        className="flex flex-nowrap gap-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        style={{ width: `${items.length * 240 * 2}px` }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="w-[220px] bg-white border border-amber-200 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex-shrink-0 p-4 flex flex-col items-center text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-full mb-3 object-cover shadow-md"
            />
            <p className="italic text-gray-700 text-sm mb-2 leading-snug">“{item.quote}”</p>
            <p className="font-semibold text-amber-700 text-sm">{item.name}</p>
            <p className="text-xs text-gray-500">{item.location}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
)



export default function TestimonialMatrix() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Real Impact Across Roles
        </h2>

        <div className="flex flex-col md:flex-row justify-between gap-12">
          <CategoryScroller title="Telents" items={testimonialData.candidates} />
         
          <CategoryScroller title="Mentors" items={testimonialData.mentors} />
           <CategoryScroller title="Recruiters" items={testimonialData.recruiters} />
        </div>
      </div>
    </section>
  )
}
