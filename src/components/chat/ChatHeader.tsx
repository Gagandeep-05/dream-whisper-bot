
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookmarkPlus } from 'lucide-react';

interface ChatHeaderProps {
  isDarkMode: boolean;
  canSaveDream: boolean;
  onSaveDream: () => void;
}

const ChatHeader = ({ 
  isDarkMode, 
  canSaveDream, 
  onSaveDream
}: ChatHeaderProps) => {

  return (
    <div className={`p-2 border-b flex justify-between items-center ${
      isDarkMode ? 'bg-card/50' : 'bg-white/50 border-dream-orange/10'
    }`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onSaveDream}
        disabled={!canSaveDream}
        className={`flex items-center gap-1 text-xs ${
          !canSaveDream ? 'opacity-50' : ''
        } ${
          isDarkMode ? '' : 'text-dream-orange hover:text-dream-orange/90'
        }`}
      >
        <BookmarkPlus className="h-3 w-3" />
        Save Dream
      </Button>
      
      <div className="text-xs text-muted-foreground opacity-70">
        Powered by Gemini AI
      </div>
    </div>
  );
};

export default ChatHeader;
