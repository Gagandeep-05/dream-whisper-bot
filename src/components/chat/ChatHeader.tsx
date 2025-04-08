
import React from 'react';
import { Star, Settings, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ChatHeaderProps {
  isDarkMode: boolean;
  onShowApiInput: () => void;
  showApiInput: boolean;
  usingFallback?: boolean;
}

const ChatHeader = ({ isDarkMode, onShowApiInput, showApiInput, usingFallback = false }: ChatHeaderProps) => {
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
          {usingFallback ? (
            <Badge variant="destructive" className="text-xs px-2 py-0.5 animate-pulse flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>Using Fallback</span>
            </Badge>
          ) : (
            <Badge variant="default" className={`text-xs px-2 py-0.5 animate-pulse ${
              isDarkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-500/20 text-green-600'
            }`}>
              Gemini via OpenRouter
            </Badge>
          )}
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
