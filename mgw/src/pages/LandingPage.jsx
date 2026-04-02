import React from 'react';
import Button from '../components/Button';

const s = {
  hero: {
    position: 'relative',
    height: 520,
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(160deg, #0e0710 0%, #0A0A0A 40%, #060810 100%)',
  },
  orb1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: '#6A38C2',
    filter: 'blur(60px)',
    opacity: 0.35,
    top: -60,
    right: -40,
    pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: '50%',
    background: '#C9A227',
    filter: 'blur(60px)',
    opacity: 0.2,
    bottom: 40,
    left: -30,
    pointerEvents: 'none',
  },
  portrait: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 280,
    height: 440,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  portraitGlow: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 300,
    background: 'radial-gradient(ellipse at 70% 50%, rgba(106,56,194,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 230,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 0 0 22px',
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
    marginBottom: 18,
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
    fontSize: 32,
    lineHeight: 1.1,
    fontWeight: 600,
    color: '#EAEAEA',
    marginBottom: 12,
  },
  heroTitleEm: {
    fontStyle: 'italic',
    color: '#C9A227',
  },
  heroSub: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#999',
    marginBottom: 24,
    fontWeight: 300,
  },
  heroBtns: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  statsBar: {
    display: 'flex',
    padding: '18px 20px',
    borderBottom: '0.5px solid rgba(201,162,39,0.18)',
  },
  statItem: {
    flex: 1,
    textAlign: 'center',
    padding: '0 8px',
  },
  statNum: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 22,
    fontWeight: 600,
    color: '#C9A227',
    lineHeight: 1,
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 9,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#999',
  },
  section: {
    padding: '28px 20px',
    borderBottom: '0.5px solid rgba(201,162,39,0.18)',
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
    top: 0,
    left: 0,
    right: 0,
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
  vaultItemWide: {
    gridColumn: '1 / -1',
  },
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
    top: 12,
    right: 12,
    opacity: 0.4,
  },
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
    lineHeight: 1.5,
    color: '#EAEAEA',
    marginBottom: 16,
  },
  testimonialSource: { display: 'flex', alignItems: 'center', gap: 10 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6A38C2, #00B3FF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 13,
    fontWeight: 600,
    color: 'white',
    flexShrink: 0,
  },
  testimonialName: { fontSize: 12, fontWeight: 500, marginBottom: 2 },
  testimonialRole: { fontSize: 10, color: '#999' },
  dots: { display: 'flex', gap: 6, marginTop: 16 },
  dot: { width: 5, height: 5, borderRadius: '50%', background: 'rgba(201,162,39,0.18)' },
  dotActive: { width: 16, borderRadius: 3, background: '#C9A227' },
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

const accentColors = {
  gold: '#C9A227',
  purple: '#6A38C2',
  blue: '#00B3FF',
};

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
    name: 'Adaeze J.',
    role: 'Creative Director, Lagos',
    initials: 'AJ',
    gradient: 'linear-gradient(135deg, #6A38C2, #00B3FF)',
  },
  {
    quote: '"The Brand Architecture intensive was transformative. Worth every dollar — the clarity I gained was unparalleled."',
    name: 'Emeka T.',
    role: 'Founder, Accra',
    initials: 'ET',
    gradient: 'linear-gradient(135deg, #C9A227, #6A38C2)',
  },
  {
    quote: '"As a creative entrepreneur, the Founder\'s Circle gave me frameworks I still use daily. Game-changing community."',
    name: 'Sola M.',
    role: 'Brand Strategist, Nairobi',
    initials: 'SM',
    gradient: 'linear-gradient(135deg, #00B3FF, #C9A227)',
  },
];

const STATS = [
  { num: '2.4K', label: 'Members' },
  { num: '180+', label: 'Sessions' },
  { num: '12yr', label: 'Experience' },
];

export default function LandingPage({ onJoinMembership, onBookSession, onBecomeMember }) {
  return (
    <div>
      {/* ── Hero ── */}
      <div className="mgw-hero" style={s.hero}>
        <div style={s.heroBg} />
        <div className="mgw-hero-orb1" style={s.orb1} />
        <div style={s.orb2} />

        <div className="mgw-hero-portrait" style={s.portrait}>
          <div style={{
            width: 240, height: 400,
            background: 'linear-gradient(180deg, #2a1a4a 0%, #1a1030 50%, #0d0820 100%)',
            borderRadius: '120px 120px 0 0',
            opacity: 0.85,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)',
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(145deg, #3d2060, #251245)',
            }} />
            <span style={{
              position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
              fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: '0.3em',
              color: '#C9A227', opacity: 0.5,
            }}>MGW</span>
          </div>
        </div>
        <div style={s.portraitGlow} />

        <div className="mgw-hero-content" style={s.heroContent}>
          <div style={s.badge}>
            <span style={s.badgeDot} />
            Private Circle
          </div>
          <h1 className="mgw-hero-title" style={s.heroTitle}>
            Mentorship for <em style={s.heroTitleEm}>Visionary</em> Creatives
          </h1>
          <p className="mgw-hero-subtitle" style={s.heroSub}>
            Join a private circle of creators, founders, and industry leaders learning from Mavin Grandpa.
          </p>
          <div className="mgw-hero-btns" style={s.heroBtns}>
            <Button variant="primary" size="md" onClick={onJoinMembership}>Join Membership</Button>
            <Button variant="ghost" size="md" onClick={onBookSession}>Book Session</Button>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="mgw-stats-bar" style={s.statsBar}>
        {STATS.map((st, i) => (
          <div key={st.label} className="mgw-stat-item" style={{
            ...s.statItem,
            borderRight: i < STATS.length - 1 ? '0.5px solid rgba(201,162,39,0.18)' : 'none',
          }}>
            <div style={s.statNum}>{st.num}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* ── Programs ── */}
      <div className="mgw-section" style={s.section}>
        <div className="mgw-inner">
          <div style={s.sectionLabel}>Programs</div>
          <div className="mgw-section-title-lg" style={s.sectionTitle}>Mentorship Tracks</div>
          <div style={s.sectionSub}>Structured programs designed for creative professionals at every stage.</div>
          <div className="mgw-programs-scroll" style={s.programsScroll}>
            {PROGRAMS.map((p) => (
              <div key={p.name} className="mgw-program-card" style={s.programCard}>
                <div style={{ ...s.programAccent, background: accentColors[p.accent] }} />
                <div style={s.programTag}>{p.tag}</div>
                <div style={s.programName}>{p.name}</div>
                <div style={s.programDesc}>{p.desc}</div>
                <div style={s.programMeta}>
                  <div>
                    <div style={s.programPrice}>{p.price}</div>
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
          <div style={s.sectionLabel}>Knowledge</div>
          <div className="mgw-section-title-lg" style={s.sectionTitle}>Private Vault</div>
          <div style={s.sectionSub}>Exclusive content from decades of creative industry mastery.</div>
          <div className="mgw-vault-preview-grid" style={s.vaultGrid}>
            {VAULT_ITEMS.map((item) => (
              <div key={item.title} style={s.vaultItem}>
                <div style={{ ...s.typePill, ...pillStyles[item.type] }}>{item.type}</div>
                <div style={s.vaultTitle}>{item.title}</div>
                <div style={s.vaultSub}>{item.sub}</div>
                {item.locked && <div style={s.lockIcon}><LockIcon /></div>}
              </div>
            ))}
            <div style={{ ...s.vaultItem, ...s.vaultItemWide }}>
              <div style={{ ...s.typePill, ...pillStyles.pdf }}>Guide</div>
              <div style={s.vaultTitle}>The MGW Brand Strategy Framework — Complete Edition</div>
              <div style={s.vaultSub}>62 pages · Premium members only</div>
              <div style={s.lockIcon}><LockIcon /></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="mgw-section" style={s.section}>
        <div className="mgw-inner">
          <div style={s.sectionLabel}>Testimonials</div>
          <div className="mgw-section-title-lg" style={s.sectionTitle}>What Leaders Say</div>
          <div className="mgw-testimonials-grid" style={{ marginTop: 4 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={s.testimonialCard}>
                <div style={s.testimonialQuote}>{t.quote}</div>
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
          <p style={s.joinSub}>
            A private membership for serious creatives. Access all programs, the Knowledge Vault, and priority consulting.
          </p>
          <Button variant="primary" size="full" onClick={onBecomeMember}>Become a Member</Button>
          <div style={s.joinNote}>Starting from $97 / month</div>
        </div>
      </div>
    </div>
  );
}
