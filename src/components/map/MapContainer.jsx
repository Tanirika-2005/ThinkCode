import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BusStopPopup } from './StopPopup';
import { LoadingState } from '../ui/LoadingSpinner';
import { ErrorState } from '../ui/ErrorBoundary';
import routeData from '../../data/routeData.json';
import { MAP, COLORS } from '../../utils/constants';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus stop icon
const busStopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/60/60145.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

export function MapContainerComponent() {
  const [selectedStop, setSelectedStop] = useState(null);
  const [mapState, setMapState] = useState('loading');
  const [busPosition, setBusPosition] = useState(routeData.bus.position);

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

  // Simulate bus movement
  useEffect(() => {
    if (mapState !== 'loaded') return;
    
    const interval = setInterval(() => {
      setBusPosition(prev => {
        // Simple animation along the route
        const [lat, lng] = prev;
        const newIndex = routeData.route.coordinates.findIndex(point => point[0] === lat && point[1] === lng);
        const nextIndex = (newIndex + 1) % routeData.route.coordinates.length;
        return routeData.route.coordinates[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [mapState]);

  const handleStopClick = (stop) => {
    setSelectedStop(stop);
  };

  const handleClosePopup = () => {
    setSelectedStop(null);
  };

  const handleRetry = () => {
    setMapState('loading');
    
    // Simulate retry with better success rate
    setTimeout(() => {
      if (Math.random() < 0.1) {
        setMapState('error');
      } else {
        setMapState('loaded');
      }
    }, 1500);
  };

  // Show loading state
  if (mapState === 'loading') {
    return <LoadingState />;
  }

  // Show error state
  if (mapState === 'error') {
    return <ErrorState onRetry={handleRetry} />;
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={MAP.DEFAULT_CENTER} 
        zoom={MAP.DEFAULT_ZOOM} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Bus route line */}
        <Polyline 
          positions={routeData.route.coordinates} 
          color={COLORS.ROUTE_LINE} 
          weight={6}
          className="drop-shadow-lg"
        />
        
        {/* Bus stops */}
        {routeData.stops.map(stop => (
          <Marker 
            key={stop.id}
            position={stop.position}
            icon={busStopIcon}
            eventHandlers={{
              click: () => handleStopClick(stop),
            }}
          >
            {selectedStop && selectedStop.id === stop.id && (
              <Popup>
                <BusStopPopup stop={selectedStop} onClose={handleClosePopup} />
              </Popup>
            )}
          </Marker>
        ))}
        
        {/* Moving bus */}
        <Marker 
          position={busPosition}
          icon={busIcon}
        />
      </MapContainer>
      
      {/* Bus stop popup (outside map for better control) */}
      {selectedStop && (
        <div className="absolute top-4 right-4 z-10">
          <BusStopPopup stop={selectedStop} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
}