
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

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
    <div className={`p-3 border-t ${
      isDarkMode ? 'bg-card/50' : 'bg-white/50 border-dream-orange/10'
    }`}>
      <div className="flex gap-2">
        <Input
          placeholder="Describe your dream..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          className={isDarkMode ? 'bg-background/50' : 'bg-white/70'}
        />
        <Button 
          onClick={handleSend} 
          disabled={input.trim() === '' || loading}
          size="icon"
          className={isDarkMode ? '' : 'bg-dream-orange hover:bg-dream-orange/90'}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
