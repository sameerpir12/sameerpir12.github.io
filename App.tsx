
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { ArticleInput } from './components/ArticleInput.tsx';
import { SummaryOutput } from './components/SummaryOutput.tsx';
import { ErrorMessage } from './components/ErrorMessage.tsx';
import { PoliticalSpectrum } from './components/PoliticalSpectrum.tsx';
import { StatusMessage } from './components/StatusMessage.tsx';
import { KeyFigures } from './components/KeyFigures.tsx';
import { SettingsWidget, MethodologyWidget } from './components/SidebarWidgets.tsx';
import { analyzeAndSummarizeText } from './services/geminiService.ts';

// Helper function to extract main content and remove noise (ads, sidebars, etc.)
const extractMainContent = (doc: Document): string => {
  // 1. Remove clearly unwanted elements
  const junkTags = ['script', 'style', 'noscript', 'iframe', 'svg', 'button', 'input', 'form', 'nav', 'header', 'footer', 'aside'];
  junkTags.forEach(tag => {
    doc.querySelectorAll(tag).forEach(el => el.remove());
  });

  // 2. Remove elements by class/id indicative of noise
  const junkSelectors = [
    '.ad', '.ads', '.advertisement', '.banner', '.promo',
    '#sidebar', '.sidebar', '.widget', 
    '.comments', '#comments', '.comment-section',
    '.related', '.related-articles', '.recommended', '.read-more', '.more-news',
    '.newsletter', '.subscribe', '.social-share', '.share-buttons',
    '.cookie-banner', '.modal', '.popup', '.outbrain', '.taboola'
  ];
  
  junkSelectors.forEach(selector => {
    try {
        doc.querySelectorAll(selector).forEach(el => el.remove());
    } catch(e) {
      // Ignore invalid selector errors
    }
  });

  // 3. Select the best container
  let container = doc.querySelector('article');
  
  if (!container) {
    container = doc.querySelector('main');
  }

  // Fallback to common content wrappers
  if (!container) container = doc.querySelector('.post-content');
  if (!container) container = doc.querySelector('.entry-content');
  if (!container) container = doc.querySelector('#content');
  if (!container) container = doc.querySelector('#main');

  const root = container || doc.body;

  // 4. Extract text primarily from paragraphs.
  const paragraphs = Array.from(root.querySelectorAll('p'));
  
  if (paragraphs.length > 3) {
    return paragraphs
      .map(p => p.textContent?.trim() || '')
      .filter(text => text.length > 40)
      .join('\n\n');
  }

  // Fallback
  return root.textContent?.replace(/\s\s+/g, ' ').trim() || '';
}

interface KeyFigure {
  name: string;
  role: string;
}

const App: React.FC = () => {
  const [inputType, setInputType] = useState<'text' | 'url'>('text');
  const [article, setArticle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [politicalScore, setPoliticalScore] = useState<number | null>(null);
  const [keyFigures, setKeyFigures] = useState<KeyFigure[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);
  
  // UI State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');

  // Handle Dark Mode Side Effects
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSummarize = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setStatusMessage(null);
    setSummary('');
    setPoliticalScore(null);
    setKeyFigures(null);
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
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch URL content. Status: ${response.status}. The resource may be unavailable or blocked.`);
        }

        setStatusMessage('Content retrieved, parsing article...');
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const content = extractMainContent(doc);

        if (!content.trim()) {
          throw new Error("Could not extract any readable content from the provided URL. The website might be blocking automated access or using a complex layout.");
        }
        
        textToSummarize = content;
        setStatusMessage('Content extracted, analyzing with AI...');
      }

      const result = await analyzeAndSummarizeText(textToSummarize);
      setSummary(result.summary);
      setPoliticalScore(result.politicalScore);
      setKeyFigures(result.keyFigures);

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
    <div className={`min-h-screen font-sans flex flex-col p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${isDarkMode ? 'text-slate-100' : 'text-slate-200'}`}>
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column (Left - 8 cols) */}
          <main className="lg:col-span-8 space-y-8">
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
              textSize={textSize}
            />
          </main>

          {/* Sidebar Column (Right - 4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <KeyFigures figures={keyFigures} isLoading={isLoading} />
            
            <MethodologyWidget />
            
            <SettingsWidget 
              isDarkMode={isDarkMode}
              toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              textSize={textSize}
              setTextSize={setTextSize}
            />
          </aside>
        </div>

        <footer className="text-center mt-12 text-slate-400 text-sm">
          <p>Powered by Gemini API. Designed for educational and informational purposes.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
