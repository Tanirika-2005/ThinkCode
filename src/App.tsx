import React from 'react';
import { MapContainer } from './components/MapContainer';

export default function App() {
  return (
    <div className="h-screen w-full flex flex-col bg-white">
      {/* Enhanced Header with improved accessibility and contrast */}
      <header className="h-[70px] md:h-[90px] bg-white border-b border-gray-400 flex-shrink-0 px-4 md:px-6" role="banner">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 py-3 md:py-0">
          {/* Left: Logo/Brand */}
          <div className="flex items-center min-w-0">
            <h1 className="text-lg md:text-xl text-blue-700 font-semibold truncate">
              Project Beacon
            </h1>
          </div>

          {/* Center: Route Information with enhanced contrast */}
          <div className="flex items-center justify-center md:flex-1 min-w-0" role="region" aria-label="Current route information">
            <div className="text-sm md:text-base text-gray-800 font-medium text-center truncate px-2">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span>
                Route 12: City Center ↔ Railway Station
              </span>
            </div>
          </div>

          {/* Right: Last Updated with status indicator */}
          <div className="flex items-center justify-end md:justify-center min-w-0" role="region" aria-label="Data freshness">
            <div className="text-xs md:text-sm text-gray-700 truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></span>
              <span>Updated: 2 min ago</span>
            </div>
          </div>
        </div>
      </header>

      {/* Map Container - Takes remaining height */}
      <main className="flex-1 relative overflow-hidden">
        <MapContainer />
      </main>

      {/* Enhanced status bar for screen readers */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true" id="app-status">
        Public transit tracking app loaded. Use Tab key to navigate between bus stops. Press Enter to view arrival times. Press Escape to close popups.
      </div>
    </div>
  );
}