
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are an expert summarizer and political analyst. Your task is to perform three actions on the given text:
1. Produce a concise, neutral, and unbiased summary in the form of a simple, easy-to-understand bulleted list. Each bullet point should represent a key fact. Remove any loaded language, emotional appeals, or opinions.
2. Analyze the political leaning of the original text and provide a score from -10 (very left-leaning) to 10 (very right-leaning), with 0 being perfectly neutral or centrist.
3. Identify up to 5 key public figures, politicians, or notable people mentioned in the text. Provide their full name and a very brief (2-4 words) role or title based on the context.

IMPORTANT: The input text may still contain fragments of advertisements, navigation menus, "read more" links, or related article headers that were not fully filtered out. You must STRICTLY IGNORE these. Focus ONLY on the main story/event described in the text.

You MUST return your response as a JSON object that strictly follows this schema:
{
  "summary": "The unbiased summary as a bulleted list string.",
  "politicalScore": <number between -10 and 10>,
  "keyFigures": [
    { "name": "Full Name", "role": "Brief Role" }
  ]
}
Do not add any text, formatting, or markdown specifiers like \`\`\`json outside of the JSON object.`;

interface KeyFigure {
  name: string;
  role: string;
}

interface AnalysisResult {
  summary: string;
  politicalScore: number;
  keyFigures: KeyFigure[];
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
                politicalScore: { type: Type.NUMBER, description: "A score from -10 to 10 indicating political leaning." },
                keyFigures: {
                  type: Type.ARRAY,
                  description: "List of key people mentioned in the article.",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING, description: "Full name of the person" },
                      role: { type: Type.STRING, description: "Brief role or title (e.g. 'Senator', 'CEO')" }
                    },
                    required: ["name", "role"]
                  }
                }
            },
            required: ["summary", "politicalScore", "keyFigures"]
        }
      },
    });

    const resultText = response.text.trim();
    const result = JSON.parse(resultText);
    
    // Clamp the score to be within the -10 to 10 range just in case
    result.politicalScore = Math.max(-10, Math.min(10, result.politicalScore));
    
    // Ensure keyFigures is an array
    if (!Array.isArray(result.keyFigures)) {
      result.keyFigures = [];
    }

    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate summary and analysis. The AI model may have had trouble processing the input. Please try again with a different text.");
  }
}
