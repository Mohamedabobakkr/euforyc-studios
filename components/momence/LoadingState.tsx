/**
 * LoadingState Component
 * Beautiful skeleton loader with Euforyc brand aesthetic
 */

import React from 'react';

interface LoadingStateProps {
  count?: number; // Number of skeleton cards to show
  cardType?: 'class' | 'membership' | 'package' | 'teacher';
}

export default function LoadingState({ count = 6, cardType = 'class' }: LoadingStateProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative rounded-2xl p-8 bg-white border-2 border-[#1a260e]/10 overflow-hidden"
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          {/* Card content skeleton */}
          <div className="space-y-4 relative">
            {/* Badge placeholder for popular/featured items */}
            {cardType !== 'teacher' && index === 0 && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-10 w-32 bg-[#1a260e]/5 rounded-full animate-pulse" />
            )}

            {/* Teacher profile image or badge area */}
            {cardType === 'teacher' ? (
              <div className="w-24 h-24 mx-auto bg-[#1a260e]/5 rounded-full animate-pulse" />
            ) : (
              <div className="h-6 w-24 bg-[#1a260e]/5 rounded animate-pulse" />
            )}

            {/* Title */}
            <div className="h-8 w-3/4 bg-[#1a260e]/5 rounded animate-pulse" />

            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-[#1a260e]/5 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-[#1a260e]/5 rounded animate-pulse" />
              {cardType !== 'class' && (
                <div className="h-4 w-4/6 bg-[#1a260e]/5 rounded animate-pulse" />
              )}
            </div>

            {/* Class card specific: time and instructor */}
            {cardType === 'class' && (
              <div className="flex items-center gap-4">
                <div className="h-4 w-20 bg-[#1a260e]/5 rounded animate-pulse" />
                <div className="h-4 w-24 bg-[#1a260e]/5 rounded animate-pulse" />
              </div>
            )}

            {/* Membership/Package specific: benefits list */}
            {(cardType === 'membership' || cardType === 'package') && (
              <div className="space-y-2 pt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-[#1a260e]/5 rounded-full animate-pulse" />
                    <div className="h-3 w-32 bg-[#1a260e]/5 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="h-px w-full bg-[#1a260e]/5 my-6" />

            {/* Price and CTA */}
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-[#1a260e]/5 rounded animate-pulse" />
                <div className="h-10 w-24 bg-[#1a260e]/5 rounded animate-pulse" />
              </div>
              <div className="h-12 w-32 bg-[#1a260e]/5 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Compact loading state for smaller sections
 */
export function CompactLoadingState({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative rounded-xl p-6 bg-white border border-[#1a260e]/10 overflow-hidden"
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          <div className="flex items-center gap-4 relative">
            <div className="h-16 w-16 bg-[#1a260e]/5 rounded-lg animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-2/3 bg-[#1a260e]/5 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-[#1a260e]/5 rounded animate-pulse" />
            </div>
            <div className="h-10 w-24 bg-[#1a260e]/5 rounded-lg animate-pulse" />
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Inline loading spinner for buttons and inline actions
 */
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-[#1a260e]/20 border-t-[#1a260e] rounded-full animate-spin`}
      />
    </div>
  );
}

/**
 * Full page loading state with logo
 */
export function FullPageLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated logo placeholder */}
        <div className="mx-auto">
          <div className="h-16 w-16 border-4 border-[#1a260e]/20 border-t-[#1a260e] rounded-full animate-spin" />
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <p className="font-serif text-2xl font-light text-[#1a260e]">Loading</p>
          <p className="text-sm text-[#1a260e]/60">Fetching the latest information...</p>
        </div>

        {/* Pulsing dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 bg-[#1a260e]/40 rounded-full animate-pulse [animation-delay:0ms]" />
          <div className="h-2 w-2 bg-[#1a260e]/40 rounded-full animate-pulse [animation-delay:150ms]" />
          <div className="h-2 w-2 bg-[#1a260e]/40 rounded-full animate-pulse [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
