import React, { useState, useEffect } from 'react';
import styles from './MapContainer.module.css';
import { MapContainer as LeafletMap, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BusStops } from '../BusStops';
import { BusRoute } from '../BusRoute';
import { BusMarker } from '../BusMarker';
import { StopPopup } from '../StopPopup';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorBoundary } from '../../ui/ErrorBoundary';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function MapContainer() {
  const [selectedStop, setSelectedStop] = useState(null);
  const [mapState, setMapState] = useState('loading');
  const [busPosition, setBusPosition] = useState([30.9050, 75.8550]);

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
        // Mock route coordinates
        const mockRoute = [
          [30.9000, 75.8500],
          [30.9050, 75.8550],
          [30.9100, 75.8600],
          [30.9150, 75.8650],
          [30.9200, 75.8700],
          [30.9250, 75.8750],
          [30.9300, 75.8800],
          [30.9350, 75.8850],
          [30.9400, 75.8900]
        ];
        const newIndex = mockRoute.findIndex(point => point[0] === lat && point[1] === lng);
        const nextIndex = (newIndex + 1) % mockRoute.length;
        return mockRoute[nextIndex];
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
    return <LoadingSpinner />;
  }

  // Show error state
  if (mapState === 'error') {
    return <ErrorBoundary onRetry={handleRetry} />;
  }

  return (
    <div className={styles.mapContainer}>
      <LeafletMap 
        center={[30.9200, 75.8700]} 
        zoom={13} 
        className={styles.leafletMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <BusRoute />
        <BusStops onStopClick={handleStopClick} />
        <BusMarker position={busPosition} />
      </LeafletMap>
      
      {/* Bus stop popup */}
      {selectedStop && (
        <div className={styles.popupContainer}>
          <StopPopup stop={selectedStop} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
}