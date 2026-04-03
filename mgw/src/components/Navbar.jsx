import React, { useState, useRef, useEffect } from 'react';
import logoImg from '@assets/logo_1775177601310.webp';

const GOLD = '#C9A227';

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
    color: GOLD,
    borderBottomColor: GOLD,
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
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DROPDOWN_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',   icon: '⊞' },
  { id: 'settings',  label: 'Settings',    icon: '⚙' },
  { id: 'profile',   label: 'My Profile',  icon: '◯' },
];

function ProfileDropdown({ user, onNavigate, onLogout, onClose }) {
  const tierColors = { free: '#555', standard: '#6A38C2', premium: GOLD };
  const tierColor = tierColors[user?.tier] || '#555';

  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 10px)',
      right: 0,
      width: 220,
      background: '#141414',
      border: '0.5px solid rgba(201,162,39,0.25)',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
      zIndex: 200,
    }}>
      {/* User info */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '0.5px solid rgba(201,162,39,0.12)',
        background: 'rgba(201,162,39,0.04)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: `${GOLD}18`,
            border: `1px solid ${GOLD}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 16,
            color: GOLD,
            fontWeight: 700,
            flexShrink: 0,
          }}>
            {user.name?.charAt(0)?.toUpperCase() || 'M'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 14,
              color: '#EAEAEA',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {user.name}
            </div>
            {user.plan && (
              <div style={{
                fontSize: 9,
                color: tierColor,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginTop: 2,
              }}>
                {user.plan.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ padding: '6px 0' }}>
        {DROPDOWN_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => { onNavigate(item.id); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '10px 16px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#BBBBB',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              transition: 'background 0.15s',
              textAlign: 'left',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#EAEAEA'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#BBBBBB'; }}
          >
            <span style={{ fontSize: 13, color: '#666', width: 18, textAlign: 'center' }}>{item.icon}</span>
            <span style={{ color: '#BBBBBB' }}>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Sign out */}
      <div style={{ borderTop: '0.5px solid rgba(201,162,39,0.1)', padding: '6px 0 4px' }}>
        <button
          onClick={() => { onLogout(); onClose(); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: '10px 16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: '#cc5555',
            transition: 'background 0.15s',
            textAlign: 'left',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,60,60,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <span style={{ fontSize: 13, width: 18, textAlign: 'center' }}>→</span>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function Navbar({ activePage, onNavigate, onLogoClick, tabs = [], user, onSearchClick, onNotificationsClick, onProfileClick, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleProfileClick = () => {
    if (user) {
      setDropdownOpen(prev => !prev);
    } else {
      onProfileClick?.();
    }
  };

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

          {/* Profile button + dropdown */}
          <div ref={profileRef} style={{ position: 'relative' }}>
            <button
              style={{
                ...styles.iconBtn,
                ...styles.iconBtnActive,
                ...(dropdownOpen ? { borderColor: 'rgba(201,162,39,0.6)', background: 'rgba(201,162,39,0.12)' } : {}),
              }}
              onClick={handleProfileClick}
              aria-label="Profile"
              aria-expanded={dropdownOpen}
            >
              {user ? (
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, color: GOLD, fontWeight: 700, lineHeight: 1 }}>
                  {user.name?.charAt(0)?.toUpperCase() || 'M'}
                </span>
              ) : (
                <UserIcon />
              )}
            </button>

            {dropdownOpen && user && (
              <ProfileDropdown
                user={user}
                onNavigate={onNavigate}
                onLogout={onLogout}
                onClose={() => setDropdownOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
