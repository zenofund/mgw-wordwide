import React, { useState } from 'react';

/* ─── Palette ─── */
const GOLD = '#C9A227';
const PURPLE = '#6A38C2';
const BLUE = '#00B3FF';
const SURFACE = '#111';
const SURFACE2 = '#181818';
const BORDER = 'rgba(201,162,39,0.18)';
const TEXT_DIM = '#888';

/* ─── Icon SVGs ─── */
const Icon = ({ d, size = 16, color = '#999' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const SIDEBAR_ITEMS = [
  { id: 'overview',     label: 'Overview',      icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
  { id: 'sessions',     label: 'Sessions',       icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { id: 'programs',     label: 'Programs',       icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z' },
  { id: 'vault',        label: 'Vault',          icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z' },
  { id: 'plans',        label: 'Plans',          icon: 'M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { id: 'consultancy',  label: 'Consultancy',    icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
  { id: 'members',      label: 'Members',        icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
];

/* ─── Shared mini-components ─── */
const StatCard = ({ label, value, delta, accent = GOLD }) => (
  <div style={{
    background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10,
    padding: '18px 16px', position: 'relative', overflow: 'hidden',
  }}>
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
      <button onClick={onAction} style={{
        background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6,
        padding: '8px 16px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
        letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif",
        flexShrink: 0,
      }}>{action}</button>
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
              <td key={j} style={{ padding: '12px 12px', color: typeof cell === 'string' && cell.startsWith('$') ? GOLD : '#EAEAEA', whiteSpace: 'nowrap' }}>
                {cell}
              </td>
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
    <div style={{ position: 'relative', background: '#141414', border: `0.5px solid ${BORDER}`, borderRadius: 12, padding: '28px 24px', width: '100%', maxWidth: 480, margin: '0 20px', zIndex: 1 }}>
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

/* ─── Section Components ─── */

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
        {/* Recent Activity */}
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

        {/* Quick Stats */}
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
        </div>
      </div>
    </div>
  );
}

function SessionsSection() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', type: '1-on-1', date: '', time: '', capacity: '1', price: '', status: 'Scheduled' });
  const [sessions, setSessions] = useState([
    ['Creative Direction Deep Dive', '1-on-1', 'Apr 10, 2026', '11:00 AM', '$300', <Badge label="Scheduled" color="gold" />],
    ['Founder\'s Circle — April Cohort', 'Group', 'Apr 14, 2026', '3:00 PM', '$480', <Badge label="Open" color="green" />],
    ['Brand Architecture Intensive', 'Intensive', 'Apr 18, 2026', '9:00 AM', '$2,500', <Badge label="Full" color="purple" />],
    ['Creative Strategy Session', '1-on-1', 'Apr 22, 2026', '2:00 PM', '$300', <Badge label="Scheduled" color="gold" />],
    ['Masterclass: Music Business 101', 'Masterclass', 'Apr 28, 2026', '6:00 PM', '$120', <Badge label="Open" color="green" />],
  ]);

  const handleAdd = () => {
    setSessions(prev => [[form.title, form.type, form.date, form.time, form.price, <Badge label={form.status} color="gold" />], ...prev]);
    setShowModal(false);
    setForm({ title: '', type: '1-on-1', date: '', time: '', capacity: '1', price: '', status: 'Scheduled' });
  };

  return (
    <div>
      <SectionHeader title="Sessions" sub="Manage and schedule all mentorship and masterclass sessions." action="+ New Session" onAction={() => setShowModal(true)} />
      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table
          cols={['Title', 'Type', 'Date', 'Time', 'Price', 'Status']}
          rows={sessions}
          onEdit={i => console.log('edit', i)}
          onDelete={i => setSessions(prev => prev.filter((_, idx) => idx !== i))}
        />
      </div>

      {showModal && (
        <Modal title="Create New Session" onClose={() => setShowModal(false)}>
          <Field label="Session Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <Field label="Type" type="select" value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))} options={['1-on-1', 'Group', 'Intensive', 'Masterclass', 'Workshop']} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Date" type="date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
            <Field label="Time" type="time" value={form.time} onChange={v => setForm(f => ({ ...f, time: v }))} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Price ($)" type="text" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} />
            <Field label="Capacity" type="text" value={form.capacity} onChange={v => setForm(f => ({ ...f, capacity: v }))} />
          </div>
          <button onClick={handleAdd} style={{ marginTop: 8, width: '100%', background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Create Session
          </button>
        </Modal>
      )}
    </div>
  );
}

function ProgramsSection() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', desc: '', duration: '', price: '', track: 'Flagship', status: 'Active' });
  const [programs, setPrograms] = useState([
    ['Creative Mastery', 'Flagship', '8 Weeks', '$1,200', '24', <Badge label="Active" color="green" />],
    ['Founder\'s Circle', 'Group', '6 Weeks', '$480', '12', <Badge label="Active" color="green" />],
    ['Brand Architecture', 'Intensive', '3 Days', '$2,500', '6', <Badge label="Active" color="green" />],
    ['Music Business Essentials', 'Masterclass', '4 Weeks', '$240', '50', <Badge label="Draft" color="gold" />],
  ]);

  const handleAdd = () => {
    setPrograms(prev => [[form.name, form.track, form.duration, `$${form.price}`, '0', <Badge label={form.status} color="green" />], ...prev]);
    setShowModal(false);
    setForm({ name: '', desc: '', duration: '', price: '', track: 'Flagship', status: 'Active' });
  };

  return (
    <div>
      <SectionHeader title="Mentorship Programs" sub="Create and manage structured mentorship tracks and masterclasses." action="+ New Program" onAction={() => setShowModal(true)} />
      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table
          cols={['Program', 'Track', 'Duration', 'Price', 'Enrolled', 'Status']}
          rows={programs}
          onEdit={i => console.log('edit', i)}
          onDelete={i => setPrograms(prev => prev.filter((_, idx) => idx !== i))}
        />
      </div>

      {showModal && (
        <Modal title="Create New Program" onClose={() => setShowModal(false)}>
          <Field label="Program Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <Field label="Description" type="textarea" value={form.desc} onChange={v => setForm(f => ({ ...f, desc: v }))} />
          <Field label="Track Type" type="select" value={form.track} onChange={v => setForm(f => ({ ...f, track: v }))} options={['Flagship', 'Group', 'Intensive', 'Masterclass', 'Workshop']} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Duration" value={form.duration} onChange={v => setForm(f => ({ ...f, duration: v }))} />
            <Field label="Price ($)" type="text" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} />
          </div>
          <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Active', 'Draft', 'Archived']} />
          <button onClick={handleAdd} style={{ marginTop: 8, width: '100%', background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Create Program
          </button>
        </Modal>
      )}
    </div>
  );
}

function VaultSection() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'Video', duration: '', tier: 'Inner Circle', status: 'Published' });
  const [items, setItems] = useState([
    ['The Creative Brief Masterclass', 'Video', '48 min', 'Inner Circle', <Badge label="Published" color="green" />],
    ['Industry Conversations Vol. 3', 'Audio', '1 hr 12 min', 'Creative Circle', <Badge label="Published" color="green" />],
    ['Brand Architecture Framework', 'PDF', '24 pages', 'Inner Circle', <Badge label="Published" color="green" />],
    ['Artist Management Blueprint', 'Video', '1 hr 5 min', 'Premium', <Badge label="Draft" color="gold" />],
    ['The Business of Music in Africa', 'Masterclass', '2 hr 30 min', 'All Tiers', <Badge label="Published" color="green" />],
  ]);

  const handleAdd = () => {
    setItems(prev => [[form.title, form.type, form.duration, form.tier, <Badge label={form.status} color="green" />], ...prev]);
    setShowModal(false);
    setForm({ title: '', type: 'Video', duration: '', tier: 'Inner Circle', status: 'Published' });
  };

  return (
    <div>
      <SectionHeader title="Vault Content" sub="Manage exclusive educational content across all membership tiers." action="+ Upload Content" onAction={() => setShowModal(true)} />
      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table
          cols={['Title', 'Type', 'Length', 'Tier', 'Status']}
          rows={items}
          onEdit={i => console.log('edit', i)}
          onDelete={i => setItems(prev => prev.filter((_, idx) => idx !== i))}
        />
      </div>

      {showModal && (
        <Modal title="Upload Vault Content" onClose={() => setShowModal(false)}>
          <Field label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <Field label="Content Type" type="select" value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))} options={['Video', 'Audio', 'PDF', 'Masterclass', 'Workshop Recording']} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Duration / Length" value={form.duration} onChange={v => setForm(f => ({ ...f, duration: v }))} />
            <Field label="Membership Tier" type="select" value={form.tier} onChange={v => setForm(f => ({ ...f, tier: v }))} options={['All Tiers', 'Creative Circle', 'Inner Circle', 'Premium']} />
          </div>
          <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Published', 'Draft', 'Archived']} />
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: TEXT_DIM, marginBottom: 6 }}>Upload File</label>
            <div style={{ border: `0.5px dashed ${BORDER}`, borderRadius: 6, padding: '20px', textAlign: 'center', color: TEXT_DIM, fontSize: 12, cursor: 'pointer' }}>
              Click to select or drag & drop file here
            </div>
          </div>
          <button onClick={handleAdd} style={{ marginTop: 4, width: '100%', background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Save Content
          </button>
        </Modal>
      )}
    </div>
  );
}

function PlansSection() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', billing: 'Monthly', sessions: '', vault: 'Partial', status: 'Active' });
  const [plans, setPlans] = useState([
    {
      name: 'Open Access', price: '$0', billing: 'Free',
      features: ['Community access', 'Monthly digest', 'Limited vault'],
      color: '#555', members: 472,
    },
    {
      name: 'Creative Circle', price: '$49', billing: 'per month',
      features: ['Full vault access', '2 group sessions/mo', 'Priority support', 'Community access'],
      color: PURPLE, members: 1104,
    },
    {
      name: 'Inner Circle', price: '$149', billing: 'per month',
      features: ['All Creative Circle perks', '4 sessions/mo (1-on-1)', 'Direct messaging', 'Exclusive content', 'Event invitations'],
      color: GOLD, members: 842,
    },
  ]);

  const handleAdd = () => {
    setPlans(prev => [{ name: form.name, price: `$${form.price}`, billing: form.billing, features: [`${form.sessions} sessions`, `Vault: ${form.vault}`], color: GOLD, members: 0 }, ...prev]);
    setShowModal(false);
    setForm({ name: '', price: '', billing: 'Monthly', sessions: '', vault: 'Partial', status: 'Active' });
  };

  return (
    <div>
      <SectionHeader title="Subscription Plans" sub="Define, price, and manage membership tiers." action="+ New Plan" onAction={() => setShowModal(true)} />
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
              <button style={{ flex: 1, background: 'none', border: `0.5px solid ${BORDER}`, color: '#999', borderRadius: 5, padding: '7px', fontSize: 10, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
              <button style={{ flex: 1, background: plan.color, color: '#0A0A0A', border: 'none', borderRadius: 5, padding: '7px', fontSize: 10, cursor: 'pointer', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Manage</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title="Create Subscription Plan" onClose={() => setShowModal(false)}>
          <Field label="Plan Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Price ($)" type="text" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} />
            <Field label="Billing" type="select" value={form.billing} onChange={v => setForm(f => ({ ...f, billing: v }))} options={['Monthly', 'Quarterly', 'Annual', 'Free']} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Sessions included" value={form.sessions} onChange={v => setForm(f => ({ ...f, sessions: v }))} />
            <Field label="Vault Access" type="select" value={form.vault} onChange={v => setForm(f => ({ ...f, vault: v }))} options={['None', 'Partial', 'Full', 'Premium']} />
          </div>
          <button onClick={handleAdd} style={{ marginTop: 8, width: '100%', background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Create Plan
          </button>
        </Modal>
      )}
    </div>
  );
}

function ConsultancyAdminSection() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ service: '', client: '', email: '', date: '', status: 'Pending Review' });
  const [requests, setRequests] = useState([
    ['Brand Strategy', 'TechStart Lagos', 'Apr 5, 2026', '$3,200', <Badge label="Pending Review" color="gold" />],
    ['Creative Direction', 'Adaeze Okonkwo', 'Apr 8, 2026', '$2,400', <Badge label="Confirmed" color="green" />],
    ['Campaign Concept', 'Vibe Records', 'Apr 12, 2026', '$4,000', <Badge label="In Progress" color="purple" />],
    ['Artist Advisory', 'House of Chidi', 'Mar 28, 2026', '$1,800', <Badge label="Completed" color="green" />],
    ['Event Concept', 'Lagos Fashion Week', 'May 1, 2026', '$5,000', <Badge label="Pending Review" color="gold" />],
  ]);

  const SERVICES_LIST = ['Creative Direction', 'Brand Strategy', 'Campaign Concept & Development', 'Artist Management Advisory', 'Event Concept & Production', 'Content Strategy'];

  const handleAdd = () => {
    setRequests(prev => [[form.service, form.client, form.date, 'TBD', <Badge label={form.status} color="gold" />], ...prev]);
    setShowModal(false);
    setForm({ service: '', client: '', email: '', date: '', status: 'Pending Review' });
  };

  return (
    <div>
      <SectionHeader title="Consultancy Services" sub="Manage public-facing consultancy requests and engagements." action="+ Add Request" onAction={() => setShowModal(true)} />

      {/* Quick stats */}
      <div className="mgw-admin-stats-grid" style={{ marginBottom: 20 }}>
        <StatCard label="Total Requests" value="23" delta="5 this month" accent={GOLD} />
        <StatCard label="Pending Review" value="2" delta="Action needed" accent={BLUE} />
        <StatCard label="In Progress" value="3" delta="Active engagements" accent={PURPLE} />
        <StatCard label="Revenue (YTD)" value="$48K" delta="From consultancy" accent={GOLD} />
      </div>

      <div style={{ background: SURFACE, border: `0.5px solid ${BORDER}`, borderRadius: 10, padding: '6px 8px', overflowX: 'auto' }}>
        <Table
          cols={['Service', 'Client / Company', 'Date', 'Value', 'Status']}
          rows={requests}
          onEdit={i => console.log('edit', i)}
          onDelete={i => setRequests(prev => prev.filter((_, idx) => idx !== i))}
        />
      </div>

      {showModal && (
        <Modal title="Add Consultancy Request" onClose={() => setShowModal(false)}>
          <Field label="Service" type="select" value={form.service} onChange={v => setForm(f => ({ ...f, service: v }))} options={['', ...SERVICES_LIST]} />
          <Field label="Client / Company" value={form.client} onChange={v => setForm(f => ({ ...f, client: v }))} />
          <Field label="Client Email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
          <Field label="Requested Date" type="date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
          <Field label="Status" type="select" value={form.status} onChange={v => setForm(f => ({ ...f, status: v }))} options={['Pending Review', 'Confirmed', 'In Progress', 'Completed', 'Declined']} />
          <button onClick={handleAdd} style={{ marginTop: 8, width: '100%', background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Save Request
          </button>
        </Modal>
      )}
    </div>
  );
}

function MembersSection() {
  const [search, setSearch] = useState('');
  const allMembers = [
    ['Adaeze Okonkwo', 'adaeze@example.com', 'Inner Circle', 'Apr 2, 2026', <Badge label="Active" color="green" />],
    ['Emeka Nwosu', 'emeka@example.com', 'Creative Circle', 'Mar 28, 2026', <Badge label="Active" color="green" />],
    ['Chidera Eze', 'chidera@example.com', 'Inner Circle', 'Mar 15, 2026', <Badge label="Active" color="green" />],
    ['Tunde Fashola', 'tunde@example.com', 'Open Access', 'Mar 10, 2026', <Badge label="Active" color="green" />],
    ['Ngozi Obi', 'ngozi@example.com', 'Creative Circle', 'Feb 22, 2026', <Badge label="Paused" color="gold" />],
    ['Segun Martins', 'segun@example.com', 'Inner Circle', 'Feb 14, 2026', <Badge label="Active" color="green" />],
  ];
  const members = search
    ? allMembers.filter(m => m[0].toLowerCase().includes(search.toLowerCase()) || m[1].toLowerCase().includes(search.toLowerCase()))
    : allMembers;

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
        <Table
          cols={['Name', 'Email', 'Plan', 'Joined', 'Status']}
          rows={members}
          onEdit={i => console.log('edit member', i)}
          onDelete={i => console.log('remove member', i)}
        />
      </div>
    </div>
  );
}

/* ─── Main Admin Page ─── */
export default function AdminPage({ onExit }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = {
    overview: <OverviewSection />,
    sessions: <SessionsSection />,
    programs: <ProgramsSection />,
    vault: <VaultSection />,
    plans: <PlansSection />,
    consultancy: <ConsultancyAdminSection />,
    members: <MembersSection />,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A', color: '#EAEAEA' }}>

      {/* ── Sidebar ── */}
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
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                  letterSpacing: '0.03em',
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

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 98, backdropFilter: 'blur(2px)' }} />
      )}

      {/* ── Main Content ── */}
      <main style={{ flex: 1, minWidth: 0, padding: '24px 20px', overflowX: 'hidden' }}>

        {/* Mobile top bar */}
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
