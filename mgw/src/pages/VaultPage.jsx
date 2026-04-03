import React, { useState, useRef, useEffect } from 'react';

const GOLD   = '#C9A227';
const PURPLE = '#6A38C2';
const BLUE   = '#00B3FF';

const s = {
  header:          { padding: '22px 0 16px' },
  title:           { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 500, marginBottom: 4 },
  subtitle:        { fontSize: 11, color: '#999' },
  filters:         { display: 'flex', gap: 8, padding: '14px 0', overflowX: 'auto', scrollbarWidth: 'none' },
  filterPill:      { flexShrink: 0, fontSize: 10, letterSpacing: '0.08em', padding: '6px 14px', borderRadius: 20, border: '0.5px solid rgba(201,162,39,0.18)', color: '#999', cursor: 'pointer', background: 'transparent', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' },
  filterPillActive:{ background: GOLD, color: '#0A0A0A', borderColor: GOLD },
  grid:            { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '16px 0' },
  card:            { background: '#141414', border: '0.5px solid rgba(201,162,39,0.18)', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' },
  thumb:           { width: '100%', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  thumbBg:         { position: 'absolute', inset: 0 },
  playIcon:        { position: 'relative', zIndex: 1 },
  lockOverlay:     { position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 2 },
  cardInfo:        { padding: '10px 12px 12px' },
  typePill:        { display: 'inline-flex', alignItems: 'center', fontSize: 7, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 7px', borderRadius: 12, marginBottom: 6 },
  cardTitle:       { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, fontWeight: 500, lineHeight: 1.3, marginBottom: 4 },
  cardDur:         { fontSize: 10, color: '#999' },
};

const thumbBgs = {
  1: 'linear-gradient(135deg, #1a0d38 0%, #0d0820 100%)',
  2: 'linear-gradient(135deg, #061520 0%, #0a0a0a 100%)',
  3: 'linear-gradient(135deg, #1a1008 0%, #0a0a0a 100%)',
  4: 'linear-gradient(135deg, #0d1a10 0%, #0a0a0a 100%)',
};

const pillStyles = {
  video:               { background: 'rgba(106,56,194,0.2)',  color: '#a57df5', border: '0.5px solid rgba(106,56,194,0.3)' },
  audio:               { background: 'rgba(0,179,255,0.15)',  color: '#5dcfff', border: '0.5px solid rgba(0,179,255,0.3)' },
  pdf:                 { background: 'rgba(201,162,39,0.15)', color: GOLD,      border: '0.5px solid rgba(201,162,39,0.3)' },
  masterclass:         { background: 'rgba(106,56,194,0.2)',  color: '#a57df5', border: '0.5px solid rgba(106,56,194,0.3)' },
  'workshop recording':{ background: 'rgba(0,179,255,0.15)', color: '#5dcfff', border: '0.5px solid rgba(0,179,255,0.3)' },
};

const FILTERS = ['All', 'Video', 'Audio', 'PDF'];

const DEFAULT_CONTENT = [
  { id: 1, type: 'video', title: 'Creative Brief Masterclass',    duration: '48 min',   accessPlans: [],                               series: 'Brand Foundations',      seriesOrder: 1, description: 'A deep dive into the fundamentals of creative briefing — how to communicate vision, align teams, and unlock great work.',  bg: 1 },
  { id: 2, type: 'audio', title: 'Conversations Vol. 3',          duration: '1h 12m',   accessPlans: ['Inner Circle'],                 series: 'Industry Conversations', seriesOrder: 3, description: 'Industry candid conversations with top creatives across Africa. Unfiltered, unscripted, and deeply insightful.',         bg: 2 },
  { id: 3, type: 'video', title: 'The Brand Lens — Part 2',       duration: '1h 20m',   accessPlans: [],                               series: 'Brand Foundations',      seriesOrder: 2, description: 'Continuing the exploration of brand perception, identity architecture, and the language of visual culture.',             bg: 3 },
  { id: 4, type: 'pdf',   title: 'Brand Strategy Framework',      duration: '62 pages', accessPlans: ['Inner Circle'],                 series: '',                       seriesOrder: 0, description: 'The complete MGW Brand Strategy Framework — a proprietary methodology for building enduring creative brands.',           bg: 4 },
  { id: 5, type: 'video', title: 'Founder Mindset Intensive',     duration: '55 min',   accessPlans: [],                               series: '',                       seriesOrder: 0, description: 'The mental models, habits, and frameworks that define how visionary founders think, decide, and build.',                  bg: 1 },
  { id: 6, type: 'audio', title: 'Industry Conversations Vol. 4', duration: '1h 5m',    accessPlans: ['Creative Circle','Inner Circle'],series: 'Industry Conversations', seriesOrder: 4, description: 'Conversations with founders, creative directors, and strategists shaping the African creative economy.',               bg: 2 },
  { id: 7, type: 'pdf',   title: 'Creative Direction Handbook',   duration: '48 pages', accessPlans: ['Creative Circle','Inner Circle'],series: '',                       seriesOrder: 0, description: 'A comprehensive reference for creative directors — from client management to art direction principles.',               bg: 3 },
  { id: 8, type: 'video', title: 'Brand Positioning Secrets',     duration: '1h 10m',   accessPlans: [],                               series: 'Brand Foundations',      seriesOrder: 3, description: "Unpacking how the world's most iconic brands carved out inimitable positions in the minds of their audiences.",        bg: 4 },
];

function formatTime(secs) {
  if (isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

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

  const handleTimeUpdate   = () => { const v = videoRef.current; if (v) setCurrentTime(v.currentTime); };
  const handleLoadedMetadata = () => { const v = videoRef.current; if (v) setDuration(v.duration); };

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
      <div style={{ position: 'absolute', inset: 0, background: thumbBg, opacity: playing && duration ? 0 : 1, transition: 'opacity 0.4s', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ opacity: 0.15, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD }}>Preview</div>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 40%)', pointerEvents: 'none', opacity: showControls ? 1 : 0, transition: 'opacity 0.3s' }} />
      <div onClick={togglePlay} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', border: '0.5px solid rgba(201,162,39,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (!playing || showControls) ? 1 : 0, transition: 'opacity 0.3s', backdropFilter: 'blur(6px)' }}>
          {playing
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill={GOLD}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill={GOLD}><polygon points="5,3 19,12 5,21"/></svg>}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 14px', opacity: showControls ? 1 : 0, transition: 'opacity 0.3s' }}>
        <div onClick={handleSeek} style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, cursor: 'pointer', marginBottom: 12, position: 'relative' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: GOLD, borderRadius: 2, transition: 'width 0.1s linear' }} />
          <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', width: 12, height: 12, borderRadius: '50%', background: GOLD, boxShadow: '0 0 6px rgba(201,162,39,0.6)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={togglePlay} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#fff', display: 'flex', alignItems: 'center' }}>
            {playing
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
              {muted || volume === 0
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>}
            </button>
            <input type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={handleVolume} style={{ width: 60, accentColor: GOLD, cursor: 'pointer' }} />
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Sans', sans-serif", flex: 1 }}>
            {formatTime(currentTime)} / {duration ? formatTime(duration) : item.duration}
          </div>
          <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              {fullscreen
                ? <><polyline points="8,3 3,3 3,8"/><polyline points="21,8 21,3 16,3"/><polyline points="3,16 3,21 8,21"/><polyline points="16,21 21,21 21,16"/></>
                : <><polyline points="15,3 21,3 21,9"/><polyline points="9,21 3,21 3,15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></>}
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function AudioPlayer({ item }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDur, setAudioDur] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const animRef = useRef(null);
  const BARS = 36;

  const tick = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (playing) { animRef.current = requestAnimationFrame(tick); }
    else { cancelAnimationFrame(animRef.current); }
    return () => cancelAnimationFrame(animRef.current);
  }, [playing]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) { setPlaying(p => !p); return; }
    if (playing) { a.pause(); } else { a.play().catch(() => {}); }
    setPlaying(p => !p);
  };

  const skip = (sec) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.currentTime + sec, audioDur));
    setCurrentTime(a.currentTime);
  };

  const handleSeek = (e) => {
    const a = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const t = pct * (audioDur || 0);
    if (a) a.currentTime = t;
    setCurrentTime(t);
  };

  const pct = audioDur ? (currentTime / audioDur) * 100 : 0;

  const waveHeights = Array.from({ length: BARS }, (_, i) => {
    const base = 0.3 + 0.5 * Math.sin(i * 0.4) + 0.2 * Math.sin(i * 1.1);
    return Math.max(0.15, Math.min(1, base));
  });

  return (
    <div style={{ background: 'linear-gradient(160deg, #0a1520 0%, #06080f 100%)', borderRadius: 12, padding: '32px 28px', border: '0.5px solid rgba(0,179,255,0.15)' }}>
      <audio
        ref={audioRef}
        onLoadedMetadata={() => { if (audioRef.current) setAudioDur(audioRef.current.duration); }}
        onEnded={() => setPlaying(false)}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{ width: 64, height: 64, borderRadius: 10, background: 'linear-gradient(135deg, rgba(0,179,255,0.2), rgba(106,56,194,0.2))', border: '0.5px solid rgba(0,179,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        </div>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, fontWeight: 500, color: '#EAEAEA', marginBottom: 3 }}>{item.title}</div>
          <div style={{ fontSize: 10, color: BLUE, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Audio · {item.duration}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 56, marginBottom: 20, padding: '0 4px' }}>
        {waveHeights.map((h, i) => {
          const barPct = (i / BARS) * 100;
          const isPast = barPct < pct;
          const isAnim = playing && Math.abs(barPct - pct) < 15;
          const animName = `mgw-wave-${i % 5}`;
          return (
            <div
              key={i}
              style={{
                flex: 1, borderRadius: 2,
                height: `${h * 100}%`,
                background: isPast ? BLUE : 'rgba(255,255,255,0.08)',
                transition: 'background 0.1s',
                animation: isAnim ? `${animName} ${0.5 + (i % 4) * 0.15}s ease-in-out infinite alternate` : 'none',
              }}
            />
          );
        })}
      </div>
      <div onClick={handleSeek} style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2, cursor: 'pointer', marginBottom: 8, position: 'relative' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: BLUE, borderRadius: 2 }} />
        <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%,-50%)', width: 10, height: 10, borderRadius: '50%', background: BLUE }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#555', fontFamily: "'DM Sans', sans-serif", marginBottom: 24 }}>
        <span>{formatTime(currentTime)}</span>
        <span>{audioDur ? formatTime(audioDur) : item.duration}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <button onClick={() => skip(-15)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3.01"/></svg>
          <span>15s</span>
        </button>
        <button onClick={togglePlay} style={{ width: 56, height: 56, borderRadius: '50%', background: BLUE, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {playing
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A0A0A"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A0A0A"><polygon points="5,3 19,12 5,21"/></svg>}
        </button>
        <button onClick={() => skip(15)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-.49-3.01"/></svg>
          <span>15s</span>
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        <input type="range" min="0" max="1" step="0.05" value={volume} onChange={e => { const v = parseFloat(e.target.value); setVolume(v); if (audioRef.current) audioRef.current.volume = v; }} style={{ flex: 1, accentColor: BLUE, cursor: 'pointer' }} />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
      </div>
    </div>
  );
}

function PdfViewer({ item }) {
  const [page, setPage] = useState(1);
  const totalPages = parseInt(item.duration) || 24;

  const lines = [
    { w: '60%', h: 20, style: { background: 'rgba(201,162,39,0.6)', marginBottom: 20, borderRadius: 3 } },
    { w: '40%', h: 11, style: { background: 'rgba(255,255,255,0.2)', marginBottom: 24, borderRadius: 2 } },
    ...Array.from({ length: 6 }, (_, i) => ({ w: `${78 + (i % 3) * 8}%`, h: 8, style: { background: 'rgba(255,255,255,0.1)', marginBottom: 8, borderRadius: 1 } })),
    { w: '55%', h: 14, style: { background: 'rgba(201,162,39,0.25)', marginBottom: 18, marginTop: 10, borderRadius: 2 } },
    ...Array.from({ length: 5 }, (_, i) => ({ w: `${70 + (i % 4) * 7}%`, h: 8, style: { background: 'rgba(255,255,255,0.08)', marginBottom: 8, borderRadius: 1 } })),
  ];

  return (
    <div style={{ background: '#0e0e0e', borderRadius: 10, overflow: 'hidden', border: '0.5px solid rgba(201,162,39,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.06)', background: '#141414' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span style={{ fontSize: 11, color: '#888', fontFamily: "'DM Sans', sans-serif" }}>Page {page} of {totalPages}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ background: 'none', border: `0.5px solid rgba(201,162,39,0.2)`, borderRadius: 4, color: page === 1 ? '#444' : '#999', padding: '4px 8px', cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: 11 }}>‹</button>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ background: 'none', border: `0.5px solid rgba(201,162,39,0.2)`, borderRadius: 4, color: page === totalPages ? '#444' : '#999', padding: '4px 8px', cursor: page === totalPages ? 'not-allowed' : 'pointer', fontSize: 11 }}>›</button>
          <button style={{ background: GOLD, color: '#0A0A0A', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>↓ Download</button>
        </div>
      </div>
      <div style={{ padding: '32px 40px', maxHeight: 480, overflowY: 'auto', background: '#141414' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', background: '#1a1a1a', borderRadius: 4, padding: '48px 52px', boxShadow: '0 4px 40px rgba(0,0,0,0.4)', border: '0.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, paddingBottom: 16, borderBottom: '0.5px solid rgba(201,162,39,0.2)' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(201,162,39,0.15)', border: '0.5px solid rgba(201,162,39,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: GOLD, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>M</div>
            <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>MGW</div>
            <div style={{ marginLeft: 'auto', fontSize: 9, color: '#555', fontFamily: "'DM Sans', sans-serif" }}>Confidential</div>
          </div>
          {lines.map((l, i) => (
            <div key={i} style={{ width: l.w, height: l.h, background: l.style?.background || 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: l.style?.marginBottom || (l.h > 8 ? 0 : 8), ...l.style }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SeriesPlaylist({ item, allItems, onSelectItem }) {
  const seriesItems = allItems
    .filter(i => i.series && i.series === item.series && i.status !== 'Draft')
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));

  if (seriesItems.length < 2) return null;

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        <span style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>Series: {item.series}</span>
        <span style={{ fontSize: 9, color: '#555', marginLeft: 'auto' }}>{seriesItems.length} episodes</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 260, overflowY: 'auto', paddingRight: 2 }}>
        {seriesItems.map(si => {
          const isCurrent = si.id === item.id;
          const pill = pillStyles[si.type] || pillStyles.video;
          return (
            <button
              key={si.id}
              onClick={() => !isCurrent && onSelectItem(si)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: isCurrent ? 'rgba(201,162,39,0.09)' : 'rgba(255,255,255,0.02)',
                border: isCurrent ? '0.5px solid rgba(201,162,39,0.3)' : '0.5px solid rgba(255,255,255,0.05)',
                borderRadius: 7, padding: '10px 12px', cursor: isCurrent ? 'default' : 'pointer', textAlign: 'left',
                width: '100%', transition: 'all 0.15s',
              }}
            >
              <div style={{ width: 26, height: 26, borderRadius: 5, background: isCurrent ? 'rgba(201,162,39,0.18)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {isCurrent
                  ? <svg width="9" height="9" viewBox="0 0 24 24" fill={GOLD}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  : <span style={{ fontSize: 9, color: '#555', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{si.seriesOrder || '?'}</span>
                }
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: isCurrent ? GOLD : '#EAEAEA', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.3, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {si.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ ...s.typePill, ...pill, fontSize: 7, marginBottom: 0 }}>{si.type}</span>
                  <span style={{ fontSize: 9, color: '#555' }}>{si.duration}</span>
                </div>
              </div>
              {isCurrent && <div style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD, flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VaultItemDetail({ item, allItems, onBack, onSelectItem }) {
  const BORDER = 'rgba(201,162,39,0.18)';
  const pill = pillStyles[item.type] || pillStyles.video;

  const accessLabel = (() => {
    if (!item.accessPlans || item.accessPlans.length === 0) return 'All Plans';
    return item.accessPlans.join(' · ');
  })();

  return (
    <div className="mgw-vault-detail-outer">
      <div style={{ padding: '18px 20px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: `0.5px solid ${BORDER}`, color: '#999', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>
          Back to Vault
        </button>
        {item.series && (
          <div style={{ fontSize: 10, color: '#555', fontFamily: "'DM Sans', sans-serif" }}>
            <span style={{ color: GOLD }}>◈</span> {item.series} — Ep. {item.seriesOrder}
          </div>
        )}
      </div>

      <div className="mgw-vault-detail-layout">
        <div className="mgw-vault-detail-main">
          <div className="mgw-vault-detail-player">
            {item.type === 'video'               && <VideoPlayer item={item} />}
            {item.type === 'audio'               && <AudioPlayer item={item} />}
            {item.type === 'pdf'                 && <PdfViewer item={item} />}
            {item.type === 'masterclass'         && <VideoPlayer item={item} />}
            {item.type === 'workshop recording'  && <VideoPlayer item={item} />}
          </div>

          <div className="mgw-vault-detail-below-player">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ ...s.typePill, ...pill, fontSize: 9 }}>{item.type.toUpperCase()}</div>
              <div style={{ fontSize: 10, color: '#666' }}>{item.duration}</div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, lineHeight: 1.25, marginBottom: 12, color: '#EAEAEA' }}>
              {item.title}
            </div>
            <div style={{ fontSize: 13, color: '#888', lineHeight: 1.8 }}>
              {item.description || 'Exclusive content from the MGW Knowledge Vault.'}
            </div>
          </div>
        </div>

        <div className="mgw-vault-detail-sidebar">
          <div style={{ height: '0.5px', background: BORDER, marginBottom: 20 }} />
          <div style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: 12 }}>Content Details</div>
          {[
            { label: 'Type',   val: item.type.charAt(0).toUpperCase() + item.type.slice(1) },
            { label: 'Length', val: item.duration },
            { label: 'Access', val: accessLabel },
            { label: 'Series', val: item.series || 'Standalone' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid rgba(255,255,255,0.04)', fontSize: 12 }}>
              <span style={{ color: '#666' }}>{row.label}</span>
              <span style={{ color: '#EAEAEA', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13 }}>{row.val}</span>
            </div>
          ))}

          <SeriesPlaylist item={item} allItems={allItems} onSelectItem={onSelectItem} />
        </div>
      </div>
    </div>
  );
}

export default function VaultPage({ allItems, userTier = 'free', userPlanName, plans, onNavigate }) {
  const content = (allItems && allItems.length > 0) ? allItems : DEFAULT_CONTENT;
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const isLocked = (item) => {
    if (item.accessPlans && item.accessPlans.length > 0) {
      return !userPlanName || !item.accessPlans.includes(userPlanName);
    }
    return false;
  };

  const filtered = activeFilter === 'All'
    ? content
    : content.filter(c => c.type.toLowerCase() === activeFilter.toLowerCase());

  if (selectedItem) {
    return (
      <VaultItemDetail
        item={selectedItem}
        allItems={content}
        onBack={() => setSelectedItem(null)}
        onSelectItem={setSelectedItem}
      />
    );
  }

  return (
    <div className="mgw-page-container">
      {/* Hero */}
      <div style={{ padding: '60px 0 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', borderRadius: '50%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(106,56,194,0.18) 0%, transparent 70%)', top: -100, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: 14, position: 'relative' }}>Exclusive Content</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 500, lineHeight: 1.15, margin: '0 0 14px', position: 'relative' }}>
          Knowledge<br /><em style={{ color: GOLD }}>Vault</em>
        </h1>
        <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7, maxWidth: 520, margin: '0 auto', position: 'relative' }}>
          Exclusive content from Mavin Grandpa Worldwide — curated for the select few.
        </p>
        {userPlanName && (
          <div style={{ display: 'inline-block', marginTop: 20, background: 'rgba(201,162,39,0.08)', border: '0.5px solid rgba(201,162,39,0.3)', borderRadius: 20, padding: '5px 14px', fontSize: 10, color: GOLD, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', position: 'relative' }}>
            {userPlanName}
          </div>
        )}
      </div>

      <div className="mgw-vault-filters" style={s.filters}>
        {FILTERS.map(f => (
          <button key={f} style={{ ...s.filterPill, ...(activeFilter === f ? s.filterPillActive : {}) }} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="mgw-vault-page-grid" style={s.grid}>
        {filtered.map(item => {
          const locked = isLocked(item);
          const planNames = item.accessPlans && item.accessPlans.length > 0 ? item.accessPlans : null;
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
                    {planNames && (
                      <div style={{ fontSize: 9, color: GOLD, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, background: 'rgba(201,162,39,0.12)', border: '0.5px solid rgba(201,162,39,0.3)', borderRadius: 10, padding: '2px 8px', maxWidth: 120, textAlign: 'center', lineHeight: 1.4 }}>
                        {planNames[0]}{planNames.length > 1 ? ` +${planNames.length - 1}` : ''}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div style={s.cardInfo}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                  <div style={{ ...s.typePill, ...pillStyles[item.type] }}>{item.type}</div>
                  {item.series && (
                    <div style={{ fontSize: 7, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 10, background: 'rgba(201,162,39,0.08)', color: '#666', border: '0.5px solid rgba(201,162,39,0.15)' }}>
                      {item.series}
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
