import React from 'react';
import logoImg from '@assets/logo_1775177601310.webp';

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(10,10,10,0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '0.5px solid rgba(201,162,39,0.18)',
  },
  navInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
  },
  logo: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 15,
    letterSpacing: '0.12em',
    color: '#C9A227',
    fontWeight: 600,
    textTransform: 'uppercase',
    flexShrink: 0,
  },
  navLinkBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 400,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#999',
    padding: '8px 14px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderBottom: '1.5px solid transparent',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  navLinkBtnActive: {
    color: '#C9A227',
    borderBottomColor: '#C9A227',
  },
  actions: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexShrink: 0,
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

export default function Navbar({ activePage, onNavigate, onLogoClick, tabs = [], user, onSearchClick, onNotificationsClick, onProfileClick }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <button
          onClick={onLogoClick}
          aria-label="Home"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center' }}
        >
          <img
            src={logoImg}
            alt="MGW"
            style={{ height: 50, width: 50, objectFit: 'contain' }}
          />
        </button>

        {/* Desktop nav links */}
        <div className="mgw-nav-links">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.navLinkBtn,
                ...(activePage === tab.id ? styles.navLinkBtnActive : {}),
              }}
              onClick={() => onNavigate?.(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
            {user ? (
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, color: '#C9A227', fontWeight: 700, lineHeight: 1 }}>
                {user.name?.charAt(0)?.toUpperCase() || 'M'}
              </span>
            ) : (
              <UserIcon />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
