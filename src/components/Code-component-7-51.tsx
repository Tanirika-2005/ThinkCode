import React from 'react';

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-30 p-4">
      {/* Warning icon */}
      <div className="w-12 h-12 mb-6 flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-orange-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      
      {/* Error message */}
      <h2 className="text-lg text-gray-900 text-center mb-2 max-w-sm">
        Unable to load bus tracking
      </h2>
      
      {/* Sub-message */}
      <p className="text-sm text-gray-600 text-center mb-6 max-w-sm">
        Please check your connection and try again
      </p>
      
      {/* Retry button */}
      <button
        onClick={onRetry}
        className="
          w-30 h-12 
          bg-blue-500 hover:bg-blue-600 active:bg-blue-700
          text-white 
          rounded-lg 
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
          px-6
          touch-manipulation
        "
        aria-label="Retry loading the map"
      >
        Try Again
      </button>
      
      {/* Additional help text */}
      <p className="text-xs text-gray-500 text-center mt-4 max-w-xs">
        If the problem persists, please try refreshing the page or check your internet connection.
      </p>
    </div>
  );
}