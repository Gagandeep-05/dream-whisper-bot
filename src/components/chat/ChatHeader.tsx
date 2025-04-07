
import React from 'react';
import { Star, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  isDarkMode: boolean;
  onShowApiInput: () => void;
  showApiInput: boolean;
}

const ChatHeader = ({ isDarkMode, onShowApiInput, showApiInput }: ChatHeaderProps) => {
  return (
    <div className={`p-4 border-b transition-all duration-300 ${
      isDarkMode 
        ? 'border-gray-700/30' 
        : 'border-dream-orange/20'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className={`h-5 w-5 animate-pulse ${
            isDarkMode ? 'text-dream-purple' : 'text-dream-orange'
          }`} />
          <h2 className="font-semibold">Dream Interpreter</h2>
          <span className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full animate-pulse">
            Gemini API v1
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onShowApiInput}
          className={`rounded-full transition-all duration-300 hover:rotate-12 ${
            showApiInput 
              ? isDarkMode ? 'bg-primary/20 text-primary' : 'bg-dream-orange/20 text-dream-orange' 
              : ''
          }`}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
