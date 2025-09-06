import React from 'react';
import styles from './BusStops.module.css';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

// Custom bus stop icon
const busStopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Mock bus stops
const mockBusStops = [
  { id: '1', name: 'City Center', position: [30.9000, 75.8500], eta: '3' },
  { id: '2', name: 'Railway Station', position: [30.9100, 75.8600], eta: '8' },
  { id: '3', name: 'Hospital', position: [30.9200, 75.8700], eta: '12' },
  { id: '4', name: 'University', position: [30.9300, 75.8800], eta: '18' },
  { id: '5', name: 'Market Square', position: [30.9400, 75.8900], eta: '25' },
];

export function BusStops({ onStopClick }) {
  return (
    <>
      {mockBusStops.map(stop => (
        <Marker 
          key={stop.id}
          position={stop.position}
          icon={busStopIcon}
          eventHandlers={{
            click: () => onStopClick(stop),
          }}
        />
      ))}
    </>
  );
}