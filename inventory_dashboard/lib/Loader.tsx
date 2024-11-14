import React from 'react';

interface LoaderProps {
  fullScreen?: boolean;
  loadingText?: string;
}

const Loader = ({ 
  fullScreen = true, 
  loadingText = "Loading..." 
}: LoaderProps) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
    : "relative w-full h-full min-h-[100px] bg-white dark:bg-slate-900";

  return (
    <div 
      className={`${containerClasses} flex items-center justify-center z-50`}
      role="alert"
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center gap-3">
        <div 
          className="relative h-10 w-10"
          role="progressbar"
          aria-valuetext={loadingText}
        >
          <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-4 border-slate-200 border-t-slate-800 dark:border-slate-600 dark:border-t-slate-200" />
          <div className="absolute inset-1 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800 dark:border-slate-600 dark:border-t-slate-200 animation-delay-150" />
        </div>
        <p 
          className="text-sm font-medium text-slate-600 dark:text-slate-400"
          aria-live="polite"
        >
          {loadingText}
        </p>
      </div>
    </div>
  );
};

export default Loader;