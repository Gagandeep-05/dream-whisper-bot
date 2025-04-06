
import React, { useEffect, useState } from 'react';
import { Book } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import JournalHeader from './journal/JournalHeader';
import JournalContent from './journal/JournalContent';

interface SavedDream {
  id: string;
  date: Date;
  content: string;
  interpretation: string;
  streak: number;
}

interface DreamJournalProps {
  isDarkMode: boolean;
}

const DreamJournal = ({ isDarkMode }: DreamJournalProps) => {
  const [savedDreams, setSavedDreams] = useState<SavedDream[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved dreams from localStorage
    const savedDreamsJson = localStorage.getItem('dream-whisper-journal');
    if (savedDreamsJson) {
      const parsed = JSON.parse(savedDreamsJson);
      // Convert date strings back to Date objects
      const dreams = parsed.map((dream: any) => ({
        ...dream,
        date: new Date(dream.date)
      }));
      setSavedDreams(dreams);
    }

    // Calculate current streak
    calculateStreak();
  }, []);

  const calculateStreak = () => {
    const savedDreamsJson = localStorage.getItem('dream-whisper-journal');
    if (!savedDreamsJson) {
      setCurrentStreak(0);
      return;
    }

    const dreams = JSON.parse(savedDreamsJson);
    if (dreams.length === 0) {
      setCurrentStreak(0);
      return;
    }

    // Sort by date descending
    const sortedDreams = [...dreams].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Check if the latest dream is from today
    const today = new Date();
    const latestDreamDate = new Date(sortedDreams[0].date);
    const isToday = 
      latestDreamDate.getDate() === today.getDate() &&
      latestDreamDate.getMonth() === today.getMonth() &&
      latestDreamDate.getFullYear() === today.getFullYear();

    if (!isToday) {
      // Reset streak if the latest dream isn't from today
      localStorage.setItem('dream-whisper-streak', '0');
      setCurrentStreak(0);
      return;
    }

    // Get current streak or set to 1 if this is the first dream
    const storedStreak = localStorage.getItem('dream-whisper-streak');
    const streak = storedStreak ? parseInt(storedStreak, 10) : 1;
    setCurrentStreak(streak);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const exportJournal = () => {
    if (savedDreams.length === 0) {
      toast({
        title: "Nothing to export",
        description: "Your dream journal is empty."
      });
      return;
    }

    // Create a text representation of the dream journal
    let journalText = "# DREAM WHISPER JOURNAL\n\n";
    
    savedDreams.forEach(dream => {
      journalText += `## ${formatDate(dream.date)}\n\n`;
      journalText += `### Dream:\n${dream.content}\n\n`;
      journalText += `### Interpretation:\n${dream.interpretation}\n\n`;
      journalText += "---\n\n";
    });

    // Create a blob and download it
    const blob = new Blob([journalText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dream-journal.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Journal Exported",
      description: "Your dream journal has been exported as a text file."
    });
  };

  const clearJournal = () => {
    if (confirm("Are you sure you want to clear your dream journal? This cannot be undone.")) {
      localStorage.removeItem('dream-whisper-journal');
      setSavedDreams([]);
      toast({
        title: "Journal Cleared",
        description: "Your dream journal has been cleared."
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={`rounded-full absolute top-4 right-14 backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-background/20 text-dream-purple hover:bg-background/30 hover:text-purple-300' 
              : 'bg-white/30 text-dream-orange hover:bg-white/40 hover:text-orange-500'
          }`}
        >
          <Book className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className={`${
        isDarkMode 
          ? 'bg-dream-dark/90 backdrop-blur-xl text-white border-dream-purple/30' 
          : 'bg-dream-warmWhite/90 backdrop-blur-xl text-dream-dark border-dream-orange/30'
      }`}>
        <SheetHeader>
          <SheetTitle className={`${
            isDarkMode ? 'text-dream-purple' : 'text-dream-orange'
          } flex items-center gap-2`}>
            <Book className="h-5 w-5" />
            <span>Dream Journal</span>
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Track and review your dream interpretations
          </SheetDescription>
        </SheetHeader>
        
        <JournalHeader 
          isDarkMode={isDarkMode}
          currentStreak={currentStreak}
          exportJournal={exportJournal}
          clearJournal={clearJournal}
        />
        
        <JournalContent 
          isDarkMode={isDarkMode}
          savedDreams={savedDreams}
          formatDate={formatDate}
        />
      </SheetContent>
    </Sheet>
  );
};

export default DreamJournal;
