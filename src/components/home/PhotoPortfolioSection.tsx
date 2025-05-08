
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock data for portfolio images
const portfolioImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1770&auto=format&fit=crop",
    alt: "Data visualization dashboard",
    category: "data-viz",
    title: "Interactive Data Dashboard"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=1770&auto=format&fit=crop",
    alt: "Machine learning model training",
    category: "machine-learning",
    title: "Neural Network Training"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1776&auto=format&fit=crop",
    alt: "Data science project",
    category: "data-science",
    title: "Predictive Analysis Model"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1770&auto=format&fit=crop",
    alt: "Deep learning architecture",
    category: "machine-learning",
    title: "Deep Learning Framework"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1456428746267-a1756408f782?q=80&w=1770&auto=format&fit=crop",
    alt: "Big data analytics",
    category: "data-science",
    title: "Big Data Analytics Solution"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=1770&auto=format&fit=crop",
    alt: "Data visualization",
    category: "data-viz",
    title: "Data Visualization Project"
  }
];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "data-viz", name: "Data Visualization" },
  { id: "machine-learning", name: "Machine Learning" },
  { id: "data-science", name: "Data Science" }
];

const PhotoPortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const filteredImages = selectedCategory === "all" 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-3 px-3 py-1 border-purple/40 text-purple bg-purple/5">
            <Image size={14} className="mr-1 opacity-70" /> Portfolio
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visual Portfolio</h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of visual data science and machine learning projects highlighting key insights and visualizations.
          </p>
          
          <Separator className="max-w-md mx-auto my-6 bg-gradient-to-r from-transparent via-purple/30 to-transparent" />
          
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(category => (
              <Button 
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"} 
                size="sm"
                className={selectedCategory === category.id 
                  ? "bg-purple hover:bg-purple-dark" 
                  : "border-purple/20 text-foreground/70 hover:text-foreground hover:bg-purple/5"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image) => (
              <motion.div 
                key={image.id}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group overflow-hidden rounded-xl border border-border shadow-sm bg-background"
                layoutId={`photo-${image.id}`}
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{image.alt}</p>
                </div>
                <div className="absolute inset-0 bg-purple/0 group-hover:bg-purple/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotoPortfolioSection;
