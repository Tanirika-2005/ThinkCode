import React from 'react';
import styles from './BusRoute.module.css';
import { Polyline } from 'react-leaflet';

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

export function BusRoute() {
  return (
    <Polyline 
      positions={mockRoute} 
      color="#ef4444" 
      weight={6}
      className={styles.routeLine}
    />
  );
}