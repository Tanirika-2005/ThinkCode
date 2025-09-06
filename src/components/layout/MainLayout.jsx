import React from 'react';
import { Header } from '../ui/Header';
import { MapContainerComponent } from '../map/MapContainer';

export function MainLayout() {
  return (
    <div className="h-screen w-full flex flex-col bg-white">
      {/* Header */}
      <Header />
      
      {/* Map Container - Takes remaining height */}
      <main className="flex-1 relative overflow-hidden">
        <MapContainerComponent />
      </main>
      
      {/* Status bar for screen readers */}
      <div className="sr-only" role="status" aria-live="polite" id="app-status">
        Public transit tracking app loaded. Click on bus stops to view arrival times.
      </div>
    </div>
  );
}