'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Timer, Sparkles, Copy, Check, Zap, Heart, Flame, Music } from 'lucide-react';
import MomenceReviews from '@/components/MomenceReviews';

// Countdown hook for urgency timer
function useCountdown(targetTimestamp: number) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetTimestamp - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  return timeLeft;
}

// Calculate end of current month for offer deadline
function getEndOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

// All Access packages data
const allAccessPackages = [
  {
    id: '4-classes',
    name: '4 Classes',
    originalPrice: 140,
    discountedPrice: 84,
    perClass: '£21',
    validity: '30 days',
    description: 'Perfect for trying everything Euforyc offers',
    features: [
      'Access to ALL class types',
      'Reformer, Hot Pilates, Barre',
      'Red Light Therapy sessions',
      'All dance styles included'
    ],
    momenceUrl: 'https://momence.com/m/632399',
    highlight: false,
  },
  {
    id: '8-classes',
    name: '8 Classes',
    originalPrice: 280,
    discountedPrice: 168,
    perClass: '£21',
    validity: '30 days',
    description: 'Best value for regular explorers',
    features: [
      'Access to ALL class types',
      'Reformer, Hot Pilates, Barre',
      'Red Light Therapy sessions',
      'All dance styles included',
      'Priority booking access'
    ],
    momenceUrl: 'https://momence.com/m/632400',
    highlight: true,
  },
  {
    id: '12-classes',
    name: '12 Classes',
    originalPrice: 420,
    discountedPrice: 252,
    perClass: '£21',
    validity: '30 days',
    description: 'Maximum flexibility for dedicated practitioners',
    features: [
      'Access to ALL class types',
      'Reformer, Hot Pilates, Barre',
      'Red Light Therapy sessions',
      'All dance styles included',
      'Priority booking access',
      'Free grip socks included'
    ],
    momenceUrl: 'https://momence.com/m/632401',
    highlight: false,
  }
];

export default function AllAccessOfferPage() {
  const endOfMonthTimestamp = useMemo(() => getEndOfMonth().getTime(), []);
  const timeLeft = useCountdown(endOfMonthTimestamp);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('8-classes');

  const copyPromoCode = () => {
    navigator.clipboard.writeText('ALL40');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const selected = allAccessPackages.find(p => p.id === selectedPackage) || allAccessPackages[1];

  return (
    <div className="pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e] via-[#1a260e] to-[#2a3a1e]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        <div className="relative z-10 container-width text-center px-6 pt-32 md:pt-40 pb-16 md:pb-24">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-3 py-1.5 md:px-5 md:py-2 mb-4 md:mb-5">
            <Timer className="h-3.5 w-3.5 md:h-4 md:w-4 text-orange-400" />
            <span className="text-xs md:text-sm text-orange-300 tracking-wider font-medium">
              OFFER ENDS IN: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
            </span>
          </div>

          {/* 40% Off Badge */}
          <div className="inline-flex items-center gap-2 bg-[#fffcf2]/10 backdrop-blur-sm border border-[#fffcf2]/20 rounded-full px-3 py-1.5 md:px-5 md:py-2 mb-6 md:mb-8 ml-2">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#fffcf2]" />
            <span className="text-xs md:text-sm text-[#fffcf2] tracking-wider">40% OFF EUFORYC ALL ACCESS</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-[2.5rem] leading-[1.1] md:text-5xl lg:text-7xl text-[#fffcf2] tracking-wide mb-5 md:mb-6">
            Unlock<br />
            <span className="italic">Everything</span>
          </h1>

          <p className="text-[#fffcf2]/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 md:mb-8 font-light">
            Get access to every class at Euforyc — Reformer Pilates, Hot Pilates,
            Barre, Red Light Therapy, and all Dance styles — at 40% off.
          </p>

          {/* Promo Code Box */}
          <div className="max-w-md mx-auto mb-8 md:mb-10">
            <p className="text-[#fffcf2]/60 text-xs mb-3 tracking-wider">USE CODE AT CHECKOUT</p>
            <button
              onClick={copyPromoCode}
              className="group w-full flex items-center justify-center gap-4 bg-[#fffcf2]/10 backdrop-blur-sm border-2 border-dashed border-[#fffcf2]/30 rounded-xl px-8 py-4 transition-all duration-300 hover:border-[#fffcf2]/60 hover:bg-[#fffcf2]/20"
            >
              <span className="font-mono text-2xl md:text-3xl font-bold text-[#fffcf2] tracking-[0.2em]">ALL40</span>
              {copiedCode ? (
                <Check className="h-5 w-5 text-green-400" />
              ) : (
                <Copy className="h-5 w-5 text-[#fffcf2]/60 group-hover:text-[#fffcf2] transition-colors" />
              )}
            </button>
            <p className="text-[#fffcf2]/50 text-xs mt-2">
              {copiedCode ? 'Copied to clipboard!' : 'Click to copy'}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#packages"
              className="group inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              VIEW PACKAGES
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[#fffcf2]/10">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[#fffcf2]/60 text-xs md:text-sm">
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-400" />
                <span>All Class Types</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-400" />
                <span>No Commitment</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-400" />
                <span>Limited Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-10 md:mb-16">
            <p className="tagline text-[#1a260e]/60 mb-4">CHOOSE YOUR PACKAGE</p>
            <h2 className="heading-secondary">
              Euforyc All Access Packages
            </h2>
            <p className="body-text max-w-2xl mx-auto mt-4">
              Select the package that fits your lifestyle. All packages give you access to every class type at Euforyc.
            </p>
            {/* Scarcity indicator */}
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mt-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-700 font-medium">
                Limited time offer — ends this month
              </span>
            </div>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {allAccessPackages.map((pkg) => (
              <a
                key={pkg.id}
                href={pkg.momenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedPackage(pkg.id)}
                data-offer-id={`all-access-${pkg.id}`}
                data-content-name={`All Access ${pkg.name} £${pkg.discountedPrice}`}
                data-content-type="all_access_offer"
                data-content-category="/all-access-offer"
                data-value={String(pkg.discountedPrice)}
                data-currency="GBP"
                className={`group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-[#1a260e] to-[#2a3a1e] text-[#fffcf2]`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-4 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}

                <div className="space-y-5">
                  {/* Package Name */}
                  <div className="space-y-1">
                    <p className="text-xs tracking-widest text-[#fffcf2]/50">EUFORYC ALL ACCESS</p>
                    <h3 className="font-serif text-2xl md:text-3xl font-light">{pkg.name}</h3>
                  </div>

                  {/* Price Display */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg line-through text-[#fffcf2]/40">£{pkg.originalPrice}</span>
                      <span className="font-serif text-4xl md:text-5xl font-light">£{pkg.discountedPrice}</span>
                    </div>
                    <p className="text-green-400 text-sm font-medium">Save £{pkg.originalPrice - pkg.discountedPrice}</p>
                    <p className="text-xs text-[#fffcf2]/50">Valid for {pkg.validity}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 pt-4 border-t border-[#fffcf2]/10">
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400" />
                        <span className="text-[#fffcf2]/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-4">
                    <span className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3 text-[#fffcf2]">
                      Get Package
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Promo Code Reminder */}
          <div className="max-w-xl mx-auto mt-10 text-center">
            <div className="bg-white border border-[#1a260e]/10 rounded-xl p-5 md:p-6">
              <p className="text-[#1a260e]/60 text-sm mb-3">Apply promo code at checkout for 40% off</p>
              <button
                onClick={copyPromoCode}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-[#1a260e]/5 rounded-lg border border-[#1a260e]/10 hover:border-[#1a260e]/30 transition-all duration-300"
              >
                <span className="font-mono text-xl font-bold text-[#1a260e] tracking-[0.15em]">ALL40</span>
                {copiedCode ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-[#1a260e]/40 group-hover:text-[#1a260e] transition-colors" />
                )}
              </button>
              <p className="text-[#1a260e]/50 text-xs mt-2">
                {copiedCode ? 'Copied!' : 'Click to copy code'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-10 md:mb-12">
            <p className="tagline text-[#1a260e]/60 mb-4">FROM OUR COMMUNITY</p>
            <h2 className="heading-secondary">What Our Clients Say</h2>
          </div>
          <div className="min-h-[200px]">
            <MomenceReviews />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="heading-secondary">Common Questions</h2>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">Can I buy multiple packages while they&apos;re on discount?</h3>
                <p className="text-xs md:text-sm text-[#1a260e]/70">Yes! You can <strong>stack packages</strong> and purchase as many as you like while the 40% discount is available. The best part? Your package validity only starts from your <strong>first class booked</strong>, not the purchase date — so you can buy now and start whenever you&apos;re ready.</p>
              </div>

              <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">How do I apply the promo code?</h3>
                <p className="text-xs md:text-sm text-[#1a260e]/70">When you proceed to checkout on our booking system, you&apos;ll see a field to enter your promo code. Simply enter <strong>ALL40</strong> and the 40% discount will be applied automatically.</p>
              </div>

              <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">What classes can I attend?</h3>
                <p className="text-xs md:text-sm text-[#1a260e]/70">With an Euforyc All Access package, you can attend <strong>any class</strong> we offer — Reformer Pilates, Hot Pilates, Red Light Hot Pilates, Barre, and all Dance styles including Dabke, Belly Dance, Afro, and Bollywood.</p>
              </div>

              <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">How long is this offer available?</h3>
                <p className="text-xs md:text-sm text-[#1a260e]/70">This is a <strong>limited-time offer</strong> available until the end of the month. After that, prices will return to normal. We recommend purchasing now to lock in your 40% savings.</p>
              </div>

              <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">How long are the packages valid?</h3>
                <p className="text-xs md:text-sm text-[#1a260e]/70">The 4-class package is valid for 60 days, 8-class package for 90 days, and 12-class package for 120 days from the date of purchase.</p>
              </div>
            </div>

            <div className="text-center mt-8 md:mt-12">
              <p className="text-sm text-[#1a260e]/60 mb-4">Have more questions?</p>
              <Link href="/contact" className="btn-minimal">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center space-y-6">
            {/* Urgency reminder */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-400/20 rounded-full px-4 py-2">
              <Timer className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-orange-600 font-medium">
                Only {timeLeft.days} days left — Don&apos;t miss out!
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#1a260e] font-light">
              Ready to Unlock Everything?
            </h2>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 bg-[#1a260e] text-[#fffcf2] px-8 md:px-10 py-4 md:py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#1a260e]/90 hover:scale-[1.02]"
            >
              CLAIM YOUR 40% OFF
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Sticky CTA - Mobile only */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fffcf2] border-t border-[#1a260e]/10 md:hidden z-50">
        <a
          href={selected.momenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#1a260e] text-[#fffcf2] w-full py-4 text-sm tracking-[0.1em] uppercase rounded-lg active:scale-[0.98] transition-transform font-medium"
        >
          GET {selected.name.toUpperCase()} — £{selected.discountedPrice}
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="text-center text-[#1a260e]/50 text-xs mt-2">Use code ALL40 at checkout</p>
      </div>
    </div>
  );
}
