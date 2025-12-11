'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ExternalLink, Package, Sparkles, Flame } from 'lucide-react';

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
        highPrice: '300',
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
        lowPrice: '45',
        highPrice: '280',
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
        lowPrice: '235',
        highPrice: '620',
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
    title: 'Intro Package',
    subtitle: 'Perfect for first-time visitors',
    packages: [
      {
        name: '3 Classes for £60',
        price: '£60',
        savings: 'First-time offer',
        momenceUrl: 'https://momence.com/m/488100'
      },
      {
        name: '3 Hot Pilates Classes for £45',
        price: '£45',
        savings: 'First-time offer',
        momenceUrl: 'https://momence.com/m/507852'
      }
    ]
  },
  reformer: {
    title: 'Reformer Pilates (Group)',
    subtitle: 'Equipment-based group classes',
    packages: [
      {
        name: '4 Classes',
        price: '£90',
        savings: 'save £10',
        momenceUrl: 'https://momence.com/m/473322' // 4-Class Pack (Group Reformer)
      },
      {
        name: '8 Classes',
        price: '£170',
        savings: 'save £30',
        momenceUrl: 'https://momence.com/m/473323' // 8-Class Pack (Group Reformer)
      },
      {
        name: '12 Classes',
        price: '£240',
        savings: 'save £60',
        momenceUrl: 'https://momence.com/m/473324' // 12-Class Pack (Group Reformer)
      },
      {
        name: 'Unlimited',
        price: '£300',
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
        price: '£68',
        savings: 'save £4',
        momenceUrl: 'https://momence.com/m/473314' // 4 Hot Pilates Classes Per Month
      },
      {
        name: '8 Classes',
        price: '£128',
        savings: 'save £16',
        momenceUrl: 'https://momence.com/m/473315' // 8 Hot Pilates Classes Per Month
      },
      {
        name: '12 Classes',
        price: '£180',
        savings: 'save £36',
        momenceUrl: 'https://momence.com/m/473316' // 12 Hot Pilates Classes Per Month
      },
      {
        name: 'Unlimited',
        price: '£280',
        savings: 'save £8+',
        momenceUrl: 'https://momence.com/m/473319' // Unlimited Hot Pilates Classes Per Month
      }
    ]
  },
  private: {
    title: '1-1 Private Sessions',
    subtitle: 'Personalized individual training',
    packages: [
      {
        name: '4 Sessions',
        price: '£235',
        savings: 'save £25',
        momenceUrl: 'https://momence.com/m/473317' // 4-Session Pack Private Reformer
      },
      {
        name: '8 Sessions',
        price: '£440',
        savings: 'save £80',
        momenceUrl: 'https://momence.com/m/473318' // 8-Session Pack Private Reformer
      },
      {
        name: '12 Sessions',
        price: '£620',
        savings: 'save £160',
        momenceUrl: 'https://momence.com/m/473321' // 12-Session Pack Private Reformer
      }
    ]
  }
};

export default function Packages() {
  const searchParams = useSearchParams();
  const [selectedOffer, setSelectedOffer] = useState<'reformer' | 'hot-pilates'>('reformer');
  const [fromAd, setFromAd] = useState(false);

  // Check URL params on mount to pre-select Hot Pilates if coming from ad
  useEffect(() => {
    const offer = searchParams.get('offer');
    if (offer === 'hot-pilates') {
      setSelectedOffer('hot-pilates');
      setFromAd(true);
    }
  }, [searchParams]);

  // Get the intro packages based on selection
  const reformerIntro = packages.intro.packages[0]; // 3 Classes for £60
  const hotPilatesIntro = packages.intro.packages[1]; // 3 Hot Pilates for £45

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

        {/* Intro Package Section - Tab-Based for Mobile */}
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="heading-secondary mb-2">{packages.intro.title}</h2>
                <p className="tagline text-[#1a260e]/60">New to Euforyc? Book an intro class</p>
              </div>

              {/* Tab Switcher - Mobile Only */}
              <div className="md:hidden mb-6">
                <div className="flex bg-[#1a260e]/10 rounded-full p-1.5 max-w-sm mx-auto">
                  <button
                    onClick={() => setSelectedOffer('reformer')}
                    className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all duration-300 ${selectedOffer === 'reformer'
                      ? 'bg-[#1a260e] text-[#fffcf2] shadow-lg'
                      : 'text-[#1a260e]/70 hover:text-[#1a260e]'
                      }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Package className="h-4 w-4" />
                      Reformer
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedOffer('hot-pilates')}
                    className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all duration-300 ${selectedOffer === 'hot-pilates'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                      : 'text-[#1a260e]/70 hover:text-[#1a260e]'
                      }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Flame className="h-4 w-4" />
                      Hot Pilates
                    </span>
                  </button>
                </div>
              </div>

              {/* Mobile: Single Card View with Animation */}
              <div className="md:hidden">
                {/* From Ad Badge */}
                {fromAd && selectedOffer === 'hot-pilates' && (
                  <div className="mb-4 flex justify-center">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-pulse">
                      <Sparkles className="h-3 w-3" />
                      <span>Special offer from your ad!</span>
                    </div>
                  </div>
                )}

                {/* Reformer Intro Card - Show when selected */}
                {selectedOffer === 'reformer' && (
                  <a
                    href={reformerIntro.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-[#1a260e] text-[#fffcf2] rounded-2xl p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                      <div className="relative z-10 text-center space-y-5">
                        <div className="w-16 h-16 bg-[#fffcf2]/10 rounded-full flex items-center justify-center mx-auto">
                          <Package className="h-8 w-8 text-[#fffcf2]" />
                        </div>
                        <h3 className="font-serif text-2xl font-light">{reformerIntro.name}</h3>
                        <div>
                          <p className="font-serif text-4xl font-light">{reformerIntro.price}</p>
                          <p className="font-sans text-sm text-green-400 font-medium mt-2">{reformerIntro.savings}</p>
                        </div>
                        <p className="text-sm text-[#fffcf2]/80 leading-relaxed">
                          Only for first-time clients - try your first classes at a special introductory price, valid for 20 days from your purchase date
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
                )}

                {/* Hot Pilates Intro Card - Show when selected */}
                {selectedOffer === 'hot-pilates' && (
                  <a
                    href={hotPilatesIntro.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl shadow-orange-500/20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

                      <div className="relative z-10 text-center space-y-5">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                          <Flame className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-serif text-2xl font-light">{hotPilatesIntro.name}</h3>
                        <div>
                          <p className="font-serif text-4xl font-light">{hotPilatesIntro.price}</p>
                          <p className="font-sans text-sm text-white/90 font-medium mt-2 bg-white/20 inline-block px-3 py-1 rounded-full">{hotPilatesIntro.savings}</p>
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed">
                          Experience the heat - dynamic mat-based Pilates for enhanced flexibility & detoxification. Valid for 20 days.
                        </p>
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300">
                            <Flame className="h-4 w-4" />
                            Claim Hot Pilates Offer
                            <ExternalLink className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                )}

                {/* Discover Other Offer - Mobile */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setSelectedOffer(selectedOffer === 'reformer' ? 'hot-pilates' : 'reformer')}
                    className="text-sm text-[#1a260e]/60 hover:text-[#1a260e] transition-colors"
                  >
                    {selectedOffer === 'reformer' ? (
                      <span className="flex items-center justify-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        Or try our Hot Pilates intro →
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Package className="h-4 w-4" />
                        Or try our Reformer intro →
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Desktop: Side-by-Side Grid (original layout) */}
              <div className="hidden md:grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                {packages.intro.packages.map((pkg, index) => (
                  <a
                    key={index}
                    href={pkg.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-[#1a260e] text-[#fffcf2] rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="absolute -top-3 -right-3 bg-[#fffcf2] text-[#1a260e] p-2 rounded-full">
                      <Sparkles className="h-4 w-4" />
                    </div>

                    <div className="text-center space-y-4">
                      <Package className="h-10 w-10 text-[#fffcf2]/60 mx-auto" />
                      <h3 className="font-serif text-2xl font-light">{pkg.name}</h3>
                      <div>
                        <p className="font-serif text-3xl font-light">{pkg.price}</p>
                        {pkg.savings && (
                          <p className="font-sans text-sm text-green-400 font-medium mt-1">{pkg.savings}</p>
                        )}
                      </div>
                      <p className="text-sm text-[#fffcf2]/80">
                        Only for first-time clients - try your first classes at a special introductory price, valid for 20 days from your purchase date
                      </p>

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