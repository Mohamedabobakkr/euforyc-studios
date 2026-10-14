'use client';

import { useState, useEffect, useMemo } from 'react';
import {
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
import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';

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

// ─── Scroll Reveal ────────────────────────────────────────────
// CSS-only (eu-rv): content is always rendered visible, and only animates
// where scroll-driven animations are supported and motion is allowed.
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`eu-rv ${className}`}>{children}</div>;
}

// ─── FAQ Item ─────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1a260e]/15">
      <button
        onClick={() => setOpen(!open)}
        className="w-full min-h-[72px] flex items-center justify-between gap-5 py-5 md:py-6 text-left group"
      >
        <h3 className="font-serif text-xl md:text-2xl font-normal leading-snug text-eu-ink">{q}</h3>
        <span
          className={`grid place-items-center w-10 h-10 rounded-full border border-[#1a260e]/25 text-eu-ink flex-shrink-0 transition-[transform,background-color,color] duration-500 ease-eu group-hover:bg-eu-ink group-hover:text-eu-cream ${open ? 'rotate-180' : ''}`}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? '420px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="text-[15px] text-eu-green pb-6 leading-[1.7] max-w-[62ch]">{a}</p>
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
  const [copied, setCopied] = useState(false);
  const endOfMonth = useMemo(() => getEndOfMonth(), []);
  const timeLeft = useCountdown(endOfMonth);

  const pkg = PACKAGES[selected];

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('MASSAGE10');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="pb-24 md:pb-0 bg-eu-cream">

      {/* ════════════════════════════════════════════════════════
          PROMO BANNER — today-only discount code
          (sits under the fixed header, together with the hero below)
         ════════════════════════════════════════════════════════ */}
      <div className="relative bg-eu-ink text-eu-cream pt-[var(--eu-header-space)] eu-on-dark">
        <div className="eu-wrap">
          <div className="py-4 md:py-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center border-b border-[#fffcf2]/15">
            <div className="eu-cap flex items-center gap-2 text-eu-beige">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="font-medium">Today Only</span>
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            </div>

            <p className="text-[15px] leading-snug text-eu-cream">
              Apply at checkout for an <span className="font-medium text-eu-cream underline decoration-[#fffcf2]/50 underline-offset-4">additional 10% off</span> —
            </p>

            <button
              type="button"
              onClick={copyCode}
              aria-label="Copy discount code MASSAGE10"
              className="group relative inline-flex items-center gap-3 min-h-[44px] pl-5 pr-1.5 py-1.5 rounded-full border border-dashed border-[#fffcf2]/60 hover:bg-[#fffcf2]/10 transition-colors"
            >
              <span className="font-mono text-[15px] font-semibold tracking-[0.25em] text-eu-cream">
                MASSAGE10
              </span>
              <span className="inline-flex items-center min-h-[32px] px-3.5 rounded-full bg-eu-cream text-eu-ink text-[10.5px] uppercase tracking-[0.16em] font-medium">
                {copied ? 'Copied ✓' : 'Tap to copy'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-eu-ink text-eu-cream rounded-b-[32px] md:rounded-b-eu-xl eu-on-dark">
        <div className="relative z-10 eu-wrap text-center pt-12 pb-32 md:pt-20 md:pb-40">
          {/* Urgency + social proof row */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
              <div className="eu-chip">
                <Timer className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-[12px] tracking-[0.12em] font-medium">
                  OFFER ENDS IN {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                </span>
              </div>

              <div className="eu-chip">
                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-[12px] tracking-[0.12em]">NEW AT EUFORYC</span>
              </div>
            </div>
          </Reveal>

          {/* Overline */}
          <Reveal delay={0.08}>
            <p className="eu-cap text-eu-beige mb-6 md:mb-8">
              The Euforyc &nbsp;·&nbsp; Edgware, London
            </p>
          </Reveal>

          {/* Main headline */}
          <Reveal delay={0.15}>
            <h1 className="font-serif font-normal text-[clamp(60px,10.4vw,168px)] leading-[0.9] tracking-[-0.03em] text-eu-cream mb-8 md:mb-10">
              Massage{' '}<br />
              <em className="italic text-eu-beige">
                Ritual
              </em>
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="text-eu-beige text-[17px] md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 md:mb-12">
              Three sessions. One slow, deliberate return to yourself.<br className="hidden md:block" />
              <span className="block mt-2 font-serif italic text-eu-cream text-lg md:text-2xl">Melt tension. Restore calm. Leave lighter.</span>
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center items-center">
              <PillLink href="#packages" variant="cream" dot className="w-full sm:w-auto !justify-between">
                CHOOSE YOUR RITUAL
              </PillLink>
              <a href="#the-ritual" className="eu-ulink">
                What to expect →
              </a>
            </div>
          </Reveal>

          {/* Trust row */}
          <Reveal delay={0.4}>
            <div className="mt-14 md:mt-20 pt-6 md:pt-8 border-t border-[#fffcf2]/15 max-w-3xl mx-auto">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-eu-beige text-[13px] md:text-sm">
                {trust.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-eu-beige">
          <span className="text-[10.5px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#fffcf2]/50 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          EMOTIONAL PITCH
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-eu-cream">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="eu-cap text-eu-green mb-6">A DEEP BREATH, MADE PHYSICAL</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif font-normal text-[clamp(38px,5vw,72px)] leading-[1.02] tracking-[-0.025em] text-eu-ink mb-8 md:mb-10">
                You&apos;ve been carrying<br />
                <em className="italic">more than you realise</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5 text-eu-green text-[17px] md:text-lg leading-[1.75] max-w-2xl mx-auto">
                <p>
                  The shoulders that sit somewhere near your ears. The jaw you unclench at red lights.
                  The knot between your shoulder blades that&apos;s been there since &mdash; when, exactly?
                </p>
                <p>
                  You tell yourself you&apos;ll book something. You keep not. Life keeps happening.
                </p>
                <p className="font-serif text-eu-ink italic text-xl md:text-2xl leading-snug pt-2">
                  This is the part where you stop putting yourself last.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 md:mt-12 inline-flex items-center gap-3 bg-eu-beige rounded-[28px] px-6 py-3 min-h-[52px]">
                <Heart className="h-4 w-4 text-eu-green flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[15px] text-eu-green">
                  Rest isn&apos;t a reward. <strong className="text-eu-ink font-medium">It&apos;s maintenance.</strong>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE RITUAL — step by step walkthrough
         ════════════════════════════════════════════════════════ */}
      <section
        id="the-ritual"
        className="section-padding bg-eu-ink text-eu-cream relative overflow-hidden rounded-[32px] md:rounded-eu-xl mx-[clamp(10px,1.5vw,24px)] scroll-mt-[calc(var(--eu-header-space)_+_12px)] eu-on-dark"
      >
        <div className="relative container-width">
          <Reveal>
            <div className="text-center mb-14 md:mb-20">
              <p className="eu-cap text-eu-beige mb-5">WHAT TO EXPECT</p>
              <h2 className="font-serif font-normal text-[clamp(42px,5.6vw,88px)] leading-none tracking-[-0.025em] mb-6">
                The <em className="italic">Ritual</em>
              </h2>
              <p className="text-eu-beige text-[17px] leading-[1.75] max-w-xl mx-auto">
                Every session unfolds the same way &mdash; a designed moment of stillness, from the second you arrive to the moment you leave.
              </p>
            </div>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical spine */}
              <div className="absolute left-[27px] md:left-[31px] top-4 bottom-4 w-px bg-[#fffcf2]/20" />

              <div className="space-y-10 md:space-y-14">
                {ritual.map((step) => (
                  <Reveal key={step.step}>
                    <div className="flex gap-5 md:gap-8">
                      {/* Step circle */}
                      <div className="relative flex-shrink-0">
                        <div className="w-[55px] h-[55px] md:w-[63px] md:h-[63px] rounded-full border border-[#fffcf2]/30 flex items-center justify-center bg-eu-ink relative">
                          <step.icon className="relative h-5 w-5 md:h-6 md:w-6 text-eu-beige" strokeWidth={1.5} />
                        </div>
                        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-1.5 bg-eu-ink font-serif italic text-[13px] leading-none text-eu-beige">
                          {step.step}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="pt-2 pb-4 md:pt-3">
                        <h3 className="font-serif font-normal text-[26px] md:text-3xl lg:text-[34px] leading-tight text-eu-cream mb-2 md:mb-3">
                          {step.title}
                        </h3>
                        <p className="text-[15px] md:text-base text-eu-beige leading-relaxed max-w-xl">
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
      <section id="packages" className="section-padding bg-eu-cream scroll-mt-[var(--eu-header-space)]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <p className="eu-cap text-eu-green mb-5">CHOOSE YOUR LENGTH</p>
              <h2 className="heading-secondary">
                Three Rituals. <em className="italic">One for every kind of day.</em>
              </h2>
              <p className="body-text max-w-2xl mx-auto mt-5">
                Each pack is three sessions &mdash; enough to make rest a habit, not a one-off.
              </p>
            </div>
          </Reveal>

          {/* Selector Pills */}
          <Reveal delay={0.05}>
            <div className="flex flex-wrap justify-center gap-2.5 mb-8 md:mb-12">
              {PACKAGE_IDS.map((id) => {
                const p = PACKAGES[id];
                const isActive = selected === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSelected(id)}
                    className={`min-h-[48px] px-5 md:px-6 rounded-full border font-sans text-[13px] md:text-sm tracking-[0.08em] transition-colors duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-eu-ink border-eu-ink text-eu-cream'
                        : 'bg-transparent border-[#1a260e]/25 text-eu-green hover:border-eu-ink hover:text-eu-ink'
                    }`}
                  >
                    <Clock className="h-4 w-4" strokeWidth={1.5} />
                    <span>{p.label}</span>
                    {p.highlight && (
                      <span className={`text-[10.5px] px-2.5 py-1 rounded-full tracking-[0.12em] ${
                        isActive ? 'bg-[#fffcf2]/15 text-eu-cream' : 'bg-eu-beige text-eu-green'
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
                className="group block relative rounded-[28px] md:rounded-eu-lg overflow-hidden bg-eu-ink text-eu-cream transition-transform duration-500 ease-eu hover:-translate-y-1"
              >
                <div className="relative p-6 sm:p-8 md:p-10 eu-on-dark">
                  {/* Top: badge + title + price */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5 sm:gap-4 mb-6">
                    <div className="flex-1 min-w-0">
                      <div className="eu-chip mb-5">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                        <span className="text-xs tracking-[0.14em] font-medium">{pkg.savings.toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-4 mb-1">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#fffcf2]/10 flex items-center justify-center flex-shrink-0">
                          <pkg.icon className="h-5 w-5 md:h-6 md:w-6 text-eu-beige" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <p className="eu-cap text-eu-beige mb-1.5">{pkg.tagline}</p>
                          <h3 className="font-serif font-normal text-[28px] md:text-4xl text-eu-cream leading-[1.05]">
                            {pkg.label} Massage
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-x-4 gap-y-1 flex-wrap sm:block sm:text-right flex-shrink-0">
                      <div className="flex items-baseline gap-2 sm:justify-end">
                        <span className="font-serif text-5xl md:text-6xl text-eu-cream leading-none">{pkg.price}</span>
                      </div>
                      <p className="text-sm text-eu-beige sm:mt-2">
                        <span className="line-through">{pkg.regularPrice}</span>
                      </p>
                      <p className="text-sm text-eu-beige sm:mt-1">
                        {pkg.perSession} / session
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[15px] md:text-base text-eu-beige leading-relaxed mb-6 md:mb-7">
                    {pkg.description}
                  </p>

                  {/* Best for chips */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {pkg.bestFor.split(' · ').map((item) => (
                      <span key={item} className="eu-chip">
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Includes */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 pt-6 border-t border-[#fffcf2]/15">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-eu-live mt-1 flex-shrink-0" strokeWidth={1.5} />
                        <span className="text-[15px] text-eu-cream">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="eu-btn eu-btn--cream eu-btn--block !whitespace-normal !text-left !leading-snug !tracking-[0.14em] group-hover:!bg-eu-beige">
                    <span>Book {pkg.label} Ritual &mdash; {pkg.price}</span>
                    <span className="eu-btn__dot group-hover:-rotate-45">
                      <Arrow />
                    </span>
                  </div>

                  <p className="text-center text-xs text-eu-beige mt-4 tracking-[0.14em]">
                    3 sessions &nbsp;·&nbsp; Edgware, London
                  </p>
                </div>
              </a>

              {/* Package comparison teaser */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {PACKAGE_IDS.filter((id) => id !== selected).map((id) => {
                  const p = PACKAGES[id];
                  return (
                    <button
                      key={id}
                      onClick={() => setSelected(id)}
                      className="group text-left p-5 min-h-[76px] rounded-eu-sm border border-[#1a260e]/15 bg-eu-cream hover:bg-eu-beige hover:border-[#1a260e]/30 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="eu-cap text-eu-sage mb-1.5">{p.tagline}</p>
                          <p className="font-serif text-xl text-eu-ink">{p.label}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-xl text-eu-ink">{p.price}</p>
                          <p className="text-[11px] text-eu-green tracking-[0.16em] mt-1">
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
      <section className="pb-12 md:pb-20 bg-eu-cream">
        <div className="eu-wrap">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="relative rounded-[28px] md:rounded-eu-lg bg-eu-beige">
                <div className="relative p-7 md:p-10 md:flex md:items-center md:justify-between gap-8">
                  <div className="flex-1 mb-7 md:mb-0">
                    <p className="eu-cap text-eu-green mb-4">
                      NOT READY FOR A PACK?
                    </p>
                    <h3 className="font-serif font-normal text-[30px] md:text-4xl text-eu-ink leading-[1.08] mb-3">
                      Try a single session <em className="italic">first</em>
                    </h3>
                    <p className="text-[15px] md:text-base text-eu-green leading-relaxed max-w-md">
                      Want to feel it before committing to three? Book a one-off drop-in
                      and see why our regulars keep coming back.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <PillLink
                      href={DROP_IN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="ink"
                      dot
                      className="w-full md:w-auto !justify-between"
                    >
                      BOOK A DROP-IN
                    </PillLink>
                    <p className="text-xs text-eu-sage tracking-[0.12em] text-center mt-3">
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
      <section className="section-padding bg-eu-cream">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <p className="eu-cap text-eu-green mb-5">THE SCIENCE OF STILLNESS</p>
              <h2 className="heading-secondary">
                What happens <em className="italic">when you finally rest</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05} className="h-full">
                <div className="group relative p-7 rounded-eu-md border border-[#1a260e]/15 bg-eu-cream hover:bg-eu-beige transition-colors duration-500 h-full">
                  <div className="w-12 h-12 rounded-full bg-eu-beige group-hover:bg-eu-cream flex items-center justify-center mb-5 transition-colors duration-500">
                    <b.icon className="h-5 w-5 text-eu-green" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif font-normal text-[22px] md:text-2xl leading-snug text-eu-ink mb-2">{b.title}</h3>
                  <p className="text-[15px] text-eu-green leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THIS IS FOR YOU
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding !pt-0 bg-eu-cream">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-12">
                <p className="eu-cap text-eu-green mb-5">IS THIS FOR ME?</p>
                <h2 className="heading-secondary">
                  You&apos;ll love this if&hellip;
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 md:p-6 rounded-eu-sm bg-eu-beige">
                    <div className="w-8 h-8 rounded-full bg-eu-cream flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-eu-green" strokeWidth={1.5} />
                    </div>
                    <span className="text-[15px] md:text-base text-eu-ink leading-relaxed pt-1">{item}</span>
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
      <section className="section-padding bg-eu-ink text-eu-cream relative overflow-hidden rounded-[32px] md:rounded-eu-xl mx-[clamp(10px,1.5vw,24px)] eu-on-dark">
        <div className="relative container-width">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="eu-cap text-eu-beige mb-5">WHY EUFORYC</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-normal text-[clamp(36px,4.6vw,68px)] leading-[1.04] tracking-[-0.02em] mb-7 md:mb-9">
                A wellness home, <em className="italic">not another clinical room</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-eu-beige text-[17px] md:text-lg leading-[1.75] mb-12 md:mb-14">
                Edgware&apos;s only multi-wellness destination &mdash; where massage, pilates, skin, and a beautiful café
                live under one roof. Arrive early for a matcha. Stay after for a treatment. Make it a whole afternoon.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { title: 'Expert Therapists', desc: 'Trained, licensed, deeply intuitive' },
                  { title: 'Beautifully Designed', desc: 'Calm spaces, soft lighting, warm scents' },
                  { title: 'Totally Tailored', desc: 'Every session shaped around you' },
                  { title: 'Local to Edgware', desc: 'Easy parking, 5 min from the tube' },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-eu-sm border border-[#fffcf2]/15 bg-[#fffcf2]/[0.04]">
                    <h3 className="font-serif font-normal text-lg md:text-xl leading-snug text-eu-cream mb-2">{item.title}</h3>
                    <p className="text-sm text-eu-beige leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-12 md:mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-eu-beige text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" strokeWidth={1.5} />
                  <span>Edgware, London</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" strokeWidth={1.5} />
                  <span>Loved by our community</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" strokeWidth={1.5} />
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
      <section className="section-padding bg-eu-cream">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-12">
                <p className="eu-cap text-eu-green mb-5">QUESTIONS, ANSWERED</p>
                <h2 className="heading-secondary">Before you book</h2>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="border-t border-[#1a260e]/15">
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-center mt-10 md:mt-14">
                <p className="text-[15px] text-eu-green mb-4">Still wondering about something?</p>
                <PillLink href="/contact" variant="line">
                  GET IN TOUCH
                </PillLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FINAL CTA
         ════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-eu-ink text-eu-cream rounded-[32px] md:rounded-eu-xl mx-[clamp(10px,1.5vw,24px)] mb-6 eu-on-dark">
        <div className="relative z-10 eu-wrap text-center">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-7 md:space-y-8">
              <div className="eu-chip">
                <Timer className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm">
                  {timeLeft.days > 0
                    ? `${timeLeft.days} days left on this offer`
                    : 'Last chance — offer ending soon'}
                </span>
              </div>

              <h2 className="font-serif font-normal text-[clamp(42px,5.6vw,88px)] text-eu-cream leading-none tracking-[-0.025em]">
                Book the thing.<br />
                <em className="italic text-eu-beige">
                  Feel like yourself again.
                </em>
              </h2>

              <p className="text-eu-beige text-[17px] md:text-lg max-w-lg mx-auto leading-relaxed">
                Three sessions. One ritual. A slower, softer version of yourself
                on the other side of it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <PillLink href="#packages" variant="cream" dot className="w-full sm:w-auto !justify-between">
                  CHOOSE YOUR RITUAL
                </PillLink>
              </div>

              <p className="text-eu-beige text-xs tracking-[0.14em] pt-2">
                Edgware, London &nbsp;·&nbsp; Private rooms &nbsp;·&nbsp; Tailored to you
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STICKY MOBILE CTA
         ════════════════════════════════════════════════════════ */}
      <div className="fixed left-3 right-3 bottom-[calc(12px_+_env(safe-area-inset-bottom,0px))] md:hidden z-50">
        <a
          href={pkg.momenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 bg-eu-ink text-eu-cream w-full min-h-[60px] pl-6 pr-2 py-2 text-[12px] tracking-[0.16em] uppercase rounded-full shadow-[0_24px_50px_-20px_rgba(26,38,14,0.7)] active:scale-[0.98] transition-transform"
        >
          BOOK {pkg.label.toUpperCase()} — {pkg.price}
          <span className="eu-btn__dot bg-eu-cream text-eu-ink">
            <Arrow />
          </span>
        </a>
      </div>
    </div>
  );
}
