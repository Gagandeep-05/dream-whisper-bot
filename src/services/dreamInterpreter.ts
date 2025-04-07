
import { getResponseForDream } from "../utils/dreamInterpretations";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
// Your provided Gemini API key
const EMBEDDED_API_KEY = "AIzaSyBA2ioj6vFF2PzchuZypXeoCWEiqYlsmLA";

export const generateAIResponse = async (
  dreamText: string, 
  geminiApiKey?: string,
  huggingfaceApiKey?: string
): Promise<string> => {
  // Try Gemini API
  try {
    // Use user-provided key if available, otherwise use embedded key
    const activeKey = (geminiApiKey && geminiApiKey.trim() !== '') ? geminiApiKey : EMBEDDED_API_KEY;
    
    const response = await fetch(`${GEMINI_API_URL}?key=${activeKey}`, {
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
    // Fall back to local interpretations
    return getResponseForDream(dreamText);
  }
};
