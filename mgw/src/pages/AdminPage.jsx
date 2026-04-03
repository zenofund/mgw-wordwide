import React, { useState } from 'react';

const GOLD = '#C9A227';
const PURPLE = '#6A38C2';
const BLUE = '#00B3FF';
const SURFACE = '#111';
const BORDER = 'rgba(201,162,39,0.18)';
const TEXT_DIM = '#888';

const Icon = ({ d, size = 16, color = '#999' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const SIDEBAR_ITEMS = [
  { id: 'overview',       label: 'Overview',       icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
  { id: 'bookings',       label: 'Bookings',       icon: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 14l2 2 4-4M8 2h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z' },
  { id: 'sessions',       label: 'Sessions',       icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { id: 'programs',       label: 'Programs',       icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z' },
  { id: 'vault',          label: 'Vault',          icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { id: 'plans',          label: 'Plans',          icon: 'M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { id: 'consultancy',    label: 'Consultancy',    icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
  { id: 'members',        label: 'Members',        icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  { id: 'announcements',  label: 'The Dispatch',   icon: 'M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z' },
];

const StatCard = ({ label, value, delta, accent = GOLD }) => (
  <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '18px 16px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
    <div className="mgw-admin-stat-label" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 8 }}>{label}</div>
    <div className="mgw-admin-stat-value" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: accent, fontWeight: 600, lineHeight: 1 }}>{value}</div>
    {delta && <div className="mgw-admin-stat-delta" style={{ fontSize: 10, color: '#5a9', marginTop: 6 }}>{delta}</div>}
  </div>
);

const SectionHeader = ({ title, sub, action, onAction }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
    <div>
      <div className="mgw-admin-section-title" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{title}</div>
      {sub && <div className="mgw-admin-section-sub" style={{ fontSize: 12, color: TEXT_DIM }}>{sub}</div>}
    </div>
    {action && (
      <button onClick={onAction} className="mgw-admin-section-action" style={{ background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>{action}</button>
    )}
  </div>
);

const Table = ({ cols, rows, onEdit, onDelete }) => (
  <div style={{ overflowX: 'auto' }}>
    <table className="mgw-admin-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
      <thead>
        <tr>
          {cols.map(c => (
            <th key={c} className="mgw-admin-table-th" style={{ textAlign: 'left', padding: '8px 12px', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, borderBottom: `0.5px solid ${BORDER}`, whiteSpace: 'nowrap' }}>{c}</th>
          ))}
          <th style={{ padding: '8px 12px', borderBottom: `0.5px solid ${BORDER}` }} />
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: `0.5px solid rgba(255,255,255,0.04)` }}>
            {row.map((cell, j) => (
              <td key={j} className="mgw-admin-table-td" style={{ padding: '12px 12px', color: typeof cell === 'string' && cell.startsWith('$') ? GOLD : '#EAEAEA', whiteSpace: 'nowrap' }}>{cell}</td>
            ))}
            <td style={{ padding: '12px 12px', whiteSpace: 'nowrap' }}>
              <button onClick={() => onEdit?.(i)} className="mgw-admin-table-btn" style={{ background: 'none', border: `0.5px solid ${BORDER}`, color: '#999', borderRadius: 4, padding: '4px 10px', fontSize: 10, cursor: 'pointer', marginRight: 6, fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
              <button onClick={() => onDelete?.(i)} className="mgw-admin-table-btn" style={{ background: 'none', border: '0.5px solid rgba(220,60,60,0.3)', color: '#c55', borderRadius: 4, padding: '4px 10px', fontSize: 10, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Badge = ({ label, color }) => (
  <span className="mgw-admin-badge" style={{
    display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontSize: 9,
    letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
    background: color === 'gold' ? 'rgba(201,162,39,0.15)' : color === 'purple' ? 'rgba(106,56,194,0.15)' : color === 'green' ? 'rgba(80,200,120,0.15)' : 'rgba(150,150,150,0.15)',
    color: color === 'gold' ? GOLD : color === 'purple' ? '#9B62F0' : color === 'green' ? '#5CC88A' : '#999',
  }}>{label}</span>
);

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} />
    <div style={{ position: 'relative', background: '#141414', border: `0.5px solid ${BORDER}`, borderRadius: 12, padding: '28px 24px', width: '100%', maxWidth: 480, margin: '0 20px', zIndex: 1, maxHeight: '90vh', overflowY: 'auto' }}>
      <div className="mgw-admin-modal-title" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, marginBottom: 20 }}>{title}</div>
      {children}
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: TEXT_DIM, cursor: 'pointer', fontSize: 18 }}>✕</button>
    </div>
  </div>
);

const Field = ({ label, type = 'text', value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    <label className="mgw-admin-field-label" style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 6 }}>{label}</label>
    {type === 'select' ? (
      <select value={value} onChange={e => onChange(e.target.value)} className="mgw-admin-field-input" style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', boxSizing: 'border-box' }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    ) : type === 'textarea' ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} className="mgw-admin-field-input" style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', resize: 'vertical', minHeight: 70, boxSizing: 'border-box' }} />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="mgw-admin-field-input" style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
    )}
  </div>
);

const SaveBtn = ({ children, onClick, disabled }) => (
  <button onClick={!disabled ? onClick : undefined} className="mgw-admin-save-btn" style={{ marginTop: 8, width: '100%', background: disabled ? '#555' : GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '11px', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: disabled ? 0.7 : 1, transition: 'background 0.2s, opacity 0.2s' }}>
    {children}
  </button>
);

function sessionStatusColor(s) {
  if (s === 'Open' || s === 'Confirmed') return 'green';
  if (s === 'Full' || s === 'In Progress') return 'purple';
  if (s === 'Cancelled') return 'red';
  return 'gold';
}

function OverviewSection() {
  const recentActivity = [
    { action: 'New member joined', who: 'Adaeze Okonkwo', time: '2 min ago', type: 'member' },
    { action: 'Session booked', who: 'Emeka Nwosu — Creative Direction', time: '18 min ago', type: 'session' },
    { action: 'Consultancy request', who: 'Brand Strategy — TechStart Lagos', time: '1 hr ago', type: 'consult' },
    { action: 'Plan upgraded', who: 'Chidi Eze → Premium Circle', time: '3 hr ago', type: 'plan' },
    { action: 'Vault content unlocked', who: 'Creative Brief Masterclass', time: '5 hr ago', type: 'vault' },
  ];
  const typeColor = { member: GOLD, session: '#9B62F0', consult: BLUE, plan: GOLD, vault: '#5CC88A' };

  return (
    <div>
      <SectionHeader title="Platform Overview" sub="Real-time snapshot of the MGW mentorship ecosystem." />
      <div className="mgw-admin-stats-grid">
        <StatCard label="Total Members" value="2,418" delta="↑ 34 this month" accent={GOLD} />
        <StatCard label="Active Sessions" value="47" delta="↑ 8 this week" accent={PURPLE} />
        <StatCard label="Monthly Revenue" value="$38.2K" delta="↑ 12% vs last month" accent={GOLD} />
        <StatCard label="Consultancy Requests" value="12" delta="3 pending review" accent={BLUE} />
      </div>

      <div style={{ marginTop: 28, display: 'grid', gap: 16 }} className="mgw-admin-two-col">
        <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '18px 16px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 14 }}>Recent Activity</div>
          {recentActivity.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: i < recentActivity.length - 1 ? `0.5px solid rgba(255,255,255,0.04)` : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeColor[a.type], marginTop: 4, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: '#EAEAEA', marginBottom: 2 }}>{a.action}</div>
                <div style={{ fontSize: 11, color: TEXT_DIM, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.who}</div>
              </div>
              <div style={{ fontSize: 10, color: '#555', flexShrink: 0 }}>{a.time}</div>
            </div>
          ))}
        </div>

        <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '18px 16px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 14 }}>Subscription Breakdown</div>
          {[
            { label: 'Inner Circle', count: 842, pct: 35, color: GOLD },
            { label: 'Creative Circle', count: 1104, pct: 46, color: PURPLE },
            { label: 'Open Access', count: 472, pct: 19, color: '#555' },
          ].map(p => (
            <div key={p.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                <span style={{ color: '#EAEAEA' }}>{p.label}</span>
                <span style={{ color: TEXT_DIM }}>{p.count} members</span>
              </div>
              <div style={{ background: '#222', borderRadius: 4, height: 4, overflow: 'hidden' }}>
                <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}

          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 14, marginTop: 24 }}>Revenue This Month</div>
          {[
            { label: 'Sessions', value: '$14.1K', pct: 37, color: PURPLE },
            { label: 'Memberships', value: '$18.4K', pct: 48, color: GOLD },
            { label: 'Consultancy', value: '$5.7K', pct: 15, color: BLUE },
          ].map(p => (
            <div key={p.label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
                <span style={{ color: '#EAEAEA' }}>{p.label}</span>
                <span style={{ color: p.color, fontWeight: 500 }}>{p.value}</span>
              </div>
              <div style={{ background: '#222', borderRadius: 4, height: 3, overflow: 'hidden' }}>
                <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SessionsSection({ availableDays, setAvailableDays, timeSlots, setTimeSlots }) {
  const [tab, setTab] = useState('sessions');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [zoomLoading, setZoomLoading] = useState(false);
  const [zoomError, setZoomError] = useState('');
  const [form, setForm] = useState({ title: '', type: '1-on-1', date: '', time: '', price: '', status: 'Scheduled', createZoom: true });
  const [sessions, setSessions] = useState([
    { title: 'Creative Direction Deep Dive', type: '1-on-1', date: 'Apr 10, 2026', time: '11:00 AM', price: '$300', status: 'Scheduled', zoom: null },
    { title: "Founder's Circle — April Cohort", type: 'Group', date: 'Apr 14, 2026', time: '3:00 PM', price: '$480', status: 'Open', zoom: null },
    { title: 'Brand Architecture Intensive', type: 'Intensive', date: 'Apr 18, 2026', time: '9:00 AM', price: '$2,500', status: 'Full', zoom: null },
    { title: 'Creative Strategy Session', type: '1-on-1', date: 'Apr 22, 2026', time: '2:00 PM', price: '$300', status: 'Scheduled', zoom: null },
    { title: 'Masterclass: Music Business 101', type: 'Masterclass', date: 'Apr 28, 2026', time: '6:00 PM', price: '$120', status: 'Open', zoom: null },
  ]);
  const [newSlotTime, setNewSlotTime] = useState('');

  const zoomLink = (zoom) => zoom?.joinUrl ? (
    <a href={zoom.joinUrl} target="_blank" rel="noreferrer" style={{ color: '#4A90D9', fontSize: 10, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 10, background: 'rgba(74,144,217,0.12)', border: '0.5px solid rgba(74,144,217,0.3)', whiteSpace: 'nowrap' }}>
      ▶ Join Zoom
    </a>
  ) : <span style={{ fontSize: 10, color: '#444' }}>—</span>;

  const rows = sessions.map(s => [s.title, s.type, s.date, s.time, s.price, <Badge label={s.status} color={sessionStatusColor(s.status)} />, zoomLink(s.zoom)]);

  const openAdd = () => {
    setForm({ title: '', type: '1-on-1', date: '', time: '', price: '', status: 'Scheduled', createZoom: true });
    setZoomError('');
    setEditIndex(null);
    setShowModal(true);
  };

  const openEdit = (i) => {
    setForm({ ...sessions[i], createZoom: false });
    setZoomError('');
    setEditIndex(i);
    setShowModal(true);
  };

  const handleSave = async () => {
    setZoomError('');
    const row = { title: form.title, type: form.type, date: form.date, time: form.time, price: form.price, status: form.status, zoom: editIndex !== null ? sessions[editIndex].zoom : null };

    if (form.createZoom && editIndex === null) {
      setZoomLoading(true);
      try {
        const res = await fetch('/api/zoom/create-meeting', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: form.title, date: form.date, time: form.time, type: form.type }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create Zoom meeting');
        row.zoom = data;
      } catch (err) {
        setZoomError(err.message);
        setZoomLoading(false);
        return;
      }
      setZoomLoading(false);
    }

    if (editIndex !== null) {
      setSessions(prev => prev.map((s, idx) => idx === editIndex ? row : s));
    } else {
      setSessions(prev => [row, ...prev]);
    }
    setShowModal(false);
  };

  const toggleDay = (day) => {
    setAvailableDays(prev => {
      const next = new Set(prev);
      if (next.has(day)) { next.delete(day); } else { next.add(day); }
      return next;
    });
  };

  const toggleSlotBooked = (i) => {
    setTimeSlots(prev => prev.map((sl, idx) => idx === i ? { ...sl, booked: !sl.booked } : sl));
  };

  const addSlot = () => {
    const t = newSlotTime.trim();
    if (!t) return;
    setTimeSlots(prev => [...prev, { time: t, booked: false }]);
    setNewSlotTime('');
  };

  const removeSlot = (i) => {
    setTimeSlots(prev => prev.filter((_, idx) => idx !== i));
  };

  const APRIL_OFFSET = 3;
  const APRIL_DAYS = 30;
  const calCells = [...Array(APRIL_OFFSET).fill(null), ...Array.from({ length: APRIL_DAYS }, (_, i) => i + 1)];

  const tabBtn = (id, label) => (
    <button
      onClick={() => setTab(id)}
      style={{
        background: tab === id ? 'rgba(201,162,39,0.12)' : 'none',
        border: tab === id ? `0.5px solid rgba(201,162,39,0.35)` : '0.5px solid transparent',
        color: tab === id ? GOLD : '#888',
        borderRadius: 6, padding: '7px 16px', cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        letterSpacing: '0.05em', textTransform: 'uppercase',
      }}
    >{label}</button>
  );

  return (
    <div>
      <SectionHeader title="Sessions" sub="Manage booked sessions and control availability on the booking page." action={tab === 'sessions' ? '+ New Session' : undefined} onAction={openAdd} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {tabBtn('sessions', 'Sessions')}
        {tabBtn('availability', 'Availability')}
      </div>

      {tab === 'sessions' && (
        <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
          <Table cols={['Title', 'Type', 'Date', 'Time', 'Price', 'Status', 'Meeting']} rows={rows} onEdit={openEdit} onDelete={i => setSessions(prev => prev.filter((_, idx) => idx !== i))} />
        </div>
      )}

      {tab === 'availability' && (
        <div style={{ display: 'grid', gap: 16 }} className="mgw-admin-two-col">

          {/* Calendar Availability */}
          <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '18px 16px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 4 }}>Available Days — April 2026</div>
            <div style={{ fontSize: 11, color: '#555', marginBottom: 16 }}>Click a day to toggle it open or blocked on the booking calendar.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, textAlign: 'center', marginBottom: 6 }}>
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                <div key={d} style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', padding: '4px 0' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
              {calCells.map((day, i) => {
                if (!day) return <div key={i} />;
                const available = availableDays?.has(day);
                return (
                  <button
                    key={i}
                    onClick={() => toggleDay(day)}
                    style={{
                      aspectRatio: '1',
                      border: 'none',
                      borderRadius: '50%',
                      fontSize: 11,
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      background: available ? 'rgba(201,162,39,0.18)' : '#1a1a1a',
                      color: available ? GOLD : '#444',
                      fontWeight: available ? 500 : 300,
                      transition: 'all 0.15s',
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#666' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(201,162,39,0.18)', display: 'inline-block' }} />
                Available
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#666' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '0.5px solid #333', display: 'inline-block' }} />
                Blocked
              </span>
            </div>
          </div>

          {/* Time Slots */}
          <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '18px 16px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 4 }}>Time Slots</div>
            <div style={{ fontSize: 11, color: '#555', marginBottom: 16 }}>These slots appear on the booking page. Toggle booked/available or remove them.</div>

            <div style={{ marginBottom: 16 }}>
              {timeSlots?.map((sl, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: `0.5px solid rgba(255,255,255,0.04)` }}>
                  <span style={{ fontSize: 12, color: sl.booked ? '#555' : '#EAEAEA', textDecoration: sl.booked ? 'line-through' : 'none' }}>{sl.time}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => toggleSlotBooked(i)}
                      style={{ background: sl.booked ? 'rgba(201,162,39,0.1)' : 'rgba(80,200,120,0.1)', border: `0.5px solid ${sl.booked ? 'rgba(201,162,39,0.3)' : 'rgba(80,200,120,0.3)'}`, color: sl.booked ? GOLD : '#5CC88A', borderRadius: 4, padding: '3px 10px', fontSize: 9, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {sl.booked ? 'Booked' : 'Open'}
                    </button>
                    <button
                      onClick={() => removeSlot(i)}
                      style={{ background: 'none', border: '0.5px solid rgba(220,60,60,0.3)', color: '#c55', borderRadius: 4, padding: '3px 10px', fontSize: 9, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={newSlotTime}
                onChange={e => setNewSlotTime(e.target.value)}
                placeholder="e.g. 2:00 PM"
                style={{ flex: 1, background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '8px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none' }}
                onKeyDown={e => e.key === 'Enter' && addSlot()}
              />
              <button
                onClick={addSlot}
                style={{ background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }}
              >
                + Add Slot
              </button>
            </div>
          </div>

        </div>
      )}

      {showModal && (
        <Modal title={editIndex !== null ? 'Edit Session' : 'Create New Session'} onClose={() => !zoomLoading && setShowModal(false)}>
          <Field label="Session Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <Field label="Type" type="select" value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))} options={['1-on-1', 'Group', 'Intensive', 'Masterclass', 'Workshop']} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Date" type="text" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} placeholder="Apr 10, 2026" />
            <Field label="Time" type="text" value={form.time} onChange={v => setForm(f => ({ ...f, time: v }))} placeholder="11:00 AM" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Price" type="text" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} />
            <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Scheduled', 'Open', 'Full', 'Cancelled']} />
          </div>

          {editIndex === null && (
            <div style={{ background: 'rgba(74,144,217,0.06)', border: '0.5px solid rgba(74,144,217,0.25)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ color: '#4A90D9', fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Generate Zoom Meeting</div>
                <div style={{ color: '#888', fontSize: 11 }}>Automatically creates a scheduled Zoom meeting and stores the join link.</div>
              </div>
              <div
                onClick={() => setForm(f => ({ ...f, createZoom: !f.createZoom }))}
                style={{ width: 40, height: 22, borderRadius: 11, background: form.createZoom ? '#4A90D9' : '#333', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}
              >
                <div style={{ position: 'absolute', top: 3, left: form.createZoom ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
              </div>
            </div>
          )}

          {zoomError && (
            <div style={{ background: 'rgba(220,60,60,0.1)', border: '0.5px solid rgba(220,60,60,0.3)', borderRadius: 8, padding: '10px 12px', color: '#FF6B6B', fontSize: 12 }}>
              {zoomError}
            </div>
          )}

          <SaveBtn onClick={handleSave} disabled={zoomLoading}>
            {zoomLoading
              ? 'Creating Zoom Meeting…'
              : editIndex !== null ? 'Update Session' : (form.createZoom ? 'Create Session + Zoom' : 'Create Session')}
          </SaveBtn>
        </Modal>
      )}
    </div>
  );
}

function ProgramsSection() {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: '', desc: '', duration: '', price: '', track: 'Flagship', enrolled: '0', status: 'Active' });
  const [programs, setPrograms] = useState([
    { name: 'Creative Mastery', track: 'Flagship', duration: '8 Weeks', price: '$1,200', enrolled: '24', status: 'Active' },
    { name: "Founder's Circle", track: 'Group', duration: '6 Weeks', price: '$480', enrolled: '12', status: 'Active' },
    { name: 'Brand Architecture', track: 'Intensive', duration: '3 Days', price: '$2,500', enrolled: '6', status: 'Active' },
    { name: 'Music Business Essentials', track: 'Masterclass', duration: '4 Weeks', price: '$240', enrolled: '50', status: 'Draft' },
  ]);

  const statusColor = (s) => s === 'Active' ? 'green' : s === 'Draft' ? 'gold' : 'purple';
  const rows = programs.map(p => [p.name, p.track, p.duration, p.price, p.enrolled, <Badge label={p.status} color={statusColor(p.status)} />]);

  const openAdd = () => {
    setForm({ name: '', desc: '', duration: '', price: '', track: 'Flagship', enrolled: '0', status: 'Active' });
    setEditIndex(null);
    setShowModal(true);
  };

  const openEdit = (i) => {
    setForm({ ...programs[i], desc: '' });
    setEditIndex(i);
    setShowModal(true);
  };

  const handleSave = () => {
    const row = { name: form.name, track: form.track, duration: form.duration, price: form.price, enrolled: form.enrolled, status: form.status };
    if (editIndex !== null) {
      setPrograms(prev => prev.map((p, idx) => idx === editIndex ? row : p));
    } else {
      setPrograms(prev => [row, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <SectionHeader title="Mentorship Programs" sub="Create and manage structured mentorship tracks and masterclasses." action="+ New Program" onAction={openAdd} />
      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table cols={['Program', 'Track', 'Duration', 'Price', 'Enrolled', 'Status']} rows={rows} onEdit={openEdit} onDelete={i => setPrograms(prev => prev.filter((_, idx) => idx !== i))} />
      </div>
      {showModal && (
        <Modal title={editIndex !== null ? 'Edit Program' : 'Create New Program'} onClose={() => setShowModal(false)}>
          <Field label="Program Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <Field label="Description" type="textarea" value={form.desc} onChange={v => setForm(f => ({ ...f, desc: v }))} />
          <Field label="Track Type" type="select" value={form.track} onChange={v => setForm(f => ({ ...f, track: v }))} options={['Flagship', 'Group', 'Intensive', 'Masterclass', 'Workshop']} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Duration" value={form.duration} onChange={v => setForm(f => ({ ...f, duration: v }))} />
            <Field label="Price" type="text" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Enrolled" type="text" value={form.enrolled} onChange={v => setForm(f => ({ ...f, enrolled: v }))} />
            <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Active', 'Draft', 'Archived']} />
          </div>
          <SaveBtn onClick={handleSave}>{editIndex !== null ? 'Update Program' : 'Create Program'}</SaveBtn>
        </Modal>
      )}
    </div>
  );
}

const SOURCE_OPTIONS = {
  Video:               ['YouTube', 'Vimeo', 'Server'],
  Audio:               ['YouTube', 'Spotify', 'Server'],
  PDF:                 ['Server'],
  Masterclass:         ['YouTube', 'Vimeo', 'Server'],
  'Workshop Recording':['YouTube', 'Vimeo', 'Server'],
};

const SOURCE_ICONS = {
  YouTube: '▶',
  Vimeo:   '◉',
  Spotify: '♪',
  Server:  '⬆',
};

const SOURCE_HINT = {
  YouTube: 'https://www.youtube.com/watch?v=...',
  Vimeo:   'https://vimeo.com/...',
  Spotify: 'https://open.spotify.com/track/... or episode link',
  Server:  null,
};

function SourceInput({ source, url, onUrl }) {
  if (source === 'Server') {
    return (
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 6 }}>Upload File</label>
        <div style={{ border: `0.5px dashed ${BORDER}`, borderRadius: 6, padding: '22px', textAlign: 'center', color: TEXT_DIM, fontSize: 12, cursor: 'pointer', background: '#0e0e0e' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>⬆</div>
          Click to select or drag & drop file here
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 6 }}>{source} URL</label>
      <input
        type="url"
        value={url}
        onChange={e => onUrl(e.target.value)}
        placeholder={SOURCE_HINT[source]}
        style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
      />
    </div>
  );
}

const TYPE_FORM_MAP = { video: 'Video', audio: 'Audio', pdf: 'PDF', masterclass: 'Masterclass', 'workshop recording': 'Workshop Recording' };

function VaultSection({ vaultItems, setVaultItems, plans }) {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const EMPTY_FORM = { title: '', description: '', type: 'Video', source: 'YouTube', url: '', duration: '', accessPlans: [], series: '', seriesOrder: '', status: 'Published' };
  const [form, setForm] = useState(EMPTY_FORM);

  const statusColor = (s) => s === 'Published' ? 'green' : s === 'Draft' ? 'gold' : 'purple';

  const sourceTag = (src) => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px',
      borderRadius: 10, fontWeight: 500,
      background: src === 'YouTube' ? 'rgba(255,0,0,0.12)' : src === 'Vimeo' ? 'rgba(26,183,234,0.12)' : src === 'Spotify' ? 'rgba(29,185,84,0.12)' : 'rgba(201,162,39,0.12)',
      color: src === 'YouTube' ? '#ff6b6b' : src === 'Vimeo' ? '#4ecde6' : src === 'Spotify' ? '#1db954' : GOLD,
    }}>
      {SOURCE_ICONS[src]} {src}
    </span>
  );

  const accessLabel = (item) => {
    if (!item.accessPlans || item.accessPlans.length === 0) return 'All Plans';
    return item.accessPlans.join(', ');
  };

  const rows = vaultItems.map(v => [
    v.title,
    TYPE_FORM_MAP[v.type?.toLowerCase()] || v.type,
    sourceTag(v.source),
    v.duration,
    v.series || '—',
    accessLabel(v),
    <Badge label={v.status} color={statusColor(v.status)} />,
  ]);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditIndex(null);
    setShowModal(true);
  };

  const openEdit = (i) => {
    const v = vaultItems[i];
    setForm({
      title: v.title || '',
      description: v.description || '',
      type: TYPE_FORM_MAP[v.type?.toLowerCase()] || 'Video',
      source: v.source || 'YouTube',
      url: v.url || '',
      duration: v.duration || '',
      accessPlans: v.accessPlans || [],
      series: v.series || '',
      seriesOrder: v.seriesOrder != null ? String(v.seriesOrder) : '',
      status: v.status || 'Published',
    });
    setEditIndex(i);
    setShowModal(true);
  };

  const handleTypeChange = (type) => {
    const sources = SOURCE_OPTIONS[type] || ['Server'];
    const source = sources.includes(form.source) ? form.source : sources[0];
    setForm(f => ({ ...f, type, source, url: '' }));
  };

  const togglePlan = (planName, checked) => {
    setForm(f => {
      const next = checked
        ? [...f.accessPlans.filter(p => p !== planName), planName]
        : f.accessPlans.filter(p => p !== planName);
      return { ...f, accessPlans: next };
    });
  };

  const handleSave = () => {
    const item = {
      id: editIndex !== null ? vaultItems[editIndex].id : Date.now(),
      title: form.title,
      description: form.description,
      type: form.type.toLowerCase(),
      source: form.source,
      url: form.url,
      duration: form.duration,
      accessPlans: form.accessPlans,
      series: form.series,
      seriesOrder: parseInt(form.seriesOrder) || 0,
      status: form.status,
      bg: editIndex !== null ? (vaultItems[editIndex].bg || 1) : ((vaultItems.length % 4) + 1),
    };
    if (editIndex !== null) {
      setVaultItems(prev => prev.map((v, idx) => idx === editIndex ? item : v));
    } else {
      setVaultItems(prev => [item, ...prev]);
    }
    setShowModal(false);
  };

  const availableSources = SOURCE_OPTIONS[form.type] || ['Server'];

  return (
    <div>
      <SectionHeader title="Vault Content" sub="Manage exclusive educational content — map to plans, group into series." action="+ Upload Content" onAction={openAdd} />
      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table cols={['Title', 'Type', 'Source', 'Length', 'Series', 'Access', 'Status']} rows={rows} onEdit={openEdit} onDelete={i => setVaultItems(prev => prev.filter((_, idx) => idx !== i))} />
      </div>

      {showModal && (
        <Modal title={editIndex !== null ? 'Edit Vault Content' : 'Add Vault Content'} onClose={() => setShowModal(false)}>
          <Field label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <Field label="Description" type="textarea" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} />

          <Field label="Content Type" type="select" value={form.type} onChange={handleTypeChange} options={['Video', 'Audio', 'PDF', 'Masterclass', 'Workshop Recording']} />

          {/* Source selector */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 8 }}>Media Source</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {availableSources.map(src => (
                <button
                  key={src}
                  onClick={() => setForm(f => ({ ...f, source: src, url: '' }))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 7, cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: form.source === src ? 500 : 300,
                    border: form.source === src
                      ? `0.5px solid ${src === 'YouTube' ? '#ff6b6b' : src === 'Vimeo' ? '#4ecde6' : src === 'Spotify' ? '#1db954' : GOLD}`
                      : `0.5px solid ${BORDER}`,
                    background: form.source === src
                      ? src === 'YouTube' ? 'rgba(255,0,0,0.1)' : src === 'Vimeo' ? 'rgba(26,183,234,0.1)' : src === 'Spotify' ? 'rgba(29,185,84,0.1)' : 'rgba(201,162,39,0.1)'
                      : '#1a1a1a',
                    color: form.source === src
                      ? src === 'YouTube' ? '#ff6b6b' : src === 'Vimeo' ? '#4ecde6' : src === 'Spotify' ? '#1db954' : GOLD
                      : '#666',
                    transition: 'all 0.15s',
                  }}
                >
                  <span>{SOURCE_ICONS[src]}</span> {src}
                </button>
              ))}
            </div>
          </div>

          <SourceInput source={form.source} url={form.url} onUrl={v => setForm(f => ({ ...f, url: v }))} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Duration / Length" value={form.duration} onChange={v => setForm(f => ({ ...f, duration: v }))} />
            <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Published', 'Draft', 'Archived']} />
          </div>

          {/* Series */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
            <Field label="Series Name (optional)" value={form.series} onChange={v => setForm(f => ({ ...f, series: v }))} />
            <Field label="Episode #" value={form.seriesOrder} onChange={v => setForm(f => ({ ...f, seriesOrder: v }))} />
          </div>

          {/* Plan access */}
          <div style={{ marginBottom: 14 }}>
            <label className="mgw-admin-field-label" style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 10 }}>
              Available to Plans
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6, background: form.accessPlans.length === 0 ? 'rgba(201,162,39,0.07)' : '#1a1a1a', border: `0.5px solid ${form.accessPlans.length === 0 ? BORDER : 'rgba(255,255,255,0.06)'}`, cursor: 'pointer', marginBottom: 6 }}>
              <input
                type="checkbox"
                checked={form.accessPlans.length === 0}
                onChange={() => setForm(f => ({ ...f, accessPlans: [] }))}
                style={{ accentColor: GOLD, width: 14, height: 14 }}
              />
              <span style={{ fontSize: 12, color: form.accessPlans.length === 0 ? GOLD : '#EAEAEA', fontFamily: "'DM Sans', sans-serif" }}>All Plans (no restriction)</span>
            </label>
            {(plans || []).map(plan => {
              const checked = form.accessPlans.includes(plan.name);
              return (
                <label key={plan.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6, background: checked ? `${plan.color}0f` : '#1a1a1a', border: `0.5px solid ${checked ? `${plan.color}40` : 'rgba(255,255,255,0.06)'}`, cursor: 'pointer', marginBottom: 6, transition: 'all 0.15s' }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={e => togglePlan(plan.name, e.target.checked)}
                    style={{ accentColor: plan.color || GOLD, width: 14, height: 14 }}
                  />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: plan.color || GOLD, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: checked ? plan.color || GOLD : '#EAEAEA', fontFamily: "'DM Sans', sans-serif" }}>{plan.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: '#555' }}>{plan.price}/{plan.billing === 'Free' ? 'Free' : 'mo'}</span>
                </label>
              );
            })}
          </div>

          <SaveBtn onClick={handleSave}>{editIndex !== null ? 'Update Content' : 'Save Content'}</SaveBtn>
        </Modal>
      )}
    </div>
  );
}

function PlansSection({ plans, setPlans }) {
  const [showModal, setShowModal] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', billing: 'Monthly', sessions: '', vault: 'Partial', extraFeatures: '' });

  const openAdd = () => {
    setForm({ name: '', price: '', billing: 'Monthly', sessions: '', vault: 'Partial', extraFeatures: '' });
    setEditPlan(null);
    setShowModal(true);
  };

  const openEdit = (plan) => {
    setForm({
      name: plan.name,
      price: plan.price.replace('$', ''),
      billing: plan.billing,
      sessions: '',
      vault: 'Partial',
      extraFeatures: (plan.features || []).join('\n'),
    });
    setEditPlan(plan.name);
    setShowModal(true);
  };

  const handleSave = () => {
    const extraLines = form.extraFeatures
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    const baseFeatures = form.sessions ? [`${form.sessions} sessions`, `Vault: ${form.vault}`] : [];
    const allFeatures = editPlan !== null
      ? extraLines
      : [...baseFeatures, ...extraLines];

    if (editPlan !== null) {
      setPlans(prev => prev.map(p => p.name === editPlan
        ? { ...p, name: form.name, price: `$${form.price}`, billing: form.billing, features: allFeatures.length ? allFeatures : p.features }
        : p
      ));
    } else {
      setPlans(prev => [...prev, { name: form.name, price: `$${form.price}`, billing: form.billing, features: allFeatures, color: GOLD, members: 0 }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <SectionHeader title="Subscription Plans" sub="Define, price, and manage membership tiers." action="+ New Plan" onAction={openAdd} />
      <div className="mgw-admin-plans-grid">
        {plans.map((plan) => (
          <div key={plan.name} style={{ background: SURFACE, border: `0.5px solid ${plan.color}40`, borderRadius: 12, padding: '22px 18px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: plan.color }} />
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{plan.name}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: plan.color, fontWeight: 600, marginBottom: 2 }}>{plan.price}</div>
            <div style={{ fontSize: 10, color: TEXT_DIM, marginBottom: 16 }}>{plan.billing}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
              {plan.features.map(f => (
                <li key={f} style={{ fontSize: 12, color: '#EAEAEA', padding: '4px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: plan.color, fontSize: 10 }}>✦</span>{f}
                </li>
              ))}
            </ul>
            <div style={{ fontSize: 11, color: TEXT_DIM }}>{plan.members.toLocaleString()} members</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button onClick={() => openEdit(plan)} style={{ flex: 1, background: 'none', border: `0.5px solid ${BORDER}`, color: '#999', borderRadius: 5, padding: '7px', fontSize: 10, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
              <button onClick={() => setPlans(prev => prev.filter(p => p.name !== plan.name))} style={{ flex: 1, background: 'none', border: '0.5px solid rgba(220,60,60,0.3)', color: '#c55', borderRadius: 5, padding: '7px', fontSize: 10, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title={editPlan !== null ? 'Edit Plan' : 'Create Subscription Plan'} onClose={() => setShowModal(false)}>
          <Field label="Plan Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Price ($)" type="text" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} />
            <Field label="Billing" type="select" value={form.billing} onChange={v => setForm(f => ({ ...f, billing: v }))} options={['Monthly', 'Quarterly', 'Annual', 'Free']} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Sessions included" value={form.sessions} onChange={v => setForm(f => ({ ...f, sessions: v }))} />
            <Field label="Vault Access" type="select" value={form.vault} onChange={v => setForm(f => ({ ...f, vault: v }))} options={['None', 'Partial', 'Full', 'Premium']} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 6 }}>Additional Features <span style={{ color: '#555', textTransform: 'none', letterSpacing: 0 }}>(one per line)</span></label>
            <textarea
              value={form.extraFeatures}
              onChange={e => setForm(f => ({ ...f, extraFeatures: e.target.value }))}
              placeholder={'e.g. Priority support\nExclusive event invites\nDirect messaging'}
              rows={5}
              style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
            />
          </div>
          <SaveBtn onClick={handleSave}>{editPlan !== null ? 'Update Plan' : 'Create Plan'}</SaveBtn>
        </Modal>
      )}
    </div>
  );
}

function ConsultancyAdminSection() {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ service: '', client: '', email: '', date: '', value: 'TBD', status: 'Pending Review' });
  const [requests, setRequests] = useState([
    { service: 'Brand Strategy', client: 'TechStart Lagos', date: 'Apr 5, 2026', value: '$3,200', status: 'Pending Review' },
    { service: 'Creative Direction', client: 'Adaeze Okonkwo', date: 'Apr 8, 2026', value: '$2,400', status: 'Confirmed' },
    { service: 'Campaign Concept', client: 'Vibe Records', date: 'Apr 12, 2026', value: '$4,000', status: 'In Progress' },
    { service: 'Artist Advisory', client: 'House of Chidi', date: 'Mar 28, 2026', value: '$1,800', status: 'Completed' },
    { service: 'Event Concept', client: 'Lagos Fashion Week', date: 'May 1, 2026', value: '$5,000', status: 'Pending Review' },
  ]);

  const SERVICES_LIST = ['Creative Direction', 'Brand Strategy', 'Campaign Concept & Development', 'Artist Management Advisory', 'Event Concept & Production', 'Content Strategy'];

  const statusColor = (s) => {
    if (s === 'Confirmed' || s === 'Completed') return 'green';
    if (s === 'In Progress') return 'purple';
    if (s === 'Declined') return 'red';
    return 'gold';
  };

  const rows = requests.map(r => [r.service, r.client, r.date, r.value, <Badge label={r.status} color={statusColor(r.status)} />]);

  const openAdd = () => {
    setForm({ service: '', client: '', email: '', date: '', value: 'TBD', status: 'Pending Review' });
    setEditIndex(null);
    setShowModal(true);
  };

  const openEdit = (i) => {
    setForm({ ...requests[i], email: '' });
    setEditIndex(i);
    setShowModal(true);
  };

  const handleSave = () => {
    const row = { service: form.service, client: form.client, date: form.date, value: form.value, status: form.status };
    if (editIndex !== null) {
      setRequests(prev => prev.map((r, idx) => idx === editIndex ? row : r));
    } else {
      setRequests(prev => [row, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <SectionHeader title="Consultancy Services" sub="Manage public-facing consultancy requests and engagements." action="+ Add Request" onAction={openAdd} />
      <div className="mgw-admin-stats-grid" style={{ marginBottom: 20 }}>
        <StatCard label="Total Requests" value="23" delta="5 this month" accent={GOLD} />
        <StatCard label="Pending Review" value="2" delta="Action needed" accent={BLUE} />
        <StatCard label="In Progress" value="3" delta="Active engagements" accent={PURPLE} />
        <StatCard label="Revenue (YTD)" value="$48K" delta="From consultancy" accent={GOLD} />
      </div>
      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table cols={['Service', 'Client / Company', 'Date', 'Value', 'Status']} rows={rows} onEdit={openEdit} onDelete={i => setRequests(prev => prev.filter((_, idx) => idx !== i))} />
      </div>

      {showModal && (
        <Modal title={editIndex !== null ? 'Edit Request' : 'Add Consultancy Request'} onClose={() => setShowModal(false)}>
          <Field label="Service" type="select" value={form.service} onChange={v => setForm(f => ({ ...f, service: v }))} options={['', ...SERVICES_LIST]} />
          <Field label="Client / Company" value={form.client} onChange={v => setForm(f => ({ ...f, client: v }))} />
          <Field label="Client Email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Date" type="text" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
            <Field label="Value" type="text" value={form.value} onChange={v => setForm(f => ({ ...f, value: v }))} />
          </div>
          <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Pending Review', 'Confirmed', 'In Progress', 'Completed', 'Declined']} />
          <SaveBtn onClick={handleSave}>{editIndex !== null ? 'Update Request' : 'Save Request'}</SaveBtn>
        </Modal>
      )}
    </div>
  );
}

function MembersSection() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', plan: 'Creative Circle', joined: '', status: 'Active' });
  const [allMembers, setAllMembers] = useState([
    { name: 'Adaeze Okonkwo', email: 'adaeze@example.com', plan: 'Inner Circle', joined: 'Apr 2, 2026', status: 'Active' },
    { name: 'Emeka Nwosu', email: 'emeka@example.com', plan: 'Creative Circle', joined: 'Mar 28, 2026', status: 'Active' },
    { name: 'Chidera Eze', email: 'chidera@example.com', plan: 'Inner Circle', joined: 'Mar 15, 2026', status: 'Active' },
    { name: 'Tunde Fashola', email: 'tunde@example.com', plan: 'Open Access', joined: 'Mar 10, 2026', status: 'Active' },
    { name: 'Ngozi Obi', email: 'ngozi@example.com', plan: 'Creative Circle', joined: 'Feb 22, 2026', status: 'Paused' },
    { name: 'Segun Martins', email: 'segun@example.com', plan: 'Inner Circle', joined: 'Feb 14, 2026', status: 'Active' },
  ]);

  const statusColor = (s) => s === 'Active' ? 'green' : s === 'Paused' ? 'gold' : 'purple';

  const filtered = search
    ? allMembers.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))
    : allMembers;

  const rows = filtered.map(m => [m.name, m.email, m.plan, m.joined, <Badge label={m.status} color={statusColor(m.status)} />]);

  const openEdit = (i) => {
    const member = filtered[i];
    const realIndex = allMembers.findIndex(m => m.email === member.email);
    setForm({ ...member });
    setEditIndex(realIndex);
    setShowModal(true);
  };

  const handleSave = () => {
    setAllMembers(prev => prev.map((m, idx) => idx === editIndex ? { ...form } : m));
    setShowModal(false);
  };

  const handleDelete = (i) => {
    const member = filtered[i];
    setAllMembers(prev => prev.filter(m => m.email !== member.email));
  };

  return (
    <div>
      <SectionHeader title="Members" sub="View and manage all platform members across subscription tiers." />
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          style={{ flex: 1, background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none' }}
        />
      </div>
      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table cols={['Name', 'Email', 'Plan', 'Joined', 'Status']} rows={rows} onEdit={openEdit} onDelete={handleDelete} />
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: TEXT_DIM, fontSize: 13 }}>No members match your search.</div>
      )}

      {showModal && (
        <Modal title="Edit Member" onClose={() => setShowModal(false)}>
          <Field label="Full Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <Field label="Email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Plan" type="select" value={form.plan} onChange={v => setForm(f => ({ ...f, plan: v }))} options={['Open Access', 'Creative Circle', 'Inner Circle']} />
            <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Active', 'Paused', 'Cancelled']} />
          </div>
          <Field label="Joined Date" value={form.joined} onChange={v => setForm(f => ({ ...f, joined: v }))} />
          <SaveBtn onClick={handleSave}>Update Member</SaveBtn>
        </Modal>
      )}
    </div>
  );
}

function RichTextEditor({ editorRef }) {
  const exec = (cmd, val = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
  };

  const toolbarBtnStyle = (active) => ({
    background: active ? 'rgba(201,162,39,0.15)' : '#1a1a1a',
    border: `0.5px solid ${active ? GOLD : BORDER}`,
    color: active ? GOLD : '#999',
    borderRadius: 5,
    width: 32,
    height: 30,
    cursor: 'pointer',
    fontSize: 12,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.15s',
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
        <button onMouseDown={e => { e.preventDefault(); exec('bold'); }} style={toolbarBtnStyle(false)} title="Bold"><strong>B</strong></button>
        <button onMouseDown={e => { e.preventDefault(); exec('italic'); }} style={{ ...toolbarBtnStyle(false), fontStyle: 'italic' }} title="Italic"><em>I</em></button>
        <button onMouseDown={e => { e.preventDefault(); exec('underline'); }} style={{ ...toolbarBtnStyle(false), textDecoration: 'underline' }} title="Underline"><u>U</u></button>
        <div style={{ width: 1, background: BORDER, margin: '0 4px' }} />
        <button onMouseDown={e => { e.preventDefault(); exec('insertUnorderedList'); }} style={toolbarBtnStyle(false)} title="Bullet list">≡</button>
        <button onMouseDown={e => { e.preventDefault(); exec('insertOrderedList'); }} style={toolbarBtnStyle(false)} title="Numbered list">①</button>
        <div style={{ width: 1, background: BORDER, margin: '0 4px' }} />
        <button onMouseDown={e => { e.preventDefault(); exec('justifyLeft'); }} style={toolbarBtnStyle(false)} title="Align left">⫷</button>
        <button onMouseDown={e => { e.preventDefault(); exec('justifyCenter'); }} style={toolbarBtnStyle(false)} title="Center">⊟</button>
        <div style={{ width: 1, background: BORDER, margin: '0 4px' }} />
        <button onMouseDown={e => { e.preventDefault(); exec('removeFormat'); }} style={toolbarBtnStyle(false)} title="Clear formatting">✕</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        style={{
          minHeight: 140,
          background: '#1a1a1a',
          border: `0.5px solid ${BORDER}`,
          borderRadius: 6,
          padding: '10px 12px',
          color: '#EAEAEA',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          outline: 'none',
          lineHeight: 1.65,
        }}
      />
    </div>
  );
}

function AnnouncementsSection({ announcements, setAnnouncements }) {
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState('');
  const editorRef = React.useRef(null);

  const handlePublish = () => {
    const html = editorRef.current?.innerHTML?.trim();
    if (!title.trim() || !html || html === '<br>') return;
    const now = new Date();
    const dateStr = `Posted ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    const newItem = {
      id: Date.now(),
      title: title.trim(),
      text: html,
      date: dateStr,
      published: true,
    };
    setAnnouncements(prev => [newItem, ...prev.map(a => ({ ...a, published: false }))]);
    setTitle('');
    if (editorRef.current) editorRef.current.innerHTML = '';
    setComposing(false);
  };

  const handleUnpublish = (id) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, published: false } : a));
  };

  const handlePublishExisting = (id) => {
    setAnnouncements(prev => prev.map(a => ({ ...a, published: a.id === id })));
  };

  const handleDelete = (id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div>
      <SectionHeader
        title="The Dispatch"
        sub="Compose and publish announcements to all members on their dashboard."
        action={composing ? undefined : '+ New Dispatch'}
        onAction={() => setComposing(true)}
      />

      {composing && (
        <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 12, padding: '22px 20px', marginBottom: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 14 }}>Compose Dispatch</div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 6 }}>Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. New Masterclass This Friday..."
              style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 6 }}>Message</label>
            <RichTextEditor editorRef={editorRef} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={handlePublish}
              style={{ background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '10px 22px', fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}
            >
              Publish to Members
            </button>
            <button
              onClick={() => { setComposing(false); setTitle(''); if (editorRef.current) editorRef.current.innerHTML = ''; }}
              style={{ background: 'none', border: `0.5px solid ${BORDER}`, color: TEXT_DIM, borderRadius: 6, padding: '10px 18px', fontSize: 11, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {announcements.length === 0 && !composing && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: TEXT_DIM, fontSize: 13 }}>
          No dispatches yet. Create your first announcement above.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {announcements.map(item => (
          <div key={item.id} style={{ background: SURFACE, border: `0.5px solid ${item.published ? 'rgba(201,162,39,0.4)' : BORDER}`, borderRadius: 10, padding: '18px 18px 16px', position: 'relative', overflow: 'hidden' }}>
            {item.published && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 500, marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 10, color: TEXT_DIM }}>{item.date}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center' }}>
                {item.published
                  ? <span style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20, background: 'rgba(201,162,39,0.12)', color: GOLD, border: `0.5px solid rgba(201,162,39,0.3)`, fontWeight: 500 }}>Live</span>
                  : <span style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20, background: 'rgba(150,150,150,0.1)', color: '#666', border: '0.5px solid rgba(150,150,150,0.2)', fontWeight: 500 }}>Archived</span>
                }
              </div>
            </div>
            <div
              style={{ fontSize: 13, color: '#EAEAEA', lineHeight: 1.6, marginBottom: 14, maxHeight: 80, overflow: 'hidden', fontFamily: "'DM Sans', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              {!item.published && (
                <button
                  onClick={() => handlePublishExisting(item.id)}
                  style={{ background: 'rgba(201,162,39,0.1)', border: `0.5px solid rgba(201,162,39,0.3)`, color: GOLD, borderRadius: 5, padding: '5px 12px', fontSize: 10, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  Set as Live
                </button>
              )}
              {item.published && (
                <button
                  onClick={() => handleUnpublish(item.id)}
                  style={{ background: 'none', border: `0.5px solid ${BORDER}`, color: TEXT_DIM, borderRadius: 5, padding: '5px 12px', fontSize: 10, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  Unpublish
                </button>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                style={{ background: 'none', border: '0.5px solid rgba(220,60,60,0.3)', color: '#c55', borderRadius: 5, padding: '5px 12px', fontSize: 10, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingsSection({ bookings, setBookings }) {
  const [zoomLoading, setZoomLoading] = useState(null);
  const [zoomError, setZoomError] = useState('');

  const statusColor = (s) => {
    if (s === 'Accepted') return 'green';
    if (s === 'Declined') return 'red';
    return 'gold';
  };

  const handleAccept = async (id) => {
    setZoomError('');
    setZoomLoading(id);
    const booking = bookings.find(b => b.id === id);

    // Simulate Zoom meeting creation (real endpoint kept at /api/zoom/create-meeting)
    await new Promise(r => setTimeout(r, 1200));
    const meetingId = Math.floor(Math.random() * 9000000000) + 1000000000;
    const zoom = {
      meetingId,
      joinUrl: `https://zoom.us/j/${meetingId}?pwd=MGW${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      startUrl: `https://zoom.us/s/${meetingId}`,
      password: Math.random().toString(36).slice(2, 8).toUpperCase(),
      topic: `MGW ${booking?.typeLabel || '1-on-1'} — ${booking?.userName}`,
      startTime: new Date().toISOString(),
    };

    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Accepted', zoom } : b));
    setZoomLoading(null);
  };

  const handleDecline = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Declined' } : b));
  };

  const pending = bookings.filter(b => b.status === 'Pending');
  const handled = bookings.filter(b => b.status !== 'Pending');

  const zoomLink = (zoom) => zoom?.joinUrl ? (
    <a href={zoom.joinUrl} target="_blank" rel="noreferrer" style={{ color: '#4A90D9', fontSize: 11, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 10, background: 'rgba(74,144,217,0.12)', border: '0.5px solid rgba(74,144,217,0.3)' }}>
      ▶ Zoom Link
    </a>
  ) : (
    <span style={{ fontSize: 11, color: '#555', fontStyle: 'italic' }}>
      {zoom === null ? 'Zoom credentials not configured' : '—'}
    </span>
  );

  const BookingCard = ({ b }) => (
    <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 500, marginBottom: 3 }}>
            {b.userName}
          </div>
          <div style={{ fontSize: 11, color: TEXT_DIM }}>{b.email}</div>
        </div>
        <Badge label={b.status} color={statusColor(b.status)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '6px 20px' }}>
        {[
          { k: 'Session',  v: b.typeLabel || b.type },
          { k: 'Date',     v: `April ${b.day}, 2026` },
          { k: 'Time',     v: `${b.time} WAT` },
          { k: 'Amount',   v: b.price },
          { k: 'Ref',      v: b.paystackRef ? b.paystackRef.slice(-10) : '—' },
        ].map(row => (
          <div key={row.k}>
            <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 2 }}>{row.k}</div>
            <div style={{ fontSize: 12, color: '#EAEAEA', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{row.v}</div>
          </div>
        ))}
      </div>

      {b.status === 'Accepted' && (
        <div style={{ borderTop: `0.5px solid rgba(255,255,255,0.05)`, paddingTop: 10 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 6 }}>Zoom Meeting</div>
          {zoomLink(b.zoom)}
        </div>
      )}

      {b.status === 'Pending' && (
        <div style={{ display: 'flex', gap: 8, borderTop: `0.5px solid rgba(255,255,255,0.05)`, paddingTop: 12 }}>
          <button
            onClick={() => handleAccept(b.id)}
            disabled={zoomLoading === b.id}
            style={{ flex: 1, background: 'rgba(80,200,120,0.12)', border: '0.5px solid rgba(80,200,120,0.35)', color: '#5CC88A', borderRadius: 6, padding: '9px', fontSize: 11, fontWeight: 600, cursor: zoomLoading === b.id ? 'wait' : 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.15s' }}
          >
            {zoomLoading === b.id ? 'Creating Zoom…' : 'Accept + Create Zoom'}
          </button>
          <button
            onClick={() => handleDecline(b.id)}
            style={{ flex: 1, background: 'rgba(220,60,60,0.1)', border: '0.5px solid rgba(220,60,60,0.3)', color: '#c55', borderRadius: 6, padding: '9px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.15s' }}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <SectionHeader
        title="Booking Requests"
        sub="Individual session booking requests submitted by members via Paystack."
      />

      {zoomError && (
        <div style={{ background: 'rgba(220,60,60,0.1)', border: '0.5px solid rgba(220,60,60,0.3)', borderRadius: 8, padding: '10px 14px', color: '#FF6B6B', fontSize: 12, marginBottom: 16 }}>
          {zoomError}
        </div>
      )}

      {bookings.length === 0 ? (
        <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, color: TEXT_DIM, marginBottom: 8 }}>No bookings yet</div>
          <div style={{ fontSize: 12, color: '#555' }}>When members book and pay for sessions, they will appear here for review.</div>
        </div>
      ) : (
        <>
          {pending.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                Pending Review
                <span style={{ background: 'rgba(201,162,39,0.15)', border: '0.5px solid rgba(201,162,39,0.3)', borderRadius: 10, padding: '1px 8px', fontSize: 10, color: GOLD, fontWeight: 600 }}>{pending.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {pending.map(b => <BookingCard key={b.id} b={b} />)}
              </div>
            </div>
          )}

          {handled.length > 0 && (
            <div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 14 }}>Handled</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {handled.map(b => <BookingCard key={b.id} b={b} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function AdminPage({ onExit, availableDays, setAvailableDays, timeSlots, setTimeSlots, plans, setPlans, vaultItems, setVaultItems, announcements, setAnnouncements, bookings = [], setBookings }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  const sections = {
    overview:       <OverviewSection />,
    bookings:       <BookingsSection bookings={bookings} setBookings={setBookings} />,
    sessions:       <SessionsSection availableDays={availableDays} setAvailableDays={setAvailableDays} timeSlots={timeSlots} setTimeSlots={setTimeSlots} />,
    programs:       <ProgramsSection />,
    vault:          <VaultSection vaultItems={vaultItems} setVaultItems={setVaultItems} plans={plans} />,
    plans:          <PlansSection plans={plans} setPlans={setPlans} />,
    consultancy:    <ConsultancyAdminSection />,
    members:        <MembersSection />,
    announcements:  <AnnouncementsSection announcements={announcements} setAnnouncements={setAnnouncements} />,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A', color: '#EAEAEA' }}>

      <aside className={`mgw-admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div style={{ padding: '20px 16px 12px', borderBottom: `0.5px solid ${BORDER}` }}>
          <div className="mgw-admin-sidebar-eyebrow" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 4 }}>Admin Panel</div>
          <div className="mgw-admin-sidebar-brand" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: GOLD }}>MGW Platform</div>
        </div>

        <nav style={{ padding: '12px 8px' }}>
          {SIDEBAR_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                className="mgw-admin-nav-item"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  background: isActive ? 'rgba(201,162,39,0.1)' : 'none',
                  border: isActive ? `0.5px solid rgba(201,162,39,0.25)` : '0.5px solid transparent',
                  borderRadius: 7, padding: '10px 12px', cursor: 'pointer',
                  color: isActive ? GOLD : '#888', marginBottom: 3,
                  transition: 'all 0.15s', textAlign: 'left',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.03em',
                }}
              >
                <Icon d={item.icon} color={isActive ? GOLD : '#666'} size={15} />
                <span className="mgw-admin-sidebar-label" style={{ flex: 1 }}>{item.label}</span>
                {item.id === 'bookings' && pendingCount > 0 && (
                  <span style={{ background: GOLD, color: '#0A0A0A', borderRadius: 10, padding: '1px 6px', fontSize: 9, fontWeight: 700, lineHeight: 1.5, flexShrink: 0 }}>{pendingCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '12px 8px', marginTop: 'auto', borderTop: `0.5px solid ${BORDER}` }}>
          <button
            onClick={onExit}
            style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: 'none', border: '0.5px solid transparent', borderRadius: 7, padding: '10px 12px', cursor: 'pointer', color: '#666', fontFamily: "'DM Sans', sans-serif", fontSize: 12, textAlign: 'left' }}
          >
            <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" color="#666" size={15} />
            <span className="mgw-admin-sidebar-label">Exit Admin</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 98, backdropFilter: 'blur(2px)' }} />
      )}

      <main style={{ flex: 1, minWidth: 0, padding: '24px 20px', overflowX: 'hidden' }}>
        <div className="mgw-admin-topbar">
          <button onClick={() => setSidebarOpen(true)} style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 7, padding: '8px 10px', cursor: 'pointer', color: '#999', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}>
            <Icon d="M3 12h18M3 6h18M3 18h18" size={14} />
            Menu
          </button>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, color: GOLD }}>
            {SIDEBAR_ITEMS.find(s => s.id === activeSection)?.label}
          </div>
          <div style={{ width: 60 }} />
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          {sections[activeSection]}
        </div>
      </main>
    </div>
  );
}
