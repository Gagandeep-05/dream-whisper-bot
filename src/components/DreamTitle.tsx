
import React from 'react';
import { Star, MoonStar, Sparkles } from 'lucide-react';

const DreamTitle = () => {
  return (
    <div className="text-center mb-8 relative">
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-40 opacity-70">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `pulse-slow ${Math.random() * 4 + 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mb-2">
        <MoonStar className="h-8 w-8 text-dream-purple mr-2 floating-element" />
        <h1 className="text-4xl font-bold dream-text-gradient">Dream Whisper</h1>
        <Star className="h-6 w-6 text-dream-accent ml-2 floating-element" strokeWidth={1.5} />
      </div>
      <p className="text-muted-foreground max-w-md mx-auto">
        Describe your dream and receive mystical insights into your subconscious mind
      </p>
      <div className="flex items-center justify-center mt-2 text-xs text-dream-accent">
        <Sparkles className="h-3 w-3 mr-1" />
        <span>Powered by AI dream interpretation</span>
      </div>
    </div>
  );
};

export default DreamTitle;
