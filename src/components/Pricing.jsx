import React from 'react';

const plans = [
  {
    name: "Basic",
    price: "$19",
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
    price: "$29",
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
    price: "$49",
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
];

const PricingSection = () => {
  return (
    <section className="bg-white text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Plans</h2>
        <p className="text-lg text-gray-600">
          Flexible pricing<br />
          <span className="text-indigo-600 font-medium">
            Choose the perfect plan for your recruitment needs
          </span>
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-semibold text-indigo-600 mb-1">{plan.price}</p>
              <p className="text-sm text-gray-500 mb-4">{plan.billing}</p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
