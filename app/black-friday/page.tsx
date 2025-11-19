import type { Metadata } from 'next';
import { Sparkles, Gift, Clock, Users, ExternalLink, Check } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';

export const metadata: Metadata = {
  title: 'Black Friday Offers - Euforyc Studios',
  description: 'Exclusive Black Friday pilates offers at Euforyc Studios London. Limited spots available until December 5th. Don\'t miss out on incredible savings on Reformer, Hot Pilates, and Private Sessions.',
};

export default function BlackFriday() {
  return (
    <div className="min-h-screen bg-[#fffcf2] relative">
      {/* Floating Scroll Indicator */}
      <ScrollIndicator />

      {/* Hero Section - Mobile Optimized */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-gradient-to-b from-[#f5f1e8] to-[#fffcf2]">
        <div className="container-width px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#1a260e]/10">
              <Sparkles className="h-4 w-4 text-[#2a3a21] flex-shrink-0" />
              <span className="tagline text-[#1a260e] text-xs sm:text-sm">November 19 - December 5</span>
            </div>

            <h1 className="heading-primary text-[#1a260e] px-2">
              Black Friday
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-light text-[#1a260e]/80 max-w-2xl mx-auto px-2">
              Transform your practice with our most generous offers of the year
            </p>

            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-4 flex-wrap px-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1a260e]/70">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Limited Time</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#1a260e]/30"></div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1a260e]/70">
                <Users className="h-4 w-4 flex-shrink-0" />
                <span>Limited Spots</span>
              </div>
            </div>

            <div className="pt-4 px-2">
              <div className="inline-flex items-start gap-2 bg-[#2a3a21]/5 px-4 sm:px-6 py-3 rounded-xl border border-[#2a3a21]/10 max-w-xl mx-auto text-left">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-[#2a3a21] flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#1a260e]/80">
                  All bonus credits, guest passes, and additional perks will be applied to your account after purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Offer - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 px-2">
              <h2 className="heading-secondary text-[#1a260e] mb-2 sm:mb-3">Founder Membership</h2>
              <p className="text-base sm:text-lg font-light text-[#1a260e]/80 max-w-2xl mx-auto">
                Get 50% off any membership you pick. Valid from November 19 - December 5th. Limited spots available.
              </p>
            </div>

            {/* Membership Card */}
            <div className="bg-[#2a3a21] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 sm:p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                  {/* Left: Details */}
                  <div className="text-white space-y-5 sm:space-y-6">
                    <div>
                      <div className="text-4xl sm:text-5xl md:text-6xl font-serif mb-2">50% OFF</div>
                      <p className="text-lg sm:text-xl text-white/90">Your first month of any membership</p>
                    </div>

                    <div className="space-y-2.5 sm:space-y-3 pt-2 sm:pt-4">
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Choose any membership tier</span>
                      </div>
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Minimum 6-month commitment</span>
                      </div>
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base">1 free Hot Pilates class included</span>
                      </div>
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base">1 guest pass to share the experience</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center text-white border border-white/20">
                      <p className="text-xs sm:text-sm uppercase tracking-wider mb-2 text-white/70">Limited Spots</p>
                      <p className="text-xl sm:text-2xl font-serif mb-1">Very Few Left</p>
                      <p className="text-xs sm:text-sm text-white/70">Nov 19 - Dec 5th only</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center text-white border border-white/10">
                      <p className="text-xs sm:text-sm text-white/70 mb-2">Use Code at Checkout:</p>
                      <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/30 inline-block">
                        <code className="text-lg sm:text-xl font-bold text-white tracking-wider">MEM50</code>
                      </div>
                    </div>

                    <a
                      href="https://euforyc.co.uk/memberships"
                      className="btn-primary bg-white text-[#2a3a21] hover:bg-white/90 w-full text-center flex items-center justify-center gap-2 min-h-[48px] text-sm sm:text-base"
                    >
                      CLAIM YOUR OFFER
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Offer - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 bg-[#f5f1e8]">
        <div className="container-width">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 px-2">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="tagline text-[#2a3a21]">Black Friday Special</span>
              </div>
              <h2 className="heading-secondary text-[#1a260e] mb-2 sm:mb-3">Intro Offer</h2>
              <p className="text-base sm:text-lg font-light text-[#1a260e]/70">Perfect way to start your pilates journey</p>
            </div>

            {/* Intro Offer Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-[#2a3a21]/10">
              <div className="p-6 sm:p-8 md:p-12 text-center">
                <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1a260e] mb-3 sm:mb-4">Black Friday Starter</h3>
                    <p className="text-lg sm:text-xl text-[#1a260e]/80 mb-2">
                      3 Reformer Classes for <span className="font-bold text-[#2a3a21]">£60</span>
                    </p>
                    <div className="flex items-center justify-center gap-2 text-[#2a3a21] font-medium text-sm sm:text-base">
                      <Gift className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>+ 1 Bonus Class (Reformer or Hot Pilates)</span>
                    </div>
                  </div>

                  <a
                    href="https://momence.com/m/578884"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 min-h-[48px] text-sm sm:text-base"
                  >
                    GRAB THIS DEAL
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Packages - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 px-2">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="tagline text-[#2a3a21]">New & Existing Clients Welcome</span>
              </div>
              <h2 className="heading-secondary text-[#1a260e] mb-2 sm:mb-3">Class Packages</h2>
              <p className="text-base sm:text-lg font-light text-[#1a260e]/70">Buy a class pack, get extra sessions free</p>
            </div>

            {/* Package Cards Grid - Fully Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Starter Pack */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-[#1a260e]/10 hover:shadow-xl transition-all duration-300">
                <div className="text-center space-y-6">
                  <div className="space-y-3">
                    <div className="inline-block bg-[#f5f1e8] px-4 py-1.5 rounded-full">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#2a3a21]">Starter Pack</span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-serif text-[#1a260e]">5 Classes</div>
                    <p className="text-sm text-[#1a260e]/60">Buy 4, Get 1 Free</p>
                    <p className="text-lg font-medium text-[#2a3a21] pt-2">Best for Beginners</p>
                  </div>

                  <div className="border-t border-[#1a260e]/10 pt-6 space-y-3 text-left">
                    <div className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2a3a21] mt-2 flex-shrink-0"></div>
                      <span className="text-[#1a260e]/80">4 Reformer Classes</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm font-medium text-[#2a3a21]">
                      <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>+1 Bonus Class Free</span>
                    </div>
                    <p className="text-xs text-[#1a260e]/60 pt-2">Choose Reformer or Hot Pilates</p>
                  </div>

                  <a
                    href="https://momence.com/m/578876"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 min-h-[52px] text-sm mt-2"
                  >
                    BUY NOW
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Value Pack - Featured */}
              <div className="bg-[#2a3a21] rounded-2xl sm:rounded-3xl p-8 border-2 border-[#2a3a21] hover:shadow-2xl transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-[#fffcf2] text-[#2a3a21] px-4 py-1 rounded-full shadow-md">
                    <span className="text-xs font-bold uppercase tracking-wider">Most Popular</span>
                  </div>
                </div>

                <div className="text-center space-y-6 text-white pt-2">
                  <div className="space-y-3">
                    <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                      <span className="text-xs font-medium uppercase tracking-wider">Value Pack</span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-serif">10 Classes</div>
                    <p className="text-sm text-white/70">Buy 8, Get 2 Free</p>
                    <p className="text-lg font-medium pt-2">Best Value</p>
                  </div>

                  <div className="border-t border-white/20 pt-6 space-y-3 text-left">
                    <div className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></div>
                      <span className="text-white/90">8 Reformer Classes</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm font-medium">
                      <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>+2 Bonus Classes Free</span>
                    </div>
                    <p className="text-xs text-white/60 pt-2">Choose Reformer or Hot Pilates or mix both</p>
                  </div>

                  <a
                    href="https://momence.com/m/578877"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary bg-white text-[#2a3a21] hover:bg-white/90 w-full text-center inline-flex items-center justify-center gap-2 min-h-[52px] text-sm mt-2"
                  >
                    BUY NOW
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Committed Pack */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-[#1a260e]/10 hover:shadow-xl transition-all duration-300">
                <div className="text-center space-y-6">
                  <div className="space-y-3">
                    <div className="inline-block bg-[#f5f1e8] px-4 py-1.5 rounded-full">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#2a3a21]">Committed Pack</span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-serif text-[#1a260e]">15 Classes</div>
                    <p className="text-sm text-[#1a260e]/60">Buy 12, Get 3 Free</p>
                    <p className="text-lg font-medium text-[#2a3a21] pt-2">Maximum Savings</p>
                  </div>

                  <div className="border-t border-[#1a260e]/10 pt-6 space-y-3 text-left">
                    <div className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2a3a21] mt-2 flex-shrink-0"></div>
                      <span className="text-[#1a260e]/80">12 Reformer Classes</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm font-medium text-[#2a3a21]">
                      <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>+3 Bonus Classes Free</span>
                    </div>
                    <p className="text-xs text-[#1a260e]/60 pt-2">Choose Reformer or Hot Pilates or mix both</p>
                  </div>

                  <a
                    href="https://momence.com/m/578879"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 min-h-[52px] text-sm mt-2"
                  >
                    BUY NOW
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Pilates Packages - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 bg-[#f5f1e8]">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 px-2">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="tagline text-[#2a3a21]">New & Existing Clients Welcome</span>
              </div>
              <h2 className="heading-secondary text-[#1a260e] mb-2 sm:mb-3">Hot Pilates Packages</h2>
              <p className="text-base sm:text-lg font-light text-[#1a260e]/70">Buy a Hot Pilates pack, get extra sessions free</p>
            </div>

            {/* Package Cards Grid - Fully Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Starter Pack */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-[#1a260e]/10 hover:shadow-xl transition-all duration-300">
                <div className="text-center space-y-6">
                  <div className="space-y-3">
                    <div className="inline-block bg-[#f5f1e8] px-4 py-1.5 rounded-full">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#2a3a21]">Starter Pack</span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-serif text-[#1a260e]">5 Classes</div>
                    <p className="text-sm text-[#1a260e]/60">Buy 4, Get 1 Free</p>
                    <p className="text-lg font-medium text-[#2a3a21] pt-2">Best for Beginners</p>
                  </div>

                  <div className="border-t border-[#1a260e]/10 pt-6 space-y-3 text-left">
                    <div className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2a3a21] mt-2 flex-shrink-0"></div>
                      <span className="text-[#1a260e]/80">4 Hot Pilates Classes</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm font-medium text-[#2a3a21]">
                      <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>+1 Bonus Class Free</span>
                    </div>
                    <p className="text-xs text-[#1a260e]/60 pt-2">Choose Reformer or Hot Pilates</p>
                  </div>

                  <a
                    href="https://momence.com/m/578866"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 min-h-[52px] text-sm mt-2"
                  >
                    BUY NOW
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Value Pack - Featured */}
              <div className="bg-[#2a3a21] rounded-2xl sm:rounded-3xl p-8 border-2 border-[#2a3a21] hover:shadow-2xl transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-[#fffcf2] text-[#2a3a21] px-4 py-1 rounded-full shadow-md">
                    <span className="text-xs font-bold uppercase tracking-wider">Most Popular</span>
                  </div>
                </div>

                <div className="text-center space-y-6 text-white pt-2">
                  <div className="space-y-3">
                    <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                      <span className="text-xs font-medium uppercase tracking-wider">Value Pack</span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-serif">10 Classes</div>
                    <p className="text-sm text-white/70">Buy 8, Get 2 Free</p>
                    <p className="text-lg font-medium pt-2">Best Value</p>
                  </div>

                  <div className="border-t border-white/20 pt-6 space-y-3 text-left">
                    <div className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></div>
                      <span className="text-white/90">8 Hot Pilates Classes</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm font-medium">
                      <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>+2 Bonus Classes Free</span>
                    </div>
                    <p className="text-xs text-white/60 pt-2">Choose Reformer or Hot Pilates or mix both</p>
                  </div>

                  <a
                    href="https://momence.com/m/578867"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary bg-white text-[#2a3a21] hover:bg-white/90 w-full text-center inline-flex items-center justify-center gap-2 min-h-[52px] text-sm mt-2"
                  >
                    BUY NOW
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Committed Pack */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-8 border border-[#1a260e]/10 hover:shadow-xl transition-all duration-300">
                <div className="text-center space-y-6">
                  <div className="space-y-3">
                    <div className="inline-block bg-[#f5f1e8] px-4 py-1.5 rounded-full">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#2a3a21]">Committed Pack</span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-serif text-[#1a260e]">15 Classes</div>
                    <p className="text-sm text-[#1a260e]/60">Buy 12, Get 3 Free</p>
                    <p className="text-lg font-medium text-[#2a3a21] pt-2">Maximum Savings</p>
                  </div>

                  <div className="border-t border-[#1a260e]/10 pt-6 space-y-3 text-left">
                    <div className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2a3a21] mt-2 flex-shrink-0"></div>
                      <span className="text-[#1a260e]/80">12 Hot Pilates Classes</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm font-medium text-[#2a3a21]">
                      <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>+3 Bonus Classes Free</span>
                    </div>
                    <p className="text-xs text-[#1a260e]/60 pt-2">Choose Reformer or Hot Pilates or mix both</p>
                  </div>

                  <a
                    href="https://momence.com/m/578868"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 min-h-[52px] text-sm mt-2"
                  >
                    BUY NOW
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlimited Package - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 px-2">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="tagline text-[#2a3a21]">Ultimate Access</span>
              </div>
              <h2 className="heading-secondary text-[#1a260e] mb-2 sm:mb-3">Reformer Unlimited</h2>
              <p className="text-base sm:text-lg font-light text-[#1a260e]/70">One month of unlimited Reformer classes</p>
            </div>

            {/* Unlimited Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-[#2a3a21]/20">
              <div className="bg-gradient-to-br from-[#2a3a21] to-[#1a260e] p-6 sm:p-8 text-center text-white">
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif mb-2">£300</div>
                <p className="text-sm sm:text-base text-white/90">30 Days of Unlimited Classes</p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-[#f5f1e8] p-2 sm:p-2.5 rounded-full flex-shrink-0">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-[#2a3a21]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1a260e] mb-1 text-sm sm:text-base">Unlimited Reformer Access</h4>
                      <p className="text-xs sm:text-sm text-[#1a260e]/70">Take as many Reformer classes as you want for 30 days</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-[#f5f1e8] p-2 sm:p-2.5 rounded-full flex-shrink-0">
                      <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-[#2a3a21]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1a260e] mb-1 text-sm sm:text-base">2 Guest Passes for Reformer</h4>
                      <p className="text-xs sm:text-sm text-[#1a260e]/70">Bring friends to experience Euforyc</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-[#f5f1e8] p-2 sm:p-2.5 rounded-full flex-shrink-0">
                      <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-[#2a3a21]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1a260e] mb-1 text-sm sm:text-base">1 Free Hot Pilates Class</h4>
                      <p className="text-xs sm:text-sm text-[#1a260e]/70">Try our signature Hot Pilates experience</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://momence.com/m/473325"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 min-h-[48px] text-sm sm:text-base"
                >
                  GET UNLIMITED ACCESS
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Sessions - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 bg-[#1a260e] text-white">
        <div className="container-width">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 px-2">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="tagline text-white/70">One-on-One Training</span>
              </div>
              <h2 className="heading-secondary text-white mb-2 sm:mb-3">Private Progress Packs</h2>
              <p className="text-base sm:text-lg font-light text-white/80 max-w-2xl mx-auto">
                Master your technique in private sessions, then confidently apply what you've learned in group classes
              </p>
              <p className="text-xs sm:text-sm text-white/60 mt-2 sm:mt-3">Mix and match Reformer or Hot Pilates for your bonus classes</p>
            </div>

            {/* Private Packs Grid - Fully Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Foundation Pack */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-center space-y-6">
                  <div className="space-y-3">
                    <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                      <span className="text-xs font-medium uppercase tracking-wider text-white/90">Foundation</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-serif">4 Private Sessions</div>
                    <div className="text-3xl sm:text-4xl font-bold pt-2">£235</div>
                  </div>

                  <div className="border-t border-white/20 pt-6 space-y-3 text-left">
                    <div className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></div>
                      <span className="text-white/90">4 One-on-one private sessions</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm font-medium">
                      <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>+1 Free group class</span>
                    </div>
                  </div>

                  <a
                    href="https://momence.com/m/578871"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary bg-white text-[#1a260e] hover:bg-white/90 w-full text-center inline-flex items-center justify-center gap-2 min-h-[52px] text-sm mt-2"
                  >
                    BOOK NOW
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Development Pack - Featured */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-8 text-[#1a260e] hover:shadow-2xl transition-all duration-300 relative border-2 border-white">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-[#2a3a21] text-white px-4 py-1 rounded-full shadow-md">
                    <span className="text-xs font-bold uppercase tracking-wider">Best Value</span>
                  </div>
                </div>

                <div className="text-center space-y-6 pt-2">
                  <div className="space-y-3">
                    <div className="inline-block bg-[#f5f1e8] px-4 py-1.5 rounded-full">
                      <span className="text-xs font-medium uppercase tracking-wider text-[#2a3a21]">Development</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-serif">8 Private Sessions</div>
                    <div className="text-3xl sm:text-4xl font-bold text-[#2a3a21] pt-2">£440</div>
                  </div>

                  <div className="border-t border-[#1a260e]/10 pt-6 space-y-3 text-left">
                    <div className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2a3a21] mt-2 flex-shrink-0"></div>
                      <span className="text-[#1a260e]/80">8 One-on-one private sessions</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm font-medium text-[#2a3a21]">
                      <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>+3 Free group classes</span>
                    </div>
                  </div>

                  <a
                    href="https://momence.com/m/578873"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 min-h-[52px] text-sm mt-2"
                  >
                    BOOK NOW
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Mastery Pack */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-center space-y-6">
                  <div className="space-y-3">
                    <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                      <span className="text-xs font-medium uppercase tracking-wider text-white/90">Mastery</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-serif">12 Private Sessions</div>
                    <div className="text-3xl sm:text-4xl font-bold pt-2">£620</div>
                  </div>

                  <div className="border-t border-white/20 pt-6 space-y-3 text-left">
                    <div className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></div>
                      <span className="text-white/90">12 One-on-one private sessions</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm font-medium">
                      <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>+5 Free group classes</span>
                    </div>
                  </div>

                  <a
                    href="https://momence.com/m/578874"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary bg-white text-[#1a260e] hover:bg-white/90 w-full text-center inline-flex items-center justify-center gap-2 min-h-[52px] text-sm mt-2"
                  >
                    BOOK NOW
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Card Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 bg-gradient-to-b from-[#fffcf2] to-[#f5f1e8] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2a3a21] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2a3a21] rounded-full blur-3xl"></div>
        </div>

        <div className="container-width relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-gradient-to-br from-[#2a3a21] via-[#1a260e] to-[#2a3a21] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <div className="relative p-6 sm:p-10 md:p-16">
                  {/* Decorative Pattern Overlay */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center space-y-6 sm:space-y-8">
                    {/* Icon with Glow Effect */}
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>
                      <div className="relative bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-full border border-white/20">
                        <Gift className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-white" />
                      </div>
                    </div>

                    {/* Heading */}
                    <div className="space-y-3 sm:space-y-4">
                      <h2 className="heading-secondary text-white px-2">Want to Gift a Loved One?</h2>
                      <p className="text-base sm:text-lg md:text-xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed px-2">
                        Share the gift of wellness this Black Friday! Get 10% off any gift card amount you choose.
                      </p>
                    </div>

                    {/* Discount Badge - Mobile Optimized */}
                    <div className="flex items-center justify-center py-4 sm:py-6">
                      <div className="group relative w-full max-w-sm sm:max-w-none">
                        <div className="absolute inset-0 bg-white/10 blur-xl group-hover:blur-2xl transition-all"></div>
                        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:bg-white/15 transition-all duration-300">
                          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            <div className="text-center sm:text-left">
                              <p className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-1">10%</p>
                              <p className="text-xs sm:text-sm uppercase tracking-wider text-white/70">Discount</p>
                            </div>
                            <div className="hidden sm:block h-16 w-px bg-white/20"></div>
                            <div className="sm:hidden h-px w-16 bg-white/20"></div>
                            <div className="text-center sm:text-left">
                              <p className="text-base sm:text-lg font-medium text-white">All Gift Cards</p>
                              <p className="text-xs sm:text-sm text-white/70">Any amount</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Discount Code */}
                    <div className="pt-2 sm:pt-4">
                      <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm px-5 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl border border-white/20">
                        <span className="text-xs sm:text-sm text-white/70 uppercase tracking-wider">Use Code:</span>
                        <div className="bg-white/10 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg border border-white/30">
                          <code className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wider">GIFT10</code>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 sm:pt-6">
                      <a
                        href="/gift-cards"
                        className="group relative inline-flex items-center gap-2 sm:gap-3 bg-white text-[#2a3a21] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-sans text-xs sm:text-sm uppercase tracking-[0.15em] font-medium hover:bg-white/95 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl min-h-[48px]"
                      >
                        <span>Shop Gift Cards</span>
                        <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-4 sm:pt-6 px-2">
                      <div className="inline-flex items-start sm:items-center gap-2 bg-white/5 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-full border border-white/10 max-w-md">
                        <Sparkles className="h-4 w-4 text-white/70 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <p className="text-xs sm:text-sm text-white/80 text-left sm:text-center">Perfect for friends, family, or anyone who loves wellness</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl hidden lg:block"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-xl hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 bg-gradient-to-br from-[#f5f1e8] via-[#fffcf2] to-[#f5f1e8]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4 px-2">
              <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-[#2a3a21]" />
              <h2 className="heading-secondary text-[#1a260e]">Don't Miss Out</h2>
              <p className="text-base sm:text-lg md:text-xl font-light text-[#1a260e]/80 max-w-2xl mx-auto">
                These exclusive Black Friday offers end on December 5th and spots are limited. Start or deepen your pilates practice with our most generous offers of the year.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto pt-2 sm:pt-4">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#1a260e]/10">
                <Clock className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-[#2a3a21]" />
                <h3 className="font-medium text-[#1a260e] mb-1 text-sm sm:text-base">Limited Time</h3>
                <p className="text-xs sm:text-sm text-[#1a260e]/70">All offers expire December 5th, 2024</p>
              </div>

              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#1a260e]/10">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-[#2a3a21]" />
                <h3 className="font-medium text-[#1a260e] mb-1 text-sm sm:text-base">Limited Spots</h3>
                <p className="text-xs sm:text-sm text-[#1a260e]/70">Very few memberships and packages available</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-2 sm:pt-4">
              <a
                href="https://euforyc.co.uk/packages"
                className="btn-primary inline-flex items-center justify-center gap-2 min-h-[48px] text-sm"
              >
                VIEW ALL PACKAGES
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="https://euforyc.co.uk/memberships"
                className="btn-secondary inline-flex items-center justify-center gap-2 min-h-[48px] text-sm"
              >
                VIEW MEMBERSHIPS
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
