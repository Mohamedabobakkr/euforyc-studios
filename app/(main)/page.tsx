import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import CircularText from '@/components/CircularText';
import MomenceReviews from '@/components/MomenceReviews';
import HeroSlideshow from '@/components/HeroSlideshow';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'EUFORYC STUDIOS | Women\'s Pilates Studio London | Reformer & Hot Pilates Edgware',
  description: 'London\'s premier women-only pilates studio in Edgware. Reformer pilates, hot infrared pilates, red light therapy, barre, dance & private 1:1 sessions. Small intimate classes. Intro offers from £45. Book now.',
  alternates: { canonical: 'https://euforyc.co.uk' },
};

export default function Home() {
  return (
    <div>
      {/* Hero Section - Full Screen with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Slideshow */}
        <HeroSlideshow />
        
        {/* Content */}
        <div className="container-width text-center z-10 relative">
          <div className="space-y-8 animate-fade-up">
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#fffcf2] tracking-wider leading-[0.85]">
              EUFORYC STUDIOS
            </h1>
            <p className="tagline text-[#fffcf2]/90 text-sm md:text-base">
              PILATES • WELLNESS • STRENGTH
            </p>
            <div className="pt-8">
              <Link 
                href="/book" 
                className="inline-block bg-[#fffcf2] text-[#1a260e] px-12 py-4 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#fffcf2]/90 hover:scale-[1.02]"
              >
                BOOK CLASS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <h2 className="heading-tertiary">
                <span className="block">everything is</span>
                <span className="block text-5xl md:text-6xl not-italic">euforyc</span>
              </h2>
              <div className="space-y-4">
                <p className="body-text">
                  Transformation is built with time, breath by breath. True strength is not rushed, 
                  and real change does not happen overnight.
                </p>
                <p className="body-text">
                  Every small movement, every mindful breath, layers into lasting growth. 
                  Pilates teaches you to trust the process, to honor the pace of your own body, 
                  and to find beauty in slow, steady progress.
                </p>
              </div>
              <Link href="/about" className="btn-minimal inline-block">
                LEARN MORE
              </Link>
            </div>
            <div className="relative h-[500px] bg-[#fffcf2]">
              <Image
                src="/euforyc.jpg"
                alt="Euforyc Studios pilates studio London Edgware boutique fitness"
                fill
                className="object-contain"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Editorial Grid */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="heading-secondary mb-4">Our Classes</h2>
            <p className="tagline">REFORMER • HOT PILATES • REDLIGHT • BARRE • DANCE</p>
          </div>

          {/* Horizontal scroll on mobile, 5-col grid on desktop */}
          <div className="flex md:grid md:grid-cols-5 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 -mx-8 px-8 md:mx-0 md:px-0 scrollbar-hide">

            {/* Reformer Pilates */}
            <Link href="/packages" className="group block min-w-[70vw] md:min-w-0 snap-center">
              <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                  src="/reformerp.jpg"
                  alt="Reformer pilates classes London Euforyc Studios"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-[#1a260e]/0 transition-all duration-500 group-hover:bg-[#1a260e]/10"></div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="w-8 h-[1px] bg-[#1a260e]/20 group-hover:w-12 transition-all duration-500"></div>
                <h3 className="font-serif text-lg md:text-xl font-light tracking-wide text-[#1a260e]">
                  Reformer Pilates
                </h3>
                <p className="font-sans text-xs text-[#1a260e]/50 font-light leading-relaxed">
                  Dynamic, equipment-based sessions that sculpt strength and flexibility.
                </p>
              </div>
            </Link>

            {/* Hot Infrared Mat Pilates */}
            <Link href="/packages" className="group block min-w-[70vw] md:min-w-0 snap-center">
              <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                  src="/hotpilates-new.jpg"
                  alt="Hot infrared heated mat pilates London Euforyc Studios"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-[#1a260e]/0 transition-all duration-500 group-hover:bg-[#1a260e]/10"></div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="w-8 h-[1px] bg-[#1a260e]/20 group-hover:w-12 transition-all duration-500"></div>
                <h3 className="font-serif text-lg md:text-xl font-light tracking-wide text-[#1a260e]">
                  Hot Mat Pilates
                </h3>
                <p className="font-sans text-xs text-[#1a260e]/50 font-light leading-relaxed">
                  Infrared-heated sessions that energize muscles and maximize burn.
                </p>
              </div>
            </Link>

            {/* Redlight Mat Pilates */}
            <Link href="/packages" className="group block min-w-[70vw] md:min-w-0 snap-center">
              <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                  src="/redlight-new.jpg"
                  alt="Redlight mat pilates London Euforyc Studios"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-[#1a260e]/0 transition-all duration-500 group-hover:bg-[#1a260e]/10"></div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="w-8 h-[1px] bg-[#1a260e]/20 group-hover:w-12 transition-all duration-500"></div>
                <h3 className="font-serif text-lg md:text-xl font-light tracking-wide text-[#1a260e]">
                  Redlight Pilates
                </h3>
                <p className="font-sans text-xs text-[#1a260e]/50 font-light leading-relaxed">
                  Red light therapy meets mindful mat pilates for total rejuvenation.
                </p>
              </div>
            </Link>

            {/* Barre */}
            <Link href="/packages" className="group block min-w-[70vw] md:min-w-0 snap-center">
              <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                  src="/hero/IMG_8698.JPG"
                  alt="Barre classes London Euforyc Studios"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-[#1a260e]/0 transition-all duration-500 group-hover:bg-[#1a260e]/10"></div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="w-8 h-[1px] bg-[#1a260e]/20 group-hover:w-12 transition-all duration-500"></div>
                <h3 className="font-serif text-lg md:text-xl font-light tracking-wide text-[#1a260e]">
                  Barre
                </h3>
                <p className="font-sans text-xs text-[#1a260e]/50 font-light leading-relaxed">
                  Ballet-inspired movements that lengthen, tone, and define.
                </p>
              </div>
            </Link>

            {/* Dance */}
            <Link href="/packages" className="group block min-w-[70vw] md:min-w-0 snap-center">
              <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                  src="/dance-new.jpg"
                  alt="Dance classes London Euforyc Studios"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-[#1a260e]/0 transition-all duration-500 group-hover:bg-[#1a260e]/10"></div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="w-8 h-[1px] bg-[#1a260e]/20 group-hover:w-12 transition-all duration-500"></div>
                <h3 className="font-serif text-lg md:text-xl font-light tracking-wide text-[#1a260e]">
                  Dance
                </h3>
                <p className="font-sans text-xs text-[#1a260e]/50 font-light leading-relaxed">
                  Express yourself through rhythm and movement.
                </p>
              </div>
            </Link>

          </div>

          <div className="text-center mt-16 md:mt-24">
            <Link href="/book" className="btn-primary">
              VIEW SCHEDULE
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="heading-secondary mb-4">What Our Community Says</h2>
            <p className="tagline">REAL REVIEWS FROM OUR CLIENTS</p>
          </div>

          <MomenceReviews />
        </div>
      </section>

      {/* Euforia Section with Circular Text */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <CircularText text="EUFORIA • EUFORIA • EUFORIA • " size={300} className="animate-spin-slow" />
            </div>
            <div className="space-y-4">
              <p className="body-text">
                Find happiness in movement, not just the results. When you move with intention, 
                you reconnect with the simple pleasure of being in your body.
              </p>
              <p className="body-text">
                It is not about chasing a finish line; it is about celebrating every breath, 
                every stretch, every small victory. Pilates invites you to enjoy the journey, 
                to move with gratitude, and to let movement become a source of lightness in your life.
              </p>
              <p className="body-text italic">
                Euforia is not a destination, it is a feeling you create with every mindful moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Info Section - NEW */}
      <section className="py-12 md:py-24 bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-12">
            {/* Studio Name */}
            <div className="space-y-3 md:space-y-4">
              <h2 className="font-serif text-2xl md:text-5xl font-light text-[#1a260e] tracking-wider">
                EUFORYC STUDIOS
              </h2>
              <div className="w-20 md:w-32 h-[1px] bg-[#1a260e]/20 mx-auto"></div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 md:space-x-3 text-[#1a260e]/70">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <p className="font-sans text-xs md:text-sm tracking-wider">
                  <Link href="/contact" className="hover:underline">
                    7 Holmstall Ave, Edgware HA8 5HX, London, United Kingdom
                  </Link>
                </p>
              </div>
              <p className="text-[10px] md:text-xs text-[#1a260e]/60 text-center">
                Serving North London: Edgware, Barnet, Mill Hill, Finchley & surrounding areas
              </p>
            </div>

            {/* Hours */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-center space-x-2 md:space-x-3 text-[#1a260e]">
                <Clock className="h-4 w-4 md:h-5 md:w-5" />
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-wider">Hours</h3>
              </div>

              <div className="grid grid-cols-1 gap-y-1 md:grid-cols-2 md:gap-x-16 md:gap-y-3 max-w-2xl mx-auto px-4 md:px-0">
                {/* Weekdays */}
                <div className="text-left">
                  <div className="flex justify-between items-center py-2 border-b border-[#1a260e]/10">
                    <span className="font-sans text-xs md:text-sm text-[#1a260e]/60">Mon-Fri</span>
                    <span className="font-sans text-xs md:text-sm text-[#1a260e] tracking-wider">6:45 AM - 8:00 PM</span>
                  </div>
                </div>

                {/* Weekends */}
                <div className="text-left">
                  <div className="flex justify-between items-center py-2 border-b border-[#1a260e]/10">
                    <span className="font-sans text-xs md:text-sm text-[#1a260e]/60">Sat-Sun</span>
                    <span className="font-sans text-xs md:text-sm text-[#1a260e] tracking-wider">8:45 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <div className="pt-4 md:pt-8 space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-[#1a260e] text-[#fffcf2] px-8 md:px-12 py-3 md:py-4 font-sans text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#1a260e]/90 hover:scale-[1.02]"
                >
                  CONTACT US
                </Link>
                <Link
                  href="/faq"
                  className="inline-block border border-[#1a260e] text-[#1a260e] px-8 md:px-12 py-3 md:py-4 font-sans text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#1a260e] hover:text-[#fffcf2] hover:scale-[1.02]"
                >
                  FAQ
                </Link>
              </div>
              <p className="text-[10px] md:text-xs text-[#1a260e]/60 text-center">
                <Link href="/faq" className="hover:underline">Common questions about pilates classes</Link> |
                <Link href="/packages" className="hover:underline"> View all packages</Link> |
                <Link href="/book" className="hover:underline"> Book online</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mantra Section - Updated */}
      <section className="py-20 bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center space-y-2">
            <p className="font-serif text-2xl md:text-3xl text-[#1a260e] italic opacity-90">
              everything is euforyc
            </p>
            <p className="font-serif text-2xl md:text-3xl text-[#1a260e] italic opacity-90">
              euforyc is everything
            </p>
          </div>
        </div>
      </section>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}