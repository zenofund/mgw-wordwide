import React from 'react';

const GOLD = '#C9A227';
const BORDER = 'rgba(201,162,39,0.18)';

const LINKS = [
  { label: 'MGW', href: '#mgw' },
  { label: 'Consult', href: '#consult' },
  { label: 'Booking', href: '#booking' },
  { label: 'Vault', href: '#vault' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'inherit',
      borderTop: `0.5px solid ${BORDER}`,
      padding: '48px 24px 28px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div className="mgw-footer-grid">
          <div className="mgw-footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(201,162,39,0.12)',
                border: '0.5px solid rgba(201,162,39,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 15, color: GOLD, fontWeight: 600,
              }}>M</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, color: '#EAEAEA', letterSpacing: '0.03em' }}>
                  Mavin Grandpa
                </div>
                <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, marginTop: 1 }}>
                  Worldwide
                </div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#666', lineHeight: 1.75, maxWidth: 280, marginBottom: 20 }}>
              A private circle of mentorship for visionary creatives, founders, and industry leaders.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  title={s.label}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: `0.5px solid ${BORDER}`,
                    color: '#666',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#666'; e.currentTarget.style.borderColor = BORDER; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 16 }}>Platform</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home', page: 'landing' },
                { label: 'About', page: 'about' },
                { label: 'Booking', page: 'booking' },
                { label: 'Consultancy', page: 'consult' },
                { label: 'Knowledge Vault', page: 'vault' },
              ].map(link => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate?.(link.page)}
                    style={{
                      background: 'none', border: 'none', padding: 0,
                      fontSize: 13, color: '#666', cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#EAEAEA'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 16 }}>Membership</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Open Access', 'Creative Circle', 'Inner Circle'].map(plan => (
                <li key={plan}>
                  <button
                    onClick={() => onNavigate?.('auth', { view: 'plans' })}
                    style={{
                      background: 'none', border: 'none', padding: 0,
                      fontSize: 13, color: '#666', cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#EAEAEA'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#666'; }}
                  >
                    {plan}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 16 }}>Contact</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li style={{ fontSize: 13, color: '#666' }}>hello@mavingrandpa.com</li>
              <li style={{ fontSize: 13, color: '#666' }}>Lagos, Nigeria</li>
              <li style={{ marginTop: 6 }}>
                <button
                  onClick={() => onNavigate?.('booking')}
                  style={{
                    background: 'rgba(201,162,39,0.08)', border: `0.5px solid rgba(201,162,39,0.3)`,
                    borderRadius: 6, padding: '8px 16px', color: GOLD,
                    fontSize: 11, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: '0.04em',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.14)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,162,39,0.08)'; }}
                >
                  Book a Session
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: `0.5px solid rgba(255,255,255,0.05)`,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ fontSize: 11, color: '#444', letterSpacing: '0.03em' }}>
            © {year} Mavin Grandpa Worldwide. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Use'].map(t => (
              <a
                key={t}
                href="#"
                style={{ fontSize: 11, color: '#444', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#888'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#444'; }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
