import React from 'react';
import Button from '../components/Button';
import brandPhoto from '@assets/Mavin-Grandpa-Worldwide-11_1775177601294.jpeg';

const s = {
  /* ── Hero ── */
  hero: {
    position: 'relative',
    height: 520,
    overflow: 'hidden',
    background: '#08050f',
  },

  /* Mobile-first: absolute hero content — full width, text over bg image */
  heroContent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 24px',
    zIndex: 3,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(201,162,39,0.12)',
    border: '0.5px solid rgba(201,162,39,0.35)',
    borderRadius: 20,
    padding: '4px 10px',
    fontSize: 9,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#C9A227',
    marginBottom: 16,
    width: 'fit-content',
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#C9A227',
    animation: 'mgw-pulse 2s ease-in-out infinite',
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 30,
    lineHeight: 1.1,
    fontWeight: 600,
    color: '#EAEAEA',
    marginBottom: 10,
  },
  heroTitleEm: {
    fontStyle: 'italic',
    color: '#C9A227',
  },
  heroSub: {
    fontSize: 12,
    lineHeight: 1.7,
    color: '#999',
    marginBottom: 22,
    fontWeight: 300,
  },
  heroBtns: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },

  /* ── Stats ── */
  statsBar: {
    display: 'flex',
    gap: 12,
    padding: '28px 20px',
  },
  statCard: {
    flex: 1,
    background: 'linear-gradient(145deg, #1a1520 0%, #111019 100%)',
    border: '0.5px solid rgba(201,162,39,0.28)',
    borderRadius: 12,
    padding: '16px 10px 14px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  statCardTopBar: {
    position: 'absolute',
    top: 0, left: '20%', right: '20%',
    height: 1.5,
    background: 'linear-gradient(90deg, transparent, #C9A227, transparent)',
    borderRadius: 2,
  },
  statNum: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 26,
    fontWeight: 700,
    color: '#C9A227',
    lineHeight: 1,
    marginBottom: 5,
    letterSpacing: '-0.01em',
  },
  statLabel: {
    fontSize: 8,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#888',
    lineHeight: 1.3,
  },

  /* ── Sections ── */
  section: {
    padding: '28px 20px',
  },
  sectionLabel: {
    fontSize: 9,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#C9A227',
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 12,
    color: '#999',
    lineHeight: 1.6,
    marginBottom: 20,
  },

  /* ── Programs ── */
  programsScroll: {
    display: 'flex',
    gap: 12,
    overflowX: 'auto',
    paddingBottom: 4,
    scrollbarWidth: 'none',
    margin: '0 -20px',
    paddingLeft: 20,
    paddingRight: 20,
  },
  programCard: {
    flexShrink: 0,
    width: 200,
    background: '#141414',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 8,
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  programAccent: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 2,
  },
  programTag: {
    fontSize: 9,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: 8,
  },
  programName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: 8,
    color: '#EAEAEA',
  },
  programDesc: {
    fontSize: 11,
    color: '#999',
    lineHeight: 1.5,
    marginBottom: 14,
  },
  programMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  programPrice: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 20,
    fontWeight: 600,
    color: '#C9A227',
  },
  programDuration: {
    fontSize: 9,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#999',
  },

  /* ── Vault preview ── */
  vaultGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  vaultItem: {
    background: '#141414',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 6,
    padding: 14,
    cursor: 'pointer',
    position: 'relative',
    minHeight: 100,
  },
  vaultItemWide: { gridColumn: '1 / -1' },
  typePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 8,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '3px 7px',
    borderRadius: 12,
    marginBottom: 8,
  },
  vaultTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.3,
    marginBottom: 4,
  },
  vaultSub: { fontSize: 10, color: '#999' },
  lockIcon: {
    position: 'absolute',
    top: 12, right: 12,
    opacity: 0.4,
  },

  /* ── Testimonials ── */
  testimonialCard: {
    background: '#141414',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 8,
    padding: 20,
  },
  testimonialQuote: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 1.55,
    color: '#EAEAEA',
    marginBottom: 16,
  },
  testimonialSource: { display: 'flex', alignItems: 'center', gap: 10 },
  avatar: {
    width: 36, height: 36,
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 13, fontWeight: 600, color: 'white',
    flexShrink: 0,
  },
  testimonialName: { fontSize: 12, fontWeight: 500, marginBottom: 2 },
  testimonialRole: { fontSize: 10, color: '#999' },
  dots: { display: 'flex', gap: 6, marginTop: 16 },
  dot: { width: 5, height: 5, borderRadius: '50%', background: 'rgba(201,162,39,0.18)' },
  dotActive: { width: 16, borderRadius: 3, background: '#C9A227' },

  /* ── Join CTA ── */
  joinSection: {
    padding: '36px 20px',
    textAlign: 'center',
    background: 'linear-gradient(180deg, #0A0A0A 0%, #0d0720 100%)',
  },
  joinTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 28,
    fontWeight: 600,
    lineHeight: 1.2,
    marginBottom: 10,
  },
  joinSub: { fontSize: 12, color: '#999', lineHeight: 1.6, marginBottom: 24 },
  joinNote: { fontSize: 10, color: '#999', letterSpacing: '0.05em', marginTop: 10 },
};

const accentColors = { gold: '#C9A227', purple: '#6A38C2', blue: '#00B3FF' };

const pillStyles = {
  video: { background: 'rgba(106,56,194,0.2)', color: '#a57df5', border: '0.5px solid rgba(106,56,194,0.3)' },
  audio: { background: 'rgba(0,179,255,0.15)', color: '#5dcfff', border: '0.5px solid rgba(0,179,255,0.3)' },
  pdf:   { background: 'rgba(201,162,39,0.15)', color: '#C9A227', border: '0.5px solid rgba(201,162,39,0.3)' },
};

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* ── Brand Personality Image Panel ── */
function BrandImage() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: 520,
      background: '#08050f',
      overflow: 'hidden',
    }}>
      {/* Real brand photo — cinematic filters to match luxury dark theme */}
      <img
        src={brandPhoto}
        alt="Mavin Grandpa"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          filter: 'brightness(0.82) contrast(1.14) saturate(0.65)',
          display: 'block',
        }}
      />

      {/* Purple atmospheric overlay — ties image into the brand palette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 30%, rgba(106,56,194,0.28) 0%, transparent 65%)',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }} />

      {/* Left-edge fade — smooth blend into the hero text side */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(8,5,15,0.55) 0%, transparent 35%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade — blends into the next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
        background: 'linear-gradient(to top, #08050f 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Thin gold vertical line — left edge accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 1,
        background: 'linear-gradient(180deg, transparent 0%, rgba(201,162,39,0.45) 30%, rgba(201,162,39,0.45) 70%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Gold corner accents */}
      <div style={{ position: 'absolute', top: 28, left: 28, width: 22, height: 22,
        borderTop: '1px solid rgba(201,162,39,0.55)', borderLeft: '1px solid rgba(201,162,39,0.55)' }} />
      <div style={{ position: 'absolute', top: 28, right: 28, width: 22, height: 22,
        borderTop: '1px solid rgba(201,162,39,0.55)', borderRight: '1px solid rgba(201,162,39,0.55)' }} />
      <div style={{ position: 'absolute', bottom: 28, left: 28, width: 22, height: 22,
        borderBottom: '1px solid rgba(201,162,39,0.55)', borderLeft: '1px solid rgba(201,162,39,0.55)' }} />
      <div style={{ position: 'absolute', bottom: 28, right: 28, width: 22, height: 22,
        borderBottom: '1px solid rgba(201,162,39,0.55)', borderRight: '1px solid rgba(201,162,39,0.55)' }} />

      {/* Name tag — bottom of panel */}
      <div style={{
        position: 'absolute', bottom: 40, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        zIndex: 2,
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'rgba(201,162,39,0.65)',
        }}>Mavin Grandpa</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 0.5, background: 'rgba(201,162,39,0.3)' }} />
          <div style={{ width: 4, height: 4, background: 'rgba(201,162,39,0.5)', transform: 'rotate(45deg)' }} />
          <div style={{ width: 36, height: 0.5, background: 'rgba(201,162,39,0.3)' }} />
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(201,162,39,0.35)',
        }}>Worldwide</div>
      </div>
    </div>
  );
}


const PROGRAMS = [
  { tag: 'Flagship', name: 'Creative Mastery', desc: 'One-on-one mentorship for creative directors and brand visionaries.', price: '$1,200', duration: '8 Weeks', accent: 'gold' },
  { tag: 'Group', name: "Founder's Circle", desc: 'Cohort-based program for creative entrepreneurs building ventures.', price: '$480', duration: '6 Weeks', accent: 'purple' },
  { tag: 'Intensive', name: 'Brand Architecture', desc: 'Deep-dive consulting for brands requiring strategic repositioning.', price: '$2,500', duration: '3 Days', accent: 'blue' },
];

const VAULT_ITEMS = [
  { type: 'video', title: 'The Creative Brief Masterclass', sub: '48 min', locked: true },
  { type: 'audio', title: 'Industry Conversations Vol. 3', sub: '1 hr 12 min', locked: true },
];

const TESTIMONIALS = [
  {
    quote: '"Mavin Grandpa reshaped how I think about creative direction. My brand doubled its reach within three months of our sessions."',
    name: 'Adaeze J.', role: 'Creative Director, Lagos',
    initials: 'AJ', gradient: 'linear-gradient(135deg, #6A38C2, #00B3FF)',
  },
  {
    quote: '"The Brand Architecture intensive was transformative. Worth every dollar — the clarity I gained was unparalleled."',
    name: 'Emeka T.', role: 'Founder, Accra',
    initials: 'ET', gradient: 'linear-gradient(135deg, #C9A227, #6A38C2)',
  },
  {
    quote: '"As a creative entrepreneur, the Founder\'s Circle gave me frameworks I still use daily. Game-changing community."',
    name: 'Sola M.', role: 'Brand Strategist, Nairobi',
    initials: 'SM', gradient: 'linear-gradient(135deg, #00B3FF, #C9A227)',
  },
];

const STATS = [
  { num: '2.4K', label: 'Members' },
  { num: '180+', label: 'Sessions' },
  { num: '12yr', label: 'Experience' },
];

export default function LandingPage({ onJoinMembership, onBookSession, onBecomeMember, onOpenVault }) {
  return (
    <div>
      {/* ── Hero ── */}
      <div className="mgw-hero" style={s.hero}>

        {/* Mobile: Brand image as full background (hidden on desktop) */}
        <div className="mgw-hero-bg-image">
          <BrandImage />
        </div>

        {/* Mobile: Gradient overlay so text is readable over the bg image */}
        <div className="mgw-hero-text-overlay" />

        {/* Left: Hero Content */}
        <div className="mgw-hero-left" style={s.heroContent}>
          <div className="mgw-hero-badge" style={s.badge}>
            <span style={s.badgeDot} />
            Private Circle
          </div>
          <h1 className="mgw-hero-title" style={s.heroTitle}>
            Mentorship for{' '}
            <em style={s.heroTitleEm}>Visionary</em>{' '}
            Creatives
          </h1>
          <p className="mgw-hero-subtitle" style={s.heroSub}>
            Join a private circle of creators, founders, and industry leaders learning from Mavin Grandpa.
          </p>
          <div className="mgw-hero-btns" style={s.heroBtns}>
            <Button variant="primary" size="md" onClick={onJoinMembership}>Join Membership</Button>
            <Button variant="ghost" size="md" onClick={onBookSession}>Book Session</Button>
          </div>
        </div>

        {/* Right: Brand Personality Image (desktop only, right column) */}
        <div className="mgw-hero-right">
          <BrandImage />
        </div>

      </div>

      {/* ── Stats ── */}
      <div className="mgw-stats-bar" style={s.statsBar}>
        {STATS.map((st) => (
          <div key={st.label} className="mgw-stat-card" style={s.statCard}>
            <div style={s.statCardTopBar} />
            <div className="mgw-stat-num" style={s.statNum}>{st.num}</div>
            <div className="mgw-stat-label" style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* ── Programs ── */}
      <div className="mgw-section" style={s.section}>
        <div className="mgw-inner">
          <div className="mgw-section-label" style={s.sectionLabel}>Programs</div>
          <div className="mgw-section-title-lg" style={s.sectionTitle}>Mentorship Tracks</div>
          <div className="mgw-section-sub" style={s.sectionSub}>Structured programs designed for creative professionals at every stage.</div>
          <div className="mgw-programs-scroll" style={s.programsScroll}>
            {PROGRAMS.map((p) => (
              <div key={p.name} className="mgw-program-card" style={s.programCard}>
                <div style={{ ...s.programAccent, background: accentColors[p.accent] }} />
                <div className="mgw-program-tag" style={s.programTag}>{p.tag}</div>
                <div className="mgw-program-name" style={s.programName}>{p.name}</div>
                <div className="mgw-program-desc" style={s.programDesc}>{p.desc}</div>
                <div style={s.programMeta}>
                  <div>
                    <div className="mgw-program-price" style={s.programPrice}>{p.price}</div>
                    <div style={s.programDuration}>{p.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Vault Preview ── */}
      <div className="mgw-section" style={s.section}>
        <div className="mgw-inner">
          <div className="mgw-section-label" style={s.sectionLabel}>Knowledge</div>
          <div className="mgw-section-title-lg" style={s.sectionTitle}>Private Vault</div>
          <div className="mgw-section-sub" style={s.sectionSub}>Exclusive content from decades of creative industry mastery.</div>
          <div className="mgw-vault-preview-grid" style={s.vaultGrid}>
            {VAULT_ITEMS.map((item) => (
              <div
                key={item.title}
                style={{ ...s.vaultItem, transition: 'border-color 0.2s', cursor: 'pointer' }}
                onClick={onOpenVault}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.18)'; }}
              >
                <div style={{ ...s.typePill, ...pillStyles[item.type] }}>{item.type}</div>
                <div className="mgw-vault-item-title" style={s.vaultTitle}>{item.title}</div>
                <div style={s.vaultSub}>{item.sub}</div>
                {item.locked && <div style={s.lockIcon}><LockIcon /></div>}
              </div>
            ))}
            <div
              style={{ ...s.vaultItem, ...s.vaultItemWide, transition: 'border-color 0.2s', cursor: 'pointer' }}
              onClick={onOpenVault}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.18)'; }}
            >
              <div style={{ ...s.typePill, ...pillStyles.pdf }}>Guide</div>
              <div className="mgw-vault-item-title" style={s.vaultTitle}>The MGW Brand Strategy Framework — Complete Edition</div>
              <div style={s.vaultSub}>62 pages · Premium members only</div>
              <div style={s.lockIcon}><LockIcon /></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="mgw-section" style={s.section}>
        <div className="mgw-inner">
          <div className="mgw-section-label" style={s.sectionLabel}>Testimonials</div>
          <div className="mgw-section-title-lg" style={s.sectionTitle}>What Leaders Say</div>
          <div className="mgw-testimonials-grid" style={{ marginTop: 4 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={s.testimonialCard}>
                <div className="mgw-testimonial-quote" style={s.testimonialQuote}>{t.quote}</div>
                <div style={s.testimonialSource}>
                  <div style={{ ...s.avatar, background: t.gradient }}>{t.initials}</div>
                  <div>
                    <div style={s.testimonialName}>{t.name}</div>
                    <div style={s.testimonialRole}>{t.role}</div>
                  </div>
                </div>
                {i === 0 && (
                  <div style={s.dots}>
                    <div style={{ ...s.dot, ...s.dotActive }} />
                    <div style={s.dot} />
                    <div style={s.dot} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Join CTA ── */}
      <div className="mgw-join-section" style={s.joinSection}>
        <div className="mgw-join-inner">
          <div style={{ ...s.sectionLabel, textAlign: 'center' }}>Exclusive Access</div>
          <div className="mgw-join-title" style={s.joinTitle}>
            Join the <em style={{ fontStyle: 'italic', color: '#C9A227' }}>Inner Circle</em>
          </div>
          <p className="mgw-join-sub" style={s.joinSub}>
            A private membership for serious creatives. Access all programs, the Knowledge Vault, and priority consulting.
          </p>
          <Button variant="primary" size="full" onClick={onBecomeMember}>Become a Member</Button>
          <div style={s.joinNote}>Starting from $97 / month</div>
        </div>
      </div>
    </div>
  );
}
