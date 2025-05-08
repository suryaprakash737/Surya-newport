
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const ScrollPrompt = () => {
  return (
    <motion.div 
      className="flex justify-center mt-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full animate-bounce"
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6 text-purple" />
      </Button>
    </motion.div>
  );
};

export default ScrollPrompt;
