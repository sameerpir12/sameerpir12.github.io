
import React from 'react';
import { Feedback, FeedbackState } from './Feedback.tsx';

interface SummaryOutputProps {
  summary: string;
  isLoading: boolean;
  feedback: FeedbackState;
  onFeedback: (feedback: FeedbackState) => void;
  textSize: 'normal' | 'large';
}

const PulsingLoader: React.FC = () => (
    <div className="space-y-4">
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-4/6 animate-pulse"></div>
    </div>
);

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, isLoading, feedback, onFeedback, textSize }) => {
  const hasContent = !isLoading && !!summary;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 transition-colors duration-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
          AI-Generated Summary
        </h2>
        <div className={`prose prose-p:text-slate-700 dark:prose-p:text-slate-300 max-w-none min-h-[120px] ${textSize === 'large' ? 'text-lg leading-relaxed' : 'text-base'}`}>
          {isLoading ? (
            <PulsingLoader />
          ) : summary ? (
            <ul className="space-y-2 text-slate-900 dark:text-slate-100">
              {summary.split('\n').filter(line => line.trim().length > 0).map((item, index) => (
                <li key={index}>{item.replace(/^- ?/, '')}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 italic">
              Your unbiased summary will appear here once generated.
            </p>
          )}
        </div>
      </div>
      {hasContent && (
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900 rounded-b-lg">
          <Feedback feedback={feedback} onFeedback={onFeedback} />
        </div>
      )}
    </div>
  );
};
