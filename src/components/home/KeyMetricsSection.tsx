import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Churn Rate',
    Before: 15,
    'After ML': 12,
  },
  {
    name: 'Prediction Accuracy',
    Before: 75,
    'After ML': 92,
  },
  {
    name: 'Revenue Loss',
    Before: 8,
    'After ML': 3,
  },
];

const KeyMetricsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Key Metrics Improvement
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Measurable improvements achieved through ML implementation
          </p>

          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  angle={0}
                  interval={0}
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  height={60}
                />
                <YAxis 
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(30 41 59)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  itemStyle={{ color: '#94a3b8' }}
                  labelStyle={{ color: '#e2e8f0', marginBottom: '4px' }}
                />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{
                    paddingBottom: '20px',
                  }}
                />
                <Bar 
                  dataKey="Before" 
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
                <Bar 
                  dataKey="After ML" 
                  fill="#7E69AB"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyMetricsSection; 