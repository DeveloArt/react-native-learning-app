
import { GoogleGenAI, Type } from "@google/genai";

export async function explainWord(word: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the usage and cultural context of the Spanish word "${word}" in 2-3 sentences. Keep it friendly for a language learner.`,
      config: {
        maxOutputTokens: 150,
        temperature: 0.7,
      },
    });
    return response.text || "No explanation available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is currently resting. Try again later!";
  }
}

export async function getDailyTip(): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Give me a single short tip (max 20 words) for learning Spanish faster today.",
      config: {
        maxOutputTokens: 50,
      },
    });
    return response.text || "Keep practicing!";
  } catch (error) {
    return "Consistency is key to mastering Spanish!";
  }
}
