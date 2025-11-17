
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { ArticleInput } from './components/ArticleInput.tsx';
import { SummaryOutput } from './components/SummaryOutput.tsx';
import { ErrorMessage } from './components/ErrorMessage.tsx';
import { PoliticalSpectrum } from './components/PoliticalSpectrum.tsx';
import { StatusMessage } from './components/StatusMessage.tsx';
import { analyzeAndSummarizeText } from './services/geminiService.ts';

const App: React.FC = () => {
  const [inputType, setInputType] = useState<'text' | 'url'>('text');
  const [article, setArticle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [politicalScore, setPoliticalScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);

  const handleSummarize = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setStatusMessage(null);
    setSummary('');
    setPoliticalScore(null);
    setFeedback(null);

    try {
      let textToSummarize = '';

      if (inputType === 'text') {
        if (!article.trim()) {
          setError('Please enter some text to summarize.');
          setIsLoading(false);
          return;
        }
        textToSummarize = article;
      } else { // inputType === 'url'
        if (!url.trim()) {
          setError('Please enter a URL to summarize.');
          setIsLoading(false);
          return;
        }
        try {
          new URL(url);
        } catch (_) {
          setError('The provided URL is not valid. Please check and try again.');
          setIsLoading(false);
          return;
        }

        setStatusMessage('Fetching content from URL...');
        // Use a reliable CORS proxy to fetch URL content
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch URL content. Status: ${response.status}. The resource may be unavailable or blocked.`);
        }

        setStatusMessage('Content retrieved, parsing article...');
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const articleElement = doc.querySelector('article');
        const mainElement = doc.querySelector('main');
        let content = '';
        if (articleElement) {
          content = articleElement.textContent || '';
        } else if (mainElement) {
          content = mainElement.textContent || '';
        } else {
          content = doc.body.textContent || '';
        }

        if (!content.trim()) {
          throw new Error("Could not extract any readable content from the provided URL.");
        }
        
        textToSummarize = content.replace(/\s\s+/g, ' ').trim(); // Clean up whitespace
        setStatusMessage('Content extracted, analyzing with AI...');
      }

      const result = await analyzeAndSummarizeText(textToSummarize);
      setSummary(result.summary);
      setPoliticalScore(result.politicalScore);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
      setStatusMessage(null);
    }
  }, [article, url, inputType, isLoading]);

  return (
    <div className="min-h-screen text-slate-800 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 space-y-8">
          <ArticleInput
            inputType={inputType}
            setInputType={setInputType}
            article={article}
            setArticle={setArticle}
            url={url}
            setUrl={setUrl}
            onSubmit={handleSummarize}
            isLoading={isLoading}
          />
          {statusMessage && <StatusMessage message={statusMessage} />}
          {error && <ErrorMessage message={error} />}
          <PoliticalSpectrum score={politicalScore} isLoading={isLoading} />
          <SummaryOutput 
            summary={summary} 
            isLoading={isLoading}
            feedback={feedback}
            onFeedback={setFeedback}
          />
        </main>
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Powered by Gemini API. Designed for educational and informational purposes.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;