import React from 'react';
import styles from './BusMarker.module.css';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/60/60145.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

export function BusMarker({ position }) {
  return (
    <Marker 
      position={position}
      icon={busIcon}
      className={styles.busMarker}
    />
  );
}