// Application constants

export const COLORS = {
  ROUTE_LINE: '#ef4444', // Red for route line
  BUS_STOP: '#3b82f6',   // Blue for bus stops
  BUS_ICON: '#f97316',   // Orange for bus icon
  PRIMARY: '#030213',    // Primary text color
  SECONDARY: '#717182',  // Secondary text color
  BACKGROUND: '#ffffff', // Background color
  BORDER: '#e5e7eb'      // Border color
};

export const SIZES = {
  BUS_STOP_MARKER: 25,
  BUS_ICON: 30,
  MIN_TOUCH_TARGET: 44 // Minimum touch target size for accessibility
};

export const TIMING = {
  BUS_ANIMATION_INTERVAL: 3000, // 3 seconds between bus position updates
  LOADING_DELAY: 2000,          // 2 seconds loading simulation
  RETRY_DELAY: 1500             // 1.5 seconds retry delay
};

export const MAP = {
  DEFAULT_ZOOM: 13,
  MIN_ZOOM: 10,
  MAX_ZOOM: 18,
  DEFAULT_CENTER: [30.9200, 75.8700] // Center of Ludhiana
};

export const ACCESSIBILITY = {
  FOCUS_RING_COLOR: '#3b82f6', // Blue focus ring
  HIGH_CONTRAST_RATIO: 4.5     // Minimum contrast ratio for accessibility
};