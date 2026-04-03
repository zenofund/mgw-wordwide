import React from 'react';

export default function Footer({ alwaysShow = false }) {
  const year = new Date().getFullYear();

  return (
    <div className={alwaysShow ? 'mgw-footer-bar' : 'mgw-footer-bar mgw-footer-mobile-only'}>
      <span style={{ fontSize: 11, color: '#AAAAAA', letterSpacing: '0.03em' }}>
        © {year} Mavin Grandpa Worldwide. All rights reserved.
      </span>
    </div>
  );
}
