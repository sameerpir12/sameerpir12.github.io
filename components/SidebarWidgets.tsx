
import React from 'react';

interface SettingsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  textSize: 'normal' | 'large';
  setTextSize: (size: 'normal' | 'large') => void;
}

export const SettingsWidget: React.FC<SettingsProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  textSize, 
  setTextSize 
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-6 mt-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-sky-600">
          <path fillRule="evenodd" d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-1.1-1.002A10.489 10.489 0 0110 1c2.292 0 4.408.74 6.138 2.002a.75.75 0 01-1.12 1.036A8.99 8.99 0 0010 2.5zM2.5 10a7.5 7.5 0 1115 0 .75.75 0 011.5 0 9 9 0 10-18 0 .75.75 0 010-1.5z" clipRule="evenodd" />
        </svg>
        Preferences
      </h3>
      
      <div className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-slate-700 dark:text-slate-300 font-medium">Dark Mode</span>
          <button 
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${isDarkMode ? 'bg-sky-600' : 'bg-slate-200'}`}
          >
            <span className="sr-only">Enable dark mode</span>
            <span 
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} 
            />
          </button>
        </div>

        {/* Text Size Control */}
        <div>
           <span className="block text-slate-700 dark:text-slate-300 font-medium mb-2">Text Size</span>
           <div className="flex bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
             <button
                onClick={() => setTextSize('normal')}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${textSize === 'normal' ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
             >
                Aa Normal
             </button>
             <button
                onClick={() => setTextSize('large')}
                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${textSize === 'large' ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
             >
                Aa Large
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export const MethodologyWidget: React.FC = () => {
  return (
     <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-6 mt-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-sky-600">
           <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        How It Works
      </h3>
      
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
        <p>
          <strong>1. Extraction:</strong> We strip away ads, tracking scripts, and clutter to isolate the raw article text.
        </p>
        <p>
          <strong>2. Analysis:</strong> Our AI scans the text for loaded language, emotional manipulation, and subjective framing.
        </p>
        <p>
          <strong>3. Summarization:</strong> We generate a bulleted list of just the verifiable facts, discarding the "spin."
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">The Bias Spectrum</h4>
        {/* CSS/SVG Visual Representation of the Political Spectrum */}
        <div className="relative pt-4 pb-2">
           {/* Gradient Bar */}
           <div className="h-4 w-full rounded-full bg-gradient-to-r from-blue-600 via-gray-300 to-red-600 dark:via-gray-500 opacity-80"></div>
           
           {/* Labels */}
           <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mt-2">
             <span>Far Left</span>
             <span>Neutral</span>
             <span>Far Right</span>
           </div>
           
           {/* Curve Overlay (Visual Flourish) */}
           <svg className="absolute top-0 left-0 w-full h-8 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 20">
              <path d="M0,20 Q50,0 100,20" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-600 opacity-50" strokeWidth="1" strokeDasharray="2,2"/>
              <line x1="50" y1="0" x2="50" y2="20" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
           </svg>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
           Our -10 to +10 scale is designed to visualize where the article falls relative to the center.
        </p>
      </div>
    </div>
  );
};
