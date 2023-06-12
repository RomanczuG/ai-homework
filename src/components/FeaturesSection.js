import { HiOutlineLightBulb, HiOutlineUpload, HiOutlineDocumentText, HiOutlineCheckCircle } from 'react-icons/hi';
import { motion } from 'framer-motion';

export const FeaturesSection = () => {
  return (
    <motion.section
      id="features"
      className="mx-auto px-6 md:px-20 mt-8 text-black bg-[#F0FFE0]"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <FeatureCard
          icon={<HiOutlineLightBulb className="text-6xl mb-4 text-[#FF6E00]" />}
          title="AI-Powered Study Strategies"
          description="Enhance your learning experience with our AI-generated study strategies tailored to your specific needs. Make the most of your study sessions by focusing on the most important concepts and techniques."
        />
        {/* Feature 2 */}
        <FeatureCard
          icon={<HiOutlineUpload className="text-6xl mb-4 text-[#FF6E00]" />}
          title="Easy Homework and Test Upload"
          description="Upload your homework or test PDF with a simple drag-and-drop or file selection. StudyBoost's user-friendly interface makes it easy to start the AI-driven note generation process."
        />
        {/* Feature 3 */}
        <FeatureCard
          icon={<HiOutlineDocumentText className="text-6xl mb-4 text-[#FF6E00]" />}
          title="Comprehensive Study Notes"
          description="Get access to detailed, AI-generated study notes that cover all the essential information you need to excel. Say goodbye to manual note-taking and focus on understanding key concepts and solving problems."
        />
        {/* Feature 4 */}
        <FeatureCard
          icon={<HiOutlineCheckCircle className="text-6xl mb-4 text-[#FF6E00]" />}
          title="Improved Test-Taking Skills"
          description="Learn effective test-taking strategies and boost your confidence during exams. StudyBoost provides valuable tips and resources to help you manage time, handle difficult questions, and prepare for various test formats."
        />
      </div>
    </motion.section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center text-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.1 }}
  >
    {icon}
    <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
    <p className="mt-4">{description}</p>
  </motion.div>
);
