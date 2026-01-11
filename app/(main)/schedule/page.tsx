/**
 * Class Schedule Page
 * Minimalist schedule with real-time availability - Euforyc Studios
 */

import React from 'react';
import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import ScheduleView from '@/components/momence/ScheduleView';

export const metadata: Metadata = {
  title: 'Live Class Schedule | Euforyc Studios - Reformer Pilates & Hot Yoga in Edgware',
  description:
    'View our live class schedule with real-time availability. Book Reformer Pilates, Hot Pilates, Yoga, and Dance classes at Euforyc Studios in Edgware. Check instructor schedules and secure your spot today.',
  keywords: [
    'pilates schedule Edgware',
    'reformer pilates classes',
    'hot yoga timetable',
    'book pilates class',
    'Edgware fitness schedule',
    'yoga class times',
    'pilates instructors',
  ],
  openGraph: {
    title: 'Live Class Schedule - Euforyc Studios',
    description:
      'Browse our live class schedule and book your spot at Euforyc Studios. Real-time availability for Reformer Pilates, Hot Yoga, and more.',
    type: 'website',
  },
};

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-[#fffcf2]">
      {/* Dramatic Header Section */}
      <section className="relative pt-40 pb-12 md:pt-44 md:pb-16 px-6 md:px-12 lg:px-16 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a260e]/[0.02] to-transparent pointer-events-none" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a260e]/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Title */}
            <div className="space-y-3">
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#1a260e]/40 font-semibold
                animate-fade-down">
                Live Schedule
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-[#1a260e] leading-[0.95] tracking-tight
                animate-fade-up
                relative inline-block
                after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-[#1a260e]/10 after:-mb-4 after:rounded-full">
                Class Schedule
              </h1>
            </div>

            {/* Quick Info - Refined */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-sm text-[#1a260e]/60
              animate-fade-up animation-delay-1000">
              <span className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-[#1a260e]/5 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="font-medium">Updated Live</span>
              </span>
              <span className="hidden sm:inline text-[#1a260e]/20">•</span>
              <span className="px-4 py-2.5 bg-white rounded-xl border border-[#1a260e]/5 shadow-sm font-medium hidden sm:inline-block">
                14 Days Ahead
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section - Maximum Space */}
      <section className="pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <ScheduleView />
        </div>
      </section>

      {/* Refined Footer Info */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-[#1a260e] text-white relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center
                border border-white/10 shadow-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-serif text-xl font-light mb-1">Euforyc Studios</p>
                <p className="text-sm text-white/50 font-light tracking-wide">161 Hale Lane, Edgware HA8 9QP</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <a
                href="https://maps.google.com/?q=Euforyc+Studios,+161+Hale+Lane,+Edgware,+HA8+9QP"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:shadow-lg
                  transition-all duration-300 font-medium border border-white/10"
              >
                Get Directions
              </a>
              <a
                href="tel:+442089510057"
                className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:shadow-lg
                  transition-all duration-300 font-medium border border-white/10"
              >
                020 8951 0057
              </a>
              <a
                href="mailto:info@euforyc.co.uk"
                className="text-white/60 hover:text-white transition-all duration-200 font-medium px-2"
              >
                info@euforyc.co.uk
              </a>
            </div>
          </div>

          {/* Arrival Note */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-white/40 font-light tracking-wide">
              First time visiting? We recommend arriving 10-15 minutes early to check in.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
