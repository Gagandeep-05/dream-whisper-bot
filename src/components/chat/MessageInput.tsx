
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles } from 'lucide-react';

interface MessageInputProps {
  isDarkMode: boolean;
  loading: boolean;
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ 
  isDarkMode, 
  loading, 
  onSendMessage 
}: MessageInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className={`p-3 border-t transition-all duration-300 ${
      isDarkMode ? 'bg-card/50' : 'bg-white/50 border-dream-orange/10'
    }`}>
      <div className="flex gap-2 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Sparkles 
            className={`h-4 w-4 opacity-50 ${loading ? 'animate-spin' : 'animate-pulse'} ${
              isDarkMode ? 'text-dream-purple' : 'text-dream-orange'
            }`} 
          />
        </div>
        <Input
          placeholder="Describe your dream..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          className={`pl-10 transition-all duration-300 focus:ring-2 ${
            isDarkMode 
              ? 'bg-background/50 focus:ring-dream-purple/30' 
              : 'bg-white/70 focus:ring-dream-orange/30'
          }`}
        />
        <Button 
          onClick={handleSend} 
          disabled={input.trim() === '' || loading}
          size="icon"
          className={`transition-all duration-300 hover:scale-105 ${
            isDarkMode ? '' : 'bg-dream-orange hover:bg-dream-orange/90'
          }`}
        >
          <Send className={`h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
