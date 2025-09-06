// Utility functions for map calculations and operations

/**
 * Calculate distance between two points using Haversine formula
 * @param {Array} point1 - [latitude, longitude]
 * @param {Array} point2 - [latitude, longitude]
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(point1, point2) {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;
  
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Find the closest point on a polyline to a given point
 * @param {Array} point - [latitude, longitude]
 * @param {Array} polyline - Array of [latitude, longitude] points
 * @returns {Object} Closest point and distance
 */
export function findClosestPointOnPolyline(point, polyline) {
  let closestPoint = null;
  let minDistance = Infinity;
  
  for (let i = 0; i < polyline.length - 1; i++) {
    const segmentStart = polyline[i];
    const segmentEnd = polyline[i + 1];
    
    // Calculate distance to this segment
    const distance = calculateDistance(point, segmentStart);
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = segmentStart;
    }
  }
  
  return {
    point: closestPoint,
    distance: minDistance
  };
}

/**
 * Convert latitude/longitude to Leaflet LatLng object
 * @param {Array} coordinates - [latitude, longitude]
 * @returns {Object} LatLng object
 */
export function toLatLng(coordinates) {
  return {
    lat: coordinates[0],
    lng: coordinates[1]
  };
}

/**
 * Convert Leaflet LatLng object to [latitude, longitude] array
 * @param {Object} latLng - Leaflet LatLng object
 * @returns {Array} [latitude, longitude]
 */
export function fromLatLng(latLng) {
  return [latLng.lat, latLng.lng];
}