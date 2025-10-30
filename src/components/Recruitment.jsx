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

const IconBlock = ({ icon, name, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center gap-3 relative"
  >
    <div
      className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${color} rounded-full flex items-center justify-center text-3xl sm:text-4xl text-white shadow-lg`}
    >
      {icon}
    </div>
    <p className="text-sm font-semibold text-gray-800 tracking-wide">{name}</p>
  </motion.div>
)

const LineConnector = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 0.4, delay }}
    className="h-1 w-10 sm:w-16 bg-gray-400 mx-4 sm:mx-6 origin-left"
  />
)

export default function RecruitmentLifecycle() {
  const firstRow = recruitmentStages.slice(0, 3)
  const secondRow = recruitmentStages.slice(3)

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-yellow-50 via-amber-100 to-beige-200 px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            How SDLC Converts into Recruitment Lifecycle
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-4">
            Same flow. New purpose. From code to candidates.
          </p>
        </div>

        {/* First Row */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-0 mb-12">
          {firstRow.map((stage, index) => (
            <div key={index} className="flex items-center">
              <IconBlock
                icon={stage.icon}
                name={stage.name}
                color={stage.color}
                delay={index * 0.3}
              />
              {index < firstRow.length - 1 && (
                <LineConnector delay={index * 0.3 + 0.2} />
              )}
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-0">
          {secondRow.map((stage, index) => (
            <div key={index} className="flex items-center">
              <IconBlock
                icon={stage.icon}
                name={stage.name}
                color={stage.color}
                delay={(index + 3) * 0.3}
              />
              {index < secondRow.length - 1 && (
                <LineConnector delay={(index + 3) * 0.3 + 0.2} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
