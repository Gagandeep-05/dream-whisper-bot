
import { getResponseForDream } from "../utils/dreamInterpretations";

// The OpenRouter API URL
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
// Your provided OpenRouter API key
const OPENROUTER_API_KEY = "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";

export const generateAIResponse = async (
  dreamText: string, 
  customApiKey?: string,
  huggingfaceApiKey?: string
): Promise<string> => {
  // Try OpenRouter API to access Gemini
  try {
    // Use user-provided key if available, otherwise use embedded key
    const apiKey = (customApiKey && customApiKey.trim() !== '') ? customApiKey : OPENROUTER_API_KEY;
    
    console.log("Attempting OpenRouter API request to access Gemini model...");
    
    const requestPayload = {
      model: "google/gemini-pro", // Using the stable Gemini model on OpenRouter
      messages: [
        {
          role: "user",
          content: `You are a dream interpreter AI named Dream Whisper. Analyze this dream and provide insightful psychological interpretation in 3-5 sentences. Focus on symbolism, emotions, and possible real-life connections. Be mystical but insightful. Dream: "${dreamText}"`
        }
      ]
    };
    
    console.log("Request payload:", JSON.stringify(requestPayload, null, 2));
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.href, // Site URL for OpenRouter analytics
        "X-Title": "Dream Whisper", // App name for OpenRouter analytics
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload),
    });

    console.log("API response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error response:", errorText);
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }
    
    const responseData = await response.json();
    console.log("API response data:", JSON.stringify(responseData, null, 2));

    if (responseData && responseData.choices && responseData.choices.length > 0) {
      const aiResponse = responseData.choices[0].message.content;
      console.log("Successfully received AI response:", aiResponse.substring(0, 50) + "...");
      return aiResponse;
    }
    
    throw new Error("Unexpected OpenRouter API response format");
  } catch (error) {
    console.error("AI API error:", error);
    // Fall back to local interpretations
    return getResponseForDream(dreamText);
  }
};
