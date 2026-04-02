import React, { useState } from 'react';
import './styles/globals.css';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import VaultPage from './pages/VaultPage';
import BookingPage from './pages/BookingPage';
import AuthPage from './pages/AuthPage';

const TABS = [
  { id: 'landing', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'vault', label: 'Vault' },
  { id: 'booking', label: 'Booking' },
  { id: 'auth', label: 'Login' },
];

const tabBarStyles = {
  padding: '0 20px',
  borderBottom: '0.5px solid rgba(201,162,39,0.18)',
  background: '#0A0A0A',
  overflowX: 'auto',
  scrollbarWidth: 'none',
};

const tabStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 11,
  fontWeight: 400,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#999',
  padding: '12px 14px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'all 0.2s',
  background: 'none',
  border: 'none',
  borderBottomWidth: 1.5,
  borderBottomStyle: 'solid',
  borderBottomColor: 'transparent',
  flexShrink: 0,
};

const tabActiveStyle = {
  color: '#C9A227',
  borderBottomColor: '#C9A227',
};

export default function App() {
  const [activePage, setActivePage] = useState('landing');

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        tabs={TABS}
        onSearchClick={() => console.log('search')}
        onNotificationsClick={() => console.log('notifications')}
        onProfileClick={() => setActivePage('auth')}
      />

      {/* Mobile-only Tab Bar */}
      <div className="mgw-tabbar" style={tabBarStyles}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            style={{ ...tabStyle, ...(activePage === tab.id ? tabActiveStyle : {}) }}
            onClick={() => setActivePage(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pages */}
      {activePage === 'landing' && (
        <LandingPage
          onJoinMembership={() => setActivePage('auth')}
          onBookSession={() => setActivePage('booking')}
          onBecomeMember={() => setActivePage('auth')}
        />
      )}

      {activePage === 'dashboard' && (
        <DashboardPage
          onViewAllSessions={() => setActivePage('booking')}
          onOpenVault={() => setActivePage('vault')}
        />
      )}

      {activePage === 'vault' && (
        <VaultPage
          onItemClick={(item) => console.log('Open:', item.title)}
        />
      )}

      {activePage === 'booking' && (
        <BookingPage
          onConfirm={(data) => {
            console.log('Booking confirmed:', data);
          }}
        />
      )}

      {activePage === 'auth' && (
        <AuthPage
          initialView="login"
          onLogin={(creds) => {
            console.log('Login:', creds);
            setActivePage('dashboard');
          }}
          onRegister={(data) => {
            console.log('Register:', data);
            setActivePage('dashboard');
          }}
          onForgotPassword={(email) => console.log('Reset email sent to:', email)}
        />
      )}
    </div>
  );
}
