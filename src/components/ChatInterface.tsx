
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, RefreshCw } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages = [
  {
    id: 1,
    content: "Welcome to Dream Whisper! Describe your dream and I'll unravel its hidden meanings for you. What did you dream about?",
    isUser: false,
    timestamp: new Date()
  }
];

const dreamInterpretations = [
  {
    keywords: ['falling', 'fell'],
    response: "Dreams about falling often represent insecurity, anxiety, or feeling that you're losing grip on something important in your life. It may suggest you feel out of control or overwhelmed by circumstances."
  },
  {
    keywords: ['flying', 'flew', 'float'],
    response: "Flying in dreams typically symbolize freedom, breaking free from limitations, or gaining a new perspective on life. It might reflect your desire for liberation from constraints or your ability to rise above challenges."
  },
  {
    keywords: ['teeth', 'tooth', 'losing teeth'],
    response: "Dreams about losing teeth often relate to anxiety about appearance, communication, or power. They may reflect fears about how others perceive you or concerns about losing your ability to communicate effectively."
  },
  {
    keywords: ['chase', 'chased', 'running', 'pursued'],
    response: "Being chased in dreams typically represents avoiding a person or issue. This could symbolize running away from your fears or refusing to acknowledge an uncomfortable situation in your waking life."
  },
  {
    keywords: ['water', 'ocean', 'sea', 'swimming', 'flood'],
    response: "Water in dreams often symbolize your emotional state. Calm water may represent peace of mind, while turbulent water could indicate emotional turmoil. Deep water might suggest exploring your unconscious mind."
  },
  {
    keywords: ['death', 'dying', 'dead'],
    response: "Dreams about death rarely predict actual death. Instead, they typically symbolize the end of something—perhaps a relationship, job, or phase of life—making way for new beginnings and transformation."
  },
  {
    keywords: ['naked', 'nude', 'clothes'],
    response: "Dreams of being naked or inappropriately dressed in public often reflect feelings of vulnerability, exposure, or imposter syndrome. They might indicate anxiety about being 'seen' for who you truly are."
  },
  {
    keywords: ['test', 'exam', 'school', 'studying'],
    response: "Test or exam dreams typically represent self-evaluation or fear of failure. They often appear when you're facing a challenging situation or feeling unprepared for something important in your life."
  },
];

const getResponseForDream = (dreamDescription: string) => {
  const dreamLower = dreamDescription.toLowerCase();
  
  const matchingInterpretations = dreamInterpretations.filter(item => 
    item.keywords.some(keyword => dreamLower.includes(keyword))
  );
  
  if (matchingInterpretations.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchingInterpretations.length);
    return matchingInterpretations[randomIndex].response;
  }
  
  return "Your dream appears to be unique. Dreams often reflect our subconscious processing daily experiences and emotions. The symbols in your dream may represent aspects of yourself or situations you're currently navigating. Consider how the emotions in your dream relate to your waking life.";
};

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('dream-whisper-api-key') || '');
  const [showApiInput, setShowApiInput] = useState<boolean>(!localStorage.getItem('dream-whisper-api-key'));

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const generateAIResponse = async (dreamText: string) => {
    try {
      if (apiKey) {
        const response = await fetch(HUGGINGFACE_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            inputs: `You are a dream interpreter AI named Dream Whisper. Analyze this dream and provide insightful psychological interpretation in 3-5 sentences. Focus on symbolism, emotions, and possible real-life connections. Be mystical but insightful. Dream: "${dreamText}"`,
            parameters: {
              max_new_tokens: 250,
              temperature: 0.7,
              top_p: 0.9,
              do_sample: true
            }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data[0] && data[0].generated_text) {
            const fullText = data[0].generated_text;
            const aiResponse = fullText.substring(fullText.indexOf(dreamText) + dreamText.length);
            return aiResponse.trim();
          }
        }
        
        throw new Error("API response format unexpected");
      }
    } catch (error) {
      console.error("AI API error:", error);
      toast({
        title: "AI Service Unavailable",
        description: "Using built-in interpretations instead.",
        variant: "destructive",
      });
    }
    
    return getResponseForDream(dreamText);
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('dream-whisper-api-key', apiKey);
      setShowApiInput(false);
      toast({
        title: "API Key Saved",
        description: "Your API key has been saved for future sessions."
      });
    }
  };

  const handleUpdateApiKey = () => {
    setShowApiInput(true);
    toast({
      title: "Update API Key",
      description: "You can now enter a new API key."
    });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    const userMessage = {
      id: messages.length + 1,
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await generateAIResponse(input);
      
      const aiMessage = {
        id: messages.length + 2,
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage = {
        id: messages.length + 2,
        content: "I'm having trouble interpreting dreams right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-card/30 backdrop-blur-sm border rounded-xl h-[500px] shadow-lg">
      {showApiInput ? (
        <div className="p-3 border-b bg-card/50">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">Enter your Hugging Face API key for enhanced dream interpretation:</p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Hugging Face API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-background/50 text-sm"
              />
              <Button 
                onClick={handleSaveApiKey} 
                disabled={!apiKey.trim()}
                size="sm"
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Get your free API key at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">huggingface.co</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="p-2 border-b bg-card/50 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpdateApiKey}
            className="flex items-center gap-1 text-xs"
          >
            <RefreshCw className="h-3 w-3" />
            Update API Key
          </Button>
        </div>
      )}
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {loading && (
            <ChatMessage
              message=""
              loading={true}
              timestamp={new Date()}
            />
          )}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t bg-card/50">
        <div className="flex gap-2">
          <Input
            placeholder="Describe your dream..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="bg-background/50"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={input.trim() === '' || loading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
