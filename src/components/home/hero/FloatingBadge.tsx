
import { motion } from 'framer-motion';

interface FloatingBadgeProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  label: string;
  delay: number;
}

const FloatingBadge = ({ top, left, right, bottom, label, delay }: FloatingBadgeProps) => {
  return (
    <motion.div
      className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs font-semibold text-purple shadow-lg"
      style={{ top, left, right, bottom }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay, 
        duration: 0.5,
        type: "spring"
      }}
    >
      {label}
    </motion.div>
  );
};

export default FloatingBadge;
