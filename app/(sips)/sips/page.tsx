'use client';

import { useEffect, useRef } from 'react';
import './landing.css';

/* ─────────────── SVG ILLUSTRATIONS ─────────────── */

function HeroBgDoodles() {
  return (
    <>
      <svg style={{ position: 'absolute', top: '9%', left: '5%', width: 80, opacity: 0.1, animation: 'float 7s ease-in-out infinite' }} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="34" stroke="#EDE8D5" strokeWidth="2" strokeDasharray="5 7" />
        <circle cx="40" cy="40" r="18" stroke="#EDE8D5" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="5" stroke="#EDE8D5" strokeWidth="1.5" />
      </svg>
      <svg style={{ position: 'absolute', top: '17%', right: '8%', width: 64, opacity: 0.1, animation: 'wobble 5s ease-in-out infinite' }} viewBox="0 0 64 64" fill="none">
        <path d="M32 4 L38 22 L58 22 L43 34 L49 52 L32 40 L15 52 L21 34 L6 22 L26 22Z" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg style={{ position: 'absolute', bottom: '28%', left: '3%', width: 75, opacity: 0.09, animation: 'float 8s ease-in-out 1s infinite' }} viewBox="0 0 75 110" fill="none">
        <path d="M37 102 C37 102 8 76 8 50 C8 24 37 8 37 8 C37 8 66 24 66 50 C66 76 37 102 37 102Z" stroke="#EDE8D5" strokeWidth="2" fill="none" />
        <line x1="37" y1="102" x2="37" y2="8" stroke="#EDE8D5" strokeWidth="1.5" />
        <path d="M37 52 Q56 36 66 52" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
        <path d="M37 52 Q18 36 8 52" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      </svg>
      <svg style={{ position: 'absolute', top: '42%', right: '4%', width: 58, opacity: 0.09, animation: 'wobble 6s ease-in-out 0.5s infinite' }} viewBox="0 0 58 58" fill="none">
        <rect x="4" y="4" width="50" height="50" rx="14" stroke="#EDE8D5" strokeWidth="2" strokeDasharray="4 5" fill="none" />
        <rect x="14" y="14" width="30" height="30" rx="7" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
        <circle cx="29" cy="29" r="6" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      </svg>
    </>
  );
}

function HeroCharRight() {
  return (
    <svg className="hero-char-r" viewBox="0 0 260 400" fill="none">
      <path d="M85 145 L96 355 Q97 365 130 365 Q163 365 164 355 L175 145Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="130" cy="145" rx="45" ry="11" stroke="#EDE8D5" strokeWidth="2.5" fill="none" />
      <line x1="152" y1="143" x2="172" y2="64" stroke="#EDE8D5" strokeWidth="3" strokeLinecap="round" />
      <path d="M172 64 Q176 56 180 64" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M89 182 Q130 174 171 182" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="4 5" />
      <path d="M87 215 Q130 207 173 215" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 5" />
      <circle cx="204" cy="180" r="24" stroke="#EDE8D5" strokeWidth="2.5" fill="none" />
      <path d="M190 162 Q192 154 196 160" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M204 158 Q204 150 208 157" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M215 162 Q218 154 220 162" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="197" cy="178" r="2.5" fill="#EDE8D5" />
      <circle cx="211" cy="178" r="2.5" fill="#EDE8D5" />
      <path d="M198 189 Q204 196 210 189" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="204" y1="204" x2="204" y2="278" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M204 224 Q186 208 172 190" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M204 224 Q228 236 236 254" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="172" cy="190" r="4" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="236" cy="254" r="4" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <path d="M204 278 Q193 308 187 345" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M204 278 Q215 308 222 345" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M187 345 Q178 349 174 358" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M222 345 Q232 349 236 358" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function HeroCharLeft() {
  return (
    <svg className="hero-char-l" viewBox="0 0 170 320" fill="none">
      <path d="M45 75 L52 250 Q53 260 85 260 Q117 260 118 250 L125 75Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M45 75 Q85 65 125 75" stroke="#EDE8D5" strokeWidth="2.5" fill="none" />
      <path d="M48 75 Q60 58 85 55 Q110 58 122 75" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="68" cy="60" r="6" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <circle cx="85" cy="55" r="5" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <circle cx="102" cy="60" r="6" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M50 148 Q85 140 120 148" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />
      <circle cx="30" cy="206" r="18" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="25" cy="203" r="2" fill="#EDE8D5" />
      <circle cx="35" cy="203" r="2" fill="#EDE8D5" />
      <path d="M26 212 Q30 218 34 212" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="30" y1="224" x2="30" y2="262" stroke="#EDE8D5" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 240 Q15 233 8 242" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 240 Q45 233 52 242" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 262 Q20 280 15 296" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 262 Q40 280 46 296" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ── Category Illustrations ── */
function SmoothieIllo() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M62 38 L70 138 Q71 146 100 146 Q129 146 130 138 L138 38Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="100" cy="38" rx="38" ry="9" stroke="#EDE8D5" strokeWidth="2.5" fill="none" />
      <line x1="118" y1="36" x2="134" y2="8" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="145" cy="12" r="7" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="158" cy="22" r="5" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <circle cx="150" cy="28" r="4" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M65 68 Q100 61 135 68" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="4 5" />
      <path d="M64 98 Q100 91 136 98" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 5" />
      <ellipse cx="42" cy="80" rx="14" ry="20" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <ellipse cx="42" cy="83" rx="7" ry="10" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M30 35 L32 41 L38 43 L32 45 L30 51 L28 45 L22 43 L28 41Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <circle cx="168" cy="115" r="4" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function MatchaIllo() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M62 45 L70 140 Q71 148 100 148 Q129 148 130 140 L138 45Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 45 Q100 36 138 45" stroke="#EDE8D5" strokeWidth="2.5" fill="none" />
      <path d="M65 45 Q72 28 85 26 Q93 22 100 24 Q107 22 115 26 Q128 28 135 45" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="80" cy="28" r="8" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="94" cy="22" r="7" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="108" cy="24" r="7" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="120" cy="30" r="6" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <path d="M65 90 Q100 83 135 90" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />
      <path d="M75 120 Q100 114 125 120" stroke="#EDE8D5" strokeWidth="1.2" fill="none" />
      <circle cx="158" cy="70" r="16" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <path d="M148 62 Q158 56 168 62" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M145 70 Q158 64 171 70" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
      <path d="M160 110 L161 114 L165 115 L161 116 L160 120 L159 116 L155 115 L159 114Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CoffeeIllo() {
  return (
    <svg width="200" height="200" viewBox="0 0 180 180" fill="none">
      <path d="M34 62 L40 148 Q41 158 90 158 Q139 158 140 148 L146 62Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 62 Q90 52 146 62" stroke="#EDE8D5" strokeWidth="2.5" fill="none" />
      <path d="M146 78 Q164 78 164 98 Q164 118 146 118" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M56 62 C53 50 59 40 56 28" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M90 58 C87 44 93 32 90 18" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M124 62 C121 50 127 40 124 28" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M90 92 Q100 85 108 92 Q100 100 90 92Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <circle cx="90" cy="110" r="14" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 4" />
      <circle cx="24" cy="100" r="14" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <line x1="10" y1="100" x2="38" y2="100" stroke="#EDE8D5" strokeWidth="1.5" />
      <line x1="24" y1="86" x2="24" y2="114" stroke="#EDE8D5" strokeWidth="1.5" />
      <path d="M148 30 Q158 22 162 32 Q166 42 156 46 Q148 48 144 40 Q142 32 150 28" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ── Trending Drink Illustrations (reused from secret menu) ── */
function IlloPinkGlow() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M62 38 L70 138 Q71 146 100 146 Q129 146 130 138 L138 38Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="100" cy="38" rx="38" ry="9" stroke="#EDE8D5" strokeWidth="2.5" fill="none" />
      <line x1="118" y1="36" x2="134" y2="8" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="145" cy="12" r="7" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="158" cy="22" r="5" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <circle cx="150" cy="28" r="4" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M65 68 Q100 61 135 68" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="4 5" />
      <path d="M64 98 Q100 91 136 98" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 5" />
      <ellipse cx="42" cy="80" rx="14" ry="20" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <ellipse cx="42" cy="83" rx="7" ry="10" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M164 55 Q166 52 168 55 Q170 52 172 55 Q172 58 168 62 Q164 58 164 55Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M30 35 L32 41 L38 43 L32 45 L30 51 L28 45 L22 43 L28 41Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <circle cx="168" cy="115" r="4" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M75 125 Q100 119 125 125" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function IlloCocoCloud() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M62 45 L70 140 Q71 148 100 148 Q129 148 130 140 L138 45Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 45 Q100 36 138 45" stroke="#EDE8D5" strokeWidth="2.5" fill="none" />
      <path d="M65 45 Q72 28 85 26 Q93 22 100 24 Q107 22 115 26 Q128 28 135 45" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="80" cy="28" r="8" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="94" cy="22" r="7" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="108" cy="24" r="7" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="120" cy="30" r="6" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <circle cx="72" cy="36" r="5" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M65 90 Q100 83 135 90" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="5 5" />
      <path d="M75 120 Q100 114 125 120" stroke="#EDE8D5" strokeWidth="1.2" fill="none" />
      <path d="M78 132 Q100 126 122 132" stroke="#EDE8D5" strokeWidth="1" fill="none" />
      <circle cx="158" cy="70" r="16" stroke="#EDE8D5" strokeWidth="2" fill="none" />
      <path d="M148 62 Q158 56 168 62" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M145 70 Q158 64 171 70" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
      <path d="M148 78 Q158 84 168 78" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M24 60 Q28 54 34 56 Q36 50 42 52 Q46 48 50 52 Q54 50 56 56 Q58 60 54 64 Q48 68 42 66 Q36 68 30 64 Q26 64 24 60Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M160 110 L161 114 L165 115 L161 116 L160 120 L159 116 L155 115 L159 114Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <circle cx="168" cy="24" r="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function FooterCharacters() {
  return (
    <svg style={{ display: 'block', margin: '0 auto 36px', width: 360, opacity: 0.13 }} viewBox="0 0 360 72" fill="none">
      <circle cx="48" cy="22" r="14" stroke="#EDE8D5" strokeWidth="1.8" fill="none" />
      <line x1="48" y1="36" x2="48" y2="58" stroke="#EDE8D5" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M48 46 Q36 40 30 46" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M48 46 Q60 40 66 46" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M48 58 Q40 65 35 66" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M48 58 Q56 65 61 66" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M30 36 Q26 30 26 36 L27 48 Q27 52 30 52 Q33 52 33 48 L34 36 Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M30 36 Q32 33 34 36" stroke="#EDE8D5" strokeWidth="1.2" fill="none" />
      <circle cx="180" cy="20" r="16" stroke="#EDE8D5" strokeWidth="1.8" fill="none" />
      <line x1="180" y1="36" x2="180" y2="60" stroke="#EDE8D5" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M180 48 Q166 42 160 48" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M180 48 Q194 42 200 48" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M180 60 Q172 67 167 68" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M180 60 Q188 67 193 68" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M200 38 Q196 32 196 38 L197 50 Q197 54 200 54 Q203 54 203 50 L204 38 Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M200 38 Q202 35 204 38" stroke="#EDE8D5" strokeWidth="1.2" fill="none" />
      <circle cx="312" cy="22" r="14" stroke="#EDE8D5" strokeWidth="1.8" fill="none" />
      <line x1="312" y1="36" x2="312" y2="58" stroke="#EDE8D5" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M312 46 Q300 40 294 46" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M312 46 Q324 40 330 46" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M312 58 Q304 65 299 66" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M312 58 Q320 65 325 66" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M294 36 Q290 30 290 36 L291 48 Q291 52 294 52 Q297 52 297 48 L298 36 Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none" />
      <path d="M294 36 Q296 33 298 36" stroke="#EDE8D5" strokeWidth="1.2" fill="none" />
      <path d="M82 54 Q130 46 158 54" stroke="#EDE8D5" strokeWidth="1" fill="none" strokeDasharray="4 5" />
      <path d="M216 54 Q264 46 290 54" stroke="#EDE8D5" strokeWidth="1" fill="none" strokeDasharray="4 5" />
    </svg>
  );
}

function WaveBreaker() {
  return (
    <div className="wrap">
      <div className="breaker reveal">
        <svg width="340" height="30" viewBox="0 0 340 30" fill="none">
          <path d="M0 15 Q42 4 85 15 Q127 26 170 15 Q212 4 255 15 Q297 26 340 15" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function SipsLandingPage() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 100);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* NAV */}
      <nav ref={navRef} className="sips-nav">
        <a href="/sips" className="nav-logo">
          euforyc <span>sips</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">what we offer</a></li>
          <li><a href="#trending">trending</a></li>
          <li><a href="/sips/secret-menu">secret menu</a></li>
          <li>
            <a href="/sips/order" className="nav-collect-btn">
              order now
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />
        <HeroBgDoodles />
        <HeroCharRight />
        <HeroCharLeft />

        <div className="hero-badge">
          <span className="badge-dot" />
          wellness drinks bar
          <span className="badge-dot" />
        </div>

        <h1 className="hero-h1">
          euforyc
          <br />
          <span className="sips">sips</span>
        </h1>
        <p className="hero-byline">wellness &middot; ritual &middot; nourishment</p>
        <p className="hero-desc">
          hand-crafted smoothies, ceremonial matcha &amp; specialty coffee, made to nourish you from the inside out.
        </p>

        <div className="hero-ctas">
          <a href="/sips/order" className="btn-primary">
            order &amp; skip the queue &rarr;
          </a>
          <a href="/sips/secret-menu" className="btn-outline">
            view secret menu
          </a>
        </div>

      </section>

      {/* WHAT WE OFFER */}
      <section className="offer-sec" id="about">
        <div className="wrap">
          <div className="sec-header reveal">
            <p className="sec-eyebrow">what does euforyc sips offer?</p>
            <h2 className="sec-title">our craft</h2>
          </div>

          <div className="offer-grid">
            <a href="/sips/secret-menu#smoothies" className="offer-card reveal">
              <div className="offer-illo"><SmoothieIllo /></div>
              <div className="offer-body">
                <h3 className="offer-name">smoothies</h3>
                <p className="offer-desc">collagen-boosted, organic wellness blends crafted to help you glow from the inside out.</p>
                <span className="offer-link">explore &rarr;</span>
              </div>
            </a>

            <a href="/sips/secret-menu#matcha" className="offer-card reveal">
              <div className="offer-illo"><MatchaIllo /></div>
              <div className="offer-body">
                <h3 className="offer-name">matcha</h3>
                <p className="offer-desc">ceremonial grade, secret blends — earthy, dreamy and like you&apos;ve never had it.</p>
                <span className="offer-link">explore &rarr;</span>
              </div>
            </a>

            <a href="/sips/secret-menu#coffee" className="offer-card reveal">
              <div className="offer-illo"><CoffeeIllo /></div>
              <div className="offer-body">
                <h3 className="offer-name">coffee</h3>
                <p className="offer-desc">specialty espresso, elevated — bold, bright and quietly sophisticated.</p>
                <span className="offer-link">explore &rarr;</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <WaveBreaker />

      {/* TRENDING */}
      <section className="trending-sec" id="trending">
        <div className="wrap">
          <div className="sec-header reveal">
            <p className="sec-eyebrow">fan favourites</p>
            <h2 className="sec-title">trending</h2>
          </div>

          <div className="trending-grid">
            <div className="trending-card reveal">
              <div className="trending-illo"><IlloPinkGlow /></div>
              <div className="trending-body">
                <span className="trending-tag">smoothie</span>
                <h3 className="trending-name">euforyc pink glow</h3>
                <p className="trending-tagline">&ldquo;for your skin, your soul, your softest self.&rdquo;</p>
                <div className="trending-rule" />
                <p className="trending-desc">your daily beauty ritual in a glass &mdash; antioxidant-rich and collagen-boosted to help you glow from the inside out.</p>
              </div>
            </div>

            <div className="trending-card reveal">
              <div className="trending-illo"><IlloCocoCloud /></div>
              <div className="trending-body">
                <span className="trending-tag">matcha</span>
                <h3 className="trending-name">coco cloud matcha</h3>
                <p className="trending-tagline">&ldquo;light enough to float on.&rdquo;</p>
                <div className="trending-rule" />
                <p className="trending-desc">hydrating, earthy and dreamy &mdash; matcha like you&apos;ve never had it. ceremonial grade with coconut cloud foam.</p>
              </div>
            </div>
          </div>

          <div className="trending-cta reveal">
            <a href="/sips/secret-menu" className="btn-outline">
              view the full menu &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CLICK & COLLECT BANNER */}
      <section className="collect-banner">
        <svg className="collect-doodle cd-left" viewBox="0 0 80 120" fill="none">
          <path d="M40 112 C40 112 8 86 8 58 C8 30 40 8 40 8 C40 8 72 30 72 58 C72 86 40 112 40 112Z" stroke="#1E3B20" strokeWidth="2" fill="none" />
          <line x1="40" y1="112" x2="40" y2="8" stroke="#1E3B20" strokeWidth="1.5" />
          <path d="M40 58 Q58 40 70 54" stroke="#1E3B20" strokeWidth="1.5" fill="none" />
          <path d="M40 58 Q22 40 10 54" stroke="#1E3B20" strokeWidth="1.5" fill="none" />
        </svg>
        <svg className="collect-doodle cd-right" viewBox="0 0 90 90" fill="none">
          <path d="M45 6 L53 28 L78 28 L58 43 L66 66 L45 51 L24 66 L32 43 L12 28 L37 28Z" stroke="#1E3B20" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="collect-doodle cd-top" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="20" stroke="#1E3B20" strokeWidth="1.5" strokeDasharray="4 6" fill="none" />
          <circle cx="25" cy="25" r="8" stroke="#1E3B20" strokeWidth="1.5" fill="none" />
        </svg>

        <div className="collect-inner reveal">
          <p className="collect-eyebrow">why wait?</p>
          <h2 className="collect-heading">
            order &amp; <em>skip the queue</em>
          </h2>
          <p className="collect-desc">
            order your favourite sip online and have it ready for pick-up when you arrive. no waiting, just vibes.
          </p>
          <a href="/sips/order" className="collect-btn">
            order now &rarr;
          </a>
        </div>
      </section>

      {/* LOCATION */}
      <section className="location-sec" id="location">
        <div className="wrap">
          <div className="location-grid">
            <div className="location-info reveal">
              <p className="sec-eyebrow">come say hi</p>
              <h2 className="sec-title">find us</h2>
              <p className="location-desc">
                we are located exclusively inside <strong>euforyc studios</strong>. drop by for your daily dose of wellness, matcha, and specialty coffee.
              </p>
              <address className="location-address">
                <p>euforyc studios</p>
                <p>7 holmstall ave</p>
                <p>edgware, london</p>
              </address>
              <a href="https://maps.app.goo.gl/uQ7hPj7eD1sW9R2Y9" target="_blank" rel="noopener noreferrer" className="btn-outline location-btn">
                get directions &rarr;
              </a>
            </div>
            <div className="location-map reveal">
              <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.4142517364735!2d-0.2664880232552638!3d51.59729790413187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761184306e6ffb%3A0xa2b41da071fb19ea!2sEuforyc%20Sips%20%7C%20Wellness.%20Matcha.%20Coffee.!5e0!3m2!1sen!2suk!4v1772987876837!5m2!1sen!2suk" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sips-footer">
        <FooterCharacters />
        <p className="footer-logo">euforyc <span>sips</span></p>
        <p className="footer-sub">wellness &middot; ritual &middot; nourishment</p>
        <div className="footer-links">
          <a href="https://euforyc.co.uk">studio</a>
          <a href="https://euforyc.co.uk/book">book a class</a>
          <a href="/sips/secret-menu">secret menu</a>
          <a href="https://instagram.com/euforycsips">@euforycsips</a>
          <a href="https://euforyc.co.uk/contact">contact</a>
        </div>
        <p className="footer-copy">&copy; 2025 euforyc studios &middot; 7 holmstall ave, edgware, london</p>
      </footer>
    </>
  );
}
