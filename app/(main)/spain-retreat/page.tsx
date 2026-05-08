'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Heart,
  Sun,
  Moon,
  Utensils,
  Plane,
  Gift,
  Users,
  Crown,
  Home,
  BedDouble,
  Wind,
  Flower2,
  CupSoda,
  CalendarDays,
  Quote,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// EDITABLE CONSTANTS — Stripe checkout links (one per package)
// Early-bird discount is applied via Stripe promo code at checkout.
// ═══════════════════════════════════════════════════════════════
const STRIPE_URLS = {
  house: 'https://book.stripe.com/4gM00idHT1qaehk3o063K01',
  shared: 'https://book.stripe.com/cNiaEW1Zb9WG6OSe2E63K02',
  private: 'https://book.stripe.com/dRm4gycDPfh0c9c0bO63K03',
};

// Promo code (Stripe-side) — first 5 guests get 10% off any package.
const EARLY_BIRD_CODE = 'SPAIN10';

// Retreat opens for booking — countdown ends here
const RETREAT_START = new Date(2026, 6, 16); // 16 July 2026

// Capacity — kept intentionally small for an intimate, properly-hosted retreat
const TOTAL_GUEST_SPACES = 15;
const SPACES_TAKEN = 8; // update as bookings come in

// ═══════════════════════════════════════════════════════════════
// PACKAGES
// ═══════════════════════════════════════════════════════════════
const PACKAGES = {
  shared: {
    id: 'shared' as const,
    label: 'Signature Shared Suite',
    short: 'Signature',
    tagline: 'The most-loved package',
    price: 1595,
    earlyPrice: 1435,
    priceLabel: '£1,595',
    earlyPriceLabel: '£1,435',
    perNight: '£228 / night',
    description:
      'A shared suite with a premium villa feel — designed for the woman who wants every part of the retreat experience without paying for a private room.',
    bestFor: 'Comfort · Connection · The full retreat',
    icon: Flower2,
    highlight: true,
    includes: [
      '7 nights shared suite accommodation',
      'Premium villa feel · private bathroom where available',
      'Daily Pilates and movement sessions',
      'All meals by private chef',
      'Airport transfers within set windows',
      'Welcome gift bag · full retreat itinerary',
      'Pool access, group dinners, workshops',
      'Hosted support from the Euforyc team',
    ],
    stripeUrl: STRIPE_URLS.shared,
  },
  private: {
    id: 'private' as const,
    label: 'Private Suite',
    short: 'Private',
    tagline: 'The most premium experience',
    price: 1995,
    earlyPrice: 1795,
    priceLabel: '£1,995',
    earlyPriceLabel: '£1,795',
    perNight: '£285 / night',
    description:
      'For the woman who wants total privacy. Your own room. Priority selection. The most elevated version of the retreat — the full ceremony of slow living, in your own space.',
    bestFor: 'Privacy · Comfort · The most elevated stay',
    icon: Crown,
    highlight: false,
    includes: [
      '7 nights accommodation · private room',
      'Priority room selection',
      'Daily Pilates and movement sessions',
      'All meals by private chef',
      'Airport transfers within set windows',
      'Welcome gift bag · full retreat itinerary',
      'Pool access, group dinners, workshops',
      'Hosted support from the Euforyc team',
    ],
    stripeUrl: STRIPE_URLS.private,
  },
  house: {
    id: 'house' as const,
    label: 'House Experience',
    short: 'House',
    tagline: 'The most accessible package',
    price: 1250,
    earlyPrice: 1125,
    priceLabel: '£1,250',
    earlyPriceLabel: '£1,125',
    perNight: '£178 / night',
    description:
      'A more intimate, social, community-style stay in the Original House. The full Euforyc retreat experience at our best-value price — designed for guests who want connection over square footage.',
    bestFor: 'Best value · Community · Full experience',
    icon: Home,
    highlight: false,
    includes: [
      '7 nights in the Original House',
      'Shared room · social, community-style stay',
      'Daily Pilates and movement sessions',
      'All meals by private chef',
      'Airport transfers within set windows',
      'Welcome gift bag · full retreat itinerary',
      'Pool access, group dinners, workshops',
      'Hosted support from the Euforyc team',
    ],
    stripeUrl: STRIPE_URLS.house,
  },
} as const;

type PackageId = keyof typeof PACKAGES;
const PACKAGE_IDS: PackageId[] = ['house', 'shared', 'private'];

// ═══════════════════════════════════════════════════════════════
// CONTENT — facts, includes, itinerary, faqs
// ═══════════════════════════════════════════════════════════════
const facts = [
  { label: '7 Nights', icon: Moon },
  { label: '16–23 July 2026', icon: CalendarDays },
  { label: 'Cortijo Banana, Spain', icon: MapPin },
  { label: 'Women Only', icon: Heart },
];

const included = [
  {
    icon: Flower2,
    title: 'Daily Pilates & Movement',
    desc: 'Morning flows, sunset stretches, signature Euforyc sessions — outdoor by the pool, indoor in the villa.',
  },
  {
    icon: Utensils,
    title: 'Private Chef Meals',
    desc: 'Every meal handled. Long-table breakfasts, sunset dinners, rosé-and-rocket lunches — all of it.',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    desc: 'Pickup and drop-off included within scheduled transfer windows. You arrive, you exhale, you forget logistics.',
  },
  {
    icon: Gift,
    title: 'Welcome Gift Bag',
    desc: 'Curated arrival gifts. Small things that say: this week, you\'re looked after.',
  },
  {
    icon: Sun,
    title: 'Poolside Slow Living',
    desc: 'Long mornings by the water. Matcha. Journaling. Reading. The kind of stillness real life never allows.',
  },
  {
    icon: BedDouble,
    title: 'Beautiful Accommodation',
    desc: 'Whitewashed rooms, terracotta floors, mountain light — every space designed to make you exhale.',
  },
  {
    icon: Sparkles,
    title: 'Workshops & Experiences',
    desc: 'Confidence workshops, breathwork, journaling, beach day, photoshoot moments — content and connection.',
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
    date: '16 July',
    title: 'Arrival & Welcome',
    theme: 'Soft landing, connection, arrival',
    items: [
      'Airport pickup during scheduled transfer windows',
      'Arrival at the villa · welcome drinks by the pool',
      'Room check-in and settling in',
      'Light stretch or grounding session',
      'Welcome dinner with the group',
      'Opening circle, intentions and introductions',
    ],
  },
  {
    day: 'Day 2',
    date: '17 July',
    title: 'Align & Reset',
    theme: 'Grounding into the retreat',
    items: [
      'Morning Pilates · alignment, breath and core',
      'Breakfast by the villa',
      'Pool time and slow morning',
      'Lunch',
      'Journaling: setting your retreat intention',
      'Sunset stretch and mobility',
      'Private chef dinner',
    ],
  },
  {
    day: 'Day 3',
    date: '18 July',
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
    date: '19 July',
    title: 'Slow Luxury Pool Day',
    theme: 'Rest, softness, feminine wellness',
    items: [
      'Later morning stretch or optional Pilates',
      'Brunch-style breakfast',
      'Full pool day',
      'Matcha, journaling, reading, sunbathing',
      'Optional mini photoshoot around the villa',
      'Breathwork and deep stretch at sunset',
      'Dinner',
    ],
  },
  {
    day: 'Day 5',
    date: '20 July',
    title: 'Beach & Exploration',
    theme: 'Adventure, memories, summer',
    items: [
      'Light morning Pilates',
      'Breakfast',
      'Group trip to the beach or nearby town',
      'Lunch out or picnic-style meal',
      'Photos, swimming, exploring and free time',
      'Return to the villa',
      'Relaxed dinner',
    ],
  },
  {
    day: 'Day 6',
    date: '21 July',
    title: 'Euforyc Signature Day',
    theme: 'The main content and celebration day',
    items: [
      'Morning full-body Pilates flow',
      'Breakfast',
      'Free time and pool',
      'Lunch',
      'Matching neutral Pilates set moment for content',
      'Sunset Euforyc signature flow',
      'Dress-up dinner — candles, music, long-table dining',
    ],
  },
  {
    day: 'Day 7',
    date: '22 July',
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
    date: '23 July',
    title: 'Departure',
    theme: 'Goodbye and onwards',
    items: [
      'Breakfast',
      'Check-out',
      'Airport transfers during scheduled windows',
      'Goodbye hugs and post-retreat content moments',
    ],
  },
];

const faqs = [
  {
    q: 'Are flights included?',
    a: 'Flights are not included. We\'ll send recommended flight options once you book — guests just need to arrive within the scheduled transfer windows so we can include the airport pickup. We\'ll handle the transfer once you land.',
  },
  {
    q: 'Can I pay in instalments?',
    a: 'Yes — you can pay in full, or split it 50% now and 50% before the retreat. Klarna and Clearpay are also available at checkout, depending on your eligibility.',
  },
  {
    q: 'What\'s the difference between the packages?',
    a: 'House Experience is shared room in the Original House — the most social, best-value option. Signature Shared Suite is shared accommodation in the Courtyard Suites with a more premium villa feel and (where available) a private bathroom. Private Suite is your own room with priority selection — the most elevated experience.',
  },
  {
    q: 'How does the early bird offer work?',
    a: 'The first 5 guests get 10% off any package, plus priority room selection and an exclusive birthday gift upgrade on arrival. Once 5 spots are claimed, prices return to standard.',
  },
  {
    q: 'Who is this retreat for?',
    a: 'Women who want a real reset. Whether you do Pilates every day or you\'ve never tried it, this is built around movement, rest, and connection — not pushing yourself to your limit. Every session is adaptable, every meal is taken care of, every detail is held.',
  },
  {
    q: 'What if I\'m travelling alone?',
    a: 'Most of our guests come solo. The shared and house packages are designed for women who want to make new friends. You\'ll be matched thoughtfully if you\'re sharing a room, and the small group format means by Day 2 it won\'t feel like you arrived alone at all.',
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
export default function SpainRetreatPage() {
  const [selected, setSelected] = useState<PackageId>('shared');
  const [codeCopied, setCodeCopied] = useState(false);
  const startCountdown = useCountdown(useMemo(() => RETREAT_START, []));

  const copyEarlyBirdCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EARLY_BIRD_CODE);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 1800);
    } catch {
      setCodeCopied(false);
    }
  };
  const spacesLeft = TOTAL_GUEST_SPACES - SPACES_TAKEN;

  const pkg = PACKAGES[selected];

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
            alt="Cortijo Banana — a whitewashed Spanish villa nestled in the hills of Andalusia"
            fill
            priority
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
          {/* Deep gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a260e]/85 via-[#1a260e]/55 to-[#1a260e]/90" />
          {/* Warm Spanish sun glow */}
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
              16 — 23 July 2026 &nbsp;·&nbsp; Cortijo Banana, Andalusia
            </p>
          </Reveal>

          {/* HEADLINE — italic gradient title, IG-cover style */}
          <Reveal delay={0.12}>
            <h1 className="font-serif text-[3.5rem] leading-[0.95] md:text-[6rem] lg:text-[8.5rem] text-[#fffcf2] tracking-tight mb-2 md:mb-3">
              <span className="italic font-light bg-gradient-to-br from-amber-100 via-rose-100 to-amber-200 bg-clip-text text-transparent">
                Spain
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
              Seven nights of movement, sunshine, private chef meals,
              connection and slow living &mdash;<br className="hidden md:block" />
              the full Euforyc experience, in the hills of Andalusia.
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
                  into the hills of Andalusia for a week.
                </p>
                <p>
                  No gym lighting. No phone notifications. No deadlines.
                  Just movement, sunshine, real food made by a private chef,
                  conversations that go past midnight, and pool days that bleed into sunset dinners.
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
                  Only <strong className="text-[#1a260e] font-medium">{TOTAL_GUEST_SPACES} spots available</strong>. That&apos;s it.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PACKAGES — the conversion section
         ════════════════════════════════════════════════════════ */}
      <section id="packages" className="px-5 py-14 md:section-padding bg-[#1a260e] text-[#fffcf2] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(244,194,140,0.08)_0%,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,123,90,0.06)_0%,_transparent_50%)]" />

        <div className="relative container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <p className="text-[#fffcf2]/40 text-xs tracking-[0.3em] uppercase mb-4">CHOOSE YOUR ROOM</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light mb-5">
                Three packages.<br className="md:hidden" /> <span className="italic">One retreat.</span>
              </h2>
              <p className="text-[#fffcf2]/55 text-sm md:text-base max-w-xl mx-auto">
                Same daily experience &mdash; same Pilates, chef, transfers, gifts.
                The only thing that changes is where you wake up.
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
                          Flexible Payment Plans
                        </p>
                        <p className="font-serif text-base md:text-xl text-[#fffcf2] font-light leading-tight italic">
                          Spread the cost. Lock the spot.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffcf2]/10 border border-[#fffcf2]/15 text-[11px] md:text-xs text-[#fffcf2]/85 tracking-wide font-medium">
                        <CheckCircle2 className="h-3 w-3 text-amber-200" />
                        Pay in full
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffcf2]/10 border border-[#fffcf2]/15 text-[11px] md:text-xs text-[#fffcf2]/85 tracking-wide font-medium">
                        <CheckCircle2 className="h-3 w-3 text-amber-200" />
                        50% now / 50% later
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffcf2]/10 border border-[#fffcf2]/15 text-[11px] md:text-xs text-[#fffcf2]/85 tracking-wide font-medium">
                        <CheckCircle2 className="h-3 w-3 text-amber-200" />
                        Klarna
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffcf2]/10 border border-[#fffcf2]/15 text-[11px] md:text-xs text-[#fffcf2]/85 tracking-wide font-medium">
                        <CheckCircle2 className="h-3 w-3 text-amber-200" />
                        Clearpay
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Pill selector */}
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
                        ? 'bg-gradient-to-r from-amber-100 to-rose-100 text-[#1a260e] scale-[1.02]'
                        : 'bg-transparent border border-[#fffcf2]/20 text-[#fffcf2]/70 hover:border-[#fffcf2]/40 hover:text-[#fffcf2]'
                    }`}
                  >
                    <p.icon className="h-3.5 w-3.5" />
                    <span>{p.label}</span>
                    {p.highlight && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full tracking-wider ${
                        isActive ? 'bg-[#1a260e]/15 text-[#1a260e]' : 'bg-amber-200/15 text-amber-200'
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
            <div className="max-w-3xl mx-auto">
              <a
                href={pkg.stripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#fffcf2] via-[#fdf6e8] to-[#f8eed8]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,194,140,0.18)_0%,_transparent_60%)]" />

                {/* Birthday Early Bird ribbon */}
                <div className="relative bg-gradient-to-r from-amber-200 via-amber-100 to-rose-100 border-b border-amber-300/50 px-6 md:px-10 py-3.5 md:py-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5 md:gap-3">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#1a260e]/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-amber-800" />
                      </div>
                      <div>
                        <p className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-amber-900 font-bold mb-0.5">
                          Birthday Early Bird
                        </p>
                        <p className="text-sm md:text-[15px] font-semibold text-[#1a260e] leading-tight">
                          First 5 guests <span className="italic font-medium">save 10%</span> with code
                        </p>
                      </div>
                    </div>

                    {/* Tap-to-copy promo chip */}
                    <button
                      type="button"
                      onClick={copyEarlyBirdCode}
                      aria-label={`Copy promo code ${EARLY_BIRD_CODE}`}
                      className="group/code relative inline-flex items-center gap-2 md:gap-2.5 px-3 py-1.5 md:px-3.5 md:py-2 rounded-full border border-dashed border-[#1a260e]/40 bg-[#fffcf2]/70 hover:bg-[#fffcf2] hover:border-[#1a260e]/60 active:scale-[0.97] transition-all self-start sm:self-auto flex-shrink-0"
                    >
                      <span className="font-mono text-sm md:text-[15px] font-bold tracking-[0.22em] text-[#1a260e]">
                        {EARLY_BIRD_CODE}
                      </span>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-amber-900 font-semibold whitespace-nowrap">
                        {codeCopied ? 'Copied ✓' : 'Tap to copy'}
                      </span>
                    </button>
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

                  {/* CTA */}
                  <div className="flex items-center justify-center gap-3 bg-[#1a260e] text-[#fffcf2] py-5 px-8 rounded-xl font-semibold text-sm md:text-base tracking-[0.15em] uppercase transition-all duration-500 group-hover:bg-[#243516] group-hover:shadow-[0_8px_30px_rgba(26,38,14,0.3)]">
                    <span>Reserve {pkg.label} &mdash; {pkg.priceLabel}</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#1a260e]/10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-amber-800 font-semibold">
                        <Sparkles className="h-3.5 w-3.5" />
                        Flexible Payment
                      </span>
                      <span className="hidden sm:inline-block w-px h-3 bg-[#1a260e]/20" />
                      <span className="text-xs md:text-sm text-[#1a260e]/75 font-medium">
                        Pay in full · 50% now / 50% later · Klarna · Clearpay
                      </span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Other packages teaser */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {PACKAGE_IDS.filter((id) => id !== selected).map((id) => {
                  const p = PACKAGES[id];
                  return (
                    <button
                      key={id}
                      onClick={() => setSelected(id)}
                      className="group text-left p-5 rounded-xl border border-[#fffcf2]/12 bg-[#fffcf2]/[0.03] hover:bg-[#fffcf2]/[0.07] transition-all"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-[#fffcf2]/8 flex items-center justify-center flex-shrink-0">
                            <p.icon className="h-4.5 w-4.5 text-amber-200" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] tracking-[0.25em] uppercase text-[#fffcf2]/45 mb-0.5">
                              {p.tagline}
                            </p>
                            <p className="font-serif text-base md:text-lg text-[#fffcf2] font-light truncate">
                              {p.label}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-serif text-lg md:text-xl text-[#fffcf2] font-light">
                            {p.priceLabel}
                          </p>
                          <p className="text-[10px] text-amber-200/70 tracking-wider group-hover:text-amber-200 transition-colors">
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
          PAYMENT OPTIONS
         ════════════════════════════════════════════════════════ */}
      <section className="px-6 py-14 md:section-padding bg-[#1a260e] text-[#fffcf2] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(244,194,140,0.06)_0%,_transparent_60%)]" />

        <div className="relative container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <p className="text-[#fffcf2]/40 text-xs tracking-[0.3em] uppercase mb-4">FLEXIBLE PAYMENT</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light">
                Three ways <span className="italic">to pay</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: CheckCircle2,
                title: 'Pay in Full',
                desc: 'Settle the whole package at checkout. Done. Off your mind.',
                tag: 'EASIEST',
              },
              {
                icon: Wind,
                title: '50% Now, 50% Later',
                desc: 'Pay 50% to lock in your space. Remaining 50% due before the retreat.',
                tag: 'MOST POPULAR',
              },
              {
                icon: Sparkles,
                title: 'Klarna or Clearpay',
                desc: 'Split into smaller payments — subject to checkout eligibility.',
                tag: 'FLEXIBLE',
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
              Flights are not included. Once you book, we&apos;ll send recommended flights — guests
              just need to arrive within the scheduled transfer windows to use the included airport pickup.
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
                A Whitewashed Cortijo &middot; 1 Hour from Almería
              </p>

              <h2 className="font-serif text-[2.75rem] md:text-6xl lg:text-7xl font-light text-[#1a260e] leading-[0.95] mb-5 md:mb-7 tracking-tight">
                Cortijo{' '}
                <span className="italic bg-gradient-to-br from-amber-700 via-rose-700 to-amber-800 bg-clip-text text-transparent">
                  Banana
                </span>
              </h2>

              {/* Hairline + center diamond divider */}
              <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
                <span aria-hidden className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent via-[#1a260e]/15 to-[#1a260e]/30" />
                <span aria-hidden className="text-amber-700/70 text-[11px] md:text-xs leading-none -translate-y-px">◆</span>
                <span aria-hidden className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent via-[#1a260e]/15 to-[#1a260e]/30" />
              </div>

              <p className="text-[#1a260e]/65 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                Tucked into the dry hills of southern Spain &mdash; terracotta floors, mountain light,
                an infinity-edge pool, and the kind of{' '}
                <span className="italic text-[#1a260e]/90">silence only the countryside can hold</span>.
              </p>
            </div>
          </Reveal>

          {/* ─── Cinematic hero — pool aerial ─── */}
          <div className="max-w-7xl mx-auto">
            <Reveal delay={0.05}>
              <figure className="group relative aspect-[16/10] md:aspect-[16/8] rounded-[20px] overflow-hidden bg-[#1a260e]/5 shadow-[0_30px_80px_-20px_rgba(26,38,14,0.25)]">
                <Image
                  src="/retreat/pool-aerial.jpg"
                  alt="Aerial view of Cortijo Banana's pool surrounded by terracotta gardens"
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
                    Almería &middot; Andalusia
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
                    The <span className="italic">Cortijo</span>
                  </p>
                  <p className="font-serif italic text-[#fffcf2]/70 text-xs md:text-sm leading-tight mt-1.5 md:mt-2">
                    seen from the sky
                  </p>
                </figcaption>

                {/* Quiet bottom-right meta strip */}
                <div className="hidden md:flex absolute bottom-10 right-10 items-center gap-6 text-[10px] tracking-[0.3em] uppercase text-[#fffcf2]/55">
                  <span>35 Beds</span>
                  <span aria-hidden className="w-1 h-1 rounded-full bg-[#fffcf2]/40" />
                  <span>4 Courtyards</span>
                  <span aria-hidden className="w-1 h-1 rounded-full bg-[#fffcf2]/40" />
                  <span>One Pool</span>
                </div>
              </figure>
            </Reveal>

            {/* ─── Lookbook row — 4 supporting frames ─── */}
            <div className="mt-3 md:mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {[
                {
                  src: '/retreat/suite.jpg',
                  no: '02',
                  label: 'The Suites',
                  italic: 'mustard linen, terracotta tile',
                  alt: 'Whitewashed bedroom with mustard accents and terracotta tiled floor',
                },
                {
                  src: '/retreat/courtyard.jpg',
                  no: '03',
                  label: 'Courtyards',
                  italic: 'red steps, jasmine, sky',
                  alt: 'Whitewashed courtyard with a terracotta staircase climbing into the sun',
                },
                {
                  src: '/retreat/outdoor-dining.jpg',
                  no: '04',
                  label: 'Long Lunches',
                  italic: 'a table with a view',
                  alt: 'Outdoor dining table set with wine, glasses, and a view of the Andalusian mountains',
                },
                {
                  src: '/retreat/evening.jpg',
                  no: '05',
                  label: 'The Evenings',
                  italic: 'firepits, music, slow nights',
                  alt: 'Tables and firepit lit at dusk in front of the villa',
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
                  five frames, one week, one cortijo
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
                A 7-night women-only luxury Pilates retreat in Spain &mdash; created
                to celebrate Euforyc&apos;s birthday with movement, sunshine, private chef meals,
                connection and slow living.
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
                You arrive. We do the rest. Every package includes the same full retreat experience
                &mdash; the only thing that changes is where you sleep at night.
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
                Seven nights at Cortijo Banana &mdash; movement, sunshine, private chef meals,
                connection, and the kind of slow that changes how you feel about your own life.
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
                Only {spacesLeft} of {TOTAL_GUEST_SPACES} spots left &nbsp;·&nbsp; 16 — 23 July 2026
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
          href={pkg.stripeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 text-[#1a260e] w-full py-4 text-sm tracking-[0.12em] uppercase rounded-lg active:scale-[0.98] transition-transform font-semibold shadow-[0_4px_20px_-4px_rgba(244,194,140,0.4)]"
        >
          RESERVE {pkg.short.toUpperCase()} — {pkg.priceLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
