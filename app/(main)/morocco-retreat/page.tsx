'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Timer,
  Sparkles,
  ChevronDown,
  Heart,
  Sun,
  Moon,
  Utensils,
  Plane,
  Gift,
  Flower2,
  CalendarDays,
  MapPin,
  ChefHat,
  Hand,
  Cookie,
  BedDouble,
  Quote,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// EDITABLE CONSTANTS — bank transfer booking
// Booking is confirmed by 50% deposit to the account below.
// ═══════════════════════════════════════════════════════════════
const BANK_DETAILS = {
  name: 'EUFORYC STUDIOS LTD',
  accountNumber: '23704295',
  sortCode: '04-00-03',
} as const;

// Retreat opens for booking — countdown ends here
const RETREAT_START = new Date(2026, 6, 17); // 17 July 2026

// Capacity — kept intentionally small for an intimate, properly-hosted retreat
const TOTAL_GUEST_SPACES = 9;
const SPACES_TAKEN = 0; // update as bookings come in

// ═══════════════════════════════════════════════════════════════
// PACKAGE — one all-inclusive retreat
// ═══════════════════════════════════════════════════════════════
const PACKAGE = {
  label: 'Marrakesh Wellness Retreat',
  short: 'Marrakesh',
  tagline: 'One retreat · only 9 spaces',
  price: 900,
  earlyPrice: 810,
  priceLabel: '£900',
  earlyPriceLabel: '£810',
  perNight: '£129 / night',
  description:
    'Seven nights at a private villa just outside Marrakesh — every detail handled, every meal cooked for you, every day designed to reset your nervous system. One package, one rhythm, one small group of women.',
  bestFor: 'Intimate · All-inclusive · Properly hosted',
  icon: Flower2,
  includes: [
    '7 nights at a private Marrakesh villa',
    'Airport transfers — Marrakesh Menara (RAK)',
    'Full-course private chef meals, every day',
    'Daily Pilates and movement sessions',
    'Moroccan cooking workshop with the chef',
    'In-villa massage experience',
    'Moroccan dessert tasting experience',
    'Pool access, group dinners, workshops',
    'Welcome gift bag · full retreat itinerary',
    'Hosted support from the Euforyc team',
  ],
} as const;

// ═══════════════════════════════════════════════════════════════
// CONTENT — facts, includes, itinerary, faqs
// ═══════════════════════════════════════════════════════════════
const facts = [
  { label: '7 Nights', icon: Moon },
  { label: '17–24 July 2026', icon: CalendarDays },
  { label: 'Marrakesh, Morocco', icon: MapPin },
  { label: 'Women Only · 9 Spaces', icon: Heart },
];

const included = [
  {
    icon: Flower2,
    title: 'Daily Pilates & Movement',
    desc: 'Morning flows, sunset stretches, signature Euforyc sessions — outdoor by the pool, indoor in the villa.',
  },
  {
    icon: ChefHat,
    title: 'Full-Course Private Chef',
    desc: 'A private chef, every meal, every day. Full courses cooked for each guest — Moroccan flavours, slow long-table dinners.',
  },
  {
    icon: Utensils,
    title: 'Moroccan Cooking Workshop',
    desc: 'Hands-on with the chef. Tagines, spice blends, the real way bread is made here. You leave knowing how to cook it at home.',
  },
  {
    icon: Hand,
    title: 'In-Villa Massage',
    desc: 'A proper Moroccan massage at the villa — no rushing, no scheduling stress. Built into the rhythm of the week.',
  },
  {
    icon: Cookie,
    title: 'Moroccan Dessert Experience',
    desc: 'Mint tea, almond pastries, orange-blossom sweets — a tasting evening built around the things Morocco does best.',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    desc: 'Pickup from Marrakesh Menara airport (RAK) and drop-off included. You arrive, you exhale, you forget logistics.',
  },
  {
    icon: Sun,
    title: 'Poolside Slow Living',
    desc: 'Long mornings by the water. Matcha. Journaling. Reading. The kind of stillness real life never allows.',
  },
  {
    icon: BedDouble,
    title: 'Beautiful Accommodation',
    desc: 'A whitewashed Marrakesh villa with a private pool, palm groves, and the kind of golden-hour light you can\'t fake.',
  },
  {
    icon: Sparkles,
    title: 'Workshops & Experiences',
    desc: 'Confidence workshops, breathwork, journaling, photoshoot moments — content and connection, woven through the week.',
  },
  {
    icon: Gift,
    title: 'Welcome Gift Bag',
    desc: 'Curated arrival gifts. Small things that say: this week, you\'re looked after.',
  },
  {
    icon: Heart,
    title: 'Hosted by the Euforyc Team',
    desc: 'You\'re held the whole way through. Every detail handled, every need anticipated.',
  },
];

// 7-night itinerary
const itinerary = [
  {
    day: 'Day 1',
    date: '17 July',
    title: 'Arrival & Welcome',
    theme: 'Soft landing, connection, arrival',
    items: [
      'Airport pickup from Marrakesh Menara (RAK)',
      'Arrival at the villa · welcome mint tea by the pool',
      'Room check-in and settling in',
      'Light stretch or grounding session',
      'Welcome dinner with the group',
      'Opening circle, intentions and introductions',
    ],
  },
  {
    day: 'Day 2',
    date: '18 July',
    title: 'Align & Reset',
    theme: 'Grounding into the retreat',
    items: [
      'Morning Pilates · alignment, breath and core',
      'Full-course breakfast by the villa',
      'Pool time and slow morning',
      'Long-table lunch by the chef',
      'Journaling: setting your retreat intention',
      'Sunset stretch and mobility',
      'Private chef dinner',
    ],
  },
  {
    day: 'Day 3',
    date: '19 July',
    title: 'Strength & Confidence',
    theme: 'Energy, confidence, body connection',
    items: [
      'Morning Pilates · glutes, abs and full-body strength',
      'Breakfast',
      'Free time by the pool',
      'Lunch',
      'Confidence and wellness workshop',
      'Golden-hour Pilates or sculpt session',
      'Dinner under the stars',
      'Chill social evening, music and games',
    ],
  },
  {
    day: 'Day 4',
    date: '20 July',
    title: 'The Cooking Workshop',
    theme: 'Hands-on with the chef',
    items: [
      'Later morning stretch or optional Pilates',
      'Brunch-style breakfast',
      'Moroccan cooking workshop with the chef',
      'Cook the lunch you just learned to make',
      'Pool time, journaling and rest',
      'Breathwork and deep stretch at sunset',
      'Dinner — the chef\'s signature menu',
    ],
  },
  {
    day: 'Day 5',
    date: '21 July',
    title: 'Massage & Slow Day',
    theme: 'Rest, softness, feminine wellness',
    items: [
      'Light morning Pilates',
      'Breakfast',
      'In-villa Moroccan massage rotations',
      'Mint tea on the loungers between sessions',
      'Full-course lunch by the pool',
      'Optional mini photoshoot around the villa',
      'Sunset breathwork',
      'Relaxed dinner',
    ],
  },
  {
    day: 'Day 6',
    date: '22 July',
    title: 'Euforyc Signature Day',
    theme: 'The main content and celebration day',
    items: [
      'Morning full-body Pilates flow',
      'Breakfast',
      'Free time and pool',
      'Lunch',
      'Matching neutral Pilates set moment for content',
      'Sunset Euforyc signature flow',
      'Moroccan dessert tasting experience',
      'Dress-up dinner — candles, music, long-table dining',
    ],
  },
  {
    day: 'Day 7',
    date: '23 July',
    title: 'Integration & Closing',
    theme: 'Reflection, gratitude, connection',
    items: [
      'Morning stretch and Pilates',
      'Breakfast',
      'Reflection journaling session',
      'Free time by the pool',
      'Closing circle',
      'Final sunset movement session',
      'Farewell dinner',
    ],
  },
  {
    day: 'Day 8',
    date: '24 July',
    title: 'Departure',
    theme: 'Goodbye and onwards',
    items: [
      'Breakfast',
      'Check-out',
      'Airport transfers to Marrakesh Menara (RAK)',
      'Goodbye hugs and post-retreat content moments',
    ],
  },
];

const faqs = [
  {
    q: 'Are flights included?',
    a: 'Flights are not included. We\'ll send recommended flight options once you book — guests just need to arrive into Marrakesh Menara (RAK) within the scheduled transfer windows so we can include the airport pickup. We\'ll handle the transfer once you land.',
  },
  {
    q: 'Can I pay in instalments?',
    a: 'Yes — pay 50% now to confirm your space, and the remaining 50% before the retreat. Both payments are made by UK bank transfer to EUFORYC STUDIOS LTD (account 23704295, sort code 04-00-03). You can also pay the full amount up front if you prefer.',
  },
  {
    q: 'What\'s included in the package?',
    a: 'Everything: 7 nights at the villa, airport transfers from Marrakesh Menara (RAK), full-course private chef meals every day, daily Pilates, a Moroccan cooking workshop, an in-villa massage, a Moroccan dessert tasting experience, all workshops, the welcome gift bag and full hosted support. The only thing not included is your flight.',
  },
  {
    q: 'How does the early bird offer work?',
    a: 'The first 3 guests get 10% off, plus priority room selection and an exclusive birthday gift upgrade on arrival. Once those spots are claimed, prices return to standard.',
  },
  {
    q: 'How many spaces are there?',
    a: 'Nine. That\'s it. The retreat is intentionally tiny so it can be properly hosted — every guest knows every other guest by Day 2, and every detail of your week is held by us.',
  },
  {
    q: 'Who is this retreat for?',
    a: 'Women who want a real reset. Whether you do Pilates every day or you\'ve never tried it, this is built around movement, rest, and connection — not pushing yourself to your limit. Every session is adaptable, every meal is taken care of, every detail is held.',
  },
  {
    q: 'What if I\'m travelling alone?',
    a: 'Most of our guests come solo. The retreat is designed for women who want to make new friends — you\'ll be matched thoughtfully if you\'re sharing a room, and the small group format means by Day 2 it won\'t feel like you arrived alone at all.',
  },
  {
    q: 'What\'s the cancellation policy?',
    a: 'Deposits secure your spot and are non-refundable. Final balance due before the retreat. We recommend travel insurance — life happens, and it covers you.',
  },
  {
    q: 'How fit do I need to be?',
    a: 'All levels welcome. Sessions are designed to meet you where you are — whether you\'re a Pilates regular or this is your reset moment. There is no pressure to do every session; the rhythm of the week is yours to shape.',
  },
];

// ═══════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════
function useCountdown(targetDate: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff > 0) {
        setT({
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
  return t;
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.85s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.85s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

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
          className={`h-5 w-5 text-[#1a260e]/40 flex-shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? '320px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-[#1a260e]/70 pb-5 md:pb-6 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function MoroccoRetreatPage() {
  const startCountdown = useCountdown(useMemo(() => RETREAT_START, []));

  const spacesLeft = TOTAL_GUEST_SPACES - SPACES_TAKEN;

  const pkg = PACKAGE;

  return (
    <div className="pt-24 pb-24 md:pb-0 bg-[#fffcf2]">

      {/* ════════════════════════════════════════════════════════
          HERO — full-bleed villa, layered atmospherics
         ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/retreat/hero-villa.jpg"
            alt="A private Marrakesh villa at sunset — pool, palm trees and golden Moroccan light"
            fill
            priority
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
          {/* Deep gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a260e]/85 via-[#1a260e]/55 to-[#1a260e]/90" />
          {/* Warm Moroccan sun glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,194,140,0.18)_0%,_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,123,90,0.14)_0%,_transparent_50%)]" />
          {/* Fine grain */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 container-width text-center px-6 py-20">
          {/* Editorial masthead — Women Only flourish */}
          <Reveal>
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-10">
              <span
                aria-hidden
                className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-[#fffcf2]/25 to-[#fffcf2]/45"
              />
              <div className="flex items-center gap-2.5 md:gap-3.5 whitespace-nowrap">
                <span aria-hidden className="text-amber-200/70 text-[10px] md:text-xs leading-none -translate-y-px">
                  ◆
                </span>
                <span className="font-serif italic text-[#fffcf2]/95 text-[15px] md:text-lg tracking-[0.18em] leading-none">
                  For Women Only
                </span>
                <span aria-hidden className="text-amber-200/70 text-[10px] md:text-xs leading-none -translate-y-px">
                  ◆
                </span>
              </div>
              <span
                aria-hidden
                className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent via-[#fffcf2]/25 to-[#fffcf2]/45"
              />
            </div>
          </Reveal>

          {/* Overline */}
          <Reveal delay={0.06}>
            <p className="text-[#fffcf2]/55 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-6 font-light">
              17 — 24 July 2026 &nbsp;·&nbsp; Marrakesh, Morocco
            </p>
          </Reveal>

          {/* HEADLINE — italic gradient title, IG-cover style */}
          <Reveal delay={0.12}>
            <h1 className="font-serif text-[3.5rem] leading-[0.95] md:text-[6rem] lg:text-[8.5rem] text-[#fffcf2] tracking-tight mb-2 md:mb-3">
              <span className="italic font-light bg-gradient-to-br from-amber-100 via-rose-100 to-amber-200 bg-clip-text text-transparent">
                Marrakesh
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <h2 className="font-serif italic text-[1.6rem] leading-[1.1] md:text-[3rem] lg:text-[4rem] text-[#fffcf2]/95 tracking-tight mb-4 md:mb-6 -mt-2 md:-mt-4 font-light">
              Wellness Retreat
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#fffcf2]/60 mb-7 md:mb-10">
              with Euforyc
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="text-[#fffcf2]/80 text-base md:text-xl max-w-2xl mx-auto mb-9 md:mb-12 font-light leading-relaxed">
              Seven nights of movement, sunshine, full-course private chef meals,
              cooking workshops, massage and slow living &mdash;<br className="hidden md:block" />
              the full Euforyc experience, in a private Marrakesh villa.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.34}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#packages"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 text-[#1a260e] px-9 md:px-11 py-4 md:py-5 font-sans text-sm tracking-[0.18em] uppercase font-semibold transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_8px_50px_rgba(244,194,140,0.3)] rounded-sm"
              >
                RESERVE YOUR SPACE
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#itinerary"
                className="text-[#fffcf2]/55 text-sm tracking-wider hover:text-[#fffcf2] transition-colors"
              >
                See the 7-night itinerary →
              </a>
            </div>
          </Reveal>

          {/* Facts strip */}
          <Reveal delay={0.42}>
            <div className="mt-14 md:mt-20 pt-7 md:pt-9 border-t border-[#fffcf2]/[0.1]">
              <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 md:gap-x-12 text-[#fffcf2]/55 text-xs md:text-sm">
                {facts.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span className="tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════
          PITCH — the emotional why
         ════════════════════════════════════════════════════════ */}
      <section className="px-6 py-14 md:section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="tagline text-[#1a260e]/50 mb-5">CELEBRATING EUFORYC&apos;S 1ST YEAR</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.75rem] text-[#1a260e] font-light leading-[1.2] mb-7 md:mb-9">
                Seven nights<br />
                <span className="italic">dedicated to you</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5 text-[#1a260e]/75 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                <p>
                  We&apos;re a year old. So we&apos;re doing what feels right &mdash;
                  taking the women who built this with us, and disappearing
                  into the palm groves of Marrakesh for a week.
                </p>
                <p>
                  No gym lighting. No phone notifications. No deadlines.
                  Just movement, Moroccan sunshine, full-course meals cooked for you,
                  conversations that go past midnight, and pool days that bleed into mint-tea sunsets.
                </p>
                <p className="text-[#1a260e]/90 font-normal italic">
                  This is the part where you stop earning rest, and start letting yourself have it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 md:mt-12 inline-flex items-center gap-3 bg-[#1a260e]/[0.04] rounded-full px-5 py-2.5">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-[#1a260e]/65 tracking-wide">
                  Only <strong className="text-[#1a260e] font-medium">{TOTAL_GUEST_SPACES} spaces</strong>. That&apos;s it.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PACKAGE — the conversion section (single package)
         ════════════════════════════════════════════════════════ */}
      <section id="packages" className="px-5 py-14 md:section-padding bg-[#1a260e] text-[#fffcf2] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(244,194,140,0.08)_0%,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,123,90,0.06)_0%,_transparent_50%)]" />

        <div className="relative container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <p className="text-[#fffcf2]/40 text-xs tracking-[0.3em] uppercase mb-4">RESERVE YOUR SPACE</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light mb-5">
                One retreat. <span className="italic">Nine spaces.</span>
              </h2>
              <p className="text-[#fffcf2]/55 text-sm md:text-base max-w-xl mx-auto">
                One all-inclusive package. Same daily experience for every guest &mdash;
                Pilates, chef, transfers, cooking workshop, massage, dessert experience.
              </p>
            </div>
          </Reveal>

          {/* Flexible payment plans — selling-point banner */}
          <Reveal delay={0.04}>
            <div className="max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="relative rounded-2xl overflow-hidden border border-amber-200/25">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300/10 via-rose-300/10 to-amber-300/10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,194,140,0.12)_0%,_transparent_70%)]" />

                <div className="relative px-5 py-5 md:px-7 md:py-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                    <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-200/25 to-rose-200/15 border border-amber-200/30 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-amber-200" />
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs tracking-[0.28em] uppercase text-amber-200/90 font-semibold mb-1">
                          50% Deposit · UK Bank Transfer
                        </p>
                        <p className="font-serif text-base md:text-xl text-[#fffcf2] font-light leading-tight italic">
                          Lock your spot. Pay the rest later.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffcf2]/10 border border-[#fffcf2]/15 text-[11px] md:text-xs text-[#fffcf2]/85 tracking-wide font-medium">
                        <CheckCircle2 className="h-3 w-3 text-amber-200" />
                        50% to confirm
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffcf2]/10 border border-[#fffcf2]/15 text-[11px] md:text-xs text-[#fffcf2]/85 tracking-wide font-medium">
                        <CheckCircle2 className="h-3 w-3 text-amber-200" />
                        50% before retreat
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffcf2]/10 border border-[#fffcf2]/15 text-[11px] md:text-xs text-[#fffcf2]/85 tracking-wide font-medium">
                        <CheckCircle2 className="h-3 w-3 text-amber-200" />
                        Or pay in full
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Single package card */}
          <Reveal delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <div
                className="relative rounded-2xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#fffcf2] via-[#fdf6e8] to-[#f8eed8]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,194,140,0.18)_0%,_transparent_60%)]" />

                {/* Birthday Early Bird ribbon */}
                <div className="relative bg-gradient-to-r from-amber-200 via-amber-100 to-rose-100 border-b border-amber-300/50 px-6 md:px-10 py-3.5 md:py-4">
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#1a260e]/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-amber-800" />
                    </div>
                    <div>
                      <p className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-amber-900 font-bold mb-0.5">
                        Birthday Early Bird
                      </p>
                      <p className="text-sm md:text-[15px] font-semibold text-[#1a260e] leading-tight">
                        First 3 guests <span className="italic font-medium">save 10%</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative p-7 md:p-10 text-[#1a260e]">
                  {/* Header — badge + title + price */}
                  <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-7 mb-7">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-13 h-13 md:w-14 md:h-14 rounded-xl bg-[#1a260e]/8 flex items-center justify-center flex-shrink-0">
                        <pkg.icon className="h-6 w-6 md:h-7 md:w-7 text-[#1a260e]/80" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#1a260e]/50 mb-2">
                          {pkg.tagline}
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
                          {pkg.label}
                        </h3>
                        <p className="text-xs md:text-sm text-[#1a260e]/55 mt-1">
                          7 nights · per person · {pkg.perNight}
                        </p>
                      </div>
                    </div>

                    <div className="text-left md:text-right flex-shrink-0">
                      <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#1a260e]/45 mb-1">
                        Standard
                      </p>
                      <div className="flex items-baseline gap-2 md:justify-end">
                        <span className="font-serif text-4xl md:text-5xl font-light">
                          {pkg.priceLabel}
                        </span>
                      </div>
                      <div className="mt-3 inline-flex items-center gap-2 bg-[#1a260e]/8 rounded-full px-3 py-1">
                        <Sparkles className="h-3 w-3 text-amber-700" />
                        <span className="text-[11px] md:text-xs text-[#1a260e]/75 font-medium tracking-wide">
                          Early bird:{' '}
                          <span className="line-through text-[#1a260e]/35 mr-1">{pkg.priceLabel}</span>
                          <span className="font-semibold">{pkg.earlyPriceLabel}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-[#1a260e]/75 leading-relaxed mb-6 max-w-2xl">
                    {pkg.description}
                  </p>

                  {/* Best-for chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pkg.bestFor.split(' · ').map((b) => (
                      <span
                        key={b}
                        className="px-3 py-1.5 rounded-full border border-[#1a260e]/15 text-xs text-[#1a260e]/70 tracking-wide bg-white/40"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Includes */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7 pt-6 border-t border-[#1a260e]/10">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-amber-700 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#1a260e]/80">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bank transfer — booking instructions */}
                  <div className="rounded-xl bg-[#1a260e] text-[#fffcf2] p-6 md:p-7">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-3.5 w-3.5 text-amber-200" />
                      <p className="text-[10px] md:text-xs tracking-[0.28em] uppercase text-amber-200 font-semibold">
                        How to book — Bank transfer
                      </p>
                    </div>

                    <p className="text-sm md:text-base text-[#fffcf2]/80 leading-relaxed mb-5">
                      To confirm your space, send a <span className="font-semibold text-[#fffcf2]">50% deposit</span> by UK bank transfer to the account below. The remaining 50% is due before the retreat.
                    </p>

                    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-5">
                      <div className="rounded-lg border border-[#fffcf2]/15 bg-[#fffcf2]/[0.04] px-4 py-3">
                        <dt className="text-[10px] tracking-[0.22em] uppercase text-[#fffcf2]/45 mb-1">
                          Account name
                        </dt>
                        <dd className="font-mono text-sm md:text-[15px] font-semibold text-[#fffcf2] tracking-wide break-words">
                          {BANK_DETAILS.name}
                        </dd>
                      </div>
                      <div className="rounded-lg border border-[#fffcf2]/15 bg-[#fffcf2]/[0.04] px-4 py-3">
                        <dt className="text-[10px] tracking-[0.22em] uppercase text-[#fffcf2]/45 mb-1">
                          Account number
                        </dt>
                        <dd className="font-mono text-sm md:text-[15px] font-semibold text-[#fffcf2] tracking-wide">
                          {BANK_DETAILS.accountNumber}
                        </dd>
                      </div>
                      <div className="rounded-lg border border-[#fffcf2]/15 bg-[#fffcf2]/[0.04] px-4 py-3">
                        <dt className="text-[10px] tracking-[0.22em] uppercase text-[#fffcf2]/45 mb-1">
                          Sort code
                        </dt>
                        <dd className="font-mono text-sm md:text-[15px] font-semibold text-[#fffcf2] tracking-wide">
                          {BANK_DETAILS.sortCode}
                        </dd>
                      </div>
                    </dl>

                    <p className="text-xs md:text-sm text-[#fffcf2]/55 leading-relaxed">
                      Use your full name as the payment reference. Once your transfer lands, we&apos;ll
                      email confirmation along with your full retreat itinerary and flight guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PAYMENT OPTIONS
         ════════════════════════════════════════════════════════ */}
      <section className="px-6 py-14 md:section-padding bg-[#1a260e] text-[#fffcf2] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,194,140,0.06)_0%,_transparent_60%)]" />

        <div className="relative container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <p className="text-[#fffcf2]/40 text-xs tracking-[0.3em] uppercase mb-4">HOW TO BOOK</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light">
                Two ways <span className="italic">to pay</span>
              </h2>
              <p className="text-[#fffcf2]/55 text-sm md:text-base max-w-xl mx-auto mt-4">
                All bookings are confirmed by UK bank transfer to{' '}
                <span className="font-semibold text-[#fffcf2]">{BANK_DETAILS.name}</span> —
                account {BANK_DETAILS.accountNumber}, sort code {BANK_DETAILS.sortCode}.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
            {[
              {
                icon: CalendarDays,
                title: '50% Now, 50% Later',
                desc: 'Transfer 50% to lock in your space. Remaining 50% due before the retreat.',
                tag: 'MOST POPULAR',
              },
              {
                icon: CheckCircle2,
                title: 'Pay in Full',
                desc: 'Transfer the whole package up front. Done. Off your mind.',
                tag: 'EASIEST',
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="p-6 md:p-7 rounded-2xl border border-[#fffcf2]/10 bg-[#fffcf2]/[0.04] hover:bg-[#fffcf2]/[0.07] transition-colors h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-300/15 to-rose-200/10 flex items-center justify-center">
                      <p.icon className="h-5 w-5 text-amber-200" />
                    </div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-amber-200/80 font-medium">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-light mb-2">{p.title}</h3>
                  <p className="text-sm text-[#fffcf2]/60 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <p className="text-center text-xs md:text-sm text-[#fffcf2]/45 max-w-2xl mx-auto mt-10 md:mt-12">
              Flights are not included. Once you book, we&apos;ll send recommended flights into Marrakesh
              Menara (RAK) — guests just need to arrive within the scheduled transfer windows so we
              can include the airport pickup.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE VILLA — editorial lookbook
         ════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#fffcf2] pt-4 pb-16 md:pb-24 overflow-hidden">
        {/* Whisper-soft paper grain */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-width px-6">

          {/* Editorial header */}
          <Reveal>
            <div className="mb-12 md:mb-16 max-w-4xl mx-auto text-center">
              <p className="text-[#1a260e]/45 text-[10px] md:text-[11px] tracking-[0.45em] uppercase mb-5 md:mb-7 font-medium">
                A Private Villa &middot; Just outside Marrakesh
              </p>

              <h2 className="font-serif text-[2.75rem] md:text-6xl lg:text-7xl font-light text-[#1a260e] leading-[0.95] mb-5 md:mb-7 tracking-tight">
                The{' '}
                <span className="italic bg-gradient-to-br from-amber-700 via-rose-700 to-amber-800 bg-clip-text text-transparent">
                  Villa
                </span>
              </h2>

              {/* Hairline + center diamond divider */}
              <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
                <span aria-hidden className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent via-[#1a260e]/15 to-[#1a260e]/30" />
                <span aria-hidden className="text-amber-700/70 text-[11px] md:text-xs leading-none -translate-y-px">◆</span>
                <span aria-hidden className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent via-[#1a260e]/15 to-[#1a260e]/30" />
              </div>

              <p className="text-[#1a260e]/65 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                A private villa in the palm groves outside Marrakesh &mdash; whitewashed walls,
                a long pool, an outdoor firepit, and the kind of{' '}
                <span className="italic text-[#1a260e]/90">golden-hour silence Morocco does best</span>.
              </p>
            </div>
          </Reveal>

          {/* ─── Cinematic hero — pool aerial ─── */}
          <div className="max-w-7xl mx-auto">
            <Reveal delay={0.05}>
              <figure className="group relative aspect-[16/10] md:aspect-[16/8] rounded-[20px] overflow-hidden bg-[#1a260e]/5 shadow-[0_30px_80px_-20px_rgba(26,38,14,0.25)]">
                <Image
                  src="/retreat/pool-aerial.jpg"
                  alt="Aerial view of the Marrakesh villa pool surrounded by gardens and palm trees"
                  fill
                  className="object-cover [transition:transform_1.6s_cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />

                {/* Atmospheric gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a260e]/65 via-[#1a260e]/0 to-[#1a260e]/15" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1a260e]/35 to-transparent" />

                {/* Top-right italic location stamp */}
                <div className="absolute top-5 right-5 md:top-8 md:right-10 flex items-center gap-2.5 md:gap-3 text-[#fffcf2]/90">
                  <span aria-hidden className="hidden md:inline-block h-px w-10 bg-[#fffcf2]/35" />
                  <p className="font-serif italic text-xs md:text-sm tracking-[0.32em]">
                    Marrakesh &middot; Morocco
                  </p>
                </div>

                {/* Bottom-left editorial caption */}
                <figcaption className="absolute bottom-5 left-5 md:bottom-10 md:left-10 text-[#fffcf2]">
                  <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                    <span className="text-[10px] md:text-xs tracking-[0.4em] text-amber-200/95 font-medium">
                      Nº 01
                    </span>
                    <span aria-hidden className="h-px w-10 md:w-16 bg-gradient-to-r from-amber-200/70 to-transparent" />
                  </div>
                  <p className="font-serif text-2xl md:text-4xl lg:text-5xl font-light leading-[1] tracking-tight">
                    The <span className="italic">Villa</span>
                  </p>
                  <p className="font-serif italic text-[#fffcf2]/70 text-xs md:text-sm leading-tight mt-1.5 md:mt-2">
                    seen from the sky
                  </p>
                </figcaption>

                {/* Quiet bottom-right meta strip */}
                <div className="hidden md:flex absolute bottom-10 right-10 items-center gap-6 text-[10px] tracking-[0.3em] uppercase text-[#fffcf2]/55">
                  <span>9 Guests</span>
                  <span aria-hidden className="w-1 h-1 rounded-full bg-[#fffcf2]/40" />
                  <span>Private Pool</span>
                  <span aria-hidden className="w-1 h-1 rounded-full bg-[#fffcf2]/40" />
                  <span>Palm Groves</span>
                </div>
              </figure>
            </Reveal>

            {/* ─── Lookbook row — 4 supporting frames ─── */}
            <div className="mt-3 md:mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {[
                {
                  src: '/retreat/suite.jpg',
                  no: '02',
                  label: 'The Lounge',
                  italic: 'terracotta velvet, soft light',
                  alt: 'Bright Marrakesh villa lounge with a long terracotta sectional sofa and Moroccan tapestry',
                },
                {
                  src: '/retreat/courtyard.jpg',
                  no: '03',
                  label: 'The Pool',
                  italic: 'columns, palms, blue water',
                  alt: 'Long pool at the Marrakesh villa with white columns and palm trees',
                },
                {
                  src: '/retreat/outdoor-dining.jpg',
                  no: '04',
                  label: 'Long Lunches',
                  italic: 'a table, a chef, the day',
                  alt: 'Round dining table set with placemats and ceramics inside the Marrakesh villa',
                },
                {
                  src: '/retreat/evening.jpg',
                  no: '05',
                  label: 'The Evenings',
                  italic: 'firepits, music, slow nights',
                  alt: 'Firepit lit at dusk in the Marrakesh villa garden',
                },
              ].map((shot, i) => (
                <Reveal key={shot.no} delay={0.08 + i * 0.05}>
                  <figure className="group relative aspect-[3/4] rounded-[18px] overflow-hidden bg-[#1a260e]/5 shadow-[0_18px_40px_-18px_rgba(26,38,14,0.22)] [transition:transform_0.7s_cubic-bezier(.22,1,.36,1),box-shadow_0.7s_cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(26,38,14,0.35)]">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      className="object-cover [transition:transform_1.4s_cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Bottom scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a260e]/85 via-[#1a260e]/15 to-transparent" />
                    {/* Top whisper */}
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1a260e]/35 to-transparent" />

                    {/* Top-left numeral */}
                    <div className="absolute top-4 left-4 md:top-5 md:left-5 flex items-center gap-2 md:gap-2.5">
                      <span className="font-serif italic text-amber-200/95 text-base md:text-lg leading-none">
                        Nº
                      </span>
                      <span className="text-[#fffcf2] text-base md:text-lg leading-none font-light tracking-wide">
                        {shot.no}
                      </span>
                    </div>

                    {/* Bottom caption */}
                    <figcaption className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 text-[#fffcf2] [transition:transform_0.6s_cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-0.5">
                      <p className="font-serif text-lg md:text-xl font-light leading-tight tracking-tight">
                        {shot.label}
                      </p>
                      <p className="font-serif italic text-[#fffcf2]/70 text-[11px] md:text-[13px] leading-snug mt-1">
                        {shot.italic}
                      </p>
                    </figcaption>

                    {/* Hover amber underline */}
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-4 right-4 md:left-5 md:right-5 h-px bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 origin-left scale-x-0 [transition:transform_0.7s_cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
                    />
                  </figure>
                </Reveal>
              ))}
            </div>

            {/* Closing flourish */}
            <Reveal delay={0.3}>
              <div className="flex items-center justify-center gap-4 md:gap-6 mt-12 md:mt-16">
                <span aria-hidden className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-[#1a260e]/20" />
                <p className="font-serif italic text-[#1a260e]/55 text-sm md:text-base tracking-wide">
                  five frames, one week, one villa
                </p>
                <span aria-hidden className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-[#1a260e]/20" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PULL QUOTE / TAGLINE STRIP
         ════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/retreat/long-table.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1a260e]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,194,140,0.12)_0%,_transparent_60%)]" />
        </div>
        <div className="relative container-width px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <Quote className="h-6 w-6 md:h-7 md:w-7 text-amber-200/70 mx-auto mb-5" />
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-serif text-xl md:text-3xl lg:text-4xl text-[#fffcf2] font-light leading-[1.35] italic">
                A 7-night women-only luxury Pilates retreat in Marrakesh &mdash; created
                to celebrate Euforyc&apos;s birthday with movement, sunshine, full-course private
                chef meals, a cooking workshop, massage, and slow living.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 md:mt-9 text-[#fffcf2]/55 text-xs md:text-sm tracking-[0.3em] uppercase">
                — The Spirit of the Week
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHAT'S INCLUDED — mobile swipe / desktop grid
         ════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 md:section-padding bg-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-8 md:mb-16 max-w-3xl mx-auto">
              <p className="tagline text-[#1a260e]/50 mb-3 md:mb-4">EVERYTHING IS HANDLED</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#1a260e] leading-tight">
                What&apos;s <span className="italic">included</span>
              </h2>
              <p className="body-text max-w-2xl mx-auto mt-4 md:mt-5 text-sm md:text-base">
                You arrive. We do the rest. One package, every part of the week
                already taken care of &mdash; just bring yourself.
              </p>
            </div>
          </Reveal>

          {/* Mobile swipe hint */}
          <Reveal delay={0.05}>
            <div className="md:hidden flex items-center justify-center gap-2 mb-5 text-[#1a260e]/45 text-[10px] tracking-[0.3em] uppercase">
              <span aria-hidden className="h-px w-6 bg-[#1a260e]/15" />
              <span>Swipe to explore</span>
              <span aria-hidden className="h-px w-6 bg-[#1a260e]/15" />
            </div>
          </Reveal>

          {/* Mobile: horizontal swipe carousel */}
          <div className="md:hidden -mx-6 relative">
            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex gap-3 px-6 pb-2">
                {included.map((item, i) => (
                  <Reveal
                    key={item.title}
                    delay={i * 0.04}
                    className="snap-start flex-shrink-0 w-[78%]"
                  >
                    <div className="relative h-full p-6 rounded-2xl border border-[#1a260e]/10 bg-white shadow-[0_10px_30px_-12px_rgba(26,38,14,0.12)]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-rose-50 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-5 w-5 text-[#1a260e]/70" />
                        </div>
                        <span className="font-serif italic text-amber-700/70 text-xs tracking-wide">
                          {String(i + 1).padStart(2, '0')} / {String(included.length).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-light text-[#1a260e] mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#1a260e]/65 leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
                {/* Trailing spacer so the last card snaps cleanly */}
                <span aria-hidden className="flex-shrink-0 w-3" />
              </div>
            </div>
            {/* Edge fade — right */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-[#fffcf2] to-transparent"
            />
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group relative p-6 md:p-7 rounded-2xl border border-[#1a260e]/10 bg-white/50 hover:bg-white hover:border-[#1a260e]/20 transition-all duration-500 h-full">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-rose-50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <item.icon className="h-5 w-5 text-[#1a260e]/70" />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1a260e]/65 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ITINERARY — mobile swipe / desktop grid
         ════════════════════════════════════════════════════════ */}
      <section id="itinerary" className="px-6 py-16 md:section-padding bg-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-8 md:mb-16 max-w-3xl mx-auto">
              <p className="tagline text-[#1a260e]/50 mb-3 md:mb-4">YOUR 7-NIGHT JOURNEY</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#1a260e] leading-tight">
                Eight days. <span className="italic">A different woman by the end.</span>
              </h2>
              <p className="body-text max-w-2xl mx-auto mt-4 md:mt-5 text-sm md:text-base">
                A rhythm built to land softly, build slowly, peak gently, and send you home
                with the kind of nervous-system reset you can&apos;t buy in 90 minutes.
              </p>
            </div>
          </Reveal>

          {/* Mobile swipe hint */}
          <Reveal delay={0.05}>
            <div className="md:hidden flex items-center justify-center gap-2 mb-5 text-[#1a260e]/45 text-[10px] tracking-[0.3em] uppercase">
              <span aria-hidden className="h-px w-6 bg-[#1a260e]/15" />
              <span>Swipe day by day</span>
              <span aria-hidden className="h-px w-6 bg-[#1a260e]/15" />
            </div>
          </Reveal>

          {/* Mobile: horizontal swipe carousel */}
          <div className="md:hidden -mx-6 relative">
            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex gap-3 px-6 pb-2">
                {itinerary.map((d, i) => (
                  <Reveal
                    key={d.day}
                    delay={Math.min(i * 0.03, 0.15)}
                    className="snap-start flex-shrink-0 w-[82%]"
                  >
                    <div className="relative h-full p-6 rounded-2xl border border-[#1a260e]/10 bg-white shadow-[0_14px_36px_-14px_rgba(26,38,14,0.14)]">
                      {/* Top progress + numeral */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-rose-50 flex items-center justify-center border border-amber-200/40">
                            <span className="font-serif text-base text-[#1a260e] font-medium">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div>
                            <p className="text-[10px] tracking-[0.25em] uppercase text-amber-700 font-medium leading-none">
                              {d.day}
                            </p>
                            <p className="text-[10px] tracking-[0.2em] uppercase text-[#1a260e]/45 font-normal mt-1">
                              {d.date}
                            </p>
                          </div>
                        </div>
                        <span className="font-serif italic text-amber-700/60 text-xs tracking-wide">
                          {String(i + 1).padStart(2, '0')} / {String(itinerary.length).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Hairline */}
                      <span aria-hidden className="block h-px bg-gradient-to-r from-transparent via-[#1a260e]/12 to-transparent mb-5" />

                      {/* Title + theme */}
                      <h3 className="font-serif text-xl font-light text-[#1a260e] leading-tight mb-1.5">
                        {d.title}
                      </h3>
                      <p className="text-xs italic text-[#1a260e]/55 mb-4 leading-relaxed">
                        {d.theme}
                      </p>

                      {/* Item list */}
                      <ul className="space-y-2 pt-3 border-t border-[#1a260e]/8">
                        {d.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[13px] text-[#1a260e]/72 leading-snug"
                          >
                            <span className="w-1 h-1 rounded-full bg-amber-500/55 mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
                <span aria-hidden className="flex-shrink-0 w-3" />
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-[#fffcf2] to-transparent"
            />
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:block max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {itinerary.map((d, i) => (
                <Reveal key={d.day} delay={Math.min(i * 0.04, 0.18)}>
                  <div className="group relative h-full p-5 md:p-6 rounded-2xl border border-[#1a260e]/10 bg-white/60 hover:bg-white hover:border-[#1a260e]/20 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(26,38,14,0.08)] transition-all duration-500">
                    {/* Day number ribbon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-100 to-rose-50 flex items-center justify-center border border-amber-200/40">
                        <span className="font-serif text-base md:text-lg text-[#1a260e] font-medium">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-amber-700 font-medium pt-2 text-right">
                        {d.day}<br />
                        <span className="text-[#1a260e]/55 font-normal tracking-[0.18em]">{d.date}</span>
                      </p>
                    </div>

                    {/* Title + theme */}
                    <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] leading-tight mb-1.5">
                      {d.title}
                    </h3>
                    <p className="text-xs italic text-[#1a260e]/50 mb-4 leading-relaxed">
                      {d.theme}
                    </p>

                    {/* Compact item list */}
                    <ul className="space-y-1.5 pt-4 border-t border-[#1a260e]/8">
                      {d.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[12.5px] text-[#1a260e]/70 leading-snug"
                        >
                          <span className="w-1 h-1 rounded-full bg-amber-500/50 mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ
         ════════════════════════════════════════════════════════ */}
      <section className="px-6 py-14 md:section-padding bg-[#fffcf2]">
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
        <div className="absolute inset-0">
          <Image
            src="/retreat/evening.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e]/92 via-[#1a260e]/85 to-[#2a1f0e]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,194,140,0.15)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,123,90,0.12)_0%,_transparent_50%)]" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#fffcf2]/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#fffcf2]/[0.025]" />

        <div className="relative z-10 container-width text-center px-6">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-7 md:space-y-9">
              <div className="inline-flex items-center gap-2 bg-amber-200/15 border border-amber-200/25 rounded-full px-4 py-2">
                <Timer className="h-4 w-4 text-amber-200" />
                <span className="text-sm text-amber-100 font-medium">
                  Retreat begins in {startCountdown.days} days
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#fffcf2] font-light leading-[1.05]">
                Stop earning rest.<br />
                <span className="italic bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 bg-clip-text text-transparent">
                  Come and have it.
                </span>
              </h2>

              <p className="text-[#fffcf2]/65 text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
                Seven nights at a private Marrakesh villa &mdash; movement, Moroccan
                sunshine, full-course private chef meals, cooking, massage, and the kind of
                slow that changes how you feel about your own life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <a
                  href="#packages"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 text-[#1a260e] px-9 md:px-11 py-4 md:py-5 font-sans text-sm tracking-[0.18em] uppercase font-semibold transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_8px_50px_rgba(244,194,140,0.35)] rounded-sm"
                >
                  RESERVE YOUR SPACE
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <p className="text-[#fffcf2]/40 text-xs tracking-[0.25em] uppercase pt-2">
                Only {spacesLeft} of {TOTAL_GUEST_SPACES} spots left &nbsp;·&nbsp; 17 — 24 July 2026
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STICKY MOBILE CTA
         ════════════════════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 px-3 pt-3 bg-[#fffcf2]/95 backdrop-blur-md border-t border-[#1a260e]/10 md:hidden z-50"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <a
          href="#packages"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 text-[#1a260e] w-full py-4 text-sm tracking-[0.12em] uppercase rounded-lg active:scale-[0.98] transition-transform font-semibold shadow-[0_4px_20px_-4px_rgba(244,194,140,0.4)]"
        >
          BOOK {pkg.short.toUpperCase()} — {pkg.priceLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
