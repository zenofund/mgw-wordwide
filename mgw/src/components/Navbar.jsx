import React from 'react';

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 20px 14px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(10,10,10,0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '0.5px solid rgba(201,162,39,0.18)',
  },
  logo: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 15,
    letterSpacing: '0.12em',
    color: '#C9A227',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  actions: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
  },
  iconBtn: {
    width: 32,
    height: 32,
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#141414',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  iconBtnActive: {
    borderColor: 'rgba(201,162,39,0.4)',
    background: 'rgba(201,162,39,0.08)',
  },
};

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/**
 * Navbar
 * Props:
 *  - onSearchClick: () => void
 *  - onNotificationsClick: () => void
 *  - onProfileClick: () => void
 */
export default function Navbar({ onSearchClick, onNotificationsClick, onProfileClick }) {
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>MGW</span>
      <div style={styles.actions}>
        <button style={styles.iconBtn} onClick={onSearchClick} aria-label="Search">
          <SearchIcon />
        </button>
        <button style={styles.iconBtn} onClick={onNotificationsClick} aria-label="Notifications">
          <BellIcon />
        </button>
        <button
          style={{ ...styles.iconBtn, ...styles.iconBtnActive }}
          onClick={onProfileClick}
          aria-label="Profile"
        >
          <UserIcon />
        </button>
      </div>
    </nav>
  );
}
