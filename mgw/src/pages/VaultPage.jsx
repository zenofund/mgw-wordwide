import React, { useState } from 'react';

const GOLD   = '#C9A227';
const PURPLE = '#6A38C2';
const BLUE   = '#00B3FF';

const s = {
  header: { padding: '22px 20px 16px' },
  title: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 500, marginBottom: 4 },
  subtitle: { fontSize: 11, color: '#999' },
  filters: { display: 'flex', gap: 8, padding: '14px 20px', overflowX: 'auto', scrollbarWidth: 'none' },
  filterPill: { flexShrink: 0, fontSize: 10, letterSpacing: '0.08em', padding: '6px 14px', borderRadius: 20, border: '0.5px solid rgba(201,162,39,0.18)', color: '#999', cursor: 'pointer', background: 'transparent', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' },
  filterPillActive: { background: GOLD, color: '#0A0A0A', borderColor: GOLD },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '16px 20px' },
  card: { background: '#141414', border: '0.5px solid rgba(201,162,39,0.18)', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' },
  thumb: { width: '100%', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  thumbBg: { position: 'absolute', inset: 0 },
  playIcon: { position: 'relative', zIndex: 1 },
  lockOverlay: { position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 2 },
  cardInfo: { padding: '10px 12px 12px' },
  typePill: { display: 'inline-flex', alignItems: 'center', fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 7px', borderRadius: 12, marginBottom: 6 },
  cardTitle: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, fontWeight: 500, lineHeight: 1.3, marginBottom: 4 },
  cardDur: { fontSize: 10, color: '#999' },
};

const thumbBgs = {
  1: 'linear-gradient(135deg, #1a0d38 0%, #0d0820 100%)',
  2: 'linear-gradient(135deg, #061520 0%, #0a0a0a 100%)',
  3: 'linear-gradient(135deg, #1a1008 0%, #0a0a0a 100%)',
  4: 'linear-gradient(135deg, #0d1a10 0%, #0a0a0a 100%)',
};

const pillStyles = {
  video: { background: 'rgba(106,56,194,0.2)', color: '#a57df5', border: '0.5px solid rgba(106,56,194,0.3)' },
  audio: { background: 'rgba(0,179,255,0.15)', color: '#5dcfff', border: '0.5px solid rgba(0,179,255,0.3)' },
  pdf:   { background: 'rgba(201,162,39,0.15)', color: GOLD, border: '0.5px solid rgba(201,162,39,0.3)' },
};

const TIER_LEVEL = { free: 0, standard: 1, premium: 2 };

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(201,162,39,0.85)">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const LockIcon = ({ size = 22, color = GOLD }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const FILTERS = ['All', 'Video', 'Audio', 'PDF'];

const TIER_BADGE = {
  free:     { label: 'Free',     color: '#555'    },
  standard: { label: 'Circle',   color: PURPLE    },
  premium:  { label: 'Premium',  color: GOLD      },
};

const DEFAULT_CONTENT = [
  { id: 1, type: 'video', title: 'Creative Brief Masterclass',    duration: '48 min',  tier: 'free',     bg: 1 },
  { id: 2, type: 'audio', title: 'Conversations Vol. 3',          duration: '1h 12m',  tier: 'premium',  bg: 2 },
  { id: 3, type: 'video', title: 'The Brand Lens — Part 2',       duration: '1h 20m',  tier: 'free',     bg: 3 },
  { id: 4, type: 'pdf',   title: 'Brand Strategy Framework',      duration: '62 pages',tier: 'premium',  bg: 4 },
  { id: 5, type: 'video', title: 'Founder Mindset Intensive',     duration: '55 min',  tier: 'free',     bg: 1 },
  { id: 6, type: 'audio', title: 'Industry Conversations Vol. 4', duration: '1h 5m',   tier: 'standard', bg: 2 },
  { id: 7, type: 'pdf',   title: 'Creative Direction Handbook',   duration: '48 pages',tier: 'standard', bg: 3 },
  { id: 8, type: 'video', title: 'Brand Positioning Secrets',     duration: '1h 10m',  tier: 'free',     bg: 4 },
];

export default function VaultPage({ content = DEFAULT_CONTENT, userTier = 'free', onItemClick }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const userLevel = TIER_LEVEL[userTier] ?? 0;

  const filtered = activeFilter === 'All'
    ? content
    : content.filter(c => c.type.toLowerCase() === activeFilter.toLowerCase());

  const isLocked = (item) => (TIER_LEVEL[item.tier] ?? 0) > userLevel;

  const tierBadge = TIER_BADGE[userTier];

  return (
    <div>
      <div className="mgw-vault-header" style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div className="mgw-vault-title-text" style={s.title}>Knowledge Vault</div>
            <div className="mgw-vault-subtitle" style={s.subtitle}>Exclusive content from Mavin Grandpa Worldwide</div>
          </div>
          {tierBadge && (
            <div style={{ background: `${tierBadge.color}18`, border: `0.5px solid ${tierBadge.color}50`, borderRadius: 20, padding: '5px 14px', fontSize: 10, color: tierBadge.color, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }}>
              {tierBadge.label} Access
            </div>
          )}
        </div>
      </div>

      <div className="mgw-vault-filters" style={s.filters}>
        {FILTERS.map(f => (
          <button key={f} style={{ ...s.filterPill, ...(activeFilter === f ? s.filterPillActive : {}) }} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="mgw-vault-page-grid" style={s.grid}>
        {filtered.map(item => {
          const locked = isLocked(item);
          const badge = TIER_BADGE[item.tier];
          return (
            <div key={item.id} style={{ ...s.card, opacity: locked ? 0.85 : 1 }} onClick={() => !locked && onItemClick?.(item)}>
              <div style={s.thumb}>
                <div style={{ ...s.thumbBg, background: thumbBgs[item.bg] || thumbBgs[1] }} />
                {!locked && <div style={s.playIcon}><PlayIcon /></div>}
                {locked && (
                  <div style={s.lockOverlay}>
                    <LockIcon />
                    {badge && (
                      <div style={{ fontSize: 9, color: badge.color, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, background: `${badge.color}18`, border: `0.5px solid ${badge.color}40`, borderRadius: 10, padding: '2px 8px' }}>
                        {badge.label}+
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div style={s.cardInfo}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ ...s.typePill, ...pillStyles[item.type] }}>{item.type}</div>
                  {locked && badge && (
                    <div style={{ fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 7px', borderRadius: 12, background: `${badge.color}15`, color: badge.color, border: `0.5px solid ${badge.color}30` }}>
                      {badge.label}
                    </div>
                  )}
                </div>
                <div className="mgw-card-title" style={{ ...s.cardTitle, color: locked ? '#666' : '#EAEAEA' }}>{item.title}</div>
                <div className="mgw-card-dur" style={s.cardDur}>{item.duration}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
