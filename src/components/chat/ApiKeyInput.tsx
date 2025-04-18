
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { Lock, Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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

  const clearKey = () => {
    setApiKey('');
    onSave('');
    toast({
      title: "API Key Cleared",
      description: "Now using the default API key."
    });
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
        
        <Alert className="bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm font-medium">Using Claude AI via OpenRouter</AlertTitle>
          <AlertDescription className="text-xs mt-1">
            <p>Using a free OpenRouter API key. You can provide your own key if you have one.</p>
            <p className="mt-1">Status: {geminiKey ? "Using custom API key" : "Using default API key"}</p>
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter OpenRouter API key..."
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
          {geminiKey && (
            <Button
              variant="outline" 
              size="sm" 
              onClick={clearKey}
              className="text-xs mt-1"
            >
              Clear key & use default
            </Button>
          )}
          <p className="text-xs text-muted-foreground italic mt-2">
            Get your free key at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className={`underline ${
              isDarkMode ? 'hover:text-primary' : 'hover:text-dream-orange'
            }`}>openrouter.ai/keys</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;
