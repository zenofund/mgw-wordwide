import React, { useState } from 'react';
import './styles/globals.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import VaultPage from './pages/VaultPage';
import BookingPage from './pages/BookingPage';
import ConsultancyPage from './pages/ConsultancyPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';

const TABS = [
  { id: 'about',   label: 'MGW' },
  { id: 'consult', label: 'Consult' },
  { id: 'booking', label: 'Booking' },
  { id: 'vault',   label: 'Vault' },
];

const GATED = new Set(['dashboard', 'vault']);

const INITIAL_VAULT_ITEMS = [
  { id: 1, type: 'video', title: 'Creative Brief Masterclass',    duration: '48 min',   accessPlans: [],                               series: 'Brand Foundations',       seriesOrder: 1, description: 'A deep dive into the fundamentals of creative briefing — how to communicate vision, align teams, and unlock great work.',       bg: 1, status: 'Published', source: 'YouTube', url: '' },
  { id: 2, type: 'audio', title: 'Industry Conversations Vol. 3', duration: '1h 12m',   accessPlans: ['Inner Circle'],                 series: 'Industry Conversations',  seriesOrder: 3, description: 'Industry candid conversations with top creatives across Africa. Unfiltered, unscripted, and deeply insightful.',              bg: 2, status: 'Published', source: 'Spotify', url: '' },
  { id: 3, type: 'video', title: 'The Brand Lens — Part 2',       duration: '1h 20m',   accessPlans: [],                               series: 'Brand Foundations',       seriesOrder: 2, description: 'Continuing the exploration of brand perception, identity architecture, and the language of visual culture.',                  bg: 3, status: 'Published', source: 'YouTube', url: '' },
  { id: 4, type: 'pdf',   title: 'Brand Strategy Framework',      duration: '62 pages', accessPlans: ['Inner Circle'],                 series: '',                        seriesOrder: 0, description: 'The complete MGW Brand Strategy Framework — a proprietary methodology for building enduring creative brands.',                bg: 4, status: 'Published', source: 'Server',  url: '' },
  { id: 5, type: 'video', title: 'Founder Mindset Intensive',     duration: '55 min',   accessPlans: [],                               series: '',                        seriesOrder: 0, description: 'The mental models, habits, and frameworks that define how visionary founders think, decide, and build.',                         bg: 1, status: 'Published', source: 'YouTube', url: '' },
  { id: 6, type: 'audio', title: 'Industry Conversations Vol. 4', duration: '1h 5m',    accessPlans: ['Creative Circle', 'Inner Circle'], series: 'Industry Conversations', seriesOrder: 4, description: 'Conversations with founders, creative directors, and strategists shaping the African creative economy.',                bg: 2, status: 'Published', source: 'Spotify', url: '' },
  { id: 7, type: 'pdf',   title: 'Creative Direction Handbook',   duration: '48 pages', accessPlans: ['Creative Circle', 'Inner Circle'], series: '',                       seriesOrder: 0, description: 'A comprehensive reference for creative directors — from client management to art direction principles.',                  bg: 3, status: 'Published', source: 'Server',  url: '' },
  { id: 8, type: 'video', title: 'Brand Positioning Secrets',     duration: '1h 10m',   accessPlans: [],                               series: 'Brand Foundations',       seriesOrder: 3, description: "Unpacking how the world's most iconic brands carved out inimitable positions in the minds of their audiences.",             bg: 4, status: 'Published', source: 'YouTube', url: '' },
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
  padding: '8px 10px',
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
    { name: 'Open Access',     price: '$0',   billing: 'Free',      tier: 'free',     features: ['Community access', 'Monthly digest', 'Limited vault'],                                                       color: '#555',    members: 472  },
    { name: 'Creative Circle', price: '$49',  billing: 'per month', tier: 'standard', features: ['Full vault access', '2 group sessions/mo', 'Priority support', 'Community access'],                          color: '#6A38C2', members: 1104 },
    { name: 'Inner Circle',    price: '$149', billing: 'per month', tier: 'premium',  features: ['All Creative Circle perks', '4 sessions/mo (1-on-1)', 'Direct messaging', 'Exclusive content', 'Event invitations'], color: '#C9A227', members: 842  },
  ]);

  const [vaultItems, setVaultItems] = useState(INITIAL_VAULT_ITEMS);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Brand Architecture Masterclass — This Friday', text: 'New masterclass dropping this Friday — <strong>Brand Architecture for the Digital Era</strong>.', date: 'Posted 2 days ago', published: true },
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

  const [bookings, setBookings] = useState([]);

  const [authInitialView, setAuthInitialView] = useState('login');

  const navigate = (page, opts = {}) => {
    if (GATED.has(page) && !user) {
      setPostLoginDest(page);
      setAuthInitialView('login');
      setActivePage('auth');
    } else {
      if (page === 'auth' && opts.view) setAuthInitialView(opts.view);
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

  const handleBookingConfirm = (data) => {
    const booking = {
      id: `BK-${Date.now()}`,
      ...data,
      userName: user?.name || data.email || 'Guest',
      status: 'Pending',
      submittedAt: new Date().toISOString(),
      zoom: null,
    };
    setBookings(prev => [booking, ...prev]);
    if (user) setActivePage('dashboard');
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
        vaultItems={vaultItems}
        setVaultItems={setVaultItems}
        announcements={announcements}
        setAnnouncements={setAnnouncements}
        bookings={bookings}
        setBookings={setBookings}
      />
    );
  }

  const authTab = user
    ? { id: 'profile', label: user.name?.split(' ')[0] || 'Me' }
    : { id: 'auth', label: 'Login' };

  const allTabs = [...TABS, authTab];

  const publishedVault = vaultItems.filter(v => v.status === 'Published');
  const accessibleVault = publishedVault.filter(v =>
    !v.accessPlans || v.accessPlans.length === 0 || (user?.plan?.name && v.accessPlans.includes(user.plan.name))
  );

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

      <div style={{ flex: 1 }}>
        {activePage === 'landing' && (
          <LandingPage
            onJoinMembership={() => navigate('auth', { view: 'plans' })}
            onBookSession={() => navigate('booking')}
            onBecomeMember={() => navigate('auth', { view: 'plans' })}
            onOpenVault={() => navigate('vault')}
          />
        )}

        {activePage === 'about' && <AboutPage />}

        {activePage === 'dashboard' && user && (
          <DashboardPage
            user={user}
            vaultItems={accessibleVault}
            onViewAllSessions={() => navigate('booking')}
            onOpenVault={() => navigate('vault')}
            announcement={announcements.filter(a => a.published)[0] || null}
          />
        )}

        {activePage === 'vault' && user && (
          <VaultPage
            allItems={publishedVault}
            userTier={user.tier}
            userPlanName={user.plan?.name}
            plans={plans}
            onNavigate={navigate}
          />
        )}

        {activePage === 'booking' && (
          <BookingPage
            availableDays={availableDays}
            timeSlots={timeSlots}
            user={user}
            onConfirm={handleBookingConfirm}
          />
        )}

        {activePage === 'consult' && <ConsultancyPage />}

        {activePage === 'auth' && !user && (
          <AuthPage
            key={authInitialView}
            initialView={authInitialView}
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

      <Footer alwaysShow={user && (activePage === 'dashboard' || activePage === 'vault')} />
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
