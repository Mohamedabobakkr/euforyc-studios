'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, Package, Flame, Zap, Heart, CheckCircle2, Music, ArrowRight, Sparkles, Users, Clock, MapPin, Timer, Crown, Dumbbell } from 'lucide-react';

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

import MomenceReviews from '@/components/MomenceReviews';

// Calculate end of current month for offer deadline
function getEndOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

// Intro Offer data
const introOffers = {
  'reformer': {
    id: 'reformer',
    name: 'Reformer Pilates',
    shortName: 'Reformer',
    classes: '3 Classes',
    price: '£60',
    perClass: '£20',
    regularPrice: '£84',
    savings: 'Save £24',
    validity: '20 days',
    description: 'Equipment-based pilates on professional reformer machines',
    benefits: [
      'Professional reformer machines',
      'Max 8 people per class',
      '45-minute sessions',
      'All fitness levels welcome'
    ],
    momenceUrl: 'https://momence.com/m/488100',
    icon: Package,
    highlight: true,
  },
  'hot-pilates': {
    id: 'hot-pilates',
    name: 'Hot Pilates',
    shortName: 'Hot Pilates',
    classes: '3 Classes',
    price: '£50',
    perClass: '£16.67',
    regularPrice: '£66',
    savings: 'Save £16',
    validity: '20 days',
    description: 'Dynamic mat-based pilates in our infrared-heated studio',
    benefits: [
      'Infrared heated studio',
      'Max 7 people per class',
      'Deep stretch & detox',
      'Stress relief focused'
    ],
    momenceUrl: 'https://momence.com/m/507852',
    icon: Flame,
    highlight: true,
  },
  'red-light': {
    id: 'red-light',
    name: 'Red Light Hot Pilates',
    shortName: 'Red Light',
    classes: '3 Classes',
    price: '£65',
    perClass: '£21.67',
    regularPrice: '£90',
    savings: 'Save £25',
    validity: '20 days',
    description: 'Hot pilates enhanced with red light therapy benefits',
    benefits: [
      'Red light therapy included',
      'Anti-inflammatory benefits',
      'Collagen boosting',
      'Premium experience'
    ],
    momenceUrl: 'https://momence.com/m/624096',
    icon: Zap,
    highlight: false,
  },
  'barre': {
    id: 'barre',
    name: 'Barre',
    shortName: 'Barre',
    classes: '3 Classes',
    price: '£60',
    perClass: '£20',
    regularPrice: '£75',
    savings: 'Save £15',
    validity: '30 days',
    description: 'Ballet-inspired workout combining pilates, dance, and yoga',
    benefits: [
      'No dance experience needed',
      'Long, lean muscles',
      'Improved posture',
      'Low-impact, high-results'
    ],
    momenceUrl: 'https://momence.com/m/621480',
    icon: Heart,
    highlight: false,
  },
  'try-all': {
    id: 'try-all',
    name: 'Try All',
    shortName: 'Try All',
    classes: '3 Classes',
    price: '£70',
    perClass: '£23',
    regularPrice: '£90',
    savings: 'Save £20',
    validity: '20 days',
    description: 'Experience all our class types - Reformer, Hot Pilates, Barre, Dance & more',
    benefits: [
      'Try any class type',
      'Perfect for exploring',
      'Mix & match freely',
      'Find your favourite'
    ],
    momenceUrl: 'https://momence.com/m/631782',
    icon: Sparkles,
    highlight: true,
  },
  'cadillac': {
    id: 'cadillac',
    name: 'Cadillac 1-1',
    shortName: 'Cadillac 1-1',
    classes: '3 Classes',
    price: '£180',
    perClass: '£60',
    regularPrice: '£225',
    savings: 'Save £45',
    validity: '20 days',
    description: 'Private one-on-one sessions on our Cadillac Reformer for personalised training',
    benefits: [
      'Private 1-on-1 sessions',
      'Cadillac Reformer machine',
      'Fully personalised program',
      'Expert instructor guidance'
    ],
    momenceUrl: 'https://momence.com/m/708119',
    icon: Crown,
    highlight: false,
  },
  'ems-sculpt': {
    id: 'ems-sculpt',
    name: 'EMS Sculpt',
    shortName: 'EMS Sculpt',
    classes: '3 Classes',
    price: '£180',
    perClass: '£60',
    regularPrice: '£225',
    savings: 'Save £45',
    validity: '30 days',
    description: 'Electrical Muscle Stimulation training for accelerated sculpting and toning',
    benefits: [
      'EMS technology training',
      'Accelerated muscle activation',
      'Time-efficient sessions',
      'Targeted body sculpting'
    ],
    momenceUrl: 'https://momence.com/m/718403',
    icon: Dumbbell,
    highlight: false,
  }
};

// Dance packages data
const dancePackages = [
  {
    name: '4 Classes',
    price: '£50',
    savings: 'save £10',
    description: 'Perfect for trying out different styles',
    momenceUrl: 'https://momence.com/m/597174',
    highlight: false,
  },
  {
    name: '8 Classes',
    price: '£90',
    savings: 'save £30',
    description: 'Best value for dance enthusiasts',
    momenceUrl: 'https://momence.com/m/609496',
    highlight: true,
  }
];

const danceStyles = ['Dabke', 'Belly Dance', 'Afro', 'Bollywood'];

type OfferId = keyof typeof introOffers;
const offerIds: OfferId[] = ['reformer', 'hot-pilates', 'red-light', 'barre', 'try-all', 'cadillac', 'ems-sculpt'];

// Main content component
function OffersContent() {
  const searchParams = useSearchParams();
  const [selectedOffer, setSelectedOffer] = useState<OfferId>('reformer');
  const endOfMonthTimestamp = useMemo(() => getEndOfMonth().getTime(), []);
  const timeLeft = useCountdown(endOfMonthTimestamp);

  useEffect(() => {
    const offerParam = searchParams.get('offer') as OfferId | null;
    if (offerParam && introOffers[offerParam]) {
      setSelectedOffer(offerParam);
    }
  }, [searchParams]);

  const offer = introOffers[selectedOffer];

  return (
    <div className="pt-24 pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e] via-[#1a260e] to-[#2a3a1e]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        <div className="relative z-10 container-width text-center px-6">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-3 py-1.5 md:px-5 md:py-2 mb-4 md:mb-5">
            <Timer className="h-3.5 w-3.5 md:h-4 md:w-4 text-orange-400" />
            <span className="text-xs md:text-sm text-orange-300 tracking-wider font-medium">
              OFFER ENDS IN: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
            </span>
          </div>

          {/* First-time badge */}
          <div className="inline-flex items-center gap-2 bg-[#fffcf2]/10 backdrop-blur-sm border border-[#fffcf2]/20 rounded-full px-3 py-1.5 md:px-5 md:py-2 mb-6 md:mb-8 ml-2">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#fffcf2]" />
            <span className="text-xs md:text-sm text-[#fffcf2] tracking-wider">FIRST-TIME CLIENTS ONLY</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-[2.5rem] leading-[1.1] md:text-5xl lg:text-7xl text-[#fffcf2] tracking-wide mb-5 md:mb-6">
            Begin Your<br />
            <span className="italic">Transformation</span>
          </h1>

          <p className="text-[#fffcf2]/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 md:mb-8 font-light">
            New to Euforyc? Experience the power of Pilates with our exclusive intro offers.
            Your journey to a stronger, more balanced you starts here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#intro-offers"
              className="group inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              CLAIM YOUR FIRST 3 CLASSES
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/packages"
              className="text-[#fffcf2]/80 text-sm tracking-wider hover:text-[#fffcf2] transition-colors"
            >
              Returning client? View packages & perks →
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[#fffcf2]/10">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[#fffcf2]/60 text-xs md:text-sm">
              <div className="flex items-center gap-1.5 md:gap-2">
                <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Edgware, London</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Small Classes</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Flexible Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Offers Section */}
      <section id="intro-offers" className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-10 md:mb-16">
            <p className="tagline text-[#1a260e]/60 mb-4">CHOOSE YOUR PATH</p>
            <h2 className="heading-secondary">
              Intro Offers
            </h2>
            <p className="body-text max-w-2xl mx-auto mt-4">
              3 classes to discover the transformative power of Pilates. Perfect for beginners or those new to Euforyc.
            </p>
            {/* Scarcity indicator */}
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mt-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-700 font-medium">
                Limited spots available this week
              </span>
            </div>
          </div>

          {/* Offer Selector Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
            {offerIds.map((offerId) => {
              const offerData = introOffers[offerId];
              const isSelected = selectedOffer === offerId;
              const Icon = offerData.icon;
              return (
                <button
                  key={offerId}
                  onClick={() => setSelectedOffer(offerId)}
                  className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full font-sans text-xs md:text-sm tracking-wider transition-all duration-300 flex items-center gap-2 ${isSelected
                    ? 'bg-[#1a260e] text-[#fffcf2]'
                    : 'bg-transparent border border-[#1a260e]/20 text-[#1a260e]/70 hover:border-[#1a260e]/40 hover:text-[#1a260e]'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{offerData.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Offer Card */}
          <div className="max-w-2xl mx-auto">
            <a
              href={offer.momenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-offer-id={offer.id}
              data-content-name={`${offer.name} ${offer.classes} ${offer.price}`}
              data-content-type="intro_offer"
              data-content-category="/offers"
              data-value={offer.price.replace(/[^0-9.]/g, '')}
              data-currency="GBP"
              className="group block relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-[#1a260e] to-[#2a3a1e] text-[#fffcf2]"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Left side - Icon and Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#fffcf2]/10">
                    <offer.icon className="h-7 w-7 text-[#fffcf2]" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-xs tracking-widest mb-1 text-[#fffcf2]/50">
                        {offer.classes}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl font-light">{offer.name}</h3>
                    </div>
                    <p className="text-sm text-[#fffcf2]/80">
                      {offer.description}
                    </p>
                  </div>
                </div>

                {/* Right side - Price */}
                <div className="text-left md:text-right space-y-1">
                  <div className="flex items-baseline gap-2 md:justify-end">
                    <span className="font-serif text-4xl md:text-5xl font-light">{offer.price}</span>
                    <span className="line-through text-lg text-[#fffcf2]/40">
                      {offer.regularPrice}
                    </span>
                  </div>
                  <p className="text-green-400 text-sm font-medium">{offer.savings}</p>
                  <p className="text-xs text-[#fffcf2]/50">
                    Valid for {offer.validity}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <ul className="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-[#fffcf2]/10">
                {offer.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-400" />
                    <span className="text-[#fffcf2]/90">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-[#fffcf2]/10">
                <div className="w-full flex items-center justify-center gap-3 bg-white text-[#1a260e] py-5 px-8 rounded-xl font-semibold text-base tracking-wider uppercase transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                  <span>Claim Your Intro Offer</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-center text-xs text-[#fffcf2]/50 mt-3">
                  First-time clients only
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Dance Section */}
      <section id="dance" className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-10 md:mb-16">
            <p className="tagline text-[#1a260e]/60 mb-4">EXPRESS YOURSELF</p>
            <h2 className="heading-secondary">
              Dance Classes
            </h2>
            <p className="body-text max-w-2xl mx-auto mt-4">
              Discover the joy of movement through our diverse dance offerings.
              Mix and match any style — Dabke, Belly Dance, Afro, or Bollywood.
            </p>
          </div>

          {/* Dance Styles */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
            {danceStyles.map((style) => (
              <div
                key={style}
                className="px-6 py-3 border border-[#1a260e]/10 rounded-full bg-white"
              >
                <span className="font-serif text-base md:text-lg text-[#1a260e]">{style}</span>
              </div>
            ))}
          </div>

          {/* Dance Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
            {dancePackages.map((pkg, index) => (
              <a
                key={index}
                href={pkg.momenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-offer-id={`dance-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                data-content-name={`Dance ${pkg.name} ${pkg.price}`}
                data-content-type="dance_package"
                data-content-category="/offers/dance"
                data-value={pkg.price.replace(/[^0-9.]/g, '')}
                data-currency="GBP"
                className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-[#1a260e] to-[#2a3a1e] text-[#fffcf2]"
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-4 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#fffcf2]/10">
                    <Music className="h-6 w-6 md:h-7 md:w-7 text-[#fffcf2]" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-serif text-xl md:text-2xl font-light">{pkg.name}</h3>
                    <p className="text-sm text-[#fffcf2]/80">
                      {pkg.description}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-light">{pkg.price}</span>
                      <span className="text-green-400 text-sm font-medium">{pkg.savings}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#fffcf2]/10">
                  <span className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3 text-[#fffcf2]">
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Existing Members Section */}
      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#fffcf2]/10 rounded-full px-4 py-2">
              <Users className="h-4 w-4" />
              <span className="text-xs md:text-sm tracking-wider">RETURNING CLIENT?</span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
              We&apos;re Here For Your<br />
              <span className="italic">Fitness Journey</span>
            </h2>

            <p className="text-[#fffcf2]/80 text-sm md:text-lg max-w-xl mx-auto">
              These intro offers are exclusively for new clients — but we&apos;ve got you covered. Explore our class packages and memberships for even more value and perks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="inline-flex items-center justify-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 md:px-10 py-4 md:py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                VIEW PACKAGES
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/memberships"
                className="inline-flex items-center justify-center gap-2 border border-[#fffcf2]/30 text-[#fffcf2] px-8 md:px-10 py-4 md:py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#fffcf2]/10"
              >
                EXPLORE MEMBERSHIPS
              </Link>
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
          <MomenceReviews />
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
                <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">I&apos;ve never done pilates before</h3>
                <p className="text-xs md:text-sm text-[#1a260e]/70">Perfect! Our intro offers are designed for beginners. Our instructors will guide you through every movement with personalized attention.</p>
              </div>

              <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">What should I bring?</h3>
                <p className="text-xs md:text-sm text-[#1a260e]/70">Just yourself in comfortable workout clothes. We provide all equipment, mats, and towels. Grip socks are available to purchase at the studio.</p>
              </div>

              <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">How do I book my classes?</h3>
                <p className="text-xs md:text-sm text-[#1a260e]/70">After purchase, you&apos;ll receive access to our booking system where you can schedule your classes at times that suit you.</p>
              </div>

              <div className="border-b border-[#1a260e]/10 pb-4 md:pb-6">
                <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] mb-2 md:mb-3">Can I mix dance styles?</h3>
                <p className="text-xs md:text-sm text-[#1a260e]/70">Yes! Our dance packages let you choose any combination of Dabke, Belly Dance, Afro, or Bollywood classes. Mix and match as you like.</p>
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
              Ready to Begin Your Journey?
            </h2>
            <a
              href="#intro-offers"
              className="inline-flex items-center gap-2 bg-[#1a260e] text-[#fffcf2] px-8 md:px-10 py-4 md:py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#1a260e]/90 hover:scale-[1.02]"
            >
              CLAIM YOUR FIRST 3 CLASSES
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Sticky CTA - Mobile only */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fffcf2] border-t border-[#1a260e]/10 md:hidden z-50">
        <a
          href={offer.momenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-offer-id={offer.id}
          data-content-name={`${offer.name} ${offer.classes} ${offer.price}`}
          data-content-type="intro_offer"
          data-content-category="/offers/sticky-mobile"
          data-value={offer.price.replace(/[^0-9.]/g, '')}
          data-currency="GBP"
          className="flex items-center justify-center gap-2 bg-[#1a260e] text-[#fffcf2] w-full py-4 text-sm tracking-[0.1em] uppercase rounded-lg active:scale-[0.98] transition-transform font-medium"
        >
          CLAIM {offer.shortName.toUpperCase()} OFFER — {offer.price}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export default function OffersPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-24 bg-[#fffcf2] min-h-screen">
        <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#1a260e] via-[#1a260e] to-[#2a3a1e]">
          <div className="text-center animate-pulse px-6">
            <div className="h-6 bg-[#fffcf2]/10 rounded-full w-48 mx-auto mb-8"></div>
            <div className="h-16 bg-[#fffcf2]/10 rounded w-80 mx-auto mb-4"></div>
            <div className="h-6 bg-[#fffcf2]/10 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <OffersContent />
    </Suspense>
  );
}
