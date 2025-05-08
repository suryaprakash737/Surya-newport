
import { motion } from 'framer-motion';

type TypewriterEffectProps = {
  phrases: string[];
};

const TypewriterEffect = ({ phrases }: TypewriterEffectProps) => {
  return (
    <div className="flex items-center h-10 overflow-hidden">
      <div className="text-xl md:text-2xl font-medium text-purple relative">
        {phrases.map((phrase, index) => (
          <motion.span
            key={index}
            className="absolute left-0 whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, -20]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: (phrases.length - 1) * 2,
              delay: index * 2,
              times: [0, 0.1, 0.9, 1],
            }}
          >
            {phrase}
          </motion.span>
        ))}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="inline-block ml-1 w-0.5 h-6 bg-purple"
        />
      </div>
    </div>
  );
};

export default TypewriterEffect;
