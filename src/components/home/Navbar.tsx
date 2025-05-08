import { motion } from 'framer-motion';
import { Moon, Sun, X } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const activeSection = useActiveSection();
  const [showLogoModal, setShowLogoModal] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Usecases', href: '#use-cases' },
    { name: 'ML Models', href: '#ml-models' },
    { name: 'Contact', href: '#contact' }
  ];

  const NeuralNetworkLogo = ({ className = "w-10 h-10" }) => (
    <svg 
      className={`${className} animate-[pulse_3s_ease-in-out_infinite]`}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#a29bfe" stopOpacity="1"/>
          <stop offset="100%" stopColor="#6c5ce7" stopOpacity="1"/>
          <animate 
            attributeName="stopColor" 
            values="#a29bfe;#8c7ae6;#a29bfe" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        </radialGradient>

        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00cec9" stopOpacity="0.6"/>
          <stop offset="50%" stopColor="#81ecec" stopOpacity="1"/>
          <stop offset="100%" stopColor="#00cec9" stopOpacity="0.6"/>
        </linearGradient>

        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fd79a8"/>
          <stop offset="50%" stopColor="#e84393"/>
          <stop offset="100%" stopColor="#fd79a8"/>
          <animate attributeName="x1" values="0%;25%;0%" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="100%;75%;100%" dur="5s" repeatCount="indefinite"/>
        </linearGradient>

        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0" result="blur"/>
          <feFlood floodColor="#a29bfe" floodOpacity="0"/>
          <feComposite in2="blur" operator="in"/>
          <feMerge>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="borderGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" result="blur"/>
          <feFlood floodColor="#a29bfe" floodOpacity="0.8">
            <animate 
              attributeName="flood-opacity" 
              values="0.4;0.8;0.4" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </feFlood>
          <feComposite in2="blur" operator="in" result="glowResult"/>
          <feMerge>
            <feMergeNode in="glowResult"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="mainGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="25" result="blur"/>
          <feFlood floodColor="#a29bfe" floodOpacity="0.7">
            <animate 
              attributeName="flood-opacity" 
              values="0.3;0.7;0.3" 
              dur="3s" 
              repeatCount="indefinite"
            />
          </feFlood>
          <feComposite in2="blur" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" result="blur"/>
          <feFlood floodColor="#6c5ce7" floodOpacity="0.7" result="color">
            <animate 
              attributeName="flood-opacity" 
              values="0.3;0.9;0.3" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </feFlood>
          <feComposite in="color" in2="blur" operator="in" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Pulsing animation */}
        <animate 
          id="logoGlow"
          attributeName="flood-opacity"
          values="0.3;0.6;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </defs>

      {/* Base background with animated gradient */}
      <rect x="0" y="0" width="400" height="400" fill="#020817">
        <animate 
          attributeName="opacity" 
          values="0.95;1;0.95" 
          dur="2s" 
          repeatCount="indefinite"
        />
      </rect>

      {/* Main container with enhanced glow */}
      <g filter="url(#mainGlow)">
        {/* Outer glowing container */}
        <g>
          <animate 
            attributeName="opacity"
            values="0.9;1;0.9"
            dur="3s"
            repeatCount="indefinite"
          />
          
          {/* Inner content container with enhanced glow */}
          <g filter="url(#outerGlow)">
            <animate 
              attributeName="filter"
              values="url(#outerGlow)"
              dur="2s"
              repeatCount="indefinite"
            />
            
            {/* Connections with glow */}
            <g filter="url(#glow)">
              <path id="connection1-4" d="M120,120 L200,160" stroke="url(#connectionGradient)" strokeWidth="4">
                <animate attributeName="strokeOpacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite"/>
              </path>
              <path id="connection1-5" d="M120,120 L200,240" stroke="url(#connectionGradient)" strokeWidth="4">
                <animate attributeName="strokeOpacity" values="0.3;0.9;0.3" dur="1.5s" begin="0.2s" repeatCount="indefinite"/>
              </path>
              <path id="connection2-4" d="M120,200 L200,160" stroke="url(#connectionGradient)" strokeWidth="4">
                <animate attributeName="strokeOpacity" values="0.3;0.9;0.3" dur="1.5s" begin="0.4s" repeatCount="indefinite"/>
              </path>
              <path id="connection2-5" d="M120,200 L200,240" stroke="url(#connectionGradient)" strokeWidth="4">
                <animate attributeName="strokeOpacity" values="0.3;0.9;0.3" dur="1.5s" begin="0.6s" repeatCount="indefinite"/>
              </path>
              <path id="connection3-4" d="M120,280 L200,160" stroke="url(#connectionGradient)" strokeWidth="4">
                <animate attributeName="strokeOpacity" values="0.3;0.9;0.3" dur="1.5s" begin="0.8s" repeatCount="indefinite"/>
              </path>
              <path id="connection3-5" d="M120,280 L200,240" stroke="url(#connectionGradient)" strokeWidth="4">
                <animate attributeName="strokeOpacity" values="0.3;0.9;0.3" dur="1.5s" begin="1s" repeatCount="indefinite"/>
              </path>
              <path id="connection4-6" d="M200,160 L280,200" stroke="url(#connectionGradient)" strokeWidth="4">
                <animate attributeName="strokeOpacity" values="0.3;0.9;0.3" dur="1.5s" begin="1.2s" repeatCount="indefinite"/>
              </path>
              <path id="connection5-6" d="M200,240 L280,200" stroke="url(#connectionGradient)" strokeWidth="4">
                <animate attributeName="strokeOpacity" values="0.3;0.9;0.3" dur="1.5s" begin="1.4s" repeatCount="indefinite"/>
              </path>
            </g>

            {/* Flowing Letters */}
            <g>
              <text fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#81ecec" textAnchor="middle" filter="url(#glow)">
                <animateMotion path="M120,120 L200,160" begin="0s" dur="1.5s" repeatCount="indefinite">
                  <mpath xlinkHref="#connection1-4"/>
                </animateMotion>
                S
              </text>
              <text fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#81ecec" textAnchor="middle" filter="url(#glow)">
                <animateMotion path="M120,120 L200,240" begin="0.5s" dur="1.7s" repeatCount="indefinite">
                  <mpath xlinkHref="#connection1-5"/>
                </animateMotion>
                U
              </text>
              <text fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#81ecec" textAnchor="middle" filter="url(#glow)">
                <animateMotion path="M120,200 L200,160" begin="1s" dur="1.5s" repeatCount="indefinite">
                  <mpath xlinkHref="#connection2-4"/>
                </animateMotion>
                R
              </text>
              <text fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#81ecec" textAnchor="middle" filter="url(#glow)">
                <animateMotion path="M120,200 L200,240" begin="1.5s" dur="1.5s" repeatCount="indefinite">
                  <mpath xlinkHref="#connection2-5"/>
                </animateMotion>
                Y
              </text>
              <text fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#81ecec" textAnchor="middle" filter="url(#glow)">
                <animateMotion path="M120,280 L200,160" begin="2s" dur="1.8s" repeatCount="indefinite">
                  <mpath xlinkHref="#connection3-4"/>
                </animateMotion>
                A
              </text>
              <text fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#ff7675" textAnchor="middle" filter="url(#glow)">
                <animateMotion path="M200,160 L280,200" begin="2.5s" dur="1.5s" repeatCount="indefinite">
                  <mpath xlinkHref="#connection4-6"/>
                </animateMotion>
                P
              </text>
            </g>

            {/* Nodes without glow */}
            <g>
              <circle cx="120" cy="120" r="22" fill="#6c5ce7">
                <animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite"/>
              </circle>
              <text x="120" y="120" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" dy="6">S</text>

              <circle cx="120" cy="200" r="22" fill="#6c5ce7">
                <animate attributeName="r" values="20;22;20" dur="2s" begin="0.3s" repeatCount="indefinite"/>
              </circle>
              <text x="120" y="200" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" dy="6">U</text>

              <circle cx="120" cy="280" r="22" fill="#6c5ce7">
                <animate attributeName="r" values="20;22;20" dur="2s" begin="0.6s" repeatCount="indefinite"/>
              </circle>
              <text x="120" y="280" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" dy="6">R</text>

              <circle cx="200" cy="160" r="22" fill="#6c5ce7">
                <animate attributeName="r" values="20;22;20" dur="2s" begin="0.9s" repeatCount="indefinite"/>
              </circle>
              <text x="200" y="160" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" dy="6">Y</text>

              <circle cx="200" cy="240" r="22" fill="#6c5ce7">
                <animate attributeName="r" values="20;22;20" dur="2s" begin="1.2s" repeatCount="indefinite"/>
              </circle>
              <text x="200" y="240" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" dy="6">A</text>

              <circle cx="280" cy="200" r="22" fill="#6c5ce7">
                <animate attributeName="r" values="20;22;20" dur="2s" begin="1.5s" repeatCount="indefinite"/>
              </circle>
              <text x="280" y="200" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" dy="6">P</text>
            </g>

            {/* Final Output Text */}
            <g>
              <path d="M295,200 L300,200" stroke="#fd79a8" strokeWidth="2" opacity="0.8" strokeDasharray="2,1">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
              </path>
              
              <text x="305" y="200" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="url(#textGradient)" textAnchor="start" filter="url(#textGlow)" opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;0;0;0;0" begin="1.5s" dur="5s" repeatCount="indefinite"/>
                <animate attributeName="fontWeight" values="normal;bold;normal" begin="1.8s" dur="2s" repeatCount="indefinite"/>
                SURYA
              </text>
              
              <text x="305" y="220" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="url(#textGradient)" textAnchor="start" filter="url(#textGlow)" opacity="0">
                <animate attributeName="opacity" values="0;0;0;0;0;0;1;1;0" begin="1.5s" dur="5s" repeatCount="indefinite"/>
                <animate attributeName="fontWeight" values="normal;bold;normal" begin="3.5s" dur="2s" repeatCount="indefinite"/>
                PRAKASH
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020817] border-b border-[#1e293b]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Name */}
            <motion.div 
              className="flex items-center text-white font-medium relative"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <motion.button
                onClick={() => setShowLogoModal(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer relative group bg-[#020817] rounded-full p-1 mr-0.5"
                initial={{ scale: 1.5, x: "50%" }}
                animate={{ scale: 1, x: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2
                }}
              >
                {/* Enhanced glow effect container */}
                <div className="absolute inset-0 rounded-full">
                  <div className="absolute inset-0 bg-purple-400/40 rounded-full blur-xl animate-[pulse_1.5s_ease-in-out_infinite]"/>
                  <div className="absolute inset-0 bg-purple-400/30 rounded-full blur-2xl animate-[pulse_2s_ease-in-out_infinite]"/>
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-3xl animate-[pulse_2.5s_ease-in-out_infinite]"/>
                  <div className="absolute inset-0 bg-purple-400/10 rounded-full blur-[40px] animate-[pulse_3s_ease-in-out_infinite]"/>
                </div>
                <div className="relative z-10">
                  <NeuralNetworkLogo className="w-10 h-10" />
                </div>
              </motion.button>

              {/* Animated text that emerges from logo */}
              <motion.div
                className="relative"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 1
                }}
              >
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent whitespace-nowrap overflow-hidden"
                  initial={{ 
                    x: "-100%",
                    opacity: 0,
                  }}
                  animate={{ 
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 1
                  }}
                >
                  SURYA PRAKASH
                </motion.span>

                {/* Glowing underline effect */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 1.8
                  }}
                >
                  <div className="absolute inset-0 blur-sm bg-gradient-to-r from-purple-400 to-pink-500 opacity-50" />
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#6c5ce7]",
                    activeSection === item.href.substring(1) ? "text-[#6c5ce7]" : "text-white"
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-white hover:text-[#6c5ce7] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Logo Modal */}
      {showLogoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setShowLogoModal(false)}
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
              onClick={() => setShowLogoModal(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            {/* Container for the large logo with enhanced glow */}
            <div className="relative max-w-[90vh] max-h-[90vh] aspect-square">
              {/* Background glow layers */}
              <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-0 bg-purple-400/30 rounded-full blur-[100px] animate-[pulse_3s_ease-in-out_infinite]"/>
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-[150px] animate-[pulse_4s_ease-in-out_infinite]"/>
                <div className="absolute inset-0 bg-purple-400/10 rounded-full blur-[200px] animate-[pulse_5s_ease-in-out_infinite]"/>
              </div>
              
              {/* Logo */}
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 80 }}
                className="relative z-10 w-full h-full"
              >
                <NeuralNetworkLogo className="w-full h-full" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar; 