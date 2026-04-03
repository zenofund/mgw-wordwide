import React, { useState, useRef, useEffect } from 'react';

const GOLD   = '#C9A227';
const PURPLE = '#6A38C2';
const BLUE   = '#00B3FF';

const s = {
  header: { padding: '22px 20px 16px' },
  title: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 500, marginBottom: 4 },
  subtitle: { fontSize: 11, color: '#999' },
  filters: { display: 'flex', gap: 8, padding: '14px 20px', overflowX: 'auto', scrollbarWidth: 'none' },
  filterPill: { flexShrink: 0, fontSize: 10, letterSpacing: '0.08em', padding: '6px 14px', borderRadius: 20, border: '0.5px solid rgba(201,162,39,0.18)', color: '#999', cursor: 'pointer', background: 'transparent', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' },
  filterPillActive: { background: GOLD, color: '#0A0A0A', borderColor: GOLD },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '16px 20px' },
  card: { background: '#141414', border: '0.5px solid rgba(201,162,39,0.18)', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' },
  thumb: { width: '100%', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  thumbBg: { position: 'absolute', inset: 0 },
  playIcon: { position: 'relative', zIndex: 1 },
  lockOverlay: { position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 2 },
  cardInfo: { padding: '10px 12px 12px' },
  typePill: { display: 'inline-flex', alignItems: 'center', fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 7px', borderRadius: 12, marginBottom: 6 },
  cardTitle: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, fontWeight: 500, lineHeight: 1.3, marginBottom: 4 },
  cardDur: { fontSize: 10, color: '#999' },
};

const thumbBgs = {
  1: 'linear-gradient(135deg, #1a0d38 0%, #0d0820 100%)',
  2: 'linear-gradient(135deg, #061520 0%, #0a0a0a 100%)',
  3: 'linear-gradient(135deg, #1a1008 0%, #0a0a0a 100%)',
  4: 'linear-gradient(135deg, #0d1a10 0%, #0a0a0a 100%)',
};

const pillStyles = {
  video: { background: 'rgba(106,56,194,0.2)', color: '#a57df5', border: '0.5px solid rgba(106,56,194,0.3)' },
  audio: { background: 'rgba(0,179,255,0.15)', color: '#5dcfff', border: '0.5px solid rgba(0,179,255,0.3)' },
  pdf:   { background: 'rgba(201,162,39,0.15)', color: GOLD, border: '0.5px solid rgba(201,162,39,0.3)' },
};

const TIER_LEVEL = { free: 0, standard: 1, premium: 2 };

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(201,162,39,0.85)">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const LockIcon = ({ size = 22, color = GOLD }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const FILTERS = ['All', 'Video', 'Audio', 'PDF'];

const TIER_BADGE = {
  free:     { label: 'Free',     color: '#555'    },
  standard: { label: 'Circle',   color: PURPLE    },
  premium:  { label: 'Premium',  color: GOLD      },
};

const DEFAULT_CONTENT = [
  { id: 1, type: 'video', title: 'Creative Brief Masterclass',    duration: '48 min',  tier: 'free',     bg: 1, description: 'A deep dive into the fundamentals of creative briefing — how to communicate vision, align teams, and unlock great work.' },
  { id: 2, type: 'audio', title: 'Conversations Vol. 3',          duration: '1h 12m',  tier: 'premium',  bg: 2, description: 'Industry candid conversations with top creatives across Africa. Unfiltered, unscripted, and deeply insightful.' },
  { id: 3, type: 'video', title: 'The Brand Lens — Part 2',       duration: '1h 20m',  tier: 'free',     bg: 3, description: 'Continuing the exploration of brand perception, identity architecture, and the language of visual culture.' },
  { id: 4, type: 'pdf',   title: 'Brand Strategy Framework',      duration: '62 pages',tier: 'premium',  bg: 4, description: 'The complete MGW Brand Strategy Framework — a proprietary methodology for building enduring creative brands.' },
  { id: 5, type: 'video', title: 'Founder Mindset Intensive',     duration: '55 min',  tier: 'free',     bg: 1, description: 'The mental models, habits, and frameworks that define how visionary founders think, decide, and build.' },
  { id: 6, type: 'audio', title: 'Industry Conversations Vol. 4', duration: '1h 5m',   tier: 'standard', bg: 2, description: 'Conversations with founders, creative directors, and strategists shaping the African creative economy.' },
  { id: 7, type: 'pdf',   title: 'Creative Direction Handbook',   duration: '48 pages',tier: 'standard', bg: 3, description: 'A comprehensive reference for creative directors — from client management to art direction principles.' },
  { id: 8, type: 'video', title: 'Brand Positioning Secrets',     duration: '1h 10m',  tier: 'free',     bg: 4, description: 'Unpacking how the world\'s most iconic brands carved out inimitable positions in the minds of their audiences.' },
];

function formatTime(secs) {
  if (isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function VideoPlayer({ item }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef(null);
  const hideTimer = useRef(null);

  const thumbBg = thumbBgs[item.bg] || thumbBgs[1];

  const resetHideTimer = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  useEffect(() => { return () => clearTimeout(hideTimer.current); }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) { setPlaying(p => !p); return; }
    if (playing) { v.pause(); } else { v.play().catch(() => {}); }
    setPlaying(p => !p);
    resetHideTimer();
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v) setCurrentTime(v.currentTime);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const t = pct * (duration || 0);
    setCurrentTime(t);
    if (v) v.currentTime = t;
    resetHideTimer();
  };

  const handleVolume = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setMuted(vol === 0);
    if (videoRef.current) { videoRef.current.volume = vol; videoRef.current.muted = vol === 0; }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  const pct = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => { if (playing) setShowControls(false); }}
      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: 8, overflow: 'hidden', cursor: showControls || !playing ? 'default' : 'none' }}
    >
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => { setPlaying(false); setShowControls(true); }}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        playsInline
      />

      {/* Poster / background when no video loaded */}
      <div style={{ position: 'absolute', inset: 0, background: thumbBg, opacity: playing && duration ? 0 : 1, transition: 'opacity 0.4s', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ opacity: 0.15, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD }}>Preview</div>
        </div>
      </div>

      {/* Gradient overlay for controls */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 40%)', pointerEvents: 'none', opacity: showControls ? 1 : 0, transition: 'opacity 0.3s' }} />

      {/* Centre play/pause tap area */}
      <div onClick={togglePlay} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', border: '0.5px solid rgba(201,162,39,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (!playing || showControls) ? 1 : 0, transition: 'opacity 0.3s', backdropFilter: 'blur(6px)' }}>
          {playing
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill={GOLD}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill={GOLD}><polygon points="5,3 19,12 5,21"/></svg>
          }
        </div>
      </div>

      {/* Controls bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 14px', opacity: showControls ? 1 : 0, transition: 'opacity 0.3s' }}>
        {/* Progress bar */}
        <div
          onClick={handleSeek}
          style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, cursor: 'pointer', marginBottom: 12, position: 'relative' }}
        >
          <div style={{ height: '100%', width: `${pct}%`, background: GOLD, borderRadius: 2, transition: 'width 0.1s linear' }} />
          <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', width: 12, height: 12, borderRadius: '50%', background: GOLD, boxShadow: '0 0 6px rgba(201,162,39,0.6)' }} />
        </div>

        {/* Buttons row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={togglePlay} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#fff', display: 'flex', alignItems: 'center' }}>
            {playing
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>
            }
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              {muted || volume === 0
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
              }
            </button>
            <input
              type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume}
              onChange={handleVolume}
              style={{ width: 60, accentColor: GOLD, cursor: 'pointer' }}
            />
          </div>

          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Sans', sans-serif", flex: 1 }}>
            {formatTime(currentTime)} / {duration ? formatTime(duration) : item.duration}
          </div>

          <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              {fullscreen
                ? <><polyline points="8,3 3,3 3,8"/><polyline points="21,8 21,3 16,3"/><polyline points="3,16 3,21 8,21"/><polyline points="16,21 21,21 21,16"/></>
                : <><polyline points="15,3 21,3 21,9"/><polyline points="9,21 3,21 3,15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></>
              }
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function AudioPlayer({ item }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const thumbBg = thumbBgs[item.bg] || thumbBgs[2];

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) { setPlaying(p => !p); return; }
    if (playing) { a.pause(); } else { a.play().catch(() => {}); }
    setPlaying(p => !p);
  };

  const handleSeek = (e) => {
    const a = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const t = pct * (duration || 0);
    setCurrentTime(t);
    if (a) a.currentTime = t;
  };

  const handleVolume = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const pct = duration ? (currentTime / duration) * 100 : 0;

  const bars = Array.from({ length: 40 }, (_, i) => {
    const heights = [30, 55, 40, 70, 45, 80, 35, 65, 50, 75, 42, 60, 85, 48, 58, 72, 38, 62, 90, 44, 68, 52, 78, 36, 56, 82, 46, 66, 40, 74, 54, 84, 32, 64, 88, 42, 58, 70, 48, 62];
    return heights[i % heights.length];
  });

  return (
    <div style={{ background: '#0d0d0d', borderRadius: 12, overflow: 'hidden', border: '0.5px solid rgba(201,162,39,0.18)' }}>
      <audio
        ref={audioRef}
        onTimeUpdate={() => { if (audioRef.current) setCurrentTime(audioRef.current.currentTime); }}
        onLoadedMetadata={() => { if (audioRef.current) setDuration(audioRef.current.duration); }}
        onEnded={() => setPlaying(false)}
      />

      {/* Album art area */}
      <div style={{ width: '100%', aspectRatio: '16/7', background: thumbBg, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,179,255,0.15) 0%, transparent 70%)' }} />

        {/* Waveform visualization */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 80, padding: '0 20px', position: 'relative', zIndex: 1 }}>
          {bars.map((h, i) => {
            const barPct = (i / bars.length) * 100;
            const isPast = barPct < pct;
            return (
              <div
                key={i}
                style={{
                  width: 3,
                  height: `${h}%`,
                  borderRadius: 2,
                  background: isPast ? BLUE : 'rgba(255,255,255,0.15)',
                  transition: 'background 0.1s',
                  animation: playing ? `mgw-wave-${i % 5} ${0.8 + (i % 4) * 0.2}s ease-in-out infinite alternate` : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Headphones icon for audio */}
        <div style={{ position: 'absolute', top: 16, right: 20, opacity: 0.3 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.5">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: '20px 24px' }}>
        {/* Seek bar */}
        <div
          onClick={handleSeek}
          style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, cursor: 'pointer', marginBottom: 18, position: 'relative' }}
        >
          <div style={{ height: '100%', width: `${pct}%`, background: BLUE, borderRadius: 2 }} />
          <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', width: 12, height: 12, borderRadius: '50%', background: BLUE, boxShadow: '0 0 6px rgba(0,179,255,0.6)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Rewind */}
          <button onClick={() => { const a = audioRef.current; if (a) a.currentTime = Math.max(0, a.currentTime - 15); setCurrentTime(c => Math.max(0, c - 15)); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/><text x="7" y="16" fontSize="6" fill="#999" stroke="none">15</text></svg>
          </button>

          {/* Play/Pause */}
          <button onClick={togglePlay} style={{ width: 52, height: 52, borderRadius: '50%', background: BLUE, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,179,255,0.35)', flexShrink: 0 }}>
            {playing
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A0A0A"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A0A0A"><polygon points="6,3 20,12 6,21"/></svg>
            }
          </button>

          {/* Forward */}
          <button onClick={() => { const a = audioRef.current; if (a) a.currentTime = Math.min(duration, a.currentTime + 15); setCurrentTime(c => Math.min(duration, c + 15)); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 1 1-.49-3.5"/></svg>
          </button>

          <div style={{ flex: 1 }} />

          {/* Time */}
          <div style={{ fontSize: 11, color: '#777', fontFamily: "'DM Sans', sans-serif" }}>
            {formatTime(currentTime)} / {duration ? formatTime(duration) : item.duration}
          </div>

          {/* Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolume} style={{ width: 64, accentColor: BLUE, cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PdfViewer({ item }) {
  const lines = [
    { w: '60%', h: 10, style: { marginBottom: 18, background: 'rgba(201,162,39,0.5)' } },
    { w: '100%', h: 6 }, { w: '92%', h: 6 }, { w: '97%', h: 6 }, { w: '85%', h: 6 }, { w: '100%', h: 6 }, { w: '78%', h: 6 },
    { w: '0%', h: 16, style: { background: 'transparent' } },
    { w: '40%', h: 8, style: { background: 'rgba(201,162,39,0.3)' } },
    { w: '0%', h: 8, style: { background: 'transparent' } },
    { w: '100%', h: 5 }, { w: '90%', h: 5 }, { w: '95%', h: 5 }, { w: '88%', h: 5 }, { w: '100%', h: 5 }, { w: '72%', h: 5 },
    { w: '0%', h: 12, style: { background: 'transparent' } },
    { w: '100%', h: 5 }, { w: '83%', h: 5 }, { w: '96%', h: 5 }, { w: '100%', h: 5 }, { w: '68%', h: 5 },
  ];

  return (
    <div style={{ background: '#111', borderRadius: 12, overflow: 'hidden', border: '0.5px solid rgba(201,162,39,0.18)' }}>
      {/* PDF toolbar */}
      <div style={{ background: '#1a1a1a', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
          <span style={{ fontSize: 11, color: '#888', fontFamily: "'DM Sans', sans-serif" }}>Page 1 / {parseInt(item.duration) || 1}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: 'rgba(201,162,39,0.1)', border: '0.5px solid rgba(201,162,39,0.3)', color: GOLD, borderRadius: 5, padding: '5px 14px', fontSize: 10, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Download
          </button>
        </div>
      </div>

      {/* Document preview */}
      <div style={{ padding: '32px 40px', maxHeight: 480, overflowY: 'auto', background: '#141414' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', background: '#1a1a1a', borderRadius: 4, padding: '48px 52px', boxShadow: '0 4px 40px rgba(0,0,0,0.4)', border: '0.5px solid rgba(255,255,255,0.05)' }}>
          {/* Header logo area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, paddingBottom: 16, borderBottom: '0.5px solid rgba(201,162,39,0.2)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(201,162,39,0.15)', border: '0.5px solid rgba(201,162,39,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: GOLD, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>M</div>
            <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>MGW</div>
            <div style={{ marginLeft: 'auto', fontSize: 9, color: '#555', fontFamily: "'DM Sans', sans-serif" }}>Confidential</div>
          </div>
          {lines.map((l, i) => (
            <div
              key={i}
              style={{ width: l.w, height: l.h, background: l.style?.background || 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: l.style?.marginBottom || (l.h > 8 ? 0 : 8), ...l.style }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function VaultItemDetail({ item, onBack }) {
  const BORDER = 'rgba(201,162,39,0.18)';
  const pill = pillStyles[item.type] || pillStyles.video;

  return (
    <div className="mgw-vault-detail-outer">
      {/* Back nav */}
      <div style={{ padding: '18px 20px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: `0.5px solid ${BORDER}`, color: '#999', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
          Back to Vault
        </button>
      </div>

      <div className="mgw-vault-detail-layout">
        {/* Player column */}
        <div className="mgw-vault-detail-player">
          {item.type === 'video' && <VideoPlayer item={item} />}
          {item.type === 'audio' && <AudioPlayer item={item} />}
          {item.type === 'pdf'   && <PdfViewer item={item} />}
        </div>

        {/* Info column */}
        <div className="mgw-vault-detail-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ ...s.typePill, ...pill, fontSize: 9 }}>{item.type.toUpperCase()}</div>
            <div style={{ fontSize: 10, color: '#666' }}>{item.duration}</div>
          </div>

          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, lineHeight: 1.25, marginBottom: 12, color: '#EAEAEA' }}>
            {item.title}
          </div>

          <div style={{ fontSize: 12, color: '#888', lineHeight: 1.75, marginBottom: 24 }}>
            {item.description || 'Exclusive content from the MGW Knowledge Vault.'}
          </div>

          <div style={{ height: '0.5px', background: BORDER, marginBottom: 24 }} />

          <div style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: 14 }}>Content Details</div>
          {[
            { label: 'Type', val: item.type.charAt(0).toUpperCase() + item.type.slice(1) },
            { label: 'Length', val: item.duration },
            { label: 'Access', val: TIER_BADGE[item.tier]?.label || 'Free' },
            { label: 'Series', val: 'MGW Vault' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.04)', fontSize: 12 }}>
              <span style={{ color: '#666' }}>{row.label}</span>
              <span style={{ color: '#EAEAEA', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13 }}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VaultPage({ content = DEFAULT_CONTENT, userTier = 'free' }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const userLevel = TIER_LEVEL[userTier] ?? 0;

  const filtered = activeFilter === 'All'
    ? content
    : content.filter(c => c.type.toLowerCase() === activeFilter.toLowerCase());

  const isLocked = (item) => (TIER_LEVEL[item.tier] ?? 0) > userLevel;

  const tierBadge = TIER_BADGE[userTier];

  if (selectedItem) {
    return <VaultItemDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
  }

  return (
    <div>
      <div className="mgw-vault-header" style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div className="mgw-vault-title-text" style={s.title}>Knowledge Vault</div>
            <div className="mgw-vault-subtitle" style={s.subtitle}>Exclusive content from Mavin Grandpa Worldwide</div>
          </div>
          {tierBadge && (
            <div style={{ background: `${tierBadge.color}18`, border: `0.5px solid ${tierBadge.color}50`, borderRadius: 20, padding: '5px 14px', fontSize: 10, color: tierBadge.color, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }}>
              {tierBadge.label} Access
            </div>
          )}
        </div>
      </div>

      <div className="mgw-vault-filters" style={s.filters}>
        {FILTERS.map(f => (
          <button key={f} style={{ ...s.filterPill, ...(activeFilter === f ? s.filterPillActive : {}) }} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="mgw-vault-page-grid" style={s.grid}>
        {filtered.map(item => {
          const locked = isLocked(item);
          const badge = TIER_BADGE[item.tier];
          return (
            <div
              key={item.id}
              style={{ ...s.card, opacity: locked ? 0.85 : 1 }}
              onClick={() => !locked && setSelectedItem(item)}
            >
              <div style={s.thumb}>
                <div style={{ ...s.thumbBg, background: thumbBgs[item.bg] || thumbBgs[1] }} />
                {!locked && <div style={s.playIcon}><PlayIcon /></div>}
                {locked && (
                  <div style={s.lockOverlay}>
                    <LockIcon />
                    {badge && (
                      <div style={{ fontSize: 9, color: badge.color, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, background: `${badge.color}18`, border: `0.5px solid ${badge.color}40`, borderRadius: 10, padding: '2px 8px' }}>
                        {badge.label}+
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div style={s.cardInfo}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div style={{ ...s.typePill, ...pillStyles[item.type] }}>{item.type}</div>
                  {locked && badge && (
                    <div style={{ fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 7px', borderRadius: 12, background: `${badge.color}15`, color: badge.color, border: `0.5px solid ${badge.color}30` }}>
                      {badge.label}
                    </div>
                  )}
                </div>
                <div className="mgw-card-title" style={{ ...s.cardTitle, color: locked ? '#666' : '#EAEAEA' }}>{item.title}</div>
                <div className="mgw-card-dur" style={s.cardDur}>{item.duration}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
