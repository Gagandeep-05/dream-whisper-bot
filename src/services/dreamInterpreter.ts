
import { getResponseForDream } from "../utils/dreamInterpretations";
import { useToast } from "@/hooks/use-toast";

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

export const generateAIResponse = async (dreamText: string, apiKey: string): Promise<string> => {
  const toast = useToast();
  
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
    toast.toast({
      title: "AI Service Unavailable",
      description: "Using built-in interpretations instead.",
      variant: "destructive",
    });
  }
  
  return getResponseForDream(dreamText);
};
