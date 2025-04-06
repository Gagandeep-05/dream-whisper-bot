
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ApiKeyInputProps {
  isDarkMode: boolean;
  onSave: (key: string) => void;
}

const ApiKeyInput = ({ isDarkMode, onSave }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('dream-whisper-api-key') || '');
  const [apiType, setApiType] = useState<string>(localStorage.getItem('dream-whisper-api-type') || 'huggingface');
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      // Store the API key
      localStorage.setItem('dream-whisper-api-key', apiKey);
      // Store the API type
      localStorage.setItem('dream-whisper-api-type', apiType);
      
      toast({
        title: "API Key Saved",
        description: `Your ${apiType === 'gemini' ? 'Gemini' : 'Hugging Face'} API key has been saved for future sessions.`
      });
      
      onSave(apiKey);
    }
  };

  return (
    <div className={`p-3 border-b ${
      isDarkMode ? 'bg-card/50' : 'bg-white/50 border-dream-orange/10'
    }`}>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">Select an AI provider and enter your API key for enhanced dream interpretation:</p>
        
        <Select value={apiType} onValueChange={setApiType}>
          <SelectTrigger className={`w-full text-sm ${
            isDarkMode ? 'bg-background/50' : 'bg-white/70'
          }`}>
            <SelectValue placeholder="Select API Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="huggingface">Hugging Face</SelectItem>
            <SelectItem value="gemini">Google Gemini</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder={apiType === 'gemini' ? 'Gemini API Key' : 'Hugging Face API Key'}
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
          {apiType === 'gemini' ? (
            <>Get your free Gemini API key at <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className={`underline ${
              isDarkMode ? 'hover:text-primary' : 'hover:text-dream-orange'
            }`}>ai.google.dev</a></>
          ) : (
            <>Get your free Hugging Face API key at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className={`underline ${
              isDarkMode ? 'hover:text-primary' : 'hover:text-dream-orange'
            }`}>huggingface.co</a></>
          )}
        </p>
      </div>
    </div>
  );
};

export default ApiKeyInput;
