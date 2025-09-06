import React, { useEffect, useRef } from 'react';

interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  eta: string;
}

interface BusStopPopupProps {
  stop: BusStop;
  onClose: () => void;
}

export function BusStopPopup({ stop, onClose }: BusStopPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Enhanced keyboard navigation and focus management
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      
      // Enhanced Tab key focus trapping
      if (event.key === 'Tab') {
        const focusableElements = popupRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    // Focus management and announcement
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Announce popup opening to screen readers
    const statusElement = document.getElementById('app-status');
    if (statusElement) {
      statusElement.textContent = `Bus stop details opened for ${stop.name}. Press Escape to close.`;
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Announce popup closing
      if (statusElement) {
        statusElement.textContent = 'Bus stop details closed. Use Tab to navigate other stops.';
      }
    };
  }, [onClose, stop.name]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-25 z-10"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Enhanced Popup */}
      <div 
        ref={popupRef}
        className="
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          md:top-auto md:left-auto md:transform-none 
          z-20 bg-white border-2 border-gray-400 rounded-xl shadow-2xl 
          w-[280px] md:w-80 mx-4
          max-w-[calc(100vw-32px)]
          max-h-[calc(100vh-32px)]
          overflow-y-auto
        "
        style={{
          // On desktop, position near the clicked stop (simplified positioning)
          ...(typeof window !== 'undefined' && window.innerWidth >= 768 && {
            top: '40%',
            left: '30%',
          })
        }}
        role="dialog"
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
        aria-modal="true"
        tabIndex={-1}
      >
        {/* Enhanced close button with maximum accessibility */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="
            absolute top-2 right-2 
            w-10 h-10 
            flex items-center justify-center 
            text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200
            rounded-full 
            transition-colors duration-200
            focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2
            touch-manipulation
            min-w-[44px] min-h-[44px]
            border-2 border-transparent hover:border-gray-300
          "
          aria-label="Close bus stop details popup"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Enhanced content with improved contrast and accessibility */}
        <div className="p-5">
          {/* Stop name with enhanced typography */}
          <h2 
            id="popup-title"
            className="text-lg text-gray-900 mb-3 pr-12 flex items-center gap-2"
          >
            <span className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0" aria-hidden="true"></span>
            <span className="font-semibold">{stop.name} Bus Stop</span>
          </h2>
          
          {/* Route info with icon */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0" aria-hidden="true"></span>
              <p className="text-sm text-gray-800 font-medium">
                Route 12 - Northbound Direction
              </p>
            </div>
          </div>
          
          {/* ETA section with enhanced visual hierarchy */}
          <div className="mb-3 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-blue-800 font-medium">Next bus arrival</p>
                <p 
                  id="popup-description"
                  className="text-xl text-blue-700 font-bold"
                >
                  ~{stop.eta} minutes
                </p>
              </div>
            </div>
          </div>
          
          {/* Additional info with status indicator */}
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" aria-hidden="true"></span>
            <span>Real-time data • Updated 1 min ago</span>
          </div>
          
          {/* Screen reader summary */}
          <div className="sr-only">
            Complete stop information: {stop.name} bus stop on Route 12 northbound. 
            Next bus arriving in approximately {stop.eta} minutes. 
            Real-time data last updated 1 minute ago.
          </div>
        </div>
      </div>
    </>
  );
}