
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const skills = [
  "PyTorch", "TensorFlow", "Computer Vision", "NLP", 
  "Deep Learning", "Machine Learning", "Data Analysis",
  "Neural Networks", "Pandas", "SQL", "scikit-learn",
  "Data Visualization", "Statistical Modeling", "Python"
];

const SkillsWordCloud = () => {
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  
  useEffect(() => {
    // Initially show a subset of skills
    setVisibleSkills(skills.slice(0, 8));
    
    // Rotate through skills
    const interval = setInterval(() => {
      setVisibleSkills(prevSkills => {
        const newSkills = [...prevSkills];
        // Remove first skill
        newSkills.shift();
        // Add a new skill from the pool that isn't currently visible
        const availableSkills = skills.filter(skill => !newSkills.includes(skill));
        if (availableSkills.length > 0) {
          newSkills.push(availableSkills[Math.floor(Math.random() * availableSkills.length)]);
        } else {
          newSkills.push(skills[Math.floor(Math.random() * skills.length)]);
        }
        return newSkills;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 md:gap-3 my-4 max-w-xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {visibleSkills.map((skill, index) => (
        <motion.span
          key={`${skill}-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 100
          }}
          className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-light/20 text-purple font-medium text-sm"
        >
          {skill}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SkillsWordCloud;
