
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
        <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-slate-700 rounded w-4/6 animate-pulse"></div>
    </div>
);

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, isLoading, feedback, onFeedback }) => {
  const hasContent = !isLoading && !!summary;

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg border border-slate-700">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-300 mb-4">
          AI-Generated Summary
        </h2>
        <div className="prose prose-invert prose-p:text-slate-300 max-w-none min-h-[120px]">
          {isLoading ? (
            <PulsingLoader />
          ) : summary ? (
            <p className="whitespace-pre-wrap">{summary}</p>
          ) : (
            <p className="text-slate-500 italic">
              Your unbiased summary will appear here once generated.
            </p>
          )}
        </div>
      </div>
      {hasContent && (
        <div className="border-t border-slate-700 p-4 bg-slate-800 rounded-b-lg">
          <Feedback feedback={feedback} onFeedback={onFeedback} />
        </div>
      )}
    </div>
  );
};