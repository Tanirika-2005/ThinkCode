import React from 'react';
import styles from './Header.module.css';
import { HeaderMobile } from './HeaderMobile';

export function Header({ isMobile }) {
  if (isMobile) {
    return <HeaderMobile />;
  }

  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerContent}>
        {/* Left: Logo/Brand */}
        <div className={styles.brandSection}>
          <h1 className={styles.title}>
            Project Beacon
          </h1>
        </div>

        {/* Center: Route Information */}
        <div className={styles.routeInfoSection} role="region" aria-label="Current route information">
          <div className={styles.routeInfo}>
            <span className={styles.routeIndicator}></span>
            <span className={styles.routeText}>Route 12: City Center ↔ Railway Station</span>
          </div>
        </div>

        {/* Right: Last Updated with status indicator */}
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