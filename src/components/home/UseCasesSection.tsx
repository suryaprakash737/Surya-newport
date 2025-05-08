
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart4, Download } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';

type UseCase = {
  id: number;
  title: string;
  businessProblem: string;
  solution: string;
  results: string[];
  metrics: {
    before: number;
    after: number;
    label: string;
  }[];
  roi?: string;
};

const useCases: UseCase[] = [
  {
    id: 1,
    title: "Customer Churn Prediction",
    businessProblem: "15% annual churn rate causing $3.2M in lost revenue",
    solution: "Developed ensemble model combining Random Forest, XGBoost and logistic regression to identify at-risk customers and implement targeted retention strategies.",
    results: [
      "85% prediction accuracy",
      "24% reduction in customer churn",
      "Identified key retention factors",
      "$780K estimated annual savings"
    ],
    metrics: [
      { before: 15, after: 11.4, label: "Churn Rate (%)" },
      { before: 65, after: 85, label: "Prediction Accuracy (%)" },
      { before: 3.2, after: 2.4, label: "Revenue Loss ($M)" }
    ],
    roi: "3.4x ROI within first 6 months"
  },
  {
    id: 2,
    title: "Sales Forecasting System",
    businessProblem: "Inaccurate inventory planning leading to stockouts and excess inventory",
    solution: "Implemented time-series forecasting models with seasonal adjustments and market trend analysis to predict product demand with higher accuracy.",
    results: [
      "18% error reduction vs previous system",
      "$120K annual savings in inventory costs",
      "95% in-stock rate for high-demand items",
      "Reduced wastage by 22%"
    ],
    metrics: [
      { before: 22, after: 4, label: "Forecast Error (%)" },
      { before: 78, after: 95, label: "In-stock Rate (%)" },
      { before: 320, after: 200, label: "Annual Inventory Cost ($K)" }
    ],
    roi: "2.8x ROI in first year"
  },
  {
    id: 3,
    title: "Recommendation Engine",
    businessProblem: "Low cross-sell conversion rates in e-commerce platform",
    solution: "Built collaborative filtering recommendation system with content-based components to suggest personalized products to users based on browsing and purchase history.",
    results: [
      "32% increase in cross-sell revenue",
      "28% higher average order value",
      "Improved user engagement metrics",
      "15% increase in return purchases"
    ],
    metrics: [
      { before: 4.5, after: 6.0, label: "Avg Order Value ($)" },
      { before: 8, after: 18, label: "Cross-sell Conv. Rate (%)" },
      { before: 22, after: 37, label: "Return Purchase Rate (%)" }
    ],
    roi: "4.2x ROI in first year"
  }
];

const UseCasesSection = () => {
  const [selectedTab, setSelectedTab] = useState<'problem' | 'solution' | 'results'>('problem');
  const [activeCase, setActiveCase] = useState<number>(1);

  const selectedCase = useCases.find(c => c.id === activeCase) || useCases[0];

  return (
    <section id="use-cases" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ML Use Cases & Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world machine learning applications with measurable business results
            and quantifiable impact on key performance indicators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card 
                className={cn(
                  "cursor-pointer hover:shadow-md transition-all h-full",
                  activeCase === useCase.id ? "border-purple/50 shadow-md" : ""
                )}
                onClick={() => setActiveCase(useCase.id)}
              >
                <CardHeader>
                  <CardTitle className={cn(
                    "text-xl transition-colors",
                    activeCase === useCase.id ? "text-purple" : ""
                  )}>
                    {useCase.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {useCase.businessProblem}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">ROI</div>
                      <div className="text-sm font-bold text-purple">{useCase.roi}</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          layout
          key={activeCase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-800 border border-border rounded-xl p-6 shadow-sm"
        >
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-purple mb-4">{selectedCase.title}</h3>
                  
                  {/* Tab buttons */}
                  <div className="flex border-b border-border mb-4">
                    <button
                      onClick={() => setSelectedTab('problem')}
                      className={cn(
                        "py-2 px-4 font-medium text-sm",
                        selectedTab === 'problem'
                          ? "border-b-2 border-purple text-purple"
                          : "text-muted-foreground"
                      )}
                    >
                      Problem
                    </button>
                    <button
                      onClick={() => setSelectedTab('solution')}
                      className={cn(
                        "py-2 px-4 font-medium text-sm",
                        selectedTab === 'solution'
                          ? "border-b-2 border-purple text-purple"
                          : "text-muted-foreground"
                      )}
                    >
                      Solution
                    </button>
                    <button
                      onClick={() => setSelectedTab('results')}
                      className={cn(
                        "py-2 px-4 font-medium text-sm",
                        selectedTab === 'results'
                          ? "border-b-2 border-purple text-purple"
                          : "text-muted-foreground"
                      )}
                    >
                      Results
                    </button>
                  </div>
                  
                  {/* Tab content */}
                  <div className="min-h-[200px]">
                    {selectedTab === 'problem' && (
                      <motion.div
                        key="problem"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Business Challenge:</h4>
                          <p className="text-muted-foreground">{selectedCase.businessProblem}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Key Metrics Before ML Implementation:</h4>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {selectedCase.metrics.map((metric, i) => (
                              <li key={i}>
                                {metric.label}: <span className="font-medium">{metric.before} {metric.label.includes('%') ? '%' : ''}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                    
                    {selectedTab === 'solution' && (
                      <motion.div
                        key="solution"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="font-semibold mb-2">ML Solution Approach:</h4>
                        <p className="text-muted-foreground mb-4">{selectedCase.solution}</p>
                        <Button size="sm" variant="outline" className="border-purple text-purple">
                          <Download size={14} className="mr-1" /> Download Case Study
                        </Button>
                      </motion.div>
                    )}
                    
                    {selectedTab === 'results' && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="font-semibold mb-2">Business Impact:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                          {selectedCase.results.map((result, i) => (
                            <li key={i}>{result}</li>
                          ))}
                        </ul>
                        <p className="font-medium text-purple mt-2">
                          Return on Investment: {selectedCase.roi}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="rounded-lg border border-border p-4 h-full">
                <h4 className="font-medium mb-4 flex items-center">
                  <BarChart4 size={18} className="mr-2 text-purple" /> 
                  Key Metrics Improvement
                </h4>
                <div className="h-[250px] mt-4">
                  <ChartContainer 
                    config={{
                      before: { color: "#94a3b8" },
                      after: { color: "#8b5cf6" },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={selectedCase.metrics}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <XAxis 
                          dataKey="label"
                          tick={{ fontSize: 12 }}
                          axisLine={false}
                        />
                        <YAxis hide />
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="before" name="Before" fill="var(--color-before)" radius={[4, 4, 0, 0]} barSize={18} />
                        <Bar dataKey="after" name="After" fill="var(--color-after)" radius={[4, 4, 0, 0]} barSize={18} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-slate-400 mr-2"></div>
                    <span className="text-xs">Before</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple mr-2"></div>
                    <span className="text-xs">After ML Implementation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
