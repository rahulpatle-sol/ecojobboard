import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-white text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect</h2>
          <p className="text-lg text-gray-600 mb-6">
            Contact us<br />
            <span className="text-indigo-600 font-medium">
              We're here to help you navigate your recruitment journey with precision and care.
            </span>
          </p>

          <div className="space-y-4 text-gray-700">
            <p><strong>Email:</strong> <a href="mailto:isispoet@isipoetalform.com" className="text-indigo-600 hover:underline">isispoet@isipoetalform.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+14155306121" className="text-indigo-600 hover:underline">+1 (415) 530-6121</a></p>
            <p><strong>Office:</strong> 727 Tech Lane, San Francisco, California 94105</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src="https://source.unsplash.com/featured/?sanfrancisco,map"
            alt="Map of San Francisco"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
