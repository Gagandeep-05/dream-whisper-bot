
import { getResponseForDream } from "../utils/dreamInterpretations";

// The OpenRouter API URL
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
// Updated OpenRouter API key (free tier)
const DEFAULT_OPENROUTER_API_KEY = "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";

export const generateAIResponse = async (
  dreamText: string, 
  customApiKey?: string
): Promise<{ response: string; usingFallback: boolean }> => {
  // Try with primary model first
  try {
    // Use user-provided key if available, otherwise use embedded key
    const apiKey = (customApiKey && customApiKey.trim() !== '') ? customApiKey : DEFAULT_OPENROUTER_API_KEY;
    
    console.log("Attempting OpenRouter API request with Claude model...");
    
    const requestPayload = {
      model: "anthropic/claude-instant-1.2", // Using Claude Instant - fast and reliable free tier model
      messages: [
        {
          role: "user",
          content: `You are a dream interpreter AI named Dream Whisper. Analyze this dream and provide insightful psychological interpretation in 3-5 sentences. Focus on symbolism, emotions, and possible real-life connections. Be mystical but insightful. Dream: "${dreamText}"`
        }
      ],
      max_tokens: 300
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
      return { response: aiResponse, usingFallback: false };
    }
    
    throw new Error("Unexpected OpenRouter API response format");
  } catch (error) {
    console.error("AI API error:", error);
    
    // Try with a more widely available free model as fallback
    try {
      const apiKey = (customApiKey && customApiKey.trim() !== '') ? customApiKey : DEFAULT_OPENROUTER_API_KEY;
      
      console.log("First model failed, trying fallback with gpt2...");
      
      const fallbackPayload = {
        model: "openai/gpt-3.5-turbo", // Very reliable fallback model
        messages: [
          {
            role: "user",
            content: `You are a dream interpreter AI named Dream Whisper. Analyze this dream and provide insightful psychological interpretation in 3-5 sentences. Focus on symbolism, emotions, and possible real-life connections. Be mystical but insightful. Dream: "${dreamText}"`
          }
        ],
        max_tokens: 300
      };
      
      const fallbackResponse = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.href,
          "X-Title": "Dream Whisper",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fallbackPayload),
      });
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        if (fallbackData && fallbackData.choices && fallbackData.choices.length > 0) {
          const fallbackAiResponse = fallbackData.choices[0].message.content;
          console.log("Successfully received fallback AI response");
          return { response: fallbackAiResponse, usingFallback: false };
        }
      }
      
      throw new Error("Fallback model also failed");
    } catch (fallbackError) {
      console.error("Both AI models failed:", fallbackError);
      // Fall back to local interpretations as last resort
      return { response: getResponseForDream(dreamText), usingFallback: true };
    }
  }
};
