
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
  timestamp?: Date;
  loading?: boolean;
}

const ChatMessage = ({ 
  message, 
  isUser = false, 
  timestamp = new Date(),
  loading = false 
}: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4 animate-fade-in",
      isUser ? "flex-row-reverse" : ""
    )}>
      <Avatar className={cn(
        "h-8 w-8 border",
        isUser ? "bg-accent/20 border-accent/30" : "bg-primary/20 border-primary/30"
      )}>
        <AvatarFallback>
          {isUser ? 'U' : 'DW'}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "rounded-xl p-3 max-w-[80%]",
        isUser ? 
          "bg-accent/10 border border-accent/20 text-right" : 
          "bg-primary/10 border border-primary/20"
      )}>
        {loading ? (
          <div className="flex items-center justify-center space-x-1 h-6 py-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{animationDelay: '0.4s'}}></div>
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
