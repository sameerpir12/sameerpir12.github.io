
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are an expert summarizer and political analyst. Your task is to perform two actions on the given text:
1. Produce a concise, neutral, and unbiased summary in the form of a simple, easy-to-understand bulleted list. Each bullet point should represent a key fact. Remove any loaded language, emotional appeals, or opinions.
2. Analyze the political leaning of the original text and provide a score from -10 (very left-leaning) to 10 (very right-leaning), with 0 being perfectly neutral or centrist.

You MUST return your response as a JSON object that strictly follows this schema:
{
  "summary": "The unbiased summary as a bulleted list string. Each point should start with a dash and a space, e.g., '- First point\\n- Second point'",
  "politicalScore": <a number between -10 and 10>
}
Do not add any text, formatting, or markdown specifiers like \`\`\`json outside of the JSON object.`;

interface AnalysisResult {
  summary: string;
  politicalScore: number;
}

export async function analyzeAndSummarizeText(text: string): Promise<AnalysisResult> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: text,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "The unbiased summary as a bulleted list string." },
                politicalScore: { type: Type.NUMBER, description: "A score from -10 to 10 indicating political leaning." }
            },
            required: ["summary", "politicalScore"]
        }
      },
    });

    const resultText = response.text.trim();
    const result = JSON.parse(resultText);
    
    // Clamp the score to be within the -10 to 10 range just in case
    result.politicalScore = Math.max(-10, Math.min(10, result.politicalScore));

    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate summary and analysis. The AI model may have had trouble processing the input. Please try again with a different text.");
  }
}