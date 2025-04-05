
import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusCircle, Book, Calendar, Sparkles, Star } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
        </SheetHeader>
        
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
        
        {savedDreams.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center opacity-70">
            <Sparkles className={`h-10 w-10 mb-4 ${
              isDarkMode ? 'text-dream-purple/50' : 'text-dream-orange/50'
            }`} />
            <p className="mb-2">Your dream journal is empty</p>
            <p className="text-sm text-muted-foreground">Dreams you save will appear here</p>
          </div>
        ) : (
          <ScrollArea className="mt-6 h-[450px] pr-4">
            <div className="space-y-6">
              {savedDreams.map((dream) => (
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
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default DreamJournal;
