
import { getResponseForDream } from "../utils/dreamInterpretations";
import { useToast } from "@/hooks/use-toast";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const EMBEDDED_API_KEY = "AIzaSyCT5qQlbQA-qOQpk47x5XiEfjNQS0iMezw";

export const generateAIResponse = async (dreamText: string): Promise<string> => {
  const toast = useToast();
  
  try {
    // Always use the embedded Gemini API key
    const response = await fetch(`${GEMINI_API_URL}?key=${EMBEDDED_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a dream interpreter AI named Dream Whisper. Analyze this dream and provide insightful psychological interpretation in 3-5 sentences. Focus on symbolism, emotions, and possible real-life connections. Be mystical but insightful. Dream: "${dreamText}"`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 250,
        }
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text.trim();
      }
    }
    
    throw new Error("Gemini API response format unexpected");
  } catch (error) {
    console.error("AI API error:", error);
    toast.toast({
      title: "AI Service Unavailable",
      description: "Using built-in interpretations instead.",
      variant: "destructive",
    });
  }
  
  return getResponseForDream(dreamText);
};
