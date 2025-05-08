import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface SkillLink {
  source: string;
  target: string;
  strength: number;
}

const skillNodes: SkillNode[] = [
  { id: 'ml', name: 'Machine Learning', category: 'ML', proficiency: 90 },
  { id: 'dl', name: 'Deep Learning', category: 'DL', proficiency: 85 },
  { id: 'cv', name: 'Computer Vision', category: 'DL', proficiency: 88 },
  { id: 'nlp', name: 'NLP', category: 'DL', proficiency: 82 },
  { id: 'de', name: 'Data Engineering', category: 'DE', proficiency: 80 },
  { id: 'da', name: 'Data Analysis', category: 'DA', proficiency: 85 },
  { id: 'mlops', name: 'MLOps', category: 'MLOps', proficiency: 75 },
  { id: 'python', name: 'Python', category: 'Prog', proficiency: 95 },
  { id: 'sql', name: 'SQL', category: 'Prog', proficiency: 85 },
  { id: 'stats', name: 'Statistics', category: 'DA', proficiency: 88 }
];

const skillLinks: SkillLink[] = [
  { source: 'ml', target: 'dl', strength: 0.8 },
  { source: 'dl', target: 'cv', strength: 0.9 },
  { source: 'dl', target: 'nlp', strength: 0.9 },
  { source: 'ml', target: 'stats', strength: 0.7 },
  { source: 'de', target: 'python', strength: 0.8 },
  { source: 'de', target: 'sql', strength: 0.7 },
  { source: 'da', target: 'stats', strength: 0.8 },
  { source: 'da', target: 'python', strength: 0.7 },
  { source: 'mlops', target: 'python', strength: 0.8 },
  { source: 'mlops', target: 'de', strength: 0.7 }
];

const SkillRelationships = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = dimensions.width;
    const height = dimensions.height;

    // Create the simulation
    const simulation = d3.forceSimulation(skillNodes)
      .force('link', d3.forceLink(skillLinks)
        .id((d: any) => d.id)
        .distance(100)
        .strength((d: any) => d.strength))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Create the links
    const link = svg.append('g')
      .selectAll('line')
      .data(skillLinks)
      .enter()
      .append('line')
      .attr('stroke', '#6c5ce7')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d: any) => d.strength * 3);

    // Create the nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(skillNodes)
      .enter()
      .append('g')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles to nodes
    node.append('circle')
      .attr('r', (d: any) => Math.sqrt(d.proficiency) * 2)
      .attr('fill', '#6c5ce7')
      .attr('fill-opacity', 0.8)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add labels to nodes
    node.append('text')
      .text((d: any) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', 4)
      .attr('fill', '#fff')
      .attr('font-size', '12px');

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [dimensions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px] bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700"
    >
      <h3 className="text-lg font-medium mb-4">Skill Relationships</h3>
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ minHeight: '300px' }}
      />
    </motion.div>
  );
};

export default SkillRelationships; 