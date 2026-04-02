import React from 'react';

const s = {
  greeting: {
    padding: '22px 20px 14px',
    borderBottom: '0.5px solid rgba(201,162,39,0.18)',
  },
  greetingSub: {
    fontSize: 10,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#C9A227',
    marginBottom: 4,
  },
  greetingTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 26,
    fontWeight: 500,
  },
  greetingDate: { fontSize: 11, color: '#999', marginTop: 3 },
  quickStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 1,
    background: 'rgba(201,162,39,0.18)',
    borderBottom: '0.5px solid rgba(201,162,39,0.18)',
  },
  stat: { background: '#0A0A0A', padding: '16px 14px', textAlign: 'center' },
  statVal: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 20,
    fontWeight: 600,
    color: '#C9A227',
    lineHeight: 1,
    marginBottom: 4,
  },
  statKey: { fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' },
  section: { padding: '20px 20px 0' },
  sectionHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 500 },
  seeAll: { fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A227', cursor: 'pointer' },
  sessionCard: {
    background: '#141414',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    display: 'flex',
    gap: 14,
    alignItems: 'center',
    cursor: 'pointer',
  },
  sessionTimeCol: { textAlign: 'center', flexShrink: 0, width: 48 },
  sessionDay: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 22,
    fontWeight: 600,
    color: '#C9A227',
    lineHeight: 1,
  },
  sessionMonth: { fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999' },
  divider: { width: 0.5, background: 'rgba(201,162,39,0.18)', alignSelf: 'stretch' },
  sessionInfo: { flex: 1 },
  sessionType: { fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A227', marginBottom: 3 },
  sessionName: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, marginBottom: 3 },
  sessionTime: { fontSize: 10, color: '#999' },
  badge: {
    flexShrink: 0,
    fontSize: 8,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 8px',
    borderRadius: 12,
    background: 'rgba(201,162,39,0.12)',
    color: '#C9A227',
    border: '0.5px solid rgba(201,162,39,0.3)',
  },
  contentScroll: {
    display: 'flex',
    gap: 10,
    overflowX: 'auto',
    paddingBottom: 4,
    scrollbarWidth: 'none',
    margin: '0 -20px',
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentThumb: { flexShrink: 0, width: 150, cursor: 'pointer' },
  thumbImg: {
    width: 150,
    height: 90,
    background: '#141414',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 6,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  thumbBg: { position: 'absolute', inset: 0 },
  playBtn: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'rgba(201,162,39,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  thumbTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 13,
    lineHeight: 1.3,
    marginBottom: 3,
  },
  thumbDur: { fontSize: 10, color: '#999' },
  announce: {
    background: 'linear-gradient(135deg, rgba(106,56,194,0.15) 0%, rgba(0,179,255,0.08) 100%)',
    border: '0.5px solid rgba(106,56,194,0.3)',
    borderRadius: 8,
    padding: '16px 18px',
    margin: 20,
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
  },
  announceIcon: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6A38C2, #00B3FF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14,
    fontWeight: 600,
    color: 'white',
  },
  announceLabel: { fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a57df5', marginBottom: 4 },
  announceText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  announceDate: { fontSize: 10, color: '#999', marginTop: 4 },
};

const thumbBgs = [
  'linear-gradient(135deg, #1a0d38 0%, #0d0820 100%)',
  'linear-gradient(135deg, #061520 0%, #0a0a0a 100%)',
  'linear-gradient(135deg, #1a1008 0%, #0a0a0a 100%)',
];

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0A0A0A" style={{ marginLeft: 1 }}>
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

/**
 * DashboardPage
 * Props:
 *  - user: { name: string }
 *  - stats: Array<{ val: string, key: string }>
 *  - sessions: Array<{ day: string, month: string, type: string, name: string, time: string, status: string }>
 *  - recentContent: Array<{ title: string, duration: string }>
 *  - announcement: { text: string, date: string } | null
 *  - onViewAllSessions: () => void
 *  - onOpenVault: () => void
 */
export default function DashboardPage({
  user = { name: 'Chisom Adeyemi' },
  stats = [
    { val: '3', key: 'Sessions' },
    { val: '14', key: 'Saved' },
    { val: 'Gold', key: 'Tier' },
  ],
  sessions = [
    { day: '08', month: 'Apr', type: '1-on-1 Mentorship', name: 'Creative Vision Intensive', time: '10:00 AM — 11:30 AM WAT', status: 'Confirmed' },
    { day: '15', month: 'Apr', type: 'Group Cohort', name: "Founder's Circle — Week 4", time: '2:00 PM — 4:00 PM WAT', status: 'Upcoming' },
  ],
  recentContent = [
    { title: 'Creative Brief Masterclass', duration: '32 min left' },
    { title: 'Industry Conversations III', duration: '58 min left' },
    { title: 'The Brand Lens — Session 2', duration: 'Full · 1h 20m' },
  ],
  announcement = { text: 'New masterclass dropping this Friday — Brand Architecture for the Digital Era.', date: 'Posted 2 days ago' },
  onViewAllSessions,
  onOpenVault,
}) {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div>
      {/* ── Greeting ── */}
      <div style={s.greeting}>
        <div style={s.greetingSub}>Welcome back</div>
        <div style={s.greetingTitle}>{user.name}</div>
        <div style={s.greetingDate}>{today}</div>
      </div>

      {/* ── Quick Stats ── */}
      <div style={s.quickStats}>
        {stats.map((st) => (
          <div key={st.key} style={s.stat}>
            <div style={s.statVal}>{st.val}</div>
            <div style={s.statKey}>{st.key}</div>
          </div>
        ))}
      </div>

      {/* ── Upcoming Sessions ── */}
      <div style={{ ...s.section, paddingTop: 20 }}>
        <div style={s.sectionHead}>
          <div style={s.sectionTitle}>Upcoming Sessions</div>
          <div style={s.seeAll} onClick={onViewAllSessions}>View all</div>
        </div>
        {sessions.map((sess) => (
          <div key={sess.name} style={s.sessionCard}>
            <div style={s.sessionTimeCol}>
              <div style={s.sessionDay}>{sess.day}</div>
              <div style={s.sessionMonth}>{sess.month}</div>
            </div>
            <div style={s.divider} />
            <div style={s.sessionInfo}>
              <div style={s.sessionType}>{sess.type}</div>
              <div style={s.sessionName}>{sess.name}</div>
              <div style={s.sessionTime}>{sess.time}</div>
            </div>
            <div style={s.badge}>{sess.status}</div>
          </div>
        ))}
      </div>

      {/* ── Continue Watching ── */}
      <div style={{ ...s.section, paddingTop: 20 }}>
        <div style={s.sectionHead}>
          <div style={s.sectionTitle}>Continue Watching</div>
          <div style={s.seeAll} onClick={onOpenVault}>Vault</div>
        </div>
        <div style={s.contentScroll}>
          {recentContent.map((item, i) => (
            <div key={item.title} style={s.contentThumb}>
              <div style={s.thumbImg}>
                <div style={{ ...s.thumbBg, background: thumbBgs[i % thumbBgs.length] }} />
                <div style={s.playBtn}><PlayIcon /></div>
              </div>
              <div style={s.thumbTitle}>{item.title}</div>
              <div style={s.thumbDur}>{item.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Announcement ── */}
      {announcement && (
        <div style={s.announce}>
          <div style={s.announceIcon}>M</div>
          <div>
            <div style={s.announceLabel}>From MGW</div>
            <div style={s.announceText}>{announcement.text}</div>
            <div style={s.announceDate}>{announcement.date}</div>
          </div>
        </div>
      )}

      <div style={{ height: 20 }} />
    </div>
  );
}
