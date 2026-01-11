/**
 * CompactClassRow Component
 * Minimalist row-based class display for efficient schedule viewing
 * Euforyc Studios brand design
 */

'use client';

import React from 'react';
import { User, Users, ExternalLink, Clock } from 'lucide-react';
import { MomenceEvent } from '@/lib/types/momence';

interface CompactClassRowProps {
    event: MomenceEvent;
    showDate?: boolean;
}

// Category color mapping for left border accent
const categoryColors: Record<string, string> = {
    'Reformer': 'border-l-emerald-600',
    'Reformer Pilates': 'border-l-emerald-600',
    'Hot Pilates': 'border-l-orange-500',
    'Hot': 'border-l-orange-500',
    'Mat Pilates': 'border-l-blue-500',
    'Mat': 'border-l-blue-500',
    'Yoga': 'border-l-purple-500',
    'Dance': 'border-l-pink-500',
    'Private': 'border-l-amber-600',
    'default': 'border-l-[#1a260e]',
};

function getCategoryColor(category?: string): string {
    if (!category) return categoryColors.default;

    // Check for exact match first
    if (categoryColors[category]) return categoryColors[category];

    // Check for partial matches
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('reformer')) return categoryColors['Reformer'];
    if (lowerCategory.includes('hot')) return categoryColors['Hot'];
    if (lowerCategory.includes('mat')) return categoryColors['Mat'];
    if (lowerCategory.includes('yoga')) return categoryColors['Yoga'];
    if (lowerCategory.includes('dance')) return categoryColors['Dance'];
    if (lowerCategory.includes('private')) return categoryColors['Private'];

    return categoryColors.default;
}

export default function CompactClassRow({ event, showDate = false }: CompactClassRowProps) {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);

    const time = startDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const endTime = endDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const dateStr = showDate
        ? startDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
        : null;

    // Capacity visualization
    const capacityPercentage = event.capacity > 0 ? (event.spotsBooked / event.capacity) * 100 : 0;

    const getCapacityColor = () => {
        if (event.isSoldOut) return 'text-red-400';
        if (capacityPercentage >= 75) return 'text-orange-400';
        return 'text-[#fffcf2]/70';
    };

    const categoryBorderColor = getCategoryColor(event.category);

    return (
        <a
            href={event.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
        group relative flex items-center gap-4 md:gap-8 p-6 md:p-7
        bg-[#1a260e] text-white border-l-[6px] ${categoryBorderColor}
        rounded-2xl overflow-hidden
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        hover:shadow-[0_20px_60px_rgb(0,0,0,0.25)]
        hover:scale-[1.02] hover:-translate-y-1
        transition-all duration-500 ease-out cursor-pointer
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.07] before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100
      `}
        >
            {/* Subtle grain texture overlay for depth */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
                }}
            />

            {/* Time Column - Magazine Style */}
            <div className="flex-shrink-0 w-20 md:w-28 relative">
                <p className="font-serif text-3xl md:text-5xl font-light text-white leading-none tracking-tight
                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                    group-hover:scale-110 transition-transform duration-500 ease-out">
                    {time}
                </p>
                <p className="text-xs md:text-sm text-white/40 mt-2 font-medium tracking-wider hidden md:block">
                    {event.duration ? `${event.duration} MIN` : endTime}
                </p>
            </div>

            {/* Elegant Divider */}
            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            {/* Class Details */}
            <div className="flex-1 min-w-0 relative z-10">
                <div className="flex items-start gap-3 mb-2">
                    <h3 className="font-serif text-xl md:text-2xl font-light text-white leading-tight truncate
                        group-hover:text-white transition-all duration-300">
                        {event.title}
                    </h3>
                    {event.category && (
                        <span className="hidden lg:inline-flex px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase
                            bg-white/15 backdrop-blur-sm text-white rounded-full
                            border border-white/10
                            group-hover:bg-white/25 group-hover:border-white/20 transition-all duration-300">
                            {event.category}
                        </span>
                    )}
                </div>

                {/* Instructor */}
                {event.instructor && (
                    <div className="flex items-center gap-2 mt-2">
                        <User className="w-4 h-4 text-white/30" />
                        <span className="text-sm md:text-base text-white/60 truncate font-light">
                            {event.instructor.name}
                        </span>
                    </div>
                )}
            </div>

            {/* Capacity Indicator - Refined */}
            <div className="flex-shrink-0 text-right hidden sm:block">
                <div className={`flex items-center justify-end gap-2 ${getCapacityColor()} mb-2`}>
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium whitespace-nowrap">
                        {event.isSoldOut
                            ? 'Fully Booked'
                            : `${event.spotsAvailable} ${event.spotsAvailable === 1 ? 'spot' : 'spots'}`
                        }
                    </span>
                </div>
                {/* Refined capacity bar with glow */}
                <div className="w-20 h-1.5 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${event.isSoldOut
                            ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                            : capacityPercentage >= 75
                                ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]'
                                : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                            }`}
                        style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                    />
                </div>
            </div>

            {/* Book Button - Luxury Style */}
            <div className="flex-shrink-0">
                <span
                    className={`
            inline-flex items-center gap-2 px-5 md:px-6 py-3 md:py-3.5
            rounded-xl text-xs md:text-sm font-semibold tracking-[0.1em] uppercase
            transition-all duration-300
            shadow-lg
            ${event.isSoldOut
                            ? event.waitlistEnabled
                                ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-[0_8px_20px_rgba(249,115,22,0.4)]'
                                : 'bg-white/10 text-white/30 cursor-not-allowed backdrop-blur-sm'
                            : 'bg-white text-[#1a260e] hover:bg-[#fffcf2] hover:shadow-[0_8px_20px_rgba(255,255,255,0.3)] hover:scale-105'
                        }
          `}
                >
                    {event.isSoldOut
                        ? (event.waitlistEnabled ? 'Join List' : 'Full')
                        : 'Book Now'
                    }
                    {(!event.isSoldOut || event.waitlistEnabled) && (
                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                    )}
                </span>
            </div>

            {/* Mobile: Capacity shown below */}
            <div className="sm:hidden absolute bottom-3 right-4">
                <span className={`text-xs font-medium ${getCapacityColor()}`}>
                    {event.isSoldOut ? 'Fully Booked' : `${event.spotsAvailable} spots`}
                </span>
            </div>
        </a>
    );
}

/**
 * Date Header Component for grouping
 */
export function DateHeader({
    displayDate,
    eventCount
}: {
    displayDate: string;
    eventCount: number;
}) {
    return (
        <div className="flex items-center gap-6 py-6 mb-4">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1a260e] tracking-tight
                relative
                after:absolute after:bottom-0 after:left-0 after:w-12 after:h-px after:bg-[#1a260e]/30 after:-mb-2">
                {displayDate}
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-[#1a260e]/20 via-[#1a260e]/5 to-transparent rounded-full" />
            <span className="text-xs font-semibold text-[#1a260e]/50 tracking-[0.15em] uppercase bg-[#1a260e]/5 px-4 py-2 rounded-full">
                {eventCount} {eventCount === 1 ? 'class' : 'classes'}
            </span>
        </div>
    );
}
