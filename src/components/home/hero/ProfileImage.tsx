import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import FloatingBadge from './FloatingBadge';

const ProfileImage = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);

  return (
    <>
      <motion.div 
        className="flex-1 flex justify-center md:justify-end"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
      >
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-light opacity-80 blur-md animate-pulse-slow"></div>
          <motion.div 
            className="relative overflow-hidden rounded-full border-4 border-white dark:border-slate-900 shadow-2xl h-64 w-64 md:h-80 md:w-80 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFullScreen(true)}
          >
            <img 
              src="/lovable-uploads/737313a5-8ccf-40d0-9f94-b4e518088a27.png" 
              alt="Suryaprakash Uppalapati - CS Graduate & ML Enthusiast" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Floating tech badges around profile */}
          <FloatingBadge top="-10%" left="20%" label="ML" delay={0} />
          <FloatingBadge top="10%" right="-10%" label="AI" delay={0.2} />
          <FloatingBadge bottom="10%" right="-5%" label="Data" delay={0.4} />
          <FloatingBadge bottom="-10%" left="30%" label="Python" delay={0.6} />
        </div>
      </motion.div>

      {/* Full Screen Modal */}
      {showFullScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setShowFullScreen(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="relative w-screen h-screen flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFullScreen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            {/* Container for the large profile picture with enhanced glow */}
            <div className="relative max-w-[90vh] max-h-[90vh]">
              {/* Background glow layers */}
              <div className="absolute inset-0 rounded-full scale-110">
                <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-[100px] animate-[pulse_3s_ease-in-out_infinite]"/>
                <div className="absolute inset-0 bg-purple-500/15 rounded-full blur-[150px] animate-[pulse_4s_ease-in-out_infinite]"/>
                <div className="absolute inset-0 bg-purple-400/10 rounded-full blur-[200px] animate-[pulse_5s_ease-in-out_infinite]"/>
              </div>
              
              {/* Profile Picture */}
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 80 }}
                className="relative z-10 rounded-full overflow-hidden border-4 border-purple-400/50 shadow-2xl"
              >
                <img 
                  src="/lovable-uploads/737313a5-8ccf-40d0-9f94-b4e518088a27.png" 
                  alt="Suryaprakash Uppalapati - CS Graduate & ML Enthusiast"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ProfileImage;
