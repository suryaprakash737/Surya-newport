
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SocialButtonProps {
  icon: React.ElementType;
  href: string;
  label: string;
}

const SocialButton = ({ icon: Icon, href, label }: SocialButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-white/5 border border-purple/20 rounded-full text-purple hover:bg-purple/10 hover:text-purple-dark transition-all duration-300 hover:scale-110"
        >
          <Icon size={18} />
          <span className="sr-only">{label}</span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-slate-900/90 backdrop-blur-sm text-white border-purple/20">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SocialButton;
