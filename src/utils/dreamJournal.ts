
import { v4 as uuidv4 } from 'uuid';

interface SavedDream {
  id: string;
  date: Date;
  content: string;
  interpretation: string;
  streak: number;
}

export const saveDreamToJournal = (
  dreamContent: string, 
  interpretation: string
): void => {
  const savedDreamsJson = localStorage.getItem('dream-whisper-journal');
  let savedDreams: SavedDream[] = savedDreamsJson ? JSON.parse(savedDreamsJson) : [];
  
  const storedStreak = localStorage.getItem('dream-whisper-streak');
  let currentStreak = storedStreak ? parseInt(storedStreak, 10) : 0;
  
  const today = new Date();
  const todayString = today.toDateString();
  const hasDreamToday = savedDreams.some((dream) => {
    const dreamDate = new Date(dream.date).toDateString();
    return dreamDate === todayString;
  });
  
  if (!hasDreamToday) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    const hadDreamYesterday = savedDreams.some((dream) => {
      const dreamDate = new Date(dream.date).toDateString();
      return dreamDate === yesterdayString;
    });
    
    if (hadDreamYesterday || savedDreams.length === 0) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }
    
    localStorage.setItem('dream-whisper-streak', currentStreak.toString());
  }
  
  const newDream: SavedDream = {
    id: uuidv4(),
    date: new Date(),
    content: dreamContent,
    interpretation: interpretation,
    streak: currentStreak
  };
  
  savedDreams = [newDream, ...savedDreams];
  localStorage.setItem('dream-whisper-journal', JSON.stringify(savedDreams));
};
