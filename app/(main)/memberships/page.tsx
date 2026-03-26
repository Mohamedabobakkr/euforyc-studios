'use client';

import { useState, useRef, useEffect } from 'react';
import { ExternalLink, Crown, CheckCircle, ArrowRight, Sparkles, Flame, Dumbbell, Music, User } from 'lucide-react';

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
}

interface Category {
  id: string;
  label: string;
  shortLabel: string;
  tagline: string;
  subtitle: string;
  icon: React.ReactNode;
  premium?: boolean;
  memberships: Membership[];
}

const categories: Category[] = [
  {
    id: 'all-access',
    label: 'All Access',
    shortLabel: 'All Access',
    tagline: 'THE ULTIMATE MEMBERSHIP',
    subtitle: 'One membership, every class — your complete studio experience',
    icon: <Sparkles className="h-4 w-4" />,
    premium: true,
    memberships: [
      {
        name: '4 Classes',
        monthlyPrice: '£100',
        perClass: '£25 per class',
        description: 'Explore everything',
        savings: 'Access all class types',
        features: [
          '4 classes per month (any class)',
          'Reformer, Hot Pilates, Barre & more',
          'Red Light Therapy sessions',
          'All dance styles included',
          'Priority booking access',
          'Free Euforyc tote bag'
        ],
        momenceUrl: 'https://momence.com/m/631785'
      },
      {
        name: '8 Classes',
        monthlyPrice: '£170',
        perClass: '£21.25 per class',
        description: 'Our most popular',
        savings: 'Best value for explorers',
        popular: true,
        features: [
          '8 classes per month (any class)',
          'Reformer, Hot Pilates, Barre & more',
          'Red Light Therapy sessions',
          'All dance styles included',
          'Priority booking access',
          '2 free grip socks',
          'Free Euforyc tote bag'
        ],
        momenceUrl: 'https://momence.com/m/631786'
      },
      {
        name: '12 Classes',
        monthlyPrice: '£240',
        perClass: '£20 per class',
        description: 'For the dedicated',
        savings: 'Maximum flexibility',
        features: [
          '12 classes per month (any class)',
          'Reformer, Hot Pilates, Barre & more',
          'Red Light Therapy sessions',
          'All dance styles included',
          'Priority booking access',
          '3 free grip socks',
          'Free Euforyc tote bag'
        ],
        momenceUrl: 'https://momence.com/m/631788'
      },
      {
        name: 'Unlimited',
        monthlyPrice: '£330',
        description: 'The complete experience',
        savings: 'Unlimited everything',
        features: [
          'Unlimited classes per month',
          'Reformer, Hot Pilates, Barre & more',
          'Red Light Therapy sessions',
          'All dance styles included',
          'Priority booking access',
          '4 free grip socks',
          '1 free Guest Pass',
          'Free Euforyc tote bag'
        ],
        momenceUrl: 'https://momence.com/m/631791'
      }
    ]
  },
  {
    id: 'reformer',
    label: 'Reformer Pilates',
    shortLabel: 'Reformer',
    tagline: 'EQUIPMENT-BASED',
    subtitle: 'Professional reformer machines, max 8 per class',
    icon: <Dumbbell className="h-4 w-4" />,
    memberships: [
      {
        name: '4 Classes',
        monthlyPrice: '£80',
        perClass: '£20 per class',
        description: 'Once a week',
        savings: 'Save £20/month vs packages',
        features: [
          '4 Reformer classes per month',
          'Priority booking access',
          '1 free grip sock',
          '1 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/497869'
      },
      {
        name: '8 Classes',
        monthlyPrice: '£155',
        perClass: '£19.38 per class',
        description: 'Twice a week',
        savings: 'Save £35/month vs packages',
        popular: true,
        features: [
          '8 Reformer classes per month',
          'Priority booking access',
          '2 free grip socks',
          '2 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498245'
      },
      {
        name: '12 Classes',
        monthlyPrice: '£230',
        perClass: '£19.17 per class',
        description: 'Three times a week',
        savings: 'Save £40/month vs packages',
        features: [
          '12 Reformer classes per month',
          'Priority booking access',
          '3 free grip socks',
          '3 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498246'
      },
      {
        name: 'Unlimited',
        monthlyPrice: '£290',
        description: 'Every day if you want',
        savings: 'Save £50/month vs packages',
        features: [
          'Unlimited Reformer classes per month',
          'Priority booking access',
          '4 free grip socks',
          '4 free matcha',
          '1 free Guest Pass'
        ],
        momenceUrl: 'https://momence.com/m/498247'
      }
    ]
  },
  {
    id: 'hot-pilates',
    label: 'Hot Pilates',
    shortLabel: 'Hot Pilates',
    tagline: 'INFRARED HEATED',
    subtitle: 'Dynamic mat work in our infrared-heated studio',
    icon: <Flame className="h-4 w-4" />,
    memberships: [
      {
        name: '4 Classes',
        monthlyPrice: '£70',
        perClass: '£17.50 per class',
        description: 'Once a week',
        savings: 'Save £5/month vs packages',
        features: [
          '4 Hot Pilates classes per month',
          'Priority booking access',
          '1 free grip sock',
          '1 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498688'
      },
      {
        name: '8 Classes',
        monthlyPrice: '£130',
        perClass: '£16.25 per class',
        description: 'Twice a week',
        savings: 'Save £10/month vs packages',
        popular: true,
        features: [
          '8 Hot Pilates classes per month',
          'Priority booking access',
          '2 free grip socks',
          '2 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498691'
      },
      {
        name: '12 Classes',
        monthlyPrice: '£200',
        perClass: '£16.67 per class',
        description: 'Three times a week',
        savings: 'Save £64/month vs drop-in',
        features: [
          '12 Hot Pilates classes per month',
          'Priority booking access',
          '3 free grip socks',
          '3 free matcha'
        ],
        momenceUrl: 'https://momence.com/m/498695'
      },
      {
        name: 'Unlimited',
        monthlyPrice: '£260',
        description: 'Sweat every day',
        savings: 'Save £40/month vs packages',
        features: [
          'Unlimited Hot Pilates classes per month',
          'Priority booking access',
          '4 free grip socks',
          '4 free matcha',
          '1 free Guest Pass'
        ],
        momenceUrl: 'https://momence.com/m/498697'
      }
    ]
  },
  {
    id: 'private',
    label: '1-1 Cadillac Reformer',
    shortLabel: '1-1 Private',
    tagline: 'PERSONALIZED',
    subtitle: 'Private sessions on our Cadillac Reformer, 60 minutes',
    icon: <User className="h-4 w-4" />,
    memberships: [
      {
        name: '4 Sessions',
        monthlyPrice: '£230',
        perClass: '£57.50 per session',
        description: 'Weekly sessions',
        savings: 'Save £20/month vs packages',
        features: [
          '4 private Cadillac Reformer sessions per month',
          'Personalized training plan',
          '60-minute sessions',
          'Priority booking access'
        ],
        momenceUrl: 'https://momence.com/m/540504'
      },
      {
        name: '8 Sessions',
        monthlyPrice: '£430',
        perClass: '£53.75 per session',
        description: 'Twice a week',
        savings: 'Save £60/month vs packages',
        popular: true,
        features: [
          '8 private Cadillac Reformer sessions per month',
          'Personalized training plan',
          '60-minute sessions',
          'Priority booking access'
        ],
        momenceUrl: 'https://momence.com/m/540503'
      },
      {
        name: '12 Sessions',
        monthlyPrice: '£610',
        perClass: '£50.83 per session',
        description: 'Three times a week',
        savings: 'Save £90/month vs packages',
        features: [
          '12 private Cadillac Reformer sessions per month',
          'Personalized training plan',
          '60-minute sessions',
          'Priority booking access'
        ],
        momenceUrl: 'https://momence.com/m/540501'
      }
    ]
  },
  {
    id: 'dance',
    label: 'Dance',
    shortLabel: 'Dance',
    tagline: 'RHYTHM & MOVEMENT',
    subtitle: 'Dabke, Belly Dance, Afro & more',
    icon: <Music className="h-4 w-4" />,
    memberships: [
      {
        name: '4 Classes',
        monthlyPrice: '£45',
        perClass: '£11.25 per class',
        description: 'Once a week',
        savings: 'Save £15/month vs drop-in',
        features: [
          '4 Dance classes per month',
          'Valid for all dance styles',
          'Priority booking access',
          'Ongoing monthly commitment'
        ],
        momenceUrl: 'https://momence.com/m/597181'
      },
      {
        name: '8 Classes',
        monthlyPrice: '£85',
        perClass: '£10.63 per class',
        description: 'Twice a week',
        savings: 'Save £40/month vs drop-in',
        popular: true,
        features: [
          '8 Dance classes per month',
          'Valid for all dance styles',
          'Priority booking access',
          'Ongoing monthly commitment'
        ],
        momenceUrl: 'https://momence.com/m/609596'
      }
    ]
  }
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Memberships() {
  const [activeCategory, setActiveCategory] = useState('all-access');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const current = categories.find(c => c.id === activeCategory)!;

  // Sort memberships: popular first on mobile
  const sortedMemberships = [...current.memberships].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  // Sticky detection
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (!tabsRef.current) return;
    const activeBtn = tabsRef.current.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory]);

  // Reset carousel position when category changes
  useEffect(() => {
    setActiveSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  // Track carousel scroll position for dot indicators
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
  }, [sortedMemberships.length, activeCategory]);

  // Render a single membership card
  const renderCard = (m: typeof current.memberships[0], isMobile = false) => (
    <>
      {/* Popular badge */}
      {m.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase flex items-center gap-1.5 shadow-lg shadow-amber-400/20">
            <Crown className="w-3 h-3" />
            MOST POPULAR
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
                COMMIT TO YOUR PRACTICE
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
                Save more, move more. Choose a membership that fits your rhythm
                and unlock priority booking, exclusive perks, and the best rates.
              </p>
            </Reveal>

            {/* Trust signals — stack vertically on mobile */}
            <Reveal delay={0.22}>
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-2 md:gap-x-6 md:gap-y-2 mt-8 md:mt-12 text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-[#fffcf2]/20">
                {['6-month commitment', 'Monthly billing', 'Freeze up to 4 weeks/year'].map((s, i) => (
                  <span key={i} className="flex items-center gap-3">
                    {i > 0 && <span className="hidden md:inline w-1 h-1 rounded-full bg-[#fffcf2]/15" />}
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
          SENTINEL + STICKY TABS
         ════════════════════════════════════════════════════════════ */}
      <div ref={sentinelRef} className="h-0" />

      <div
        className={`sticky top-[72px] z-40 transition-all duration-500 ${
          isSticky
            ? 'bg-[#fffcf2]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(26,38,14,0.06)]'
            : 'bg-[#fffcf2]'
        }`}
      >
        {/* Gradient edge fades for scroll hint on mobile */}
        <div className="relative md:static">
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#fffcf2] to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#fffcf2] to-transparent z-10 pointer-events-none md:hidden" />

          <div className="container-width">
            <div
              ref={tabsRef}
              className="flex overflow-x-auto py-4 md:py-5 gap-1.5 md:gap-2 md:justify-center px-5 md:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  data-active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2.5 rounded-full text-[12px] md:text-[13px] tracking-wide whitespace-nowrap transition-all duration-300 flex-shrink-0 min-h-[44px] ${
                    activeCategory === cat.id
                      ? 'bg-[#1a260e] text-[#fffcf2] font-medium shadow-lg shadow-[#1a260e]/15'
                      : 'text-[#1a260e]/40 hover:text-[#1a260e]/70 hover:bg-[#1a260e]/[0.04] active:bg-[#1a260e]/[0.06]'
                  }`}
                >
                  {cat.icon}
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.shortLabel}</span>
                  {cat.premium && activeCategory !== cat.id && (
                    <span className="text-[9px] font-semibold tracking-widest text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                      BEST
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                  {current.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-serif text-[1.75rem] md:text-4xl lg:text-5xl font-light text-[#1a260e] leading-tight">
                  {current.label.split(' ').length > 1
                    ? <>{current.label.split(' ').slice(0, -1).join(' ')}{' '}<span className="italic">{current.label.split(' ').slice(-1)}</span></>
                    : <span className="italic">{current.label}</span>
                  }
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[#1a260e]/40 text-[13px] md:text-base font-light mt-3 md:mt-4 max-w-lg mx-auto">
                  {current.subtitle}
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
                    key={`${current.id}-mobile-${i}`}
                    href={m.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
              current.memberships.length <= 2
                ? 'grid-cols-2 max-w-3xl mx-auto'
                : current.memberships.length === 3
                  ? 'grid-cols-3 max-w-5xl mx-auto'
                  : 'grid-cols-2 lg:grid-cols-4'
            }`}>
              {current.memberships.map((m, i) => (
                <Reveal key={`${current.id}-desktop-${i}`} delay={i * 0.06}>
                  <a
                    href={m.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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

            {/* ── All Access upsell ── */}
            {activeCategory !== 'all-access' && (
              <Reveal>
                <div className="mt-10 md:mt-20">
                  <button
                    onClick={() => {
                      setActiveCategory('all-access');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full group relative overflow-hidden rounded-sm bg-[#1a260e] text-[#fffcf2] py-8 md:py-14 px-6 md:px-12 text-left transition-all duration-500 hover:shadow-2xl hover:shadow-[#1a260e]/10 active:scale-[0.99]"
                  >
                    {/* Decorative */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#fffcf2]/[0.02] rounded-full blur-2xl" />
                    </div>

                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-5">
                      <div>
                        <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-amber-400/70 mb-2 md:mb-3">
                          WANT ACCESS TO EVERYTHING?
                        </p>
                        <h3 className="font-serif text-xl md:text-3xl lg:text-4xl font-light leading-tight">
                          Euforyc All <span className="italic">Access</span>
                        </h3>
                        <p className="text-[13px] md:text-sm text-[#fffcf2]/35 font-light mt-1.5 md:mt-2 max-w-md">
                          One membership, every class. Plus a free tote bag.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] md:text-[12px] tracking-[0.12em] uppercase text-[#fffcf2]/50 group-hover:text-[#fffcf2] transition-colors flex-shrink-0">
                        View All Access
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </button>
                </div>
              </Reveal>
            )}
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
                title: 'Priority Booking',
                body: 'Book your favourite classes before non-members with exclusive early access.',
              },
              {
                number: '02',
                title: 'Better Value',
                body: 'Significant savings plus complimentary matcha, grip socks, and member discounts.',
              },
              {
                number: '03',
                title: 'VIP Perks',
                body: 'Guest passes, tote bags, grip socks — perks that grow with your commitment.',
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
                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-1.5 md:gap-x-6 md:gap-y-2 text-[10px] md:text-[11px] text-[#fffcf2]/20 font-light">
                  <span>6-month minimum commitment</span>
                  <span className="hidden md:inline text-[#fffcf2]/10">|</span>
                  <span>Monthly card or Direct Debit</span>
                  <span className="hidden md:inline text-[#fffcf2]/10">|</span>
                  <span>Two billing cycles notice to cancel</span>
                  <span className="hidden md:inline text-[#fffcf2]/10">|</span>
                  <span>Freeze up to 4 weeks/year</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
