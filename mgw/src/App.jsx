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
  { id: 'about',     label: 'MGW' },
  { id: 'consult',   label: 'Consult' },
  { id: 'booking',   label: 'Booking' },
  { id: 'vault',     label: 'Vault' },
  { id: 'dashboard', label: 'Dashboard' },
];

const GATED = new Set(['dashboard', 'vault']);

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

const tabActiveStyle = { color: '#C9A227', borderBottomColor: '#C9A227' };

export default function App() {
  const [activePage, setActivePage]   = useState('landing');
  const [isAdmin, setIsAdmin]         = useState(false);
  const [user, setUser]               = useState(null);
  const [postLoginDest, setPostLoginDest] = useState(null);

  const [plans, setPlans] = useState([
    { name: 'Open Access',    price: '$0',   billing: 'Free',      tier: 'free',     features: ['Community access', 'Monthly digest', 'Limited vault'],                                                       color: '#555',    members: 472  },
    { name: 'Creative Circle', price: '$49',  billing: 'per month', tier: 'standard', features: ['Full vault access', '2 group sessions/mo', 'Priority support', 'Community access'],                          color: '#6A38C2', members: 1104 },
    { name: 'Inner Circle',   price: '$149', billing: 'per month', tier: 'premium',  features: ['All Creative Circle perks', '4 sessions/mo (1-on-1)', 'Direct messaging', 'Exclusive content', 'Event invitations'], color: '#C9A227', members: 842  },
  ]);

  const [availableDays, setAvailableDays] = useState(
    new Set([7, 8, 9, 10, 13, 14, 15, 17, 21, 22, 23, 24, 27, 28, 29, 30])
  );
  const [timeSlots, setTimeSlots] = useState([
    { time: '9:00 AM',  booked: true  },
    { time: '10:00 AM', booked: false },
    { time: '11:30 AM', booked: false },
    { time: '1:00 PM',  booked: true  },
    { time: '3:00 PM',  booked: false },
    { time: '4:30 PM',  booked: false },
  ]);

  const navigate = (page) => {
    if (GATED.has(page) && !user) {
      setPostLoginDest(page);
      setActivePage('auth');
    } else {
      setActivePage(page);
    }
  };

  const handleLogin = (creds) => {
    if (creds.email === 'admin@mgw.com') {
      setIsAdmin(true);
      return;
    }
    const loggedInUser = { name: 'Member', email: creds.email, plan: null, tier: 'free' };
    setUser(loggedInUser);
    setActivePage(postLoginDest || 'dashboard');
    setPostLoginDest(null);
  };

  const handleRegister = (data) => {
    const tier = data.plan?.tier || 'free';
    const loggedInUser = { name: data.name, email: data.email, plan: data.plan, tier };
    setUser(loggedInUser);
    setActivePage(postLoginDest || 'dashboard');
    setPostLoginDest(null);
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('landing');
  };

  if (isAdmin) {
    return (
      <AdminPage
        onExit={() => { setIsAdmin(false); setActivePage('landing'); }}
        availableDays={availableDays}
        setAvailableDays={setAvailableDays}
        timeSlots={timeSlots}
        setTimeSlots={setTimeSlots}
        plans={plans}
        setPlans={setPlans}
      />
    );
  }

  const authTab = user
    ? { id: 'profile', label: user.name?.split(' ')[0] || 'Me' }
    : { id: 'auth', label: 'Login' };

  const allTabs = [...TABS, authTab];

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar
        activePage={activePage}
        onNavigate={navigate}
        onLogoClick={() => setActivePage('landing')}
        tabs={TABS}
        user={user}
        onSearchClick={() => console.log('search')}
        onNotificationsClick={() => console.log('notifications')}
        onProfileClick={() => user ? setActivePage('profile') : setActivePage('auth')}
      />

      <div className="mgw-tabbar" style={tabBarStyles}>
        {allTabs.map((tab) => (
          <button
            key={tab.id}
            style={{ ...tabStyle, ...(activePage === tab.id ? tabActiveStyle : {}) }}
            onClick={() => tab.id === 'profile' ? (user ? setActivePage('profile') : setActivePage('auth')) : navigate(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activePage === 'landing' && (
        <LandingPage
          onJoinMembership={() => navigate('auth')}
          onBookSession={() => navigate('booking')}
          onBecomeMember={() => navigate('auth')}
        />
      )}

      {activePage === 'about' && <AboutPage />}

      {activePage === 'dashboard' && user && (
        <DashboardPage
          user={user}
          onViewAllSessions={() => navigate('booking')}
          onOpenVault={() => navigate('vault')}
        />
      )}

      {activePage === 'vault' && user && (
        <VaultPage
          userTier={user.tier}
          onItemClick={(item) => console.log('Open:', item.title)}
        />
      )}

      {activePage === 'booking' && (
        <BookingPage
          availableDays={availableDays}
          timeSlots={timeSlots}
          onConfirm={(data) => console.log('Booking confirmed:', data)}
        />
      )}

      {activePage === 'consult' && <ConsultancyPage />}

      {activePage === 'auth' && !user && (
        <AuthPage
          initialView="login"
          plans={plans}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onForgotPassword={(email) => console.log('Reset email sent to:', email)}
        />
      )}

      {activePage === 'profile' && user && (
        <ProfilePage user={user} onLogout={handleLogout} onNavigate={navigate} />
      )}
    </div>
  );
}

function ProfilePage({ user, onLogout, onNavigate }) {
  const GOLD = '#C9A227';
  const tierColors = { free: '#555', standard: '#6A38C2', premium: '#C9A227' };
  const tierColor = tierColors[user?.tier] || '#555';

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: `${GOLD}20`, border: `1px solid ${GOLD}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: GOLD, fontWeight: 600, marginBottom: 16 }}>
        {user.name?.charAt(0)?.toUpperCase() || 'M'}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{user.name}</div>
      <div style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>{user.email}</div>

      {user.plan && (
        <div style={{ background: `${tierColor}12`, border: `0.5px solid ${tierColor}40`, borderRadius: 20, padding: '6px 16px', fontSize: 11, color: tierColor, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 32 }}>
          {user.plan.name}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 320 }}>
        <button onClick={() => onNavigate('dashboard')} style={{ background: 'rgba(201,162,39,0.08)', border: '0.5px solid rgba(201,162,39,0.25)', color: GOLD, borderRadius: 8, padding: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
          Go to Dashboard
        </button>
        <button onClick={() => onNavigate('vault')} style={{ background: 'rgba(201,162,39,0.08)', border: '0.5px solid rgba(201,162,39,0.25)', color: GOLD, borderRadius: 8, padding: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
          Knowledge Vault
        </button>
        <button onClick={onLogout} style={{ background: 'transparent', border: '0.5px solid rgba(220,60,60,0.25)', color: '#c55', borderRadius: 8, padding: '13px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginTop: 8 }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
