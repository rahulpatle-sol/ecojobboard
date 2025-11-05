import { motion } from 'framer-motion';

export default function Learning() {
  const resources = [
    { title: 'DSA Mastery', category: 'Tech', link: 'https://roadmap.sh/dsa' },
    { title: 'Generative AI Fundamentals', category: 'Tech', link: 'https://learn.deeplearning.ai/genai-fundamentals' },
    { title: 'MERN Stack Development', category: 'Tech', link: 'https://www.mongodb.com/mern-stack' },
    { title: 'UI/UX Design Essentials', category: 'Tech', link: 'https://www.coursera.org/learn/ui-ux-design' },
    { title: 'Digital Marketing Basics', category: 'Non-Tech', link: 'https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing' },
    { title: 'Product Management', category: 'Non-Tech', link: 'https://www.reforge.com/product-management' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const techResources = resources.filter((r) => r.category === 'Tech');
  const nonTechResources = resources.filter((r) => r.category === 'Non-Tech');

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold mb-4 text-slate-800"
      >
        Learning Resources
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-sm text-slate-600 mb-6"
      >
        Explore curated resources across tech and non-tech domains.
      </motion.p>

      <div className="space-y-8">
        {/* Tech Section */}
        <section>
          <h3 className="text-xl font-semibold text-amber-700 mb-2">Tech Resources</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techResources.map((res, i) => (
              <motion.li
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg border border-amber-200 transition"
              >
                <h4 className="text-lg font-semibold text-amber-700">{res.title}</h4>
                <p className="text-sm text-gray-600 mb-2">Category: {res.category}</p>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-600 hover:underline"
                >
                  View Resource →
                </a>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Non-Tech Section */}
        <section>
          <h3 className="text-xl font-semibold text-amber-700 mb-2">Non-Tech Resources</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nonTechResources.map((res, i) => (
              <motion.li
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg border border-amber-200 transition"
              >
                <h4 className="text-lg font-semibold text-amber-700">{res.title}</h4>
                <p className="text-sm text-gray-600 mb-2">Category: {res.category}</p>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-amber-600 hover:underline"
                >
                  View Resource →
                </a>
              </motion.li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
