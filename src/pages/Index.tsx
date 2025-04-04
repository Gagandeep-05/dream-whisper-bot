
import React from 'react';
import DreamTitle from '@/components/DreamTitle';
import ChatInterface from '@/components/ChatInterface';
import DreamInsight from '@/components/DreamInsight';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    // Add or remove dark mode class based on state
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-dream-gradient dark' 
        : 'bg-dream-light-gradient'
    }`}>
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
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
              className={`rounded-full backdrop-blur-sm ${
                isDarkMode 
                  ? 'bg-background/20 text-yellow-200' 
                  : 'bg-white/30 text-dream-orange'
              }`}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          <DreamTitle isDarkMode={isDarkMode} />
          
          <div className="max-w-xl mx-auto">
            <ChatInterface isDarkMode={isDarkMode} />
          </div>
          
          {!isMobile && <DreamInsight isDarkMode={isDarkMode} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
