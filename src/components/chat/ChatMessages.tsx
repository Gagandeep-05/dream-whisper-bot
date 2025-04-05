
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from '../ChatMessage';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  isDarkMode: boolean;
}

const ChatMessages = ({ 
  messages, 
  loading, 
  isDarkMode 
}: ChatMessagesProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
            isDarkMode={isDarkMode}
          />
        ))}
        {loading && (
          <ChatMessage
            message=""
            loading={true}
            timestamp={new Date()}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
