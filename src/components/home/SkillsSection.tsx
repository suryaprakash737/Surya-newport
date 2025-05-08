import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Brain, Database, LineChart, Code, BarChart, Network, Layers } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import SkillsWordCloud from './SkillsWordCloud';

type SkillCategory = {
  name: string;
  icon: React.ElementType;
  color: string;
  skills: Skill[];
};

type Skill = {
  name: string;
  proficiency: number;
  description?: string;
  projects?: string[];
};

const skillCategories: SkillCategory[] = [
  {
    name: "Machine Learning",
    icon: Brain,
    color: "from-purple-500 to-purple-light",
    skills: [
      { 
        name: "Supervised Learning", 
        proficiency: 92, 
        description: "Classification, regression, decision trees, SVMs", 
        projects: ["Customer Churn Prediction", "Housing Price Forecasting"] 
      },
      { 
        name: "Unsupervised Learning", 
        proficiency: 85, 
        description: "Clustering, dimensionality reduction, anomaly detection", 
        projects: ["Customer Segmentation", "Anomaly Detection in Financial Transactions"] 
      },
      { 
        name: "Ensemble Methods", 
        proficiency: 88, 
        description: "Random forests, gradient boosting, stacking", 
        projects: ["XGBoost for Credit Scoring", "Random Forest for Medical Diagnosis"] 
      },
      { 
        name: "Model Evaluation", 
        proficiency: 90, 
        description: "Cross-validation, metrics selection, bias-variance tradeoff", 
        projects: ["ML Model Performance Benchmarking", "Hyperparameter Tuning Framework"] 
      },
    ]
  },
  {
    name: "Deep Learning",
    icon: Network,
    color: "from-blue-500 to-purple-500",
    skills: [
      { 
        name: "Neural Networks", 
        proficiency: 85, 
        description: "MLP, CNN, RNN, LSTM architectures", 
        projects: ["Image Classification System", "Time Series Forecasting"] 
      },
      { 
        name: "Computer Vision", 
        proficiency: 82, 
        description: "Object detection, segmentation, GANs", 
        projects: ["Object Detection in Satellite Imagery", "Medical Image Segmentation"] 
      },
      { 
        name: "Natural Language Processing", 
        proficiency: 80, 
        description: "Transformers, BERT, sentiment analysis", 
        projects: ["Sentiment Analysis Tool", "Question Answering System"] 
      },
      { 
        name: "Transfer Learning", 
        proficiency: 78, 
        description: "Fine-tuning pre-trained models", 
        projects: ["Fine-tuned BERT for Legal Document Classification", "Transfer Learning for Medical Imaging"] 
      },
    ]
  },
  {
    name: "Data Engineering",
    icon: Database,
    color: "from-purple-dark to-purple",
    skills: [
      { 
        name: "Data Pipelines", 
        proficiency: 75, 
        description: "ETL processes, data workflows", 
        projects: ["Automated Data Pipeline with Airflow", "Real-time Data Processing System"] 
      },
      { 
        name: "Big Data Technologies", 
        proficiency: 70, 
        description: "Hadoop, Spark, distributed computing", 
        projects: ["Spark-based Data Processing", "Distributed ML Training Platform"] 
      },
      { 
        name: "Database Systems", 
        proficiency: 78, 
        description: "SQL, NoSQL, data modeling", 
        projects: ["Database Optimization for Analytics", "Multi-model Database Implementation"] 
      },
      { 
        name: "Cloud Platforms", 
        proficiency: 72, 
        description: "AWS, GCP, Azure ML services", 
        projects: ["Cloud-based ML Pipeline", "Serverless ML Model Deployment"] 
      },
    ]
  },
  {
    name: "Data Analysis",
    icon: BarChart,
    color: "from-blue-400 to-blue-600",
    skills: [
      { 
        name: "Statistical Analysis", 
        proficiency: 88, 
        description: "Hypothesis testing, regression analysis", 
        projects: ["A/B Testing Framework", "Statistical Modeling for Business Metrics"] 
      },
      { 
        name: "Data Visualization", 
        proficiency: 90, 
        description: "Interactive dashboards, storytelling with data", 
        projects: ["Interactive Analytics Dashboard", "Executive KPI Visualization"] 
      },
      { 
        name: "Exploratory Data Analysis", 
        proficiency: 92, 
        description: "Pattern discovery, outlier detection", 
        projects: ["Customer Behavior Analysis", "Product Performance Analytics"] 
      },
      { 
        name: "Business Intelligence", 
        proficiency: 85, 
        description: "KPI development, reporting", 
        projects: ["Sales Performance Dashboard", "Marketing ROI Analysis"] 
      },
    ]
  },
  {
    name: "MLOps & Deployment",
    icon: Layers,
    color: "from-purple-light to-purple-dark",
    skills: [
      { 
        name: "Model Deployment", 
        proficiency: 75, 
        description: "API creation, containerization, scaling", 
        projects: ["REST API for ML Models", "Docker-based Model Serving"] 
      },
      { 
        name: "ML Pipelines", 
        proficiency: 72, 
        description: "Continuous training, validation", 
        projects: ["Automated Retraining Pipeline", "Model Validation Framework"] 
      },
      { 
        name: "Experiment Tracking", 
        proficiency: 80, 
        description: "Versioning, reproducibility", 
        projects: ["ML Experiment Management System", "Model Registry Implementation"] 
      },
      { 
        name: "Performance Monitoring", 
        proficiency: 78, 
        description: "Drift detection, alerting", 
        projects: ["Real-time Model Monitoring", "Data Drift Detection System"] 
      },
    ]
  },
  {
    name: "Programming",
    icon: Code,
    color: "from-teal-400 to-teal-600",
    skills: [
      { 
        name: "Python", 
        proficiency: 95, 
        description: "Primary language for ML/data science", 
        projects: ["Complete ML Pipeline Implementation", "Automated Reporting System"] 
      },
      { 
        name: "R", 
        proficiency: 75, 
        description: "Statistical analysis, visualization", 
        projects: ["Statistical Analysis Package", "R Shiny Dashboard"] 
      },
      { 
        name: "SQL", 
        proficiency: 85, 
        description: "Data querying and manipulation", 
        projects: ["Complex ETL Procedures", "Reporting Database Optimization"] 
      },
      { 
        name: "Julia", 
        proficiency: 60, 
        description: "High-performance numerical computing", 
        projects: ["Numerical Optimization Algorithm", "Scientific Computing Module"] 
      },
    ]
  },
];

const getColorByProficiency = (proficiency: number): string => {
  if (proficiency >= 90) return "from-purple-dark to-purple";
  if (proficiency >= 80) return "from-purple to-purple-light";
  if (proficiency >= 70) return "from-purple-light to-blue-400";
  return "from-blue-400 to-blue-300";
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-purple uppercase tracking-wider">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My specialized technical toolbox in data science, machine learning, and AI development.
          </p>
        </motion.div>
        
        {/* Skills Word Cloud Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="h-64 mb-12"
        >
          <SkillsWordCloud />
        </motion.div>
        
        {/* Category Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeCategory === index 
                  ? 'bg-gradient-to-r from-purple to-purple-light text-white shadow-lg' 
                  : 'bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon size={16} />
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Active Category Skills */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
        >
          {skillCategories[activeCategory].skills.map((skill, skillIndex) => (
            <motion.div 
              key={skillIndex}
              variants={itemVariant}
              transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredSkill(skillIndex)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <Card className="overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between">
                    <span>{skill.name}</span>
                    <span className="text-sm text-muted-foreground mt-1">{skill.proficiency}%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${getColorByProficiency(skill.proficiency)} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1.2, delay: 0.1 * skillIndex, type: "spring" }}
                    ></motion.div>
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                  
                  {/* Skill projects - shown on hover */}
                  {hoveredSkill === skillIndex && skill.projects && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 space-y-2"
                    >
                      <h4 className="text-xs font-semibold text-purple">Related Projects:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {skill.projects.map((project, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple mr-1.5"></span>
                            {project}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-r from-slate-100/80 to-white/80 dark:from-slate-800/80 dark:to-slate-700/80 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Certifications & Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                name: "AWS Machine Learning Foundations", 
                link: "https://www.credly.com/badges/c314fb64-d2be-4aa9-8e77-fa5e9069afce",
                logo: "https://images.credly.com/size/340x340/images/53caf8cc-b5e9-4424-b4a7-7b069fa13db4/image.png"
              },
              { 
                name: "Introducing Generative AI (Udacity)", 
                link: "https://www.udacity.com/certificate/e/159f2a22-769c-11ef-bbaf-531a1a6740b4",
                logo: "https://s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg"
              },
              { 
                name: "Supervised ML: Regression/Classification", 
                link: "https://www.coursera.org/account/accomplishments/verify/2IUSEAXSMMYQ",
                logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/73/de505d47be7d3a063b51b6f856a6e2/Stanford_Engineering_logo.png"
              }
            ].map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:border-purple/50 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }}
              >
                <div className="w-12 h-12 mb-3 opacity-80">
                  {/* <img src={cert.logo} alt={cert.name} className="w-full h-full object-contain" /> */}
                </div>
                <span className="text-sm font-medium text-center">{cert.name}</span>
              </motion.a>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              className="border-purple text-purple hover:bg-purple/10"
              onClick={() => window.open('/documents/certifications.pdf', '_blank')}
            >
              View All Certifications
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
