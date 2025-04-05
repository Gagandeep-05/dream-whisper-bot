
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import EmptyJournal from './EmptyJournal';
import DreamEntry from './DreamEntry';

interface SavedDream {
  id: string;
  date: Date;
  content: string;
  interpretation: string;
  streak: number;
}

interface JournalContentProps {
  isDarkMode: boolean;
  savedDreams: SavedDream[];
  formatDate: (date: Date) => string;
}

const JournalContent = ({ isDarkMode, savedDreams, formatDate }: JournalContentProps) => {
  if (savedDreams.length === 0) {
    return <EmptyJournal isDarkMode={isDarkMode} />;
  }

  return (
    <ScrollArea className="mt-6 h-[450px] pr-4">
      <div className="space-y-6">
        {savedDreams.map((dream) => (
          <DreamEntry 
            key={dream.id}
            dream={dream}
            isDarkMode={isDarkMode}
            formatDate={formatDate}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default JournalContent;
