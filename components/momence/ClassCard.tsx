/**
 * ClassCard Component
 * Luxury aesthetic card for displaying class/event information
 * Euforyc Studios brand design
 */

import React from 'react';
import { Calendar, Clock, User, Users, ExternalLink, Crown, AlertCircle } from 'lucide-react';
import { MomenceEvent } from '@/lib/types/momence';

interface ClassCardProps {
  event: MomenceEvent;
  isPopular?: boolean;
}

export default function ClassCard({ event, isPopular = false }: ClassCardProps) {
  // Format date and time
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  const dayName = startDate.toLocaleDateString('en-GB', { weekday: 'short' });
  const date = startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const startTime = startDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const endTime = endDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Calculate capacity percentage
  const capacityPercentage = event.capacity > 0 ? (event.spotsBooked / event.capacity) * 100 : 0;

  // Determine badge
  const showSoldOutBadge = event.isSoldOut;
  const showLowCapacityBadge = event.isLowCapacity && !event.isSoldOut;
  const showPopularBadge = isPopular && !event.isSoldOut;

  return (
    <div className="group relative rounded-3xl p-8 md:p-10 bg-white
      shadow-[0_4px_20px_rgba(26,38,14,0.08)]
      hover:shadow-[0_20px_60px_rgba(26,38,14,0.15)]
      hover:-translate-y-3 hover:scale-[1.02]
      border border-[#1a260e]/5
      transition-all duration-500 ease-out
      overflow-hidden
      before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#1a260e]/[0.02] before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
      hover:before:opacity-100">

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}
      />

      {/* Popular Badge */}
      {showPopularBadge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 animate-fade-down">
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase flex items-center shadow-[0_8px_20px_rgba(234,179,8,0.3)]">
            <Crown className="w-4 h-4 mr-2" />
            Popular
          </div>
        </div>
      )}

      {/* Sold Out Badge */}
      {showSoldOutBadge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 animate-fade-down">
          <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase flex items-center shadow-[0_8px_20px_rgba(220,38,38,0.3)]">
            <AlertCircle className="w-4 h-4 mr-2" />
            Sold Out
          </div>
        </div>
      )}

      {/* Low Capacity Badge */}
      {showLowCapacityBadge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 animate-fade-down">
          <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase flex items-center shadow-[0_8px_20px_rgba(249,115,22,0.3)]">
            <Users className="w-4 h-4 mr-2" />
            Filling Fast
          </div>
        </div>
      )}

      {/* Category/Type Badge */}
      {event.category && (
        <div className="inline-block mb-4">
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#1a260e]/70 bg-[#1a260e]/5 px-4 py-2 rounded-full border border-[#1a260e]/10">
            {event.category}
          </span>
        </div>
      )}

      {/* Class Title */}
      <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1a260e] mb-4 leading-[1.1] tracking-tight
        group-hover:text-[#2a3a21] transition-colors duration-300">
        {event.title}
      </h3>

      {/* Description */}
      {event.description && (
        <p className="text-base text-[#1a260e]/60 mb-5 line-clamp-2 leading-relaxed font-light">
          {event.description}
        </p>
      )}

      {/* Date & Time */}
      <div className="space-y-3 mb-6 p-4 bg-[#fffcf2]/80 rounded-xl border border-[#1a260e]/5">
        <div className="flex items-center gap-3 text-base text-[#1a260e]">
          <div className="w-9 h-9 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-[#1a260e]/60" />
          </div>
          <span className="font-medium tracking-tight">
            {dayName}, {date}
          </span>
        </div>
        <div className="flex items-center gap-3 text-base text-[#1a260e]">
          <div className="w-9 h-9 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
            <Clock className="w-4 h-4 text-[#1a260e]/60" />
          </div>
          <span className="font-light">
            {startTime} - {endTime}
          </span>
          {event.duration && <span className="text-sm text-[#1a260e]/50 font-medium">({event.duration} min)</span>}
        </div>
      </div>

      {/* Instructor */}
      {event.instructor && (
        <div className="flex items-center gap-3 mb-5 p-3 bg-gradient-to-r from-[#1a260e]/[0.03] to-transparent rounded-lg">
          <div className="w-8 h-8 rounded-full bg-[#1a260e]/10 flex items-center justify-center">
            <User className="w-4 h-4 text-[#1a260e]/60" />
          </div>
          <span className="text-sm text-[#1a260e]/70 font-light">
            with <span className="font-medium text-[#1a260e]">{event.instructor.name}</span>
          </span>
        </div>
      )}

      {/* Level */}
      {event.level && event.level !== 'All Levels' && (
        <div className="mb-5">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#1a260e]/60 bg-[#1a260e]/5 px-3 py-1.5 rounded-full border border-[#1a260e]/10">
            {event.level}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1a260e]/10 to-transparent my-7" />

      {/* Capacity Bar */}
      {event.capacity > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#1a260e]/60" />
              </div>
              <span className="text-sm font-medium text-[#1a260e] tracking-tight">
                {event.isSoldOut ? (
                  'Fully Booked'
                ) : (
                  <>
                    {event.spotsAvailable} spot{event.spotsAvailable !== 1 ? 's' : ''} available
                  </>
                )}
              </span>
            </div>
            <span className="text-sm text-[#1a260e]/50 font-medium">
              {event.spotsBooked}/{event.capacity}
            </span>
          </div>
          {/* Refined progress bar with glow */}
          <div className="w-full h-2 bg-[#1a260e]/5 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                capacityPercentage >= 90
                  ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                  : capacityPercentage >= 75
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 shadow-[0_0_8px_rgba(251,146,60,0.4)]'
                  : 'bg-gradient-to-r from-green-500 to-green-600 shadow-[0_0_8px_rgba(34,197,94,0.4)]'
              }`}
              style={{ width: `${capacityPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Waitlist Info */}
      {event.isSoldOut && event.waitlistEnabled && (
        <div className="mb-5 p-4 bg-gradient-to-r from-orange-50 to-orange-50/50 border border-orange-200/50 rounded-xl backdrop-blur-sm">
          <p className="text-sm text-orange-900">
            <span className="font-semibold">Waitlist Available</span>
            {event.waitlistCount && event.waitlistCount > 0 && (
              <span className="text-orange-700"> — {event.waitlistCount} on list</span>
            )}
          </p>
        </div>
      )}

      {/* Price & CTA */}
      <div className="flex items-end justify-between gap-4">
        <div>
          {event.price > 0 ? (
            <>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#1a260e]/50 mb-2">Drop-in Price</p>
              <p className="font-serif text-4xl md:text-5xl font-light text-[#1a260e] tracking-tight">
                £{event.price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-serif text-3xl font-light text-green-700">Complimentary</p>
          )}
        </div>

        {/* Book Button */}
        <a
          href={event.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl font-semibold text-sm tracking-wide uppercase
            transition-all duration-500 group/btn shadow-lg
            ${
              event.isSoldOut
                ? event.waitlistEnabled
                  ? 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-[0_12px_30px_rgba(234,88,12,0.3)] hover:scale-105'
                  : 'bg-[#1a260e]/10 text-[#1a260e]/40 cursor-not-allowed'
                : 'bg-[#1a260e] text-white hover:bg-[#2a3a21] hover:shadow-[0_12px_30px_rgba(26,38,14,0.25)] hover:scale-105 hover:-translate-y-1'
            }
          `}
          aria-label={event.isSoldOut ? 'Join waitlist' : 'Book this class'}
          {...(event.isSoldOut && !event.waitlistEnabled && { 'aria-disabled': 'true' })}
        >
          {event.isSoldOut ? (
            event.waitlistEnabled ? (
              <>
                Join List
                <ExternalLink className="w-4 h-4 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-300" />
              </>
            ) : (
              'Sold Out'
            )
          ) : (
            <>
              Book Now
              <ExternalLink className="w-4 h-4 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-300" />
            </>
          )}
        </a>
      </div>

      {/* Cancelled Indicator */}
      {event.isCancelled && (
        <div className="absolute inset-0 bg-white/95 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <p className="font-serif text-xl font-light text-[#1a260e] mb-1">Class Cancelled</p>
            {event.cancellationReason && (
              <p className="text-sm text-[#1a260e]/70">{event.cancellationReason}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Compact variant for mobile or sidebar
 */
export function CompactClassCard({ event }: { event: MomenceEvent }) {
  const startDate = new Date(event.startTime);
  const startTime = startDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <a
      href={event.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 bg-white border border-[#1a260e]/10 rounded-xl hover:border-[#1a260e]/20 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        {/* Time */}
        <div className="flex-shrink-0 text-center">
          <p className="text-xs text-[#1a260e]/60 mb-1">
            {startDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
          </p>
          <p className="font-serif text-lg font-light text-[#1a260e]">{startTime}</p>
        </div>

        <div className="w-px h-full bg-[#1a260e]/10" />

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-base font-light text-[#1a260e] mb-1 truncate">
            {event.title}
          </h4>
          {event.instructor && (
            <p className="text-xs text-[#1a260e]/60 truncate">{event.instructor.name}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {event.isSoldOut ? (
              <span className="text-xs font-semibold text-red-600">Sold Out</span>
            ) : (
              <span className="text-xs text-[#1a260e]/60">
                {event.spotsAvailable} spots left
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <ExternalLink className="w-4 h-4 text-[#1a260e]/30 group-hover:text-[#1a260e] group-hover:translate-x-1 transition-all duration-200" />
      </div>
    </a>
  );
}
