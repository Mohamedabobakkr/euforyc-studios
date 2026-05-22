/**
 * MembershipCard Component
 * Luxury membership card matching Euforyc Studios brand
 */

import React from 'react';
import { Crown, CheckCircle, ExternalLink, Calendar } from 'lucide-react';
import { MomenceMembership } from '@/lib/types/momence';

interface MembershipCardProps {
  membership: MomenceMembership;
  isPopular?: boolean;
}

function pixelAttrs(membership: MomenceMembership) {
  const offerId = membership.id
    ? `membership-${membership.id}`
    : `membership-${membership.name.toLowerCase().replace(/\s+/g, '-')}`;
  return {
    'data-offer-id': offerId,
    'data-content-name': membership.name,
    'data-content-type': 'membership',
    'data-content-category': '/memberships',
    'data-value': membership.price ? membership.price.toFixed(2) : '0',
    'data-currency': 'GBP',
  } as const;
}

export default function MembershipCard({ membership, isPopular }: MembershipCardProps) {
  const popular = isPopular || membership.isPopular;

  // Format price
  const formattedPrice = membership.price
    ? `£${membership.price.toFixed(2)}`
    : 'Contact Us';

  // Format billing cycle
  const billingCycleText = {
    monthly: 'per month',
    quarterly: 'per quarter',
    annually: 'per year',
    'one-time': 'one-time payment',
  }[membership.billingCycle] || 'per month';

  // Calculate savings if compareAtPrice exists
  const savings =
    membership.setupFee && membership.setupFee > 0
      ? `£${membership.setupFee} setup fee`
      : null;

  return (
    <a
      href={membership.signUpUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...pixelAttrs(membership)}
      className={`group relative rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
        popular
          ? 'bg-[#1a260e] text-[#fffcf2] border-2 border-[#1a260e]'
          : 'bg-white border-2 border-[#1a260e]/10 text-[#1a260e] hover:border-[#1a260e]/20'
      }`}
      aria-label={`Sign up for ${membership.name} membership`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide flex items-center shadow-lg">
            <Crown className="w-4 h-4 mr-1.5" />
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Paused/Inactive Indicator */}
      {membership.isPaused && (
        <div className="absolute top-4 right-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            PAUSED
          </span>
        </div>
      )}

      {!membership.isActive && !membership.isPaused && (
        <div className="absolute top-4 right-4">
          <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            UNAVAILABLE
          </span>
        </div>
      )}

      <div className="text-center space-y-6">
        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-light leading-tight">{membership.name}</h3>
          <p
            className={`text-sm ${
              popular ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'
            }`}
          >
            {membership.shortDescription || membership.description}
          </p>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <p className="font-serif text-4xl font-light">{formattedPrice}</p>
          <p
            className={`text-sm ${
              popular ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'
            }`}
          >
            {billingCycleText}
          </p>

          {/* Setup fee or savings */}
          {savings && (
            <p
              className={`font-sans text-sm font-medium ${
                popular ? 'text-orange-400' : 'text-orange-600'
              }`}
            >
              + {savings}
            </p>
          )}
        </div>

        {/* Classes per month indicator */}
        {membership.classesPerMonth && (
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${
              popular
                ? 'bg-[#fffcf2]/10 text-[#fffcf2]'
                : 'bg-[#1a260e]/5 text-[#1a260e]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {membership.classesPerMonth === 'unlimited'
              ? 'Unlimited Classes'
              : `${membership.classesPerMonth} Classes/Month`}
          </div>
        )}

        {/* Features/Benefits */}
        <div className="space-y-3 text-left">
          {membership.benefits.slice(0, 5).map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  popular ? 'text-green-400' : 'text-green-600'
                }`}
              />
              <span
                className={`text-sm ${
                  popular ? 'text-[#fffcf2]/80' : 'text-[#1a260e]/80'
                }`}
              >
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* Availability indicator */}
        {membership.availableSlots !== undefined &&
          membership.maxMembers !== undefined &&
          membership.availableSlots < membership.maxMembers * 0.2 && (
            <div className="pt-2">
              <p
                className={`text-xs font-semibold ${
                  popular ? 'text-orange-400' : 'text-orange-600'
                }`}
              >
                {membership.availableSlots} spots left!
              </p>
            </div>
          )}

        {/* CTA */}
        <div
          className={`flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pt-4 ${
            popular ? 'text-[#fffcf2]' : 'text-[#1a260e]'
          }`}
        >
          <span className="font-sans text-sm font-medium mr-2">
            {membership.isPaused
              ? 'Currently Paused'
              : !membership.isActive
              ? 'Not Available'
              : 'Start Membership'}
          </span>
          {membership.isActive && !membership.isPaused && (
            <ExternalLink className="h-4 w-4" />
          )}
        </div>

        {/* Contract length indicator */}
        {membership.contractLength && (
          <div className="pt-2 border-t border-current/10">
            <p
              className={`text-xs ${
                popular ? 'text-[#fffcf2]/60' : 'text-[#1a260e]/60'
              }`}
            >
              {membership.contractLength}-month commitment
              {membership.autoRenew ? ' • Auto-renews' : ''}
            </p>
          </div>
        )}
      </div>
    </a>
  );
}

/**
 * Compact membership card for sidebars or lists
 */
export function CompactMembershipCard({ membership }: { membership: MomenceMembership }) {
  const formattedPrice = membership.price
    ? `£${membership.price.toFixed(0)}`
    : 'Contact';

  return (
    <a
      href={membership.signUpUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...pixelAttrs(membership)}
      className="group block p-6 bg-white border border-[#1a260e]/10 rounded-xl hover:border-[#1a260e]/20 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-lg font-light text-[#1a260e] mb-1 truncate">
            {membership.name}
          </h4>
          <p className="text-sm text-[#1a260e]/60 line-clamp-1">
            {membership.shortDescription || membership.description}
          </p>
          {membership.classesPerMonth && (
            <p className="text-xs text-green-700 mt-2 font-medium">
              {membership.classesPerMonth === 'unlimited'
                ? 'Unlimited'
                : `${membership.classesPerMonth} classes/mo`}
            </p>
          )}
        </div>

        <div className="text-right flex-shrink-0">
          <p className="font-serif text-2xl font-light text-[#1a260e]">
            {formattedPrice}
          </p>
          <p className="text-xs text-[#1a260e]/60 mt-1">/month</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#1a260e]/10">
        <div className="flex items-center text-sm text-[#1a260e] font-medium opacity-70 group-hover:opacity-100 transition-opacity">
          View Details
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}
