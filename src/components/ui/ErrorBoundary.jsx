import React from 'react';

export function ErrorState({ onRetry }) {
  return (
    <div 
      className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-30 p-4" 
      role="alert" 
      aria-live="assertive"
    >
      {/* Warning icon */}
      <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-orange-100 rounded-full" aria-hidden="true"></div>
        <svg 
          className="w-12 h-12 text-orange-600 relative z-10" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      
      {/* Error message */}
      <h2 className="text-xl font-semibold text-gray-900 text-center mb-3 max-w-sm flex items-center gap-2">
        <span className="w-3 h-3 bg-red-600 rounded-full flex-shrink-0" aria-hidden="true"></span>
        Unable to Load Bus Tracking
      </h2>
      
      {/* Sub-message */}
      <p className="text-base text-gray-800 text-center mb-6 max-w-sm leading-relaxed">
        There was a problem connecting to the transit system. Please check your internet connection and try again.
      </p>
      
      {/* Retry button */}
      <button
        onClick={onRetry}
        className="w-36 h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 px-6 touch-manipulation flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-blue-400"
        aria-label="Retry loading bus tracking data"
        type="button"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Try Again</span>
      </button>
      
      {/* Additional help text */}
      <p className="text-sm text-gray-700 text-center mt-6 max-w-sm leading-relaxed">
        <strong>Still having trouble?</strong> Try refreshing the page or check if other websites are loading properly.
      </p>
    </div>
  );
}