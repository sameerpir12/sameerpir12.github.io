<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Bias-Free Summarizer

This project is an AI-powered web application that analyzes news articles and other text to provide users with a neutral, fact-based summary and an analysis of the source's political leaning.

## What It Does

The core goal of this application is to help users consume information more critically. It takes a URL or pasted text as input and performs two key actions using AI:

1.  **Unbiased Summarization**: It generates a concise, bulleted list of the core facts from the text, stripping away loaded language, opinion, and emotional appeals.
2.  **Political Spectrum Analysis**: It estimates the political leaning of the original source text, placing it on a spectrum from left to right.

This allows users to quickly understand the main points of an article while also being aware of the potential bias of the original source.

## How Does the AI Eliminate Bias?

The "magic" behind the unbiased summary isn't that the AI is inherently neutral, but rather that it is given very specific instructions on how to behave. This process is often called **prompt engineering**.

When we send the user's text to the Google Gemini API, we include a detailed "system instruction" that acts as a strict set of rules for the AI. Here's a breakdown of what we tell it to do:

1.  **Assume an Expert Role**: We first tell the AI to act as an "expert summarizer and political analyst." This puts it in the right mindset for the task.
2.  **State the Goal Clearly**: The primary instruction is to produce a "concise, neutral, and unbiased summary."
3.  **Define What to Remove**: Crucially, we explicitly tell the AI what to eliminate from the text:
    *   **Loaded Language**: Words designed to evoke a strong emotional reaction (e.g., "devastating," "heroic," "scandalous").
    *   **Emotional Appeals**: Arguments that target feelings rather than logic.
    *   **Opinions**: Subjective statements that cannot be verified as facts.
4.  **Focus on Facts**: We instruct it to focus only on the "key facts" from the article.
5.  **Enforce a Factual Format**: By requiring the output to be a simple, bulleted list, we discourage the AI from creating a narrative, which is often where subtle bias can creep in. It forces a more direct, fact-based presentation.

By combining these instructions, we guide the AI to filter the source text through a lens of objectivity, resulting in a summary that is more factual and less biased than the original.

## Technologies Used

-   **Frontend**: Built with [**React**](https://react.dev/) and [**TypeScript**](https://www.typescriptlang.org/) for a modern, type-safe, and component-based user interface.
-   **Styling**: Styled with [**TailwindCSS**](https://tailwindcss.com/) for a utility-first approach to create a clean and responsive design.
-   **AI**: Powered by the [**Google Gemini API**](https://ai.google.dev/gemini-api), which handles the complex tasks of summarization and political analysis.

## How It Works: A Simple Breakdown

1.  **User Input**: The user chooses to either paste text directly into a textarea or provide a URL to a public article.
2.  **Content Fetching (for URLs)**: If a URL is provided, the app first fetches the HTML content of the webpage. It then parses this HTML to extract the main readable text content from the article.
3.  **API Request**: The extracted text is sent to the Google Gemini API with a specific set of instructions (a "system prompt"). This prompt tells the AI to return an unbiased, bulleted summary and a political score from -10 to 10. The prompt also specifies that the response **must** be in a structured JSON format.
4.  **AI Processing**: The Gemini model analyzes the text according to the instructions and generates the summary and score.
5.  **Displaying Results**: The application receives the JSON response from the API. It then updates the user interface to display the bulleted summary in the output section and moves the marker on the political spectrum meter to reflect the score. All of this happens asynchronously, with loading indicators shown to the user while the AI is working.

---

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1aJEo0PGl2DNsI1Hqey_cGd5Wg5K_A9AX

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`