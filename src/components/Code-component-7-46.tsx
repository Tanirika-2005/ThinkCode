import React from 'react';

export function LoadingState() {
  return (
    <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center z-30">
      {/* Loading spinner */}
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      
      {/* Loading message */}
      <div className="text-base text-gray-700 text-center px-4">
        Loading map...
      </div>
      
      {/* Optional secondary message for slower connections */}
      <div className="text-sm text-gray-500 text-center px-4 mt-2">
        This may take a moment on slower connections
      </div>
    </div>
  );
}