import React from 'react';
import styles from './Header.module.css';

export function HeaderMobile() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerContent}>
        {/* Brand and Route Info stacked for mobile */}
        <div className={styles.mobileHeaderTop}>
          <h1 className={styles.title}>
            Project Beacon
          </h1>
          <div className={styles.routeInfo}>
            <span className={styles.routeIndicator}></span>
            <span className={styles.routeText}>Route 12</span>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className={styles.statusSection} role="region" aria-label="Data freshness">
          <div className={styles.status}>
            <span className={styles.statusIndicator}></span>
            <span className={styles.statusText}>Updated: 2 min ago</span>
          </div>
        </div>
      </div>
    </header>
  );
}