import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun, Terminal, ArrowRight, X } from 'lucide-react';
import TypewriterComponent from 'typewriter-effect';
import { useState } from 'react';

const HeroSection = () => {
  const { theme, setTheme } = useTheme();
  const [showFullScreen, setShowFullScreen] = useState(false);

  const terminalLines = [
    "Loading AI modules...",
    "Initializing ML pipelines...",
    "import tensorflow as tf",
    "import torch",
    "from transformers import AutoModelForCausalLM",
    "model = AutoModelForCausalLM.from_pretrained('gpt3')",
    "AI systems ready!"
  ];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Simple Gradient Background */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Building My Path in{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                  Data Science & ML
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                I'm{' '}
                <span className="text-purple-500">
                  Suryaprakash Uppalapati
                </span>
              </h2>

              <p className="text-xl text-muted-foreground mb-8">
                Based in Washington DC, I'm passionate about leveraging AI and
                machine learning to solve real-world problems and extract
                meaningful insights from complex data.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Projects <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Let's Connect
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col items-center gap-8">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative cursor-pointer"
              onClick={() => setShowFullScreen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative rounded-full overflow-hidden w-64 h-64 border-4 border-background">
                <img
                  src="/profile.jpeg"
                  alt="Suryaprakash Uppalapati"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* AI Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md bg-black/90 rounded-lg overflow-hidden shadow-xl border border-purple-500/20"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50">
                <Terminal className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-purple-400">AI Terminal</span>
              </div>
              <div className="p-4 font-mono text-sm text-green-500">
                <TypewriterComponent
                  options={{
                    strings: terminalLines,
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Theme Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="fixed top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur border border-border hover:bg-accent"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </motion.button>
      </div>

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
            <div className="relative w-[90vh] h-[90vh]">
              {/* Background glow layers */}
              <div className="absolute inset-0 rounded-full scale-110">
                <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-[100px] animate-[pulse_3s_ease-in-out_infinite]"/>
                <div className="absolute inset-0 bg-purple-500/15 rounded-full blur-[150px] animate-[pulse_4s_ease-in-out_infinite]"/>
                <div className="absolute inset-0 bg-purple-400/10 rounded-full blur-[200px] animate-[pulse_5s_ease-in-out_infinite]"/>
              </div>
              
              {/* Profile Picture */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-purple-400/50 shadow-2xl"
              >
                <img 
                  src="/profile.jpeg" 
                  alt="Suryaprakash Uppalapati"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
