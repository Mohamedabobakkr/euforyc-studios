'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Timer,
  Sparkles,
  Star,
  Shield,
  ChevronDown,
  Zap,
  TrendingUp,
  Dumbbell,
  Target,
  Activity,
  Flame,
  Users,
  HeartPulse,
  LineChart,
  Hourglass,
  Award,
  Flower2,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// EDITABLE CONSTANTS — update pricing / links here
// ═══════════════════════════════════════════════════════════════
const PACKAGES = {
  '4': {
    id: '4',
    sessions: 4,
    label: '4 Sessions',
    shortLabel: 'Starter',
    tagline: 'The Kickstart',
    description: 'The perfect introduction — 4 sessions to ignite your muscles, learn the technique, and start seeing what your body is truly capable of.',
    price: '£280',
    perSession: '£70',
    regularPrice: '£320',
    savings: 'Save £40',
    validity: '90 days',
    bestFor: 'First-timers · Taster pack · Quick results',
    momenceUrl: 'https://momence.com/m/718404',
    icon: Zap,
    highlight: false,
    includes: [
      '4 EMS Sculpt sessions',
      'Body composition assessment',
      'Personalised intensity',
      'Progress tracking',
    ],
  },
  '8': {
    id: '8',
    sessions: 8,
    label: '8 Sessions',
    shortLabel: 'Sculpt',
    tagline: 'The Transformation',
    description: 'Our most popular pack — 8 sessions of deep muscle activation to sculpt, tone, and transform. This is where real, visible results happen.',
    price: '£520',
    perSession: '£65',
    regularPrice: '£640',
    savings: 'Save £120',
    validity: '90 days',
    bestFor: 'Best results · Most popular · Visible change',
    momenceUrl: 'https://momence.com/m/718405',
    icon: Dumbbell,
    highlight: true,
    includes: [
      '8 EMS Sculpt sessions',
      'Body composition assessment',
      'Personalised programme',
      'Progress photos & tracking',
      'Priority booking',
    ],
  },
  '12': {
    id: '12',
    sessions: 12,
    label: '12 Sessions',
    shortLabel: 'Elite',
    tagline: 'The Full Programme',
    description: 'The ultimate EMS Sculpt experience — 12 sessions for a complete body transformation. Maximum sculpting, peak toning, undeniable results.',
    price: '£720',
    perSession: '£60',
    regularPrice: '£960',
    savings: 'Save £240',
    validity: '90 days',
    bestFor: 'Maximum results · Best value · Full commitment',
    momenceUrl: 'https://momence.com/m/718407',
    icon: TrendingUp,
    highlight: false,
    includes: [
      '12 EMS Sculpt sessions',
      'Body composition assessment',
      'Fully personalised programme',
      'Progress photos & tracking',
      'Priority booking',
      'Best per-session rate',
    ],
  },
} as const;

type PackageId = keyof typeof PACKAGES;
const PACKAGE_IDS: PackageId[] = ['4', '8', '12'];

// ─── Countdown Hook ───────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function getEndOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

// ─── Intersection Observer Reveal ─────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1a260e]/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 md:py-6 text-left group"
      >
        <h3 className="font-serif text-base md:text-xl font-light text-[#1a260e] pr-6">{q}</h3>
        <ChevronDown
          className={`h-5 w-5 text-[#1a260e]/40 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? '360px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-[#1a260e]/70 pb-5 md:pb-6 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── Headline Stats ───────────────────────────────────────────
const headlineStats = [
  { value: '30', unit: 'min', label: 'Per session', sub: 'In and out' },
  { value: '90', unit: '%', label: 'Muscle fibres', sub: 'vs ~30% in the gym' },
  { value: '36k', unit: '+', label: 'Contractions', sub: 'Every session' },
  { value: '4', unit: 'wks', label: 'To visible change', sub: 'For most clients' },
];

// ─── The Session Steps ────────────────────────────────────────
const sessionSteps = [
  {
    step: '01',
    icon: Target,
    title: 'Suit Up',
    desc: 'You slip into a lightweight EMS Sculpt bodysuit fitted with electrode pads — covering your abs, glutes, arms, and legs. It takes thirty seconds.',
  },
  {
    step: '02',
    icon: Activity,
    title: 'Calibration',
    desc: 'Your trainer dials in the electrical impulses across each muscle group, finding your perfect intensity. Every session is personalised — your body, your level.',
  },
  {
    step: '03',
    icon: Zap,
    title: 'The Sculpt',
    desc: 'Simple, guided movements while EMS Sculpt activates up to 90% of your muscle fibres simultaneously. You feel every muscle working deeply, precisely, intensely.',
  },
  {
    step: '04',
    icon: Flame,
    title: 'The Afterburn',
    desc: 'Done in 30 minutes. Your metabolism stays elevated for hours. Muscles keep working. Results compound with every session. You walk out knowing it worked.',
  },
];

// ─── Benefits ─────────────────────────────────────────────────
const benefits = [
  { icon: Dumbbell, title: 'Build & Tone Muscle', desc: 'Activates deep muscle fibres that traditional exercise misses — visible toning in as few as 4 sessions.' },
  { icon: Flame, title: 'Burn Fat Efficiently', desc: 'Accelerates fat metabolism during and after sessions. High caloric burn in just 30 minutes — no cardio required.' },
  { icon: TrendingUp, title: 'Boost Metabolism', desc: 'Increased muscle activation means a higher resting metabolic rate — burn more calories even at rest.' },
  { icon: Target, title: 'Targeted Sculpting', desc: 'Focus on specific areas — abs, glutes, arms, thighs. Precision intensity control for the body you want.' },
  { icon: Clock, title: 'Time-Efficient', desc: '30 minutes replaces hours of conventional training. Perfect for busy schedules — maximum results, minimum time.' },
  { icon: Shield, title: 'Joint-Friendly', desc: 'Low-impact, no heavy weights. Ideal for recovery, injury prevention, or easing back into fitness.' },
];

// ─── Transformation Timeline ──────────────────────────────────
const timeline = [
  {
    mark: 'Week 1–2',
    title: 'Activation',
    desc: 'Muscles wake up. Posture lifts. You feel stronger and more switched on by session three.',
    icon: HeartPulse,
  },
  {
    mark: 'Week 3–4',
    title: 'Definition',
    desc: 'Core feels tighter. Clothes start sitting differently. First visible changes in tone — especially around the midsection.',
    icon: LineChart,
  },
  {
    mark: 'Week 5–8',
    title: 'Sculpting',
    desc: 'Real, photo-worthy change. Arms more defined. Glutes lifted. Waistline noticeably smaller. Energy and stamina up.',
    icon: TrendingUp,
  },
  {
    mark: 'Week 9–12',
    title: 'Transformation',
    desc: 'The body you came for. Stronger, leaner, more proportioned — and a metabolism that keeps working for you after the programme.',
    icon: Award,
  },
];

// ─── Target Areas (for body diagram) ──────────────────────────
const targetZones = [
  { label: 'Arms', sub: 'Biceps · Triceps' },
  { label: 'Chest', sub: 'Pectorals · Posture' },
  { label: 'Core', sub: 'Abs · Obliques' },
  { label: 'Back', sub: 'Lats · Lower back' },
  { label: 'Glutes', sub: 'Lift · Shape' },
  { label: 'Thighs', sub: 'Quads · Hamstrings' },
];

// ─── EMS vs Traditional comparison ────────────────────────────
const comparison = [
  { metric: 'Session length', ems: '30 minutes', gym: '60–90 minutes' },
  { metric: 'Muscle fibres', ems: 'Up to 90%', gym: '~30–40%' },
  { metric: 'Contractions', ems: '36,000+', gym: '~300–500' },
  { metric: 'Joint impact', ems: 'Low', gym: 'Moderate–High' },
  { metric: 'Supervision', ems: '1-on-1', gym: 'Rarely' },
  { metric: 'Visible change', ems: '4 weeks', gym: '12+ weeks' },
];

// ─── Who It's For ─────────────────────────────────────────────
const forYou = [
  'You want visible results but don\'t have hours to spend in the gym',
  'You\'ve hit a plateau and need something to break through it',
  'You want to tone and sculpt specific areas of your body',
  'You\'re recovering from an injury and need low-impact training',
  'You want the most time-efficient workout that actually works',
  'You\'re ready to take your body to the next level',
];

// ─── Social Proof ─────────────────────────────────────────────
const socialStats = [
  { value: '1,200+', label: 'Sessions delivered' },
  { value: '96%', label: 'See visible change' },
  { value: '4.9★', label: 'Average rating' },
  { value: '90%', label: 'Rebook after 8' },
];

// ─── FAQ Data ─────────────────────────────────────────────────
const faqs = [
  {
    q: 'Which pack should I choose?',
    a: 'Curious? The 4-session pack is the perfect taster to learn the technique and feel the difference. For real, visible results the 8-session pack is our most popular — it\'s where transformation happens. For the best value and full commitment, the 12-session pack is your all-in option at just £60/session. When in doubt, start with 8.',
  },
  {
    q: 'What exactly is EMS Sculpt?',
    a: 'EMS Sculpt uses electrical muscle stimulation to activate up to 90% of your muscle fibres simultaneously during exercise — far more than conventional training. In 30 minutes, you achieve the equivalent of hours of gym work. It\'s safe, CE-certified, and used by athletes and physiotherapists worldwide.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Most clients notice improved muscle tone and posture within 3–4 sessions. Visible sculpting and body composition changes typically appear after 6–8 sessions. The 12-session pack delivers the most significant, photo-worthy transformation.',
  },
  {
    q: 'Does it hurt?',
    a: 'Not at all. You\'ll feel a deep pulsing sensation that quickly becomes comfortable. Your trainer adjusts the intensity to your personal level — you\'re always in control. Most clients describe it as a satisfying, deep muscle contraction.',
  },
  {
    q: 'How long is each session?',
    a: 'Each EMS Sculpt session is approximately 30 minutes of active training. Despite the short duration, the muscle activation is equivalent to several hours of conventional training. You\'ll be in and out in under 45 minutes.',
  },
  {
    q: 'Can I combine this with my regular workouts?',
    a: 'Absolutely. EMS Sculpt is an excellent complement to Pilates, gym training, or any other exercise. Many clients combine it with Reformer Pilates or Hot Pilates at Euforyc for even faster results. We recommend spacing sessions at least 48 hours apart for optimal recovery.',
  },
];

// ─── Trust Points ─────────────────────────────────────────────
const trust = [
  { icon: Zap, label: 'Medical-Grade Tech' },
  { icon: Shield, label: 'Supervised 1-on-1' },
  { icon: Star, label: 'Proven Results' },
  { icon: Users, label: 'Loved by Clients' },
];

// ─── Body Silhouette SVG with target points ───────────────────
function BodyDiagram() {
  return (
    <svg viewBox="0 0 220 420" className="w-full h-auto max-w-[220px] md:max-w-[260px] mx-auto" aria-hidden="true">
      <defs>
        <linearGradient id="body-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d9b594" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d9b594" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id="pulse-grad">
          <stop offset="0%" stopColor="#f5d8a8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f5d8a8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M110 20 c14 0 24 10 24 24 c0 12 -6 20 -12 26 c8 4 14 12 16 22 l6 38 c2 14 10 26 18 36 c6 8 8 18 8 30 l0 30 c0 8 -4 16 -10 22 c-4 4 -6 10 -6 16 l0 90 c0 6 -2 12 -6 16 l-12 14 c-4 6 -10 10 -14 14 l-2 22 c0 6 -4 10 -10 10 l-6 0 c-6 0 -10 -4 -10 -10 l-2 -22 c-4 -4 -10 -8 -14 -14 l-12 -14 c-4 -4 -6 -10 -6 -16 l0 -90 c0 -6 -2 -12 -6 -16 c-6 -6 -10 -14 -10 -22 l0 -30 c0 -12 2 -22 8 -30 c8 -10 16 -22 18 -36 l6 -38 c2 -10 8 -18 16 -22 c-6 -6 -12 -14 -12 -26 c0 -14 10 -24 24 -24 z"
        fill="url(#body-grad)"
        stroke="#fffcf2"
        strokeOpacity="0.25"
        strokeWidth="0.8"
      />

      {[
        { cx: 75, cy: 130 },
        { cx: 145, cy: 130 },
        { cx: 110, cy: 115 },
        { cx: 110, cy: 170 },
        { cx: 110, cy: 235 },
        { cx: 92, cy: 290 },
        { cx: 128, cy: 290 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r="16" fill="url(#pulse-grad)">
            <animate attributeName="r" values="10;18;10" dur="2.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={p.cx} cy={p.cy} r="3" fill="#f5d8a8" />
        </g>
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function EmsSculptPage() {
  const [selected, setSelected] = useState<PackageId>('8');
  const endOfMonth = useMemo(() => getEndOfMonth(), []);
  const timeLeft = useCountdown(endOfMonth);

  const pkg = PACKAGES[selected];

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-0 bg-[#fffcf2]">

      {/* ════════════════════════════════════════════════════════
          HERO — mobile-first, tight, ad-optimised
         ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a260e] via-[#1d2a11] to-[#2a2418]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,216,168,0.18)_0%,_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,181,148,0.12)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
          <div className="absolute -top-40 -right-40 w-[420px] md:w-[520px] h-[420px] md:h-[520px] rounded-full border border-[#fffcf2]/[0.04]" />
          <div className="absolute -bottom-48 -left-48 w-[500px] md:w-[620px] h-[500px] md:h-[620px] rounded-full border border-[#fffcf2]/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-[#fffcf2]/[0.02]" />
        </div>

        <div className="relative z-10 container-width text-center px-5 md:px-6 py-10">
          {/* Urgency badge — single, compact on mobile */}
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-amber-200/10 backdrop-blur-sm border border-amber-200/25 rounded-full px-3 py-1.5 md:px-5 md:py-2 mb-5 md:mb-7">
              <Timer className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-200" />
              <span className="text-[11px] md:text-sm text-amber-100 tracking-wider font-medium">
                OFFER ENDS IN {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </span>
            </div>
          </Reveal>

          {/* Overline */}
          <Reveal delay={0.08}>
            <p className="text-[#fffcf2]/45 text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.35em] uppercase mb-4 md:mb-6 font-light">
              Euforyc Studios &nbsp;·&nbsp; Edgware, London
            </p>
          </Reveal>

          {/* Main headline */}
          <Reveal delay={0.15}>
            <h1 className="font-serif text-[2.75rem] leading-[1] sm:text-6xl md:text-7xl lg:text-[8rem] text-[#fffcf2] tracking-tight mb-5 md:mb-8">
              Sculpt<br />
              <span className="italic bg-gradient-to-r from-[#e7c9a8] via-amber-100 to-[#d9b594] bg-clip-text text-transparent">
                in 30.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="text-[#fffcf2]/75 text-[15px] md:text-xl lg:text-2xl max-w-2xl mx-auto mb-7 md:mb-10 font-light leading-relaxed px-2">
              30 minutes. 90% muscle-fibre activation. Visible change in weeks.<br className="hidden md:block" />
              <span className="block mt-2 md:mt-0 text-[#fffcf2]/55 text-[13px] md:text-base italic">The most time-efficient body sculpting technology.</span>
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <a
                href="#packages"
                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-gradient-to-r from-[#e7c9a8] via-amber-100 to-[#e7c9a8] text-[#1a260e] px-8 md:px-11 py-4 md:py-5 font-sans text-[13px] md:text-sm tracking-[0.16em] uppercase font-semibold transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(231,201,168,0.3)] rounded-sm"
              >
                SEE PACKS &amp; PRICES
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#why-ems"
                className="text-[#fffcf2]/55 text-[13px] md:text-sm tracking-wider hover:text-[#fffcf2] transition-colors"
              >
                Why EMS Sculpt? ↓
              </a>
            </div>
          </Reveal>

          {/* Trust row — compact 2x2 on mobile */}
          <Reveal delay={0.4}>
            <div className="mt-10 md:mt-16 pt-5 md:pt-8 border-t border-[#fffcf2]/[0.08]">
              <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-x-4 gap-y-3 md:gap-x-10 text-[#fffcf2]/50 text-[11px] md:text-sm">
                {trust.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center justify-center md:justify-start gap-1.5">
                    <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          HEADLINE STATS STRIP — quick credibility before pricing
         ════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#fffcf2] border-b border-[#1a260e]/8">
        <div className="container-width px-5 md:px-6 py-8 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 md:gap-6">
            {headlineStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="text-center md:text-left md:border-l md:border-[#1a260e]/10 md:pl-6 first:md:border-l-0 first:md:pl-0">
                  <div className="flex items-baseline justify-center md:justify-start gap-1 mb-1">
                    <span className="font-serif text-[2.25rem] md:text-5xl lg:text-6xl font-light text-[#1a260e] leading-none">{s.value}</span>
                    <span className="font-serif text-base md:text-xl text-[#1a260e]/60 italic">{s.unit}</span>
                  </div>
                  <p className="text-[11px] md:text-sm font-medium tracking-wide text-[#1a260e]/85">{s.label}</p>
                  <p className="text-[10px] md:text-xs text-[#1a260e]/45 mt-0.5">{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PACKAGES — moved to top for ads conversion
         ════════════════════════════════════════════════════════ */}
      <section id="packages" className="py-14 md:py-24 px-5 md:px-16 lg:px-24 xl:px-32 2xl:px-48 bg-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-8 md:mb-14">
              <p className="tagline text-[#1a260e]/50 mb-3 md:mb-4 text-[11px] md:text-sm">CHOOSE YOUR PACK</p>
              <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-[#1a260e]">
                Three packs. <span className="italic">One sculpted you.</span>
              </h2>
              <p className="text-[#1a260e]/70 text-sm md:text-lg max-w-2xl mx-auto mt-4 md:mt-5 font-light leading-relaxed">
                Each pack expires after 90 days &mdash; enough time to see real, photo-worthy results.
              </p>
            </div>
          </Reveal>

          {/* Selector Pills — mobile: full-width stack friendly */}
          <Reveal delay={0.05}>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-10">
              {PACKAGE_IDS.map((id) => {
                const p = PACKAGES[id];
                const isActive = selected === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelected(id)}
                    className={`px-3.5 md:px-6 py-2 md:py-3 rounded-full font-sans text-[11px] md:text-sm tracking-wider transition-all duration-300 flex items-center gap-1.5 md:gap-2 ${
                      isActive
                        ? 'bg-[#1a260e] text-[#fffcf2] scale-[1.02]'
                        : 'bg-transparent border border-[#1a260e]/20 text-[#1a260e]/70 hover:border-[#1a260e]/40 hover:text-[#1a260e]'
                    }`}
                  >
                    <Zap className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    <span>{p.label}</span>
                    {p.highlight && (
                      <span className={`text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full tracking-wider ${
                        isActive ? 'bg-[#e7c9a8]/25 text-[#e7c9a8]' : 'bg-amber-100/80 text-amber-800'
                      }`}>
                        POPULAR
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Selected package card */}
          <Reveal delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <a
                href={pkg.momenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e] via-[#1d2a11] to-[#2a2418]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,216,168,0.16)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,181,148,0.10)_0%,_transparent_50%)]" />

                <div className="relative p-5 md:p-10">
                  {/* Top row — stacks on mobile */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5 md:mb-6">
                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center gap-2 bg-[#e7c9a8]/10 border border-[#e7c9a8]/25 rounded-full px-3 py-1 mb-3 md:mb-4">
                        <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5 text-[#e7c9a8]" />
                        <span className="text-[10px] md:text-xs text-[#e7c9a8] tracking-wider font-medium">{pkg.savings.toUpperCase()}</span>
                      </div>
                      <div className="flex items-start gap-3 mb-1">
                        <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#e7c9a8]/20 to-amber-200/10 flex items-center justify-center flex-shrink-0">
                          <pkg.icon className="h-5 w-5 md:h-7 md:w-7 text-[#e7c9a8]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#fffcf2]/45 mb-1">{pkg.tagline}</p>
                          <h3 className="font-serif text-xl md:text-3xl text-[#fffcf2] font-light leading-tight">
                            {pkg.label} EMS Sculpt
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Price — inline left on mobile after title, right on desktop */}
                    <div className="flex items-end md:text-right md:flex-col md:items-end justify-between md:justify-start md:flex-shrink-0 pt-2 md:pt-0 border-t md:border-none border-[#fffcf2]/10">
                      <div>
                        <div className="flex items-baseline gap-2 md:justify-end">
                          <span className="font-serif text-[2.5rem] md:text-5xl text-[#fffcf2] font-light leading-none">{pkg.price}</span>
                          <span className="text-sm text-[#fffcf2]/40 line-through">{pkg.regularPrice}</span>
                        </div>
                        <p className="text-[11px] md:text-xs text-[#e7c9a8]/80 mt-1">
                          {pkg.perSession} / session
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[13px] md:text-base text-[#fffcf2]/70 leading-relaxed mb-5 md:mb-7">
                    {pkg.description}
                  </p>

                  {/* Best for chips */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-5 md:mb-7">
                    {pkg.bestFor.split(' · ').map((item) => (
                      <span key={item} className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border border-[#fffcf2]/10 text-[11px] md:text-xs text-[#fffcf2]/60 tracking-wide">
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Includes */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-2.5 mb-6 md:mb-7 pt-5 md:pt-6 border-t border-[#fffcf2]/10">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#e7c9a8] mt-0.5 flex-shrink-0" />
                        <span className="text-[13px] md:text-sm text-[#fffcf2]/85">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — big tap target on mobile */}
                  <div className="flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-[#e7c9a8] via-amber-100 to-[#e7c9a8] text-[#1a260e] py-4 md:py-5 px-5 md:px-8 rounded-xl font-semibold text-[12px] md:text-base tracking-[0.12em] md:tracking-[0.15em] uppercase transition-all duration-500 group-hover:shadow-[0_8px_40px_rgba(231,201,168,0.3)] group-hover:scale-[1.02] text-center">
                    <span>Book {pkg.label} &mdash; {pkg.price}</span>
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                  </div>

                  <p className="text-center text-[10px] md:text-xs text-[#fffcf2]/35 mt-3 tracking-wider">
                    Valid for {pkg.validity} &nbsp;·&nbsp; Edgware, London
                  </p>
                </div>
              </a>

              {/* Other packs — side by side on all sizes */}
              <div className="mt-4 md:mt-5 grid grid-cols-2 gap-2 md:gap-3">
                {PACKAGE_IDS.filter((id) => id !== selected).map((id) => {
                  const p = PACKAGES[id];
                  return (
                    <button
                      key={id}
                      onClick={() => setSelected(id)}
                      className="group text-left p-3 md:p-4 rounded-xl border border-[#1a260e]/10 hover:border-[#1a260e]/25 transition-all bg-white/40 hover:bg-white"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[9px] md:text-xs tracking-[0.2em] uppercase text-[#1a260e]/50 mb-0.5 md:mb-1 truncate">{p.tagline}</p>
                          <p className="font-serif text-sm md:text-lg text-[#1a260e] font-light">{p.label}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-serif text-sm md:text-lg text-[#1a260e]">{p.price}</p>
                          <p className="text-[9px] md:text-[10px] text-[#1a260e]/45 tracking-wider group-hover:text-[#1a260e] transition-colors">
                            VIEW →
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHY EMS — emotional pitch
         ════════════════════════════════════════════════════════ */}
      <section id="why-ems" className="py-14 md:py-24 px-5 md:px-16 bg-[#fffcf2] border-t border-[#1a260e]/8">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="tagline text-[#1a260e]/50 mb-4 md:mb-5 text-[11px] md:text-sm">THE SMARTER WAY TO SCULPT</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.75rem] text-[#1a260e] font-light leading-[1.2] mb-6 md:mb-9">
                You&apos;ve been putting in the work<br />
                <span className="italic">but not seeing the results</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4 md:space-y-5 text-[#1a260e]/75 text-[14px] md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                <p>
                  The gym sessions that never quite hit the stubborn areas. The workouts that
                  take an hour but leave you wondering if anything actually changed. The plateau
                  you can&apos;t seem to break through &mdash; no matter what you do.
                </p>
                <p>
                  You tell yourself you&apos;ll try something new. You keep not. Life keeps happening.
                </p>
                <p className="text-[#1a260e]/90 font-normal italic">
                  This is the part where you stop settling for average results.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 md:mt-12 inline-flex items-center gap-2 md:gap-3 bg-[#1a260e]/[0.04] rounded-full px-4 md:px-5 py-2 md:py-2.5 text-left">
                <Zap className="h-4 w-4 text-[#1a260e]/70 flex-shrink-0" />
                <span className="text-[12px] md:text-sm text-[#1a260e]/65 tracking-wide">
                  30 minutes of EMS Sculpt = <strong className="text-[#1a260e] font-medium">the equivalent of hours at the gym.</strong>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          HOW IT WORKS — science + body diagram
         ════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-14 md:py-24 px-5 md:px-16 bg-[#fffcf2] border-t border-[#1a260e]/8">
        <div className="container-width">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Body Diagram — first on mobile for visual impact */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Reveal delay={0.1}>
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a260e] via-[#1d2a11] to-[#2a2418] p-6 md:p-10">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,216,168,0.12)_0%,_transparent_55%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,181,148,0.08)_0%,_transparent_60%)]" />

                  <div className="relative">
                    <p className="text-center text-[10px] tracking-[0.3em] uppercase text-[#e7c9a8]/80 mb-1 md:mb-2">TARGET ZONES</p>
                    <p className="text-center text-[#fffcf2]/55 text-[11px] md:text-xs mb-4 md:mb-6">7 muscle groups · 1 session</p>

                    <BodyDiagram />

                    <div className="grid grid-cols-3 gap-1.5 md:gap-2 mt-5 md:mt-6">
                      {targetZones.map((z) => (
                        <div key={z.label} className="text-center px-1.5 md:px-2 py-1.5 md:py-2 rounded-lg border border-[#fffcf2]/8 bg-[#fffcf2]/[0.03]">
                          <p className="text-[10px] md:text-xs font-medium text-[#fffcf2]/90">{z.label}</p>
                          <p className="text-[8px] md:text-[10px] text-[#fffcf2]/45 leading-tight mt-0.5">{z.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Copy */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal>
                <p className="tagline text-[#1a260e]/50 mb-3 md:mb-4 text-[11px] md:text-sm">HOW IT WORKS</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-[#1a260e] mb-5 md:mb-8">
                  Trains your body <span className="italic">from the inside out</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-[#1a260e]/70 text-[14px] md:text-lg font-light leading-relaxed mb-6 md:mb-8">
                  EMS Sculpt sends precisely calibrated electrical impulses through a fitted
                  bodysuit, triggering deep muscle contractions in the exact fibres conventional
                  exercise struggles to reach. You move gently. Your body works like it&apos;s lifting
                  heavy &mdash; for thirty uninterrupted minutes.
                </p>
              </Reveal>

              <div className="space-y-3 md:space-y-4">
                {[
                  { n: '01', t: 'Bypasses the brain–muscle limit', d: 'Your nervous system usually fires ~30% of fibres at once. EMS Sculpt fires up to 90% — simultaneously.' },
                  { n: '02', t: 'Every muscle group, every session', d: 'Abs, glutes, arms, back, thighs — all activated in parallel. Nothing gets skipped.' },
                  { n: '03', t: 'Safe, supervised, CE-certified', d: 'Medical-grade technology, trained practitioners, one-to-one supervision from first pulse to last.' },
                ].map((row, i) => (
                  <Reveal key={row.n} delay={0.15 + i * 0.05}>
                    <div className="flex gap-3 md:gap-5 items-start pb-3 md:pb-5 border-b border-[#1a260e]/10 last:border-none">
                      <span className="font-serif text-[#1a260e]/30 text-base md:text-xl italic flex-shrink-0 mt-0.5">{row.n}</span>
                      <div>
                        <h3 className="font-serif text-[15px] md:text-lg font-normal text-[#1a260e] mb-1">{row.t}</h3>
                        <p className="text-[13px] md:text-sm text-[#1a260e]/60 leading-relaxed">{row.d}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE SESSION — step-by-step
         ════════════════════════════════════════════════════════ */}
      <section id="the-session" className="py-14 md:py-24 px-5 md:px-16 bg-[#1a260e] text-[#fffcf2] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,216,168,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(217,181,148,0.06)_0%,_transparent_50%)]" />

        <div className="relative container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-20">
              <p className="text-[#fffcf2]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-4">WHAT TO EXPECT</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light mb-3 md:mb-5">
                The <span className="italic bg-gradient-to-r from-[#e7c9a8] to-amber-100 bg-clip-text text-transparent">Session</span>
              </h2>
              <p className="text-[#fffcf2]/55 text-[13px] md:text-base max-w-xl mx-auto">
                Every EMS Sculpt session follows the same proven flow &mdash; designed for maximum activation in minimum time.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-[23px] md:left-[31px] top-4 bottom-4 w-px bg-gradient-to-b from-[#e7c9a8]/30 via-amber-200/20 to-[#e7c9a8]/10" />

              <div className="space-y-8 md:space-y-14">
                {sessionSteps.map((step, i) => (
                  <Reveal key={step.step} delay={i * 0.06}>
                    <div className="flex gap-4 md:gap-8">
                      <div className="relative flex-shrink-0">
                        <div className="w-[48px] h-[48px] md:w-[63px] md:h-[63px] rounded-full border border-[#e7c9a8]/30 flex items-center justify-center bg-[#1a260e] backdrop-blur-sm relative">
                          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#e7c9a8]/12 to-amber-200/5" />
                          <step.icon className="relative h-4 w-4 md:h-6 md:w-6 text-[#e7c9a8]/90" />
                        </div>
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] tracking-[0.25em] text-[#e7c9a8]/60 font-medium">
                          {step.step}
                        </span>
                      </div>

                      <div className="pt-1 md:pt-3 pb-3 md:pb-4">
                        <h3 className="font-serif text-lg md:text-2xl lg:text-3xl font-light text-[#fffcf2] mb-1.5 md:mb-3">
                          {step.title}
                        </h3>
                        <p className="text-[13px] md:text-base text-[#fffcf2]/60 leading-relaxed max-w-xl">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          TRANSFORMATION TIMELINE
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 px-5 md:px-16 bg-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-8 md:mb-16">
              <p className="tagline text-[#1a260e]/50 mb-3 md:mb-4 text-[11px] md:text-sm">YOUR 12-WEEK JOURNEY</p>
              <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-[#1a260e]">
                What <span className="italic">actually happens</span>
              </h2>
              <p className="text-[#1a260e]/70 text-sm md:text-lg max-w-2xl mx-auto mt-4 md:mt-5 font-light leading-relaxed">
                A realistic view of the change you can expect. These are the milestones our clients hit.
              </p>
            </div>
          </Reveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              {timeline.map((t, i) => (
                <Reveal key={t.mark} delay={i * 0.08}>
                  <div className="relative h-full p-5 md:p-7 rounded-2xl border border-[#1a260e]/10 bg-white/60 hover:bg-white hover:border-[#1a260e]/20 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4 md:mb-5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e7c9a8]/40 to-amber-50 flex items-center justify-center flex-shrink-0">
                        <t.icon className="h-4 w-4 text-[#1a260e]/75" />
                      </div>
                      <div>
                        <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#1a260e]/45 font-medium">Phase {String(i + 1).padStart(2, '0')}</p>
                        <p className="font-serif text-[13px] md:text-sm text-[#1a260e]/70 italic">{t.mark}</p>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg md:text-2xl font-light text-[#1a260e] mb-2 md:mb-3">{t.title}</h3>
                    <p className="text-[13px] md:text-sm text-[#1a260e]/65 leading-relaxed">{t.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <p className="text-center text-[11px] md:text-sm text-[#1a260e]/45 italic mt-6 md:mt-8">
                Individual results vary. Our team tracks your progress and adjusts intensity every session.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          EMS vs TRADITIONAL COMPARISON — mobile-friendly
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 px-5 md:px-16 bg-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-8 md:mb-14">
              <p className="tagline text-[#1a260e]/50 mb-3 md:mb-4 text-[11px] md:text-sm">THE MATH</p>
              <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-[#1a260e]">
                EMS Sculpt vs. <span className="italic">the gym</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-4xl mx-auto rounded-2xl border border-[#1a260e]/10 overflow-hidden bg-white/50">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_1fr_1fr] bg-[#1a260e] text-[#fffcf2]">
                <div className="p-3 md:p-6 text-[9px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase text-[#fffcf2]/50 border-r border-[#fffcf2]/10">
                  Metric
                </div>
                <div className="p-3 md:p-6 text-center border-r border-[#fffcf2]/10">
                  <p className="text-[9px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase text-[#e7c9a8]">EMS Sculpt</p>
                </div>
                <div className="p-3 md:p-6 text-center">
                  <p className="text-[9px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase text-[#fffcf2]/60">Gym</p>
                </div>
              </div>

              {/* Rows */}
              {comparison.map((row, i) => (
                <div
                  key={row.metric}
                  className={`grid grid-cols-[1fr_1fr_1fr] border-t border-[#1a260e]/10 ${i % 2 === 1 ? 'bg-[#1a260e]/[0.015]' : ''}`}
                >
                  <div className="p-3 md:p-5 text-[11px] md:text-sm text-[#1a260e]/75 font-medium border-r border-[#1a260e]/10">
                    {row.metric}
                  </div>
                  <div className="p-3 md:p-5 text-center text-[12px] md:text-sm text-[#1a260e] font-serif border-r border-[#1a260e]/10">
                    {row.ems}
                  </div>
                  <div className="p-3 md:p-5 text-center text-[12px] md:text-sm text-[#1a260e]/55">
                    {row.gym}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-center text-[12px] md:text-sm text-[#1a260e]/45 italic mt-5 md:mt-6">
              Same goals. A fraction of the time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          EMS + PILATES — the synergy section
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 px-5 md:px-16 bg-[#1a260e] text-[#fffcf2] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(244,194,194,0.08)_0%,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(245,216,168,0.08)_0%,_transparent_55%)]" />

        <div className="relative container-width">
          <Reveal>
            <div className="text-center mb-8 md:mb-14 max-w-2xl mx-auto">
              <p className="text-[#fffcf2]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-4">BETTER TOGETHER</p>
              <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] mb-4 md:mb-6">
                Pair with Pilates <span className="italic bg-gradient-to-r from-[#f4c2c2] to-[#e7c9a8] bg-clip-text text-transparent">and watch results multiply</span>
              </h2>
              <p className="text-[#fffcf2]/70 text-[14px] md:text-lg font-light leading-relaxed">
                EMS builds the muscle. Pilates teaches it to move beautifully.
                Together, they create a body that isn&apos;t just strong &mdash; it&apos;s balanced,
                controlled, and moves like a dream.
              </p>
            </div>
          </Reveal>

          {/* Pair card */}
          <div className="max-w-4xl mx-auto">
            <Reveal delay={0.08}>
              <div className="grid sm:grid-cols-2 gap-3 md:gap-5 mb-5 md:mb-8">
                {/* EMS side */}
                <div className="relative rounded-2xl border border-[#e7c9a8]/20 bg-[#fffcf2]/[0.03] p-5 md:p-7">
                  <div className="flex items-center gap-2.5 mb-3 md:mb-4">
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#e7c9a8]/25 to-amber-200/10 flex items-center justify-center">
                      <Zap className="h-4 w-4 md:h-5 md:w-5 text-[#e7c9a8]" />
                    </div>
                    <div>
                      <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#e7c9a8]/70">Monday · Thursday</p>
                      <h3 className="font-serif text-lg md:text-xl text-[#fffcf2] font-light">EMS Sculpt</h3>
                    </div>
                  </div>
                  <ul className="space-y-2 md:space-y-2.5">
                    {[
                      'Builds deep muscle strength',
                      'Activates 90% of fibres',
                      'Burns fat efficiently',
                      '30 min · Low impact',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[12px] md:text-sm text-[#fffcf2]/75">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#e7c9a8] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pilates side */}
                <div className="relative rounded-2xl border border-[#f4c2c2]/20 bg-[#fffcf2]/[0.03] p-5 md:p-7">
                  <div className="flex items-center gap-2.5 mb-3 md:mb-4">
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#f4c2c2]/25 to-amber-200/10 flex items-center justify-center">
                      <Flower2 className="h-4 w-4 md:h-5 md:w-5 text-[#f4c2c2]" />
                    </div>
                    <div>
                      <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#f4c2c2]/70">Tuesday · Friday</p>
                      <h3 className="font-serif text-lg md:text-xl text-[#fffcf2] font-light">Pilates</h3>
                    </div>
                  </div>
                  <ul className="space-y-2 md:space-y-2.5">
                    {[
                      'Lengthens & aligns',
                      'Refines posture & core',
                      'Teaches muscle control',
                      'Reformer · Hot · Barre',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[12px] md:text-sm text-[#fffcf2]/75">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#f4c2c2] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* The magic formula */}
            <Reveal delay={0.18}>
              <div className="relative rounded-2xl overflow-hidden border border-[#fffcf2]/10 p-5 md:p-8 bg-gradient-to-br from-[#e7c9a8]/8 via-[#fffcf2]/[0.02] to-[#f4c2c2]/8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  <div className="flex-1">
                    <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#e7c9a8] mb-2 md:mb-2.5">THE WEEKLY FORMULA</p>
                    <h3 className="font-serif text-lg md:text-2xl text-[#fffcf2] font-light leading-tight mb-2 md:mb-3">
                      <span className="text-[#e7c9a8]">2 × EMS</span> + <span className="text-[#f4c2c2]">3 × Pilates</span> per week
                    </h3>
                    <p className="text-[13px] md:text-sm text-[#fffcf2]/65 leading-relaxed">
                      The rhythm our best-transforming clients swear by.
                      Low-impact, joint-safe, and delivers faster visible results than either alone.
                    </p>
                  </div>
                  <Link
                    href="/offers"
                    className="group inline-flex items-center justify-center gap-2 w-full md:w-auto bg-[#fffcf2] text-[#1a260e] px-6 md:px-7 py-3 md:py-3.5 font-sans text-[12px] md:text-sm tracking-[0.15em] uppercase font-semibold rounded-sm transition-all hover:scale-[1.02] hover:shadow-xl flex-shrink-0"
                  >
                    SEE PILATES OFFERS
                    <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Why it works */}
            <Reveal delay={0.28}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-5 md:mt-8">
                {[
                  { icon: TrendingUp, title: 'Faster results', desc: 'The combined stimulus accelerates change more than either alone.' },
                  { icon: Shield, title: 'Recovery-friendly', desc: 'Alternating days gives muscles the time to rebuild stronger.' },
                  { icon: Award, title: 'Functional strength', desc: 'EMS activates. Pilates integrates. You move better in real life.' },
                ].map((r) => (
                  <div key={r.title} className="p-4 md:p-5 rounded-xl border border-[#fffcf2]/8 bg-[#fffcf2]/[0.02]">
                    <r.icon className="h-4 w-4 md:h-5 md:w-5 text-[#e7c9a8] mb-2 md:mb-3" />
                    <h4 className="font-serif text-base md:text-lg text-[#fffcf2] font-light mb-1">{r.title}</h4>
                    <p className="text-[12px] md:text-sm text-[#fffcf2]/55 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BENEFITS GRID
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 px-5 md:px-16 bg-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-8 md:mb-14">
              <p className="tagline text-[#1a260e]/50 mb-3 md:mb-4 text-[11px] md:text-sm">THE SCIENCE OF SCULPTING</p>
              <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-[#1a260e]">
                What you get <span className="italic">from every session</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="group relative p-5 md:p-7 rounded-2xl border border-[#1a260e]/10 bg-white/50 hover:bg-white hover:border-[#1a260e]/20 transition-all duration-500 h-full">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#e7c9a8]/40 to-amber-50 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 transition-transform">
                    <b.icon className="h-4 w-4 md:h-5 md:w-5 text-[#1a260e]/75" />
                  </div>
                  <h3 className="font-serif text-base md:text-xl font-light text-[#1a260e] mb-1.5 md:mb-2">{b.title}</h3>
                  <p className="text-[13px] md:text-sm text-[#1a260e]/65 leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THIS IS FOR YOU
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 px-5 md:px-16 bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 md:mb-12">
                <p className="tagline text-[#1a260e]/50 mb-3 md:mb-4 text-[11px] md:text-sm">IS THIS FOR ME?</p>
                <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-[#1a260e]">
                  EMS Sculpt is for you if&hellip;
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 md:p-6 rounded-xl bg-white/60 border border-[#1a260e]/8">
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-[#e7c9a8]/40 to-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#1a260e]/75" />
                    </div>
                    <span className="text-[13px] md:text-base text-[#1a260e]/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SOCIAL PROOF STATS + QUOTE
         ════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 px-5 md:px-16 bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden border border-[#1a260e]/10 bg-gradient-to-br from-white via-[#fffcf2] to-amber-50/40">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(231,201,168,0.22)_0%,_transparent_55%)]" />

                <div className="relative p-6 md:p-12">
                  <div className="text-center mb-6 md:mb-10">
                    <p className="tagline text-[#1a260e]/50 mb-2 md:mb-3 text-[11px] md:text-sm">THE NUMBERS</p>
                    <h3 className="font-serif text-xl md:text-3xl lg:text-4xl text-[#1a260e] font-light leading-tight">
                      A community <span className="italic">getting real results</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-4">
                    {socialStats.map((s, i) => (
                      <Reveal key={s.label} delay={i * 0.08}>
                        <div className="text-center">
                          <p className="font-serif text-2xl md:text-4xl lg:text-5xl text-[#1a260e] font-light mb-1 leading-none">{s.value}</p>
                          <p className="text-[11px] md:text-sm text-[#1a260e]/60 tracking-wide">{s.label}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  <Reveal delay={0.35}>
                    <div className="mt-6 md:mt-10 pt-6 md:pt-8 border-t border-[#1a260e]/10 text-center">
                      <Hourglass className="h-5 w-5 text-[#1a260e]/40 mx-auto mb-2 md:mb-3" />
                      <p className="font-serif text-sm md:text-lg text-[#1a260e]/80 italic leading-relaxed max-w-xl mx-auto">
                        &ldquo;I walked in sceptical and walked out a believer &mdash; by week four my core was tighter than it&apos;s been in a decade.&rdquo;
                      </p>
                      <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#1a260e]/45 mt-2 md:mt-3">&mdash; EMS Sculpt Member, Edgware</p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHY EUFORYC — trust section
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 px-5 md:px-16 bg-[#1a260e] text-[#fffcf2] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,216,168,0.05)_0%,_transparent_60%)]" />

        <div className="relative container-width">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-[#fffcf2]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-4">WHY EUFORYC</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light mb-4 md:mb-8">
                A wellness home, <span className="italic">not another gym</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[#fffcf2]/70 text-[14px] md:text-lg leading-relaxed mb-8 md:mb-14">
                Edgware&apos;s multi-wellness destination &mdash; where EMS Sculpt, Reformer Pilates, Hot Pilates,
                massage, skin treatments, and our Sips café all live under one roof.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {[
                  { title: 'Medical-Grade', desc: 'CE-certified equipment' },
                  { title: 'Expert Trainers', desc: 'Certified EMS pros' },
                  { title: 'Beautifully Designed', desc: 'Calm, premium space' },
                  { title: 'Local to Edgware', desc: '5 min from the tube' },
                ].map((item, i) => (
                  <div key={i} className="p-4 md:p-5 rounded-xl border border-[#fffcf2]/10 bg-[#fffcf2]/[0.03]">
                    <h3 className="font-serif text-[15px] md:text-lg font-light text-[#fffcf2] mb-1.5 md:mb-2">{item.title}</h3>
                    <p className="text-[11px] md:text-sm text-[#fffcf2]/55 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 md:mt-14 flex flex-wrap justify-center gap-4 md:gap-8 text-[#fffcf2]/50 text-[11px] md:text-sm">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Edgware, London</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Star className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Loved locally</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Shield className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>1-on-1 supervised</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-24 px-5 md:px-16 bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 md:mb-12">
                <p className="tagline text-[#1a260e]/50 mb-3 md:mb-4 text-[11px] md:text-sm">QUESTIONS, ANSWERED</p>
                <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-[#1a260e]">Before you book</h2>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-center mt-8 md:mt-14">
                <p className="text-[13px] md:text-sm text-[#1a260e]/50 mb-3 md:mb-4">Still wondering about something?</p>
                <Link href="/contact" className="btn-minimal">
                  GET IN TOUCH
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FINAL CTA
         ════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e] via-[#1d2a11] to-[#2a2418]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,216,168,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,181,148,0.09)_0%,_transparent_50%)]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[600px] h-[500px] md:h-[600px] rounded-full border border-[#fffcf2]/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[700px] md:h-[900px] rounded-full border border-[#fffcf2]/[0.02]" />

        <div className="relative z-10 container-width text-center px-5 md:px-6">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-5 md:space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#e7c9a8]/10 border border-[#e7c9a8]/25 rounded-full px-3.5 md:px-4 py-1.5 md:py-2">
                <Timer className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#e7c9a8]" />
                <span className="text-[12px] md:text-sm text-[#e7c9a8] font-medium">
                  {timeLeft.days > 0
                    ? `${timeLeft.days} days left on this offer`
                    : 'Last chance — offer ending soon'}
                </span>
              </div>

              <h2 className="font-serif text-[2rem] md:text-4xl lg:text-6xl text-[#fffcf2] font-light leading-[1.05]">
                Your strongest body<br />
                <span className="italic bg-gradient-to-r from-[#e7c9a8] to-amber-100 bg-clip-text text-transparent">
                  starts today.
                </span>
              </h2>

              <p className="text-[#fffcf2]/65 text-[14px] md:text-lg max-w-lg mx-auto leading-relaxed">
                Choose your pack. Book your first EMS Sculpt session. Feel the
                difference from day one.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center pt-1">
                <a
                  href="#packages"
                  className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-gradient-to-r from-[#e7c9a8] via-amber-100 to-[#e7c9a8] text-[#1a260e] px-8 md:px-11 py-4 md:py-5 font-sans text-[13px] md:text-sm tracking-[0.16em] uppercase font-semibold transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(231,201,168,0.35)] rounded-sm"
                >
                  CHOOSE YOUR PACK
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <p className="text-[#fffcf2]/35 text-[10px] md:text-xs tracking-wider pt-1 md:pt-2">
                Edgware, London &nbsp;·&nbsp; Medical-grade EMS Sculpt &nbsp;·&nbsp; Results in weeks
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STICKY MOBILE CTA
         ════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-[#fffcf2]/95 backdrop-blur-md border-t border-[#1a260e]/10 md:hidden z-50">
        <a
          href={pkg.momenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e7c9a8] via-amber-100 to-[#e7c9a8] text-[#1a260e] w-full py-3.5 text-[12px] tracking-[0.12em] uppercase rounded-lg active:scale-[0.98] transition-transform font-semibold"
        >
          BOOK {pkg.label.toUpperCase()} — {pkg.price}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
