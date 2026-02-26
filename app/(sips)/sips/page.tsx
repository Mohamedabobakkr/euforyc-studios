'use client';

import { useEffect, useRef } from 'react';
import './sips.css';

/* ─────────────── SVG ILLUSTRATION COMPONENTS ─────────────── */

function HeroBgDoodles() {
  return (
    <>
      <svg style={{position:'absolute',top:'9%',left:'5%',width:80,opacity:0.1,animation:'float 7s ease-in-out infinite'}} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="34" stroke="#EDE8D5" strokeWidth="2" strokeDasharray="5 7"/>
        <circle cx="40" cy="40" r="18" stroke="#EDE8D5" strokeWidth="1.5"/>
        <circle cx="40" cy="40" r="5" stroke="#EDE8D5" strokeWidth="1.5"/>
      </svg>
      <svg style={{position:'absolute',top:'17%',right:'8%',width:64,opacity:0.1,animation:'wobble 5s ease-in-out infinite'}} viewBox="0 0 64 64" fill="none">
        <path d="M32 4 L38 22 L58 22 L43 34 L49 52 L32 40 L15 52 L21 34 L6 22 L26 22Z" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <svg style={{position:'absolute',bottom:'28%',left:'3%',width:75,opacity:0.09,animation:'float 8s ease-in-out 1s infinite'}} viewBox="0 0 75 110" fill="none">
        <path d="M37 102 C37 102 8 76 8 50 C8 24 37 8 37 8 C37 8 66 24 66 50 C66 76 37 102 37 102Z" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
        <line x1="37" y1="102" x2="37" y2="8" stroke="#EDE8D5" strokeWidth="1.5"/>
        <path d="M37 52 Q56 36 66 52" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
        <path d="M37 52 Q18 36 8 52" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
        <path d="M37 76 Q52 62 62 72" stroke="#EDE8D5" strokeWidth="1.2" fill="none"/>
        <path d="M37 76 Q22 62 12 72" stroke="#EDE8D5" strokeWidth="1.2" fill="none"/>
      </svg>
      <svg style={{position:'absolute',top:'42%',right:'4%',width:58,opacity:0.09,animation:'wobble 6s ease-in-out 0.5s infinite'}} viewBox="0 0 58 58" fill="none">
        <rect x="4" y="4" width="50" height="50" rx="14" stroke="#EDE8D5" strokeWidth="2" strokeDasharray="4 5" fill="none"/>
        <rect x="14" y="14" width="30" height="30" rx="7" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
        <circle cx="29" cy="29" r="6" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      </svg>
      <svg style={{position:'absolute',bottom:'40%',left:'8%',width:46,opacity:0.08,animation:'float 9s ease-in-out 2s infinite'}} viewBox="0 0 46 46" fill="none">
        <path d="M23 4 L26 13 L36 13 L28 19 L31 29 L23 23 L15 29 L18 19 L10 13 L20 13Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      </svg>
    </>
  );
}

function HeroCharRight() {
  return (
    <svg className="hero-char-r" viewBox="0 0 260 400" fill="none">
      <path d="M85 145 L96 355 Q97 365 130 365 Q163 365 164 355 L175 145Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="130" cy="145" rx="45" ry="11" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <line x1="152" y1="143" x2="172" y2="64" stroke="#EDE8D5" strokeWidth="3" strokeLinecap="round"/>
      <path d="M172 64 Q176 56 180 64" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M89 182 Q130 174 171 182" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
      <path d="M87 215 Q130 207 173 215" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 5"/>
      <path d="M105 270 Q130 264 155 270" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M108 285 Q130 279 152 285" stroke="#EDE8D5" strokeWidth="1.2" fill="none"/>
      <circle cx="204" cy="180" r="24" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <path d="M190 162 Q192 154 196 160" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M204 158 Q204 150 208 157" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M215 162 Q218 154 220 162" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="197" cy="178" r="2.5" fill="#EDE8D5"/>
      <circle cx="211" cy="178" r="2.5" fill="#EDE8D5"/>
      <path d="M198 189 Q204 196 210 189" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="204" y1="204" x2="204" y2="278" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M204 224 Q186 208 172 190" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M204 224 Q228 236 236 254" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="172" cy="190" r="4" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="236" cy="254" r="4" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M204 278 Q193 308 187 345" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M204 278 Q215 308 222 345" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M187 345 Q178 349 174 358" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M222 345 Q232 349 236 358" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M52 110 L55 119 L64 122 L55 125 L52 134 L49 125 L40 122 L49 119Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="70" cy="90" r="4" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M38 148 L39 152 L43 153 L39 154 L38 158 L37 154 L33 153 L37 152Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="244" cy="140" r="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M240 100 L241 104 L245 105 L241 106 L240 110 L239 106 L235 105 L239 104Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function HeroCharLeft() {
  return (
    <svg className="hero-char-l" viewBox="0 0 170 320" fill="none">
      <path d="M45 75 L52 250 Q53 260 85 260 Q117 260 118 250 L125 75Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M45 75 Q85 65 125 75" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <path d="M48 75 Q60 58 85 55 Q110 58 122 75" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="68" cy="60" r="6" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="85" cy="55" r="5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="102" cy="60" r="6" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M50 148 Q85 140 120 148" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="5 5"/>
      <circle cx="30" cy="206" r="18" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="25" cy="203" r="2" fill="#EDE8D5"/>
      <circle cx="35" cy="203" r="2" fill="#EDE8D5"/>
      <path d="M26 212 Q30 218 34 212" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="30" y1="224" x2="30" y2="262" stroke="#EDE8D5" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 240 Q15 233 8 242" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M30 240 Q45 233 52 242" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M30 262 Q20 280 15 296" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M30 262 Q40 280 46 296" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M138 48 L141 57 L150 60 L141 63 L138 72 L135 63 L126 60 L135 57Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="150" cy="36" r="3.5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M125 28 L126 32 L130 33 L126 34 L125 38 L124 34 L120 33 L124 32Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IlloPinkGlow() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M62 38 L70 138 Q71 146 100 146 Q129 146 130 138 L138 38Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="100" cy="38" rx="38" ry="9" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <line x1="118" y1="36" x2="134" y2="8" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="145" cy="12" r="7" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="158" cy="22" r="5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="150" cy="28" r="4" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M65 68 Q100 61 135 68" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
      <path d="M64 98 Q100 91 136 98" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 5"/>
      <ellipse cx="42" cy="80" rx="14" ry="20" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <ellipse cx="42" cy="83" rx="7" ry="10" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M164 55 Q166 52 168 55 Q170 52 172 55 Q172 58 168 62 Q164 58 164 55Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M30 35 L32 41 L38 43 L32 45 L30 51 L28 45 L22 43 L28 41Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="168" cy="115" r="4" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M75 125 Q100 119 125 125" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IlloDragonRitual() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M62 38 L70 138 Q71 146 100 146 Q129 146 130 138 L138 38Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="100" cy="38" rx="38" ry="9" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <line x1="84" y1="36" x2="68" y2="8" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="155" cy="70" rx="18" ry="22" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M155 48 Q158 40 161 48" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M165 53 Q170 47 170 55" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M145 53 Q140 47 140 55" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M155 92 Q152 100 148 92" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="150" cy="65" r="2" fill="#EDE8D5" opacity="0.6"/>
      <circle cx="160" cy="72" r="2" fill="#EDE8D5" opacity="0.6"/>
      <circle cx="152" cy="78" r="1.5" fill="#EDE8D5" opacity="0.6"/>
      <path d="M65 75 Q100 68 135 75" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
      <path d="M38 60 L40 66 L46 68 L40 70 L38 76 L36 70 L30 68 L36 66Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="42" cy="108" r="4" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="168" cy="40" r="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M36 22 Q42 14 48 22 Q50 30 42 36 Q34 30 36 22Z" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M42 14 Q44 8 46 12" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function IlloBlueRadiance() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M55 42 L64 140 Q65 148 100 148 Q135 148 136 140 L145 42Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="100" cy="42" rx="45" ry="10" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <line x1="120" y1="40" x2="138" y2="10" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M100 80 Q108 70 108 82 Q108 94 96 94 Q84 94 84 82 Q84 70 96 68" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="84" rx="14" ry="18" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <line x1="28" y1="76" x2="44" y2="92" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <line x1="28" y1="84" x2="44" y2="100" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <line x1="36" y1="72" x2="36" y2="102" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <path d="M30 66 Q33 58 36 62 Q39 54 42 66" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M162 40 Q172 55 168 72 Q164 82 158 80" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M162 40 Q156 50 158 67 Q160 78 158 80" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M58 100 Q100 94 142 100" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="4 5"/>
      <path d="M154 112 L155 116 L159 117 L155 118 L154 122 L153 118 L149 117 L153 116Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="170" cy="100" r="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M28 120 L29 124 L33 125 L29 126 L28 130 L27 126 L23 125 L27 124Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IlloGoldenAura() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M62 38 L70 138 Q71 146 100 146 Q129 146 130 138 L138 38Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="100" cy="38" rx="38" ry="9" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <line x1="82" y1="36" x2="66" y2="8" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M148 55 Q166 55 166 72 Q166 90 148 90" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M148 55 L148 90" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <line x1="148" y1="63" x2="163" y2="63" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <line x1="148" y1="72" x2="165" y2="72" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <line x1="148" y1="81" x2="162" y2="81" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <line x1="156" y1="55" x2="156" y2="90" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <circle cx="38" cy="76" r="18" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M24 68 Q38 60 52 68" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M22 76 Q38 68 54 76" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
      <path d="M24 84 Q38 92 52 84" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M100 8 L100 0" stroke="#EDE8D5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M68 12 L63 6" stroke="#EDE8D5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M132 12 L137 6" stroke="#EDE8D5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M65 80 Q100 73 135 80" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
      <path d="M168 112 L169 116 L173 117 L169 118 L168 122 L167 118 L163 117 L167 116Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="30" cy="116" r="3.5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IlloCocoCloud() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M62 45 L70 140 Q71 148 100 148 Q129 148 130 140 L138 45Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M62 45 Q100 36 138 45" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <path d="M65 45 Q72 28 85 26 Q93 22 100 24 Q107 22 115 26 Q128 28 135 45" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="80" cy="28" r="8" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="94" cy="22" r="7" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="108" cy="24" r="7" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="120" cy="30" r="6" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="72" cy="36" r="5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M65 90 Q100 83 135 90" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="5 5"/>
      <path d="M75 120 Q100 114 125 120" stroke="#EDE8D5" strokeWidth="1.2" fill="none"/>
      <path d="M78 132 Q100 126 122 132" stroke="#EDE8D5" strokeWidth="1" fill="none"/>
      <circle cx="158" cy="70" r="16" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M148 62 Q158 56 168 62" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M145 70 Q158 64 171 70" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
      <path d="M148 78 Q158 84 168 78" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M24 60 Q28 54 34 56 Q36 50 42 52 Q46 48 50 52 Q54 50 56 56 Q58 60 54 64 Q48 68 42 66 Q36 68 30 64 Q26 64 24 60Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M160 110 L161 114 L165 115 L161 116 L160 120 L159 116 L155 115 L159 114Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="168" cy="24" r="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IlloButterscotchCookie() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      <path d="M62 45 L70 140 Q71 148 100 148 Q129 148 130 140 L138 45Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M62 45 Q100 36 138 45" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <path d="M68 45 Q78 35 88 40 Q95 32 105 37 Q115 30 122 38 Q130 34 136 45" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M75 38 L78 34 L81 38" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M98 34 L101 30 L104 34" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M120 36 L123 32 L126 36" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M65 78 Q80 72 95 78 Q110 84 125 78 Q133 74 135 78" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <circle cx="38" cy="76" r="20" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <ellipse cx="32" cy="70" rx="4" ry="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none" transform="rotate(-10 32 70)"/>
      <ellipse cx="46" cy="68" rx="3.5" ry="2.5" stroke="#EDE8D5" strokeWidth="1.5" fill="none" transform="rotate(8 46 68)"/>
      <ellipse cx="34" cy="82" rx="3" ry="2" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <ellipse cx="48" cy="80" rx="4" ry="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none" transform="rotate(-6 48 80)"/>
      <path d="M52 66 Q58 58 58 66" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M82 44 C80 36 84 28 82 20" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M100 42 C98 32 102 22 100 12" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M118 44 C116 36 120 28 118 20" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M158 60 L160 66 L166 68 L160 70 L158 76 L156 70 L150 68 L156 66Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="164" cy="110" r="3.5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IlloMontBlanc() {
  return (
    <svg width="200" height="200" viewBox="0 0 180 180" fill="none">
      <path d="M34 62 L40 148 Q41 158 90 158 Q139 158 140 148 L146 62Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M34 62 Q90 52 146 62" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <path d="M146 78 Q164 78 164 98 Q164 118 146 118" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M56 62 C53 50 59 40 56 28" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M90 58 C87 44 93 32 90 18" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M124 62 C121 50 127 40 124 28" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M90 92 Q100 85 108 92 Q100 100 90 92Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="90" cy="110" r="14" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 4"/>
      <circle cx="24" cy="100" r="14" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <line x1="10" y1="100" x2="38" y2="100" stroke="#EDE8D5" strokeWidth="1.5"/>
      <line x1="24" y1="86" x2="24" y2="114" stroke="#EDE8D5" strokeWidth="1.5"/>
      <line x1="14" y1="90" x2="34" y2="110" stroke="#EDE8D5" strokeWidth="1"/>
      <line x1="34" y1="90" x2="14" y2="110" stroke="#EDE8D5" strokeWidth="1"/>
      <path d="M148 30 Q158 22 162 32 Q166 42 156 46 Q148 48 144 40 Q142 32 150 28" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M148 152 L149 156 L153 157 L149 158 L148 162 L147 158 L143 157 L147 156Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="20" cy="50" r="3.5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M8 130 L9 134 L13 135 L9 136 L8 140 L7 136 L3 135 L7 134Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

/* ── New Coffee Illustrations ── */

function IlloBrownSugarEspresso() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      {/* shaker cup */}
      <path d="M68 32 L76 130 Q77 138 100 138 Q123 138 124 130 L132 32Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="100" cy="32" rx="32" ry="8" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      {/* dome lid */}
      <path d="M72 32 Q100 18 128 32" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      <line x1="100" y1="18" x2="100" y2="8" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round"/>
      {/* ice cubes */}
      <rect x="84" y="56" width="16" height="14" rx="3" stroke="#EDE8D5" strokeWidth="1.8" fill="none" transform="rotate(-8 92 63)"/>
      <rect x="100" y="68" width="14" height="12" rx="3" stroke="#EDE8D5" strokeWidth="1.8" fill="none" transform="rotate(6 107 74)"/>
      <rect x="88" y="80" width="13" height="11" rx="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none" transform="rotate(-4 94 86)"/>
      {/* brown sugar crystals floating */}
      <path d="M142 48 L146 44 L150 48 L146 52Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M150 62 L153 59 L156 62 L153 65Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M138 70 L141 67 L144 70 L141 73Z" stroke="#EDE8D5" strokeWidth="1.3" fill="none"/>
      {/* shaken motion lines */}
      <path d="M56 50 Q52 54 56 58" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M48 44 Q44 50 48 56" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M144 44 Q148 48 144 52" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* layer line */}
      <path d="M78 100 Q100 94 122 100" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
      {/* sparkles */}
      <path d="M40 80 L41 84 L45 85 L41 86 L40 90 L39 86 L35 85 L39 84Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="160" cy="100" r="3.5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M52 120 L53 124 L57 125 L53 126 L52 130 L51 126 L47 125 L51 124Z" stroke="#EDE8D5" strokeWidth="1.3" fill="none"/>
    </svg>
  );
}

function IlloPistachioLatte() {
  return (
    <svg width="200" height="200" viewBox="0 0 180 180" fill="none">
      {/* blended cup body */}
      <path d="M40 58 L48 148 Q49 158 90 158 Q131 158 132 148 L140 58Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 58 Q90 48 140 58" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      {/* whipped cream dome top */}
      <path d="M44 58 Q55 38 70 34 Q80 28 90 30 Q100 28 110 34 Q125 38 136 58" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="72" cy="38" r="8" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <circle cx="90" cy="32" r="7" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <circle cx="108" cy="38" r="8" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      {/* straw */}
      <line x1="108" y1="30" x2="122" y2="6" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round"/>
      {/* pistachio nut left */}
      <ellipse cx="24" cy="88" rx="14" ry="10" stroke="#EDE8D5" strokeWidth="2" fill="none" transform="rotate(-15 24 88)"/>
      <path d="M16 88 Q24 82 32 88" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="24" cy="86" r="4" stroke="#EDE8D5" strokeWidth="1.2" fill="none"/>
      {/* pistachio nut right */}
      <ellipse cx="158" cy="72" rx="12" ry="9" stroke="#EDE8D5" strokeWidth="1.8" fill="none" transform="rotate(10 158 72)"/>
      <path d="M150 72 Q158 66 166 72" stroke="#EDE8D5" strokeWidth="1.3" fill="none"/>
      {/* blended swirl inside */}
      <path d="M90 90 Q98 82 104 90 Q98 98 90 90Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="90" cy="108" r="12" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 4"/>
      {/* layer line */}
      <path d="M46 120 Q90 112 134 120" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="4 5"/>
      {/* sparkles */}
      <path d="M148 140 L149 144 L153 145 L149 146 L148 150 L147 146 L143 145 L147 144Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="28" cy="130" r="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M156 28 L157 32 L161 33 L157 34 L156 38 L155 34 L151 33 L155 32Z" stroke="#EDE8D5" strokeWidth="1.3" fill="none"/>
    </svg>
  );
}

/* ── New Matcha Illustrations ── */

function IlloStrawCocoCloud() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      {/* matcha glass */}
      <path d="M62 45 L70 140 Q71 148 100 148 Q129 148 130 140 L138 45Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M62 45 Q100 36 138 45" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      {/* coconut cloud foam top */}
      <path d="M65 45 Q72 28 85 26 Q93 22 100 24 Q107 22 115 26 Q128 28 135 45" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <circle cx="78" cy="30" r="7" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <circle cx="92" cy="24" r="6" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <circle cx="106" cy="26" r="6.5" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <circle cx="120" cy="32" r="5.5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      {/* strawberry right */}
      <path d="M152 52 Q160 42 168 52 Q172 64 160 72 Q148 64 152 52Z" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M160 42 Q162 34 164 38" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M158 42 Q156 36 154 40" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* strawberry seeds */}
      <circle cx="158" cy="56" r="1.2" fill="#EDE8D5" opacity="0.5"/>
      <circle cx="162" cy="62" r="1.2" fill="#EDE8D5" opacity="0.5"/>
      <circle cx="156" cy="64" r="1" fill="#EDE8D5" opacity="0.5"/>
      {/* coconut left */}
      <circle cx="38" cy="78" r="16" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M26 72 Q38 64 50 72" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M24 78 Q38 72 52 78" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
      {/* matcha layer */}
      <path d="M65 90 Q100 83 135 90" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="5 5"/>
      {/* pink drizzle layer */}
      <path d="M66 110 Q82 104 98 110 Q114 116 130 110 Q134 108 136 110" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      {/* sparkles */}
      <path d="M28 42 L29 46 L33 47 L29 48 L28 52 L27 48 L23 47 L27 46Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="170" cy="100" r="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IlloMangoParadise() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      {/* matcha cup */}
      <path d="M62 45 L70 140 Q71 148 100 148 Q129 148 130 140 L138 45Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M62 45 Q100 36 138 45" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      {/* straw */}
      <line x1="118" y1="43" x2="134" y2="12" stroke="#EDE8D5" strokeWidth="2.5" strokeLinecap="round"/>
      {/* mango slice left */}
      <path d="M28 55 Q46 55 46 72 Q46 90 28 90" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <path d="M28 55 L28 90" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      <line x1="28" y1="63" x2="44" y2="63" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <line x1="28" y1="72" x2="46" y2="72" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <line x1="28" y1="81" x2="44" y2="81" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      <line x1="36" y1="55" x2="36" y2="90" stroke="#EDE8D5" strokeWidth="1" opacity="0.6"/>
      {/* tropical leaf right */}
      <path d="M155 38 C155 38 170 50 168 70 C166 85 152 92 152 92" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M155 38 C155 38 140 50 142 70 C144 85 152 92 152 92" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="153" y1="38" x2="152" y2="92" stroke="#EDE8D5" strokeWidth="1.2"/>
      <path d="M153 56 Q164 50 166 58" stroke="#EDE8D5" strokeWidth="1" fill="none"/>
      <path d="M153 72 Q142 66 142 74" stroke="#EDE8D5" strokeWidth="1" fill="none"/>
      {/* layer lines */}
      <path d="M65 80 Q100 73 135 80" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
      <path d="M66 108 Q100 102 134 108" stroke="#EDE8D5" strokeWidth="1.2" fill="none" strokeDasharray="3 5"/>
      {/* sun rays */}
      <path d="M100 8 L100 0" stroke="#EDE8D5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M90 10 L86 4" stroke="#EDE8D5" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M110 10 L114 4" stroke="#EDE8D5" strokeWidth="1.5" strokeLinecap="round"/>
      {/* sparkles */}
      <path d="M42 120 L43 124 L47 125 L43 126 L42 130 L41 126 L37 125 L41 124Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="168" cy="110" r="3" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IlloBanoffee() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
      {/* matcha cup */}
      <path d="M62 45 L70 140 Q71 148 100 148 Q129 148 130 140 L138 45Z" stroke="#EDE8D5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M62 45 Q100 36 138 45" stroke="#EDE8D5" strokeWidth="2.5" fill="none"/>
      {/* toffee/caramel drizzle on top */}
      <path d="M68 45 Q80 34 92 40 Q100 30 108 38 Q120 32 132 45" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
      {/* dripping caramel */}
      <path d="M78 45 Q76 55 78 60" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M110 45 Q112 52 110 58" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* banana left */}
      <path d="M26 60 Q16 75 20 92 Q24 102 32 100" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M26 60 Q32 75 30 92 Q29 100 32 100" stroke="#EDE8D5" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* banana slices floating right */}
      <ellipse cx="158" cy="58" rx="12" ry="6" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <ellipse cx="158" cy="58" rx="5" ry="2.5" stroke="#EDE8D5" strokeWidth="1.2" fill="none"/>
      <ellipse cx="162" cy="80" rx="10" ry="5" stroke="#EDE8D5" strokeWidth="1.5" fill="none" transform="rotate(15 162 80)"/>
      {/* toffee wave layer */}
      <path d="M65 85 Q80 78 95 85 Q110 92 125 85 Q132 82 135 85" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      {/* steam wisps */}
      <path d="M85 44 C83 36 87 28 85 20" stroke="#EDE8D5" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M115 44 C113 36 117 28 115 20" stroke="#EDE8D5" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* sparkles */}
      <path d="M40 120 L41 124 L45 125 L41 126 L40 130 L39 126 L35 125 L39 124Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <circle cx="170" cy="110" r="3.5" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M160 38 L161 42 L165 43 L161 44 L160 48 L159 44 L155 43 L159 42Z" stroke="#EDE8D5" strokeWidth="1.3" fill="none"/>
    </svg>
  );
}

/* ── New Ramadan Illustrations ── */

function RIlloHalawaMatcha() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      {/* matcha cup */}
      <path d="M48 38 L55 124 Q56 132 90 132 Q124 132 125 124 L132 38Z" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M48 38 Q90 30 132 38" stroke="#1E3B20" strokeWidth="2.5" fill="none"/>
      {/* halawa swirl top */}
      <path d="M56 38 Q68 24 90 22 Q112 24 124 38" stroke="#1E3B20" strokeWidth="2" fill="none"/>
      <path d="M68 30 Q90 20 112 30" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      {/* halawa/sesame texture - fibrous lines */}
      <path d="M62 68 Q76 62 90 68 Q104 74 118 68" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <path d="M64 78 Q78 72 90 78 Q102 84 116 78" stroke="#1E3B20" strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
      {/* halawa block left */}
      <rect x="14" y="58" width="28" height="22" rx="4" stroke="#1E3B20" strokeWidth="2" fill="none"/>
      <line x1="14" y1="66" x2="42" y2="66" stroke="#1E3B20" strokeWidth="1" opacity="0.5"/>
      <line x1="14" y1="72" x2="42" y2="72" stroke="#1E3B20" strokeWidth="1" opacity="0.5"/>
      {/* sesame seeds scattered */}
      <ellipse cx="150" cy="56" rx="4" ry="2.5" stroke="#1E3B20" strokeWidth="1.3" fill="none" transform="rotate(-20 150 56)"/>
      <ellipse cx="158" cy="68" rx="3.5" ry="2" stroke="#1E3B20" strokeWidth="1.3" fill="none" transform="rotate(15 158 68)"/>
      <ellipse cx="148" cy="78" rx="3" ry="2" stroke="#1E3B20" strokeWidth="1.2" fill="none" transform="rotate(-10 148 78)"/>
      {/* sparkles */}
      <path d="M28 100 L29 104 L33 105 L29 106 L28 110 L27 106 L23 105 L27 104Z" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <circle cx="160" cy="108" r="3" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function RIlloHalawaLatte() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      {/* latte cup */}
      <path d="M36 52 L42 124 Q43 132 90 132 Q137 132 138 124 L144 52Z" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36 52 Q90 43 144 52" stroke="#1E3B20" strokeWidth="2.5" fill="none"/>
      <path d="M144 65 Q158 65 158 82 Q158 99 144 99" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* steam */}
      <path d="M62 52 C60 42 64 34 62 24" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M90 49 C88 37 92 27 90 15" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M118 52 C116 42 120 34 118 24" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* halawa swirl latte art */}
      <path d="M70 82 Q90 74 110 82" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <path d="M75 90 Q90 82 105 90" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
      <path d="M80 98 Q90 92 100 98" stroke="#1E3B20" strokeWidth="1" fill="none"/>
      {/* halawa block left */}
      <rect x="8" y="64" width="24" height="18" rx="3" stroke="#1E3B20" strokeWidth="2" fill="none"/>
      <line x1="8" y1="70" x2="32" y2="70" stroke="#1E3B20" strokeWidth="1" opacity="0.5"/>
      <line x1="8" y1="76" x2="32" y2="76" stroke="#1E3B20" strokeWidth="1" opacity="0.5"/>
      {/* crumbled halawa pieces */}
      <path d="M16 88 L20 86 L24 90 L18 92Z" stroke="#1E3B20" strokeWidth="1.3" fill="none"/>
      <path d="M26 86 L30 84 L32 88 L28 90Z" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
      {/* sesame seeds */}
      <ellipse cx="152" cy="42" rx="3.5" ry="2" stroke="#1E3B20" strokeWidth="1.3" fill="none" transform="rotate(-25 152 42)"/>
      <ellipse cx="162" cy="50" rx="3" ry="1.8" stroke="#1E3B20" strokeWidth="1.2" fill="none" transform="rotate(10 162 50)"/>
      {/* sparkles */}
      <path d="M150 116 L151 120 L155 121 L151 122 L150 126 L149 122 L145 121 L149 120Z" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <circle cx="24" cy="108" r="3" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

/* Ramadan illustration helpers use green strokes */
function RIlloDateCaramel() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
      <path d="M42 38 L50 132 Q51 140 80 140 Q109 140 110 132 L118 38Z" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="80" cy="38" rx="38" ry="9" stroke="#1E3B20" strokeWidth="2.5" fill="none"/>
      <line x1="98" y1="36" x2="112" y2="10" stroke="#1E3B20" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="130" cy="60" rx="12" ry="8" stroke="#1E3B20" strokeWidth="2" fill="none" transform="rotate(-20 130 60)"/>
      <path d="M130 52 Q132 44 134 48" stroke="#1E3B20" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="138" cy="80" rx="10" ry="7" stroke="#1E3B20" strokeWidth="1.8" fill="none" transform="rotate(15 138 80)"/>
      <path d="M140 73 Q142 66 144 70" stroke="#1E3B20" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M25 68 Q15 80 18 95 Q21 104 28 102" stroke="#1E3B20" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M25 68 Q30 80 28 95 Q27 104 28 102" stroke="#1E3B20" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M45 80 Q58 74 72 80 Q86 86 100 80 Q110 75 115 80" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
      <path d="M26 30 L27 34 L31 35 L27 36 L26 40 L25 36 L21 35 L25 34Z" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <circle cx="140" cy="110" r="3.5" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function RIlloDateMatcha() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      <path d="M48 38 L55 124 Q56 132 90 132 Q124 132 125 124 L132 38Z" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M48 38 Q90 30 132 38" stroke="#1E3B20" strokeWidth="2.5" fill="none"/>
      <path d="M52 38 Q63 24 90 22 Q117 24 128 38" stroke="#1E3B20" strokeWidth="2" fill="none"/>
      <circle cx="72" cy="26" r="7" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
      <circle cx="90" cy="22" r="6" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
      <circle cx="108" cy="26" r="7" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
      <path d="M52 75 Q68 68 84 75 Q100 82 116 75 Q126 70 130 76" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
      <ellipse cx="152" cy="72" rx="8" ry="14" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
      <line x1="152" y1="58" x2="152" y2="86" stroke="#1E3B20" strokeWidth="1.2"/>
      <line x1="146" y1="65" x2="158" y2="65" stroke="#1E3B20" strokeWidth="1"/>
      <line x1="144" y1="72" x2="160" y2="72" stroke="#1E3B20" strokeWidth="1"/>
      <line x1="146" y1="79" x2="158" y2="79" stroke="#1E3B20" strokeWidth="1"/>
      <path d="M28 68 L29 72 L33 73 L29 74 L28 78 L27 74 L23 73 L27 72Z" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <circle cx="160" cy="110" r="3" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function RIlloTahiniHoneyMatcha() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      <path d="M48 38 L55 124 Q56 132 90 132 Q124 132 125 124 L132 38Z" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M48 38 Q90 30 132 38" stroke="#1E3B20" strokeWidth="2.5" fill="none"/>
      <path d="M62 38 Q75 26 90 24 Q105 26 118 38" stroke="#1E3B20" strokeWidth="2" fill="none"/>
      <path d="M72 30 Q90 22 108 30" stroke="#1E3B20" strokeWidth="1.5" fill="none" strokeDasharray="3 3"/>
      <line x1="32" y1="12" x2="32" y2="90" stroke="#1E3B20" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="100" r="14" stroke="#1E3B20" strokeWidth="2" fill="none"/>
      <line x1="22" y1="92" x2="42" y2="92" stroke="#1E3B20" strokeWidth="1.2"/>
      <line x1="20" y1="98" x2="44" y2="98" stroke="#1E3B20" strokeWidth="1.2"/>
      <line x1="20" y1="104" x2="44" y2="104" stroke="#1E3B20" strokeWidth="1.2"/>
      <line x1="22" y1="110" x2="42" y2="110" stroke="#1E3B20" strokeWidth="1.2"/>
      <path d="M32 114 Q32 122 30 126 Q28 132 32 136 Q36 132 34 126 Q32 122 32 114" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <path d="M52 76 Q68 70 84 76 Q100 82 116 76 Q124 72 130 76" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
      <path d="M152 60 L153 64 L157 65 L153 66 L152 70 L151 66 L147 65 L151 64Z" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <circle cx="160" cy="110" r="3" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function RIlloDateLatte() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      <path d="M36 52 L42 124 Q43 132 90 132 Q137 132 138 124 L144 52Z" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36 52 Q90 43 144 52" stroke="#1E3B20" strokeWidth="2.5" fill="none"/>
      <path d="M144 65 Q158 65 158 82 Q158 99 144 99" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M62 52 C60 42 64 34 62 24" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M90 49 C88 37 92 27 90 15" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M118 52 C116 42 120 34 118 24" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M90 88 Q98 80 104 88 Q110 96 90 96 Q70 96 76 88 Q82 80 90 88Z" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <ellipse cx="26" cy="80" rx="12" ry="9" stroke="#1E3B20" strokeWidth="2" fill="none"/>
      <path d="M26 71 Q28 63 30 67" stroke="#1E3B20" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="70" cy="68" r="2" fill="#1E3B20" opacity="0.4"/>
      <circle cx="84" cy="65" r="1.5" fill="#1E3B20" opacity="0.4"/>
      <circle cx="100" cy="68" r="2" fill="#1E3B20" opacity="0.4"/>
      <circle cx="114" cy="65" r="1.5" fill="#1E3B20" opacity="0.4"/>
      <path d="M150 122 L151 126 L155 127 L151 128 L150 132 L149 128 L145 127 L149 126Z" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function RIlloTahiniHoneyLatte() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      <path d="M36 52 L42 124 Q43 132 90 132 Q137 132 138 124 L144 52Z" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36 52 Q90 43 144 52" stroke="#1E3B20" strokeWidth="2.5" fill="none"/>
      <path d="M144 65 Q158 65 158 82 Q158 99 144 99" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M62 52 C60 42 64 34 62 24" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M90 49 C88 37 92 27 90 15" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M118 52 C116 42 120 34 118 24" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M70 84 Q90 76 110 84" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <path d="M75 92 Q90 84 105 92" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
      <path d="M148 60 Q148 56 152 54 L162 54 Q166 56 166 60 L168 90 Q168 96 158 96 Q148 96 148 90Z" stroke="#1E3B20" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M152 54 L152 48 Q158 44 164 48 L164 54" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="148" y1="68" x2="168" y2="68" stroke="#1E3B20" strokeWidth="1.2" strokeDasharray="3 3"/>
      <path d="M158 96 Q155 106 158 114" stroke="#1E3B20" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M24 62 L25 66 L29 67 L25 68 L24 72 L23 68 L19 67 L23 66Z" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
      <circle cx="30" cy="112" r="3" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function WaveBreaker() {
  return (
    <div className="wrap">
      <div className="breaker reveal">
        <svg width="340" height="30" viewBox="0 0 340 30" fill="none">
          <path d="M0 15 Q42 4 85 15 Q127 26 170 15 Q212 4 255 15 Q297 26 340 15" stroke="#EDE8D5" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

function ChoosePathCupIllo() {
  return (
    <svg className="choose-card-illo" viewBox="0 0 120 150" fill="none">
      <path d="M28 42 L34 128 Q35 136 60 136 Q85 136 86 128 L92 42Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="60" cy="42" rx="32" ry="8" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M31 42 Q40 28 60 25 Q80 28 89 42" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="46" cy="30" r="7" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="60" cy="25" r="6" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <circle cx="74" cy="30" r="7" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      <line x1="76" y1="40" x2="90" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M31 85 Q60 78 89 85" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
      <path d="M8 60 L9 64 L13 65 L9 66 L8 70 L7 66 L3 65 L7 64Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="104" cy="52" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M100 100 L101 104 L105 105 L101 106 L100 110 L99 106 L95 105 L99 104Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    </svg>
  );
}

function ChoosePathGiftIllo() {
  return (
    <svg className="choose-card-illo" viewBox="0 0 120 150" fill="none">
      <rect x="18" y="60" width="84" height="70" rx="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="12" y="44" width="96" height="20" rx="5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="60" y1="44" x2="60" y2="130" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="12" y1="54" x2="108" y2="54" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M60 44 Q44 28 34 36 Q28 44 44 48 Q52 50 60 44Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M60 44 Q76 28 86 36 Q92 44 76 48 Q68 50 60 44Z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="60" cy="44" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M28 78 Q38 72 48 78" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 4"/>
      <path d="M4 44 L5 48 L9 49 L5 50 L4 54 L3 50 L-1 49 L3 48Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <circle cx="112" cy="42" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M100 110 L101 113 L104 114 L101 115 L100 118 L99 115 L96 114 L99 113Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M52 90 Q52 82 60 82 Q68 82 68 90 Q68 96 60 98" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="60" cy="108" r="2.5" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

function FooterCharacters() {
  return (
    <svg style={{display:'block',margin:'0 auto 36px',width:360,opacity:0.13}} viewBox="0 0 360 72" fill="none">
      <circle cx="48" cy="22" r="14" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <line x1="48" y1="36" x2="48" y2="58" stroke="#EDE8D5" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M48 46 Q36 40 30 46" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M48 46 Q60 40 66 46" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M48 58 Q40 65 35 66" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M48 58 Q56 65 61 66" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M30 36 Q26 30 26 36 L27 48 Q27 52 30 52 Q33 52 33 48 L34 36 Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M30 36 Q32 33 34 36" stroke="#EDE8D5" strokeWidth="1.2" fill="none"/>
      <circle cx="180" cy="20" r="16" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <line x1="180" y1="36" x2="180" y2="60" stroke="#EDE8D5" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M180 48 Q166 42 160 48" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M180 48 Q194 42 200 48" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M180 60 Q172 67 167 68" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M180 60 Q188 67 193 68" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M200 38 Q196 32 196 38 L197 50 Q197 54 200 54 Q203 54 203 50 L204 38 Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M200 38 Q202 35 204 38" stroke="#EDE8D5" strokeWidth="1.2" fill="none"/>
      <circle cx="312" cy="22" r="14" stroke="#EDE8D5" strokeWidth="1.8" fill="none"/>
      <line x1="312" y1="36" x2="312" y2="58" stroke="#EDE8D5" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M312 46 Q300 40 294 46" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M312 46 Q324 40 330 46" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M312 58 Q304 65 299 66" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M312 58 Q320 65 325 66" stroke="#EDE8D5" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M294 36 Q290 30 290 36 L291 48 Q291 52 294 52 Q297 52 297 48 L298 36 Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
      <path d="M294 36 Q296 33 298 36" stroke="#EDE8D5" strokeWidth="1.2" fill="none"/>
      <path d="M82 54 Q130 46 158 54" stroke="#EDE8D5" strokeWidth="1" fill="none" strokeDasharray="4 5"/>
      <path d="M216 54 Q264 46 290 54" stroke="#EDE8D5" strokeWidth="1" fill="none" strokeDasharray="4 5"/>
    </svg>
  );
}

/* ─────────────── MAIN PAGE COMPONENT ─────────────── */

export default function SipsPage() {
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
        <a href="https://euforyc.co.uk" className="nav-logo">
          euforyc <span>sips</span>
        </a>
        <ul className="nav-links">
          <li><a href="#smoothies">smoothies</a></li>
          <li><a href="#matcha">matcha</a></li>
          <li><a href="#coffee">coffee</a></li>
          <li><a href="#ramadan">🌙 ramadan</a></li>
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

        <div className="secret-stamp">
          <div className="stamp-inner">
            <span className="stamp-dot" />
            secret menu
            <span className="stamp-dot" />
          </div>
        </div>

        <p className="secret-label">&mdash; the secret menu &mdash;</p>
        <h1 className="hero-h1">
          euforyc
          <br />
          <span className="sips">sips</span>
        </h1>
        <p className="hero-byline">wellness &middot; ritual &middot; nourishment</p>
        <p className="hero-desc">
          our hidden menu, crafted for those who want more.
          <br />
          ask for it by name.
        </p>

        <div className="scroll-cue">
          <span>scroll &darr;</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* SECRET MENU MARQUEE BANNER */}
      <div className="secret-banner">
        <div className="marquee-track">
          {[...Array(3)].map((_, g) => (
            <div key={g} style={{ display: 'flex' }}>
              <div className="marquee-item"><span className="marquee-dot" /> secret menu <span>&middot;</span></div>
              <div className="marquee-item"><span className="marquee-dot" /> ask for it by name <span>&middot;</span></div>
              <div className="marquee-item"><span className="marquee-dot" /> euforyc sips <span>&middot;</span></div>
              <div className="marquee-item"><span className="marquee-dot" /> wellness ritual <span>&middot;</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* CHOOSE YOUR PATH */}
      <section className="choose-wrap">
        <svg className="choose-doodle cd-1" viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="35" r="30" stroke="#1E3B20" strokeWidth="1.8" strokeDasharray="4 6" fill="none"/>
          <circle cx="35" cy="35" r="12" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
          <circle cx="35" cy="35" r="4" fill="#1E3B20" opacity="0.5"/>
        </svg>
        <svg className="choose-doodle cd-2" viewBox="0 0 60 90" fill="none">
          <path d="M30 82 C30 82 6 62 6 42 C6 22 30 6 30 6 C30 6 54 22 54 42 C54 62 30 82 30 82Z" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
          <line x1="30" y1="82" x2="30" y2="6" stroke="#1E3B20" strokeWidth="1.3"/>
          <path d="M30 42 Q44 28 52 40" stroke="#1E3B20" strokeWidth="1.3" fill="none"/>
          <path d="M30 42 Q16 28 8 40" stroke="#1E3B20" strokeWidth="1.3" fill="none"/>
        </svg>
        <svg className="choose-doodle cd-3" viewBox="0 0 56 56" fill="none">
          <path d="M28 4 L33 18 L48 18 L36 27 L41 42 L28 33 L15 42 L20 27 L8 18 L23 18Z" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="choose-doodle cd-4" viewBox="0 0 80 30" fill="none">
          <path d="M0 15 Q20 4 40 15 Q60 26 80 15" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </svg>

        <div className="choose-inner">
          <p className="choose-label">what would you like to do?</p>
          <div className="choose-cards">
            <a href="#smoothies" className="choose-card choose-card--menu">
              <ChoosePathCupIllo />
              <div className="choose-card-text">
                <h3>view the menu</h3>
                <p>explore our secret drinks</p>
              </div>
              <span className="choose-arrow">&darr;</span>
            </a>

            <div className="choose-or">
              <svg width="2" height="60" viewBox="0 0 2 60"><line x1="1" y1="0" x2="1" y2="60" stroke="#1E3B20" strokeWidth="1.5" strokeDasharray="4 5"/></svg>
              <span>or</span>
              <svg width="2" height="60" viewBox="0 0 2 60"><line x1="1" y1="0" x2="1" y2="60" stroke="#1E3B20" strokeWidth="1.5" strokeDasharray="4 5"/></svg>
            </div>

            <a href="#mystery-gift" className="choose-card choose-card--gift">
              <ChoosePathGiftIllo />
              <div className="choose-card-text">
                <h3>reveal mystery gift</h3>
                <p>a little something just for you</p>
              </div>
              <span className="choose-arrow">&darr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* CAT NAV */}
      <div className="cat-nav">
        <a href="#smoothies">smoothies</a>
        <a href="#matcha">matcha</a>
        <a href="#coffee">coffee</a>
        <a href="#ramadan">🌙 ramadan</a>
      </div>

      {/* ─── SMOOTHIES ─── */}
      <section className="menu-sec" id="smoothies">
        <svg style={{position:'absolute',right:-20,top:80,width:160,opacity:0.06,pointerEvents:'none',animation:'float 10s ease-in-out infinite'}} viewBox="0 0 130 200" fill="none">
          <path d="M65 190 C65 190 12 148 12 100 C12 52 65 10 65 10 C65 10 118 52 118 100 C118 148 65 190 65 190Z" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
          <line x1="65" y1="190" x2="65" y2="10" stroke="#EDE8D5" strokeWidth="1.5"/>
          <path d="M65 100 Q92 76 112 95" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
          <path d="M65 100 Q38 76 18 95" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
          <path d="M65 145 Q88 125 106 138" stroke="#EDE8D5" strokeWidth="1.3" fill="none"/>
          <path d="M65 145 Q42 125 24 138" stroke="#EDE8D5" strokeWidth="1.3" fill="none"/>
        </svg>
        <svg style={{position:'absolute',left:20,bottom:120,width:55,opacity:0.08,pointerEvents:'none',animation:'wobble 7s ease-in-out infinite'}} viewBox="0 0 55 55" fill="none">
          <path d="M27 4 L31 14 L43 14 L33 21 L37 32 L27 25 L17 32 L21 21 L11 14 L23 14Z" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
        </svg>

        <div className="wrap">
          <div className="sec-header reveal">
            <h2 className="sec-title">smoothies</h2>
            <p className="sec-note">collagen boosted &middot; organic<br />wellness blends</p>
          </div>
          <div className="grid-2">
            <div className="card reveal">
              <div className="card-illo-panel"><IlloPinkGlow /></div>
              <div className="card-body">
                <h3 className="card-name">euforyc pink glow</h3>
                <p className="card-tagline">&ldquo;for your skin, your soul, your softest self.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">your daily beauty ritual in a glass &mdash; antioxidant-rich and collagen-boosted to help you glow from the inside out.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">coconut milk &middot; strawberry &middot; banana &middot; greek yoghurt &middot; honey &middot; dates &middot; vanilla collagen &middot; avocado &middot; coconut cream &middot; raspberries</p>
              </div>
            </div>

            <div className="card reveal">
              <div className="card-illo-panel"><IlloDragonRitual /></div>
              <div className="card-body">
                <h3 className="card-name">euforyc dragon ritual</h3>
                <p className="card-tagline">&ldquo;wake up. rise. repeat.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">iron-rich and vitamin C-packed to fuel your fire &mdash; bold in colour, bolder in energy.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">almond milk &middot; dragonfruit &middot; strawberries &middot; vanilla &middot; greek yoghurt or coconut cream &middot; vanilla collagen</p>
              </div>
            </div>

            <div className="card reveal">
              <div className="card-illo-panel"><IlloBlueRadiance /></div>
              <div className="card-body">
                <h3 className="card-name">euforyc blue radiance</h3>
                <p className="card-tagline">&ldquo;reset, restore, radiate.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">spirulina detoxifies, pineapple restores and avocado nourishes &mdash; your full-body reset in every sip.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">coconut milk &middot; organic pineapple &middot; organic banana &middot; organic avocado &middot; blue spirulina &middot; organic coconut cream or greek yoghurt &middot; honey &middot; grass-fed vanilla collagen</p>
              </div>
            </div>

            <div className="card reveal">
              <div className="card-illo-panel"><IlloGoldenAura /></div>
              <div className="card-body">
                <h3 className="card-name">euforyc golden aura</h3>
                <p className="card-tagline">&ldquo;sunshine in a cup.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">tropical, uplifting and mood-boosting &mdash; because you deserve to feel warm on the inside too.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">almond milk &middot; organic mango &middot; organic pineapple &middot; organic banana &middot; organic coconut flakes &middot; organic coconut cream or greek yoghurt &middot; organic maple syrup &middot; organic grass-fed vanilla collagen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveBreaker />

      {/* ─── MATCHA ─── */}
      <section className="menu-sec" id="matcha">
        <svg style={{position:'absolute',left:-10,top:120,width:130,opacity:0.06,pointerEvents:'none',animation:'float 11s ease-in-out 2s infinite'}} viewBox="0 0 110 170" fill="none">
          <path d="M55 160 C55 160 10 126 10 86 C10 46 55 10 55 10 C55 10 100 46 100 86 C100 126 55 160 55 160Z" stroke="#EDE8D5" strokeWidth="2" fill="none"/>
          <line x1="55" y1="160" x2="55" y2="10" stroke="#EDE8D5" strokeWidth="1.5"/>
          <path d="M55 86 Q78 64 96 82" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
          <path d="M55 86 Q32 64 14 82" stroke="#EDE8D5" strokeWidth="1.5" fill="none"/>
        </svg>

        <div className="wrap">
          <div className="sec-header reveal">
            <h2 className="sec-title">matcha</h2>
            <p className="sec-note">ceremonial grade<br />secret blends</p>
          </div>
          <div className="grid-2 reveal">
            <div className="card">
              <div className="card-illo-panel"><IlloCocoCloud /></div>
              <div className="card-body">
                <h3 className="card-name">coco cloud matcha</h3>
                <p className="card-tagline">&ldquo;light enough to float on.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">hydrating, earthy and dreamy &mdash; matcha like you&apos;ve never had it.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">ceremonial grade matcha &middot; vita coco coconut water &middot; coconut cold foam</p>
              </div>
            </div>

            <div className="card">
              <div className="card-illo-panel"><IlloButterscotchCookie /></div>
              <div className="card-body">
                <h3 className="card-name">butterscotch cookie matcha</h3>
                <p className="card-tagline">&ldquo;the one you didn&apos;t know you needed.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">our most indulgent secret &mdash; because balance is a lifestyle, not a rule.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">ceremonial matcha &middot; butterscotch &middot; cookie crumble</p>
              </div>
            </div>

            <div className="card">
              <div className="card-illo-panel"><IlloStrawCocoCloud /></div>
              <div className="card-body">
                <h3 className="card-name">straw coco cloud matcha</h3>
                <p className="card-tagline">&ldquo;berry bliss meets cloud nine.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">strawberry sweetness layered with coconut cloud foam and ceremonial matcha &mdash; tropical, dreamy and naturally pink.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">ceremonial grade matcha &middot; strawberry &middot; coconut milk &middot; coconut cold foam</p>
              </div>
            </div>

            <div className="card">
              <div className="card-illo-panel"><IlloMangoParadise /></div>
              <div className="card-body">
                <h3 className="card-name">mango paradise matcha</h3>
                <p className="card-tagline">&ldquo;sunshine in every layer.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">tropical mango meets earthy matcha &mdash; a paradise you can sip on, bright, refreshing and mood-lifting.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">ceremonial grade matcha &middot; mango &middot; coconut milk</p>
              </div>
            </div>

            <div className="card">
              <div className="card-illo-panel"><IlloBanoffee /></div>
              <div className="card-body">
                <h3 className="card-name">banoffee matcha</h3>
                <p className="card-tagline">&ldquo;dessert, but make it matcha.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">banana, toffee and ceremonial matcha blended into one indulgent moment &mdash; sweet, creamy and completely addictive.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">ceremonial grade matcha &middot; banana &middot; toffee &middot; oat milk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveBreaker />

      {/* ─── COFFEE ─── */}
      <section className="menu-sec" id="coffee">
        <div className="wrap">
          <div className="sec-header reveal">
            <h2 className="sec-title">coffee</h2>
            <p className="sec-note">specialty espresso &middot; elevated</p>
          </div>
          <div className="grid-2">
            <div className="card reveal">
              <div className="card-illo-panel"><IlloMontBlanc /></div>
              <div className="card-body">
                <h3 className="card-name">mont blanc</h3>
                <p className="card-tagline">&ldquo;for the ones who know.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">espresso elevated with grapefruit and orange zest. bright, complex and quietly sophisticated &mdash; a coffee moment that stays with you.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">espresso &middot; grapefruit &middot; orange zest</p>
              </div>
            </div>

            <div className="card reveal">
              <div className="card-illo-panel"><IlloBrownSugarEspresso /></div>
              <div className="card-body">
                <h3 className="card-name">brown sugar shaken espresso</h3>
                <p className="card-tagline">&ldquo;shake things up.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">bold espresso shaken with brown sugar and ice &mdash; sweet, smooth and impossible to put down.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">espresso &middot; brown sugar &middot; ice &middot; oat milk</p>
              </div>
            </div>

            <div className="card reveal">
              <div className="card-illo-panel"><IlloPistachioLatte /></div>
              <div className="card-body">
                <h3 className="card-name">blended pistachio spanish latte</h3>
                <p className="card-tagline">&ldquo;indulgence, blended.&rdquo;</p>
                <div className="card-rule" />
                <p className="card-desc">creamy, nutty and blended to perfection &mdash; a spanish latte with a pistachio twist that feels like a treat.</p>
                <p className="ing-lbl">ingredients</p>
                <p className="ings">espresso &middot; pistachio &middot; condensed milk &middot; ice &middot; milk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RAMADAN ─── */}
      <div className="ramadan" id="ramadan">
        <svg className="r-bg" style={{top:-40,right:-40,width:300}} viewBox="0 0 220 220" fill="none">
          <path d="M110 10 C162 10 200 52 200 110 C200 162 162 200 110 200" stroke="#1E3B20" strokeWidth="2" fill="none"/>
          <path d="M110 10 C58 10 20 52 20 110 C20 142 34 168 58 184" stroke="#1E3B20" strokeWidth="1.5" fill="none" strokeDasharray="4 7"/>
          <circle cx="140" cy="180" r="12" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
        </svg>
        <svg className="r-bg" style={{bottom:20,left:20,width:160}} viewBox="0 0 110 160" fill="none">
          <path d="M55 150 C55 150 14 118 14 82 C14 46 55 10 55 10 C55 10 96 46 96 82 C96 118 55 150 55 150Z" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
          <line x1="55" y1="150" x2="55" y2="10" stroke="#1E3B20" strokeWidth="1.2"/>
          <path d="M55 82 Q76 62 92 78" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
          <path d="M55 82 Q34 62 18 78" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
        </svg>
        <svg className="r-bg" style={{top:'40%',right:'5%',width:110}} viewBox="0 0 90 90" fill="none">
          <path d="M45 8 L52 30 L76 30 L57 44 L64 68 L45 54 L26 68 L33 44 L14 30 L38 30Z" stroke="#1E3B20" strokeWidth="1.8" fill="none"/>
        </svg>

        <div className="wrap">
          <div className="r-header reveal">
            <span className="r-moon">🌙</span>
            <p className="r-eyebrow">limited time &middot; ramadan 2025</p>
            <h2 className="r-title">
              ramadan <em>exclusive</em>
              <br />
              at euforyc sips
            </h2>
            <p className="r-desc">made to nourish, restore and celebrate.<br />available for a limited time this ramadan.</p>
          </div>

          {/* Ramadan - Smoothies */}
          <div className="r-cat reveal">
            <p className="r-cat-label">smoothies</p>
            <div className="grid-1">
              <div className="r-card r-horizontal" style={{ maxWidth: 740 }}>
                <div className="card-illo-panel"><RIlloDateCaramel /></div>
                <div className="card-body">
                  <h3 className="card-name">date caramel banana</h3>
                  <p className="card-tagline">&ldquo;nature&apos;s sweetest gift, elevated.&rdquo;</p>
                  <div className="card-rule" />
                  <p className="card-desc">naturally sweet, deeply nourishing and gentle on the stomach &mdash; everything you need to break your fast beautifully.</p>
                  <p className="ing-lbl">ingredients</p>
                  <p className="ings">medjool dates &middot; banana &middot; coconut cream &middot; vanilla &middot; almond milk &middot; sea salt &middot; vanilla collagen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ramadan - Matcha */}
          <div className="r-cat reveal">
            <p className="r-cat-label">matcha</p>
            <div className="grid-2">
              <div className="r-card">
                <div className="card-illo-panel"><RIlloDateMatcha /></div>
                <div className="card-body">
                  <h3 className="card-name">date matcha</h3>
                  <p className="card-tagline">&ldquo;earth meets earth.&rdquo;</p>
                  <div className="card-rule" />
                  <p className="card-desc">grounding, naturally sweet and quietly indulgent &mdash; your new ramadan ritual.</p>
                  <p className="ing-lbl">ingredients</p>
                  <p className="ings">ceremonial grade matcha &middot; medjool date syrup &middot; cardamom &middot; oat milk cold foam</p>
                </div>
              </div>
              <div className="r-card">
                <div className="card-illo-panel"><RIlloTahiniHoneyMatcha /></div>
                <div className="card-body">
                  <h3 className="card-name">tahini molasses matcha</h3>
                  <p className="card-tagline">&ldquo;unexpectedly perfect.&rdquo;</p>
                  <div className="card-rule" />
                  <p className="card-desc">nutty, rich and deeply satisfying &mdash; the combination you never knew you needed.</p>
                  <p className="ing-lbl">ingredients</p>
                  <p className="ings">ceremonial matcha &middot; creamy tahini &middot; molasses &middot; oat milk</p>
                </div>
              </div>
              <div className="r-card">
                <div className="card-illo-panel"><RIlloHalawaMatcha /></div>
                <div className="card-body">
                  <h3 className="card-name">halawa matcha</h3>
                  <p className="card-tagline">&ldquo;nostalgia in a cup.&rdquo;</p>
                  <div className="card-rule" />
                  <p className="card-desc">creamy halawa blended with ceremonial matcha &mdash; sweet, sesame-rich and deeply comforting.</p>
                  <p className="ing-lbl">ingredients</p>
                  <p className="ings">ceremonial grade matcha &middot; halawa &middot; oat milk &middot; oat milk cold foam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ramadan - Lattes */}
          <div className="r-cat reveal">
            <p className="r-cat-label">lattes</p>
            <div className="grid-2">
              <div className="r-card">
                <div className="card-illo-panel"><RIlloDateLatte /></div>
                <div className="card-body">
                  <h3 className="card-name">date latte</h3>
                  <p className="card-tagline">&ldquo;the caramel you&apos;ve been looking for.&rdquo;</p>
                  <div className="card-rule" />
                  <p className="card-desc">naturally sweet, warm and soul-filling &mdash; your iftar moment in a cup.</p>
                  <p className="ing-lbl">ingredients</p>
                  <p className="ings">espresso &middot; medjool date syrup &middot; oat milk &middot; pinch of sea salt</p>
                </div>
              </div>
              <div className="r-card">
                <div className="card-illo-panel"><RIlloTahiniHoneyLatte /></div>
                <div className="card-body">
                  <h3 className="card-name">tahini molasses latte</h3>
                  <p className="card-tagline">&ldquo;rich. warm. addictive.&rdquo;</p>
                  <div className="card-rule" />
                  <p className="card-desc">bold meets mellow &mdash; a latte that lingers in the best way possible.</p>
                  <p className="ing-lbl">ingredients</p>
                  <p className="ings">espresso &middot; tahini &middot; molasses &middot; steamed oat milk</p>
                </div>
              </div>
              <div className="r-card">
                <div className="card-illo-panel"><RIlloHalawaLatte /></div>
                <div className="card-body">
                  <h3 className="card-name">halawa latte</h3>
                  <p className="card-tagline">&ldquo;home in a cup.&rdquo;</p>
                  <div className="card-rule" />
                  <p className="card-desc">rich espresso meets creamy halawa &mdash; sweet, sesame-kissed and soul-warming for your iftar.</p>
                  <p className="ing-lbl">ingredients</p>
                  <p className="ings">espresso &middot; halawa &middot; steamed oat milk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE CTA */}
      <section className="share-cta" id="mystery-gift">
        <svg className="cta-doodle cta-doodle-l" viewBox="0 0 80 120" fill="none">
          <path d="M40 112 C40 112 8 86 8 58 C8 30 40 8 40 8 C40 8 72 30 72 58 C72 86 40 112 40 112Z" stroke="#1E3B20" strokeWidth="2" fill="none"/>
          <line x1="40" y1="112" x2="40" y2="8" stroke="#1E3B20" strokeWidth="1.5"/>
          <path d="M40 58 Q58 40 70 54" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
          <path d="M40 58 Q22 40 10 54" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
          <path d="M40 84 Q54 70 65 78" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
          <path d="M40 84 Q26 70 15 78" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
        </svg>
        <svg className="cta-doodle cta-doodle-r" viewBox="0 0 90 90" fill="none">
          <path d="M45 6 L53 28 L78 28 L58 43 L66 66 L45 51 L24 66 L32 43 L12 28 L37 28Z" stroke="#1E3B20" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="cta-doodle cta-doodle-tr" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="20" stroke="#1E3B20" strokeWidth="1.5" strokeDasharray="4 6" fill="none"/>
          <circle cx="25" cy="25" r="8" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
        </svg>
        <svg className="cta-doodle cta-doodle-bl" viewBox="0 0 80 50" fill="none">
          <path d="M40 25 Q24 8 14 16 Q8 24 24 28 Q32 30 40 25Z" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M40 25 Q56 8 66 16 Q72 24 56 28 Q48 30 40 25Z" stroke="#1E3B20" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <circle cx="40" cy="25" r="5" stroke="#1E3B20" strokeWidth="1.5" fill="none"/>
        </svg>

        <div className="cta-inner">
          <svg className="cta-ig-icon" viewBox="0 0 64 64" fill="none">
            <rect x="6" y="6" width="52" height="52" rx="14" stroke="#1E3B20" strokeWidth="2.5" fill="none"/>
            <circle cx="32" cy="32" r="13" stroke="#1E3B20" strokeWidth="2.5" fill="none"/>
            <circle cx="48" cy="16" r="3.5" fill="#1E3B20"/>
          </svg>

          <div className="cta-text-block">
            <p className="cta-eyebrow">psst&thinsp;&mdash;&thinsp;you found it 🤫</p>
            <h2 className="cta-heading">
              share us on your story
              <br />
              <span>get 20% off your order</span>
            </h2>
            <p className="cta-sub">
              tag <strong>@euforycsips</strong> with the secret menu &amp; we&apos;ll slide into your dms with the code ;)
            </p>
          </div>

          <a href="https://instagram.com/euforycsips" target="_blank" rel="noopener noreferrer" className="cta-btn">
            <svg width="20" height="20" viewBox="0 0 64 64" fill="none">
              <rect x="6" y="6" width="52" height="52" rx="14" stroke="currentColor" strokeWidth="3" fill="none"/>
              <circle cx="32" cy="32" r="13" stroke="currentColor" strokeWidth="3" fill="none"/>
              <circle cx="48" cy="16" r="3.5" fill="currentColor"/>
            </svg>
            share &amp; claim 20% off
          </a>

          <svg className="cta-wink-char" viewBox="0 0 80 110" fill="none">
            <circle cx="40" cy="26" r="20" stroke="#1E3B20" strokeWidth="2" fill="none"/>
            <path d="M32 24 Q35 21 38 24" stroke="#1E3B20" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="48" cy="23" r="2.5" fill="#1E3B20"/>
            <path d="M33 32 Q40 40 47 32" stroke="#1E3B20" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <line x1="40" y1="46" x2="40" y2="78" stroke="#1E3B20" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M40 56 Q26 44 18 36" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M40 56 Q54 44 62 36" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <circle cx="18" cy="36" r="4" stroke="#1E3B20" strokeWidth="2" fill="none"/>
            <circle cx="62" cy="36" r="4" stroke="#1E3B20" strokeWidth="2" fill="none"/>
            <path d="M40 78 Q32 92 28 106" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M40 78 Q48 92 52 106" stroke="#1E3B20" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M6 54 L7 58 L11 59 L7 60 L6 64 L5 60 L1 59 L5 58Z" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
            <circle cx="72" cy="58" r="3" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
            <path d="M66 76 L67 79 L70 80 L67 81 L66 84 L65 81 L62 80 L65 79Z" stroke="#1E3B20" strokeWidth="1.2" fill="none"/>
          </svg>
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
          <a href="https://instagram.com/euforycsips">@euforycsips</a>
          <a href="https://euforyc.co.uk/contact">contact</a>
        </div>
        <p className="footer-copy">&copy; 2025 euforyc studios &middot; 7 holmstall ave, edgware, london</p>
      </footer>
    </>
  );
}
