
import React from 'react';

interface PoliticalSpectrumProps {
  score: number | null;
  isLoading: boolean;
}

const SpectrumLoader: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-slate-300 rounded w-1/4"></div>
        <div className="h-3 bg-slate-300 rounded-full w-full"></div>
        <div className="h-3 bg-slate-300 rounded w-3/4"></div>
    </div>
);

export const PoliticalSpectrum: React.FC<PoliticalSpectrumProps> = ({ score, isLoading }) => {
  if (!isLoading && score === null) {
    return null; // Don't render anything if not loading and no score
  }

  // Calculate position from 0% to 100% based on score from -10 to 10
  const percentage = score !== null ? ((score + 10) / 20) * 100 : 50;

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-1">
        Source Analysis
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        An AI-powered estimation of the original text's political leaning. For informational purposes only.
      </p>

      {isLoading ? <SpectrumLoader /> : (
        <div>
          <div className="relative h-3 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 rounded-full">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-700 rounded-full border-2 border-white shadow-lg transition-all duration-500 ease-in-out"
              style={{ 
                left: `calc(${percentage}% - 10px)`,
                transform: 'translateY(-50%)'
              }}
              role="meter"
              aria-valuenow={score ?? 0}
              aria-valuemin={-10}
              aria-valuemax={10}
              title={`Score: ${score?.toFixed(1)}`}
            ></div>
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-500 mt-2 px-1">
            <span>Left-Leaning</span>
            <span>Center</span>
            <span>Right-Leaning</span>
          </div>
        </div>
      )}
    </div>
  );
};