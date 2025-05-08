
import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: number[];
}

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      if (!canvas) return;
      const numPoints = Math.floor(canvas.width * canvas.height / 20000);
      points.current = [];
      
      for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 0.5;
        const vy = (Math.random() - 0.5) * 0.5;
        const radius = Math.random() * 2 + 1;
        
        // Purple-themed colors with opacity
        const colors = [
          'rgba(139, 92, 246, 0.3)', // purple
          'rgba(124, 58, 237, 0.3)', // purple-darker
          'rgba(167, 139, 250, 0.3)', // purple-lighter
        ];
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        points.current.push({
          x, y, vx, vy, radius, color, connections: []
        });
      }
    };

    const drawPoints = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update points
      points.current.forEach((point, i) => {
        // Move points
        point.x += point.vx;
        point.y += point.vy;
        
        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
        
        // Clear connections
        point.connections = [];
      });
      
      // Find and draw connections
      const connectionDistance = Math.min(canvas.width, canvas.height) / 8;
      
      for (let i = 0; i < points.current.length; i++) {
        const pointA = points.current[i];
        
        for (let j = i + 1; j < points.current.length; j++) {
          const pointB = points.current[j];
          
          const dx = pointB.x - pointA.x;
          const dy = pointB.y - pointA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Create connection if close enough
            pointA.connections.push(j);
            pointB.connections.push(i);
            
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointB.x, pointB.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId.current = requestAnimationFrame(drawPoints);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawPoints();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-30"
    />
  );
};

export default Particles;
