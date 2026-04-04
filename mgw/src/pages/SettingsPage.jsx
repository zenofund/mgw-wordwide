import React, { useState } from 'react';
import AboutShareSection from '../components/AboutShareSection';

const GOLD = '#C9A227';
const PURPLE = '#6A38C2';
const SURFACE = '#141414';
const BORDER = 'rgba(201,162,39,0.18)';

/* ─── Tiny shared components ─── */
function SectionTitle({ children }) {
  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 26,
      fontWeight: 500,
      color: '#EAEAEA',
      marginBottom: 6,
    }}>
      {children}
    </div>
  );
}

function SectionSub({ children }) {
  return (
    <div style={{ fontSize: 12, color: '#666', marginBottom: 24, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 0.5, background: BORDER, margin: '28px 0' }} />;
}

function InputField({ label, value, onChange, type = 'text', disabled }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#666', marginBottom: 6 }}>
        {label}
      </div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: disabled ? 'rgba(255,255,255,0.03)' : '#1a1a1a',
          border: `0.5px solid ${BORDER}`,
          borderRadius: 8,
          padding: '11px 14px',
          color: disabled ? '#555' : '#EAEAEA',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          outline: 'none',
          transition: 'border-color 0.2s',
          cursor: disabled ? 'not-allowed' : 'text',
        }}
        onFocus={e => { if (!disabled) e.target.style.borderColor = 'rgba(201,162,39,0.45)'; }}
        onBlur={e => { e.target.style.borderColor = BORDER; }}
      />
    </div>
  );
}

function SaveButton({ onClick, saved, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        background: saved ? 'rgba(80,200,120,0.1)' : GOLD,
        color: saved ? '#5CC88A' : '#0A0A0A',
        border: saved ? '0.5px solid rgba(80,200,120,0.35)' : 'none',
        borderRadius: 8,
        padding: '11px 28px',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        transition: 'all 0.2s',
      }}
    >
      {loading ? 'Saving…' : saved ? '✓ Saved' : 'Save Changes'}
    </button>
  );
}

/* ─── SECTION: Profile Management ─── */
function ProfileSection({ user, onUpdateUser }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const initial = (name || user?.name || 'M').charAt(0).toUpperCase();

  const handleSave = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    onUpdateUser?.({ name, email, phone, bio });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <SectionTitle>Profile</SectionTitle>
      <SectionSub>Manage your name, contact details, and personal bio.</SectionSub>

      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          background: `${GOLD}18`,
          border: `1.5px solid ${GOLD}60`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 26,
          color: GOLD,
          fontWeight: 700,
          flexShrink: 0,
        }}>
          {initial}
        </div>
        <div>
          <div style={{ fontSize: 13, color: '#EAEAEA', fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 4 }}>
            {name || 'Your Name'}
          </div>
          <div style={{ fontSize: 11, color: '#555' }}>Avatar uses your first initial</div>
        </div>
      </div>

      <InputField label="Full Name" value={name} onChange={setName} />
      <InputField label="Email Address" value={email} onChange={setEmail} type="email" />
      <InputField label="Phone Number" value={phone} onChange={setPhone} type="tel" />

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#666', marginBottom: 6 }}>
          Bio
        </div>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={3}
          placeholder="A short bio about yourself…"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: '#1a1a1a',
            border: `0.5px solid ${BORDER}`,
            borderRadius: 8,
            padding: '11px 14px',
            color: '#EAEAEA',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.6,
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(201,162,39,0.45)'; }}
          onBlur={e => { e.target.style.borderColor = BORDER; }}
        />
      </div>

      <SaveButton onClick={handleSave} saved={saved} loading={loading} />

      <Divider />

      {/* Change password */}
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: '#EAEAEA', marginBottom: 14 }}>
        Change Password
      </div>
      <InputField label="Current Password" value="" onChange={() => {}} type="password" />
      <InputField label="New Password" value="" onChange={() => {}} type="password" />
      <InputField label="Confirm New Password" value="" onChange={() => {}} type="password" />

      <button style={{
        background: 'rgba(106,56,194,0.1)',
        border: '0.5px solid rgba(106,56,194,0.35)',
        color: '#9B62F0',
        borderRadius: 8,
        padding: '11px 28px',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: 'pointer',
      }}>
        Update Password
      </button>
    </div>
  );
}


/* ─── SECTION: Manage Subscription ─── */
function SubscriptionSection({ user, plans, onNavigate }) {
  const tierColors = { free: '#555', standard: '#6A38C2', premium: '#C9A227' };
  const currentPlan = user?.plan;
  const currentColor = tierColors[user?.tier] || '#555';

  return (
    <div>
      <SectionTitle>Subscription</SectionTitle>
      <SectionSub>View and manage your current membership plan.</SectionSub>

      {/* Current plan */}
      <div style={{
        background: currentPlan ? `${currentColor}0A` : 'rgba(255,255,255,0.02)',
        border: `0.5px solid ${currentPlan ? currentColor + '40' : BORDER}`,
        borderRadius: 12,
        padding: '20px 18px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555', marginBottom: 5 }}>
            Current Plan
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: currentPlan ? currentColor : '#555' }}>
            {currentPlan?.name || 'Open Access (Free)'}
          </div>
          {currentPlan && (
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              {currentPlan.price} · {currentPlan.billing}
            </div>
          )}
        </div>
        {currentPlan && (
          <div style={{
            background: `${currentColor}12`,
            border: `0.5px solid ${currentColor}40`,
            borderRadius: 20,
            padding: '5px 14px',
            fontSize: 11,
            color: currentColor,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            Active
          </div>
        )}
      </div>

      {/* Plans grid */}
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: '#EAEAEA', marginBottom: 14 }}>
        Available Plans
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {(plans || []).map(plan => {
          const planColor = tierColors[plan.tier] || '#555';
          const isCurrent = currentPlan?.name === plan.name;
          return (
            <div
              key={plan.name}
              style={{
                background: isCurrent ? `${planColor}0D` : SURFACE,
                border: `0.5px solid ${isCurrent ? planColor + '45' : BORDER}`,
                borderRadius: 10,
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 16,
                  color: isCurrent ? planColor : '#EAEAEA',
                  marginBottom: 4,
                }}>
                  {plan.name}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 10px' }}>
                  {(plan.features || []).slice(0, 3).map(f => (
                    <span key={f} style={{ fontSize: 10, color: '#666' }}>· {f}</span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: planColor }}>
                  {plan.price}
                </div>
                <div style={{ fontSize: 10, color: '#555', marginBottom: 8 }}>{plan.billing}</div>
                {isCurrent ? (
                  <span style={{ fontSize: 10, color: planColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Current</span>
                ) : (
                  <button
                    onClick={() => onNavigate?.('auth', { view: 'plans' })}
                    style={{
                      background: `${planColor}12`,
                      border: `0.5px solid ${planColor}35`,
                      color: planColor,
                      borderRadius: 6,
                      padding: '6px 16px',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {plan.tier === 'free' ? 'Downgrade' : 'Upgrade'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Divider />

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button style={{
          background: 'rgba(220,60,60,0.07)',
          border: '0.5px solid rgba(220,60,60,0.2)',
          color: '#cc5555',
          borderRadius: 8,
          padding: '10px 20px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          cursor: 'pointer',
          letterSpacing: '0.04em',
        }}>
          Cancel Subscription
        </button>
        <button style={{
          background: 'rgba(201,162,39,0.06)',
          border: `0.5px solid ${BORDER}`,
          color: '#777',
          borderRadius: 8,
          padding: '10px 20px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          cursor: 'pointer',
          letterSpacing: '0.04em',
        }}>
          Billing History
        </button>
      </div>
    </div>
  );
}

/* ─── SECTION: Terms of Use ─── */
function TermsSection() {
  return (
    <div>
      <SectionTitle>Terms of Use</SectionTitle>
      <SectionSub>Last updated: April 2026</SectionSub>

      {[
        {
          title: '1. Acceptance of Terms',
          body: 'By accessing or using the Mavin Grandpa Worldwide (MGW) platform, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the platform.',
        },
        {
          title: '2. Platform Use',
          body: 'MGW grants you a limited, non-exclusive, non-transferable licence to access and use the platform for personal, non-commercial purposes. You may not reproduce, distribute, or create derivative works from any content on the platform without prior written consent.',
        },
        {
          title: '3. User Accounts',
          body: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to notify MGW immediately of any unauthorised use of your account. MGW is not liable for any loss resulting from unauthorised access to your account.',
        },
        {
          title: '4. Content & Intellectual Property',
          body: 'All content on the MGW platform — including videos, audio, PDFs, masterclass recordings, and written material — is the intellectual property of Mavin Grandpa Worldwide or its licensors. Unauthorised reproduction or distribution is strictly prohibited.',
        },
        {
          title: '5. Payments & Refunds',
          body: 'All payments made through the platform are final unless otherwise stated. Membership fees are billed as described at sign-up. Refund requests must be submitted within 7 days of purchase and are subject to review.',
        },
        {
          title: '6. Prohibited Conduct',
          body: 'You agree not to: (a) use the platform for any unlawful purpose; (b) harass or harm other members; (c) attempt to gain unauthorised access to any part of the platform; (d) share your account credentials with others.',
        },
        {
          title: '7. Termination',
          body: 'MGW reserves the right to suspend or terminate your account at its discretion, including for violations of these terms. Upon termination, your access to all platform content will cease immediately.',
        },
        {
          title: '8. Changes to Terms',
          body: 'MGW may update these terms at any time. Continued use of the platform after changes are posted constitutes your acceptance of the revised terms.',
        },
        {
          title: '9. Contact',
          body: 'For questions about these Terms, please contact us at legal@mgw.app.',
        },
      ].map(section => (
        <div key={section.title} style={{ marginBottom: 22 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 15,
            color: '#EAEAEA',
            marginBottom: 7,
            fontWeight: 500,
          }}>
            {section.title}
          </div>
          <div style={{ fontSize: 12, color: '#888', lineHeight: 1.85 }}>
            {section.body}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── SECTION: Privacy Policy ─── */
function PrivacySection() {
  return (
    <div>
      <SectionTitle>Privacy Policy</SectionTitle>
      <SectionSub>Last updated: April 2026</SectionSub>

      {[
        {
          title: 'Information We Collect',
          body: 'We collect information you provide directly (name, email, payment details), as well as usage data (pages visited, sessions booked, vault content accessed). We also collect device and technical information to improve platform performance.',
        },
        {
          title: 'How We Use Your Information',
          body: 'Your information is used to: provide and personalise your platform experience; process payments; send important account communications; improve our content and services; and prevent fraud or abuse.',
        },
        {
          title: 'Data Sharing',
          body: 'MGW does not sell your personal data. We share information with trusted third-party service providers (e.g. Paystack for payments, Zoom for sessions) only to the extent necessary to provide our services. All third parties are bound by appropriate data protection agreements.',
        },
        {
          title: 'Cookies & Tracking',
          body: 'We use cookies and similar technologies to maintain your session, remember your preferences, and analyse platform usage. You can control cookie settings through your browser, though some features may not function correctly if cookies are disabled.',
        },
        {
          title: 'Data Security',
          body: 'We implement industry-standard security measures to protect your personal information. However, no method of internet transmission is 100% secure. We encourage you to use strong passwords and keep your credentials confidential.',
        },
        {
          title: 'Your Rights',
          body: 'Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. To exercise these rights, contact us at privacy@mgw.app. We will respond within 30 days.',
        },
        {
          title: 'Data Retention',
          body: 'We retain your data for as long as your account is active or as needed to provide services. Upon account deletion, your personal data is removed within 30 days, except where retention is required by law.',
        },
        {
          title: 'Children\'s Privacy',
          body: 'The MGW platform is not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us immediately.',
        },
        {
          title: 'Contact',
          body: 'For privacy-related questions or requests, contact our Data Protection team at privacy@mgw.app.',
        },
      ].map(section => (
        <div key={section.title} style={{ marginBottom: 22 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 15,
            color: '#EAEAEA',
            marginBottom: 7,
            fontWeight: 500,
          }}>
            {section.title}
          </div>
          <div style={{ fontSize: 12, color: '#888', lineHeight: 1.85 }}>
            {section.body}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── NAV items ─── */
const NAV_ITEMS = [
  { id: 'profile',      label: 'Profile',       icon: '👤' },
  { id: 'about',        label: 'About & Share',  icon: '◎' },
  { id: 'subscription', label: 'Subscription',   icon: '⬡' },
  { id: 'terms',        label: 'Terms of Use',   icon: '§' },
  { id: 'privacy',      label: 'Privacy Policy', icon: '🔒' },
];

/* ─── MAIN ─── */
export default function SettingsPage({ user, plans, onNavigate, onUpdateUser, onLogout }) {
  const [activeSection, setActiveSection] = useState('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':      return <ProfileSection user={user} onUpdateUser={onUpdateUser} />;
      case 'about':        return <AboutShareSection />;
      case 'subscription': return <SubscriptionSection user={user} plans={plans} onNavigate={onNavigate} />;
      case 'terms':        return <TermsSection />;
      case 'privacy':      return <PrivacySection />;
      default:             return null;
    }
  };

  return (
    <div style={{ background: '#0A0A0A', color: '#EAEAEA', minHeight: '100vh' }}>
      <div className="mgw-settings-outer">

        {/* Page Hero */}
        <div style={{ padding: '60px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', borderRadius: '50%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(106,56,194,0.18) 0%, transparent 70%)', top: -100, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 14, position: 'relative' }}>Account</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 500, lineHeight: 1.15, margin: '0 0 14px', position: 'relative' }}>
            Your <em style={{ color: GOLD }}>Settings</em>
          </h1>
          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7, maxWidth: 520, margin: '0 auto', position: 'relative' }}>
            Manage your profile, subscription, and account preferences.
          </p>
        </div>

        <div className="mgw-settings-layout">
          {/* Sidebar / Mobile tab strip */}
          <nav className="mgw-settings-nav">
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    textAlign: 'left',
                    background: isActive ? 'rgba(201,162,39,0.08)' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? `2px solid ${GOLD}` : '2px solid transparent',
                    borderRadius: '0 8px 8px 0',
                    padding: '11px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    color: isActive ? GOLD : '#777',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    letterSpacing: '0.02em',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span style={{ fontSize: 14, opacity: 0.8 }}>{item.icon}</span>
                  <span className="mgw-settings-nav-label">{item.label}</span>
                </button>
              );
            })}

            {/* Sign out */}
            <div style={{ height: 0.5, background: BORDER, margin: '10px 14px' }} />
            <button
              onClick={onLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                borderLeft: '2px solid transparent',
                borderRadius: '0 8px 8px 0',
                padding: '11px 14px',
                cursor: 'pointer',
                color: '#cc5555',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ fontSize: 14 }}>→</span>
              <span className="mgw-settings-nav-label">Sign Out</span>
            </button>
          </nav>

          {/* Mobile tab strip */}
          <div className="mgw-settings-tabs">
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    flexShrink: 0,
                    background: isActive ? 'rgba(201,162,39,0.08)' : 'transparent',
                    border: `0.5px solid ${isActive ? 'rgba(201,162,39,0.35)' : BORDER}`,
                    borderRadius: 10,
                    padding: '8px 14px',
                    cursor: 'pointer',
                    color: isActive ? GOLD : '#777',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  {item.label.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div className="mgw-settings-content">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
