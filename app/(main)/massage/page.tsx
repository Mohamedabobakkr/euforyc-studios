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
  Leaf,
  Flower2,
  Moon,
  Heart,
  Wind,
  Hand,
  Feather,
  Gem,
  CupSoda,
  Users,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// EDITABLE CONSTANTS — update pricing here before launch
// ═══════════════════════════════════════════════════════════════
const DROP_IN_URL = 'https://momence.com/euforyc/appointment-reservation/75303?boardId=108632&serviceId=237941';

const PACKAGES = {
  '30': {
    id: '30',
    duration: '30',
    label: '30 Minute',
    shortLabel: 'Express Reset',
    tagline: 'The Quick Escape',
    description: 'A targeted 30-minute reset — perfect for tight shoulders, a stressed mind, or a lunch-break reset.',
    price: '£110',
    perSession: '£36.67',
    regularPrice: '£135',
    savings: 'Save £25',
    bestFor: 'Busy schedules · Targeted tension · Monthly resets',
    momenceUrl: 'https://momence.com/m/726585',
    icon: Wind,
    highlight: false,
    includes: [
      'Focused 30-minute massage',
      'Target one key area',
      'Calming aromatherapy',
      'Herbal tea ritual after',
    ],
  },
  '60': {
    id: '60',
    duration: '60',
    label: '60 Minute',
    shortLabel: 'Signature Ritual',
    tagline: 'The Full Unwind',
    description: 'Our most-loved length — a full-body restorative massage to melt tension, ease the mind, and leave you floating.',
    price: '£180',
    perSession: '£60',
    regularPrice: '£225',
    savings: 'Save £45',
    bestFor: 'Full-body tension · Deep rest · Most popular',
    momenceUrl: 'https://momence.com/m/726583',
    icon: Flower2,
    highlight: true,
    includes: [
      'Full-body 60-minute massage',
      'Custom pressure & technique',
      'Aromatherapy & warm towels',
      'Herbal tea ritual after',
      'Quiet recovery moment',
    ],
  },
  '90': {
    id: '90',
    duration: '90',
    label: '90 Minute',
    shortLabel: 'Deep Restoration',
    tagline: 'The Full Ceremony',
    description: 'The ultimate experience — 90 minutes of full-body restoration, deep tissue release, and total nervous system reset.',
    price: '£250',
    perSession: '£83.33',
    regularPrice: '£300',
    savings: 'Save £50',
    bestFor: 'Deep rest · Chronic tension · The full indulgence',
    momenceUrl: 'https://momence.com/m/726587',
    icon: Gem,
    highlight: false,
    includes: [
      'Full-body 90-minute massage',
      'Deep tissue release work',
      'Scalp & face included',
      'Aromatherapy & warm towels',
      'Herbal tea ritual after',
      'Extended recovery moment',
    ],
  },
} as const;

type PackageId = keyof typeof PACKAGES;
const PACKAGE_IDS: PackageId[] = ['30', '60', '90'];

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

// End of current month for urgency
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
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
      >
        <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] pr-6">{q}</h3>
        <ChevronDown
          className={`h-5 w-5 text-[#1a260e]/40 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? '260px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-[#1a260e]/70 pb-5 md:pb-6 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── The Ritual Steps ─────────────────────────────────────────
const ritual = [
  {
    step: '01',
    icon: Leaf,
    title: 'Arrive & Exhale',
    desc: 'You step through the door, slip off your shoes, and the outside world stays outside. Warm lighting, soft music, the scent of essential oils.',
  },
  {
    step: '02',
    icon: Hand,
    title: 'Consultation',
    desc: 'A brief chat with your therapist — what hurts, what needs attention, how much pressure. Every ritual is tailored to you.',
  },
  {
    step: '03',
    icon: Flower2,
    title: 'The Massage',
    desc: 'Your chosen ritual begins. Every stroke intentional. Breath slows. Shoulders drop. Your nervous system finally gets the memo: you\'re safe now.',
  },
  {
    step: '04',
    icon: CupSoda,
    title: 'The Tea Ritual',
    desc: 'Ease back into the world with a warm herbal tea in our Sips bar next door — the bridge between the treatment room and the rest of your day.',
  },
  {
    step: '05',
    icon: Moon,
    title: 'The Afterglow',
    desc: 'You leave lighter. Softer. Your body still remembers this tomorrow. Better sleep tonight — and a week of feeling like yourself again.',
  },
];

// ─── Benefits ─────────────────────────────────────────────────
const benefits = [
  { icon: Heart, title: 'Releases Chronic Tension', desc: 'Melts away shoulder, neck, and lower-back tightness that builds up from screens, stress, and daily life.' },
  { icon: Moon, title: 'Deeper, Better Sleep', desc: 'Lowers cortisol and activates your parasympathetic system — you\'ll sleep deeper on massage nights.' },
  { icon: Wind, title: 'Quiets Anxiety', desc: 'Slows a racing mind. Down-regulates the nervous system. Gives your body permission to actually rest.' },
  { icon: Sparkles, title: 'Glowing Skin & Circulation', desc: 'Boosts blood flow, lymphatic drainage, and that unmistakable post-massage glow.' },
  { icon: Feather, title: 'Lifted Mood', desc: 'Releases endorphins, serotonin, and oxytocin — nature\'s antidepressant cocktail.' },
  { icon: Shield, title: 'Prevents Burnout', desc: 'A monthly ritual of rest is the single most under-rated thing you can do for longevity and resilience.' },
];

// ─── Who It's For ─────────────────────────────────────────────
const forYou = [
  'Your shoulders live somewhere near your ears',
  'You can\'t remember the last time you truly relaxed',
  'You train hard and need real recovery',
  'Sleep has been light, broken, or elusive',
  'You want to make self-care an actual ritual, not a rare treat',
  'You want something to look forward to, three times over',
];

// ─── FAQ Data ─────────────────────────────────────────────────
const faqs = [
  {
    q: 'Which package should I pick?',
    a: '30 minutes is perfect if you want a targeted reset on one area (shoulders, neck, lower back) or a quick reset during a busy week. 60 minutes — our most popular — is a full-body ritual and the sweet spot for most people. 90 minutes is the full ceremony, ideal for deep tension, deeper sleep, or when you really need it. When in doubt, start with 60.',
  },
  {
    q: 'Is this deep tissue or relaxation?',
    a: 'Both — it\'s tailored to you. Every session starts with a brief consultation so your therapist understands what you need that day. Some clients want pure relaxation, others want focused deep-tissue work on a stubborn knot. Your pressure, your preferences, your ritual.',
  },
  {
    q: 'How does the pack of 3 work?',
    a: 'You purchase the pack once and use the three sessions whenever works for you. Many clients spread them out for a monthly ritual; others book closer together for an intense reset. It\'s yours to use however you like.',
  },
  {
    q: 'Do I need to book ahead?',
    a: 'After purchase, you\'ll get access to our booking system where you can reserve your sessions at times that suit you. We recommend booking your first session within a week — you\'ll want to feel this sooner rather than later.',
  },
  {
    q: 'Can I gift it or share it?',
    a: 'The pack is intended for a single person, but we do offer gift cards separately — just ask us and we\'ll make it effortless. Nothing says "I see you" like the gift of rest.',
  },
  {
    q: 'Where is the studio?',
    a: 'We\'re in Edgware, London — a calm, beautifully designed space with our massage rooms, Sips bar, pilates studios, and Skin Studio all under one roof. Free parking nearby.',
  },
];

// ─── Trust Points ─────────────────────────────────────────────
const trust = [
  { icon: Star, label: 'Expert Therapists' },
  { icon: Leaf, label: 'Natural Oils' },
  { icon: Shield, label: 'Private Rooms' },
  { icon: Users, label: 'Loved by Locals' },
];

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function MassagePage() {
  const [selected, setSelected] = useState<PackageId>('60');
  const endOfMonth = useMemo(() => getEndOfMonth(), []);
  const timeLeft = useCountdown(endOfMonth);

  const pkg = PACKAGES[selected];

  return (
    <div className="pt-24 pb-24 md:pb-0 bg-[#fffcf2]">

      {/* ════════════════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Layered atmospheric background */}
        <div className="absolute inset-0">
          {/* Deep green base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a260e] via-[#1d2a11] to-[#2a2418]" />

          {/* Warm rose + gold glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,194,194,0.14)_0%,_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,181,148,0.10)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,220,200,0.04)_0%,_transparent_70%)]" />

          {/* Fine grain texture */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          {/* Concentric ritual circles */}
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full border border-[#fffcf2]/[0.04]" />
          <div className="absolute -bottom-48 -left-48 w-[620px] h-[620px] rounded-full border border-[#fffcf2]/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-[#fffcf2]/[0.02]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-[#fffcf2]/[0.015]" />
        </div>

        <div className="relative z-10 container-width text-center px-6">
          {/* Urgency + social proof row */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-rose-300/10 backdrop-blur-sm border border-rose-200/20 rounded-full px-3 py-1.5 md:px-5 md:py-2">
                <Timer className="h-3.5 w-3.5 md:h-4 md:w-4 text-rose-200" />
                <span className="text-xs md:text-sm text-rose-100 tracking-wider font-medium">
                  OFFER ENDS IN {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                </span>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#fffcf2]/[0.06] backdrop-blur-sm border border-[#fffcf2]/15 rounded-full px-3 py-1.5 md:px-5 md:py-2">
                <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-200" />
                <span className="text-xs md:text-sm text-[#fffcf2]/85 tracking-wider">NEW AT EUFORYC</span>
              </div>
            </div>
          </Reveal>

          {/* Overline */}
          <Reveal delay={0.08}>
            <p className="text-[#fffcf2]/45 text-xs md:text-sm tracking-[0.35em] uppercase mb-5 md:mb-7 font-light">
              The Euforyc &nbsp;·&nbsp; Edgware, London
            </p>
          </Reveal>

          {/* Main headline */}
          <Reveal delay={0.15}>
            <h1 className="font-serif text-[3rem] leading-[1] md:text-7xl lg:text-[8rem] text-[#fffcf2] tracking-tight mb-6 md:mb-8">
              Massage<br />
              <span className="italic bg-gradient-to-r from-rose-100 via-amber-100 to-rose-200 bg-clip-text text-transparent">
                Ritual
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="text-[#fffcf2]/75 text-base md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 md:mb-12 font-light leading-relaxed">
              Three sessions. One slow, deliberate return to yourself.<br className="hidden md:block" />
              <span className="text-[#fffcf2]/55 text-sm md:text-base italic">Melt tension. Restore calm. Leave lighter.</span>
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#packages"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-rose-200 via-amber-100 to-rose-200 text-[#1a260e] px-9 md:px-11 py-4 md:py-5 font-sans text-sm tracking-[0.18em] uppercase font-semibold transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(244,194,194,0.25)] rounded-sm"
              >
                CHOOSE YOUR RITUAL
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#the-ritual"
                className="text-[#fffcf2]/55 text-sm tracking-wider hover:text-[#fffcf2] transition-colors"
              >
                What to expect →
              </a>
            </div>
          </Reveal>

          {/* Trust row */}
          <Reveal delay={0.4}>
            <div className="mt-14 md:mt-20 pt-6 md:pt-8 border-t border-[#fffcf2]/[0.08]">
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[#fffcf2]/45 text-xs md:text-sm">
                {trust.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#fffcf2]/30">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#fffcf2]/30 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          EMOTIONAL PITCH
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="tagline text-[#1a260e]/50 mb-5">A DEEP BREATH, MADE PHYSICAL</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.75rem] text-[#1a260e] font-light leading-[1.2] mb-7 md:mb-9">
                You&apos;ve been carrying<br />
                <span className="italic">more than you realise</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5 text-[#1a260e]/75 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                <p>
                  The shoulders that sit somewhere near your ears. The jaw you unclench at red lights.
                  The knot between your shoulder blades that&apos;s been there since &mdash; when, exactly?
                </p>
                <p>
                  You tell yourself you&apos;ll book something. You keep not. Life keeps happening.
                </p>
                <p className="text-[#1a260e]/90 font-normal italic">
                  This is the part where you stop putting yourself last.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 md:mt-12 inline-flex items-center gap-3 bg-[#1a260e]/[0.04] rounded-full px-5 py-2.5">
                <Heart className="h-4 w-4 text-rose-500" />
                <span className="text-sm text-[#1a260e]/65 tracking-wide">
                  Rest isn&apos;t a reward. <strong className="text-[#1a260e] font-medium">It&apos;s maintenance.</strong>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE RITUAL — step by step walkthrough
         ════════════════════════════════════════════════════════ */}
      <section id="the-ritual" className="section-padding bg-[#1a260e] text-[#fffcf2] relative overflow-hidden">
        {/* Atmospheric glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(244,194,194,0.06)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(217,181,148,0.05)_0%,_transparent_50%)]" />

        <div className="relative container-width">
          <Reveal>
            <div className="text-center mb-12 md:mb-20">
              <p className="text-[#fffcf2]/40 text-xs tracking-[0.3em] uppercase mb-4">WHAT TO EXPECT</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light mb-5">
                The <span className="italic bg-gradient-to-r from-rose-100 to-amber-100 bg-clip-text text-transparent">Ritual</span>
              </h2>
              <p className="text-[#fffcf2]/55 text-sm md:text-base max-w-xl mx-auto">
                Every session unfolds the same way &mdash; a designed moment of stillness, from the second you arrive to the moment you leave.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical spine */}
              <div className="absolute left-[27px] md:left-[31px] top-4 bottom-4 w-px bg-gradient-to-b from-rose-200/30 via-amber-200/20 to-rose-200/10" />

              <div className="space-y-10 md:space-y-14">
                {ritual.map((step, i) => (
                  <Reveal key={step.step} delay={i * 0.06}>
                    <div className="flex gap-5 md:gap-8">
                      {/* Step circle */}
                      <div className="relative flex-shrink-0">
                        <div className="w-[55px] h-[55px] md:w-[63px] md:h-[63px] rounded-full border border-rose-200/30 flex items-center justify-center bg-[#1a260e] backdrop-blur-sm relative">
                          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-rose-200/10 to-amber-200/5" />
                          <step.icon className="relative h-5 w-5 md:h-6 md:w-6 text-rose-100/80" />
                        </div>
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] text-rose-200/60 font-medium">
                          {step.step}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="pt-2 pb-4 md:pt-3">
                        <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-[#fffcf2] mb-2 md:mb-3">
                          {step.title}
                        </h3>
                        <p className="text-sm md:text-base text-[#fffcf2]/60 leading-relaxed max-w-xl">
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
          PACKAGES — the conversion section
         ════════════════════════════════════════════════════════ */}
      <section id="packages" className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <p className="tagline text-[#1a260e]/50 mb-4">CHOOSE YOUR LENGTH</p>
              <h2 className="heading-secondary">
                Three Rituals. <span className="italic">One for every kind of day.</span>
              </h2>
              <p className="body-text max-w-2xl mx-auto mt-5">
                Each pack is three sessions &mdash; enough to make rest a habit, not a one-off.
              </p>
            </div>
          </Reveal>

          {/* Selector Pills */}
          <Reveal delay={0.05}>
            <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
              {PACKAGE_IDS.map((id) => {
                const p = PACKAGES[id];
                const isActive = selected === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelected(id)}
                    className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full font-sans text-xs md:text-sm tracking-wider transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#1a260e] text-[#fffcf2] scale-[1.02]'
                        : 'bg-transparent border border-[#1a260e]/20 text-[#1a260e]/70 hover:border-[#1a260e]/40 hover:text-[#1a260e]'
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span>{p.label}</span>
                    {p.highlight && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full tracking-wider ${
                        isActive ? 'bg-rose-200/20 text-rose-100' : 'bg-rose-100/60 text-rose-700'
                      }`}>
                        MOST LOVED
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
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e] via-[#1d2a11] to-[#2a2418]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,194,194,0.12)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,181,148,0.08)_0%,_transparent_50%)]" />

                <div className="relative p-7 md:p-10">
                  {/* Top: badge + title + price */}
                  <div className="flex justify-between items-start gap-4 mb-5 md:mb-6">
                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center gap-2 bg-rose-200/10 border border-rose-200/20 rounded-full px-3 py-1 mb-4">
                        <Sparkles className="h-3.5 w-3.5 text-rose-100" />
                        <span className="text-xs text-rose-100 tracking-wider font-medium">{pkg.savings.toUpperCase()}</span>
                      </div>
                      <div className="flex items-start gap-3 mb-1">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-rose-200/15 to-amber-200/10 flex items-center justify-center flex-shrink-0">
                          <pkg.icon className="h-6 w-6 md:h-7 md:w-7 text-rose-100" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs tracking-[0.25em] uppercase text-[#fffcf2]/45 mb-1">{pkg.tagline}</p>
                          <h3 className="font-serif text-2xl md:text-3xl text-[#fffcf2] font-light leading-tight">
                            {pkg.label} Massage
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="flex items-baseline gap-2 justify-end">
                        <span className="font-serif text-3xl md:text-5xl text-[#fffcf2] font-light">{pkg.price}</span>
                      </div>
                      <p className="text-sm text-[#fffcf2]/40 mt-0.5">
                        <span className="line-through">{pkg.regularPrice}</span>
                      </p>
                      <p className="text-xs text-rose-200/70 mt-1">
                        {pkg.perSession} / session
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-[#fffcf2]/70 leading-relaxed mb-6 md:mb-7">
                    {pkg.description}
                  </p>

                  {/* Best for chips */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {pkg.bestFor.split(' · ').map((item) => (
                      <span key={item} className="px-3 py-1.5 rounded-full border border-[#fffcf2]/10 text-xs text-[#fffcf2]/60 tracking-wide">
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Includes */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7 pt-6 border-t border-[#fffcf2]/10">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-rose-200 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#fffcf2]/80">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-rose-100 via-amber-100 to-rose-100 text-[#1a260e] py-5 px-8 rounded-xl font-semibold text-sm md:text-base tracking-[0.15em] uppercase transition-all duration-500 group-hover:shadow-[0_8px_40px_rgba(244,194,194,0.25)] group-hover:scale-[1.02]">
                    <span>Book {pkg.label} Ritual &mdash; {pkg.price}</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>

                  <p className="text-center text-xs text-[#fffcf2]/35 mt-3 tracking-wider">
                    3 sessions &nbsp;·&nbsp; Edgware, London
                  </p>
                </div>
              </a>

              {/* Package comparison teaser */}
              <div className="mt-5 grid grid-cols-3 gap-2 md:gap-3">
                {PACKAGE_IDS.filter((id) => id !== selected).map((id) => {
                  const p = PACKAGES[id];
                  return (
                    <button
                      key={id}
                      onClick={() => setSelected(id)}
                      className="group col-span-3 md:col-span-1 text-left p-4 rounded-xl border border-[#1a260e]/10 hover:border-[#1a260e]/25 transition-all bg-white/40 hover:bg-white"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs tracking-[0.2em] uppercase text-[#1a260e]/50 mb-1">{p.tagline}</p>
                          <p className="font-serif text-lg text-[#1a260e] font-light">{p.label}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-lg text-[#1a260e]">{p.price}</p>
                          <p className="text-[10px] text-[#1a260e]/45 tracking-wider group-hover:text-[#1a260e] transition-colors">
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
          DROP-IN — just testing the waters?
         ════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-[#fffcf2]">
        <div className="container-width px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-[#1a260e]/10 bg-gradient-to-br from-white via-rose-50/40 to-amber-50/30">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,194,194,0.18)_0%,_transparent_55%)]" />

                <div className="relative p-7 md:p-10 md:flex md:items-center md:justify-between gap-8">
                  <div className="flex-1 mb-6 md:mb-0">
                    <p className="text-xs tracking-[0.25em] uppercase text-[#1a260e]/50 mb-3">
                      NOT READY FOR A PACK?
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#1a260e] font-light leading-tight mb-3">
                      Try a single session <span className="italic">first</span>
                    </h3>
                    <p className="text-sm md:text-base text-[#1a260e]/65 leading-relaxed max-w-md">
                      Want to feel it before committing to three? Book a one-off drop-in
                      and see why our regulars keep coming back.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <a
                      href={DROP_IN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 bg-[#1a260e] text-[#fffcf2] px-7 md:px-8 py-4 md:py-5 font-sans text-xs md:text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-sm w-full md:w-auto justify-center"
                    >
                      BOOK A DROP-IN
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <p className="text-[10px] md:text-xs text-[#1a260e]/40 tracking-wider text-center mt-2.5">
                      Single session · All lengths
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BENEFITS GRID
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <p className="tagline text-[#1a260e]/50 mb-4">THE SCIENCE OF STILLNESS</p>
              <h2 className="heading-secondary">
                What happens <span className="italic">when you finally rest</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="group relative p-6 md:p-7 rounded-2xl border border-[#1a260e]/10 bg-white/50 hover:bg-white hover:border-[#1a260e]/20 transition-all duration-500 h-full">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-100 to-amber-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <b.icon className="h-5 w-5 text-[#1a260e]/70" />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2">{b.title}</h3>
                  <p className="text-sm text-[#1a260e]/65 leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THIS IS FOR YOU
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-12">
                <p className="tagline text-[#1a260e]/50 mb-4">IS THIS FOR ME?</p>
                <h2 className="heading-secondary">
                  You&apos;ll love this if&hellip;
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-5 md:p-6 rounded-xl bg-white/60 border border-[#1a260e]/8">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-100 to-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-[#1a260e]/70" />
                    </div>
                    <span className="text-sm md:text-base text-[#1a260e]/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHY EUFORYC — trust section
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#1a260e] text-[#fffcf2] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,194,194,0.04)_0%,_transparent_60%)]" />

        <div className="relative container-width">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-[#fffcf2]/40 text-xs tracking-[0.3em] uppercase mb-4">WHY EUFORYC</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light mb-6 md:mb-8">
                A wellness home, <span className="italic">not another clinical room</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[#fffcf2]/70 text-sm md:text-lg leading-relaxed mb-10 md:mb-14">
                Edgware&apos;s only multi-wellness destination &mdash; where massage, pilates, skin, and a beautiful café
                live under one roof. Arrive early for a matcha. Stay after for a treatment. Make it a whole afternoon.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { title: 'Expert Therapists', desc: 'Trained, licensed, deeply intuitive' },
                  { title: 'Beautifully Designed', desc: 'Calm spaces, soft lighting, warm scents' },
                  { title: 'Totally Tailored', desc: 'Every session shaped around you' },
                  { title: 'Local to Edgware', desc: 'Easy parking, 5 min from the tube' },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl border border-[#fffcf2]/10 bg-[#fffcf2]/[0.03]">
                    <h3 className="font-serif text-base md:text-lg font-light text-[#fffcf2] mb-2">{item.title}</h3>
                    <p className="text-xs md:text-sm text-[#fffcf2]/55 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-10 md:mt-14 flex flex-wrap justify-center gap-5 md:gap-8 text-[#fffcf2]/50 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Edgware, London</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Loved by our community</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Private treatment rooms</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-12">
                <p className="tagline text-[#1a260e]/50 mb-4">QUESTIONS, ANSWERED</p>
                <h2 className="heading-secondary">Before you book</h2>
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
              <div className="text-center mt-10 md:mt-14">
                <p className="text-sm text-[#1a260e]/50 mb-4">Still wondering about something?</p>
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
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e] via-[#1d2a11] to-[#2a2418]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,194,194,0.10)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,181,148,0.08)_0%,_transparent_50%)]" />

        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#fffcf2]/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#fffcf2]/[0.02]" />

        <div className="relative z-10 container-width text-center px-6">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 bg-rose-200/10 border border-rose-200/20 rounded-full px-4 py-2">
                <Timer className="h-4 w-4 text-rose-200" />
                <span className="text-sm text-rose-100 font-medium">
                  {timeLeft.days > 0
                    ? `${timeLeft.days} days left on this offer`
                    : 'Last chance — offer ending soon'}
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl text-[#fffcf2] font-light leading-[1.05]">
                Book the thing.<br />
                <span className="italic bg-gradient-to-r from-rose-100 to-amber-100 bg-clip-text text-transparent">
                  Feel like yourself again.
                </span>
              </h2>

              <p className="text-[#fffcf2]/65 text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
                Three sessions. One ritual. A slower, softer version of yourself
                on the other side of it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <a
                  href="#packages"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-rose-100 via-amber-100 to-rose-100 text-[#1a260e] px-9 md:px-11 py-4 md:py-5 font-sans text-sm tracking-[0.18em] uppercase font-semibold transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(244,194,194,0.3)] rounded-sm"
                >
                  CHOOSE YOUR RITUAL
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <p className="text-[#fffcf2]/35 text-xs tracking-wider pt-2">
                Edgware, London &nbsp;·&nbsp; Private rooms &nbsp;·&nbsp; Tailored to you
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
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-200 via-amber-100 to-rose-200 text-[#1a260e] w-full py-4 text-sm tracking-[0.12em] uppercase rounded-lg active:scale-[0.98] transition-transform font-semibold"
        >
          BOOK {pkg.label.toUpperCase()} — {pkg.price}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
