import React from 'react';
import styles from './StopPopup.module.css';

export function StopPopup({ stop, onClose }) {
  return (
    <div className={styles.popup}>
      {/* Close button */}
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close bus stop details"
        type="button"
      >
        <svg className={styles.closeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Stop name */}
      <h2 className={styles.title}>
        {stop.name} Bus Stop
      </h2>

      {/* Route info */}
      <div className={styles.routeInfo}>
        <p className={styles.routeText}>
          Route 12 - Northbound Direction
        </p>
      </div>

      {/* ETA section */}
      <div className={styles.etaContainer}>
        <div className={styles.etaContent}>
          <svg className={styles.etaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className={styles.etaLabel}>Next bus arrival</p>
            <p className={styles.etaValue}>
              ~{stop.eta} minutes
            </p>
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className={styles.status}>
        <span className={styles.statusIndicator}></span>
        <span className={styles.statusText}>Real-time data • Updated just now</span>
      </div>
    </div>
  );
}