
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { BarChart3, Brain, Clock, Database } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer
} from "recharts";

type StatisticItem = {
  value: number;
  label: string;
  suffix?: string;
  icon: React.ElementType;
  color: string;
  description: string;
  chartData?: { name: string; value: number }[];
};

const statistics: StatisticItem[] = [
  { 
    value: 3000, 
    label: "Hours of model training", 
    suffix: "+",
    icon: Clock,
    color: "from-purple-500 to-purple-light",
    description: "Dedicated hours spent training and fine-tuning machine learning models across various domains and applications.",
    chartData: [
      { name: 'Jan', value: 120 },
      { name: 'Feb', value: 180 },
      { name: 'Mar', value: 240 },
      { name: 'Apr', value: 280 },
      { name: 'May', value: 320 },
      { name: 'Jun', value: 400 },
      { name: 'Jul', value: 450 },
      { name: 'Aug', value: 500 },
      { name: 'Sep', value: 510 }
    ]
  },
  { 
    value: 15, 
    label: "ML projects completed", 
    suffix: "+",
    icon: Brain,
    color: "from-blue-500 to-purple-500",
    description: "Successfully delivered ML projects spanning computer vision, NLP, and predictive analytics with measurable business impact.",
    chartData: [
      { name: '2021', value: 4 },
      { name: '2022', value: 5 },
      { name: '2023', value: 6 },
      { name: '2024', value: 8 }
    ]
  },
  { 
    value: 92, 
    label: "Average model accuracy", 
    suffix: "%",
    icon: BarChart3,
    color: "from-purple-light to-purple",
    description: "Consistently achieving high accuracy across classification, regression, and computer vision models through rigorous optimization.",
    chartData: [
      { name: 'Classification', value: 94 },
      { name: 'Regression', value: 89 },
      { name: 'NLP', value: 91 },
      { name: 'CV', value: 93 },
      { name: 'Time Series', value: 90 }
    ]
  },
];

const StatisticsSection = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverEffects, setHoverEffects] = useState<boolean[]>(
    Array(statistics.length).fill(false)
  );

  useEffect(() => {
    // Set isVisible to true immediately for initial render
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('statistics-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const chartConfig = {
    default: {
      color: "#7E69AB",
    },
  };

  const handleStatHover = (index: number, isHovering: boolean) => {
    const newHoverEffects = [...hoverEffects];
    newHoverEffects[index] = isHovering;
    setHoverEffects(newHoverEffects);
    setIsHovered(isHovering ? index : null);
  };

  return (
    <motion.div
      id="statistics-section"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
    >
      {statistics.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.15,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 dark:bg-slate-800/50 shadow-lg hover:shadow-xl transition-all duration-300"
          onMouseEnter={() => handleStatHover(index, true)}
          onMouseLeave={() => handleStatHover(index, false)}
        >
          {/* Advanced ripple effect on hover */}
          <motion.div
            className="absolute inset-0 bg-purple/5 rounded-xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: hoverEffects[index] ? 1 : 0, 
              opacity: hoverEffects[index] ? 1 : 0 
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-xl border border-transparent p-[1px] overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple/30 via-transparent to-purple-light/30 animate-spin-slow" />
          </div>

          <div className={`h-1.5 w-full bg-gradient-to-r ${stat.color}`} />
          
          <div className="p-6 relative z-10">
            <motion.div 
              className="flex items-center gap-4 mb-4"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.2 }}
            >
              <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                <stat.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">
                {isVisible && (
                  <CountUp 
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix || ""}
                    useEasing={true}
                    enableScrollSpy={true}
                    scrollSpyDelay={100}
                    redraw={true}
                  />
                )}
              </h3>
            </motion.div>
            
            <div className="flex flex-col space-y-2">
              <p className="text-muted-foreground text-sm md:text-base font-medium">{stat.label}</p>
              
              <motion.p 
                className="text-xs text-muted-foreground mt-1 h-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {stat.description}
              </motion.p>
            </div>
            
            <motion.div 
              className="mt-4 h-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.5 }}
            >
              {stat.chartData && (
                <ChartContainer config={chartConfig} className="h-24">
                  {index === 0 ? (
                    <AreaChart data={stat.chartData}>
                      <defs>
                        <linearGradient id={`colorValue-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#7E69AB" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" hide={!hoverEffects[index]} />
                      <YAxis hide={true} />
                      <Tooltip content={<CustomTooltip />} />
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#7E69AB" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill={`url(#colorValue-${index})`} 
                      />
                    </AreaChart>
                  ) : index === 1 ? (
                    <LineChart data={stat.chartData}>
                      <XAxis dataKey="name" hide={!hoverEffects[index]} />
                      <YAxis hide={true} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#7E69AB" 
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 1, fill: '#7E69AB' }}
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  ) : (
                    <LineChart data={stat.chartData}>
                      <XAxis dataKey="name" hide={!hoverEffects[index]} />
                      <YAxis hide={true} domain={[85, 95]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#9b87f5" 
                        strokeWidth={2}
                        dot={{ r: 3, strokeWidth: 1, fill: '#9b87f5' }}
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  )}
                </ChartContainer>
              )}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-sm text-white border-purple/20 p-2.5 rounded-md shadow-md text-xs">
        <p className="font-medium text-purple-light mb-1">{`${label}`}</p>
        <p className="font-bold">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default StatisticsSection;
