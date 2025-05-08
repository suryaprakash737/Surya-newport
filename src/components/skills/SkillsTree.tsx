import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Brain, Database, LineChart, Code, BarChart, Network, Layers, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SkillRelationships } from './SkillRelationships';

interface SkillNode {
  id: string;
  name: string;
  proficiency: number;
  description: string;
  projects: Project[];
  technologies: string[];
  approach: string;
  children?: SkillNode[];
}

interface Project {
  name: string;
  description: string;
  thumbnail?: string;
  githubUrl?: string;
  demoUrl?: string;
  metrics: {
    name: string;
    value: string;
  }[];
}

const skillTree: SkillNode[] = [
  {
    id: 'ml',
    name: 'Machine Learning',
    proficiency: 90,
    description: 'Expertise in developing and deploying machine learning models',
    approach: 'Focus on practical applications and real-world problem solving',
    technologies: ['Scikit-learn', 'XGBoost', 'LightGBM', 'TensorFlow'],
    projects: [
      {
        name: 'Customer Churn Prediction',
        description: 'Developed a model to predict customer churn with 92% accuracy',
        githubUrl: 'https://github.com/yourusername/churn-prediction',
        metrics: [
          { name: 'Accuracy', value: '92%' },
          { name: 'F1 Score', value: '0.89' }
        ]
      },
      {
        name: 'Housing Price Forecasting',
        description: 'Created a regression model for real estate price prediction',
        githubUrl: 'https://github.com/yourusername/housing-prediction',
        metrics: [
          { name: 'RMSE', value: '$45,000' },
          { name: 'R² Score', value: '0.85' }
        ]
      }
    ],
    children: [
      {
        id: 'ml-supervised',
        name: 'Supervised Learning',
        proficiency: 92,
        description: 'Expert in classification and regression problems',
        approach: 'Focus on model interpretability and business impact',
        technologies: ['Random Forest', 'SVM', 'Neural Networks'],
        projects: [
          {
            name: 'Credit Risk Assessment',
            description: 'Built a credit scoring model for loan approval',
            githubUrl: 'https://github.com/yourusername/credit-scoring',
            metrics: [
              { name: 'AUC-ROC', value: '0.91' },
              { name: 'Precision', value: '0.88' }
            ]
          }
        ]
      },
      {
        id: 'ml-unsupervised',
        name: 'Unsupervised Learning',
        proficiency: 85,
        description: 'Specialized in clustering and dimensionality reduction',
        approach: 'Emphasis on pattern discovery and data insights',
        technologies: ['K-means', 'DBSCAN', 'PCA', 't-SNE'],
        projects: [
          {
            name: 'Customer Segmentation',
            description: 'Implemented clustering for customer behavior analysis',
            githubUrl: 'https://github.com/yourusername/customer-segmentation',
            metrics: [
              { name: 'Silhouette Score', value: '0.75' },
              { name: 'Clusters', value: '5' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dl',
    name: 'Deep Learning',
    proficiency: 85,
    description: 'Advanced expertise in neural networks and deep learning',
    approach: 'Focus on state-of-the-art architectures and transfer learning',
    technologies: ['PyTorch', 'TensorFlow', 'Keras', 'Hugging Face'],
    projects: [
      {
        name: 'Image Classification System',
        description: 'Developed a CNN-based image classification system',
        githubUrl: 'https://github.com/yourusername/image-classification',
        metrics: [
          { name: 'Accuracy', value: '94%' },
          { name: 'Inference Time', value: '50ms' }
        ]
      }
    ],
    children: [
      {
        id: 'dl-cv',
        name: 'Computer Vision',
        proficiency: 88,
        description: 'Expert in image processing and computer vision',
        approach: 'Focus on real-time applications and edge deployment',
        technologies: ['OpenCV', 'YOLO', 'ResNet', 'EfficientNet'],
        projects: [
          {
            name: 'Object Detection System',
            description: 'Built a real-time object detection system',
            githubUrl: 'https://github.com/yourusername/object-detection',
            metrics: [
              { name: 'mAP', value: '0.82' },
              { name: 'FPS', value: '30' }
            ]
          }
        ]
      }
    ]
  }
];

const SkillNode = ({ node, level = 0, onNodeClick, expandedNodes }: { 
  node: SkillNode; 
  level?: number;
  onNodeClick: (id: string) => void;
  expandedNodes: Set<string>;
}) => {
  const isExpanded = expandedNodes.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative",
        level > 0 && "ml-6 border-l-2 border-purple/20 pl-4"
      )}
    >
      <motion.div
        className={cn(
          "group flex items-center gap-2 p-2 rounded-lg cursor-pointer",
          "hover:bg-purple/5 transition-colors"
        )}
        onClick={() => onNodeClick(node.id)}
      >
        {hasChildren && (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </motion.div>
        )}
        <div className="flex-1">
          <h3 className="font-medium text-lg">{node.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{node.proficiency}% Proficiency</span>
            <span>•</span>
            <span>{node.description}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {/* Approach */}
              <div className="bg-purple/5 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Approach</h4>
                <p className="text-sm text-muted-foreground">{node.approach}</p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-medium mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {node.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple/10 text-purple rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 className="font-medium mb-2">Projects</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {node.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700"
                    >
                      <h5 className="font-medium mb-2">{project.name}</h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.metrics.map((metric, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple/10 text-purple rounded-full text-xs"
                          >
                            {metric.name}: {metric.value}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-purple hover:text-purple/80 flex items-center gap-1"
                          >
                            <ExternalLink size={14} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render children */}
      {isExpanded && hasChildren && (
        <div className="mt-4 space-y-2">
          {node.children.map((child) => (
            <SkillNode
              key={child.id}
              node={child}
              level={level + 1}
              onNodeClick={onNodeClick}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const SkillsTree = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  return (
    <div className="space-y-8">
      {/* Skill Relationships Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SkillRelationships />
      </motion.div>

      {/* Skills Tree */}
      <div className="space-y-4">
        {skillTree.map((node) => (
          <SkillNode
            key={node.id}
            node={node}
            onNodeClick={toggleNode}
            expandedNodes={expandedNodes}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsTree; 