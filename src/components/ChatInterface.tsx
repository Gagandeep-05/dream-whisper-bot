
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';

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
    response: "Flying in dreams typically symbolizes freedom, breaking free from limitations, or gaining a new perspective on life. It might reflect your desire for liberation from constraints or your ability to rise above challenges."
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
    response: "Water in dreams often symbolizes your emotional state. Calm water may represent peace of mind, while turbulent water could indicate emotional turmoil. Deep water might suggest exploring your unconscious mind."
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
  // Convert to lowercase for easier matching
  const dreamLower = dreamDescription.toLowerCase();
  
  // Find matching interpretations based on keywords
  const matchingInterpretations = dreamInterpretations.filter(item => 
    item.keywords.some(keyword => dreamLower.includes(keyword))
  );
  
  if (matchingInterpretations.length > 0) {
    // If multiple matches, choose one randomly for variety
    const randomIndex = Math.floor(Math.random() * matchingInterpretations.length);
    return matchingInterpretations[randomIndex].response;
  }
  
  // Default response if no keywords match
  return "Your dream appears to be unique. Dreams often reflect our subconscious processing daily experiences and emotions. The symbols in your dream may represent aspects of yourself or situations you're currently navigating. Consider how the emotions in your dream relate to your waking life.";
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const response = getResponseForDream(input);
      
      const aiMessage = {
        id: messages.length + 2,
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col bg-card/30 backdrop-blur-sm border rounded-xl h-[500px] shadow-lg">
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
