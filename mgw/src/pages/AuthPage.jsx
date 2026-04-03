import React, { useState } from 'react';
import logoImg from '@assets/logo_1775177601310.webp';

const GOLD   = '#C9A227';
const PURPLE = '#6A38C2';

const s = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #08050f 0%, #0A0A0A 100%)',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 24px 48px',
    position: 'relative',
    overflow: 'hidden',
  },
  orb1: { position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: PURPLE, filter: 'blur(80px)', top: -120, right: -80, opacity: 0.2, pointerEvents: 'none' },
  orb2: { position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: GOLD, filter: 'blur(80px)', bottom: 0, left: -60, opacity: 0.1, pointerEvents: 'none' },
  logoArea: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48, paddingBottom: 28, position: 'relative' },
  card: { background: 'rgba(20,20,20,0.85)', border: '0.5px solid rgba(201,162,39,0.18)', borderRadius: 12, padding: '28px 24px', position: 'relative' },
  cardTitle: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 500, marginBottom: 4 },
  cardSub: { fontSize: 12, color: '#999', marginBottom: 24 },
  formGroup: { marginBottom: 16 },
  label: { display: 'block', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: 6 },
  input: { width: '100%', background: 'rgba(234,234,234,0.04)', border: '0.5px solid rgba(234,234,234,0.15)', borderRadius: 4, padding: '12px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#EAEAEA', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' },
  forgotLink: { textAlign: 'right', marginTop: -10, marginBottom: 16, fontSize: 11, color: GOLD, cursor: 'pointer' },
  divider: { display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' },
  dividerLine: { flex: 1, height: 0.5, background: 'rgba(201,162,39,0.18)' },
  dividerText: { fontSize: 10, color: '#999', letterSpacing: '0.08em' },
  footer: { textAlign: 'center', marginTop: 20, fontSize: 12, color: '#999' },
  footerLink: { color: GOLD, cursor: 'pointer' },
  backLink: { textAlign: 'center', marginTop: 20, fontSize: 11, color: GOLD, cursor: 'pointer' },
  primaryBtn: { marginTop: 8, width: '100%', background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 6, padding: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase' },
  ghostBtn: { marginTop: 8, width: '100%', background: 'transparent', color: '#999', border: '0.5px solid rgba(234,234,234,0.15)', borderRadius: 6, padding: '12px', fontWeight: 400, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13 },
};

function Logo() {
  return (
    <div style={s.logoArea}>
      <img src={logoImg} alt="MGW" style={{ width: 72, height: 72, objectFit: 'contain', marginBottom: 12 }} />
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>MGW</div>
      <div style={{ fontSize: 10, color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>Mavin Grandpa Worldwide</div>
    </div>
  );
}

function LoginView({ onForgotPassword, onJoinCircle, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={s.card}>
      <div className="mgw-auth-card-title" style={s.cardTitle}>Welcome back</div>
      <div style={s.cardSub}>Sign in to your private circle account</div>

      <div style={s.formGroup}>
        <label style={s.label}>Email address</label>
        <input style={s.input} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div style={s.formGroup}>
        <label style={s.label}>Password</label>
        <input style={s.input} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <div style={s.forgotLink} onClick={onForgotPassword}>Forgot password?</div>

      <button style={s.primaryBtn} onClick={() => onSubmit?.({ email, password })}>Sign In</button>

      <div style={s.divider}><div style={s.dividerLine} /><span style={s.dividerText}>or</span><div style={s.dividerLine} /></div>

      <button style={s.ghostBtn}>Continue with Google</button>

      <div style={s.footer}>
        Don't have an account?{' '}
        <span style={s.footerLink} onClick={onJoinCircle}>Join the Circle</span>
      </div>
    </div>
  );
}

function PlansView({ plans, onSelect, onBack }) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 500, marginBottom: 6 }}>Choose Your Circle</div>
        <div style={{ fontSize: 12, color: '#999' }}>Select a membership to unlock your access</div>
      </div>

      <div className="mgw-plans-scroll">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="mgw-plan-card"
            onClick={() => onSelect(plan)}
            style={{ background: '#141414', border: `0.5px solid ${plan.color}50`, borderRadius: 12, padding: '22px 18px', cursor: 'pointer', position: 'relative', overflow: 'hidden', flexShrink: 0 }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: plan.color }} />
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 500, marginBottom: 6 }}>{plan.name}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, color: plan.color, fontWeight: 700, lineHeight: 1 }}>{plan.price}</div>
            <div style={{ fontSize: 10, color: '#777', marginBottom: 16, marginTop: 2 }}>{plan.billing}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {plan.features.map(f => (
                <li key={f} style={{ fontSize: 12, color: '#EAEAEA', padding: '4px 0', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: plan.color, fontSize: 10, marginTop: 2 }}>✦</span>{f}
                </li>
              ))}
            </ul>
            <button style={{ marginTop: 20, width: '100%', background: plan.color, color: plan.color === '#555' ? '#EAEAEA' : '#0A0A0A', border: 'none', borderRadius: 6, padding: '10px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Select
            </button>
          </div>
        ))}
      </div>

      <div style={s.backLink} onClick={onBack}>← Back to Sign In</div>
    </div>
  );
}

function RegisterView({ plan, onLogin, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div style={s.card}>
      {plan && (
        <div style={{ background: `${plan.color}12`, border: `0.5px solid ${plan.color}50`, borderRadius: 8, padding: '10px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: 2 }}>Selected Plan</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, color: plan.color, fontWeight: 600 }}>{plan.name}</div>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, color: plan.color, fontWeight: 700 }}>{plan.price}</div>
        </div>
      )}

      <div className="mgw-auth-card-title" style={s.cardTitle}>Join the Circle</div>
      <div style={s.cardSub}>Create your private membership account</div>

      {[
        { label: 'Full name', key: 'name', type: 'text', placeholder: 'Your name' },
        { label: 'Email address', key: 'email', type: 'email', placeholder: 'you@example.com' },
        { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
      ].map(field => (
        <div key={field.key} style={s.formGroup}>
          <label style={s.label}>{field.label}</label>
          <input style={s.input} type={field.type} placeholder={field.placeholder} value={form[field.key]} onChange={set(field.key)} />
        </div>
      ))}

      <button style={s.primaryBtn} onClick={() => onSubmit?.(form)}>
        {plan && plan.price !== '$0' ? 'Continue to Payment' : 'Create Account'}
      </button>

      <div style={s.footer}>
        Already a member?{' '}
        <span style={s.footerLink} onClick={onLogin}>Sign in</span>
      </div>
    </div>
  );
}

function PaymentView({ plan, registrationData, onSuccess, onBack }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [cardNum, setCardNum] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => onSuccess?.(), 1200);
    }, 2000);
  };

  const priceNum = plan?.price?.replace('$', '') || '0';

  if (done) {
    return (
      <div style={{ ...s.card, textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>✓</div>
        <div style={{ color: '#00C49A', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, marginBottom: 6 }}>Payment Successful</div>
        <div style={{ color: '#999', fontSize: 12 }}>Creating your account…</div>
      </div>
    );
  }

  return (
    <div style={{ ...s.card, padding: 0, overflow: 'hidden' }}>
      {/* Paystack header */}
      <div style={{ background: '#00C49A', padding: '20px 24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 14, letterSpacing: '0.04em' }}>Paystack</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '4px 10px', fontSize: 10, color: 'white' }}>Secure</div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginBottom: 2 }}>{registrationData?.email || 'you@example.com'}</div>
        <div style={{ color: 'white', fontWeight: 700, fontSize: 24 }}>
          ${priceNum} <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.8 }}>USD</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, marginTop: 2 }}>{plan?.name} — {plan?.billing}</div>
      </div>

      {/* Form */}
      <div style={{ padding: '24px' }}>
        <div style={{ fontSize: 10, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Card Details</div>

        <div style={s.formGroup}>
          <label style={s.label}>Card Number</label>
          <input
            style={s.input}
            placeholder="0000 0000 0000 0000"
            value={cardNum}
            maxLength={19}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 16);
              setCardNum(v.replace(/(.{4})/g, '$1 ').trim());
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={s.label}>Expiry</label>
            <input style={s.input} placeholder="MM / YY" value={expiry} onChange={e => setExpiry(e.target.value)} maxLength={7} />
          </div>
          <div>
            <label style={s.label}>CVV</label>
            <input style={s.input} placeholder="•••" type="password" value={cvv} onChange={e => setCvv(e.target.value)} maxLength={4} />
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          style={{ width: '100%', background: loading ? '#009e7a' : '#00C49A', color: 'white', border: 'none', borderRadius: 6, padding: '13px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: '0.04em', transition: 'background 0.2s' }}
        >
          {loading ? 'Processing…' : `Pay $${priceNum}`}
        </button>

        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 10, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Secured by Paystack
        </div>

        <div style={s.backLink} onClick={onBack}>← Change plan</div>
      </div>
    </div>
  );
}

function ForgotView({ onBack, onSubmit }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div style={{ ...s.card, textAlign: 'center', padding: '36px 24px' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✉</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, marginBottom: 6 }}>Check your inbox</div>
        <div style={{ color: '#999', fontSize: 12 }}>A reset link has been sent to {email}</div>
        <div style={{ ...s.backLink, marginTop: 24 }} onClick={onBack}>← Back to Sign In</div>
      </div>
    );
  }

  return (
    <div style={s.card}>
      <div className="mgw-auth-card-title" style={s.cardTitle}>Reset Password</div>
      <div style={s.cardSub}>Enter your email and we'll send a reset link.</div>

      <div style={s.formGroup}>
        <label style={s.label}>Email address</label>
        <input style={s.input} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <button style={s.primaryBtn} onClick={() => { onSubmit?.(email); setSent(true); }}>Send Reset Link</button>
      <div style={s.backLink} onClick={onBack}>← Back to Sign In</div>
    </div>
  );
}

export default function AuthPage({ initialView = 'login', plans = [], onLogin, onRegister, onForgotPassword }) {
  const [view, setView] = useState(initialView);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [regData, setRegData] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setView('register');
  };

  const handleRegisterSubmit = (data) => {
    setRegData(data);
    if (selectedPlan && selectedPlan.price !== '$0') {
      setView('payment');
    } else {
      onRegister?.({ ...data, plan: selectedPlan });
    }
  };

  const handlePaymentSuccess = () => {
    onRegister?.({ ...regData, plan: selectedPlan });
  };

  return (
    <div className="mgw-auth-wrapper" style={s.wrapper}>
      <div style={s.orb1} />
      <div style={s.orb2} />

      <div className={`mgw-auth-card-wrap${view === 'plans' ? ' mgw-auth-plans-active' : ''}`}>
        <Logo />

        {view === 'login' && (
          <LoginView
            onForgotPassword={() => setView('forgot')}
            onJoinCircle={() => setView('plans')}
            onSubmit={onLogin}
          />
        )}

        {view === 'plans' && (
          <PlansView
            plans={plans}
            onSelect={handlePlanSelect}
            onBack={() => setView('login')}
          />
        )}

        {view === 'register' && (
          <RegisterView
            plan={selectedPlan}
            onLogin={() => setView('login')}
            onSubmit={handleRegisterSubmit}
          />
        )}

        {view === 'payment' && (
          <PaymentView
            plan={selectedPlan}
            registrationData={regData}
            onSuccess={handlePaymentSuccess}
            onBack={() => setView('plans')}
          />
        )}

        {view === 'forgot' && (
          <ForgotView
            onBack={() => setView('login')}
            onSubmit={onForgotPassword}
          />
        )}
      </div>
    </div>
  );
}
