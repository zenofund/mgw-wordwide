import React, { useState } from 'react';

const GOLD = '#C9A227';
const PURPLE = '#6A38C2';
const SURFACE = '#141414';
const BORDER = 'rgba(201,162,39,0.18)';

const TYPE_COLOR = {
  '1-on-1':    { bg: 'rgba(201,162,39,0.12)',  text: GOLD,    border: 'rgba(201,162,39,0.35)' },
  'Group':     { bg: 'rgba(106,56,194,0.12)',  text: '#9B62F0', border: 'rgba(106,56,194,0.35)' },
  'Intensive': { bg: 'rgba(0,179,255,0.1)',    text: '#00B3FF', border: 'rgba(0,179,255,0.3)' },
  'Masterclass':{ bg: 'rgba(80,200,120,0.1)', text: '#5CC88A', border: 'rgba(80,200,120,0.3)' },
  'Workshop':  { bg: 'rgba(255,150,50,0.1)',  text: '#FFA050', border: 'rgba(255,150,50,0.3)' },
};

const STATUS_LABEL = {
  Open:       { bg: 'rgba(80,200,120,0.12)',  text: '#5CC88A',  border: 'rgba(80,200,120,0.3)' },
  Scheduled:  { bg: 'rgba(201,162,39,0.1)',   text: GOLD,       border: 'rgba(201,162,39,0.3)' },
  Full:       { bg: 'rgba(220,60,60,0.1)',    text: '#FF6B6B',  border: 'rgba(220,60,60,0.3)' },
  Cancelled:  { bg: 'rgba(150,150,150,0.1)', text: '#666',      border: 'rgba(150,150,150,0.3)' },
};

const typeStyle = (type) => TYPE_COLOR[type] || TYPE_COLOR['1-on-1'];
const statusStyle = (status) => STATUS_LABEL[status] || STATUS_LABEL['Scheduled'];

function Badge({ label, style }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 9,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      fontWeight: 600,
      background: style.bg,
      color: style.text,
      border: `0.5px solid ${style.border}`,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {label}
    </span>
  );
}

function SessionCard({ session, onBook, booked }) {
  const ts = typeStyle(session.type);
  const ss = statusStyle(session.status);
  const bookable = session.status === 'Open' || session.status === 'Scheduled';

  return (
    <div style={{
      background: SURFACE,
      border: `0.5px solid ${BORDER}`,
      borderRadius: 12,
      padding: '20px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      transition: 'border-color 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.3,
            marginBottom: 6,
            color: '#EAEAEA',
          }}>
            {session.title}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge label={session.type} style={ts} />
            <Badge label={session.status} style={ss} />
          </div>
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 22,
          fontWeight: 600,
          color: GOLD,
          flexShrink: 0,
        }}>
          {session.price}
        </div>
      </div>

      {session.description && (
        <div style={{ fontSize: 12, color: '#777', lineHeight: 1.65 }}>
          {session.description}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '8px 16px',
      }}>
        {[
          { label: 'Date', value: session.date },
          { label: 'Time', value: `${session.time} WAT` },
        ].map(row => (
          <div key={row.label}>
            <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555', marginBottom: 3 }}>{row.label}</div>
            <div style={{ fontSize: 13, color: '#EAEAEA', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{row.value}</div>
          </div>
        ))}
      </div>

      {session.zoom?.joinUrl && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(74,144,217,0.06)', border: '0.5px solid rgba(74,144,217,0.2)', borderRadius: 7, padding: '8px 12px' }}>
          <span style={{ fontSize: 10, color: '#4A90D9', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Zoom Confirmed</span>
          <a href={session.zoom.joinUrl} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', fontSize: 11, color: '#4A90D9', textDecoration: 'none', padding: '3px 10px', borderRadius: 10, background: 'rgba(74,144,217,0.12)', border: '0.5px solid rgba(74,144,217,0.3)' }}>▶ Join</a>
        </div>
      )}

      {booked ? (
        <div style={{
          textAlign: 'center',
          padding: '11px',
          borderRadius: 8,
          background: 'rgba(80,200,120,0.08)',
          border: '0.5px solid rgba(80,200,120,0.3)',
          fontSize: 12,
          color: '#5CC88A',
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '0.04em',
        }}>
          ✓ Request Submitted — Pending Confirmation
        </div>
      ) : bookable ? (
        <button
          onClick={() => onBook(session)}
          style={{
            background: GOLD,
            color: '#0A0A0A',
            border: 'none',
            borderRadius: 8,
            padding: '12px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            width: '100%',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Book This Session
        </button>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '11px',
          borderRadius: 8,
          background: 'rgba(150,150,150,0.06)',
          border: `0.5px solid ${BORDER}`,
          fontSize: 12,
          color: '#555',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {session.status === 'Full' ? 'Session Full — No Spots Available' : 'Unavailable'}
        </div>
      )}
    </div>
  );
}

function BookModal({ session, user, onConfirm, onClose }) {
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [error, setError] = useState('');
  const [step, setStep] = useState('details');
  const [paying, setPaying] = useState(false);

  const handleProceed = () => {
    setError('');
    if (!email || !email.includes('@')) { setError('Please enter a valid email address.'); return; }
    if (!name.trim()) { setError('Please enter your name.'); return; }
    setStep('payment');
  };

  const handlePay = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 1500));
    const ref = `MGW-SES-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setPaying(false);
    onConfirm({ name, email, paystackRef: ref });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={!paying ? onClose : undefined} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', background: '#141414', border: `0.5px solid ${BORDER}`, borderRadius: 14, padding: '28px 24px', width: '100%', maxWidth: 420, margin: '0 20px', zIndex: 1 }}>
        {!paying && <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 16, background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 18 }}>✕</button>}

        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, marginBottom: 4, color: '#EAEAEA' }}>
          {step === 'payment' ? 'Confirm Payment' : 'Book Session'}
        </div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 20 }}>{session.title}</div>

        <div style={{ background: 'rgba(201,162,39,0.05)', border: `0.5px solid ${BORDER}`, borderRadius: 8, padding: '12px 14px', marginBottom: 20 }}>
          {[
            { k: 'Date', v: session.date },
            { k: 'Time', v: `${session.time} WAT` },
            { k: 'Type', v: session.type },
            { k: 'Price', v: session.price },
          ].map(row => (
            <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 12 }}>
              <span style={{ color: '#666' }}>{row.k}</span>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, color: '#EAEAEA' }}>{row.v}</span>
            </div>
          ))}
        </div>

        {step === 'details' && (
          <>
            {!user?.name && (
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '10px 14px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', marginBottom: 10, boxSizing: 'border-box' }}
              />
            )}
            {!user?.email && (
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '10px 14px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', marginBottom: 10, boxSizing: 'border-box' }}
              />
            )}
            {error && (
              <div style={{ background: 'rgba(220,60,60,0.1)', border: '0.5px solid rgba(220,60,60,0.3)', borderRadius: 6, padding: '9px 12px', fontSize: 12, color: '#FF6B6B', marginBottom: 10 }}>
                {error}
              </div>
            )}
            <button
              onClick={handleProceed}
              style={{ width: '100%', background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 8, padding: '13px', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Continue to Payment
            </button>
          </>
        )}

        {step === 'payment' && (
          <>
            <div style={{ background: 'rgba(0,179,255,0.05)', border: '0.5px solid rgba(0,179,255,0.2)', borderRadius: 8, padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(0,179,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00B3FF" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#EAEAEA', marginBottom: 2 }}>Paystack Secure Checkout</div>
                <div style={{ fontSize: 10, color: '#666' }}>Your payment is protected and encrypted</div>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={paying}
              style={{ width: '100%', background: paying ? '#555' : GOLD, color: '#0A0A0A', border: 'none', borderRadius: 8, padding: '13px', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: paying ? 'not-allowed' : 'pointer', opacity: paying ? 0.7 : 1 }}
            >
              {paying ? 'Processing Payment…' : `Pay ${session.price}`}
            </button>
            <div style={{ marginTop: 10, fontSize: 10, color: '#555', textAlign: 'center' }}>
              Admin will confirm your spot and send a Zoom link.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const FILTER_OPTIONS = ['All', 'Open', 'Scheduled', '1-on-1', 'Group', 'Masterclass', 'Intensive'];

export default function SessionsPage({ sessions = [], user, onBook, onNavigate }) {
  const [filter, setFilter] = useState('All');
  const [bookingSession, setBookingSession] = useState(null);
  const [bookedIds, setBookedIds] = useState(new Set());

  const visible = sessions.filter(s => {
    if (s.status === 'Cancelled') return false;
    if (filter === 'All') return true;
    return s.status === filter || s.type === filter;
  });

  const handleBook = (session) => {
    if (!user) {
      onNavigate?.('auth', { view: 'login' });
      return;
    }
    setBookingSession(session);
  };

  const handleConfirm = ({ name, email, paystackRef }) => {
    const ref = paystackRef || `MGW-SES-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    onBook?.({
      sessionTitle: bookingSession.title,
      sessionDate: bookingSession.date,
      typeLabel: bookingSession.type,
      type: bookingSession.type,
      time: bookingSession.time,
      price: bookingSession.price,
      email: email || user?.email,
      userName: name || user?.name || email,
      paystackRef: ref,
      status: 'Pending',
    });
    setBookedIds(prev => new Set([...prev, bookingSession.id]));
    setBookingSession(null);
  };

  return (
    <div style={{ background: '#0A0A0A', color: '#EAEAEA', minHeight: '100vh' }}>
      <div className="mgw-page-container">
        <div style={{ padding: '28px 0 16px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>
            Live &amp; Upcoming
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 500, marginBottom: 8 }}>
            Sessions
          </div>
          <div style={{ fontSize: 13, color: '#777', maxWidth: 480, lineHeight: 1.7 }}>
            Browse upcoming mentorship sessions and masterclasses. Book your spot directly.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '0 0 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {FILTER_OPTIONS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'rgba(201,162,39,0.12)' : '#141414',
                border: filter === f ? `0.5px solid rgba(201,162,39,0.4)` : `0.5px solid ${BORDER}`,
                color: filter === f ? GOLD : '#888',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 11,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.04em',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: '#444', marginBottom: 8 }}>
              No sessions available
            </div>
            <div style={{ fontSize: 12, color: '#555' }}>
              Check back soon — new sessions are added regularly.
            </div>
          </div>
        ) : (
          <div className="mgw-sessions-grid">
            {visible.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                onBook={handleBook}
                booked={bookedIds.has(session.id)}
              />
            ))}
          </div>
        )}

        {!user && visible.length > 0 && (
          <div style={{ margin: '0 0 40px', background: 'rgba(201,162,39,0.05)', border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, marginBottom: 3 }}>
                Sign in to book a session
              </div>
              <div style={{ fontSize: 11, color: '#666' }}>
                Members get priority access and session recordings.
              </div>
            </div>
            <button
              onClick={() => onNavigate?.('auth', { view: 'login' })}
              style={{ background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 7, padding: '10px 20px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {bookingSession && (
        <BookModal
          session={bookingSession}
          user={user}
          onConfirm={handleConfirm}
          onClose={() => setBookingSession(null)}
        />
      )}
    </div>
  );
}
