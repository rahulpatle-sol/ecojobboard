import { motion } from "framer-motion"
import {
  FaSearch,
  FaClipboardList,
  FaComments,
  FaBrain,
  FaBullseye,
  FaRocket,
} from "react-icons/fa"

const recruitmentStages = [
  { name: "SOURCE", icon: <FaSearch />, color: "from-cyan-300 to-cyan-500" },
  { name: "SCREEN", icon: <FaClipboardList />, color: "from-green-300 to-green-500" },
  { name: "INTERVIEW", icon: <FaComments />, color: "from-yellow-300 to-yellow-500" },
  { name: "ASSESS", icon: <FaBrain />, color: "from-orange-300 to-orange-500" },
  { name: "OFFER", icon: <FaBullseye />, color: "from-red-300 to-red-500" },
  { name: "ONBOARD", icon: <FaRocket />, color: "from-purple-300 to-purple-500" },
]

const IconBlock = ({ icon, name, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.1, rotate: 2 }}
    className="flex flex-col items-center gap-4"
  >
    <div
      className={`w-24 h-24 bg-gradient-to-br ${color} rounded-full flex items-center justify-center text-4xl text-white shadow-lg`}
    >
      {icon}
    </div>
    <p className="text-base font-semibold text-gray-800 tracking-wide">{name}</p>
  </motion.div>
)

export default function RecruitmentLifecycle() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-yellow-50 via-amber-100 to-beige-200 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Recruitment Lifecycle</h1>
          <p className="text-gray-600 mt-2">Turning candidates into job-ready talent</p>
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 justify-center">
          {recruitmentStages.map((stage, index) => (
            <IconBlock key={index} icon={stage.icon} name={stage.name} color={stage.color} />
          ))}
        </div>
      </div>
    </section>
  )
}
