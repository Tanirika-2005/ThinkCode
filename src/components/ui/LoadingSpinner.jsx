import React from 'react';

export function LoadingState() {
  return (
    <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-30" role="status" aria-live="polite">
      {/* Loading spinner */}
      <div className="relative mb-6">
        <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" aria-hidden="true"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} aria-hidden="true"></div>
      </div>
      
      {/* Loading message */}
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <h2 className="text-lg font-medium text-gray-900 text-center">
          Loading Bus Tracking
        </h2>
      </div>
      
      {/* Secondary message */}
      <div className="text-sm text-gray-700 text-center px-4 max-w-xs">
        Getting real-time bus locations and arrival times...
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 text-xs text-gray-600 text-center px-4">
        This may take a moment on slower connections
      </div>
    </div>
  );
}