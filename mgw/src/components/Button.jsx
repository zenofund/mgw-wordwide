import React from 'react';

const base = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  border: 'none',
  borderRadius: 3,
  padding: '11px 18px',
  cursor: 'pointer',
  transition: 'opacity 0.2s, border-color 0.2s, color 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  width: undefined,
};

const variants = {
  primary: {
    background: '#C9A227',
    color: '#0A0A0A',
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: '#EAEAEA',
    border: '0.5px solid rgba(234,234,234,0.25)',
  },
  danger: {
    background: 'transparent',
    color: '#f87171',
    border: '0.5px solid rgba(248,113,113,0.3)',
  },
};

const sizes = {
  sm: { padding: '8px 14px', fontSize: 10 },
  md: { padding: '11px 18px', fontSize: 11 },
  lg: { padding: '15px 32px', fontSize: 11 },
  full: { padding: '14px 20px', fontSize: 11, width: '100%' },
};

/**
 * Button
 * Props:
 *  - variant: 'primary' | 'ghost' | 'danger'  (default: 'primary')
 *  - size: 'sm' | 'md' | 'lg' | 'full'        (default: 'md')
 *  - onClick: () => void
 *  - disabled: boolean
 *  - children: ReactNode
 *  - style: CSSProperties (overrides)
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const computed = {
    ...base,
    ...variants[variant],
    ...sizes[size],
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style,
  };

  return (
    <button style={computed} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
