import React from 'react';
import routeData from '../../data/routeData.json';

export function BusStopPopup({ stop, onClose }) {
  return (
    <div className="bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-4 w-72 max-w-sm">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Close bus stop details"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Stop name */}
      <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
        {stop.name} Bus Stop
      </h2>

      {/* Route info */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          <p className="text-sm text-gray-700 font-medium">
            {routeData.route.name} - {routeData.route.direction} Direction
          </p>
        </div>
      </div>

      {/* ETA section */}
      <div className="mb-3 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 font-medium">Next bus arrival</p>
            <p className="text-xl font-bold text-blue-700">
              ~{stop.eta} minutes
            </p>
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span>Real-time data • Updated just now</span>
      </div>
    </div>
  );
}