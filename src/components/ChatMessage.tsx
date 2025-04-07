
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
  timestamp?: Date;
  loading?: boolean;
  isDarkMode?: boolean;
}

const ChatMessage = ({ 
  message, 
  isUser = false, 
  timestamp = new Date(),
  loading = false,
  isDarkMode = true
}: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser 
        ? "flex-row-reverse animate-slide-in-right" 
        : "animate-slide-in-left"
    )}>
      <Avatar className={cn(
        "h-8 w-8 border transition-all duration-300 hover:scale-110",
        isUser 
          ? isDarkMode 
            ? "bg-accent/20 border-accent/30" 
            : "bg-dream-orange/20 border-dream-orange/30"
          : isDarkMode 
            ? "bg-primary/20 border-primary/30" 
            : "bg-dream-orange/20 border-dream-orange/30"
      )}>
        <AvatarFallback>
          {isUser ? 'U' : 'DW'}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "rounded-xl p-3 max-w-[80%] transition-all duration-300 hover:shadow-md",
        isUser 
          ? isDarkMode 
            ? "bg-accent/10 border border-accent/20 text-right" 
            : "bg-dream-orange/10 border border-dream-orange/20 text-right"
          : isDarkMode 
            ? "bg-primary/10 border border-primary/20" 
            : "bg-dream-orange/10 border border-dream-orange/20"
      )}>
        {loading ? (
          <div className="flex items-center justify-center space-x-1 h-6 py-2">
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-primary' : 'bg-dream-orange'
            }`}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-primary' : 'bg-dream-orange'
            }`} style={{animationDelay: '0.2s'}}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-primary' : 'bg-dream-orange'
            }`} style={{animationDelay: '0.4s'}}></div>
          </div>
        ) : (
          <>
            <p className="text-sm">{message}</p>
            <div className={cn(
              "text-[10px] text-muted-foreground mt-1",
              isUser ? "text-right" : ""
            )}>
              {timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
