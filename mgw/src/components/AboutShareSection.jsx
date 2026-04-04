import React, { useState } from 'react';

const GOLD = '#C9A227';
const SURFACE = '#141414';
const BORDER = 'rgba(201,162,39,0.18)';

function SectionTitle({ children }) {
  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 26, fontWeight: 500, color: '#EAEAEA', marginBottom: 6,
    }}>
      {children}
    </div>
  );
}

function SectionSub({ children }) {
  return (
    <div style={{ fontSize: 12, color: '#666', marginBottom: 24, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 0.5, background: BORDER, margin: '28px 0' }} />;
}

export default function AboutShareSection() {
  const [copied, setCopied] = useState(false);
  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://mgw.app';

  const handleCopy = () => {
    navigator.clipboard?.writeText(appUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareVia = (channel) => {
    const text = encodeURIComponent('Join Mavin Grandpa Worldwide — mentorship for visionary creatives.');
    const url = encodeURIComponent(appUrl);
    const links = {
      twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email:    `mailto:?subject=Join%20MGW&body=${text}%20${url}`,
    };
    window.open(links[channel], '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <SectionTitle>About MGW</SectionTitle>
      <SectionSub>Learn more about the platform and share it with your network.</SectionSub>

      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 12, padding: '24px 20px', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: `${GOLD}18`, border: `1px solid ${GOLD}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: GOLD, fontWeight: 700 }}>MGW</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, marginBottom: 8, color: '#EAEAEA' }}>
              Mavin Grandpa Worldwide
            </div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.8 }}>
              A private mentorship circle for visionary creatives, founders, and industry leaders. Access the Knowledge Vault, book 1-on-1 sessions, attend exclusive masterclasses, and connect with a curated community building at the highest level.
            </div>
          </div>
        </div>

        <div style={{ height: 0.5, background: BORDER, margin: '18px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Members', value: '2,400+' },
            { label: 'Sessions', value: '500+' },
            { label: 'Vault Items', value: '120+' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: GOLD, fontWeight: 600 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 10, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: '#EAEAEA', marginBottom: 14 }}>
        Follow MGW
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[
          {
            platform: 'Instagram', handle: '@mavingrandpaworldwide',
            href: 'https://instagram.com/mavingrandpaworldwide',
            color: '#E1306C', bg: 'rgba(225,48,108,0.07)', border: 'rgba(225,48,108,0.25)',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            ),
          },
          {
            platform: 'X / Twitter', handle: '@mavingrandpa',
            href: 'https://x.com/mavingrandpa',
            color: '#EAEAEA', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)',
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            ),
          },
          {
            platform: 'YouTube', handle: '@MavinGrandpaWorldwide',
            href: 'https://youtube.com/@MavinGrandpaWorldwide',
            color: '#FF0000', bg: 'rgba(255,0,0,0.06)', border: 'rgba(255,0,0,0.2)',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            ),
          },
          {
            platform: 'Spotify', handle: 'Mavin Grandpa Worldwide',
            href: 'https://open.spotify.com/artist/mavingrandpa',
            color: '#1DB954', bg: 'rgba(29,185,84,0.06)', border: 'rgba(29,185,84,0.22)',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            ),
          },
        ].map(s => (
          <a
            key={s.platform}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 14, background: s.bg, border: `0.5px solid ${s.border}`, borderRadius: 10, padding: '12px 16px', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${s.color}18`, border: `0.5px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
              {s.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 2 }}>{s.platform}</div>
              <div style={{ fontSize: 13, color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.handle}</div>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        ))}
      </div>

      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: '#EAEAEA', marginBottom: 14 }}>
        Share the Platform
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 8, padding: '10px 14px', marginBottom: 14 }}>
        <span style={{ flex: 1, fontSize: 12, color: '#777', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" }}>
          {appUrl}
        </span>
        <button
          onClick={handleCopy}
          style={{ background: copied ? 'rgba(80,200,120,0.1)' : 'rgba(201,162,39,0.1)', border: copied ? '0.5px solid rgba(80,200,120,0.3)' : `0.5px solid rgba(201,162,39,0.3)`, color: copied ? '#5CC88A' : GOLD, borderRadius: 6, padding: '6px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.04em', transition: 'all 0.2s' }}
        >
          {copied ? '✓ Copied' : 'Copy Link'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {[
          { id: 'twitter',  label: 'X / Twitter', bg: 'rgba(0,0,0,0.3)',           border: 'rgba(255,255,255,0.1)', color: '#fff'    },
          { id: 'whatsapp', label: 'WhatsApp',     bg: 'rgba(37,211,102,0.08)',     border: 'rgba(37,211,102,0.3)',  color: '#25D366' },
          { id: 'linkedin', label: 'LinkedIn',     bg: 'rgba(10,102,194,0.08)',     border: 'rgba(10,102,194,0.3)', color: '#0A66C2' },
          { id: 'email',    label: 'Email',        bg: 'rgba(201,162,39,0.08)',     border: 'rgba(201,162,39,0.25)',color: GOLD      },
        ].map(s => (
          <button
            key={s.id}
            onClick={() => shareVia(s.id)}
            style={{ background: s.bg, border: `0.5px solid ${s.border}`, color: s.color, borderRadius: 8, padding: '10px 18px', fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: 'pointer', letterSpacing: '0.03em', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {s.label}
          </button>
        ))}
      </div>

      <Divider />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, color: '#555' }}>App Version</div>
          <div style={{ fontSize: 13, color: '#888', fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>v1.0.0</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#555' }}>Built by</div>
          <div style={{ fontSize: 13, color: '#888', fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>MGW Platform</div>
        </div>
      </div>
    </div>
  );
}
