
// Use correct import for GoogleGenAI and Type
import { GoogleGenAI, Type } from "@google/genai";

// Initialize with process.env.API_KEY directly, as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getAccountValuation(
  rank: string, 
  level: number, 
  rareItems: string[]
): Promise<any> {
  const prompt = `Analyze a Free Fire game account for the Indian market.
    Rank: ${rank}
    Level: ${level}
    Rare Items: ${rareItems.join(', ')}
    
    Provide a fair market valuation in Indian Rupees (INR), a professional marketplace title, and a compelling description focusing on the value of these items for a buyer. Output MUST be in JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedPrice: { type: Type.NUMBER },
            suggestedTitle: { type: Type.STRING },
            generatedDescription: { type: Type.STRING },
            highlights: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["estimatedPrice", "suggestedTitle", "generatedDescription", "highlights"]
        }
      }
    });

    // Access .text property directly
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Valuation Error:", error);
    return null;
  }
}

export async function verifyProfileScreenshot(
  base64Image: string,
  expectedCode: string
): Promise<{ verified: boolean; confidence: number; reason: string }> {
  const prompt = `Look at this Free Fire profile screenshot. Search for a verification code: "${expectedCode}" in the signature, bio, or status message section of the player profile. 
  Determine if the code is present and clearly visible. 
  Respond with JSON containing 'verified' (boolean), 'confidence' (number 0-1), and 'reason' (string).`;

  try {
    // Use the recommended parts structure for multimodal input
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verified: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            reason: { type: Type.STRING }
          },
          required: ["verified", "confidence", "reason"]
        }
      }
    });

    // Access .text property directly
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Image Verification Error:", error);
    return { verified: false, confidence: 0, reason: "Error processing image." };
  }
}

export async function getSellerResponse(
  sellerName: string,
  accountTitle: string,
  chatHistory: { role: 'user' | 'model', text: string }[]
): Promise<string> {
  const systemInstruction = `You are ${sellerName}, a seller on FF SHELL India, an exchange for Free Fire accounts. 
  A potential buyer is asking you questions about your listing: "${accountTitle}". 
  Respond politely, professionally, and in a way that encourages a sale. 
  Keep responses concise (under 2 sentences). 
  If the buyer asks for a discount, be firm but polite, or offer a tiny reduction (max 5%). 
  Do not share personal contact info outside the platform.`;

  try {
    // Initialize chat with correct config format
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Send the last message to the model
    const lastMsg = chatHistory[chatHistory.length - 1].text;
    const response = await chat.sendMessage({ message: lastMsg });
    return response.text || "I'll check that and get back to you!";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Hey, I'm currently away. I'll message you back soon!";
  }
}
