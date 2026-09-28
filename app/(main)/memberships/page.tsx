'use client';

import { useState, useRef, useEffect } from 'react';
import { Crown, CheckCircle, ArrowRight } from 'lucide-react';

// ─── Reveal Animation (matches /about) ───────────────────────────────────────

function useInView(threshold = 0.12) {
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
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Divider() {
  const { ref, visible } = useInView(0.5);
  return (
    <div ref={ref} className="container-width px-6">
      <div
        className="h-px bg-[#1a260e]/10 mx-auto"
        style={{
          maxWidth: visible ? '100%' : '0%',
          transition: 'max-width 1.2s cubic-bezier(.22,1,.36,1)',
        }}
      />
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

interface Membership {
  name: string;
  monthlyPrice: string;
  perClass?: string;
  description: string;
  features: string[];
  momenceUrl: string;
  popular?: boolean;
  savings?: string;
  note?: string;
}

const CLASS_TYPES = 'Reformer, Hot Pilates, Red Light, Mat Pilates, Barre & Dance';

const memberships: Membership[] = [
  {
    name: 'Euforyc 4',
    monthlyPrice: '£90',
    perClass: '£22.50 per class',
    description: 'Once a week',
    features: [
      '4 class credits per month',
      'Use across the full group timetable',
      CLASS_TYPES
    ],
    momenceUrl: 'https://momence.com/m/937341'
  },
  {
    name: 'Euforyc 8',
    monthlyPrice: '£165',
    perClass: '£20.63 per class',
    description: 'Twice a week',
    features: [
      '8 class credits per month',
      'Use across the full group timetable',
      CLASS_TYPES
    ],
    momenceUrl: 'https://momence.com/m/937345'
  },
  {
    name: 'Euforyc 12',
    monthlyPrice: '£240',
    perClass: '£20 per class',
    description: 'Three times a week',
    features: [
      '12 class credits per month',
      'Use across the full group timetable',
      CLASS_TYPES
    ],
    momenceUrl: 'https://momence.com/m/937346'
  },
  {
    name: 'Euforyc Unlimited',
    monthlyPrice: '£280',
    description: 'The complete Euforyc experience',
    popular: true,
    features: [
      'Unlimited Euforyc classes',
      '24 hour priority booking',
      '1 free 30-minute massage per month',
      '1 guest class pass per month',
      '1 complimentary nutrition consultation + personalised nutrition starter plan with our Registered Dietitian (one-time joining benefit)',
      'Exclusive Euforyc tote bag when joining (one-time)',
      '10% off all food and drinks at Euforyc Sips',
      '10% off Euforyc merchandise',
      '10% off treatments at Euforyc Skin Studio',
      'Complimentary Euforyc Social membership',
      'Preferential pricing on selected Euforyc events and experiences'
    ],
    note: 'Massage and guest pass are non-transferable, don\'t roll over and expire each month.',
    momenceUrl: 'https://momence.com/m/937348'
  }
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Memberships() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Sort memberships: popular first on mobile
  const sortedMemberships = [...memberships].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  // Track carousel scroll position for dot indicators + edge fades
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.offsetWidth * 0.76; // matches w-[76vw]
      const gap = 16; // gap-4 = 16px
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveSlide(Math.min(index, sortedMemberships.length - 1));
    };
    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [sortedMemberships.length]);

  // Render a single membership card
  const renderCard = (m: Membership, isMobile = false) => (
    <>
      {/* Popular badge */}
      {m.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase flex items-center gap-1.5 shadow-lg shadow-amber-400/20">
            <Crown className="w-3 h-3" />
            BEST VALUE
          </div>
        </div>
      )}

      <div className={`${isMobile ? 'p-6' : 'p-7 md:p-8'} flex flex-col flex-1`}>
        {/* Tier header */}
        <div className={isMobile ? 'mb-5' : 'mb-8'}>
          <p className={`text-[10px] tracking-[0.25em] uppercase mb-2.5 ${
            m.popular ? 'text-[#fffcf2]/30' : 'text-[#1a260e]/25'
          }`}>
            {m.description}
          </p>
          <h3 className="font-serif text-[1.5rem] font-light leading-tight">{m.name}</h3>
        </div>

        {/* Price */}
        <div className={isMobile ? 'mb-5' : 'mb-8'}>
          <div className="flex items-baseline gap-1.5">
            <span className={`font-serif font-light tracking-tight leading-none ${isMobile ? 'text-[2.2rem]' : 'text-4xl md:text-[2.8rem]'}`}>{m.monthlyPrice}</span>
            <span className={`text-xs font-light ${m.popular ? 'text-[#fffcf2]/30' : 'text-[#1a260e]/30'}`}>/mo</span>
          </div>
          {m.perClass && (
            <p className={`text-[11px] tracking-wide mt-1.5 ${
              m.popular ? 'text-[#fffcf2]/25' : 'text-[#1a260e]/25'
            }`}>
              {m.perClass}
            </p>
          )}
          {m.savings && (
            <p className={`text-[11px] font-medium tracking-wide mt-1 ${
              m.popular ? 'text-green-400/80' : 'text-green-600/80'
            }`}>
              {m.savings}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className={`h-px ${isMobile ? 'mb-5' : 'mb-7'} ${m.popular ? 'bg-[#fffcf2]/[0.06]' : 'bg-[#1a260e]/[0.05]'}`} />

        {/* Features */}
        <div className={`${isMobile ? 'space-y-2.5' : 'space-y-3'} flex-1`}>
          {m.features.map((f, fi) => (
            <div key={fi} className="flex items-start gap-2">
              <CheckCircle className={`h-3.5 w-3.5 mt-[2px] flex-shrink-0 ${
                m.popular ? 'text-[#fffcf2]/25' : 'text-[#1a260e]/20'
              }`} />
              <span className={`text-[12.5px] font-light leading-snug ${
                m.popular ? 'text-[#fffcf2]/60' : 'text-[#1a260e]/50'
              }`}>
                {f}
              </span>
            </div>
          ))}
          {m.note && (
            <p className={`text-[11px] font-light leading-snug pt-2 ${
              m.popular ? 'text-[#fffcf2]/30' : 'text-[#1a260e]/30'
            }`}>
              {m.note}
            </p>
          )}
        </div>

        {/* CTA — touch-optimized 48px+ height */}
        <div className={`${isMobile ? 'mt-6' : 'mt-8'} flex items-center justify-center gap-2 py-4 text-[11px] tracking-[0.14em] uppercase font-medium transition-all duration-300 active:scale-[0.98] ${
          m.popular
            ? 'bg-[#fffcf2] text-[#1a260e]'
            : 'bg-[#1a260e] text-[#fffcf2]'
        }`}>
          Start Membership
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </>
  );

  return (
    <div className="bg-[#fffcf2]">

      {/* ════════════════════════════════════════════════════════════
          HERO — Cinematic editorial opening
         ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1a260e] text-[#fffcf2] pt-32">
        {/* Decorative light */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-[#fffcf2]/[0.015] rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-[#fffcf2]/[0.01] rounded-full blur-3xl" />
        </div>

        <div className="relative py-14 md:py-28 lg:py-36 px-5 md:px-6">
          <div className="container-width text-center max-w-3xl mx-auto">
            <Reveal>
              <p className="text-[#fffcf2]/30 text-[10px] md:text-xs tracking-[0.35em] uppercase mb-4 md:mb-6">
                THE EUFORYC MEMBERSHIP
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="font-serif text-[2.2rem] md:text-6xl lg:text-[5rem] font-light tracking-wide leading-[1.1] md:leading-[1.08] mb-5 md:mb-7">
                Make movement<br />
                a <span className="italic">lifestyle</span>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-[#fffcf2]/50 text-[15px] md:text-lg font-light leading-relaxed max-w-xl mx-auto">
                One membership, the whole timetable. Use your credits across every
                Euforyc group class, or go Unlimited for our most exclusive perks.
              </p>
            </Reveal>

            {/* Trust signals — stack vertically on mobile */}
            <Reveal delay={0.22}>
              <div className="flex flex-col lg:flex-row lg:flex-nowrap lg:-mx-20 justify-center items-center gap-2 md:gap-x-6 md:gap-y-2 mt-8 md:mt-12 text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[#fffcf2]/20">
                {['6-month minimum, then monthly rolling', 'Monthly card billing', 'Freeze up to 4 weeks per 6 months'].map((s, i) => (
                  <span key={i} className="flex items-center gap-3">
                    {i > 0 && <span className="hidden lg:inline w-1 h-1 rounded-full bg-[#fffcf2]/15" />}
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom fade into cream */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#fffcf2]/10 to-transparent" />
      </section>

      {/* ════════════════════════════════════════════════════════════
          CATEGORY CONTENT — Editorial pricing cards
         ════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-24">
        <div className="container-width px-5 md:px-6">
          <div className="max-w-6xl mx-auto">

            {/* Category header — editorial style */}
            <div className="text-center mb-10 md:mb-20">
              <Reveal>
                <p className="text-[#1a260e]/25 text-[10px] md:text-xs tracking-[0.35em] uppercase mb-3 md:mb-5">
                  ONE MEMBERSHIP, EVERY CLASS
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light text-[#1a260e] leading-tight">
                  Euforyc <span className="italic">Membership</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[#1a260e]/40 text-[13px] md:text-base font-light mt-3 md:mt-4 max-w-lg mx-auto">
                  Credits work across the whole Euforyc group class timetable — {CLASS_TYPES}.
                </p>
              </Reveal>
            </div>

            {/* ── Mobile: Horizontal snap-scroll carousel ── */}
            <div className="md:hidden">
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pt-5 pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {sortedMemberships.map((m, i) => (
                  <a
                    key={`mobile-${i}`}
                    href={m.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-offer-id={`membership-${m.name.toLowerCase().replace(/\s+/g, '-')}`}
                    data-content-name={`${m.name} ${m.monthlyPrice}/mo`}
                    data-content-type="membership"
                    data-content-category="/memberships"
                    data-value={String(m.monthlyPrice || '').replace(/[^0-9.]/g, '')}
                    data-currency="GBP"
                    className={`group relative flex flex-col flex-shrink-0 w-[76vw] max-w-[320px] snap-start rounded-sm transition-all duration-300 ${
                      m.popular
                        ? 'bg-[#1a260e] text-[#fffcf2] shadow-lg shadow-[#1a260e]/20'
                        : 'bg-white text-[#1a260e] ring-1 ring-[#1a260e]/[0.06]'
                    }`}
                  >
                    {renderCard(m, true)}
                  </a>
                ))}
                {/* End spacer so last card doesn't feel cropped */}
                <div className="flex-shrink-0 w-1" />
              </div>

              {/* Dot indicators */}
              {sortedMemberships.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-5">
                  {sortedMemberships.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to card ${i + 1}`}
                      onClick={() => {
                        if (!carouselRef.current) return;
                        const cardWidth = carouselRef.current.offsetWidth * 0.76;
                        const gap = 16;
                        carouselRef.current.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' });
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        activeSlide === i
                          ? 'w-5 h-1.5 bg-[#1a260e]'
                          : 'w-1.5 h-1.5 bg-[#1a260e]/15'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Swipe hint */}
              <p className="text-center text-[10px] tracking-[0.15em] uppercase text-[#1a260e]/20 mt-3">
                Swipe to explore
              </p>
            </div>

            {/* ── Desktop: Grid layout ── */}
            <div className={`hidden md:grid gap-5 ${
              memberships.length <= 2
                ? 'grid-cols-2 max-w-3xl mx-auto'
                : memberships.length === 3
                  ? 'grid-cols-3 max-w-5xl mx-auto'
                  : 'grid-cols-2 lg:grid-cols-4'
            }`}>
              {memberships.map((m, i) => (
                <Reveal key={`desktop-${i}`} delay={i * 0.06}>
                  <a
                    href={m.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-offer-id={`membership-${m.name.toLowerCase().replace(/\s+/g, '-')}`}
                    data-content-name={`${m.name} ${m.monthlyPrice}/mo`}
                    data-content-type="membership"
                    data-content-category="/memberships"
                    data-value={String(m.monthlyPrice || '').replace(/[^0-9.]/g, '')}
                    data-currency="GBP"
                    className={`group relative flex flex-col h-full rounded-sm transition-all duration-500 hover:-translate-y-1 ${
                      m.popular
                        ? 'bg-[#1a260e] text-[#fffcf2]'
                        : 'bg-white text-[#1a260e] ring-1 ring-[#1a260e]/[0.06] hover:ring-[#1a260e]/[0.12] hover:shadow-xl hover:shadow-[#1a260e]/[0.04]'
                    }`}
                  >
                    {renderCard(m)}
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Inclusions note */}
            <Reveal>
              <p className="text-center text-[11px] md:text-xs font-light leading-relaxed text-[#1a260e]/40 mt-8 md:mt-12 max-w-2xl mx-auto">
                All memberships: 6-month minimum term, then continues monthly until cancelled.
                Unused credits don&apos;t roll over. Excludes 1-1 privates, massages, treatments,
                workshops and events, except where listed as an Unlimited benefit.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* ════════════════════════════════════════════════════════════
          BENEFITS — Editorial numbered grid
         ════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-36 px-5 md:px-6">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-24">
              <p className="text-[#1a260e]/25 text-[10px] md:text-xs tracking-[0.35em] uppercase mb-3 md:mb-5">WHY MEMBERSHIP</p>
              <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl text-[#1a260e] font-light">
                Built for Those Who <span className="italic">Show Up</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#1a260e]/10 max-w-5xl mx-auto">
            {[
              {
                number: '01',
                title: 'One Membership, the Whole Timetable',
                body: 'Your credits work across every Euforyc group class — Reformer, Hot Pilates, Red Light, Mat Pilates, Barre and Dance. Mix it up however you like.',
              },
              {
                number: '02',
                title: 'Better Value Per Class',
                body: 'Commit to your practice and pay less per class — from £20 a class on Euforyc 12, billed simply each month.',
              },
              {
                number: '03',
                title: 'Unlimited Perks',
                body: 'Euforyc Unlimited adds 24 hour priority booking, a monthly massage and guest pass, a nutrition consultation and 10% off across Sips, Skin Studio and merch.',
              },
            ].map((value, i) => (
              <Reveal key={value.number} delay={i * 0.08}>
                <div className={`py-8 md:py-14 md:px-10 ${i < 2 ? 'md:border-r border-b md:border-b-0 border-[#1a260e]/10' : ''}`}>
                  <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#1a260e]/20 font-medium">{value.number}</span>
                  <h3 className="font-serif text-xl md:text-3xl font-light text-[#1a260e] mt-3 md:mt-4 mb-3 md:mb-5">{value.title}</h3>
                  <p className="text-[13px] md:text-sm text-[#1a260e]/45 font-light leading-[1.7] md:leading-[1.8]">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TERMS + CTA — Dark closing section
         ════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-28 px-5 md:px-6 bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="font-serif text-[1.6rem] md:text-4xl font-light mb-8 md:mb-12 leading-tight">
                Not sure which<br />membership is <span className="italic">right?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 bg-[#fffcf2] text-[#1a260e] w-full md:w-auto px-10 py-4 min-h-[52px] text-[11px] md:text-[12px] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              >
                SPEAK TO OUR TEAM
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>

            {/* Terms */}
            <Reveal delay={0.15}>
              <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-[#fffcf2]/[0.05]">
                <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#fffcf2]/15 mb-4 md:mb-6">MEMBERSHIP TERMS</p>
                <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap lg:-mx-24 justify-center gap-1.5 md:gap-x-6 md:gap-y-2 text-[10px] md:text-[11px] text-[#fffcf2]/20 font-light">
                  <span>6-month minimum term, then monthly rolling</span>
                  <span className="hidden md:inline text-[#fffcf2]/10">|</span>
                  <span>Monthly card billing</span>
                  <span className="hidden md:inline text-[#fffcf2]/10">|</span>
                  <span>Two full billing cycles&apos; notice to cancel</span>
                  <span className="hidden md:inline text-[#fffcf2]/10">|</span>
                  <span>Freeze up to 4 weeks per 6 months</span>
                </div>
                <p className="text-[10px] md:text-[11px] text-[#fffcf2]/20 font-light mt-3">
                  To cancel, email{' '}
                  <a href="mailto:euforyc@gmail.com" className="underline underline-offset-2 hover:text-[#fffcf2]/50 transition-colors">
                    euforyc@gmail.com
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
