'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ExternalLink, Package, Sparkles, Flame, Zap, Heart } from 'lucide-react';


// Note: Metadata moved to layout or generateMetadata in a server component

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
      provider: {
        '@type': 'LocalBusiness',
        name: 'Euforyc Studios',
        address: '7 Holmstall Ave, Edgware HA8 5HX, London'
      },
      areaServed: 'London',
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '60',
        highPrice: '340',
        priceCurrency: 'GBP'
      }
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Hot Pilates Classes',
      description: 'Infrared-heated pilates classes for enhanced flexibility and detoxification',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Euforyc Studios',
        address: '7 Holmstall Ave, Edgware HA8 5HX, London'
      },
      areaServed: 'London',
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '50',
        highPrice: '300',
        priceCurrency: 'GBP'
      }
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Private Pilates Sessions',
      description: 'One-on-one personalized pilates training with expert instructors',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Euforyc Studios',
        address: '7 Holmstall Ave, Edgware HA8 5HX, London'
      },
      areaServed: 'London',
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '250',
        highPrice: '700',
        priceCurrency: 'GBP'
      }
    }
  ]
};

// Package types
interface ClassPackage {
  name: string;
  price: string;
  savings?: string;
  momenceUrl: string;
}

// Package data with specific Momence links
const packages = {
  intro: {
    title: 'Intro Offers',
    subtitle: 'New to Euforyc? Choose your perfect start',
    packages: [
      {
        id: 'reformer',
        name: 'Reformer Pilates',
        classes: '3 Classes',
        price: '£60',
        savings: 'First-time offer',
        description: 'Equipment-based pilates on our professional reformer machines',
        momenceUrl: 'https://momence.com/m/488100',
        icon: 'package',
        theme: 'dark'
      },
      {
        id: 'hot-pilates',
        name: 'Hot Pilates',
        classes: '3 Classes',
        price: '£50',
        savings: 'First-time offer',
        description: 'Dynamic mat-based pilates with infrared heat',
        momenceUrl: 'https://momence.com/m/507852',
        icon: 'flame',
        theme: 'hot'
      },
      {
        id: 'red-light',
        name: 'Red Light Hot Pilates',
        classes: '3 Classes',
        price: '£65',
        savings: 'First-time offer',
        description: 'Enhanced hot pilates with red light therapy benefits',
        momenceUrl: 'https://momence.com/m/624096',
        icon: 'zap',
        theme: 'red-light'
      },
      {
        id: 'barre',
        name: 'Barre',
        classes: '3 Classes',
        price: '£60',
        savings: 'First-time offer',
        description: 'Ballet-inspired workout for strength and flexibility',
        momenceUrl: 'https://momence.com/m/621480',
        icon: 'heart',
        theme: 'barre'
      },
      {
        id: 'try-all',
        name: 'Try All',
        classes: '3 Classes',
        price: '£70',
        savings: 'First-time offer',
        description: 'Experience all class types - Reformer, Hot Pilates, Barre, Dance & more',
        momenceUrl: 'https://momence.com/m/631782',
        icon: 'sparkles',
        theme: 'try-all'
      }
    ]
  },
  reformer: {
    title: 'Reformer Pilates (Group)',
    subtitle: 'Equipment-based group classes',
    packages: [
      {
        name: '4 Classes',
        price: '£100',
        savings: 'save £12',
        momenceUrl: 'https://momence.com/m/473322' // 4-Class Pack (Group Reformer)
      },
      {
        name: '8 Classes',
        price: '£190',
        savings: 'save £34',
        momenceUrl: 'https://momence.com/m/473323' // 8-Class Pack (Group Reformer)
      },
      {
        name: '12 Classes',
        price: '£270',
        savings: 'save £66',
        momenceUrl: 'https://momence.com/m/473324' // 12-Class Pack (Group Reformer)
      },
      {
        name: 'Unlimited',
        price: '£340',
        savings: 'save £100+',
        momenceUrl: 'https://momence.com/m/473325' // Unlimited Class Pack (Group Reformer)
      }
    ]
  },
  hotPilates: {
    title: 'Hot Pilates',
    subtitle: 'Dynamic heated mat classes',
    packages: [
      {
        name: '4 Classes',
        price: '£75',
        savings: 'save £13',
        momenceUrl: 'https://momence.com/m/473314' // 4 Hot Pilates Classes Per Month
      },
      {
        name: '8 Classes',
        price: '£140',
        savings: 'save £36',
        momenceUrl: 'https://momence.com/m/473315' // 8 Hot Pilates Classes Per Month
      },
      {
        name: '12 Classes',
        price: '£200',
        savings: 'save £64',
        momenceUrl: 'https://momence.com/m/473316' // 12 Hot Pilates Classes Per Month
      },
      {
        name: 'Unlimited',
        price: '£300',
        savings: 'save £60+',
        momenceUrl: 'https://momence.com/m/473319' // Unlimited Hot Pilates Classes Per Month
      }
    ]
  },
  private: {
    title: '1-1 Private Cadillac Reformer',
    subtitle: 'Personalized training on our Cadillac Reformer • Valid 90 days',
    packages: [
      {
        name: '4 Sessions',
        price: '£250',
        savings: 'save £50',
        momenceUrl: 'https://momence.com/m/473317' // 4-Session Pack Private Cadillac Reformer
      },
      {
        name: '8 Sessions',
        price: '£490',
        savings: 'save £110',
        momenceUrl: 'https://momence.com/m/473318' // 8-Session Pack Private Cadillac Reformer
      },
      {
        name: '12 Sessions',
        price: '£700',
        savings: 'save £200',
        momenceUrl: 'https://momence.com/m/473321' // 12-Session Pack Private Cadillac Reformer
      }
    ]
  },
  allAccess: {
    title: 'Euforyc All Access',
    subtitle: 'Access ALL class types - Reformer, Hot Pilates, Barre, Red Light & Dance',
    packages: [
      {
        name: '4 Classes',
        price: '£115',
        momenceUrl: 'https://momence.com/m/632399'
      },
      {
        name: '8 Classes',
        price: '£200',
        momenceUrl: 'https://momence.com/m/632400'
      },
      {
        name: '12 Classes',
        price: '£280',
        momenceUrl: 'https://momence.com/m/632401'
      }
    ]
  },
  dancePackage: {
    title: 'Dance Package',
    subtitle: 'Choose from Dabke, Belly Dance, Afro, or Bollywood - your choice!',
    packages: [
      {
        name: '4 Classes',
        price: '£50',
        savings: 'save £10',
        momenceUrl: 'https://momence.com/m/597174'
      },
      {
        name: '8 Classes',
        price: '£90',
        savings: 'save £30',
        momenceUrl: 'https://momence.com/m/609496'
      }
    ]
  }
};

// Intro offer type for selection
type IntroOfferType = 'reformer' | 'hot-pilates' | 'red-light' | 'barre' | 'try-all';

// Separate component for the intro offers section that uses useSearchParams
// This needs to be wrapped in Suspense for static generation
function IntroOffersSection() {
  const searchParams = useSearchParams();
  const [selectedOffer, setSelectedOffer] = useState<IntroOfferType>('reformer');
  const [fromAd, setFromAd] = useState(false);

  // Check URL params on mount to pre-select offer if coming from ad
  useEffect(() => {
    const offer = searchParams.get('offer') as IntroOfferType | null;
    if (offer && ['reformer', 'hot-pilates', 'red-light', 'barre', 'try-all'].includes(offer)) {
      setSelectedOffer(offer);
      setFromAd(true);
    }
  }, [searchParams]);

  const introPackages = packages.intro.packages;
  const currentPackage = introPackages.find(pkg => pkg.id === selectedOffer) || introPackages[0];

  // Get icon for offer
  const getIcon = (icon: string, className?: string) => {
    switch (icon) {
      case 'flame': return <Flame className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'heart': return <Heart className={className} />;
      case 'sparkles': return <Sparkles className={className} />;
      default: return <Package className={className} />;
    }
  };

  return (
    <section className="section-padding bg-[#fffcf2]">
      <div className="container-width">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-secondary mb-2">{packages.intro.title}</h2>
            <p className="tagline text-[#1a260e]/60">{packages.intro.subtitle}</p>
          </div>

          {/* Mobile: Tab Switcher + Single Card */}
          <div className="md:hidden">
            {/* Pill Selector - 2x2 + centered last */}
            <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-sm mx-auto">
              {introPackages.map((pkg, index) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedOffer(pkg.id as IntroOfferType)}
                  className={`py-3 px-4 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${index < 4 ? 'w-[calc(50%-4px)]' : 'w-auto'
                    } ${selectedOffer === pkg.id
                      ? 'bg-[#1a260e] text-[#fffcf2] shadow-lg'
                      : 'bg-[#1a260e]/10 text-[#1a260e]/70 hover:bg-[#1a260e]/20'
                    }`}
                >
                  {getIcon(pkg.icon, 'h-4 w-4')}
                  <span className="truncate">{pkg.name.replace(' Pilates', '').replace('Red Light Hot', 'Red Light')}</span>
                </button>
              ))}
            </div>

            {/* From Ad Badge */}
            {fromAd && (
              <div className="mb-4 flex justify-center">
                <div className="bg-[#1a260e] text-[#fffcf2] text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  <span>Special offer selected</span>
                </div>
              </div>
            )}

            {/* Single Card Display */}
            <a
              href={currentPackage.momenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-[#1a260e] text-[#fffcf2] rounded-lg p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 text-center space-y-5">
                  <div className="w-16 h-16 bg-[#fffcf2]/10 rounded-full flex items-center justify-center mx-auto">
                    {getIcon(currentPackage.icon, 'h-8 w-8 text-[#fffcf2]')}
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-light">{currentPackage.name}</h3>
                    <p className="text-sm text-[#fffcf2]/60 mt-1">{currentPackage.classes}</p>
                  </div>

                  <div>
                    <p className="font-serif text-4xl font-light">{currentPackage.price}</p>
                    <p className="font-sans text-sm text-green-400 font-medium mt-2">{currentPackage.savings}</p>
                  </div>

                  <p className="text-sm text-[#fffcf2]/80 leading-relaxed">
                    {currentPackage.description}. Valid for {currentPackage.id === 'reformer' || currentPackage.id === 'try-all' ? '20' : '30'} days from purchase.
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 py-4 rounded-full font-medium hover:shadow-xl transition-all duration-300">
                      Claim Offer
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </a>

            {/* Swipe hint */}
            <p className="text-center text-xs text-[#1a260e]/40 mt-4">
              Tap above to switch between offers
            </p>
          </div>

          {/* Desktop: 5-Column Row */}
          <div className="hidden md:grid grid-cols-5 gap-4 max-w-7xl mx-auto">
            {introPackages.map((pkg) => (
              <a
                key={pkg.id}
                href={pkg.momenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#1a260e] text-[#fffcf2] rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute -top-3 -right-3 bg-[#fffcf2] text-[#1a260e] p-2 rounded-full">
                  <Sparkles className="h-4 w-4" />
                </div>

                <div className="text-center space-y-4">
                  {getIcon(pkg.icon, 'h-10 w-10 text-[#fffcf2]/60 mx-auto')}
                  <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                  <div>
                    <p className="font-serif text-3xl font-light">{pkg.price}</p>
                    <p className="font-sans text-sm text-green-400 font-medium mt-1">{pkg.savings}</p>
                  </div>
                  <div className="flex items-center justify-center text-[#fffcf2] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-sans text-sm mr-2">Book Now</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Validity note - Desktop only */}
          <p className="hidden md:block text-center text-xs text-[#1a260e]/50 mt-8">
            Intro offers valid for 30 days from purchase except for (Reformer and try all only valid for 20 days). All intro offers are for first-time clients only.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Packages() {
  return (
    <>
      {/* Services Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <div className="pt-32">
        {/* Header */}
        <section className="section-padding py-24 bg-[#fffcf2]">
          <div className="container-width text-center">
            <h1 className="heading-primary mb-6">Choose Your Package</h1>
            <p className="body-text text-xl max-w-3xl mx-auto">
              Select the perfect package for your fitness journey. All packages are valid for 30 days, starting from the first session you attend except for the intro packages. You can begin your package at any time after purchase, giving you the freedom to start when it works best for you!
            </p>
          </div>
        </section>

        {/* Intro Package Section - Wrapped in Suspense for useSearchParams */}
        <Suspense fallback={
          <section className="section-padding bg-[#fffcf2]">
            <div className="container-width">
              <div className="max-w-3xl mx-auto text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-[#1a260e]/10 rounded w-48 mx-auto mb-4"></div>
                  <div className="h-4 bg-[#1a260e]/10 rounded w-64 mx-auto"></div>
                </div>
              </div>
            </div>
          </section>
        }>
          <IntroOffersSection />
        </Suspense>

        {/* Reformer Pilates Packages */}
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-secondary mb-2">{packages.reformer.title}</h2>
                <p className="tagline text-[#1a260e]/60">{packages.reformer.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.reformer.packages.map((pkg, index) => (
                  <a
                    key={index}
                    href={pkg.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-[#1a260e] text-[#fffcf2] rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {pkg.name === 'Unlimited' && (
                      <div className="absolute -top-3 -right-3 bg-[#fffcf2] text-[#1a260e] p-2 rounded-full">
                        <Sparkles className="h-4 w-4" />
                      </div>
                    )}

                    <div className="text-center space-y-4">
                      <Package className="h-10 w-10 text-[#fffcf2]/60 mx-auto" />
                      <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                      <div>
                        <p className="font-serif text-3xl font-light">{pkg.price}</p>
                        {pkg.savings && (
                          <p className="font-sans text-sm text-green-400 font-medium mt-1">{pkg.savings}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-center text-[#fffcf2] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-sans text-sm mr-2">Book Now</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hot Pilates Packages */}
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-secondary mb-2">{packages.hotPilates.title}</h2>
                <p className="tagline text-[#1a260e]/60">{packages.hotPilates.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.hotPilates.packages.map((pkg, index) => (
                  <a
                    key={index}
                    href={pkg.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-[#1a260e] text-[#fffcf2] rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {pkg.name === 'Unlimited' && (
                      <div className="absolute -top-3 -right-3 bg-[#fffcf2] text-[#1a260e] p-2 rounded-full">
                        <Sparkles className="h-4 w-4" />
                      </div>
                    )}

                    <div className="text-center space-y-4">
                      <Package className="h-10 w-10 text-[#fffcf2]/60 mx-auto" />
                      <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                      <div>
                        <p className="font-serif text-3xl font-light">{pkg.price}</p>
                        {pkg.savings && (
                          <p className="font-sans text-sm text-green-400 font-medium mt-1">{pkg.savings}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-center text-[#fffcf2] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-sans text-sm mr-2">Book Now</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Private Sessions Packages */}
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-secondary mb-2">{packages.private.title}</h2>
                <p className="tagline text-[#1a260e]/60">{packages.private.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.private.packages.map((pkg, index) => (
                  <a
                    key={index}
                    href={pkg.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-[#1a260e] text-[#fffcf2] rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-center space-y-4">
                      <Package className="h-10 w-10 text-[#fffcf2]/60 mx-auto" />
                      <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                      <div>
                        <p className="font-serif text-3xl font-light">{pkg.price}</p>
                        {pkg.savings && (
                          <p className="font-sans text-sm text-green-400 font-medium mt-1">{pkg.savings}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-center text-[#fffcf2] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-sans text-sm mr-2">Book Now</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Access Packages */}
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-secondary mb-2">{packages.allAccess.title}</h2>
                <p className="tagline text-[#1a260e]/60">{packages.allAccess.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.allAccess.packages.map((pkg, index) => (
                  <a
                    key={index}
                    href={pkg.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-[#1a260e] text-[#fffcf2] rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-center space-y-4">
                      <Sparkles className="h-10 w-10 text-[#fffcf2]/60 mx-auto" />
                      <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                      <div>
                        <p className="font-serif text-3xl font-light">{pkg.price}</p>
                        <p className="font-sans text-sm text-green-400 font-medium mt-1">Your all-in-one studio pass</p>
                      </div>
                      <div className="flex items-center justify-center text-[#fffcf2] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-sans text-sm mr-2">Book Now</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dance Package */}
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-secondary mb-2">{packages.dancePackage.title}</h2>
                <p className="tagline text-[#1a260e]/60">{packages.dancePackage.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packages.dancePackage.packages.map((pkg, index) => (
                  <a
                    key={index}
                    href={pkg.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-[#1a260e] text-[#fffcf2] rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-center space-y-4">
                      <Package className="h-10 w-10 text-[#fffcf2]/60 mx-auto" />
                      <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                      <div>
                        <p className="font-serif text-3xl font-light">{pkg.price}</p>
                        {pkg.savings && (
                          <p className="font-sans text-sm text-green-400 font-medium mt-1">{pkg.savings}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-center text-[#fffcf2] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-sans text-sm mr-2">Book Now</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="heading-secondary">Package Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-light">Flexibility</h3>
                  <p className="text-sm text-[#1a260e]/80">
                    Use your classes for any session type within the same category
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-light">30-Day Validity</h3>
                  <p className="text-sm text-[#1a260e]/80">
                    All packages are valid for 30 days from your first class
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-light">Best Value</h3>
                  <p className="text-sm text-[#1a260e]/80">
                    Save more with larger packages - up to £160 savings
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-sm text-[#1a260e]/70 mb-4">
                  Need help choosing the right package?
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-[#1a260e] text-[#fffcf2] px-6 py-3 font-serif hover:bg-[#1a260e]/90 transition-colors duration-200"
                >
                  CONTACT US
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 