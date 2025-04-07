
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyInputProps {
  isDarkMode: boolean;
  geminiKey: string;
  huggingfaceKey: string;
  onSave: (key: string, type: 'gemini' | 'huggingface') => void;
}

const ApiKeyInput = ({ isDarkMode, geminiKey, huggingfaceKey, onSave }: ApiKeyInputProps) => {
  const [geminiApiKey, setGeminiApiKey] = useState<string>(geminiKey || '');
  const [huggingFaceApiKey, setHuggingFaceApiKey] = useState<string>(huggingfaceKey || '');
  const { toast } = useToast();

  const handleSaveGeminiKey = () => {
    if (geminiApiKey.trim()) {
      onSave(geminiApiKey, 'gemini');
    }
  };

  const handleSaveHuggingFaceKey = () => {
    if (huggingFaceApiKey.trim()) {
      onSave(huggingFaceApiKey, 'huggingface');
    }
  };

  return (
    <div className={`p-3 border-b transition-all duration-300 animate-fade-in ${
      isDarkMode ? 'bg-card/50' : 'bg-white/50 border-dream-orange/10'
    }`}>
      <Tabs defaultValue="gemini" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="gemini">Gemini API</TabsTrigger>
          <TabsTrigger value="huggingface">HuggingFace API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gemini" className="animate-fade-in">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">Enter your Gemini API key for enhanced dream interpretation:</p>
            
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Gemini API Key"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className={`text-sm ${
                  isDarkMode ? 'bg-background/50' : 'bg-white/70'
                }`}
              />
              <Button 
                onClick={handleSaveGeminiKey} 
                disabled={!geminiApiKey.trim()}
                size="sm"
                className={`transition-all hover:scale-105 ${isDarkMode ? '' : 'bg-dream-orange hover:bg-dream-orange/90'}`}
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
        </TabsContent>
        
        <TabsContent value="huggingface" className="animate-fade-in">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">Enter your HuggingFace API key for alternative dream analysis:</p>
            
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="HuggingFace API Key"
                value={huggingFaceApiKey}
                onChange={(e) => setHuggingFaceApiKey(e.target.value)}
                className={`text-sm ${
                  isDarkMode ? 'bg-background/50' : 'bg-white/70'
                }`}
              />
              <Button 
                onClick={handleSaveHuggingFaceKey} 
                disabled={!huggingFaceApiKey.trim()}
                size="sm"
                className={`transition-all hover:scale-105 ${isDarkMode ? '' : 'bg-dream-orange hover:bg-dream-orange/90'}`}
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Get your free HuggingFace API key at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className={`underline ${
                isDarkMode ? 'hover:text-primary' : 'hover:text-dream-orange'
              }`}>huggingface.co</a>
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiKeyInput;
