'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, ExternalLink, User, Package } from 'lucide-react';

export default function Book() {
  // Add state to track if the schedule is loaded
  const [scheduleLoaded, setScheduleLoaded] = useState(false);

  // Use effect to check if the schedule is loaded after a delay
  useEffect(() => {
    // Set a timeout to check if the schedule is loaded
    const timer = setTimeout(() => {
      setScheduleLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 md:pt-32">
      {/* Hero Section - Mobile Optimized */}
      <section className="px-5 md:section-padding py-12 md:py-20 bg-[#fffcf2]">
        <div className="container-width text-center">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-[#1a260e] mb-4 md:mb-6">Book Your Session</h1>
          <p className="text-base md:text-lg text-[#1a260e]/70 max-w-2xl mx-auto font-light leading-relaxed">
            Choose how you'd like to book your next class
          </p>
        </div>
      </section>

      {/* Simple Booking Options - Mobile Optimized */}
      <section className="px-5 md:section-padding pb-8 md:pb-16 bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            {/* Two Clear Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

              {/* Primary: Book a Class */}
              <a
                href="/schedule"
                className="group relative bg-[#1a260e] text-[#fffcf2] rounded-2xl p-8 md:p-10 text-center overflow-hidden
                  active:scale-[0.98] md:hover:scale-[1.02] md:hover:shadow-[0_20px_60px_rgba(26,38,14,0.3)]
                  transition-all duration-300 cursor-pointer touch-manipulation"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />

                <div className="relative z-10 space-y-4 md:space-y-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto
                    group-active:scale-95 md:group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-6 w-6 md:h-7 md:w-7 text-[#fffcf2]" />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl md:text-3xl font-light mb-1 md:mb-2">Book a Class</h3>
                    <p className="text-[#fffcf2]/70 text-xs md:text-sm font-light">
                      View schedule & book drop-in or regular classes
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide bg-white/10 px-4 py-2 rounded-full">
                    <span>VIEW SCHEDULE</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Secondary: View Packages */}
              <a
                href="/packages"
                className="group relative bg-white border-2 border-[#1a260e]/10 text-[#1a260e] rounded-2xl p-8 md:p-10 text-center overflow-hidden
                  active:scale-[0.98] md:hover:border-[#1a260e]/30 md:hover:scale-[1.02] md:hover:shadow-[0_20px_60px_rgba(26,38,14,0.1)]
                  transition-all duration-300 cursor-pointer touch-manipulation"
              >
                {/* Best Value Badge */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#1a260e] text-[#fffcf2] px-2.5 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-medium tracking-wide">
                  SAVE MORE
                </div>

                <div className="relative z-10 space-y-4 md:space-y-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1a260e]/10 rounded-xl flex items-center justify-center mx-auto
                    group-active:scale-95 md:group-hover:scale-110 transition-transform duration-300">
                    <Package className="h-6 w-6 md:h-7 md:w-7 text-[#1a260e]" />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl md:text-3xl font-light mb-1 md:mb-2">Class Packages</h3>
                    <p className="text-[#1a260e]/60 text-xs md:text-sm font-light">
                      Save up to £160 with bundles
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide text-[#1a260e]/70 bg-[#1a260e]/5 px-4 py-2 rounded-full">
                    <span>VIEW PACKAGES</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

            {/* Quick Info - Mobile Optimized */}
            <div className="mt-6 md:mt-10 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
                <span className="text-xs md:text-sm text-[#1a260e]/50 font-light">Drop-in from £15</span>
                <span className="hidden md:inline text-[#1a260e]/30 mx-2">•</span>
                <span className="text-xs md:text-sm text-[#1a260e]/50 font-light">Packages from £90</span>
                <span className="hidden md:inline text-[#1a260e]/30 mx-2">•</span>
                <span className="text-xs md:text-sm text-[#1a260e]/50 font-light">Private sessions available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Classes Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Class Types */}
            <div className="space-y-8">
              <h2 className="heading-secondary">Our Classes</h2>

              <div className="space-y-6">
                {/* Reformer Pilates */}
                <div className="border-l-4 border-[#1a260e]/20 pl-6 space-y-2">
                  <h3 className="font-playfair text-xl font-light">Reformer Pilates (Group)</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#1a260e]/80">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>45 minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Max 8 people</span>
                    </div>
                  </div>
                  <p className="body-text">
                    Equipment-based classes focusing on strength, flexibility, and control.
                    Perfect for all levels with personalized modifications.
                  </p>
                </div>

                {/* Hot Pilates */}
                <div className="border-l-4 border-[#1a260e]/20 pl-6 space-y-2">
                  <h3 className="font-playfair text-xl font-light">Hot Pilates</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#1a260e]/80">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>45 minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Max 7 people</span>
                    </div>
                  </div>
                  <p className="body-text">
                    Dynamic mat-based Pilates in our heated studio. High energy,
                    low impact workout for enhanced flexibility and detoxification.
                  </p>
                </div>

                {/* 1:1 Sessions */}
                <div className="border-l-4 border-[#1a260e]/20 pl-6 space-y-2">
                  <h3 className="font-playfair text-xl font-light">1-1 Private Sessions</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#1a260e]/80">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>60 minutes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Private</span>
                    </div>
                  </div>
                  <p className="body-text">
                    Personalized sessions tailored to your specific goals and needs.
                    Ideal for beginners, rehabilitation, or advanced practitioners.
                  </p>
                </div>

                {/* Guided Journaling */}
                <div className="border-l-4 border-[#1a260e]/20 pl-6 space-y-2">
                  <h3 className="font-playfair text-xl font-light">Guided Journaling</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#1a260e]/80">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Tuesdays 9–9.45pm</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>15 spaces</span>
                    </div>
                  </div>
                  <p className="body-text">
                    A gentle space to slow down and return to yourself. Guided journaling,
                    gentle spiritual reflection, dua&apos;a and affirmations, with optional sharing.
                  </p>
                </div>

                {/* Women's Circle */}
                <div className="border-l-4 border-[#1a260e]/20 pl-6 space-y-2">
                  <h3 className="font-playfair text-xl font-light">Women&apos;s Circle</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#1a260e]/80">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Sundays 4pm</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>15 spaces</span>
                    </div>
                  </div>
                  <p className="body-text">
                    For women who long to slow down and return to themselves — a workshop of
                    reflection, remembrance and sisterhood. A place to pause, to be seen,
                    held and softened.
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Info & Contact */}
            <div className="space-y-8">
              <h2 className="heading-secondary">Studio Information</h2>

              {/* Location */}
              <div className="bg-[#1a260e]/5 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="h-5 w-5 text-[#1a260e]" />
                  <h3 className="font-playfair text-xl font-light">Studio Location</h3>
                </div>
                <p className="body-text mb-2">
                  7 Holmstall Ave<br />
                  Edgware HA8 5HX<br />
                  United Kingdom
                </p>
                <p className="font-inter text-sm text-[#1a260e]/80">
                  Free parking available
                </p>
              </div>

              {/* Contact for Assistance */}
              <div className="bg-white border border-[#1a260e]/10 p-6 rounded-lg">
                <h3 className="font-playfair text-xl font-light mb-4">
                  Need Help Booking?
                </h3>
                <p className="body-text text-[#1a260e]/80 mb-4">
                  Our team is happy to assist you with booking or answer any questions.
                </p>
                <div className="space-y-2">
                  <p className="font-inter text-sm">
                    <strong>Phone:</strong> +44 7375 710370
                  </p>
                  <p className="font-inter text-sm">
                    <strong>Email:</strong> euforyc@gmail.com
                  </p>
                  <p className="font-inter text-sm">
                    <strong>Instagram:</strong> @euforycstudios
                  </p>
                </div>
              </div>

              {/* Momence App */}
              <div className="bg-[#fffcf2] border border-[#1a260e]/10 p-6 rounded-lg">
                <h3 className="font-playfair text-xl font-light mb-2">
                  Book on the Go
                </h3>
                <p className="body-text text-sm text-[#1a260e]/70 mb-4">
                  Download the Momence app to book classes, manage your schedule, and track your progress.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://apps.apple.com/app/momence/id1556964324"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a260e] hover:text-[#1a260e]/80 text-sm font-medium"
                  >
                    App Store →
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.momence.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a260e] hover:text-[#1a260e]/80 text-sm font-medium"
                  >
                    Google Play →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Policies */}
      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="heading-secondary text-[#fffcf2] mb-4">Booking Policies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <h3 className="font-playfair text-lg font-light">Cancellation</h3>
              <p className="body-text text-sm text-[#fffcf2]/80">
                Cancel up to 24 hours before class to avoid losing your session
              </p>
            </div>

            <div className="text-center space-y-3">
              <h3 className="font-playfair text-lg font-light">Late Arrival</h3>
              <p className="body-text text-sm text-[#fffcf2]/80">
                Please arrive 5-10 minutes early. Late arrivals may not be admitted
              </p>
            </div>

            <div className="text-center space-y-3">
              <h3 className="font-playfair text-lg font-light">Package Validity</h3>
              <p className="body-text text-sm text-[#fffcf2]/80">
                All class packages are valid for 30 days from purchase date
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First Time Visitor */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="heading-secondary mb-4">First Time at Euforyc?</h2>
            <p className="body-text max-w-2xl mx-auto">
              We're excited to welcome you to our studio! Here's what to expect
              for your first session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-[#1a260e]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <span className="font-playfair text-xl font-light">1</span>
              </div>
              <h3 className="font-playfair text-lg font-light">Arrive Early</h3>
              <p className="body-text text-sm">
                Come 15 minutes before your first class to complete our health
                questionnaire and get oriented with the studio.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-[#1a260e]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <span className="font-playfair text-xl font-light">2</span>
              </div>
              <h3 className="font-playfair text-lg font-light">What to Bring</h3>
              <p className="body-text text-sm">
                Just bring yourself! We provide all equipment, mats, and towels.
                Wear comfortable workout clothes and grip socks if you have them.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-[#1a260e]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                <span className="font-playfair text-xl font-light">3</span>
              </div>
              <h3 className="font-playfair text-lg font-light">Meet Your Instructor</h3>
              <p className="body-text text-sm">
                Let your instructor know it's your first time. They'll provide
                modifications and ensure you feel comfortable throughout the class.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}