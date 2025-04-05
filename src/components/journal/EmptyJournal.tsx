
import React from 'react';
import { Sparkles } from 'lucide-react';

interface EmptyJournalProps {
  isDarkMode: boolean;
}

const EmptyJournal = ({ isDarkMode }: EmptyJournalProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[300px] text-center opacity-70">
      <Sparkles className={`h-10 w-10 mb-4 ${
        isDarkMode ? 'text-dream-purple/50' : 'text-dream-orange/50'
      }`} />
      <p className="mb-2">Your dream journal is empty</p>
      <p className="text-sm text-muted-foreground">Dreams you save will appear here</p>
    </div>
  );
};

export default EmptyJournal;
