import { motion } from "framer-motion";

const FAQSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">FAQ</h2>
        <div className="grid gap-8">
          {/* Placeholder for FAQ items */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Question 1</h3>
            <p>Answer to question 1 goes here.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Question 2</h3>
            <p>Answer to question 2 goes here.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Question 3</h3>
            <p>Answer to question 3 goes here.</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection; 