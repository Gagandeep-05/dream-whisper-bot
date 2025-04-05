
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, BookmarkPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ChatHeaderProps {
  isDarkMode: boolean;
  canSaveDream: boolean;
  onSaveDream: () => void;
  onUpdateApiKey: () => void;
}

const ChatHeader = ({ 
  isDarkMode, 
  canSaveDream, 
  onSaveDream, 
  onUpdateApiKey 
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
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onUpdateApiKey}
        className={`flex items-center gap-1 text-xs ${
          isDarkMode ? '' : 'text-dream-orange hover:text-dream-orange/90'
        }`}
      >
        <RefreshCw className="h-3 w-3" />
        Update API Key
      </Button>
    </div>
  );
};

export default ChatHeader;
