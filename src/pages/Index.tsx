
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DreamTitle from '@/components/DreamTitle';
import ChatInterface from '@/components/ChatInterface';
import DreamInsight from '@/components/DreamInsight';
import { MoonIcon, SunIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showStars, setShowStars] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Add or remove dark mode class based on state
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Delayed star appearance for animation effect
    setTimeout(() => {
      setShowStars(true);
    }, 500);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDarkMode 
        ? 'bg-dream-gradient dark' 
        : 'bg-dream-light-gradient'
    }`}>
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {showStars && [...Array(40)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `pulse-slow ${Math.random() * 4 + 3}s ease-in-out infinite`,
                transition: 'all 0.5s ease-in-out',
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Theme toggle button */}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`rounded-full backdrop-blur-sm transition-all duration-500 hover:rotate-12 hover-scale ${
                isDarkMode 
                  ? 'bg-background/20 text-yellow-200' 
                  : 'bg-white/30 text-dream-orange'
              }`}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 animate-pulse" />
              ) : (
                <MoonIcon className="h-5 w-5 animate-pulse" />
              )}
            </Button>
          </div>
          
          {/* Developers button */}
          <Link to="/developers">
            <Button 
              variant="outline" 
              size="icon" 
              className={`rounded-full absolute top-4 right-14 backdrop-blur-sm transition-all duration-500 hover-scale ${
                isDarkMode 
                  ? 'bg-background/20 text-dream-purple hover:bg-background/30 hover:text-purple-300' 
                  : 'bg-white/30 text-dream-orange hover:bg-white/40 hover:text-orange-500'
              }`}
            >
              <Info className="h-5 w-5" />
            </Button>
          </Link>
          
          <DreamTitle isDarkMode={isDarkMode} />
          
          <div className="max-w-xl mx-auto animate-fade-in">
            <ChatInterface isDarkMode={isDarkMode} />
          </div>
          
          {!isMobile && <DreamInsight isDarkMode={isDarkMode} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
