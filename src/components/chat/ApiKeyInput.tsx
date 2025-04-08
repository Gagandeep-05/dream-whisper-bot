
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { Lock, Info } from 'lucide-react';

interface ApiKeyInputProps {
  isDarkMode: boolean;
  geminiKey: string;
  onSave: (key: string) => void;
}

const ApiKeyInput = ({ isDarkMode, geminiKey, onSave }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState<string>(geminiKey || '');
  const { toast } = useToast();

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      onSave(apiKey);
      toast({
        title: "OpenRouter API Key Saved",
        description: "Your API key has been saved for future sessions."
      });
    }
  };

  return (
    <div className={`p-4 border-b transition-all duration-300 animate-fade-in ${
      isDarkMode ? 'bg-card/50' : 'bg-white/50 border-dream-orange/10'
    }`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Lock className={`h-4 w-4 ${isDarkMode ? 'text-blue-400' : 'text-dream-orange'}`} />
          <h3 className="text-sm font-medium">OpenRouter API Configuration</h3>
        </div>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3 text-xs text-blue-600 dark:text-blue-300">
          <div className="flex gap-2 items-start">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">OpenRouter API is configured!</p>
              <p>You can update your API key below if needed. Current key: {geminiKey ? "**********************************" : "Using default key"}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter new OpenRouter API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={`text-sm transition-all duration-300 hover:scale-[1.01] ${
                isDarkMode ? 'bg-background/50' : 'bg-white/70'
              }`}
            />
            <Button 
              onClick={handleSaveKey} 
              disabled={!apiKey.trim()}
              size="sm"
              className={`transition-all hover:scale-105 ${isDarkMode ? '' : 'bg-dream-orange hover:bg-dream-orange/90'}`}
            >
              Update
            </Button>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Using <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer" className={`underline ${
              isDarkMode ? 'hover:text-primary' : 'hover:text-dream-orange'
            }`}>OpenRouter</a> to access Gemini 2.5 Pro
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;
