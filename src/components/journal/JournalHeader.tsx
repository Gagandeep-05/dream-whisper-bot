
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface JournalHeaderProps {
  isDarkMode: boolean;
  currentStreak: number;
  exportJournal: () => void;
  clearJournal: () => void;
}

const JournalHeader = ({ 
  isDarkMode, 
  currentStreak, 
  exportJournal, 
  clearJournal 
}: JournalHeaderProps) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className={`flex items-center gap-2 ${
        isDarkMode ? 'text-dream-accent' : 'text-dream-orange'
      }`}>
        <Calendar className="h-4 w-4" />
        <span className="text-sm">Dream Streak:</span>
        <Badge variant={isDarkMode ? "default" : "outline"} className={`${
          isDarkMode ? 'bg-dream-purple/50' : 'border-dream-orange text-dream-orange'
        }`}>
          {currentStreak} day{currentStreak !== 1 ? 's' : ''}
        </Badge>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className={`text-xs ${
            isDarkMode 
              ? 'border-dream-purple/30 hover:bg-dream-purple/20' 
              : 'border-dream-orange/30 hover:bg-dream-orange/10 text-dream-orange'
          }`}
          onClick={exportJournal}
        >
          Export
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className={`text-xs ${
            isDarkMode 
              ? 'border-dream-purple/30 hover:bg-destructive/20' 
              : 'border-dream-orange/30 hover:bg-destructive/10 text-dream-orange'
          }`}
          onClick={clearJournal}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default JournalHeader;
