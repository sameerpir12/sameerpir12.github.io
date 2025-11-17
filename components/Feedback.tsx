
import React from 'react';

export type FeedbackState = 'good' | 'bad' | null;

interface FeedbackProps {
    feedback: FeedbackState;
    onFeedback: (feedback: FeedbackState) => void;
}

const ThumbsUpIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
        <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3.25a.75.75 0 0 0-1.5 0v1.5h-1a.75.75 0 0 0 0 1.5h1v1.5a.75.75 0 0 0 1.5 0v-1.5h1a.75.75 0 0 0 0-1.5h-1v-1.5Z" />
        <path d="M5.5 5.5A2.25 2.25 0 0 0 3.25 7.75v6.5A2.25 2.25 0 0 0 5.5 16.5h5.336a3.75 3.75 0 0 0 3.696-3.012l.532-2.662a1.875 1.875 0 0 0-3.642-1.018V8.25a.75.75 0 0 0-1.5 0v3.427a.75.75 0 0 0 1.36.331l.1.503a.375.375 0 0 1-.729.202l-.1-.504a2.25 2.25 0 0 0-4.258-.63V7.75A2.25 2.25 0 0 0 5.5 5.5Z" />
    </svg>
);

const ThumbsDownIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
        <path d="M1 11.75a1.25 1.25 0 1 0 2.5 0v-7.5a1.25 1.25 0 1 0-2.5 0v7.5ZM11 16.75a.75.75 0 0 1-1.5 0v-1.5h-1a.75.75 0 0 1 0-1.5h1v-1.5a.75.75 0 0 1 1.5 0v1.5h1a.75.75 0 0 1 0 1.5h-1v1.5Z" />
        <path d="M5.5 14.5A2.25 2.25 0 0 1 3.25 12.25v-6.5A2.25 2.25 0 0 1 5.5 3.5h5.336a3.75 3.75 0 0 1 3.696 3.012l.532 2.662a1.875 1.875 0 0 1-3.642 1.018V11.75a.75.75 0 0 1-1.5 0V8.323a.75.75 0 0 1-1.36-.331l-.1-.503a.375.375 0 0 0 .729-.202l.1.504a2.25 2.25 0 0 1 4.258.63v.75A2.25 2.25 0 0 1 12.25 12.25H5.5Z" />
    </svg>
);

export const Feedback: React.FC<FeedbackProps> = ({ feedback, onFeedback }) => {
    const hasGivenFeedback = feedback !== null;
    
    return (
        <div className="flex items-center justify-center">
            {hasGivenFeedback ? (
                <p className="text-sm font-medium text-emerald-500">Thanks for your feedback!</p>
            ) : (
                <div className="flex items-center gap-6">
                    <p className="text-sm font-medium text-slate-600">Was this summary helpful?</p>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => onFeedback('good')} 
                            disabled={hasGivenFeedback}
                            className={`p-2 rounded-full transition-colors duration-200 ${feedback === 'good' ? 'bg-emerald-500/20 text-emerald-500' : 'text-slate-500 hover:bg-slate-200 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-emerald-500'}`}
                            aria-label="Good summary"
                        >
                           <ThumbsUpIcon className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => onFeedback('bad')} 
                            disabled={hasGivenFeedback}
                            className={`p-2 rounded-full transition-colors duration-200 ${feedback === 'bad' ? 'bg-red-500/20 text-red-500' : 'text-slate-500 hover:bg-slate-200 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-red-500'}`}
                            aria-label="Bad summary"
                        >
                            <ThumbsDownIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};