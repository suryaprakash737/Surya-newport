
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, BarChart4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent 
} from "@/components/ui/hover-card";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  results: string;
  businessImpact?: string;
  architecture?: string;
  chartData?: {
    label: string;
    before: number;
    after: number;
  }[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Domain-Specific LLM Fine-Tuning",
    description: "Enhanced Meta's Llama 2 model using PEFT techniques for domain-specific knowledge and improved responses.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2426&q=80",
    tags: ["PyTorch", "NLP", "PEFT", "Hugging Face"],
    githubUrl: "https://github.com/suryaprakash737/DomainSpecificLanguageModel",
    results: "30% accuracy gain, ROUGE-L score 0.85",
    businessImpact: "Reduced customer support response time by 45%, saving an estimated $120K annually",
    architecture: "LoRA fine-tuning on Llama 2 7B with custom dataset of domain-specific QA pairs",
    chartData: [
      { label: "Accuracy", before: 55, after: 85 },
      { label: "Response Time", before: 80, after: 35 },
      { label: "User Satisfaction", before: 40, after: 85 }
    ]
  },
  {
    id: 2,
    title: "Handwritten Digit Classification",
    description: "Implemented KNN and PCA algorithms from scratch for efficient image classification without relying on pre-built libraries.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    tags: ["Python", "NumPy", "KNN", "PCA"],
    githubUrl: "https://github.com/suryaprakash737/Handwritten_Digit_Classification",
    results: "96.8% accuracy, 8x faster processing",
    businessImpact: "Potential $250K cost savings in document processing automation",
    architecture: "Custom KNN algorithm with dimensionality reduction via PCA implementation",
    chartData: [
      { label: "Processing Speed", before: 12, after: 96 },
      { label: "Accuracy", before: 78, after: 97 },
      { label: "Memory Usage", before: 85, after: 40 }
    ]
  },
  {
    id: 3,
    title: "Dynamic Object Detection System",
    description: "Built real-time object detection system using YOLOv5 architecture optimized for performance and accuracy.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    tags: ["Python", "Computer Vision", "YOLOv5", "TensorFlow"],
    githubUrl: "https://github.com/suryaprakash737/ObjectDetectionUsingYOLO",
    results: "40% accuracy improvement, 30 FPS performance",
    businessImpact: "Reduced inventory errors by 35%, leading to $500K annual savings",
    architecture: "YOLOv5 optimized with transfer learning on custom dataset with 2,000+ labeled images",
    chartData: [
      { label: "Detection Accuracy", before: 55, after: 95 },
      { label: "Processing Speed", before: 10, after: 30 },
      { label: "False Positives", before: 65, after: 15 }
    ]
  }
];

const ProjectsSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'impact' | 'architecture'>('overview');
  
  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my key machine learning and data science projects,
            showcasing technical skills and problem-solving capabilities.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={cn(
                "h-full rounded-xl overflow-hidden border border-border bg-white dark:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md",
                hoveredId === project.id && "shadow-md"
              )}>
                <div className="relative h-48 overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10"
                    animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  >
                    <Button
                      size="sm" 
                      variant="secondary" 
                      className="bg-white/90 hover:bg-white"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github size={16} className="mr-1" /> GitHub
                    </Button>
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="bg-purple/90 hover:bg-purple"
                        onClick={() => window.open(project.demoUrl, '_blank')}
                      >
                        <ArrowUpRight size={16} className="mr-1" /> Demo
                      </Button>
                    )}
                  </motion.div>
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    animate={{ 
                      scale: hoveredId === project.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Project Tabs */}
                  <div className="flex mb-4 border-b border-border">
                    <button 
                      className={cn(
                        "pb-2 px-3 text-sm font-medium",
                        activeTab === 'overview' 
                          ? "border-b-2 border-purple text-purple" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button 
                      className={cn(
                        "pb-2 px-3 text-sm font-medium",
                        activeTab === 'impact' 
                          ? "border-b-2 border-purple text-purple" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setActiveTab('impact')}
                    >
                      Impact
                    </button>
                    <button 
                      className={cn(
                        "pb-2 px-3 text-sm font-medium",
                        activeTab === 'architecture' 
                          ? "border-b-2 border-purple text-purple" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setActiveTab('architecture')}
                    >
                      Tech
                    </button>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="h-[8rem]">
                    {activeTab === 'overview' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-muted-foreground mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-secondary/70">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {activeTab === 'impact' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-sm mb-4">
                          <div className="font-semibold text-foreground mb-1">Business Impact:</div>
                          <div className="text-muted-foreground">{project.businessImpact}</div>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="flex items-center text-purple text-sm cursor-pointer">
                              <BarChart4 size={16} className="mr-1" />
                              <span>View Performance Metrics</span>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="space-y-2">
                              {project.chartData?.map((item, i) => (
                                <div key={i} className="space-y-1">
                                  <div className="flex justify-between text-xs font-medium">
                                    <span>{item.label}</span>
                                    <span>Before vs After</span>
                                  </div>
                                  <div className="flex h-2 gap-1 items-center w-full">
                                    <div 
                                      className="bg-slate-400 h-full rounded-full"
                                      style={{ width: `${item.before}%` }}
                                    ></div>
                                    <span className="text-xs">{item.before}%</span>
                                  </div>
                                  <div className="flex h-2 gap-1 items-center w-full">
                                    <div 
                                      className="bg-purple h-full rounded-full"
                                      style={{ width: `${item.after}%` }}
                                    ></div>
                                    <span className="text-xs">{item.after}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </motion.div>
                    )}
                    
                    {activeTab === 'architecture' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        <div className="text-sm">
                          <div className="font-semibold text-foreground mb-1">Architecture:</div>
                          <div className="text-muted-foreground">{project.architecture}</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold text-foreground mb-1">Results:</div>
                          <div className="text-purple font-medium">{project.results}</div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-purple text-purple hover:bg-purple/10"
            onClick={() => window.open('https://github.com/suryaprakash737', '_blank')}
          >
            View All Projects <Github className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
