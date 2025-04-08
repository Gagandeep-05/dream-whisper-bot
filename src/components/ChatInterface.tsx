import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';
import MessageInput from './chat/MessageInput';
import ApiKeyInput from './chat/ApiKeyInput';
import { generateAIResponse } from '../services/dreamInterpreter';
import { getResponseForDream } from '../utils/dreamInterpretations';

interface ChatInterfaceProps {
  isDarkMode: boolean;
}

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages = [
  {
    id: 1,
    content: "Welcome to Dream Whisper! Describe your dream and I'll unravel its hidden meanings for you using Claude AI. What did you dream about?",
    isUser: false,
    timestamp: new Date()
  }
];

const ChatInterface = ({ isDarkMode }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('dream-whisper-api-key') || '');
  const [usingFallback, setUsingFallback] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (input: string) => {
    if (input.trim() === '') return;
    
    const userMessage = {
      id: messages.length + 1,
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setUsingFallback(false);
    
    try {
      console.log("Sending dream for interpretation:", input);
      const result = await generateAIResponse(input, apiKey);
      
      setUsingFallback(result.usingFallback);
      
      if (result.usingFallback) {
        toast({
          title: "Using Local Interpretations",
          description: "Could not connect to AI service. Using built-in interpretations instead.",
          variant: "destructive",
        });
      }
      
      const aiMessage = {
        id: messages.length + 2,
        content: result.response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setUsingFallback(true);
      
      toast({
        title: "Interpretation Error",
        description: "I'm having trouble interpreting dreams right now. Please try again later.",
        variant: "destructive",
      });
      
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

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('dream-whisper-api-key', key);
    
    toast({
      title: "OpenRouter API Key Updated",
      description: "Your API key has been saved for future sessions."
    });
  };
  
  return (
    <div className={`flex flex-col rounded-xl h-[500px] shadow-lg transition-all duration-500 ${
      isDarkMode
        ? 'bg-card/30 backdrop-blur-sm border border-white/20 animate-fade-in hover:border-primary/30'
        : 'bg-white/80 backdrop-blur-sm border border-dream-orange/20 animate-fade-in hover:border-dream-orange/30'
    }`}>
      <ChatHeader 
        isDarkMode={isDarkMode} 
        onShowApiInput={() => setShowApiInput(!showApiInput)}
        showApiInput={showApiInput}
        usingFallback={usingFallback}
      />
      
      {showApiInput && (
        <ApiKeyInput 
          isDarkMode={isDarkMode} 
          geminiKey={apiKey}
          onSave={handleSaveApiKey}
        />
      )}
      
      <ChatMessages 
        messages={messages}
        loading={loading}
        isDarkMode={isDarkMode}
      />
      
      <MessageInput 
        isDarkMode={isDarkMode}
        loading={loading}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatInterface;
