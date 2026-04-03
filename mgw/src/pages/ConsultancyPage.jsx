import React, { useState } from 'react';
import Button from '../components/Button';

const SERVICES = [
  {
    id: 'creative-direction',
    icon: '✦',
    title: 'Creative Direction',
    tagline: 'Define the vision. Command the room.',
    desc: 'Strategic creative oversight for campaigns, brands, and cultural projects that demand an elite aesthetic standard and a seasoned perspective.',
    duration: '2 – 4 weeks',
    starts: 'From $2,400',
    accent: 'gold',
  },
  {
    id: 'brand-strategy',
    icon: '◈',
    title: 'Brand Strategy',
    tagline: 'Build brands that outlast the moment.',
    desc: 'Deep-dive brand positioning, identity architecture, and market differentiation for emerging and established creative businesses.',
    duration: '3 – 6 weeks',
    starts: 'From $3,200',
    accent: 'purple',
  },
  {
    id: 'campaign-concept',
    icon: '◉',
    title: 'Campaign Concept & Development',
    tagline: 'Concepts that move culture forward.',
    desc: 'End-to-end campaign development from insight to execution — ideas rooted in cultural intelligence and decades of creative industry leadership.',
    duration: '4 – 8 weeks',
    starts: 'From $4,000',
    accent: 'blue',
  },
  {
    id: 'artist-advisory',
    icon: '◆',
    title: 'Artist Management Advisory',
    tagline: "Navigate the industry with an elder\u2019s map.",
    desc: 'Structured advisory for artist managers and independent acts — from deal structures and release strategy to career trajectory planning.',
    duration: '1 – 3 months',
    starts: 'From $1,800',
    accent: 'gold',
  },
  {
    id: 'event-concept',
    icon: '✧',
    title: 'Event Concept & Production',
    tagline: 'Experiences worth remembering.',
    desc: 'Creative conceptualization and production oversight for flagship events, showcases, and cultural gatherings across the continent and beyond.',
    duration: 'Project-based',
    starts: 'From $5,000',
    accent: 'purple',
  },
  {
    id: 'content-strategy',
    icon: '▣',
    title: 'Content Strategy',
    tagline: 'Your story. Your terms. Globally told.',
    desc: 'Multi-platform content strategy for artists, brands, and public figures seeking a consistent, distinguished creative voice across all channels.',
    duration: '2 – 6 weeks',
    starts: 'From $1,600',
    accent: 'blue',
  },
];

const accentColors = {
  gold:   'linear-gradient(135deg, #C9A227, #E8C84A)',
  purple: 'linear-gradient(135deg, #6A38C2, #9B62F0)',
  blue:   'linear-gradient(135deg, #00B3FF, #38CFFF)',
};

const accentBg = {
  gold:   'rgba(201,162,39,0.07)',
  purple: 'rgba(106,56,194,0.07)',
  blue:   'rgba(0,179,255,0.07)',
};

const accentBorder = {
  gold:   'rgba(201,162,39,0.3)',
  purple: 'rgba(106,56,194,0.3)',
  blue:   'rgba(0,179,255,0.2)',
};

const s = {
  page: { background: '#0A0A0A', color: '#EAEAEA', minHeight: '100vh' },

  hero: {
    padding: '60px 24px 40px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroOrb: {
    position: 'absolute', borderRadius: '50%',
    width: 400, height: 400,
    background: 'radial-gradient(circle, rgba(106,56,194,0.18) 0%, transparent 70%)',
    top: -100, left: '50%', transform: 'translateX(-50%)',
    pointerEvents: 'none',
  },
  heroLabel: {
    fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
    color: '#C9A227', marginBottom: 14, position: 'relative',
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 36, fontWeight: 500, lineHeight: 1.15,
    marginBottom: 14, position: 'relative',
  },
  heroSub: {
    fontSize: 13, color: '#888', lineHeight: 1.7,
    maxWidth: 520, margin: '0 auto 28px', position: 'relative',
  },

  servicesSection: { padding: '8px 20px 48px' },
  sectionLabel: {
    fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
    color: '#C9A227', marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 26, fontWeight: 500, marginBottom: 4,
  },
  sectionSub: { fontSize: 12, color: '#888', lineHeight: 1.6, marginBottom: 28 },

  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 14,
  },
  serviceCard: {
    background: '#111',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 12,
    padding: '22px 20px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  cardTopBar: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
  },
  cardIcon: {
    fontSize: 20, marginBottom: 12,
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 18, fontWeight: 500, marginBottom: 4,
  },
  cardTagline: {
    fontSize: 11, fontStyle: 'italic', color: '#C9A227',
    marginBottom: 10, letterSpacing: '0.02em',
  },
  cardDesc: { fontSize: 12, color: '#888', lineHeight: 1.65, marginBottom: 16 },
  cardMeta: {
    display: 'flex', gap: 16, alignItems: 'center',
    paddingTop: 12, borderTop: '0.5px solid rgba(255,255,255,0.06)',
  },
  cardMetaItem: { fontSize: 10, color: '#666' },
  cardMetaVal: { color: '#C9A227', fontWeight: 500, fontSize: 11 },

  bookSection: {
    padding: '8px 20px 60px',
  },
  bookCard: {
    background: 'linear-gradient(145deg, #141020 0%, #0e0c18 100%)',
    border: '0.5px solid rgba(201,162,39,0.25)',
    borderRadius: 14,
    padding: '28px 22px',
  },
  bookTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 24, fontWeight: 500, marginBottom: 6,
  },
  bookSub: { fontSize: 12, color: '#888', lineHeight: 1.6, marginBottom: 22 },
  formField: { marginBottom: 14 },
  label: {
    display: 'block', fontSize: 10, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#888', marginBottom: 6,
  },
  input: {
    width: '100%', background: '#1a1a1a', border: '0.5px solid rgba(201,162,39,0.2)',
    borderRadius: 6, padding: '10px 12px', color: '#EAEAEA',
    fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%', background: '#1a1a1a', border: '0.5px solid rgba(201,162,39,0.2)',
    borderRadius: 6, padding: '10px 12px', color: '#EAEAEA',
    fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none',
    boxSizing: 'border-box', appearance: 'none',
  },
  textarea: {
    width: '100%', background: '#1a1a1a', border: '0.5px solid rgba(201,162,39,0.2)',
    borderRadius: 6, padding: '10px 12px', color: '#EAEAEA',
    fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: 'none',
    resize: 'vertical', minHeight: 90, boxSizing: 'border-box',
  },
  successBanner: {
    background: 'rgba(201,162,39,0.08)',
    border: '0.5px solid rgba(201,162,39,0.35)',
    borderRadius: 8, padding: '14px 18px', marginBottom: 20,
    fontSize: 13, color: '#C9A227', textAlign: 'center',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontStyle: 'italic',
  },
};

export default function ConsultancyPage() {
  const [selected, setSelected] = useState('');
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={s.page}>

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroOrb} />
        <div style={s.heroLabel}>Creative Consultancy</div>
        <h1 className="mgw-consult-title" style={s.heroTitle}>
          Where Vision Meets<br />
          <em style={{ color: '#C9A227' }}>Strategic Mastery</em>
        </h1>
        <p style={s.heroSub}>
          Mavin Grandpa Worldwide brings three decades of creative industry authority to your project. Select a service below and request a consultation.
        </p>
        <Button variant="primary" size="md" onClick={() => document.getElementById('book-consult')?.scrollIntoView({ behavior: 'smooth' })}>
          Request a Consultation
        </Button>
      </div>

      {/* Services Grid */}
      <div style={s.servicesSection}>
        <div className="mgw-inner">
          <div style={s.sectionLabel}>Services</div>
          <div className="mgw-consult-title-lg" style={s.sectionTitle}>Creative Consultancy Offerings</div>
          <div style={s.sectionSub}>Tailored engagements for brands, artists, and creative leaders who demand the best.</div>

          <div className="mgw-consult-grid" style={s.servicesGrid}>
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                style={{
                  ...s.serviceCard,
                  background: selected === svc.id ? accentBg[svc.accent] : '#111',
                  borderColor: selected === svc.id ? accentBorder[svc.accent] : 'rgba(201,162,39,0.18)',
                }}
                onClick={() => { setSelected(svc.id); setForm(f => ({ ...f, service: svc.title })); }}
              >
                <div style={{ ...s.cardTopBar, background: accentColors[svc.accent] }} />
                <div style={{ ...s.cardIcon, color: svc.accent === 'gold' ? '#C9A227' : svc.accent === 'purple' ? '#9B62F0' : '#38CFFF' }}>
                  {svc.icon}
                </div>
                <div style={s.cardTitle}>{svc.title}</div>
                <div style={s.cardTagline}>{svc.tagline}</div>
                <div style={s.cardDesc}>{svc.desc}</div>
                <div style={s.cardMeta}>
                  <div style={s.cardMetaItem}>
                    Duration<br /><span style={s.cardMetaVal}>{svc.duration}</span>
                  </div>
                  <div style={s.cardMetaItem}>
                    Investment<br /><span style={s.cardMetaVal}>{svc.starts}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div id="book-consult" style={s.bookSection}>
        <div className="mgw-inner">
          <div style={s.bookCard}>
            <div style={s.bookTitle}>Request a Consultation</div>
            <div style={s.bookSub}>Complete the form below. We will review your inquiry and get back within 48 hours.</div>

            {submitted ? (
              <div style={s.successBanner}>
                Your consultation request has been received. Expect a response within 48 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={s.formField}>
                  <label style={s.label}>Full Name</label>
                  <input style={s.input} type="text" required placeholder="Your full name"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Email Address</label>
                  <input style={s.input} type="email" required placeholder="your@email.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Company / Brand (Optional)</label>
                  <input style={s.input} type="text" placeholder="Your company or brand name"
                    value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Service</label>
                  <select style={s.select} value={form.service}
                    onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(svc => (
                      <option key={svc.id} value={svc.title}>{svc.title}</option>
                    ))}
                  </select>
                </div>
                <div style={s.formField}>
                  <label style={s.label}>Tell us about your project</label>
                  <textarea style={s.textarea} required placeholder="Describe your project, goals, and timeline..."
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <Button variant="primary" size="md" type="submit">Submit Request</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
