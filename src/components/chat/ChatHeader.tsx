
import React from 'react';
import { Star } from 'lucide-react';

interface ChatHeaderProps {
  isDarkMode: boolean;
}

const ChatHeader = ({ isDarkMode }: ChatHeaderProps) => {
  return (
    <div className={`p-4 border-b ${
      isDarkMode 
        ? 'border-gray-700/30' 
        : 'border-dream-orange/20'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className={`h-5 w-5 ${
            isDarkMode ? 'text-dream-purple' : 'text-dream-orange'
          }`} />
          <h2 className="font-semibold">Dream Interpreter</h2>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
