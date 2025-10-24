import React from 'react';

const testimonials = [
  {
    quote: "This platform changed everything for my startup hiring process.",
    name: "Michael Chen",
    title: "CEO, TechNova Solutions",
  },
  {
    quote: "Incredible candidate matching that saved us weeks of recruitment time.",
    name: "Sarah Rodriguez",
    title: "HR Director, Quantum Innovations",
  },
  {
    quote: "The most intuitive hiring platform I've ever used.",
    name: "David Kim",
    title: "Founder, CreativeEdge Studios",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-white text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What our users say</h2>
        <p className="text-lg text-gray-600">
          Real stories from professionals who transformed their careers.
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
            {/* Stars */}
            <div className="flex justify-center mb-4 text-yellow-500">
              {Array(5).fill().map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                </svg>
              ))}
            </div>
            {/* Quote */}
            <p className="text-gray-700 italic mb-4">“{item.quote}”</p>
            {/* Name */}
            <p className="font-semibold text-indigo-600">{item.name}</p>
            <p className="text-sm text-gray-500">{item.title}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
    
    </section>
  );
};

export default TestimonialSection;
