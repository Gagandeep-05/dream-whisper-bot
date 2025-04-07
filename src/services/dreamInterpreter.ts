
import { getResponseForDream } from "../utils/dreamInterpretations";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5";
const EMBEDDED_API_KEY = "AIzaSyCT5qQlbQA-qOQpk47x5XiEfjNQS0iMezw";

export const generateAIResponse = async (
  dreamText: string, 
  geminiApiKey?: string,
  huggingfaceApiKey?: string
): Promise<string> => {
  // First try HuggingFace if key is available
  if (huggingfaceApiKey && huggingfaceApiKey.trim() !== '') {
    try {
      const response = await fetch(HUGGINGFACE_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${huggingfaceApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `You are a dream interpreter AI named Dream Whisper. Analyze this dream and provide insightful psychological interpretation in 3-5 sentences. Focus on symbolism, emotions, and possible real-life connections. Be mystical but insightful. Dream: "${dreamText}"`,
          parameters: {
            temperature: 0.7,
            max_new_tokens: 250,
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data[0] && data[0].generated_text) {
          // Extract only the generated part, not the prompt
          const fullText = data[0].generated_text;
          const generatedText = fullText.substring(fullText.indexOf(dreamText) + dreamText.length).trim();
          return generatedText || fullText; // Fallback to full text if we can't extract
        }
      }
      
      // If HuggingFace fails, try Gemini next (no need to throw)
      console.log("HuggingFace API response format unexpected or failed, trying Gemini...");
    } catch (error) {
      console.error("HuggingFace API error:", error);
      // Continue to Gemini
    }
  }

  // Then try Gemini
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
