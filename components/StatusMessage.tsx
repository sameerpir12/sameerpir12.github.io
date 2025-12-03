
import React from 'react';

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
  </svg>
);

interface StatusMessageProps {
  message: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => {
  return (
    <div className="bg-sky-100 dark:bg-sky-900/40 border border-sky-300 dark:border-sky-700 text-sky-800 dark:text-sky-200 px-4 py-3 rounded-md relative flex items-center transition-colors duration-200" role="status">
      <InfoIcon className="w-5 h-5 mr-3 flex-shrink-0" />
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
