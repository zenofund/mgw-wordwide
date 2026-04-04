import React, { useState } from 'react';

const GOLD = '#C9A227';
const PURPLE = '#6A38C2';
const SURFACE = '#141414';
const BORDER = 'rgba(201,162,39,0.18)';

/* ─── shared tiny primitives ─── */
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

const statusColor = (status) => {
  if (!status) return { bg: 'rgba(201,162,39,0.12)', text: GOLD, border: 'rgba(201,162,39,0.3)' };
  const s = status.toLowerCase();
  if (s === 'confirmed') return { bg: 'rgba(80,200,120,0.12)', text: '#5CC88A', border: 'rgba(80,200,120,0.3)' };
  if (s === 'pending')   return { bg: 'rgba(201,162,39,0.12)', text: GOLD,      border: 'rgba(201,162,39,0.3)' };
  if (s === 'declined')  return { bg: 'rgba(220,60,60,0.1)',   text: '#FF6B6B', border: 'rgba(220,60,60,0.3)' };
  return { bg: 'rgba(201,162,39,0.12)', text: GOLD, border: 'rgba(201,162,39,0.3)' };
};

function StatusBadge({ label }) {
  const c = statusColor(label);
  return (
    <span style={{
      fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '4px 10px', borderRadius: 12,
      background: c.bg, color: c.text, border: `0.5px solid ${c.border}`,
      whiteSpace: 'nowrap', flexShrink: 0,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {label}
    </span>
  );
}

/* ─── NAV items ─── */
const NAV_ITEMS = [
  { id: 'home',    label: 'Home',         icon: '⊞' },
  { id: 'sessions',label: 'My Sessions',  icon: '◈' },
  { id: 'settings',label: 'Settings',     icon: '⚙', external: true },
  { id: 'about',   label: 'About & Share',icon: '◎', external: true },
];

/* ─── Sidebar ─── */
function DashSidebar({ active, onSelect, user, onNavigate }) {
  const tierColors = { free: '#555', standard: PURPLE, premium: GOLD };
  const tierColor  = tierColors[user?.tier] || '#555';
  const initial    = user?.name?.charAt(0)?.toUpperCase() || 'M';

  return (
    <>
      {/* User info strip at top of sidebar */}
      <div style={{
        padding: '20px 16px 14px',
        borderBottom: `0.5px solid ${BORDER}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: `${GOLD}18`, border: `1px solid ${GOLD}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 17, color: GOLD, fontWeight: 700, flexShrink: 0,
          }}>
            {initial}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 14, color: '#EAEAEA',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {user?.name || 'Member'}
            </div>
            {user?.plan && (
              <div style={{ fontSize: 9, color: tierColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
                {user.plan.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ padding: '8px 0' }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.external) {
                  onNavigate?.(item.id === 'settings' ? 'settings' : 'about');
                } else {
                  onSelect(item.id);
                }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', textAlign: 'left',
                background: isActive ? 'rgba(201,162,39,0.08)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? `2px solid ${GOLD}` : '2px solid transparent',
                borderRadius: '0 8px 8px 0',
                padding: '11px 16px',
                cursor: 'pointer',
                color: isActive ? GOLD : '#777',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 14, opacity: 0.75, width: 18, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
              {item.external && (
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#444' }}>↗</span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ─── Mobile top tab strip ─── */
function MobileTabStrip({ active, onSelect, onNavigate }) {
  return (
    <div style={{
      display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 20px 0',
      scrollbarWidth: 'none',
    }}>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.external) {
                onNavigate?.(item.id === 'settings' ? 'settings' : 'about');
              } else {
                onSelect(item.id);
              }
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
              background: isActive ? 'rgba(201,162,39,0.1)' : SURFACE,
              border: `0.5px solid ${isActive ? 'rgba(201,162,39,0.4)' : BORDER}`,
              borderRadius: 20, padding: '7px 14px',
              cursor: 'pointer',
              color: isActive ? GOLD : '#777',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11, letterSpacing: '0.03em',
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 13 }}>{item.icon}</span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── HOME section ─── */
function HomeSection({ user, vaultItems, stats, upcomingSessions, announcement, onViewAllSessions, onOpenVault }) {
  const recentContent = vaultItems.length > 0
    ? vaultItems.slice(0, 4).map(v => ({ title: v.title, duration: v.duration, type: v.type, bg: v.bg }))
    : [
        { title: 'Creative Brief Masterclass', duration: '32 min left',  type: 'video', bg: 1 },
        { title: 'Industry Conversations III', duration: '58 min left',  type: 'audio', bg: 2 },
        { title: 'The Brand Lens — Session 2', duration: 'Full · 1h 20m',type: 'video', bg: 3 },
      ];

  return (
    <div>
      {/* Continue Watching */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 500 }}>
            Continue Watching
          </div>
          <button
            onClick={onOpenVault}
            style={{ background: 'none', border: 'none', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, cursor: 'pointer', padding: 0 }}
          >
            Vault
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', margin: '0 -20px', paddingLeft: 20, paddingRight: 20 }}>
          {recentContent.map((item, i) => (
            <div key={item.title} style={{ flexShrink: 0, width: 150, cursor: 'pointer' }}>
              <div style={{ width: '100%', height: 90, background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 6, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: thumbBgs[i % thumbBgs.length] }} />
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(201,162,39,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  <PlayIcon />
                </div>
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, lineHeight: 1.3, marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontSize: 10, color: '#999' }}>{item.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, padding: '20px 20px 0' }}>
        {stats.map((st) => (
          <div key={st.key} style={{ background: SURFACE, border: `0.5px solid rgba(201,162,39,0.2)`, borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: GOLD, lineHeight: 1, marginBottom: 4 }}>{st.val}</div>
            <div style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>{st.key}</div>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 500 }}>
            Upcoming Sessions
          </div>
          <button
            onClick={onViewAllSessions}
            style={{ background: 'none', border: 'none', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, cursor: 'pointer', padding: 0 }}
          >
            View all
          </button>
        </div>
        {upcomingSessions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 0', fontSize: 12, color: '#555' }}>
            No upcoming sessions — <button onClick={onViewAllSessions} style={{ background: 'none', border: 'none', color: GOLD, cursor: 'pointer', fontSize: 12, padding: 0 }}>browse sessions</button>
          </div>
        ) : (
          upcomingSessions.map((sess) => (
            <div key={sess.name} style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 8, padding: 16, marginBottom: 10, display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ textAlign: 'center', flexShrink: 0, width: 48 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: GOLD, lineHeight: 1 }}>{sess.day}</div>
                <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999' }}>{sess.month}</div>
              </div>
              <div style={{ width: 0.5, background: BORDER, alignSelf: 'stretch' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, marginBottom: 3 }}>{sess.type}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, marginBottom: 3 }}>{sess.name}</div>
                <div style={{ fontSize: 10, color: '#999' }}>{sess.time}</div>
              </div>
              <StatusBadge label={sess.status} />
            </div>
          ))
        )}
      </div>

      {/* Announcement */}
      {announcement && (
        <div style={{ background: 'linear-gradient(135deg, rgba(106,56,194,0.15) 0%, rgba(0,179,255,0.08) 100%)', border: '0.5px solid rgba(106,56,194,0.3)', borderRadius: 8, padding: '16px 18px', margin: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6A38C2, #00B3FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 600, color: 'white' }}>
            M
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a57df5', marginBottom: 4 }}>The Dispatch</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, fontWeight: 500, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: announcement.text }} />
            <div style={{ fontSize: 10, color: '#999', marginTop: 4 }}>{announcement.date}</div>
          </div>
        </div>
      )}

      <div style={{ height: 32 }} />
    </div>
  );
}

/* ─── MY SESSIONS section ─── */
function MySessionsSection({ bookings, user, onBrowseSessions }) {
  const myBookings = bookings.filter(b =>
    !user || b.email === user?.email || b.userName === user?.name
  );

  if (myBookings.length === 0) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: '#555', marginBottom: 10 }}>
          No sessions yet
        </div>
        <div style={{ fontSize: 12, color: '#555', marginBottom: 20 }}>
          Browse available sessions and book your first one.
        </div>
        <button
          onClick={onBrowseSessions}
          style={{ background: 'rgba(201,162,39,0.1)', border: `0.5px solid rgba(201,162,39,0.35)`, color: GOLD, borderRadius: 8, padding: '11px 24px', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          Browse Sessions
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 20px 0' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 500, marginBottom: 16 }}>
        My Booked Sessions
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {myBookings.map((b) => {
          const sc = statusColor(b.status);
          return (
            <div key={b.id} style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: '#EAEAEA', flex: 1 }}>
                  {b.sessionTitle || b.typeLabel || b.type || 'Session'}
                </div>
                <StatusBadge label={b.status} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '8px 16px', marginBottom: b.zoom?.joinUrl ? 12 : 0 }}>
                {[
                  { k: 'Date', v: b.sessionDate || (b.day ? `April ${b.day}, 2026` : '—') },
                  { k: 'Time', v: b.time ? `${b.time} WAT` : '—' },
                  { k: 'Type', v: b.typeLabel || b.type || '—' },
                  { k: 'Amount', v: b.price || '—' },
                ].map(row => (
                  <div key={row.k}>
                    <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 3 }}>{row.k}</div>
                    <div style={{ fontSize: 12, color: '#EAEAEA', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{row.v}</div>
                  </div>
                ))}
              </div>

              {b.status === 'Pending' && (
                <div style={{ marginTop: 12, fontSize: 11, color: '#666', background: 'rgba(201,162,39,0.04)', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '8px 12px' }}>
                  Awaiting admin confirmation. Your Zoom link will appear here once confirmed.
                </div>
              )}

              {b.zoom?.joinUrl && (
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(74,144,217,0.06)', border: '0.5px solid rgba(74,144,217,0.2)', borderRadius: 7, padding: '10px 12px' }}>
                  <span style={{ fontSize: 10, color: '#4A90D9', letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1 }}>Zoom Link Ready</span>
                  <a href={b.zoom.joinUrl} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#4A90D9', textDecoration: 'none', padding: '5px 12px', borderRadius: 10, background: 'rgba(74,144,217,0.12)', border: '0.5px solid rgba(74,144,217,0.3)' }}>
                    ▶ Join
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ height: 32 }} />
    </div>
  );
}

/* ─── MAIN EXPORT ─── */
export default function DashboardPage({
  user = { name: 'Member' },
  vaultItems = [],
  bookings = [],
  stats = [
    { val: '3',    key: 'Sessions' },
    { val: '14',   key: 'Saved' },
    { val: 'Free', key: 'Tier' },
  ],
  upcomingSessions = [
    { day: '08', month: 'Apr', type: '1-on-1 Mentorship', name: 'Creative Vision Intensive', time: '10:00 AM — 11:30 AM WAT', status: 'Confirmed' },
    { day: '15', month: 'Apr', type: 'Group Cohort',       name: "Founder's Circle — Week 4",  time: '2:00 PM — 4:00 PM WAT', status: 'Upcoming' },
  ],
  announcement = null,
  onViewAllSessions,
  onOpenVault,
  onNavigate,
}) {
  const [activeSection, setActiveSection] = useState('home');

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div style={{ background: '#0A0A0A', color: '#EAEAEA', minHeight: '100vh' }}>

      {/* Page Hero */}
      <div style={{ padding: '48px 20px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', borderRadius: '50%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(106,56,194,0.18) 0%, transparent 70%)', top: -100, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 12, position: 'relative' }}>
          Member Area
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 500, lineHeight: 1.15, margin: '0 0 10px', position: 'relative' }}>
          Welcome back, <em style={{ color: GOLD }}>{user.name}</em>
        </h1>
        <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7, maxWidth: 480, margin: '0 auto', position: 'relative' }}>
          {today}
        </p>
      </div>

      {/* ── Mobile tab strip (hidden on desktop via CSS) ── */}
      <div className="mgw-dash-mobile-tabs">
        <MobileTabStrip active={activeSection} onSelect={setActiveSection} onNavigate={onNavigate} />
      </div>

      {/* ── Two-column layout ── */}
      <div className="mgw-dashboard-layout">

        {/* Left sidebar (desktop only via CSS) */}
        <div className="mgw-dashboard-sidebar">
          <DashSidebar
            active={activeSection}
            onSelect={setActiveSection}
            user={user}
            onNavigate={onNavigate}
          />
        </div>

        {/* Main content */}
        <div className="mgw-dashboard-main">
          {activeSection === 'home' && (
            <HomeSection
              user={user}
              vaultItems={vaultItems}
              stats={stats}
              upcomingSessions={upcomingSessions}
              announcement={announcement}
              onViewAllSessions={onViewAllSessions}
              onOpenVault={onOpenVault}
            />
          )}
          {activeSection === 'sessions' && (
            <MySessionsSection
              bookings={bookings}
              user={user}
              onBrowseSessions={onViewAllSessions}
            />
          )}
        </div>
      </div>
    </div>
  );
}
