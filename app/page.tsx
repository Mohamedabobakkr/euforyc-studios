import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import CircularText from '@/components/CircularText';

export const metadata: Metadata = {
  title: 'EUFORYC STUDIOS • Pilates • Wellness • Strength',
  description: 'Boutique women\'s only Pilates studio in London. Experience transformative reformer and mat Pilates.',
};

export default function Home() {
  return (
    <div>
      {/* Hero Section - Full Screen with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image - Updated to background3.jpg */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background3.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Dark overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
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
                alt="Euforyc Studios"
                fill
                className="object-contain"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Our Classes</h2>
            <p className="tagline">REFORMER • MAT • PRIVATE SESSIONS</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reformer Pilates - Updated with image */}
            <div className="text-center space-y-6 group cursor-pointer">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/reformerp.jpg"
                  alt="Reformer Pilates"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-2xl font-light" style={{color: '#1a260e'}}>Reformer Pilates</h3>
              <p className="body-text text-sm">
                Dynamic, equipment-based sessions that challenge your strength, 
                flexibility, and coordination.
              </p>
            </div>

            {/* Mat Pilates - Updated with image */}
            <div className="text-center space-y-6 group cursor-pointer">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/matp.jpg"
                  alt="Hot Pilates"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-2xl font-light" style={{color: '#1a260e'}}>Hot Pilates</h3>
              <p className="body-text text-sm">
                Floor-based practice focusing on core strength, flexibility, 
                and mindful movement.
              </p>
            </div>

            {/* Private Sessions - Updated with image */}
            <div className="text-center space-y-6 group cursor-pointer">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/privates.jpg"
                  alt="Private Sessions"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-2xl font-light" style={{color: '#1a260e'}}>Private Sessions</h3>
              <p className="body-text text-sm">
                One-on-one training tailored to your specific goals and needs 
                with our expert instructors.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/book" className="btn-primary">
              VIEW SCHEDULE
            </Link>
          </div>
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
      <section className="py-24 bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            {/* Studio Name */}
            <div className="space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a260e] tracking-wider">
                EUFORYC STUDIOS
              </h2>
              <div className="w-32 h-[1px] bg-[#1a260e]/20 mx-auto"></div>
            </div>

            {/* Address */}
            <div className="flex items-center justify-center space-x-3 text-[#1a260e]/70">
              <MapPin className="h-5 w-5 flex-shrink-0" />
              <p className="font-sans text-sm tracking-wider">
                7 Holmstall Ave, Edgware HA8 5HX, United Kingdom
              </p>
            </div>

            {/* Hours */}
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 text-[#1a260e] mb-4">
                <Clock className="h-5 w-5" />
                <h3 className="font-serif text-2xl font-light tracking-wider">Hours</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3 max-w-2xl mx-auto">
                {/* Weekdays */}
                <div className="text-left space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-[#1a260e]/10">
                    <span className="font-sans text-sm text-[#1a260e]/60">Mon-Fri</span>
                    <span className="font-sans text-sm text-[#1a260e] tracking-wider">6:45 AM - 8:00 PM</span>
                  </div>
                </div>
                
                {/* Weekends */}
                <div className="text-left space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-[#1a260e]/10">
                    <span className="font-sans text-sm text-[#1a260e]/60">Sat-Sun</span>
                    <span className="font-sans text-sm text-[#1a260e] tracking-wider">8:45 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <div className="pt-8">
              <Link 
                href="/contact" 
                className="inline-block bg-[#1a260e] text-[#fffcf2] px-12 py-4 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#1a260e]/90 hover:scale-[1.02]"
              >
                CONTACT US
              </Link>
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
    </div>
  );
}