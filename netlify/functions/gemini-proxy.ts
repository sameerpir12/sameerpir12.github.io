import { GoogleGenAI, Type } from "@google/genai";
import type { Handler } from "@netlify/functions";

const SYSTEM_INSTRUCTION = `You are an expert summarizer and political analyst. Your task is to perform two actions on the given text:
1. Produce a concise, neutral, and unbiased summary. Remove any loaded language, emotional appeals, opinions, or speculative statements. Focus solely on presenting the verifiable information in a balanced and objective manner.
2. Analyze the political leaning of the original text and provide a score from -10 (very left-leaning) to 10 (very right-leaning), with 0 being perfectly neutral or centrist.

You MUST return your response as a JSON object that strictly follows this schema:
{
  "summary": "The unbiased summary of the text.",
  "politicalScore": <a number between -10 and 10>
}
Do not add any text, formatting, or markdown specifiers like \`\`\`json outside of the JSON object.`;

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { text } = JSON.parse(event.body || '{}');

    if (!text) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Text to analyze is required.' }) };
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY environment variable is not set on the server.");
      return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error: API key is missing.' }) };
    }
    
    const ai = new GoogleGenAI({ apiKey });
    
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
                summary: { type: Type.STRING, description: "The unbiased summary of the text." },
                politicalScore: { type: Type.NUMBER, description: "A score from -10 to 10 indicating political leaning." }
            },
            required: ["summary", "politicalScore"]
        }
      },
    });

    const resultText = response.text.trim();
    const result = JSON.parse(resultText);
    
    result.politicalScore = Math.max(-10, Math.min(10, result.politicalScore));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error("Error in Netlify function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate summary and analysis.", details: errorMessage })
    };
  }
};

export { handler };
