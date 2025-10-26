
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables.
if (!process.env.API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume it's always provided.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export interface GeminiResponse {
  text: string;
  sources?: { title: string; uri: string }[];
}

export async function getAIResponse(
  prompt: string,
  useThinkingMode: boolean
): Promise<GeminiResponse> {
  const systemInstruction = `You are a world-class fashion expert and personal stylist for the luxury brand 'Vailure'. Your style is modern, minimalist, and edgy, with a monochrome color palette. Answer user queries with this persona. Be helpful, insightful, and slightly aspirational. Refer to Vailure products when relevant. Keep responses concise and stylish.`;

  try {
    if (useThinkingMode) {
      // Use gemini-2.5-pro with max thinking budget for complex, creative, or in-depth queries.
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          thinkingConfig: { thinkingBudget: 32768 },
        },
      });
      return { text: response.text };
    } else {
      // Use gemini-2.5-flash with Google Search for up-to-date, factual information.
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      let sources: { title: string; uri: string }[] = [];
      if (groundingChunks) {
        sources = groundingChunks
          .map((chunk: any) => chunk.web)
          .filter((web: any) => web && web.uri)
          .map((web: any) => ({
            title: web.title || web.uri,
            uri: web.uri,
          }));
      }

      // Remove duplicate sources based on URI
      const uniqueSources = [...new Map(sources.map(item => [item.uri, item])).values()];

      return { text: response.text, sources: uniqueSources.length > 0 ? uniqueSources : undefined };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Provide a user-friendly error message
    return {
      text: "Apologies, I'm currently experiencing some technical difficulties. Please try again shortly.",
    };
  }
}
