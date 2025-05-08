import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const NeuralNetwork = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderSvg = () => (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      {/* Background Circle */}
      <circle cx="200" cy="200" r="180" fill="#ffffff" />

      {/* Connections */}
      <g>
        {/* Regular connections */}
        <path d="M120,120 L200,160" stroke="#8c7ae6" strokeWidth="2" opacity="0.6" />
        <path d="M120,200 L200,160" stroke="#8c7ae6" strokeWidth="2" opacity="0.6" />
        <path d="M120,280 L200,160" stroke="#8c7ae6" strokeWidth="2" opacity="0.6" />
        <path d="M120,200 L200,240" stroke="#8c7ae6" strokeWidth="2" opacity="0.6" />
        <path d="M120,280 L200,240" stroke="#8c7ae6" strokeWidth="2" opacity="0.6" />
        <path d="M200,160 L280,200" stroke="#8c7ae6" strokeWidth="2" opacity="0.6" />
        <path d="M200,240 L280,200" stroke="#8c7ae6" strokeWidth="2" opacity="0.6" />
        
        {/* Decision boundary */}
        <path 
          d="M130,190 Q200,140 270,210" 
          stroke="#fdcb6e" 
          strokeWidth="2" 
          strokeDasharray="5,5" 
          fill="none" 
        />
      </g>

      {/* Statistical Elements (Red Lines) */}
      <g stroke="#e84393" strokeWidth="2" fill="none">
        <path d="M320,120 C330,130 325,150 335,160 C345,170 350,180 345,190" />
        <path d="M310,280 C320,270 325,250 335,240 C345,230 350,220 345,210" />
      </g>

      {/* Nodes */}
      <g>
        <circle cx="120" cy="120" r="15" fill="#8c7ae6" fillOpacity="0.8" />
        <circle cx="120" cy="200" r="15" fill="#8c7ae6" fillOpacity="0.8" />
        <circle cx="120" cy="280" r="15" fill="#8c7ae6" fillOpacity="0.8" />
        <circle cx="200" cy="160" r="15" fill="#8c7ae6" fillOpacity="0.8" />
        <circle cx="200" cy="240" r="15" fill="#8c7ae6" fillOpacity="0.8" />
        <circle cx="280" cy="200" r="15" fill="#8c7ae6" fillOpacity="0.8" />
      </g>

      {/* Data Points */}
      <g>
        <circle cx="140" cy="140" r="4" fill="#00cec9" />
        <circle cx="160" cy="130" r="4" fill="#00cec9" />
        <circle cx="180" cy="145" r="4" fill="#00cec9" />
        <circle cx="155" cy="160" r="4" fill="#00cec9" />
        <circle cx="170" cy="170" r="4" fill="#00cec9" />
        
        <circle cx="225" cy="185" r="4" fill="#ff7675" />
        <circle cx="240" cy="210" r="4" fill="#ff7675" />
        <circle cx="235" cy="230" r="4" fill="#ff7675" />
        <circle cx="255" cy="220" r="4" fill="#ff7675" />
        <circle cx="260" cy="195" r="4" fill="#ff7675" />
      </g>

      {/* Binary Data */}
      <g fill="#2d3436" opacity="0.15" fontFamily="monospace" fontSize="8">
        <text x="90" y="105">10110</text>
        <text x="95" y="185">01001</text>
        <text x="95" y="265">11010</text>
        <text x="185" y="145">00111</text>
        <text x="185" y="225">10101</text>
        <text x="265" y="185">11100</text>
      </g>
    </svg>
  );

  return (
    <>
      <div 
        className="w-32 h-32 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setIsModalOpen(true)}
      >
        {renderSvg()}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          <div className="w-full h-full max-w-2xl mx-auto">
            {renderSvg()}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NeuralNetwork;
