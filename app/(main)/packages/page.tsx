'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Flame, Zap, Heart, Crown, ChevronRight } from 'lucide-react';

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
      provider: { '@type': 'LocalBusiness', name: 'Euforyc Studios', address: '7 Holmstall Ave, Edgware HA8 5HX, London' },
      areaServed: 'London',
      offers: { '@type': 'AggregateOffer', lowPrice: '60', highPrice: '340', priceCurrency: 'GBP' }
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Hot Pilates Classes',
      description: 'Infrared-heated pilates classes for enhanced flexibility and detoxification',
      provider: { '@type': 'LocalBusiness', name: 'Euforyc Studios', address: '7 Holmstall Ave, Edgware HA8 5HX, London' },
      areaServed: 'London',
      offers: { '@type': 'AggregateOffer', lowPrice: '50', highPrice: '300', priceCurrency: 'GBP' }
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Private Pilates Sessions',
      description: 'One-on-one personalized pilates training with expert instructors',
      provider: { '@type': 'LocalBusiness', name: 'Euforyc Studios', address: '7 Holmstall Ave, Edgware HA8 5HX, London' },
      areaServed: 'London',
      offers: { '@type': 'AggregateOffer', lowPrice: '250', highPrice: '700', priceCurrency: 'GBP' }
    }
  ]
};

// Package data
const packages = {
  intro: {
    title: 'Intro Offers',
    subtitle: 'New to Euforyc? Choose your perfect start',
    packages: [
      { id: 'reformer', name: 'Reformer Pilates', classes: '3 Classes', price: '£60', savings: 'First-time offer', description: 'Equipment-based pilates on our professional reformer machines', momenceUrl: 'https://momence.com/m/488100', icon: 'package', validity: '20 days' },
      { id: 'hot-pilates', name: 'Hot Pilates', classes: '3 Classes', price: '£50', savings: 'First-time offer', description: 'Dynamic mat-based pilates with infrared heat', momenceUrl: 'https://momence.com/m/507852', icon: 'flame', validity: '30 days' },
      { id: 'red-light', name: 'Red Light Hot Pilates', classes: '3 Classes', price: '£65', savings: 'First-time offer', description: 'Enhanced hot pilates with red light therapy benefits', momenceUrl: 'https://momence.com/m/624096', icon: 'zap', validity: '30 days' },
      { id: 'barre', name: 'Barre', classes: '3 Classes', price: '£60', savings: 'First-time offer', description: 'Ballet-inspired workout for strength and flexibility', momenceUrl: 'https://momence.com/m/621480', icon: 'heart', validity: '30 days' },
      { id: 'try-all', name: 'Try All', classes: '3 Classes', price: '£70', savings: 'First-time offer', description: 'Experience all class types - Reformer, Hot Pilates, Barre, Dance & more', momenceUrl: 'https://momence.com/m/631782', icon: 'sparkles', validity: '20 days' }
    ]
  },
  reformer: {
    title: 'Reformer Pilates',
    subtitle: 'Equipment-based group classes',
    packages: [
      { name: '4 Classes', price: '£100', savings: 'save £12', momenceUrl: 'https://momence.com/m/473322' },
      { name: '8 Classes', price: '£190', savings: 'save £34', momenceUrl: 'https://momence.com/m/473323' },
      { name: '12 Classes', price: '£270', savings: 'save £66', momenceUrl: 'https://momence.com/m/473324' },
      { name: 'Unlimited', price: '£340', savings: 'save £100+', momenceUrl: 'https://momence.com/m/473325' }
    ]
  },
  hotPilates: {
    title: 'Hot Pilates',
    subtitle: 'Dynamic heated mat classes',
    packages: [
      { name: '4 Classes', price: '£75', savings: 'save £13', momenceUrl: 'https://momence.com/m/473314' },
      { name: '8 Classes', price: '£140', savings: 'save £36', momenceUrl: 'https://momence.com/m/473315' },
      { name: '12 Classes', price: '£200', savings: 'save £64', momenceUrl: 'https://momence.com/m/473316' },
      { name: 'Unlimited', price: '£300', savings: 'save £60+', momenceUrl: 'https://momence.com/m/473319' }
    ]
  },
  sculptMatPilates: {
    title: 'Sculpt Mat Pilates',
    subtitle: 'Strengthen, tone and sculpt with mat-based pilates',
    packages: [
      { name: '4 Classes', price: '£70', savings: 'save £2', momenceUrl: 'https://momence.com/m/707786' },
      { name: '8 Classes', price: '£135', savings: 'save £9', momenceUrl: 'https://momence.com/m/707788' },
      { name: '12 Classes', price: '£199', savings: 'save £17', momenceUrl: 'https://momence.com/m/707789' },
      { name: 'Unlimited', price: '£250', savings: 'best value', momenceUrl: 'https://momence.com/m/707790' }
    ]
  },
  barrePackage: {
    title: 'Barre',
    subtitle: 'Ballet-inspired strength, flexibility and grace',
    packages: [
      { name: '4 Classes', price: '£90', savings: 'save £10', momenceUrl: 'https://momence.com/m/707791' },
      { name: '8 Classes', price: '£175', savings: 'save £25', momenceUrl: 'https://momence.com/m/707793' }
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
  allAccess: {
    title: 'Euforyc All Access',
    subtitle: 'Access ALL class types — Reformer, Hot Pilates, Barre, Red Light & Dance',
    packages: [
      { name: '4 Classes', price: '£115', momenceUrl: 'https://momence.com/m/632399' },
      { name: '8 Classes', price: '£200', momenceUrl: 'https://momence.com/m/632400' },
      { name: '12 Classes', price: '£280', momenceUrl: 'https://momence.com/m/632401' }
    ]
  },
  dancePackage: {
    title: 'Dance',
    subtitle: 'Dabke, Belly Dance, Afro, or Bollywood — your choice',
    packages: [
      { name: '4 Classes', price: '£50', savings: 'save £10', momenceUrl: 'https://momence.com/m/597174' },
      { name: '8 Classes', price: '£90', savings: 'save £30', momenceUrl: 'https://momence.com/m/609496' }
    ]
  }
};

type CategoryKey = 'reformer' | 'hotPilates' | 'sculptMatPilates' | 'barrePackage' | 'private' | 'allAccess' | 'dancePackage';

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'reformer', label: 'Reformer' },
  { key: 'hotPilates', label: 'Hot Pilates' },
  { key: 'sculptMatPilates', label: 'Sculpt Mat' },
  { key: 'barrePackage', label: 'Barre' },
  { key: 'private', label: 'Private' },
  { key: 'allAccess', label: 'All Access' },
  { key: 'dancePackage', label: 'Dance' },
];

type IntroOfferType = 'reformer' | 'hot-pilates' | 'red-light' | 'barre' | 'try-all';

const getIcon = (icon: string, className?: string) => {
  switch (icon) {
    case 'flame': return <Flame className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'heart': return <Heart className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    default: return <Sparkles className={className} />;
  }
};

// Intro section with useSearchParams
function IntroOffersSection() {
  const searchParams = useSearchParams();
  const [selectedOffer, setSelectedOffer] = useState<IntroOfferType>('reformer');
  const [fromAd, setFromAd] = useState(false);

  useEffect(() => {
    const offer = searchParams.get('offer') as IntroOfferType | null;
    if (offer && ['reformer', 'hot-pilates', 'red-light', 'barre', 'try-all'].includes(offer)) {
      setSelectedOffer(offer);
      setFromAd(true);
    }
  }, [searchParams]);

  const introPackages = packages.intro.packages;
  const currentPackage = introPackages.find(pkg => pkg.id === selectedOffer) || introPackages[0];

  return (
    <section className="py-16 md:py-20 bg-[#fffcf2]">
      <div className="container-width px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1a260e]/5 rounded-full mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#1a260e]" />
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#1a260e]/70 uppercase">New clients</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1a260e] tracking-wide mb-3">
              Intro Offers
            </h2>
            <p className="font-sans text-sm md:text-base text-[#1a260e]/50">
              Your first step into the studio
            </p>
          </div>

          {/* Mobile: Selector + Card */}
          <div className="md:hidden">
            <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-sm mx-auto">
              {introPackages.map((pkg, index) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedOffer(pkg.id as IntroOfferType)}
                  className={`py-2.5 px-4 rounded-full text-[13px] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 ${index < 4 ? 'w-[calc(50%-4px)]' : 'w-auto'} ${
                    selectedOffer === pkg.id
                      ? 'bg-[#1a260e] text-[#fffcf2] shadow-lg'
                      : 'bg-[#1a260e]/[0.06] text-[#1a260e]/60'
                  }`}
                >
                  {getIcon(pkg.icon, 'h-3.5 w-3.5')}
                  <span className="truncate">{pkg.name.replace(' Pilates', '').replace('Red Light Hot', 'Red Light')}</span>
                </button>
              ))}
            </div>

            {fromAd && (
              <div className="mb-4 flex justify-center">
                <div className="bg-[#1a260e] text-[#fffcf2] text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  <span>Special offer selected</span>
                </div>
              </div>
            )}

            <a href={currentPackage.momenceUrl} target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-[#1a260e] text-[#fffcf2] rounded-2xl p-8 relative overflow-hidden shadow-[0_8px_40px_rgba(26,38,14,0.2)]">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10 text-center space-y-5">
                  <div className="w-14 h-14 bg-[#fffcf2]/[0.08] rounded-full flex items-center justify-center mx-auto">
                    {getIcon(currentPackage.icon, 'h-6 w-6 text-[#fffcf2]/80')}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-light tracking-wide">{currentPackage.name}</h3>
                    <p className="text-[13px] text-[#fffcf2]/40 mt-1 tracking-wider uppercase">{currentPackage.classes}</p>
                  </div>
                  <div>
                    <p className="font-serif text-4xl font-light">{currentPackage.price}</p>
                    <p className="font-sans text-xs text-[#fffcf2]/40 mt-2 tracking-wide">Valid for {currentPackage.validity}</p>
                  </div>
                  <p className="text-[13px] text-[#fffcf2]/60 leading-relaxed max-w-xs mx-auto">{currentPackage.description}</p>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 py-3.5 rounded-full text-sm font-medium tracking-wide">
                      Claim Offer
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop: Row of cards */}
          <div className="hidden md:grid grid-cols-5 gap-4">
            {introPackages.map((pkg) => (
              <a
                key={pkg.id}
                href={pkg.momenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#1a260e] text-[#fffcf2] rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(26,38,14,0.25)] hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-500 group-hover:scale-150" />
                <div className="text-center space-y-4 relative z-10">
                  <div className="w-12 h-12 bg-[#fffcf2]/[0.06] rounded-full flex items-center justify-center mx-auto group-hover:bg-[#fffcf2]/[0.1] transition-colors duration-300">
                    {getIcon(pkg.icon, 'h-5 w-5 text-[#fffcf2]/60')}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-light tracking-wide">{pkg.name}</h3>
                    <p className="text-[11px] text-[#fffcf2]/30 mt-1 uppercase tracking-wider">{pkg.classes}</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl font-light">{pkg.price}</p>
                    <p className="font-sans text-[11px] text-[#fffcf2]/30 mt-1.5 tracking-wide">Valid {pkg.validity}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[#fffcf2]/40 group-hover:text-[#fffcf2]/80 transition-all duration-300">
                    <span className="font-sans text-xs tracking-wider uppercase">Claim</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="text-center text-[11px] text-[#1a260e]/30 mt-6 tracking-wide">
            Intro offers are for first-time clients only
          </p>
        </div>
      </div>
    </section>
  );
}

// Package card component
function PackageCard({ pkg }: { pkg: { name: string; price: string; savings?: string; momenceUrl: string } }) {
  const isUnlimited = pkg.name === 'Unlimited';
  return (
    <a
      href={pkg.momenceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 ${
        isUnlimited
          ? 'bg-[#1a260e] text-[#fffcf2] shadow-[0_8px_40px_rgba(26,38,14,0.2)] hover:shadow-[0_20px_60px_rgba(26,38,14,0.3)]'
          : 'bg-white text-[#1a260e] border border-[#1a260e]/[0.06] shadow-[0_2px_16px_rgba(26,38,14,0.04)] hover:shadow-[0_12px_40px_rgba(26,38,14,0.1)] hover:border-[#1a260e]/[0.12]'
      }`}
    >
      {/* Decorative circle */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full transition-transform duration-500 group-hover:scale-150 ${
        isUnlimited ? 'bg-white/[0.04]' : 'bg-[#1a260e]/[0.02]'
      }`} />

      {isUnlimited && (
        <div className="absolute top-4 right-4">
          <Crown className="h-4 w-4 text-[#fffcf2]/30" />
        </div>
      )}

      <div className="relative z-10 p-6 md:p-8 text-center space-y-4">
        <div>
          <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide">{pkg.name}</h3>
        </div>

        <div>
          <p className={`font-serif text-3xl md:text-4xl font-light ${isUnlimited ? '' : ''}`}>{pkg.price}</p>
          {pkg.savings && (
            <p className={`font-sans text-xs mt-2 tracking-wide ${
              isUnlimited ? 'text-[#fffcf2]/40' : 'text-[#1a260e]/40'
            }`}>{pkg.savings}</p>
          )}
        </div>

        <div className={`flex items-center justify-center gap-1.5 pt-2 transition-all duration-300 ${
          isUnlimited
            ? 'text-[#fffcf2]/50 group-hover:text-[#fffcf2]/90'
            : 'text-[#1a260e]/40 group-hover:text-[#1a260e]/80'
        }`}>
          <span className="font-sans text-xs tracking-[0.15em] uppercase">Book Now</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </a>
  );
}

// Main packages section with tabs
function PackagesSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('reformer');
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

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
    // Small delay to let scroll settle, then update indicators
    setTimeout(updateScrollIndicators, 350);
  }, [activeCategory]);

  // Determine grid layout based on package count
  const getGridCols = (count: number) => {
    if (count <= 2) return 'grid-cols-1 md:grid-cols-2 max-w-2xl';
    if (count === 3) return 'grid-cols-1 md:grid-cols-3 max-w-4xl';
    return 'grid-cols-2 md:grid-cols-4 max-w-5xl';
  };

  return (
    <section className="py-16 md:py-24 bg-[#fffcf2]">
      <div className="container-width px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1a260e] tracking-wide mb-3">
              Class Packages
            </h2>
            <p className="font-sans text-sm md:text-base text-[#1a260e]/40 max-w-lg mx-auto">
              Commit to your practice and save. All packages valid for 30 days from your first class.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-10 md:mb-14">
            {/* Mobile: Horizontal scroll with edge fade indicators */}
            <div className="md:hidden relative">
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
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    data-active={activeCategory === cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex-shrink-0 py-2.5 px-5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                      activeCategory === cat.key
                        ? 'bg-[#1a260e] text-[#fffcf2] shadow-md'
                        : 'bg-[#1a260e]/[0.04] text-[#1a260e]/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Subtle scroll hint text - only on first render when right is scrollable */}
              {canScrollRight && !canScrollLeft && (
                <p className="text-center text-[10px] text-[#1a260e]/25 mt-2 tracking-wider uppercase animate-pulse">
                  swipe for more
                </p>
              )}
            </div>

            {/* Desktop: Centered pills */}
            <div className="hidden md:flex justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`py-3 px-6 rounded-full text-sm transition-all duration-300 ${
                    activeCategory === cat.key
                      ? 'bg-[#1a260e] text-[#fffcf2] shadow-lg'
                      : 'bg-transparent text-[#1a260e]/40 hover:text-[#1a260e]/70 hover:bg-[#1a260e]/[0.04]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active category content */}
          <div className="transition-all duration-300">
            {/* Category title + subtitle */}
            <div className="text-center mb-8 md:mb-10">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1a260e] tracking-wide mb-2">
                {activeData.title}
              </h3>
              <p className="font-sans text-sm text-[#1a260e]/40">
                {activeData.subtitle}
              </p>
              {'note' in activeData && (activeData as { note?: string }).note && (
                <p className="font-sans text-xs text-[#1a260e]/30 mt-1">
                  {(activeData as { note: string }).note}
                </p>
              )}
            </div>

            {/* Package cards grid */}
            <div className={`grid ${getGridCols(activePackages.length)} gap-4 md:gap-5 mx-auto`}>
              {activePackages.map((pkg, index) => (
                <PackageCard key={`${activeCategory}-${index}`} pkg={pkg} />
              ))}
            </div>

            {/* All Access upsell hint when not on All Access */}
            {activeCategory !== 'allAccess' && activeCategory !== 'private' && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setActiveCategory('allAccess')}
                  className="inline-flex items-center gap-2 text-[#1a260e]/30 hover:text-[#1a260e]/60 transition-colors duration-300 group"
                >
                  <span className="font-sans text-xs tracking-wider uppercase">Want access to everything?</span>
                  <span className="font-sans text-xs tracking-wider uppercase underline underline-offset-4 group-hover:no-underline">See All Access</span>
                  <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            )}
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

      <div className="pt-24 md:pt-32">
        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#f5f1e8] via-[#fffcf2] to-[#fffcf2] overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#1a260e]/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#1a260e]/[0.03] rounded-full blur-3xl" />

          <div className="container-width text-center relative z-10 px-5 md:px-8">
            <div className="max-w-3xl mx-auto space-y-5">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#1a260e] tracking-wider leading-[0.95]">
                YOUR PRACTICE,
                <br />
                <span className="italic font-light">your pace</span>
              </h1>
              <p className="font-sans text-sm md:text-base text-[#1a260e]/50 max-w-md mx-auto leading-relaxed">
                Choose the package that fits your lifestyle. Start anytime, move at your own rhythm.
              </p>
              <div className="w-12 h-[1px] bg-[#1a260e]/15 mx-auto" />
            </div>
          </div>
        </section>

        {/* Divider line */}
        <div className="bg-[#fffcf2]">
          <div className="container-width px-5 md:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#1a260e]/[0.06] to-transparent" />
          </div>
        </div>

        {/* Intro Offers */}
        <Suspense fallback={
          <section className="py-16 md:py-20 bg-[#fffcf2]">
            <div className="container-width px-5 md:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-[#1a260e]/[0.06] rounded-full w-48 mx-auto" />
                  <div className="h-4 bg-[#1a260e]/[0.04] rounded-full w-64 mx-auto" />
                </div>
              </div>
            </div>
          </section>
        }>
          <IntroOffersSection />
        </Suspense>

        {/* Divider */}
        <div className="bg-[#fffcf2]">
          <div className="container-width px-5 md:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#1a260e]/[0.06] to-transparent" />
          </div>
        </div>

        {/* Tabbed Packages */}
        <PackagesSection />

        {/* Bottom CTA */}
        <section className="relative py-16 md:py-20 bg-[#1a260e] text-[#fffcf2] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />
          </div>

          <div className="container-width text-center relative z-10 px-5 md:px-8">
            <div className="max-w-xl mx-auto space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide">
                Not sure where to start?
              </h2>
              <p className="font-sans text-sm text-[#fffcf2]/50 leading-relaxed">
                Reach out and we&apos;ll help you find the perfect fit for your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 py-3.5 rounded-full font-sans text-sm tracking-wider uppercase hover:shadow-xl transition-all duration-300"
                >
                  Book a Class
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-[#fffcf2]/20 text-[#fffcf2]/70 px-8 py-3.5 rounded-full font-sans text-sm tracking-wider uppercase hover:border-[#fffcf2]/40 hover:text-[#fffcf2] transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
