
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Developers = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

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
          <Link to="/">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full backdrop-blur-sm absolute top-4 left-4 ${
                isDarkMode 
                  ? 'bg-background/20 text-white hover:bg-background/30' 
                  : 'bg-white/30 text-dream-orange hover:bg-white/40'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          
          <div className={`max-w-3xl mx-auto mt-16 rounded-xl p-8 shadow-lg ${
            isDarkMode
              ? 'bg-card/30 backdrop-blur-sm border border-white/20'
              : 'bg-white/80 backdrop-blur-sm border border-dream-orange/20'
          }`}>
            <h1 className={`text-3xl font-bold mb-8 text-center ${
              isDarkMode ? 'text-dream-purple' : 'text-dream-orange'
            }`}>
              Dream Whisper Development Team
            </h1>
            
            <div className="space-y-8">
              <div className={`p-6 rounded-lg ${
                isDarkMode 
                  ? 'bg-background/20 border border-dream-purple/20' 
                  : 'bg-white/60 border border-dream-orange/20'
              }`}>
                <h2 className="text-xl font-semibold mb-2">Lead Developer</h2>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className={`text-lg font-medium ${
                      isDarkMode ? 'text-dream-accent' : 'text-dream-orange'
                    }`}>Gagandeep Singh</h3>
                    <p className="opacity-80">Registration Number: 12310400</p>
                  </div>
                  <div className="opacity-80">
                    <p>Project Lead & Core Implementation</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-6 rounded-lg ${
                  isDarkMode 
                    ? 'bg-background/20 border border-dream-purple/20' 
                    : 'bg-white/60 border border-dream-orange/20'
                }`}>
                  <h2 className="text-lg font-semibold mb-2">Developer</h2>
                  <h3 className={`text-lg font-medium ${
                    isDarkMode ? 'text-dream-accent' : 'text-dream-orange'
                  }`}>Ritesh Raj</h3>
                  <p className="opacity-80">Registration Number: 12311111</p>
                  <p className="mt-2 opacity-80">AI Integration Specialist</p>
                </div>
                
                <div className={`p-6 rounded-lg ${
                  isDarkMode 
                    ? 'bg-background/20 border border-dream-purple/20' 
                    : 'bg-white/60 border border-dream-orange/20'
                }`}>
                  <h2 className="text-lg font-semibold mb-2">Developer</h2>
                  <h3 className={`text-lg font-medium ${
                    isDarkMode ? 'text-dream-accent' : 'text-dream-orange'
                  }`}>Sachin Soni</h3>
                  <p className="opacity-80">Registration Number: 12311010</p>
                  <p className="mt-2 opacity-80">UI/UX Designer</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm opacity-70">
                  Dream Whisper is a project developed to explore the intersection of dream interpretation and AI technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;
