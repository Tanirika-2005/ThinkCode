import React, { useState, useEffect } from 'react';
import { BusStopPopup } from './BusStopPopup';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  eta: string;
}

interface Bus {
  id: string;
  lat: number;
  lng: number;
  route: string;
}

type MapState = 'loading' | 'loaded' | 'error';

// Mock data for demonstration
const mockBusStops: BusStop[] = [
  { id: '1', name: 'City Center', lat: 30.9, lng: 75.85, eta: '3' },
  { id: '2', name: 'Railway Station', lat: 30.91, lng: 75.86, eta: '8' },
  { id: '3', name: 'Hospital', lat: 30.92, lng: 75.87, eta: '12' },
  { id: '4', name: 'University', lat: 30.93, lng: 75.88, eta: '18' },
  { id: '5', name: 'Market Square', lat: 30.94, lng: 75.89, eta: '25' },
];

const mockBuses: Bus[] = [
  { id: 'bus1', lat: 30.905, lng: 75.855, route: 'Route 42' },
];

export function MapContainer() {
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [mapState, setMapState] = useState<MapState>('loading');
  const [focusedStopIndex, setFocusedStopIndex] = useState<number>(-1);

  // Simulate loading and potential error states
  useEffect(() => {
    const loadMap = async () => {
      setMapState('loading');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate occasional error (20% chance)
      if (Math.random() < 0.2) {
        setMapState('error');
      } else {
        setMapState('loaded');
      }
    };

    loadMap();
  }, []);

  const handleStopClick = (stop: BusStop) => {
    setSelectedStop(stop);
  };

  const handleClosePopup = () => {
    setSelectedStop(null);
  };

  const handleRetry = () => {
    setMapState('loading');
    // Announce loading state to screen readers
    const statusElement = document.getElementById('app-status');
    if (statusElement) {
      statusElement.textContent = 'Retrying to load map data...';
    }
    
    // Simulate retry with better success rate
    setTimeout(() => {
      if (Math.random() < 0.1) {
        setMapState('error');
        if (statusElement) {
          statusElement.textContent = 'Failed to load map data. Please try again.';
        }
      } else {
        setMapState('loaded');
        if (statusElement) {
          statusElement.textContent = 'Map data loaded successfully. Use Tab to navigate bus stops.';
        }
      }
    }, 1500);
  };

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (mapState !== 'loaded') return;

      switch (event.key) {
        case 'Tab':
          // Let default tab behavior work
          break;
        case 'Enter':
          if (focusedStopIndex >= 0 && focusedStopIndex < mockBusStops.length) {
            event.preventDefault();
            handleStopClick(mockBusStops[focusedStopIndex]);
          }
          break;
        case 'Escape':
          if (selectedStop) {
            event.preventDefault();
            handleClosePopup();
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          setFocusedStopIndex(prev => 
            prev < mockBusStops.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          setFocusedStopIndex(prev => 
            prev > 0 ? prev - 1 : mockBusStops.length - 1
          );
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mapState, focusedStopIndex, selectedStop, mockBusStops]);

  // Announce state changes
  useEffect(() => {
    const statusElement = document.getElementById('app-status');
    if (!statusElement) return;

    switch (mapState) {
      case 'loading':
        statusElement.textContent = 'Loading bus tracking data...';
        break;
      case 'loaded':
        statusElement.textContent = `Bus tracking loaded. ${mockBusStops.length} stops available. Use Tab to navigate.`;
        break;
      case 'error':
        statusElement.textContent = 'Error loading bus tracking. Please retry.';
        break;
    }
  }, [mapState]);

  // Show loading state
  if (mapState === 'loading') {
    return <LoadingState />;
  }

  // Show error state
  if (mapState === 'error') {
    return <ErrorState onRetry={handleRetry} />;
  }

  return (
    <div className="relative w-full h-full bg-gray-100" role="main" aria-label="Bus tracking map">
      {/* Map simulation - in real implementation, this would be Google Maps */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50" role="img" aria-label="Transit map showing bus routes and stops">
        {/* Enhanced Route line visualization */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            {/* Arrow marker for direction indicators */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="3"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
            </marker>
          </defs>
          
          {/* Main route line with enhanced contrast and accessibility */}
          <path
            d="M 80 120 Q 160 140 240 180 Q 320 220 360 280 Q 380 340 340 400 Q 300 460 240 480"
            stroke="#dc2626"
            strokeWidth="5"
            className="md:stroke-[7px]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0"
            className="drop-shadow-lg"
            aria-label="Bus route from Railway Station to City Center"
          />
          
          {/* Route line pattern overlay for accessibility */}
          <path
            d="M 80 120 Q 160 140 240 180 Q 320 220 360 280 Q 380 340 340 400 Q 300 460 240 480"
            stroke="#ffffff"
            strokeWidth="1"
            fill="none"
            strokeDasharray="8,4"
            className="opacity-70"
            aria-hidden="true"
          />
          
          {/* Direction arrows with enhanced contrast */}
          <path
            d="M 120 130 L 140 135"
            stroke="#dc2626"
            strokeWidth="4"
            markerEnd="url(#arrow)"
            fill="none"
            aria-hidden="true"
          />
          <path
            d="M 200 160 L 220 170"
            stroke="#dc2626"
            strokeWidth="4"
            markerEnd="url(#arrow)"
            fill="none"
            aria-hidden="true"
          />
          <path
            d="M 280 200 L 300 215"
            stroke="#dc2626"
            strokeWidth="4"
            markerEnd="url(#arrow)"
            fill="none"
            aria-hidden="true"
          />
          <path
            d="M 350 300 L 345 320"
            stroke="#dc2626"
            strokeWidth="4"
            markerEnd="url(#arrow)"
            fill="none"
            aria-hidden="true"
          />
          
          {/* Enhanced terminal markers with accessibility */}
          <circle
            cx="80"
            cy="120"
            r="7"
            fill="#dc2626"
            stroke="white"
            strokeWidth="3"
            aria-label="Route start: Railway Station"
          />
          <circle
            cx="80"
            cy="120"
            r="3"
            fill="white"
            aria-hidden="true"
          />
          
          <circle
            cx="240"
            cy="480"
            r="7"
            fill="#dc2626"
            stroke="white"
            strokeWidth="3"
            aria-label="Route end: City Center"
          />
          <circle
            cx="240"
            cy="480"
            r="3"
            fill="white"
            aria-hidden="true"
          />
        </svg>

        {/* Enhanced terminal labels with better contrast */}
        <div className="absolute pointer-events-none" role="img" aria-label="Route terminals">
          {/* Start label with icon */}
          <div 
            className="absolute bg-white text-xs text-gray-900 px-2 py-1 rounded border-2 border-gray-400 shadow-md flex items-center gap-1"
            style={{ left: '60px', top: '100px' }}
          >
            <span className="w-2 h-2 bg-red-600 rounded-full" aria-hidden="true"></span>
            <span className="font-medium">Start: Railway Station</span>
          </div>
          
          {/* End label with icon */}
          <div 
            className="absolute bg-white text-xs text-gray-900 px-2 py-1 rounded border-2 border-gray-400 shadow-md flex items-center gap-1"
            style={{ left: '180px', top: '500px' }}
          >
            <span className="w-2 h-2 bg-red-600 rounded-full" aria-hidden="true"></span>
            <span className="font-medium">End: City Center</span>
          </div>
        </div>

        {/* Enhanced Bus stops with improved accessibility */}
        {mockBusStops.map((stop, index) => {
          const showLabel = ['City Center', 'Railway Station', 'Hospital'].includes(stop.name);
          const isActive = selectedStop?.id === stop.id;
          const isFocused = focusedStopIndex === index;
          
          return (
            <div
              key={stop.id}
              className="absolute"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 8}%`,
              }}
            >
              {/* Enhanced bus stop label with better contrast */}
              {showLabel && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white text-xs text-gray-900 px-2 py-1 rounded border-2 border-gray-400 shadow-md whitespace-nowrap flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" aria-hidden="true"></span>
                    <span className="font-medium">{stop.name}</span>
                  </div>
                </div>
              )}
              
              {/* Bus stop marker with enhanced accessibility and contrast */}
              <button
                onClick={() => handleStopClick(stop)}
                onFocus={() => setFocusedStopIndex(index)}
                className={`
                  relative w-11 h-11 
                  flex items-center justify-center 
                  group 
                  focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2
                  touch-manipulation
                  min-w-[44px] min-h-[44px]
                  ${isFocused ? 'ring-4 ring-blue-400 ring-offset-2' : ''}
                `}
                aria-label={`Bus stop: ${stop.name}, next bus in ${stop.eta} minutes. Press Enter to view details.`}
                aria-describedby={`stop-${stop.id}-eta`}
                type="button"
                tabIndex={0}
              >
                {/* Enhanced visible marker with patterns and high contrast */}
                <div className={`
                  w-6 h-6 md:w-7 md:h-7 
                  bg-blue-600 
                  hover:bg-blue-700 
                  active:bg-blue-800
                  rounded-full 
                  border-3 border-white 
                  shadow-xl 
                  transition-all duration-200 
                  hover:scale-110
                  active:scale-105
                  ${isActive ? 'animate-pulse scale-110 bg-blue-700 ring-2 ring-blue-300' : ''}
                  ${isFocused ? 'scale-110 ring-2 ring-blue-400' : ''}
                  flex items-center justify-center
                  relative
                `}>
                  {/* Center dot */}
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  
                  {/* Accessibility pattern - dashed ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-white opacity-60" aria-hidden="true"></div>
                </div>

                {/* Screen reader only ETA info */}
                <span id={`stop-${stop.id}-eta`} className="sr-only">
                  Estimated arrival: {stop.eta} minutes
                </span>
              </button>
            </div>
          );
        })}

        {/* Enhanced active bus with better accessibility */}
        {mockBuses.map((bus, busIndex) => (
          <div
            key={bus.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: '25%',
              top: '35%',
            }}
            role="img"
            aria-label={`Bus currently traveling on ${bus.route}, moving toward City Center`}
          >
            {/* Bus icon with enhanced contrast and accessibility */}
            <div className="relative">
              {/* Enhanced motion trail with better contrast */}
              <div className="absolute -inset-2 bg-orange-400 opacity-40 rounded-lg blur-md animate-pulse" aria-hidden="true"></div>
              
              {/* Main bus icon with improved contrast */}
              <div className="relative w-10 h-6 md:w-12 md:h-7 bg-orange-600 border-3 border-white shadow-xl flex items-center justify-center overflow-hidden rounded-sm">
                {/* Bus shape with enhanced visual patterns */}
                <div className="w-full h-full bg-orange-600 relative flex items-center justify-center">
                  {/* Front of bus */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-orange-800 rounded-l-sm" aria-hidden="true"></div>
                  
                  {/* Windows with better contrast */}
                  <div className="flex gap-0.5" aria-hidden="true">
                    <div className="w-1.5 h-2.5 bg-white rounded-sm opacity-95 border border-gray-300"></div>
                    <div className="w-1.5 h-2.5 bg-white rounded-sm opacity-95 border border-gray-300"></div>
                  </div>
                  
                  {/* Back of bus */}
                  <div className="absolute right-0 top-0 w-1 h-full bg-orange-500" aria-hidden="true"></div>
                  
                  {/* Pattern overlay for accessibility */}
                  <div className="absolute inset-0 border-2 border-dashed border-white opacity-30 rounded-sm" aria-hidden="true"></div>
                </div>
                
                {/* Enhanced direction arrow */}
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2" aria-hidden="true">
                  <div className="w-3 h-3 border-t-3 border-r-3 border-orange-600 transform rotate-45 bg-white shadow-md"></div>
                </div>
                
                {/* Movement indicator */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2" aria-hidden="true">
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
                </div>
              </div>
              
              {/* Screen reader information */}
              <span className="sr-only">
                Bus location: Currently between Railway Station and Hospital stop
              </span>
            </div>
          </div>
        ))}



        {/* Enhanced map controls with better mobile optimization */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button 
            className="
              w-12 h-12 
              bg-white shadow-lg rounded-lg 
              flex items-center justify-center 
              hover:bg-gray-50 active:bg-gray-100
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
              touch-manipulation
              min-w-[48px] min-h-[48px]
            "
            aria-label="Zoom in"
            type="button"
          >
            <span className="text-lg leading-none" aria-hidden="true">+</span>
          </button>
          <button 
            className="
              w-12 h-12 
              bg-white shadow-lg rounded-lg 
              flex items-center justify-center 
              hover:bg-gray-50 active:bg-gray-100
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
              touch-manipulation
              min-w-[48px] min-h-[48px]
            "
            aria-label="Zoom out"
            type="button"
          >
            <span className="text-lg leading-none" aria-hidden="true">−</span>
          </button>
        </div>
      </div>

      {/* Bus stop popup */}
      {selectedStop && (
        <BusStopPopup
          stop={selectedStop}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}