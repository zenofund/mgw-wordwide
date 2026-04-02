import React, { useState } from 'react';

const s = {
  header: { padding: '22px 20px 16px', borderBottom: '0.5px solid rgba(201,162,39,0.18)' },
  title: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 500, marginBottom: 4 },
  subtitle: { fontSize: 11, color: '#999' },
  filters: {
    display: 'flex',
    gap: 8,
    padding: '14px 20px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    borderBottom: '0.5px solid rgba(201,162,39,0.18)',
  },
  filterPill: {
    flexShrink: 0,
    fontSize: 10,
    letterSpacing: '0.08em',
    padding: '6px 14px',
    borderRadius: 20,
    border: '0.5px solid rgba(201,162,39,0.18)',
    color: '#999',
    cursor: 'pointer',
    background: 'transparent',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all 0.2s',
  },
  filterPillActive: {
    background: '#C9A227',
    color: '#0A0A0A',
    borderColor: '#C9A227',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    padding: '16px 20px',
  },
  card: {
    background: '#141414',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 8,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  thumb: {
    width: '100%',
    aspectRatio: '16/9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  thumbBg: { position: 'absolute', inset: 0 },
  playIcon: { position: 'relative', zIndex: 1 },
  lockOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(10,10,10,0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  cardInfo: { padding: '10px 12px 12px' },
  typePill: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 7,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '3px 7px',
    borderRadius: 12,
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.3,
    marginBottom: 4,
  },
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
  pdf:   { background: 'rgba(201,162,39,0.15)', color: '#C9A227', border: '0.5px solid rgba(201,162,39,0.3)' },
};

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(201,162,39,0.85)">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5" opacity="0.7">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const FILTERS = ['All', 'Video', 'Audio', 'PDF', 'Interviews'];

const DEFAULT_CONTENT = [
  { id: 1, type: 'video', title: 'Creative Brief Masterclass', duration: '48 min', locked: false, bg: 1 },
  { id: 2, type: 'audio', title: 'Conversations Vol. 3', duration: '1h 12m · Premium', locked: true, bg: 2 },
  { id: 3, type: 'video', title: 'The Brand Lens — Part 2', duration: '1h 20m', locked: false, bg: 3 },
  { id: 4, type: 'pdf', title: 'Brand Strategy Framework', duration: '62 pages · Premium', locked: true, bg: 4 },
  { id: 5, type: 'video', title: 'Founder Mindset Intensive', duration: '55 min', locked: false, bg: 1 },
  { id: 6, type: 'audio', title: 'Industry Conversations Vol. 4', duration: '1h 5m', locked: true, bg: 2 },
  { id: 7, type: 'pdf', title: 'Creative Direction Handbook', duration: '48 pages', locked: true, bg: 3 },
  { id: 8, type: 'video', title: 'Brand Positioning Secrets', duration: '1h 10m', locked: false, bg: 4 },
];

export default function VaultPage({ content = DEFAULT_CONTENT, onItemClick }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? content
    : content.filter((c) => c.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div>
      <div className="mgw-vault-header" style={s.header}>
        <div className="mgw-vault-title-text" style={s.title}>Knowledge Vault</div>
        <div className="mgw-vault-subtitle" style={s.subtitle}>Exclusive content from Mavin Grandpa Worldwide</div>
      </div>

      {/* Filters */}
      <div className="mgw-vault-filters" style={s.filters}>
        {FILTERS.map((f) => (
          <button
            key={f}
            style={{ ...s.filterPill, ...(activeFilter === f ? s.filterPillActive : {}) }}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mgw-vault-page-grid" style={s.grid}>
        {filtered.map((item) => (
          <div key={item.id} style={s.card} onClick={() => onItemClick?.(item)}>
            <div style={s.thumb}>
              <div style={{ ...s.thumbBg, background: thumbBgs[item.bg] || thumbBgs[1] }} />
              <div style={s.playIcon}><PlayIcon /></div>
              {item.locked && (
                <div style={s.lockOverlay}><LockIcon /></div>
              )}
            </div>
            <div style={s.cardInfo}>
              <div style={{ ...s.typePill, ...pillStyles[item.type] }}>{item.type}</div>
              <div className="mgw-card-title" style={s.cardTitle}>{item.title}</div>
              <div className="mgw-card-dur" style={s.cardDur}>{item.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
