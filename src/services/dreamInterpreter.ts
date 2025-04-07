
import { getResponseForDream } from "../utils/dreamInterpretations";

// The Gemini API URL
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";
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
    
    console.log("Attempting Gemini API request...");
    
    const requestPayload = {
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
    };
    
    console.log("Request payload:", JSON.stringify(requestPayload, null, 2));
    
    const response = await fetch(`${GEMINI_API_URL}?key=${activeKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    console.log("API response status:", response.status);
    
    const responseData = await response.json();
    console.log("API response data:", JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      throw new Error(`Gemini API error: ${responseData.error?.message || response.statusText}`);
    }

    if (responseData && responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content) {
      const aiResponse = responseData.candidates[0].content.parts[0].text.trim();
      console.log("Successfully received AI response:", aiResponse.substring(0, 50) + "...");
      return aiResponse;
    }
    
    throw new Error("Unexpected Gemini API response format");
  } catch (error) {
    console.error("AI API error:", error);
    // Fall back to local interpretations
    return getResponseForDream(dreamText);
  }
};
