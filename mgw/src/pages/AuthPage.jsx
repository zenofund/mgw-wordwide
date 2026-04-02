import React, { useState } from 'react';
import Button from '../components/Button';

const s = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #08050f 0%, #0A0A0A 100%)',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 24px 32px',
    position: 'relative',
    overflow: 'hidden',
  },
  orb1: {
    position: 'absolute',
    width: 300, height: 300,
    borderRadius: '50%',
    background: '#6A38C2',
    filter: 'blur(80px)',
    top: -120, right: -80,
    opacity: 0.2,
    pointerEvents: 'none',
  },
  orb2: {
    position: 'absolute',
    width: 200, height: 200,
    borderRadius: '50%',
    background: '#C9A227',
    filter: 'blur(80px)',
    bottom: 0, left: -60,
    opacity: 0.1,
    pointerEvents: 'none',
  },
  logoArea: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    paddingTop: 60, paddingBottom: 36,
    position: 'relative',
  },
  logoMark: {
    width: 60, height: 60,
    borderRadius: '50%',
    border: '1px solid rgba(201,162,39,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
    background: 'rgba(201,162,39,0.07)',
  },
  logoText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 13, letterSpacing: '0.25em', textTransform: 'uppercase',
    color: '#C9A227', fontWeight: 600,
  },
  logoSub: { fontSize: 10, color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 },
  card: {
    background: 'rgba(20,20,20,0.8)',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 12,
    padding: '28px 24px',
    position: 'relative',
  },
  cardTitle: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 500, marginBottom: 4 },
  cardSub: { fontSize: 12, color: '#999', marginBottom: 24 },
  formGroup: { marginBottom: 16 },
  label: {
    display: 'block', fontSize: 9, letterSpacing: '0.15em',
    textTransform: 'uppercase', color: '#999', marginBottom: 6,
  },
  input: {
    width: '100%',
    background: 'rgba(234,234,234,0.04)',
    border: '0.5px solid rgba(234,234,234,0.15)',
    borderRadius: 4,
    padding: '12px 14px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    color: '#EAEAEA',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  forgotLink: {
    textAlign: 'right', marginTop: -10, marginBottom: 16,
    fontSize: 11, color: '#C9A227', cursor: 'pointer',
  },
  divider: { display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' },
  dividerLine: { flex: 1, height: 0.5, background: 'rgba(201,162,39,0.18)' },
  dividerText: { fontSize: 10, color: '#999', letterSpacing: '0.08em' },
  footer: { textAlign: 'center', marginTop: 20, fontSize: 12, color: '#999' },
  footerLink: { color: '#C9A227', cursor: 'pointer' },
  backLink: { textAlign: 'center', marginTop: 20, fontSize: 11, color: '#C9A227', cursor: 'pointer' },
};

const HexLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4 L22 9 L22 19 L14 24 L6 19 L6 9 Z" stroke="#C9A227" strokeWidth="1" fill="none" />
    <path d="M14 8 L18 11 L18 17 L14 20 L10 17 L10 11 Z" fill="rgba(201,162,39,0.2)" stroke="#C9A227" strokeWidth="0.5" />
  </svg>
);

function LoginView({ onForgotPassword, onRegister, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={s.card}>
      <div className="mgw-auth-card-title" style={s.cardTitle}>Welcome back</div>
      <div style={s.cardSub}>Sign in to your private circle account</div>

      <div style={s.formGroup}>
        <label style={s.label}>Email address</label>
        <input
          style={s.input}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>Password</label>
        <input
          style={s.input}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={s.forgotLink} onClick={onForgotPassword}>Forgot password?</div>

      <Button variant="primary" size="full" onClick={() => onSubmit?.({ email, password })}>
        Sign In
      </Button>

      <div style={s.divider}>
        <div style={s.dividerLine} />
        <span style={s.dividerText}>or</span>
        <div style={s.dividerLine} />
      </div>

      <Button variant="ghost" size="full">Continue with Google</Button>

      <div style={s.footer}>
        Don't have an account?{' '}
        <span style={s.footerLink} onClick={onRegister}>Join the Circle</span>
      </div>
    </div>
  );
}

function RegisterView({ onLogin, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div style={s.card}>
      <div className="mgw-auth-card-title" style={s.cardTitle}>Join the Circle</div>
      <div style={s.cardSub}>Create your private membership account</div>

      {[
        { label: 'Full name', key: 'name', type: 'text', placeholder: 'Your name' },
        { label: 'Email address', key: 'email', type: 'email', placeholder: 'you@example.com' },
        { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
      ].map((field) => (
        <div key={field.key} style={s.formGroup}>
          <label style={s.label}>{field.label}</label>
          <input
            style={s.input}
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.key]}
            onChange={set(field.key)}
          />
        </div>
      ))}

      <Button variant="primary" size="full" onClick={() => onSubmit?.(form)}>
        Create Account
      </Button>

      <div style={s.footer}>
        Already a member?{' '}
        <span style={s.footerLink} onClick={onLogin}>Sign in</span>
      </div>
    </div>
  );
}

function ForgotView({ onBack, onSubmit }) {
  const [email, setEmail] = useState('');

  return (
    <div style={s.card}>
      <div className="mgw-auth-card-title" style={s.cardTitle}>Reset Password</div>
      <div style={s.cardSub}>Enter your email and we'll send a reset link.</div>

      <div style={s.formGroup}>
        <label style={s.label}>Email address</label>
        <input
          style={s.input}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button variant="primary" size="full" onClick={() => onSubmit?.(email)}>
        Send Reset Link
      </Button>

      <div style={s.backLink} onClick={onBack}>← Back to Sign In</div>
    </div>
  );
}

export default function AuthPage({
  initialView = 'login',
  onLogin,
  onRegister,
  onForgotPassword,
}) {
  const [view, setView] = useState(initialView);

  return (
    <div className="mgw-auth-wrapper" style={s.wrapper}>
      <div style={s.orb1} />
      <div style={s.orb2} />

      <div className="mgw-auth-card-wrap">
        {/* Logo */}
        <div className="mgw-auth-logo" style={s.logoArea}>
          <div style={s.logoMark}><HexLogo /></div>
          <div style={s.logoText}>MGW</div>
          <div style={s.logoSub}>Mavin Grandpa Worldwide</div>
        </div>

        {/* Card */}
        {view === 'login' && (
          <LoginView
            onForgotPassword={() => setView('forgot')}
            onRegister={() => setView('register')}
            onSubmit={onLogin}
          />
        )}
        {view === 'register' && (
          <RegisterView
            onLogin={() => setView('login')}
            onSubmit={onRegister}
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
