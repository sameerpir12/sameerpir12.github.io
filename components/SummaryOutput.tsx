
import React from 'react';
import { Feedback, FeedbackState } from './Feedback.tsx';

interface SummaryOutputProps {
  summary: string;
  isLoading: boolean;
  feedback: FeedbackState;
  onFeedback: (feedback: FeedbackState) => void;
}

const PulsingLoader: React.FC = () => (
    <div className="space-y-4">
        <div className="h-4 bg-slate-300 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-300 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-slate-300 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-300 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-slate-300 rounded w-4/6 animate-pulse"></div>
    </div>
);

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, isLoading, feedback, onFeedback }) => {
  const hasContent = !isLoading && !!summary;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-slate-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          AI-Generated Summary
        </h2>
        <div className="prose prose-p:text-slate-700 max-w-none min-h-[120px]">
          {isLoading ? (
            <PulsingLoader />
          ) : summary ? (
            <ul className="space-y-2 text-slate-900">
              {summary.split('\n').filter(line => line.trim().length > 0).map((item, index) => (
                <li key={index}>{item.replace(/^- ?/, '')}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic">
              Your unbiased summary will appear here once generated.
            </p>
          )}
        </div>
      </div>
      {hasContent && (
        <div className="border-t border-slate-200 p-4 bg-slate-50 rounded-b-lg">
          <Feedback feedback={feedback} onFeedback={onFeedback} />
        </div>
      )}
    </div>
  );
};
