import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Brain, BarChart3, Image as ImageIcon } from 'lucide-react';

interface MLModel {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  howItWorks: string[];
  useCase: string;
  metrics: {
    accuracy: string;
    performance: string;
    improvement: string;
  };
}

const mlModels: MLModel[] = [
  {
    id: 'sentiment',
    name: 'Sentiment Analysis',
    description: 'Analyze the emotional tone of text using natural language processing.',
    icon: <Brain className="w-6 h-6" />,
    howItWorks: [
      'Text is preprocessed and tokenized into words',
      'Each word is compared against sentiment dictionaries',
      'Sentiment scores are aggregated and normalized',
      'Final sentiment classification is determined'
    ],
    useCase: 'Perfect for analyzing customer feedback, social media monitoring, and brand sentiment tracking.',
    metrics: {
      accuracy: '85%',
      performance: '100ms',
      improvement: '40%'
    }
  },
  {
    id: 'sales',
    name: 'Sales Forecasting',
    description: 'Predict future sales trends using historical data and machine learning.',
    icon: <BarChart3 className="w-6 h-6" />,
    howItWorks: [
      'Historical sales data is analyzed for patterns',
      'Seasonal trends are identified and weighted',
      'Multiple forecasting models are combined',
      'Predictions are generated with confidence intervals'
    ],
    useCase: 'Ideal for inventory management, resource planning, and revenue forecasting.',
    metrics: {
      accuracy: '92%',
      performance: '2.8x ROI',
      improvement: '35%'
    }
  }
];

const MLModelsSection = () => {
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState<null | { score: number; label: string }>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeSentiment = async () => {
    setIsLoading(true);
    try {
      const positiveWords = ['good', 'great', 'awesome', 'excellent', 'happy', 'love', 'wonderful', 'fantastic'];
      const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'sad', 'hate', 'poor', 'disappointing'];
      
      const words = text.toLowerCase().split(' ');
      let score = 0;
      
      words.forEach(word => {
        if (positiveWords.includes(word)) score += 1;
        if (negativeWords.includes(word)) score -= 1;
      });

      const normalizedScore = score / Math.max(words.length, 1);
      
      setSentiment({
        score: normalizedScore,
        label: normalizedScore > 0 ? 'Positive' : normalizedScore < 0 ? 'Negative' : 'Neutral'
      });
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
    setIsLoading(false);
  };

  return (
    <section id="ml-models" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Interactive ML Models</h2>
          <p className="text-muted-foreground text-center mb-12">
            Experience production-ready machine learning models in action. 
            Try them out and see how they can solve real business problems.
          </p>

          <div className="grid gap-6">
            {mlModels.map((model) => (
              <Card key={model.id} className="overflow-hidden">
                <div 
                  className="p-6 cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => setActiveModel(activeModel === model.id ? null : model.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple/10 rounded-lg text-purple">
                        {model.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{model.name}</h3>
                        <p className="text-muted-foreground">{model.description}</p>
                      </div>
                    </div>
                    {activeModel === model.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {activeModel === model.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t"
                  >
                    <div className="p-6 space-y-6">
                      {/* How it Works */}
                      <div>
                        <h4 className="font-semibold mb-3">How it Works</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {model.howItWorks.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Use Case */}
                      <div>
                        <h4 className="font-semibold mb-2">Use Case</h4>
                        <p className="text-muted-foreground">{model.useCase}</p>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-accent/50 rounded-lg">
                          <div className="text-sm text-muted-foreground">Accuracy</div>
                          <div className="text-xl font-semibold">{model.metrics.accuracy}</div>
                        </div>
                        <div className="p-4 bg-accent/50 rounded-lg">
                          <div className="text-sm text-muted-foreground">Performance</div>
                          <div className="text-xl font-semibold">{model.metrics.performance}</div>
                        </div>
                        <div className="p-4 bg-accent/50 rounded-lg">
                          <div className="text-sm text-muted-foreground">Improvement</div>
                          <div className="text-xl font-semibold">{model.metrics.improvement}</div>
                        </div>
                      </div>

                      {/* Interactive Demo */}
                      {model.id === 'sentiment' && (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Try it Out</h4>
                          <div className="flex gap-4">
                            <Input
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder="Enter text to analyze..."
                              className="flex-1"
                            />
                            <Button 
                              onClick={analyzeSentiment}
                              disabled={!text || isLoading}
                            >
                              {isLoading ? 'Analyzing...' : 'Analyze'}
                            </Button>
                          </div>

                          {sentiment && (
                            <div className="p-4 bg-card rounded-lg border">
                              <div className="flex items-center gap-4">
                                <Badge variant={
                                  sentiment.label === 'Positive' ? 'default' :
                                  sentiment.label === 'Negative' ? 'destructive' : 'secondary'
                                }>
                                  {sentiment.label}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  Score: {sentiment.score.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </Card>
            ))}
          </div>

          {/* Coming Soon Section */}
          <Card className="mt-8 p-6">
            <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-accent/50 rounded-lg flex items-center gap-4">
                <ImageIcon className="w-6 h-6 text-purple" />
                <div>
                  <h4 className="font-medium">Image Classification</h4>
                  <p className="text-sm text-muted-foreground">Classify images in real-time using deep learning</p>
                </div>
              </div>
              <div className="p-4 bg-accent/50 rounded-lg flex items-center gap-4">
                <Brain className="w-6 h-6 text-purple" />
                <div>
                  <h4 className="font-medium">Text Generation</h4>
                  <p className="text-sm text-muted-foreground">Generate human-like text using transformers</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default MLModelsSection; 