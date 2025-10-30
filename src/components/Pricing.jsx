import React from 'react'
import { motion } from 'framer-motion'

const plans = [
  {
    name: "Basic",
    price: "₹1,599",
    billing: "billed annually",
    features: [
      "Job posting access",
      "Basic candidate screening",
      "Limited profile views",
    ],
    button: "Start basic",
  },
  {
    name: "Business",
    price: "₹2,499",
    billing: "billed annually",
    features: [
      "Advanced job matching",
      "Comprehensive candidate insights",
      "Unlimited profile access",
      "Interview scheduling tools",
    ],
    button: "Go pro",
  },
  {
    name: "Enterprise",
    price: "₹4,199",
    billing: "billed annually",
    features: [
      "Full platform access",
      "Custom integration support",
      "Dedicated account manager",
      "Advanced analytics",
      "Priority support",
    ],
    button: "Contact us",
  },
]

const PricingSection = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200 text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Plans</h2>
        <p className="text-lg text-gray-700">
          Flexible pricing<br />
          <span className="text-amber-700 font-medium">
            Choose the perfect plan for your recruitment needs
          </span>
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white border border-amber-200 p-6 rounded-xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">{plan.name}</h3>
              <p className="text-3xl font-semibold text-amber-600 mb-1">{plan.price}</p>
              <p className="text-sm text-gray-500 mb-4">{plan.billing}</p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition">
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default PricingSection
