import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Github, ExternalLink, BookOpen, BarChart, Users, MessageSquare, Award, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import NeuralNetwork from './NeuralNetwork';

const AboutSection = () => {
  const { toast } = useToast();

  const handleViewResume = () => {
    try {
      window.open('/documents/resume.pdf', '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening resume:', error);
      toast({
        title: "Error",
        description: "Unable to open resume. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const experiences = [
    {
      role: "Machine Learning Research Assistant",
      company: "George Mason University",
      period: "Fall 2024",
      description: [
        "Developed and implemented advanced NLP models for analyzing 100,000+ news articles using transformers",
        "Achieved 92% accuracy in geographic entity recognition using fine-tuned BERT models",
        "Created interactive geospatial visualizations using Python (Folium, GeoPandas) revealing coverage patterns",
        "Published findings in university research symposium and proposed ML-driven content recommendation system"
      ]
    },
    {
      role: "Data Scientist",
      company: "Virgoys Software",
      period: "December 2023 - June 2024",
      description: [
        "Built end-to-end ML pipelines processing 50GB+ daily data using PySpark and AWS",
        "Implemented automated feature engineering reducing model training time by 40%",
        "Developed time series forecasting models achieving 85% accuracy for business metrics",
        "Deployed ML models using MLflow and Docker, reducing inference time by 25%"
      ]
    },
    {
      role: "Computer Vision Research Project",
      company: "Independent Research",
      period: "Summer 2023",
      description: [
        "Implemented state-of-the-art object detection system using YOLOv8 and PyTorch",
        "Created custom dataset of 5,000+ annotated images and implemented data augmentation",
        "Achieved 92% mAP on test dataset through model ensemble techniques",
        "Optimized inference for edge devices using TensorRT, achieving 45 FPS"
      ]
    }
  ];

  const education = [
    {
      degree: "M.S. in Computer Science (Machine Learning Specialization)",
      institution: "George Mason University",
      period: "2024 - Present",
      description: "Advanced coursework: Deep Learning, Computer Vision, Natural Language Processing, Reinforcement Learning, Statistical Machine Learning, Big Data Analytics"
    },
    {
      degree: "Deep Learning Specialization",
      institution: "DeepLearning.AI",
      period: "2023",
      description: "Mastered: CNNs, RNNs, Transformers, GANs, Model Optimization & Deployment"
    }
  ];

  const certifications = [
    {
      name: "AWS Machine Learning Specialty",
      link: "https://www.credly.com/badges/c314fb64-d2be-4aa9-8e77-fa5e9069afce"
    },
    {
      name: "Deep Learning Specialization (DeepLearning.AI)",
      link: "https://www.coursera.org/account/accomplishments/specialization/ABCD1234"
    },
    {
      name: "TensorFlow Developer Certificate",
      link: "https://www.tensorflow.org/certificate"
    }
  ];

  const technicalSkills = [
    {
      category: "Machine Learning",
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "Hugging Face"]
    },
    {
      category: "Data Processing",
      skills: ["PySpark", "Pandas", "NumPy", "Dask", "SQL"]
    },
    {
      category: "MLOps",
      skills: ["MLflow", "Docker", "AWS SageMaker", "DVC", "Weights & Biases"]
    },
    {
      category: "Visualization",
      skills: ["Plotly", "Seaborn", "D3.js", "Tableau", "PowerBI"]
    }
  ];

  const projects = [
    {
      title: "Deep Learning-Based Medical Image Analysis",
      description: "Developed a deep learning system for automated disease detection in medical images using CNNs and Vision Transformers.",
      metrics: [
        "98% accuracy on chest X-ray classification",
        "Reduced diagnosis time by 60%",
        "Processed 50,000+ medical images"
      ],
      technologies: ["PyTorch", "OpenCV", "ViT", "Docker"],
      github: "https://github.com/yourusername/medical-image-ai",
      demo: "https://medical-ai-demo.yourdomain.com",
      image: "/projects/medical-ai.png"
    },
    {
      title: "NLP-Powered Market Analysis",
      description: "Built an end-to-end NLP pipeline for analyzing financial news and social media sentiment for market prediction.",
      metrics: [
        "87% sentiment prediction accuracy",
        "Real-time processing of 100K+ tweets/hour",
        "Deployed on AWS with auto-scaling"
      ],
      technologies: ["Transformers", "FastAPI", "Redis", "AWS"],
      github: "https://github.com/yourusername/nlp-market-analysis",
      demo: "https://market-sentiment.yourdomain.com",
      image: "/projects/nlp-market.png"
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        {/* About Content */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
            <div className="space-y-6 text-lg">
              <p>
                I'm a recent graduate with a Master's in Computer Science, specializing in Machine Learning. 
                My academic journey has equipped me with strong foundations in deep learning, computer vision, 
                and natural language processing.
              </p>
              <p>
                During my studies, I've worked on various ML projects, from computer vision systems to 
                NLP applications. I'm passionate about applying machine learning to solve real-world 
                problems and continuously learning new technologies and methodologies.
              </p>
              <p>
                I'm currently seeking opportunities to apply my skills in machine learning and data science, 
                where I can contribute to innovative projects and grow as a professional in the field.
              </p>
            </div>
            
            <div className="mt-8 flex justify-center gap-4">
              <Button 
                className="bg-purple hover:bg-purple-dark"
                onClick={handleViewResume}
              >
                <ExternalLink className="mr-2 h-4 w-4" /> View Resume
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('https://github.com/yourusername', '_blank')}
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Technical Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalSkills.map((skillSet, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold mb-3 text-purple">{skillSet.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillSet.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="bg-purple/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Experience</h3>
          <div className="relative border-l-2 border-purple/30 ml-4 md:ml-0 md:mx-auto max-w-3xl">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="mb-10 ml-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 bg-purple">
                  <span className="w-3 h-3 rounded-full bg-white"></span>
                </span>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-border">
                  <h4 className="text-xl font-bold">{exp.role}</h4>
                  <div className="flex flex-wrap gap-2 items-center mt-1 mb-3">
                    <span className="font-medium text-muted-foreground">{exp.company}</span>
                    <span className="text-sm px-2 py-0.5 rounded-full bg-purple/10 text-purple">{exp.period}</span>
                  </div>
                  <ul className="list-disc ml-5 space-y-1 text-muted-foreground">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Education</h3>
          <div className="relative border-l-2 border-purple/30 ml-4 md:ml-0 md:mx-auto max-w-3xl">
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                className="mb-10 ml-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 bg-purple">
                  <span className="w-3 h-3 rounded-full bg-white"></span>
                </span>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-border">
                  <h4 className="text-xl font-bold">{edu.degree}</h4>
                  <div className="flex flex-wrap gap-2 items-center mt-1 mb-3">
                    <span className="font-medium text-muted-foreground">{edu.institution}</span>
                    <span className="text-sm px-2 py-0.5 rounded-full bg-purple/10 text-purple">{edu.period}</span>
                  </div>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-border hover:shadow-md hover:border-purple/50 transition-all"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-purple/10 text-purple hover:bg-purple/20 border-none">
                  {cert.name}
                </Badge>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
