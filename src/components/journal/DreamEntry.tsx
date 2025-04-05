
import React from 'react';
import { Star } from 'lucide-react';

interface DreamEntryProps {
  dream: {
    id: string;
    date: Date;
    content: string;
    interpretation: string;
    streak: number;
  };
  isDarkMode: boolean;
  formatDate: (date: Date) => string;
}

const DreamEntry = ({ dream, isDarkMode, formatDate }: DreamEntryProps) => {
  return (
    <div 
      key={dream.id} 
      className={`p-4 rounded-lg ${
        isDarkMode 
          ? 'bg-background/20 border border-dream-purple/20' 
          : 'bg-white/60 border border-dream-orange/20'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className={`text-sm font-medium ${
          isDarkMode ? 'text-dream-purple' : 'text-dream-orange'
        }`}>
          {formatDate(dream.date)}
        </div>
        {dream.streak > 1 && (
          <div className="flex items-center">
            <Star className={`h-3 w-3 mr-1 ${
              isDarkMode ? 'text-dream-accent' : 'text-dream-orange/80'
            }`} />
            <span className="text-xs opacity-70">Day {dream.streak}</span>
          </div>
        )}
      </div>
      
      <h4 className="text-sm font-medium mb-1">Dream:</h4>
      <p className="text-sm mb-3 whitespace-pre-wrap">{dream.content}</p>
      
      <h4 className="text-sm font-medium mb-1">Interpretation:</h4>
      <p className="text-sm opacity-90 whitespace-pre-wrap">{dream.interpretation}</p>
    </div>
  );
};

export default DreamEntry;
