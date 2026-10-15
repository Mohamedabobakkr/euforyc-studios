'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Flame, Zap, Heart, Crown, Dumbbell, Music } from 'lucide-react';
import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';

// Services Schema for SEO
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Pilates Services at Euforyc Studios London',
  description: 'Professional pilates services offered at our boutique studio in Edgware, London',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'Reformer Pilates Classes',
      description: 'Equipment-based group pilates classes using professional reformer machines',
      provider: { '@type': 'LocalBusiness', name: 'Euforyc Studios', address: '7-8 Holmstall Parade, Edgware, HA8 5HX' },
      areaServed: 'London',
      offers: { '@type': 'AggregateOffer', lowPrice: '28', highPrice: '320', priceCurrency: 'GBP' }
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Hot Pilates Classes',
      description: 'Infrared-heated pilates classes for a more intense, heated session',
      provider: { '@type': 'LocalBusiness', name: 'Euforyc Studios', address: '7-8 Holmstall Parade, Edgware, HA8 5HX' },
      areaServed: 'London',
      offers: { '@type': 'AggregateOffer', lowPrice: '28', highPrice: '320', priceCurrency: 'GBP' }
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Private Pilates Sessions',
      description: 'One-on-one personalized pilates training with expert instructors',
      provider: { '@type': 'LocalBusiness', name: 'Euforyc Studios', address: '7-8 Holmstall Parade, Edgware, HA8 5HX' },
      areaServed: 'London',
      offers: { '@type': 'AggregateOffer', lowPrice: '250', highPrice: '700', priceCurrency: 'GBP' }
    }
  ]
};

// Package data
const packages = {
  intro: {
    title: 'Intro Offer',
    subtitle: 'New to Euforyc? Try It All',
    packages: [
      { id: 'try-all', name: 'Try It All', classes: '3 Classes', price: '£60', savings: 'First-time offer', description: 'Three classes to use across all our group classes - Reformer, Hot Pilates, Barre, Dance & more', momenceUrl: 'https://momence.com/m/631782', icon: 'sparkles', validity: '20 days from first class' }
    ]
  },
  private: {
    title: '1-1 Private Cadillac Reformer',
    subtitle: 'Personalized training on our Cadillac Reformer',
    note: 'Valid 90 days',
    packages: [
      { name: '4 Sessions', price: '£250', savings: 'save £50', momenceUrl: 'https://momence.com/m/473317' },
      { name: '8 Sessions', price: '£490', savings: 'save £110', momenceUrl: 'https://momence.com/m/473318' },
      { name: '12 Sessions', price: '£700', savings: 'save £200', momenceUrl: 'https://momence.com/m/473321' }
    ]
  },
  euforycPackage: {
    title: 'Euforyc Package',
    subtitle: 'Use your classes across all group classes. No contract.',
    note: 'Valid 30 days from your first class',
    packages: [
      { name: '4 Classes', price: '£105', savings: 'save £7', momenceUrl: 'https://momence.com/m/632399' },
      { name: '8 Classes', price: '£190', savings: 'save £34', momenceUrl: 'https://momence.com/m/632400' },
      { name: '12 Classes', price: '£270', savings: 'save £66', momenceUrl: 'https://momence.com/m/632401' },
      { name: '30 Days Unlimited', price: '£320', momenceUrl: 'https://momence.com/m/938674' }
    ]
  },
  move: {
    title: 'MOVE',
    subtitle: 'Sculpt Mat Pilates & Belly Dance, mix and match. No contract.',
    note: 'Valid 30 days from your first class',
    packages: [
      { name: '4 Classes', price: '£70', savings: 'save £10', momenceUrl: 'https://momence.com/m/707786' },
      { name: '8 Classes', price: '£135', savings: 'save £25', momenceUrl: 'https://momence.com/m/707788' }
    ]
  }
};

type CategoryKey = 'euforycPackage' | 'move' | 'private';

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'euforycPackage', label: 'Euforyc Package' },
  { key: 'move', label: 'MOVE' },
  { key: 'private', label: 'Private' },
];

type IntroOfferType = 'try-all';

const getIcon = (icon: string, className?: string) => {
  switch (icon) {
    case 'flame': return <Flame className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'heart': return <Heart className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'crown': return <Crown className={className} />;
    case 'dumbbell': return <Dumbbell className={className} />;
    case 'music': return <Music className={className} />;
    default: return <Sparkles className={className} />;
  }
};

// Intro section — reads ?offer= after mount so it can be rendered as static HTML
function IntroOffersSection() {
  const [selectedOffer, setSelectedOffer] = useState<IntroOfferType>('try-all');
  const [fromAd, setFromAd] = useState(false);

  useEffect(() => {
    const offer = new URLSearchParams(window.location.search).get('offer') as IntroOfferType | null;
    if (offer && ['try-all'].includes(offer)) {
      setSelectedOffer(offer);
      setFromAd(true);
    }
  }, []);

  const introPackages = packages.intro.packages;
  const currentPackage = introPackages.find(pkg => pkg.id === selectedOffer) || introPackages[0];

  return (
    <section className="pt-[clamp(56px,7vw,110px)] bg-eu-cream">
      <div className="eu-wrap">
        <div>
          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-12 mb-8 md:mb-12">
            <div>
              <div className="eu-chip mb-5">
                <Sparkles className="h-3.5 w-3.5 text-eu-green" strokeWidth={1.5} aria-hidden="true" />
                <span className="eu-cap">New clients</span>
              </div>
              <h2 className="font-serif font-normal text-[clamp(40px,5vw,80px)] leading-[1] tracking-[-0.022em] text-eu-ink">
                Intro Offer
              </h2>
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-eu-green lg:max-w-[420px]">
              Your first step into the studio
            </p>
          </div>

          {/* Mobile: Selector + Card */}
          <div className="md:hidden">
            <div className="flex flex-wrap gap-2 mb-5">
              {introPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  aria-pressed={selectedOffer === pkg.id}
                  onClick={() => setSelectedOffer(pkg.id as IntroOfferType)}
                  className={`min-h-[48px] py-2 px-5 rounded-full border text-[14px] transition-colors duration-300 flex items-center justify-center gap-2 ${
                    selectedOffer === pkg.id
                      ? 'bg-eu-ink text-eu-cream border-eu-ink'
                      : 'bg-transparent text-eu-ink border-[#1a260e]/30'
                  }`}
                >
                  {getIcon(pkg.icon, 'h-4 w-4')}
                  <span className="truncate">{pkg.name.replace(' Pilates', '').replace('Red Light Hot', 'Red Light')}</span>
                </button>
              ))}
            </div>

            {fromAd && (
              <div className="mb-4 flex">
                <div className="eu-chip bg-eu-beige border-transparent text-eu-ink">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                  <span>Special offer selected</span>
                </div>
              </div>
            )}

            <a href={currentPackage.momenceUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-eu-md">
              <div className="bg-eu-ink text-eu-cream rounded-eu-md px-6 pt-7 pb-6 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 border border-[#fffcf2]/40 rounded-full flex items-center justify-center">
                    {getIcon(currentPackage.icon, 'h-5 w-5 text-eu-cream')}
                  </div>
                  <div>
                    <h3 className="font-serif font-normal text-[36px] leading-[1.05] tracking-[-0.01em]">{currentPackage.name}</h3>
                    <p className="eu-cap text-[#F5F0E8] mt-3">{currentPackage.classes}</p>
                  </div>
                  <div>
                    <p className="font-serif font-normal text-[88px] leading-[0.85] tracking-[-0.04em]">{currentPackage.price}</p>
                    <p className="text-[14px] text-[#F5F0E8] mt-4">Valid for {currentPackage.validity}</p>
                  </div>
                  <p className="text-[15px] text-[#F5F0E8] leading-[1.6]">{currentPackage.description}</p>
                  <div className="pt-1">
                    <span className="flex items-center justify-between gap-3 min-h-[56px] rounded-full bg-eu-cream text-eu-ink pl-6 pr-1.5 py-1.5 text-[12px] tracking-[0.16em] uppercase font-medium">
                      Claim Offer
                      <span className="grid place-items-center w-11 h-11 rounded-full bg-eu-ink text-eu-cream flex-none">
                        <Arrow size={15} />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop: Row of cards */}
          <div className={`hidden md:grid gap-4 ${introPackages.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {introPackages.map((pkg) => (
              <a
                key={pkg.id}
                href={pkg.momenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-eu-ink text-eu-cream rounded-eu-lg p-10 lg:p-14 transition-[transform,box-shadow] duration-500 ease-eu hover:shadow-[0_30px_60px_-40px_rgba(26,38,14,0.6)] hover:-translate-y-1"
              >
                <div className={`relative z-10 ${introPackages.length === 1 ? 'grid grid-cols-[minmax(0,1fr)_auto_auto] items-end gap-x-10 lg:gap-x-16 gap-y-8' : 'space-y-5'}`}>
                  <div className="col-start-1 row-start-1 w-14 h-14 border border-[#fffcf2]/40 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[#fffcf2]/10">
                    {getIcon(pkg.icon, 'h-5 w-5 text-eu-cream')}
                  </div>
                  <div className="col-start-1 row-start-2">
                    <h3 className="font-serif font-normal text-[clamp(40px,4.4vw,64px)] leading-[1] tracking-[-0.02em]">{pkg.name}</h3>
                    <p className="eu-cap text-[#F5F0E8] mt-4">{pkg.classes}</p>
                  </div>
                  <div className="col-start-2 row-start-1 row-span-2">
                    <p className="font-serif font-normal text-[clamp(96px,9vw,148px)] leading-[0.85] tracking-[-0.045em]">{pkg.price}</p>
                    <p className="text-[15px] text-[#F5F0E8] mt-4">Valid {pkg.validity}</p>
                  </div>
                  <div className="col-start-3 row-start-1 row-span-2 flex items-center justify-between gap-4 min-h-[60px] rounded-full bg-eu-cream text-eu-ink pl-7 pr-2 py-2 transition-colors duration-300 group-hover:bg-eu-beige">
                    <span className="font-sans text-[12px] font-medium tracking-[0.18em] uppercase">Claim</span>
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-eu-ink text-eu-cream flex-none transition-transform duration-500 ease-eu group-hover:-rotate-45">
                      <Arrow size={15} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="text-[14px] text-eu-sage mt-5 md:mt-6">
            Try It All is for first-time clients only and can only be bought once
          </p>
        </div>
      </div>
    </section>
  );
}

// Package card component
function PackageCard({ pkg }: { pkg: { name: string; price: string; savings?: string; momenceUrl: string } }) {
  const isUnlimited = pkg.name.endsWith('Unlimited');
  return (
    <a
      href={pkg.momenceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col rounded-eu-sm transition-[background-color,color,transform] duration-300 ease-eu hover:-translate-y-[3px] ${
        isUnlimited
          ? 'bg-eu-ink text-eu-cream hover:bg-eu-green'
          : 'bg-eu-beige text-eu-ink hover:bg-eu-ink hover:text-eu-cream'
      }`}
    >
      {isUnlimited && (
        <div className="absolute top-5 right-5">
          <Crown className="h-4 w-4 text-[#F5F0E8]" strokeWidth={1.5} aria-hidden="true" />
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-1 p-5 md:p-6 min-h-[176px] md:min-h-[200px]">
        <div className={isUnlimited ? 'pr-7' : ''}>
          <h3 className="font-sans text-[15px] leading-[1.35]">{pkg.name}</h3>
        </div>

        <div className="mt-3">
          <p className="font-serif font-normal text-[44px] md:text-[52px] leading-[0.95] tracking-[-0.03em]">{pkg.price}</p>
          {pkg.savings && (
            <p className={`eu-cap mt-2.5 transition-colors duration-300 ${
              isUnlimited ? 'text-[#F5F0E8]' : 'text-eu-sage group-hover:text-[#F5F0E8]'
            }`}>{pkg.savings}</p>
          )}
        </div>

        <div className={`flex items-center justify-between gap-2 mt-auto pt-6 transition-colors duration-300 ${
          isUnlimited
            ? 'text-eu-cream'
            : 'text-eu-ink group-hover:text-eu-cream'
        }`}>
          <span className="font-sans text-[12px] tracking-[0.16em] uppercase">Book Now</span>
          <span className="transition-transform duration-500 ease-eu group-hover:translate-x-1">
            <Arrow size={16} />
          </span>
        </div>
      </div>
    </a>
  );
}

// Main packages section with tabs
function PackagesSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('euforycPackage');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const activeData = packages[activeCategory];
  const activePackages = activeData.packages as { name: string; price: string; savings?: string; momenceUrl: string }[];

  // Track scroll position for edge fades
  const updateScrollIndicators = () => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    updateScrollIndicators();
    el.addEventListener('scroll', updateScrollIndicators, { passive: true });
    window.addEventListener('resize', updateScrollIndicators);
    return () => {
      el.removeEventListener('scroll', updateScrollIndicators);
      window.removeEventListener('resize', updateScrollIndicators);
    };
  }, []);

  // Centre the active tab in its strip on mobile. Only the strip scrolls:
  // scrollIntoView() would also scroll the page down to the tabs on load
  useEffect(() => {
    const strip = tabsRef.current;
    if (strip) {
      const activeTab = strip.querySelector('[data-active="true"]') as HTMLElement;
      if (activeTab) {
        const tab = activeTab.getBoundingClientRect();
        const box = strip.getBoundingClientRect();
        strip.scrollTo({
          left: strip.scrollLeft + tab.left - box.left - (strip.clientWidth - tab.width) / 2,
          behavior: 'smooth',
        });
      }
    }
    // Small delay to let scroll settle, then update indicators
    setTimeout(updateScrollIndicators, 350);
  }, [activeCategory]);

  // Determine grid layout based on package count
  const getGridCols = (count: number) => {
    if (count === 1) return 'grid-cols-1 max-w-sm';
    if (count <= 2) return 'grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-3';
    return 'grid-cols-2 xl:grid-cols-4';
  };

  return (
    <section className="py-[clamp(72px,8vw,120px)] bg-eu-cream">
      <div className="eu-wrap">
        <div>
          {/* Section header */}
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-12 mb-8 md:mb-10">
          <div className="mb-7 lg:mb-0">
            <h2 className="font-serif font-normal text-[clamp(40px,5vw,80px)] leading-[1] tracking-[-0.022em] text-eu-ink">
              Class Packages
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-eu-green max-w-lg mt-5">
              Commit to your practice and save. Group class packages are valid for 30 days from your first class.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="lg:flex-none">
            {/* Mobile: Horizontal scroll with edge fade indicators */}
            <div className="md:hidden relative" style={{ marginInline: 'calc(-1 * var(--eu-gutter))' }}>
              {/* Left fade - appears when scrollable to left */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none transition-opacity duration-300 ${
                  canScrollLeft ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ background: 'linear-gradient(to right, #fffcf2 20%, transparent)' }}
              />

              {/* Right fade - appears when scrollable to right */}
              <div
                className={`absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none transition-opacity duration-300 ${
                  canScrollRight ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ background: 'linear-gradient(to left, #fffcf2 20%, transparent)' }}
              />

              <div
                ref={tabsRef}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                style={{ paddingInline: 'var(--eu-gutter)' }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    data-active={activeCategory === cat.key}
                    aria-pressed={activeCategory === cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex-shrink-0 min-h-[48px] py-2 px-5 rounded-full border text-[14px] transition-colors duration-300 ${
                      activeCategory === cat.key
                        ? 'bg-eu-ink text-eu-cream border-eu-ink'
                        : 'bg-transparent text-eu-ink border-[#1a260e]/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Subtle scroll hint text - only on first render when right is scrollable */}
              {canScrollRight && !canScrollLeft && (
                <p className="eu-cap text-center text-eu-sage mt-2">
                  swipe for more
                </p>
              )}
            </div>

            {/* Desktop: Segmented pills */}
            <div className="hidden md:inline-flex p-1.5 gap-2 rounded-full bg-eu-beige">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  aria-pressed={activeCategory === cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`min-h-[48px] px-6 rounded-full text-[12px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                    activeCategory === cat.key
                      ? 'bg-eu-ink text-eu-cream'
                      : 'bg-transparent text-eu-green hover:bg-[#1a260e]/[0.07] hover:text-eu-ink'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          </div>

          {/* Active category content */}
          <div className="rounded-eu-md border border-[#1a260e]/15 p-5 sm:p-7 md:p-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
            {/* Category title + subtitle */}
            <div className="mb-6 md:mb-8 lg:mb-0">
              <h3 className="font-serif font-normal text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.015em] text-eu-ink">
                {activeData.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-eu-green mt-3">
                {activeData.subtitle}
              </p>
              {'note' in activeData && (activeData as { note?: string }).note && (
                <p className="eu-chip mt-4">
                  {(activeData as { note: string }).note}
                </p>
              )}
            </div>

            <div>
            {/* Package cards grid */}
            <div className={`grid ${getGridCols(activePackages.length)} gap-2.5 md:gap-3`}>
              {activePackages.map((pkg, index) => (
                <PackageCard key={`${activeCategory}-${index}`} pkg={pkg} />
              ))}
            </div>

            {/* Euforyc Package upsell hint when not on Euforyc Package */}
            {activeCategory !== 'euforycPackage' && activeCategory !== 'private' && (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setActiveCategory('euforycPackage')}
                  className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 min-h-[44px] py-2 text-left text-eu-green hover:text-eu-ink transition-colors duration-300 group"
                >
                  <span className="font-sans text-[12px] tracking-[0.14em] uppercase">Want access to everything?</span>
                  <span className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.14em] uppercase underline underline-offset-4 group-hover:no-underline">See Euforyc Package
                  <Arrow size={14} /></span>
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Packages() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />

      <div className="eu-page-top bg-eu-cream">
        {/* Hero */}
        <section className="relative pt-[clamp(48px,6vw,96px)] pb-[clamp(40px,5vw,64px)]">
          <div className="eu-wrap grid grid-cols-12 gap-x-6 items-end">
            <div className="col-span-12 lg:col-span-8 eu-rise">
              <h1 className="font-serif font-normal text-[clamp(42px,7vw,112px)] text-eu-ink tracking-[-0.03em] leading-[0.95]">
                YOUR PRACTICE,{' '}
                <br />
                <em className="tracking-[-0.035em]">your pace</em>
              </h1>
            </div>
            <div className="col-span-12 lg:col-start-9 lg:col-span-4 mt-7 lg:mt-0 eu-rise">
              <p className="text-[16px] md:text-[17px] text-eu-green leading-[1.7]">
                Choose the package that fits your lifestyle. Start anytime, move at your own rhythm.
              </p>
              <div className="w-12 h-[1px] bg-[#1a260e]/30 mt-6" />
            </div>
          </div>
        </section>

        {/* Divider line */}
        <div className="bg-eu-cream">
          <div className="eu-wrap">
            <div className="h-[1px] bg-[#1a260e]/15" />
          </div>
        </div>

        {/* Intro Offers */}
        {/* Rendered directly (no Suspense): it reads ?offer= after mount */}
        <IntroOffersSection />

        {/* Divider */}
        <div className="bg-eu-cream pt-[clamp(72px,8vw,120px)]">
          <div className="eu-wrap">
            <div className="h-[1px] bg-[#1a260e]/15" />
          </div>
        </div>

        {/* Tabbed Packages */}
        <PackagesSection />

        {/* Bottom CTA */}
        <div className="eu-wrap pb-[clamp(80px,9vw,140px)]">
        <section className="eu-on-dark relative rounded-eu-lg md:rounded-eu-xl px-6 py-14 md:px-12 md:py-24 bg-eu-ink text-eu-cream overflow-hidden">
          <div className="text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="font-serif font-normal text-[clamp(38px,5vw,76px)] leading-[1.02] tracking-[-0.022em]">
                Not sure where to start?
              </h2>
              <p className="text-[16px] md:text-[17px] text-[#F5F0E8] leading-[1.7] max-w-md mx-auto">
                Reach out and we&apos;ll help you find the perfect fit for your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <PillLink href="/book" variant="cream" dot stretchMobile>
                  Book a Class
                </PillLink>
                <PillLink href="/contact" variant="ghost" stretchMobile>
                  Contact Us
                </PillLink>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
    </>
  );
}
