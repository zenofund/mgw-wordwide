import React from 'react';
import logoImg from '@assets/logo_1775177601310.webp';

const GOLD = '#C9A227';

const NAV_LINKS = [
  { label: 'MGW',      page: 'about'    },
  { label: 'Consult',  page: 'consult'  },
  { label: 'Sessions', page: 'sessions' },
  { label: 'Booking',  page: 'booking'  },
  { label: 'Vault',    page: 'vault'    },
];

const MEMBERSHIP_LINKS = [
  { label: 'Open Access',     page: 'auth' },
  { label: 'Creative Circle', page: 'auth' },
  { label: 'Inner Circle',    page: 'auth' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'Spotify',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
];

function NavLink({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        color: '#888',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        cursor: 'pointer',
        textAlign: 'left',
        lineHeight: 1,
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = GOLD}
      onMouseLeave={e => e.currentTarget.style.color = '#888'}
    >
      {children}
    </button>
  );
}

function ColHeading({ children }) {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: GOLD,
      marginBottom: 18,
    }}>
      {children}
    </div>
  );
}

export default function Footer({ alwaysShow = false, onNavigate }) {
  const year = new Date().getFullYear();

  const go = (page) => {
    if (onNavigate) onNavigate(page);
  };

  return (
    <>
      {/* ── Desktop full footer — hidden on mobile ── */}
      {alwaysShow && (
        <footer className="mgw-footer-full">
          <div className="mgw-footer-full-inner">

            {/* Brand column */}
            <div className="mgw-footer-brand-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <img
                  src={logoImg}
                  alt="MGW"
                  style={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }}
                />
                <div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 13,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: GOLD,
                    fontWeight: 600,
                    lineHeight: 1,
                  }}>
                    MGW
                  </div>
                  <div style={{
                    fontSize: 9,
                    color: '#555',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginTop: 3,
                  }}>
                    Mavin Grandpa Worldwide
                  </div>
                </div>
              </div>

              <p style={{
                fontSize: 13,
                color: '#666',
                lineHeight: 1.75,
                maxWidth: 260,
                marginBottom: 24,
              }}>
                A private mentorship circle for visionary creatives, founders, and
                industry leaders learning directly from Mavin Grandpa.
              </p>

              <div style={{ display: 'flex', gap: 10 }}>
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    title={s.label}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      border: '0.5px solid rgba(201,162,39,0.2)',
                      background: 'rgba(201,162,39,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      transition: 'all 0.2s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = GOLD;
                      e.currentTarget.style.borderColor = 'rgba(201,162,39,0.5)';
                      e.currentTarget.style.background = 'rgba(201,162,39,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#666';
                      e.currentTarget.style.borderColor = 'rgba(201,162,39,0.2)';
                      e.currentTarget.style.background = 'rgba(201,162,39,0.04)';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            <div className="mgw-footer-nav-cols">

              {/* Platform */}
              <div>
                <ColHeading>Platform</ColHeading>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                  {NAV_LINKS.map(l => (
                    <NavLink key={l.page} onClick={() => go(l.page)}>
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Membership */}
              <div>
                <ColHeading>Membership</ColHeading>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                  {MEMBERSHIP_LINKS.map(l => (
                    <NavLink key={l.label} onClick={() => go(l.page)}>
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Legal */}
              <div>
                <ColHeading>Legal</ColHeading>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                  {LEGAL_LINKS.map(l => (
                    <a
                      key={l.label}
                      href={l.href}
                      style={{
                        color: '#888',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = GOLD}
                      onMouseLeave={e => e.currentTarget.style.color = '#888'}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <ColHeading>Contact</ColHeading>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                  {[
                    { label: 'hello@mgw.com', href: 'mailto:hello@mgw.com' },
                    { label: 'Book a Session', page: 'booking' },
                    { label: 'Consultancy', page: 'consult' },
                  ].map(l => (
                    l.href ? (
                      <a
                        key={l.label}
                        href={l.href}
                        style={{
                          color: '#888',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = GOLD}
                        onMouseLeave={e => e.currentTarget.style.color = '#888'}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <NavLink key={l.label} onClick={() => go(l.page)}>
                        {l.label}
                      </NavLink>
                    )
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom bar */}
          <div className="mgw-footer-full-bottom">
            <span style={{ fontSize: 11, color: '#444', letterSpacing: '0.03em' }}>
              © {year} Mavin Grandpa Worldwide. All rights reserved.
            </span>
            <span style={{ fontSize: 11, color: '#333', letterSpacing: '0.03em' }}>
              Crafted with intent. Built for visionaries.
            </span>
          </div>
        </footer>
      )}

      {/* ── Mobile minimal bar — hidden on desktop ── */}
      <div className={alwaysShow ? 'mgw-footer-bar mgw-footer-mobile-only' : 'mgw-footer-bar'}>
        <span style={{ fontSize: 11, color: '#AAAAAA', letterSpacing: '0.03em' }}>
          © {year} Mavin Grandpa Worldwide. All rights reserved.
        </span>
      </div>
    </>
  );
}
