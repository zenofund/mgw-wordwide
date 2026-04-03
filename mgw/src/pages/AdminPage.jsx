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
  { id: 'overview',    label: 'Overview',     icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
  { id: 'sessions',   label: 'Sessions',      icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { id: 'programs',   label: 'Programs',      icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z' },
  { id: 'vault',      label: 'Vault',         icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { id: 'plans',      label: 'Plans',         icon: 'M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { id: 'consultancy',label: 'Consultancy',   icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
  { id: 'members',    label: 'Members',       icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
];

const StatCard = ({ label, value, delta, accent = GOLD }) => (
  <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '18px 16px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
    <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 8 }}>{label}</div>
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: accent, fontWeight: 600, lineHeight: 1 }}>{value}</div>
    {delta && <div style={{ fontSize: 10, color: '#5a9', marginTop: 6 }}>{delta}</div>}
  </div>
);

const SectionHeader = ({ title, sub, action, onAction }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
    <div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: TEXT_DIM }}>{sub}</div>}
    </div>
    {action && (
      <button onClick={onAction} style={{ background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>{action}</button>
    )}
  </div>
);

const Table = ({ cols, rows, onEdit, onDelete }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
      <thead>
        <tr>
          {cols.map(c => (
            <th key={c} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: TEXT_DIM, borderBottom: `0.5px solid ${BORDER}`, whiteSpace: 'nowrap' }}>{c}</th>
          ))}
          <th style={{ padding: '8px 12px', borderBottom: `0.5px solid ${BORDER}` }} />
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: `0.5px solid rgba(255,255,255,0.04)` }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '12px 12px', color: typeof cell === 'string' && cell.startsWith('$') ? GOLD : '#EAEAEA', whiteSpace: 'nowrap' }}>{cell}</td>
            ))}
            <td style={{ padding: '12px 12px', whiteSpace: 'nowrap' }}>
              <button onClick={() => onEdit?.(i)} style={{ background: 'none', border: `0.5px solid ${BORDER}`, color: '#999', borderRadius: 4, padding: '4px 10px', fontSize: 10, cursor: 'pointer', marginRight: 6, fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
              <button onClick={() => onDelete?.(i)} style={{ background: 'none', border: '0.5px solid rgba(220,60,60,0.3)', color: '#c55', borderRadius: 4, padding: '4px 10px', fontSize: 10, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Badge = ({ label, color }) => (
  <span style={{
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
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, marginBottom: 20 }}>{title}</div>
      {children}
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: TEXT_DIM, cursor: 'pointer', fontSize: 18 }}>✕</button>
    </div>
  </div>
);

const Field = ({ label, type = 'text', value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 6 }}>{label}</label>
    {type === 'select' ? (
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', boxSizing: 'border-box' }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    ) : type === 'textarea' ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', resize: 'vertical', minHeight: 70, boxSizing: 'border-box' }} />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', background: '#1a1a1a', border: `0.5px solid ${BORDER}`, borderRadius: 6, padding: '9px 12px', color: '#EAEAEA', fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
    )}
  </div>
);

const SaveBtn = ({ children, onClick }) => (
  <button onClick={onClick} style={{ marginTop: 8, width: '100%', background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
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

function SessionsSection() {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ title: '', type: '1-on-1', date: '', time: '', price: '', status: 'Scheduled' });
  const [sessions, setSessions] = useState([
    { title: 'Creative Direction Deep Dive', type: '1-on-1', date: 'Apr 10, 2026', time: '11:00 AM', price: '$300', status: 'Scheduled' },
    { title: "Founder's Circle — April Cohort", type: 'Group', date: 'Apr 14, 2026', time: '3:00 PM', price: '$480', status: 'Open' },
    { title: 'Brand Architecture Intensive', type: 'Intensive', date: 'Apr 18, 2026', time: '9:00 AM', price: '$2,500', status: 'Full' },
    { title: 'Creative Strategy Session', type: '1-on-1', date: 'Apr 22, 2026', time: '2:00 PM', price: '$300', status: 'Scheduled' },
    { title: 'Masterclass: Music Business 101', type: 'Masterclass', date: 'Apr 28, 2026', time: '6:00 PM', price: '$120', status: 'Open' },
  ]);

  const rows = sessions.map(s => [s.title, s.type, s.date, s.time, s.price, <Badge label={s.status} color={sessionStatusColor(s.status)} />]);

  const openAdd = () => {
    setForm({ title: '', type: '1-on-1', date: '', time: '', price: '', status: 'Scheduled' });
    setEditIndex(null);
    setShowModal(true);
  };

  const openEdit = (i) => {
    setForm({ ...sessions[i] });
    setEditIndex(i);
    setShowModal(true);
  };

  const handleSave = () => {
    const row = { title: form.title, type: form.type, date: form.date, time: form.time, price: form.price, status: form.status };
    if (editIndex !== null) {
      setSessions(prev => prev.map((s, idx) => idx === editIndex ? row : s));
    } else {
      setSessions(prev => [row, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <SectionHeader title="Sessions" sub="Manage and schedule all mentorship and masterclass sessions." action="+ New Session" onAction={openAdd} />
      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table cols={['Title', 'Type', 'Date', 'Time', 'Price', 'Status']} rows={rows} onEdit={openEdit} onDelete={i => setSessions(prev => prev.filter((_, idx) => idx !== i))} />
      </div>
      {showModal && (
        <Modal title={editIndex !== null ? 'Edit Session' : 'Create New Session'} onClose={() => setShowModal(false)}>
          <Field label="Session Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <Field label="Type" type="select" value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))} options={['1-on-1', 'Group', 'Intensive', 'Masterclass', 'Workshop']} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Date" type="text" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
            <Field label="Time" type="text" value={form.time} onChange={v => setForm(f => ({ ...f, time: v }))} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Price" type="text" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} />
            <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Scheduled', 'Open', 'Full', 'Cancelled']} />
          </div>
          <SaveBtn onClick={handleSave}>{editIndex !== null ? 'Update Session' : 'Create Session'}</SaveBtn>
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

function VaultSection() {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ title: '', type: 'Video', duration: '', tier: 'Inner Circle', status: 'Published' });
  const [items, setItems] = useState([
    { title: 'The Creative Brief Masterclass', type: 'Video', duration: '48 min', tier: 'Inner Circle', status: 'Published' },
    { title: 'Industry Conversations Vol. 3', type: 'Audio', duration: '1 hr 12 min', tier: 'Creative Circle', status: 'Published' },
    { title: 'Brand Architecture Framework', type: 'PDF', duration: '24 pages', tier: 'Inner Circle', status: 'Published' },
    { title: 'Artist Management Blueprint', type: 'Video', duration: '1 hr 5 min', tier: 'Premium', status: 'Draft' },
    { title: 'The Business of Music in Africa', type: 'Masterclass', duration: '2 hr 30 min', tier: 'All Tiers', status: 'Published' },
  ]);

  const statusColor = (s) => s === 'Published' ? 'green' : s === 'Draft' ? 'gold' : 'purple';
  const rows = items.map(v => [v.title, v.type, v.duration, v.tier, <Badge label={v.status} color={statusColor(v.status)} />]);

  const openAdd = () => {
    setForm({ title: '', type: 'Video', duration: '', tier: 'Inner Circle', status: 'Published' });
    setEditIndex(null);
    setShowModal(true);
  };

  const openEdit = (i) => {
    setForm({ ...items[i] });
    setEditIndex(i);
    setShowModal(true);
  };

  const handleSave = () => {
    const row = { title: form.title, type: form.type, duration: form.duration, tier: form.tier, status: form.status };
    if (editIndex !== null) {
      setItems(prev => prev.map((v, idx) => idx === editIndex ? row : v));
    } else {
      setItems(prev => [row, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <SectionHeader title="Vault Content" sub="Manage exclusive educational content across all membership tiers." action="+ Upload Content" onAction={openAdd} />
      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table cols={['Title', 'Type', 'Length', 'Tier', 'Status']} rows={rows} onEdit={openEdit} onDelete={i => setItems(prev => prev.filter((_, idx) => idx !== i))} />
      </div>
      {showModal && (
        <Modal title={editIndex !== null ? 'Edit Content' : 'Upload Vault Content'} onClose={() => setShowModal(false)}>
          <Field label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <Field label="Content Type" type="select" value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))} options={['Video', 'Audio', 'PDF', 'Masterclass', 'Workshop Recording']} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Duration / Length" value={form.duration} onChange={v => setForm(f => ({ ...f, duration: v }))} />
            <Field label="Membership Tier" type="select" value={form.tier} onChange={v => setForm(f => ({ ...f, tier: v }))} options={['All Tiers', 'Creative Circle', 'Inner Circle', 'Premium']} />
          </div>
          <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Published', 'Draft', 'Archived']} />
          {editIndex === null && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 6 }}>Upload File</label>
              <div style={{ border: `0.5px dashed ${BORDER}`, borderRadius: 6, padding: '20px', textAlign: 'center', color: TEXT_DIM, fontSize: 12, cursor: 'pointer' }}>
                Click to select or drag & drop file here
              </div>
            </div>
          )}
          <SaveBtn onClick={handleSave}>{editIndex !== null ? 'Update Content' : 'Save Content'}</SaveBtn>
        </Modal>
      )}
    </div>
  );
}

function PlansSection() {
  const [showModal, setShowModal] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', billing: 'Monthly', sessions: '', vault: 'Partial', status: 'Active' });
  const [plans, setPlans] = useState([
    { name: 'Open Access', price: '$0', billing: 'Free', features: ['Community access', 'Monthly digest', 'Limited vault'], color: '#555', members: 472 },
    { name: 'Creative Circle', price: '$49', billing: 'per month', features: ['Full vault access', '2 group sessions/mo', 'Priority support', 'Community access'], color: PURPLE, members: 1104 },
    { name: 'Inner Circle', price: '$149', billing: 'per month', features: ['All Creative Circle perks', '4 sessions/mo (1-on-1)', 'Direct messaging', 'Exclusive content', 'Event invitations'], color: GOLD, members: 842 },
  ]);

  const openAdd = () => {
    setForm({ name: '', price: '', billing: 'Monthly', sessions: '', vault: 'Partial' });
    setEditPlan(null);
    setShowModal(true);
  };

  const openEdit = (plan) => {
    setForm({ name: plan.name, price: plan.price.replace('$', ''), billing: plan.billing, sessions: '', vault: 'Partial' });
    setEditPlan(plan.name);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editPlan !== null) {
      setPlans(prev => prev.map(p => p.name === editPlan
        ? { ...p, name: form.name, price: `$${form.price}`, billing: form.billing }
        : p
      ));
    } else {
      setPlans(prev => [...prev, { name: form.name, price: `$${form.price}`, billing: form.billing, features: [`${form.sessions} sessions`, `Vault: ${form.vault}`], color: GOLD, members: 0 }]);
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

export default function AdminPage({ onExit }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = {
    overview:    <OverviewSection />,
    sessions:    <SessionsSection />,
    programs:    <ProgramsSection />,
    vault:       <VaultSection />,
    plans:       <PlansSection />,
    consultancy: <ConsultancyAdminSection />,
    members:     <MembersSection />,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A', color: '#EAEAEA' }}>

      <aside className={`mgw-admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div style={{ padding: '20px 16px 12px', borderBottom: `0.5px solid ${BORDER}` }}>
          <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 4 }}>Admin Panel</div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: GOLD }}>MGW Platform</div>
        </div>

        <nav style={{ padding: '12px 8px' }}>
          {SIDEBAR_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
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
                <span className="mgw-admin-sidebar-label">{item.label}</span>
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
