import React from 'react';
import styles from './LoadingSpinner.module.css';

export function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer} role="status" aria-live="polite">
      {/* Loading spinner */}
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
        <div className={styles.spinnerInner}></div>
      </div>
      
      {/* Loading message */}
      <div className={styles.messageWrapper}>
        <h2 className={styles.title}>
          Loading Bus Tracking
        </h2>
      </div>
      
      {/* Secondary message */}
      <div className={styles.subtitle}>
        Getting real-time bus locations and arrival times...
      </div>
      
      {/* Progress indicator */}
      <div className={styles.progressText}>
        This may take a moment on slower connections
      </div>
    </div>
  );
}