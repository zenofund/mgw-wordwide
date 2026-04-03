import React from 'react';
import aboutPhoto from '@assets/Mavin-Grandpa-Worldwide-16-683x1024_1775179000112.jpeg';

const Hi = ({ children }) => (
  <span style={{
    color: '#C9A227',
    fontWeight: 600,
  }}>{children}</span>
);

const PullQuote = ({ children }) => (
  <blockquote style={{
    margin: '36px 0',
    padding: '24px 32px',
    borderLeft: '2px solid #C9A227',
    background: 'linear-gradient(90deg, rgba(201,162,39,0.07) 0%, transparent 100%)',
    borderRadius: '0 6px 6px 0',
  }}>
    <p style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 20,
      fontStyle: 'italic',
      lineHeight: 1.6,
      color: '#E8E0D0',
      margin: 0,
    }}>{children}</p>
  </blockquote>
);

const s = {
  page: {
    display: 'flex',
    minHeight: 'calc(100vh - 64px)',
    background: '#0A0A0A',
    color: '#EAEAEA',
  },

  leftCol: {
    width: '40%',
    flexShrink: 0,
    position: 'relative',
  },

  stickyImg: {
    position: 'sticky',
    top: 64,
    height: 'calc(100vh - 64px)',
    overflow: 'hidden',
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    filter: 'brightness(0.80) contrast(1.12) saturate(0.70)',
    display: 'block',
  },

  imgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, transparent 60%, rgba(10,10,10,0.85) 100%)',
    pointerEvents: 'none',
  },

  imgOverlayPurple: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 40% 20%, rgba(106,56,194,0.2) 0%, transparent 70%)',
    pointerEvents: 'none',
    mixBlendMode: 'screen',
  },

  rightCol: {
    flex: 1,
    padding: '64px 60px 80px 56px',
    maxWidth: 660,
  },

  pageLabel: {
    fontSize: 9,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: '#C9A227',
    marginBottom: 16,
  },

  heading: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 44,
    fontWeight: 500,
    lineHeight: 1.1,
    marginBottom: 8,
    letterSpacing: '-0.01em',
  },

  tagline: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 17,
    fontStyle: 'italic',
    color: '#C9A227',
    marginBottom: 36,
    letterSpacing: '0.02em',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 36,
  },

  dividerLine: {
    height: 0.5,
    flex: 1,
    background: 'linear-gradient(to right, rgba(201,162,39,0.5), transparent)',
  },

  dividerDot: {
    width: 5,
    height: 5,
    background: '#C9A227',
    transform: 'rotate(45deg)',
  },

  highlightBlock: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 22,
    lineHeight: 1.55,
    color: '#C9A227',
    fontWeight: 500,
    marginBottom: 28,
  },

  body: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    lineHeight: 1.85,
    color: '#B0A89A',
    marginBottom: 22,
  },

  closingLine: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 20,
    fontStyle: 'italic',
    color: '#C9A227',
    marginTop: 40,
    letterSpacing: '0.02em',
  },
};

export default function AboutPage() {
  return (
    <div className="mgw-about-page" style={s.page}>

      {/* ── Left: Sticky portrait ── */}
      <div className="mgw-about-left" style={s.leftCol}>
        <div className="mgw-about-sticky-img" style={s.stickyImg}>
          <img src={aboutPhoto} alt="Mavin Grandpa Worldwide" style={s.img} />
          <div style={s.imgOverlayPurple} />
          <div style={s.imgOverlay} />
        </div>
      </div>

      {/* ── Right: Scrollable text ── */}
      <div className="mgw-about-right" style={s.rightCol}>

        <div style={s.pageLabel}>About</div>

        <h1 className="mgw-about-heading" style={s.heading}>Mavin Grandpa<br />Worldwide</h1>

        <p style={s.tagline}>
          Showbiz consultant. Keynote speaker. Entrepreneur.<br />
          Patriarch. Mentor.
        </p>

        <div style={s.divider}>
          <div style={s.dividerLine} />
          <div style={s.dividerDot} />
        </div>

        <p style={{ ...s.highlightBlock }}>
          He is simply, <Hi>Mavin Grandpa Worldwide.</Hi>
        </p>

        <p style={s.body}>
          Mavin Grandpa Worldwide is a <Hi>multifaceted force in the global creative industry</Hi>. From showbiz consultancy to film production, from brand ambassadorship to events hosting — his portfolio of roles is as expansive as it is distinguished. If there is a lane in the entertainment world, he has not only walked it; he has paved it.
        </p>

        <p style={s.body}>
          As <Hi>Patriarch of the Supreme Mavin Dynasty (SMD) and Jonzing World</Hi>, he has spent decades architecting some of Africa's most enduring creative institutions. These are not simply record labels — they are dynasties built on discipline, vision, and an uncompromising standard of excellence.
        </p>

        <p style={s.body}>
          His leadership extends beyond the studio. As <Hi>President of the Artiste Managers Association of Nigeria (AMAN)</Hi>, he brings institutional weight and strategic direction to an industry that has long needed it. In Nigeria's music ecosystem, he is the uncle — the elder statesman every serious player defers to.
        </p>

        <PullQuote>
          "He is known as Worldwide for a reason — his influence does not stop at any border."
        </PullQuote>

        <p style={s.body}>
          Known globally as <Hi>"Worldwide"</Hi>, his reach spans <Hi>over 50 countries</Hi>, bringing creative innovation, cultural excellence, and transformative mentorship to artists and entrepreneurs across continents. He is the rare creative figure who operates with equal authority in the boardroom and on the stage.
        </p>

        <p style={s.body}>
          For <Hi>over three decades</Hi>, Mavin Grandpa Worldwide has selflessly guided emerging talent — not for publicity, but out of genuine commitment to elevating the next generation. The artists he has mentored are not footnotes; they are headliners, award-winners, and institution-builders in their own right.
        </p>

        <p style={s.body}>
          This platform is a direct extension of that lifelong mission. A curated space where his <Hi>proven frameworks</Hi>, hard-won insights, and decades of experience are made available to the select few ready to build something that lasts.
        </p>

        <p style={s.closingLine}>
          Welcome to his space. Welcome to the empire.
        </p>

      </div>
    </div>
  );
}
