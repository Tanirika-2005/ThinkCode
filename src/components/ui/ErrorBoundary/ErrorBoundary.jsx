import React from 'react';
import styles from './ErrorBoundary.module.css';

export function ErrorBoundary({ onRetry }) {
  return (
    <div 
      className={styles.errorContainer} 
      role="alert" 
      aria-live="assertive"
    >
      {/* Warning icon */}
      <div className={styles.iconWrapper}>
        <div className={styles.iconBackground}></div>
        <svg 
          className={styles.icon} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      
      {/* Error message */}
      <h2 className={styles.title}>
        Unable to Load Bus Tracking
      </h2>
      
      {/* Sub-message */}
      <p className={styles.subtitle}>
        There was a problem connecting to the transit system. Please check your internet connection and try again.
      </p>
      
      {/* Retry button */}
      <button
        onClick={onRetry}
        className={styles.retryButton}
        aria-label="Retry loading bus tracking data"
        type="button"
      >
        <span>Try Again</span>
      </button>
      
      {/* Additional help text */}
      <p className={styles.helpText}>
        <strong>Still having trouble?</strong> Try refreshing the page or check if other websites are loading properly.
      </p>
    </div>
  );
}