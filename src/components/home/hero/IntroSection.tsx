
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import TypewriterEffect from './TypewriterEffect';
import SocialButton from './SocialButton';
import StatisticsSection from '../StatisticsSection';

const IntroSection = () => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="flex-1 text-center md:text-left p-8 rounded-xl bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-xl">
      <motion.div variants={item}>
        <div className="flex items-center mb-4 justify-center md:justify-start">
          <img 
            src="/lovable-uploads/6d318d2b-b7d0-44f3-8f54-134e44132f0a.png" 
            alt="Waving hand" 
            className="w-10 h-10 mr-2 animate-pulse-slow"
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Building My
          </h1>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Path in <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-light via-purple to-purple-dark">Data Science & ML</span>
        </h1>
      </motion.div>
      
      <motion.div variants={item} className="mb-6">
        <div className="text-xl md:text-2xl font-medium mb-4">
          I'm <span className="text-purple font-semibold">Suryaprakash Uppalapati</span>
        </div>
        <div className="h-12 flex items-center justify-center md:justify-start">
          <TypewriterEffect 
            phrases={[
              'Python Developer',
              'ML Enthusiast',
              'AI Researcher',
              'CS Graduate with focus on AI'
            ]} 
          />
        </div>
      </motion.div>
      
      <motion.div 
        variants={item} 
        className="mb-8 mt-10 flex flex-wrap justify-center md:justify-start gap-3"
      >
        <TooltipProvider>
          {[
            { name: 'scikit-learn', desc: 'Feature engineering, ML modeling & evaluation' },
            { name: 'TensorFlow', desc: 'Deep learning models & neural networks' },
            { name: 'PyTorch', desc: 'Research projects & computer vision' },
            { name: 'Pandas', desc: 'Data manipulation & cleaning' },
            { name: 'NumPy', desc: 'Numerical computing & matrix operations' },
            { name: 'Deep Learning', desc: 'Neural networks & AI research focus' }
          ].map((skill) => (
            <Tooltip key={skill.name}>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="px-3 py-1.5 bg-white/5 border border-purple/20 rounded-full text-sm font-medium text-purple shadow-sm hover:bg-purple/10 transition-colors cursor-default">
                  {skill.name}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-900/90 backdrop-blur-sm text-white border-purple/20">
                <p>{skill.desc}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </motion.div>
      
      <motion.p 
        variants={item}
        className="text-lg text-muted-foreground mb-8 max-w-xl"
      >
        Based in Washington DC, I'm passionate about leveraging AI and machine learning 
        to solve real-world problems and extract meaningful insights from complex data.
      </motion.p>
      
      <motion.div variants={item} className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Button 
          size="lg" 
          className="bg-purple hover:bg-purple-dark text-white group transition-all duration-300 shadow-lg shadow-purple/20"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-purple text-purple hover:bg-purple/10"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Let's Connect
        </Button>
      </motion.div>
      
      <motion.div
        variants={item}
        className="flex items-center justify-center md:justify-start gap-4 mt-6"
      >
        <SocialButton icon={Github} href="https://github.com/surya-ai" label="GitHub" />
        <SocialButton icon={Linkedin} href="https://linkedin.com/in/suryaprakash-uppalapati" label="LinkedIn" />
        <SocialButton icon={Mail} href="mailto:surya@example.com" label="Email" />
        <SocialButton icon={Download} href="/documents/resume.pdf" label="Resume" />
      </motion.div>
      
      <StatisticsSection />
    </div>
  );
};

export default IntroSection;
