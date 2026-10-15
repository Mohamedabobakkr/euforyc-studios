'use client';

import { useState, useRef, useEffect } from 'react';
import { Crown } from 'lucide-react';
import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';

// ─── Reveal (CSS scroll reveal; content stays visible without support) ───────

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`eu-rv ${className}`}>{children}</div>;
}

function Divider() {
  return (
    <div className="eu-wrap">
      <div className="h-px bg-[#1a260e]/15" />
    </div>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" className="mt-[3px] flex-shrink-0">
      <path d="M5 12l5 5 9-10" />
    </svg>
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

const CLASS_TYPES = 'Reformer, Hot Pilates, Red Light, Sculpt Mat Pilates, Barre & Belly Dance';

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
  const renderCard = (m: Membership, isMobile = false) => {
    // On tablet and desktop the Unlimited card spans the full row, with its perks beside the price
    const wide = m.popular && !isMobile;
    // Three tier cards side by side on tablet: tighter padding and a dot-less button until lg
    const compact = !isMobile && !wide;
    return (
    <>
      {/* Popular badge */}
      {m.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-eu-cream text-eu-ink border border-eu-ink px-4 py-2 rounded-full text-[11px] font-medium tracking-[0.16em] uppercase flex items-center gap-2 whitespace-nowrap">
            <Crown className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
            BEST VALUE
          </div>
        </div>
      )}

      <div className={`${isMobile ? 'px-6 pt-8 pb-6' : compact ? 'p-5 lg:p-7 xl:p-8' : 'p-7'} flex flex-col flex-1 ${
        wide ? 'md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:grid-rows-[auto_auto_1fr] md:gap-x-12 lg:gap-x-16 md:p-10 xl:p-14' : ''
      }`}>
        {/* Tier header */}
        <div className={`${isMobile ? 'mb-5' : 'mb-7'} ${wide ? 'md:col-start-1 md:row-start-1' : ''}`}>
          <p className={`eu-cap mb-3 ${compact ? 'md:min-h-[36px] lg:min-h-0' : ''} ${m.popular ? 'text-[#F5F0E8]' : 'text-eu-green'}`}>
            {m.description}
          </p>
          <h3 className={`font-serif font-normal leading-[1.1] tracking-[-0.01em] ${
            wide ? 'text-[30px] md:text-[clamp(34px,3.4vw,48px)]' : 'text-[28px] xl:text-[30px]'
          }`}>{m.name}</h3>
        </div>

        {/* Price */}
        <div className={`${isMobile ? 'mb-6' : 'mb-7'} ${wide ? 'md:col-start-1 md:row-start-2' : ''}`}>
          <div className="flex items-baseline gap-2">
            <span className={`font-serif font-normal tracking-[-0.03em] leading-[0.9] ${
              isMobile ? 'text-[56px]' : wide ? 'text-[56px] md:text-[clamp(64px,6.4vw,96px)]' : 'text-[52px] xl:text-[60px]'
            }`}>{m.monthlyPrice}</span>
            <span className={`text-[15px] ${m.popular ? 'text-[#F5F0E8]' : 'text-eu-sage'}`}>/mo</span>
          </div>
          {m.perClass && (
            <p className={`text-[14px] mt-3 ${
              m.popular ? 'text-[#F5F0E8]' : 'text-eu-sage'
            }`}>
              {m.perClass}
            </p>
          )}
          {m.savings && (
            <p className={`text-[14px] font-medium mt-1 ${
              m.popular ? 'text-[#F5F0E8]' : 'text-eu-green'
            }`}>
              {m.savings}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className={`h-px ${isMobile ? 'mb-5' : 'mb-6'} ${m.popular ? 'bg-[#fffcf2]/[0.16]' : 'bg-[#1a260e]/15'} ${wide ? 'md:hidden' : ''}`} />

        {/* Features */}
        <div className={`space-y-3 flex-1 ${
          wide ? 'md:col-start-2 md:row-start-1 md:row-span-3 md:border-t md:border-[#fffcf2]/[0.16] md:pt-6 xl:grid xl:grid-cols-2 xl:gap-x-8 xl:gap-y-3.5 xl:space-y-0 xl:content-start' : ''
        }`}>
          {m.features.map((f, fi) => (
            <div key={fi} className={`flex items-start gap-2.5 ${m.popular ? 'text-eu-cream' : 'text-eu-green'}`}>
              <Check />
              <span className="text-[15px] leading-[1.5]">
                {f}
              </span>
            </div>
          ))}
          {m.note && (
            <p className={`text-[14px] leading-[1.55] pt-2 ${wide ? 'xl:col-span-2 xl:pt-3' : ''} ${
              m.popular ? 'text-[#F5F0E8]' : 'text-eu-sage'
            }`}>
              {m.note}
            </p>
          )}
        </div>

        {/* CTA — touch-optimized 48px+ height */}
        <div className={`${isMobile ? 'mt-7' : 'mt-8'} flex items-center gap-3 min-h-[56px] rounded-full py-1.5 text-[12px] uppercase font-medium transition-colors duration-300 ${
          compact ? 'justify-center lg:justify-between px-4 lg:pl-6 lg:pr-1.5 tracking-[0.12em] lg:tracking-[0.16em]' : 'justify-between pl-6 pr-1.5 tracking-[0.16em]'
        } ${
          wide ? 'md:col-start-1 md:row-start-3 md:self-end md:mt-10' : ''
        } ${
          m.popular
            ? 'bg-eu-cream text-eu-ink group-hover:bg-eu-beige'
            : 'bg-eu-ink text-eu-cream group-hover:bg-eu-green'
        }`}>
          Start Membership
          <span className={`${compact ? 'hidden lg:grid' : 'grid'} place-items-center w-11 h-11 rounded-full flex-none transition-transform duration-500 ease-eu group-hover:-rotate-45 ${
            m.popular ? 'bg-eu-ink text-eu-cream' : 'bg-eu-cream text-eu-ink'
          }`}>
            <Arrow size={15} />
          </span>
        </div>
      </div>
    </>
    );
  };

  return (
    <div className="bg-eu-cream eu-page-top">

      {/* ════════════════════════════════════════════════════════════
          HERO — Editorial opening
         ════════════════════════════════════════════════════════════ */}
      <section className="eu-wrap grid grid-cols-12 gap-x-6 items-end pt-[clamp(48px,6vw,96px)] pb-[clamp(8px,2vw,24px)]">
        <div className="col-span-12 lg:col-span-8 eu-rise">
          <p className="eu-cap eu-cap-num text-eu-green">
            THE EUFORYC MEMBERSHIP
          </p>
          <h1 className="font-serif font-normal text-[clamp(46px,7.4vw,120px)] leading-[0.93] tracking-[-0.035em] mt-6 md:mt-7">
            Make movement{' '}<br />
            a <em>lifestyle</em>
          </h1>
        </div>

        <div className="col-span-12 lg:col-start-9 lg:col-span-4 mt-7 lg:mt-0 eu-rise">
          <p className="text-[16px] md:text-[17px] leading-[1.7] text-eu-green">
            One membership, the whole timetable. Use your credits across every
            Euforyc group class, or go Unlimited for our most exclusive perks.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['6-month minimum, then monthly rolling', 'Monthly card billing', 'Freeze up to 4 weeks per 6 months'].map((s, i) => (
              <span key={i} className="eu-chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CATEGORY CONTENT — Editorial pricing cards
         ════════════════════════════════════════════════════════════ */}
      <section className="pt-[clamp(56px,7vw,110px)] pb-[clamp(64px,8vw,120px)]">
        <div className="eu-wrap">
          <div>

            {/* Category header — editorial style */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-12 mb-8 md:mb-14">
              <Reveal>
                <p className="eu-cap eu-cap-num text-eu-green">
                  ONE MEMBERSHIP, EVERY CLASS
                </p>
                <h2 className="font-serif font-normal text-[clamp(40px,5vw,80px)] leading-[1] tracking-[-0.022em] text-eu-ink mt-5">
                  Euforyc <em>Membership</em>
                </h2>
              </Reveal>
              <Reveal className="lg:max-w-[440px]">
                <p className="text-[16px] leading-[1.7] text-eu-green">
                  Credits work across the whole Euforyc group class timetable — {CLASS_TYPES}.
                </p>
              </Reveal>
            </div>

            {/* ── Mobile: Horizontal snap-scroll carousel ── */}
            <div className="md:hidden">
              <div
                ref={carouselRef}
                className="flex items-start gap-4 overflow-x-auto snap-x snap-mandatory pt-6 pb-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  marginInline: 'calc(-1 * var(--eu-gutter))',
                  paddingInline: 'var(--eu-gutter)',
                  scrollPaddingInline: 'var(--eu-gutter)',
                }}
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
                    className={`group relative flex flex-col flex-shrink-0 w-[76vw] max-w-[320px] snap-start rounded-eu-md transition-transform duration-300 active:scale-[0.99] ${
                      m.popular
                        ? 'bg-eu-ink text-eu-cream border border-eu-ink'
                        : 'bg-eu-cream text-eu-ink border border-[#1a260e]/15'
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
                <div className="flex justify-center gap-2 mt-2">
                  {sortedMemberships.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to card ${i + 1}`}
                      aria-current={activeSlide === i ? 'true' : undefined}
                      onClick={() => {
                        if (!carouselRef.current) return;
                        const cardWidth = carouselRef.current.offsetWidth * 0.76;
                        const gap = 16;
                        carouselRef.current.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' });
                      }}
                      className="grid place-items-center w-11 h-11"
                    >
                      <span
                        aria-hidden="true"
                        className={`block rounded-full transition-all duration-300 ${
                          activeSlide === i
                            ? 'w-6 h-2 bg-eu-ink'
                            : 'w-2 h-2 border border-eu-ink/50'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Swipe hint */}
              <p className="eu-cap text-center text-eu-sage mt-1">
                Swipe to explore
              </p>
            </div>

            {/* ── Desktop: Grid layout ── */}
            <div className={`hidden md:grid gap-4 ${
              memberships.length <= 2
                ? 'grid-cols-2 max-w-3xl mx-auto'
                : memberships.length === 3
                  ? 'grid-cols-3 max-w-5xl mx-auto'
                  : 'grid-cols-3 gap-y-8'
            }`}>
              {memberships.map((m, i) => (
                <Reveal key={`desktop-${i}`} delay={i * 0.06} className={`flex flex-col ${m.popular && memberships.length > 3 ? 'col-span-3 mt-4' : ''}`}>
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
                    className={`group relative flex flex-col flex-1 h-full rounded-eu-md transition-[transform,box-shadow] duration-500 ease-eu hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-40px_rgba(26,38,14,0.5)] ${
                      m.popular
                        ? 'bg-eu-ink text-eu-cream border border-eu-ink rounded-eu-lg'
                        : 'bg-eu-cream text-eu-ink border border-[#1a260e]/15 hover:border-[#1a260e]/40'
                    }`}
                  >
                    {renderCard(m)}
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Inclusions note */}
            <Reveal>
              <p className="text-left md:text-center text-[14px] leading-[1.65] text-eu-sage mt-8 md:mt-10 max-w-2xl md:mx-auto">
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
      <section className="py-[clamp(80px,9vw,140px)]">
        <div className="eu-wrap">
          <Reveal>
            <div className="mb-10 md:mb-16 max-w-3xl">
              <p className="eu-cap eu-cap-num text-eu-green">WHY MEMBERSHIP</p>
              <h2 className="font-serif font-normal text-[clamp(40px,5vw,80px)] leading-[1.02] tracking-[-0.022em] text-eu-ink mt-5">
                Built for Those Who <em>Show Up</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
            {[
              {
                number: '01',
                title: 'One Membership, the Whole Timetable',
                body: 'Your credits work across every Euforyc group class — Reformer, Hot Pilates, Red Light, Sculpt Mat Pilates, Barre and Belly Dance. Mix it up however you like.',
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
                <div className="border-t border-eu-ink pt-7">
                  <span className="block font-serif italic text-[56px] md:text-[64px] leading-none text-eu-green">{value.number}</span>
                  <h3 className="font-serif font-normal text-[26px] md:text-[30px] leading-[1.15] text-eu-ink mt-6">{value.title}</h3>
                  <p className="text-[16px] text-eu-green leading-[1.7] mt-3.5 max-w-[380px]">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TERMS + CTA — Dark closing section
         ════════════════════════════════════════════════════════════ */}
      <div className="eu-wrap pb-[clamp(80px,9vw,140px)]">
      <section className="eu-on-dark rounded-eu-lg md:rounded-eu-xl bg-eu-ink text-eu-cream px-6 py-14 md:px-12 md:py-24">
        <div>
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="font-serif font-normal text-[clamp(38px,5vw,76px)] leading-[1.02] tracking-[-0.022em] mb-9 md:mb-12">
                Not sure which{' '}<br />membership is <em>right?</em>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <PillLink href="/contact" variant="cream" dot stretchMobile>
                SPEAK TO OUR TEAM
              </PillLink>
            </Reveal>

            {/* Terms */}
            <Reveal delay={0.15}>
              <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-[#fffcf2]/[0.16]">
                <p className="eu-cap text-[#F5F0E8] mb-5 md:mb-6">MEMBERSHIP TERMS</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="eu-chip">6-month minimum term, then monthly rolling</span>
                  <span className="hidden">|</span>
                  <span className="eu-chip">Monthly card billing</span>
                  <span className="hidden">|</span>
                  <span className="eu-chip">Two full billing cycles&apos; notice to cancel</span>
                  <span className="hidden">|</span>
                  <span className="eu-chip">Freeze up to 4 weeks per 6 months</span>
                </div>
                <p className="text-[15px] text-[#F5F0E8] mt-6">
                  To cancel, email{' '}
                  <a href="mailto:euforyc@gmail.com" className="inline-flex min-h-[44px] items-center text-eu-cream underline underline-offset-4 decoration-[#fffcf2]/60 hover:decoration-eu-cream transition-colors">
                    euforyc@gmail.com
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
