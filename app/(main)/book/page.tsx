'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Users, MapPin, ExternalLink, User, Package } from 'lucide-react';
import Arrow from '@/components/euforyc/Arrow';

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
    <div className="eu-page-top">
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-[clamp(48px,6vw,96px)] pb-[clamp(40px,5vw,64px)] bg-eu-cream">
        <div className="eu-wrap grid grid-cols-12 gap-x-6 items-end">
          <h1 className="col-span-12 lg:col-span-8 font-serif font-normal text-[clamp(48px,8vw,128px)] leading-[0.93] tracking-[-0.035em] text-eu-ink eu-rise">Book Your Session</h1>
          <p className="col-span-12 lg:col-start-9 lg:col-span-4 mt-6 lg:mt-0 text-[16px] md:text-[17px] text-eu-green leading-[1.7] eu-rise">
            Choose how you'd like to book your next class
          </p>
        </div>
      </section>

      {/* Simple Booking Options - Mobile Optimized */}
      <section className="pb-[clamp(56px,7vw,110px)] bg-eu-cream">
        <div className="eu-wrap">
          <div>
            {/* Two Clear Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Primary: Book a Class */}
              <a
                href="/schedule"
                className="group relative flex flex-col bg-eu-ink text-eu-cream rounded-eu-md md:rounded-eu-lg p-7 md:p-12 md:min-h-[400px] overflow-hidden
                  active:scale-[0.99] md:hover:-translate-y-1.5 md:hover:shadow-[0_30px_60px_-40px_rgba(26,38,14,0.6)]
                  transition-[transform,box-shadow] duration-500 ease-eu cursor-pointer touch-manipulation"
              >
                <div className="relative z-10 flex flex-col flex-1 gap-6 md:gap-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 border border-[#fffcf2]/40 rounded-full flex items-center justify-center
                    transition-colors duration-300 group-hover:bg-[#fffcf2]/10">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6 text-eu-cream" strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="font-serif font-normal text-[34px] md:text-[clamp(40px,3.8vw,56px)] leading-[1.05] tracking-[-0.015em] mb-2 md:mb-3">Book a Class</h3>
                    <p className="text-[#F5F0E8] text-[15px] md:text-[16px] leading-[1.6]">
                      View schedule & book drop-in or regular classes
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 min-h-[56px] rounded-full bg-eu-cream text-eu-ink pl-6 pr-1.5 py-1.5 text-[12px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 group-hover:bg-eu-beige">
                    <span>VIEW SCHEDULE</span>
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-eu-ink text-eu-cream flex-none transition-transform duration-500 ease-eu group-hover:-rotate-45">
                      <Arrow size={15} />
                    </span>
                  </div>
                </div>
              </a>

              {/* Secondary: View Packages */}
              <a
                href="/packages"
                className="group relative flex flex-col bg-eu-beige text-eu-ink rounded-eu-md md:rounded-eu-lg p-7 md:p-12 md:min-h-[400px] overflow-hidden
                  active:scale-[0.99] md:hover:-translate-y-1.5 md:hover:shadow-[0_30px_60px_-40px_rgba(26,38,14,0.45)]
                  transition-[transform,box-shadow] duration-500 ease-eu cursor-pointer touch-manipulation"
              >
                {/* Best Value Badge */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-eu-ink text-eu-cream px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-[0.16em]">
                  SAVE MORE
                </div>

                <div className="relative z-10 flex flex-col flex-1 gap-6 md:gap-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 border border-[#1a260e]/30 rounded-full flex items-center justify-center
                    transition-colors duration-300 group-hover:bg-[#1a260e]/[0.06]">
                    <Package className="h-5 w-5 md:h-6 md:w-6 text-eu-ink" strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="font-serif font-normal text-[34px] md:text-[clamp(40px,3.8vw,56px)] leading-[1.05] tracking-[-0.015em] mb-2 md:mb-3">Class Packages</h3>
                    <p className="text-eu-green text-[15px] md:text-[16px] leading-[1.6]">
                      Save up to £66 with bundles
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 min-h-[56px] rounded-full bg-eu-ink text-eu-cream pl-6 pr-1.5 py-1.5 text-[12px] font-medium tracking-[0.16em] uppercase transition-colors duration-300 group-hover:bg-eu-green">
                    <span>VIEW PACKAGES</span>
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-eu-cream text-eu-ink flex-none transition-transform duration-500 ease-eu group-hover:-rotate-45">
                      <Arrow size={15} />
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Quick Info - Mobile Optimized */}
            <div className="mt-6 md:mt-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eu-chip">Drop-in from £20</span>
                <span className="hidden">•</span>
                <span className="eu-chip">Packages from £105</span>
                <span className="hidden">•</span>
                <span className="eu-chip">Private sessions available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Classes Section */}
      <section className="py-[clamp(56px,7vw,110px)] bg-eu-cream">
        <div className="eu-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Class Types */}
            <div className="space-y-8 md:space-y-10 eu-rv">
              <h2 className="font-serif font-normal text-[clamp(38px,4.4vw,68px)] leading-[1.02] tracking-[-0.022em] text-eu-ink">Our Classes</h2>

              <div className="space-y-8">
                {/* Reformer Pilates */}
                <div className="border-t border-[#1a260e]/15 pt-6 space-y-3">
                  <h3 className="font-playfair font-normal text-[26px] md:text-[30px] leading-[1.15]"><Link href="/classes/reformer-pilates" className="inline-flex min-h-[44px] items-center underline-offset-4 decoration-1 hover:underline">Reformer Pilates (Group)</Link></h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-eu-green">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" strokeWidth={1.5} />
                      <span>45 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" strokeWidth={1.5} />
                      <span>Max 8 people</span>
                    </div>
                  </div>
                  <p className="body-text">
                    Equipment-based classes focusing on strength, flexibility, and control.
                    Perfect for all levels with personalized modifications.
                  </p>
                </div>

                {/* Hot Pilates */}
                <div className="border-t border-[#1a260e]/15 pt-6 space-y-3">
                  <h3 className="font-playfair font-normal text-[26px] md:text-[30px] leading-[1.15]"><Link href="/classes/hot-pilates" className="inline-flex min-h-[44px] items-center underline-offset-4 decoration-1 hover:underline">Hot Pilates</Link></h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-eu-green">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" strokeWidth={1.5} />
                      <span>45 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" strokeWidth={1.5} />
                      <span>Max 6 people</span>
                    </div>
                  </div>
                  <p className="body-text">
                    Dynamic mat-based Pilates in our heated studio. High energy,
                    low impact workout for a more intense, heated session.
                  </p>
                </div>

                {/* 1:1 Sessions */}
                <div className="border-t border-[#1a260e]/15 pt-6 space-y-3">
                  <h3 className="font-playfair font-normal text-[26px] md:text-[30px] leading-[1.15]"><Link href="/classes/private-reformer-pilates" className="inline-flex min-h-[44px] items-center underline-offset-4 decoration-1 hover:underline">1-1 Private Sessions</Link></h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-eu-green">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" strokeWidth={1.5} />
                      <span>60 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" strokeWidth={1.5} />
                      <span>Private</span>
                    </div>
                  </div>
                  <p className="body-text">
                    Personalized sessions tailored to your specific goals and needs.
                    Ideal for beginners, rehabilitation, or advanced practitioners.
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Info & Contact */}
            <div className="space-y-8 md:space-y-10 eu-rv">
              <h2 className="font-serif font-normal text-[clamp(38px,4.4vw,68px)] leading-[1.02] tracking-[-0.022em] text-eu-ink">Studio Information</h2>

              {/* Location */}
              <div className="bg-eu-beige p-7 md:p-9 rounded-eu-md">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-eu-ink" strokeWidth={1.5} />
                  <h3 className="font-playfair font-normal text-[24px] md:text-[26px] leading-[1.2]">Studio Location</h3>
                </div>
                <p className="body-text mb-2">
                  7-8 Holmstall Parade,<br />
                  Edgware, HA8 5HX
                </p>
                <p className="font-inter text-[14px] text-eu-green">
                  Free parking available
                </p>
              </div>

              {/* Contact for Assistance */}
              <div className="bg-eu-cream border border-[#1a260e]/15 p-7 md:p-9 rounded-eu-md">
                <h3 className="font-playfair font-normal text-[24px] md:text-[26px] leading-[1.2] mb-3">
                  Need Help Booking?
                </h3>
                <p className="body-text mb-5">
                  Our team is happy to assist you with booking or answer any questions.
                </p>
                <div className="space-y-2 text-eu-ink">
                  <p className="font-inter text-[15px]">
                    <strong className="font-medium">Phone:</strong> +44 7375 710370
                  </p>
                  <p className="font-inter text-[15px]">
                    <strong className="font-medium">Email:</strong> euforyc@gmail.com
                  </p>
                  <p className="font-inter text-[15px]">
                    <strong className="font-medium">Instagram:</strong> @euforycstudios
                  </p>
                </div>
              </div>

              {/* Momence App */}
              <div className="bg-eu-cream border border-[#1a260e]/15 p-7 md:p-9 rounded-eu-md">
                <h3 className="font-playfair font-normal text-[24px] md:text-[26px] leading-[1.2] mb-3">
                  Book on the Go
                </h3>
                <p className="body-text mb-5">
                  Download the Momence app to book classes, manage your schedule, and track your progress.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://apps.apple.com/app/momence/id1556964324"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[48px] px-6 rounded-full border border-[#1a260e]/35 text-eu-ink text-[14px] font-medium transition-colors duration-300 hover:bg-eu-ink hover:border-eu-ink hover:text-eu-cream"
                  >
                    App Store →
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.momence.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[48px] px-6 rounded-full border border-[#1a260e]/35 text-eu-ink text-[14px] font-medium transition-colors duration-300 hover:bg-eu-ink hover:border-eu-ink hover:text-eu-cream"
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
      <div className="eu-wrap">
      <section className="eu-on-dark rounded-eu-lg md:rounded-eu-xl px-6 py-14 md:px-14 md:py-24 bg-eu-ink text-eu-cream">
        <div>
          <div className="mb-10 md:mb-14">
            <h2 className="font-serif font-normal text-[clamp(38px,4.4vw,68px)] leading-[1.02] tracking-[-0.022em] text-eu-cream">Booking Policies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            <div className="border-t border-[#fffcf2]/[0.16] pt-6 space-y-3">
              <h3 className="font-playfair font-normal text-[24px] md:text-[28px] leading-[1.2]">Cancellation</h3>
              <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#F5F0E8]">
                Cancel up to 24 hours before class to avoid losing your session
              </p>
            </div>

            <div className="border-t border-[#fffcf2]/[0.16] pt-6 space-y-3">
              <h3 className="font-playfair font-normal text-[24px] md:text-[28px] leading-[1.2]">Late Arrival</h3>
              <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#F5F0E8]">
                Please arrive 5-10 minutes early. Late arrivals may not be admitted
              </p>
            </div>

            <div className="border-t border-[#fffcf2]/[0.16] pt-6 space-y-3">
              <h3 className="font-playfair font-normal text-[24px] md:text-[28px] leading-[1.2]">Package Validity</h3>
              <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#F5F0E8]">
                Class packages are valid for 30 days from your first class (Try It All: 20 days)
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* First Time Visitor */}
      <section className="py-[clamp(80px,9vw,140px)] bg-eu-cream">
        <div className="eu-wrap">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-12 mb-10 md:mb-16 eu-rv">
            <h2 className="font-serif font-normal text-[clamp(38px,4.4vw,68px)] leading-[1.02] tracking-[-0.022em] text-eu-ink">First Time at Euforyc?</h2>
            <p className="body-text lg:max-w-[440px]">
              We're excited to welcome you to our studio! Here's what to expect
              for your first session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6">
            <div className="border-t border-eu-ink pt-7 space-y-4 eu-rv">
              <div>
                <span className="font-playfair italic text-[56px] md:text-[64px] leading-none text-eu-green">1</span>
              </div>
              <h3 className="font-playfair font-normal text-[26px] md:text-[30px] leading-[1.15]">Arrive Early</h3>
              <p className="body-text">
                Come 15 minutes before your first class to complete our health
                questionnaire and get oriented with the studio.
              </p>
            </div>

            <div className="border-t border-eu-ink pt-7 space-y-4 eu-rv">
              <div>
                <span className="font-playfair italic text-[56px] md:text-[64px] leading-none text-eu-green">2</span>
              </div>
              <h3 className="font-playfair font-normal text-[26px] md:text-[30px] leading-[1.15]">What to Bring</h3>
              <p className="body-text">
                We provide all equipment and mats. Wear comfortable workout clothes.
                Grip socks are mandatory for Reformer Pilates, and you need your own
                towel for Hot Pilates and Sculpt Mat Pilates. Both can be bought at the studio.
              </p>
            </div>

            <div className="border-t border-eu-ink pt-7 space-y-4 eu-rv">
              <div>
                <span className="font-playfair italic text-[56px] md:text-[64px] leading-none text-eu-green">3</span>
              </div>
              <h3 className="font-playfair font-normal text-[26px] md:text-[30px] leading-[1.15]">Meet Your Instructor</h3>
              <p className="body-text">
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
