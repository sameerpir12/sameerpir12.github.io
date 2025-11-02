import React from 'react';
import { Loader } from './Loader';

interface ArticleInputProps {
  inputType: 'text' | 'url';
  setInputType: (type: 'text' | 'url') => void;
  article: string;
  setArticle: (value: string) => void;
  url: string;
  setUrl: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ArticleInput: React.FC<ArticleInputProps> = ({ 
  inputType, 
  setInputType, 
  article, 
  setArticle, 
  url, 
  setUrl, 
  onSubmit, 
  isLoading 
}) => {
  const isSubmitDisabled = isLoading || (inputType === 'text' ? !article.trim() : !url.trim());

  const handleTabClick = (type: 'text' | 'url') => {
    if (!isLoading) {
      setInputType(type);
    }
  };
  
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700">
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => handleTabClick('text')}
          role="tab"
          aria-selected={inputType === 'text'}
          className={`flex-1 p-3 font-medium text-center rounded-tl-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 ${inputType === 'text' ? 'bg-slate-700 text-sky-300' : 'bg-transparent text-slate-400 hover:bg-slate-700/50'}`}
        >
          Paste Text
        </button>
        <button
          onClick={() => handleTabClick('url')}
          role="tab"
          aria-selected={inputType === 'url'}
          className={`flex-1 p-3 font-medium text-center rounded-tr-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 ${inputType === 'url' ? 'bg-slate-700 text-sky-300' : 'bg-transparent text-slate-400 hover:bg-slate-700/50'}`}
        >
          From URL
        </button>
      </div>

      <div className="p-6">
        {inputType === 'text' ? (
          <div>
            <label htmlFor="article-input" className="sr-only">Enter your text</label>
            <textarea
              id="article-input"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              placeholder="Paste your article or text here..."
              className="w-full h-64 p-4 bg-slate-900 border border-slate-600 rounded-md resize-y text-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200"
              disabled={isLoading}
            />
          </div>
        ) : (
          <div>
             <label htmlFor="url-input" className="block text-sm font-medium text-slate-300 mb-2">
              Enter a public article URL
            </label>
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/news/article-name"
              className="w-full p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200"
              disabled={isLoading}
            />
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onSubmit}
            disabled={isSubmitDisabled}
            className="flex items-center justify-center px-6 py-3 bg-sky-600 text-white font-semibold rounded-md shadow-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader />
                Summarizing...
              </>
            ) : (
              'Generate Summary'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
