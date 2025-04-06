
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";

interface ApiKeyInputProps {
  isDarkMode: boolean;
  onSave: (key: string) => void;
}

const ApiKeyInput = ({ isDarkMode, onSave }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('dream-whisper-api-key') || '');
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      // Store the API key
      localStorage.setItem('dream-whisper-api-key', apiKey);
      
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been saved for future sessions."
      });
      
      onSave(apiKey);
    }
  };

  return (
    <div className={`p-3 border-b ${
      isDarkMode ? 'bg-card/50' : 'bg-white/50 border-dream-orange/10'
    }`}>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">Enter your Gemini API key for enhanced dream interpretation:</p>
        
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="Gemini API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className={`text-sm ${
              isDarkMode ? 'bg-background/50' : 'bg-white/70'
            }`}
          />
          <Button 
            onClick={handleSaveApiKey} 
            disabled={!apiKey.trim()}
            size="sm"
            className={isDarkMode ? '' : 'bg-dream-orange hover:bg-dream-orange/90'}
          >
            Save
          </Button>
        </div>
        <p className="text-xs text-muted-foreground italic">
          Get your free Gemini API key at <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className={`underline ${
            isDarkMode ? 'hover:text-primary' : 'hover:text-dream-orange'
          }`}>ai.google.dev</a>
        </p>
      </div>
    </div>
  );
};

export default ApiKeyInput;
