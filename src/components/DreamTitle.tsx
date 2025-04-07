
import React, { useEffect, useRef } from 'react';
import { Star, MoonStar, Sparkles } from 'lucide-react';

interface DreamTitleProps {
  isDarkMode: boolean;
}

const DreamTitle = ({ isDarkMode }: DreamTitleProps) => {
  const starsContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create animated stars effect
    const animateStars = () => {
      if (!starsContainerRef.current) return;
      
      const container = starsContainerRef.current;
      const stars = container.querySelectorAll('.star');
      
      stars.forEach((star) => {
        const speedFactor = Math.random() * 0.5 + 0.5;
        (star as HTMLElement).style.animation = `pulse-slow ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 2}s`;
        
        // Add small random movement
        const smallMovement = () => {
          const amount = 5;
          const newX = parseFloat((star as HTMLElement).style.left || '0') + (Math.random() * amount - amount/2);
          const newY = parseFloat((star as HTMLElement).style.top || '0') + (Math.random() * amount - amount/2);
          
          (star as HTMLElement).style.transform = `translate(${newX}px, ${newY}px)`;
          
          setTimeout(smallMovement, Math.random() * 3000 + 2000);
        };
        
        setTimeout(smallMovement, Math.random() * 1000);
      });
    };
    
    animateStars();
  }, []);
  
  return (
    <div className="text-center mb-8 relative">
      <div ref={starsContainerRef} className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-40 opacity-70">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star transition-all duration-1000"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mb-2">
        <MoonStar className={`h-8 w-8 mr-2 animate-float ${
          isDarkMode ? 'text-dream-purple' : 'text-dream-orange'
        }`} />
        <h1 className="text-4xl font-bold dream-text-gradient transform transition-all hover:scale-105">Dream Whisper</h1>
        <Star className={`h-6 w-6 ml-2 animate-float ${
          isDarkMode ? 'text-dream-accent' : 'text-dream-orange'
        }`} strokeWidth={1.5} style={{animationDelay: '1s'}} />
      </div>
      <p className="text-muted-foreground max-w-md mx-auto transition-all duration-500 hover:text-foreground">
        Describe your dream and receive mystical insights into your subconscious mind
      </p>
      <div className={`flex items-center justify-center mt-2 text-xs ${
        isDarkMode ? 'text-dream-accent' : 'text-dream-orange'
      } animate-pulse-slow`}>
        <Sparkles className="h-3 w-3 mr-1" />
        <span>Powered by AI dream interpretation</span>
      </div>
    </div>
  );
};

export default DreamTitle;
