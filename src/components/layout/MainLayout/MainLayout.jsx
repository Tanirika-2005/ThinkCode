import React from 'react';
import styles from './MainLayout.module.css';
import { Header } from '../ui/Header';
import { MapContainer } from '../map/MapContainer';

export function MainLayout() {
  return (
    <div className={styles.layout}>
      {/* Header */}
      <Header />
      
      {/* Map Container - Takes remaining height */}
      <main className={styles.mainContent}>
        <MapContainer />
      </main>
      
      {/* Status bar for screen readers */}
      <div className={styles.statusBar} role="status" aria-live="polite" id="app-status">
        Public transit tracking app loaded. Click on bus stops to view arrival times.
      </div>
    </div>
  );
}