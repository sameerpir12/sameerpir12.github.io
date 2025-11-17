
import React from 'react';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 00B6.061 3.42l2.846-.813a.75.75 0 01.544.721v5.252a.75.75 0 01-.544.721l-2.846.813a3.75 3.75 0 00-3.42 6.061l.813 2.846a.75.75 0 01-.721.544H9.75a.75.75 0 01-.721-.544l-.813-2.846a3.75 3.75 0 00-6.061-3.42l-2.846.813a.75.75 0 01-.544-.721V10.5a.75.75 0 01.544-.721l2.846-.813a3.75 3.75 0 003.42-6.061l-.813-2.846A.75.75 0 019 4.5zM15 1.5a.75.75 0 01.721.544l.63 2.205a3 3 0 004.848 2.758l2.206-.63a.75.75 0 01.544.721v3.506a.75.75 0 01-.544.721l-2.205.63a3 3 0 00-2.758 4.848l.63 2.206a.75.75 0 01-.721.544h-3.506a.75.75 0 01-.721-.544l-.63-2.205a3 3 0 00-4.848-2.758l-2.206.63a.75.75 0 01-.544-.721v-3.506a.75.75 0 01.544-.721l2.205-.63a3 3 0 002.758-4.848l-.63-2.206a.75.75 0 01.721-.544h3.506z"
      clipRule="evenodd"
    />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-3">
        <SparkleIcon className="w-8 h-8 text-sky-400" />
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400">
          Bias-Free Summarizer
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
        Paste any article or text below, or provide a URL. Our AI will distill the core facts into a simple, bulleted summary.
      </p>
    </header>
  );
};