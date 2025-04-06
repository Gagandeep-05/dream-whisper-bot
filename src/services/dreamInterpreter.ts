
import { getResponseForDream } from "../utils/dreamInterpretations";
import { useToast } from "@/hooks/use-toast";

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const generateAIResponse = async (dreamText: string, apiKey: string): Promise<string> => {
  const toast = useToast();
  
  try {
    // Check if API key is for Gemini (starts with "AI")
    if (apiKey && apiKey.startsWith("AI")) {
      // Gemini API integration
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
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
    } 
    // HuggingFace API (original implementation)
    else if (apiKey) {
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
    toast.toast({
      title: "AI Service Unavailable",
      description: "Using built-in interpretations instead.",
      variant: "destructive",
    });
  }
  
  return getResponseForDream(dreamText);
};
