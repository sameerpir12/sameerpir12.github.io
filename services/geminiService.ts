interface AnalysisResult {
  summary: string;
  politicalScore: number;
}

export async function analyzeAndSummarizeText(text: string): Promise<AnalysisResult> {
  try {
    const response = await fetch('/.netlify/functions/gemini-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Use the error message from the backend function
      throw new Error(responseData.error || `Request failed with status ${response.status}`);
    }

    return responseData as AnalysisResult;

  } catch (error) {
    console.error("Error calling backend function:", error);
    // Re-throw the error to be caught by the UI component
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unexpected error occurred while communicating with the server.");
  }
}
