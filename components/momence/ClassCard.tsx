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
    <div className="group relative rounded-eu-md p-8 md:p-10 bg-eu-cream
      hover:-translate-y-1
      border border-[#1a260e]/15
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
          <div className="bg-eu-ink text-eu-cream px-5 py-2.5 rounded-full text-xs font-normal tracking-[0.14em] uppercase flex items-center">
            <Crown className="w-4 h-4 mr-2" />
            Popular
          </div>
        </div>
      )}

      {/* Sold Out Badge */}
      {showSoldOutBadge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 animate-fade-down">
          <div className="bg-eu-beige text-eu-ink border border-[#1a260e]/20 px-5 py-2.5 rounded-full text-xs font-normal tracking-[0.14em] uppercase flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Sold Out
          </div>
        </div>
      )}

      {/* Low Capacity Badge */}
      {showLowCapacityBadge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 animate-fade-down">
          <div className="bg-eu-green text-eu-cream px-5 py-2.5 rounded-full text-xs font-normal tracking-[0.14em] uppercase flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Filling Fast
          </div>
        </div>
      )}

      {/* Category/Type Badge */}
      {event.category && (
        <div className="inline-block mb-4">
          <span className="text-xs font-normal tracking-[0.15em] uppercase text-eu-green bg-eu-beige px-4 py-2 rounded-full border border-[#1a260e]/15">
            {event.category}
          </span>
        </div>
      )}

      {/* Class Title */}
      <h3 className="font-serif text-3xl md:text-4xl font-normal text-eu-ink mb-4 leading-[1.1] tracking-tight
        group-hover:text-eu-green transition-colors duration-300">
        {event.title}
      </h3>

      {/* Description */}
      {event.description && (
        <p className="text-base text-eu-green mb-5 line-clamp-2 leading-relaxed font-light">
          {event.description}
        </p>
      )}

      {/* Date & Time */}
      <div className="space-y-3 mb-6 p-4 bg-eu-beige rounded-eu-sm">
        <div className="flex items-center gap-3 text-base text-[#1a260e]">
          <div className="w-9 h-9 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-eu-green" strokeWidth={1.5} />
          </div>
          <span className="font-medium tracking-tight">
            {dayName}, {date}
          </span>
        </div>
        <div className="flex items-center gap-3 text-base text-[#1a260e]">
          <div className="w-9 h-9 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
            <Clock className="w-4 h-4 text-eu-green" strokeWidth={1.5} />
          </div>
          <span className="font-light">
            {startTime} - {endTime}
          </span>
          {event.duration && <span className="text-sm text-eu-sage font-medium">({event.duration} min)</span>}
        </div>
      </div>

      {/* Instructor */}
      {event.instructor && (
        <div className="flex items-center gap-3 mb-5 p-3 bg-eu-beige rounded-eu-sm">
          <div className="w-8 h-8 rounded-full bg-[#1a260e]/10 flex items-center justify-center">
            <User className="w-4 h-4 text-eu-green" strokeWidth={1.5} />
          </div>
          <span className="text-sm text-eu-green font-light">
            with <span className="font-medium text-eu-ink">{event.instructor.name}</span>
          </span>
        </div>
      )}

      {/* Level */}
      {event.level && event.level !== 'All Levels' && (
        <div className="mb-5">
          <span className="text-xs font-normal tracking-wider uppercase text-eu-green bg-eu-beige px-3 py-1.5 rounded-full border border-[#1a260e]/15">
            {event.level}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-[#1a260e]/15 my-7" />

      {/* Capacity Bar */}
      {event.capacity > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
                <Users className="w-4 h-4 text-eu-green" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-eu-ink tracking-tight">
                {event.isSoldOut ? (
                  'Fully Booked'
                ) : (
                  <>
                    {event.spotsAvailable} spot{event.spotsAvailable !== 1 ? 's' : ''} available
                  </>
                )}
              </span>
            </div>
            <span className="text-sm text-eu-sage font-medium">
              {event.spotsBooked}/{event.capacity}
            </span>
          </div>
          {/* Refined progress bar with glow */}
          <div className="w-full h-2 bg-eu-beige rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                capacityPercentage >= 90
                  ? 'bg-eu-ink'
                  : capacityPercentage >= 75
                  ? 'bg-eu-green'
                  : 'bg-eu-live'
              }`}
              style={{ width: `${capacityPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Waitlist Info */}
      {event.isSoldOut && event.waitlistEnabled && (
        <div className="mb-5 p-4 bg-eu-beige rounded-eu-sm">
          <p className="text-sm text-eu-ink">
            <span className="font-semibold">Waitlist Available</span>
            {event.waitlistCount && event.waitlistCount > 0 && (
              <span className="text-eu-green"> — {event.waitlistCount} on list</span>
            )}
          </p>
        </div>
      )}

      {/* Price & CTA */}
      <div className="flex items-end justify-between gap-4">
        <div>
          {event.price > 0 ? (
            <>
              <p className="text-xs font-normal tracking-wider uppercase text-eu-sage mb-2">Drop-in Price</p>
              <p className="font-serif text-4xl md:text-5xl font-normal text-eu-ink tracking-tight">
                £{event.price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-serif text-3xl font-normal text-eu-green">Complimentary</p>
          )}
        </div>

        {/* Book Button */}
        <a
          href={event.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            inline-flex items-center gap-2.5 px-7 min-h-[52px] rounded-full font-normal text-xs tracking-[0.18em] uppercase
            transition-colors duration-500 group/btn
            ${
              event.isSoldOut
                ? event.waitlistEnabled
                  ? 'bg-eu-green text-eu-cream hover:bg-eu-ink'
                  : 'bg-eu-beige text-eu-sage cursor-not-allowed'
                : 'bg-eu-ink text-eu-cream hover:bg-eu-green'
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
        <div className="absolute inset-0 bg-eu-cream/95 rounded-eu-md flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-eu-ink mx-auto mb-3" strokeWidth={1.5} />
            <p className="font-serif text-xl font-normal text-eu-ink mb-1">Class Cancelled</p>
            {event.cancellationReason && (
              <p className="text-sm text-eu-green">{event.cancellationReason}</p>
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
      className="group block p-4 bg-eu-cream border border-[#1a260e]/15 rounded-eu-sm hover:border-[#1a260e]/40 transition-colors duration-200"
    >
      <div className="flex items-start gap-3">
        {/* Time */}
        <div className="flex-shrink-0 text-center">
          <p className="text-xs text-eu-sage mb-1">
            {startDate.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
          </p>
          <p className="font-serif text-lg font-normal text-eu-ink">{startTime}</p>
        </div>

        <div className="w-px h-full bg-[#1a260e]/15" />

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-base font-normal text-eu-ink mb-1 truncate">
            {event.title}
          </h4>
          {event.instructor && (
            <p className="text-xs text-eu-sage truncate">{event.instructor.name}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {event.isSoldOut ? (
              <span className="text-xs font-medium text-eu-ink">Sold Out</span>
            ) : (
              <span className="text-xs text-eu-sage">
                {event.spotsAvailable} spots left
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <ExternalLink className="w-4 h-4 text-eu-sage group-hover:text-eu-ink group-hover:translate-x-1 transition-all duration-200" />
      </div>
    </a>
  );
}
