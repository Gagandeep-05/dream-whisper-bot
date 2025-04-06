
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';
import MessageInput from './chat/MessageInput';
import { generateAIResponse } from '../services/dreamInterpreter';
import { saveDreamToJournal } from '../utils/dreamJournal';

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
    content: "Welcome to Dream Whisper! Describe your dream and I'll unravel its hidden meanings for you using Google's Gemini AI. What did you dream about?",
    isUser: false,
    timestamp: new Date()
  }
];

const ChatInterface = ({ isDarkMode }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [canSaveDream, setCanSaveDream] = useState(false);
  const [lastUserDream, setLastUserDream] = useState('');
  const [lastAiResponse, setLastAiResponse] = useState('');

  useEffect(() => {
    if (messages.length >= 3) {
      const userMessageIndex = messages.findIndex(m => m.isUser);
      if (userMessageIndex !== -1 && userMessageIndex < messages.length - 1) {
        const aiResponseIndex = messages.findIndex((m, i) => !m.isUser && i > userMessageIndex);
        if (aiResponseIndex !== -1) {
          setCanSaveDream(true);
          setLastUserDream(messages[userMessageIndex].content);
          setLastAiResponse(messages[aiResponseIndex].content);
          return;
        }
      }
    }
    setCanSaveDream(false);
  }, [messages]);

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

  const handleSaveDream = () => {
    saveDreamToJournal(lastUserDream, lastAiResponse);
    toast({
      title: "Dream Saved",
      description: "Your dream has been saved to your journal."
    });
  };
  
  return (
    <div className={`flex flex-col rounded-xl h-[500px] shadow-lg ${
      isDarkMode
        ? 'bg-card/30 backdrop-blur-sm border border-white/20'
        : 'bg-white/80 backdrop-blur-sm border border-dream-orange/20'
    }`}>
      <ChatHeader 
        isDarkMode={isDarkMode}
        canSaveDream={canSaveDream}
        onSaveDream={handleSaveDream}
      />
      
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
