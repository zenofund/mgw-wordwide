import React, { useState } from 'react';
import './styles/globals.css';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import VaultPage from './pages/VaultPage';
import BookingPage from './pages/BookingPage';
import ConsultancyPage from './pages/ConsultancyPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';

const TABS = [
  { id: 'about', label: 'MGW' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'vault', label: 'Vault' },
  { id: 'booking', label: 'Booking' },
  { id: 'consult', label: 'Consult' },
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
  const [isAdmin, setIsAdmin] = useState(false);

  const [availableDays, setAvailableDays] = useState(
    new Set([7, 8, 9, 10, 13, 14, 15, 17, 21, 22, 23, 24, 27, 28, 29, 30])
  );
  const [timeSlots, setTimeSlots] = useState([
    { time: '9:00 AM', booked: true },
    { time: '10:00 AM', booked: false },
    { time: '11:30 AM', booked: false },
    { time: '1:00 PM', booked: true },
    { time: '3:00 PM', booked: false },
    { time: '4:30 PM', booked: false },
  ]);

  if (isAdmin) {
    return (
      <AdminPage
        onExit={() => { setIsAdmin(false); setActivePage('landing'); }}
        availableDays={availableDays}
        setAvailableDays={setAvailableDays}
        timeSlots={timeSlots}
        setTimeSlots={setTimeSlots}
      />
    );
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogoClick={() => setActivePage('landing')}
        tabs={TABS}
        onSearchClick={() => console.log('search')}
        onNotificationsClick={() => console.log('notifications')}
        onProfileClick={() => setActivePage('auth')}
      />

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

      {activePage === 'landing' && (
        <LandingPage
          onJoinMembership={() => setActivePage('auth')}
          onBookSession={() => setActivePage('booking')}
          onBecomeMember={() => setActivePage('auth')}
        />
      )}

      {activePage === 'about' && <AboutPage />}

      {activePage === 'dashboard' && (
        <DashboardPage
          onViewAllSessions={() => setActivePage('booking')}
          onOpenVault={() => setActivePage('vault')}
        />
      )}

      {activePage === 'vault' && (
        <VaultPage onItemClick={(item) => console.log('Open:', item.title)} />
      )}

      {activePage === 'booking' && (
        <BookingPage
          availableDays={availableDays}
          timeSlots={timeSlots}
          onConfirm={(data) => console.log('Booking confirmed:', data)}
        />
      )}

      {activePage === 'consult' && <ConsultancyPage />}

      {activePage === 'auth' && (
        <AuthPage
          initialView="login"
          onLogin={(creds) => {
            if (creds.email === 'admin@mgw.com') {
              setIsAdmin(true);
            } else {
              setActivePage('dashboard');
            }
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
