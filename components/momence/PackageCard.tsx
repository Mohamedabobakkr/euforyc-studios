/**
 * PackageCard Component
 * Dark-themed package card with Euforyc Studios brand design
 */

import React from 'react';
import { Package, Sparkles, ExternalLink, Clock, Calendar, Tag } from 'lucide-react';
import { MomenceProduct } from '@/lib/types/momence';

interface PackageCardProps {
  product: MomenceProduct;
  showBadge?: boolean;
}

// Returns data-* attributes used by the global pixel click handler to fire
// InitiateCheckout with real values and bridge identifiers to Momence.
function pixelAttrs(product: MomenceProduct, category = '/packages') {
  const offerId = product.id
    ? `package-${product.id}`
    : `package-${product.name.toLowerCase().replace(/\s+/g, '-')}`;
  return {
    'data-offer-id': offerId,
    'data-content-name': product.name,
    'data-content-type': product.isIntroOffer ? 'intro_offer' : 'package',
    'data-content-category': category,
    'data-value': product.price ? product.price.toFixed(2) : '0',
    'data-currency': 'GBP',
  } as const;
}

export default function PackageCard({ product, showBadge = true }: PackageCardProps) {
  // Format price
  const formattedPrice = product.price ? `£${product.price.toFixed(0)}` : 'Contact Us';

  // Calculate savings if compare price exists
  const savings =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? `save £${(product.compareAtPrice - product.price).toFixed(0)}`
      : null;

  // Determine if this is a special package (unlimited, intro, etc.)
  const isSpecial =
    product.isPopular ||
    product.isIntroOffer ||
    product.name.toLowerCase().includes('unlimited');

  return (
    <a
      href={product.purchaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...pixelAttrs(product)}
      className="group relative bg-[#1a260e] text-[#fffcf2] rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
      aria-label={`Purchase ${product.name} package`}
    >
      {/* Special Badge */}
      {showBadge && isSpecial && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-3 rounded-full shadow-lg animate-pulse">
          <Sparkles className="h-5 w-5" />
        </div>
      )}

      {/* Intro Offer Badge */}
      {product.isIntroOffer && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide flex items-center shadow-lg">
            <Tag className="w-4 h-4 mr-1.5" />
            INTRO OFFER
          </div>
        </div>
      )}

      {/* Product badges from API */}
      {product.badges && product.badges.length > 0 && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          {product.badges.slice(0, 2).map((badge, index) => (
            <span
              key={index}
              className="bg-[#fffcf2]/20 backdrop-blur-sm text-[#fffcf2] px-3 py-1 rounded-full text-xs font-bold tracking-wide"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      <div className="text-center space-y-5 relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 bg-[#fffcf2]/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#fffcf2]/20 transition-colors duration-300">
          <Package className="h-8 w-8 text-[#fffcf2]/80 group-hover:text-[#fffcf2] transition-colors duration-300" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-light leading-tight">{product.name}</h3>
          {product.shortDescription && (
            <p className="text-sm text-[#fffcf2]/70">{product.shortDescription}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-1">
          <p className="font-serif text-4xl font-light">{formattedPrice}</p>
          {savings && (
            <p className="font-sans text-sm text-green-400 font-semibold">{savings}</p>
          )}
        </div>

        {/* Package Details */}
        {(product.classCount || product.validityDays) && (
          <div className="flex items-center justify-center gap-4 text-sm text-[#fffcf2]/70">
            {product.classCount && (
              <div className="flex items-center gap-1.5">
                <Package className="w-4 h-4" />
                <span>
                  {product.classCount === -1 ? 'Unlimited' : `${product.classCount} classes`}
                </span>
              </div>
            )}
            {product.validityDays && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{product.validityDays} days</span>
              </div>
            )}
          </div>
        )}

        {/* Expiration Info */}
        {product.expirationDate && (
          <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3">
            <div className="flex items-center justify-center gap-2 text-xs text-orange-300">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">
                Expires:{' '}
                {new Date(product.expirationDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        )}

        {/* Description */}
        {product.description && !product.shortDescription && (
          <p className="text-sm text-[#fffcf2]/70 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Availability */}
        {product.availableSlots !== undefined &&
          product.maxPurchases !== undefined &&
          product.availableSlots < product.maxPurchases * 0.3 && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-yellow-400">
                Only {product.availableSlots} left!
              </p>
            </div>
          )}

        {/* CTA */}
        <div className="flex items-center justify-center text-[#fffcf2] opacity-0 group-hover:opacity-100 transition-opacity pt-2">
          <span className="font-sans text-sm font-medium mr-2">
            {product.isIntroOffer ? 'Claim Offer' : 'Purchase Package'}
          </span>
          <ExternalLink className="h-4 w-4" />
        </div>

        {/* Restrictions */}
        {product.restrictions && product.restrictions.length > 0 && (
          <div className="pt-4 border-t border-[#fffcf2]/10">
            <p className="text-xs text-[#fffcf2]/50">{product.restrictions[0]}</p>
          </div>
        )}
      </div>

      {/* Inactive/Unavailable Overlay */}
      {!product.isActive && (
        <div className="absolute inset-0 bg-[#1a260e]/90 rounded-2xl flex items-center justify-center backdrop-blur-sm z-20">
          <div className="text-center">
            <p className="font-serif text-xl font-light text-[#fffcf2]/70">
              Currently Unavailable
            </p>
          </div>
        </div>
      )}
    </a>
  );
}

/**
 * Compact package card for sidebars or lists
 */
export function CompactPackageCard({ product }: { product: MomenceProduct }) {
  const formattedPrice = product.price ? `£${product.price.toFixed(0)}` : 'Contact';

  return (
    <a
      href={product.purchaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...pixelAttrs(product)}
      className="group block p-4 bg-[#1a260e] text-[#fffcf2] rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Icon and Details */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-[#fffcf2]/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-[#fffcf2]/80" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-serif text-base font-light text-[#fffcf2] truncate mb-1">
              {product.name}
            </h4>
            {product.classCount && (
              <p className="text-xs text-[#fffcf2]/60">
                {product.classCount === -1 ? 'Unlimited' : `${product.classCount} classes`}
              </p>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          <p className="font-serif text-xl font-light text-[#fffcf2]">{formattedPrice}</p>
          {product.isIntroOffer && (
            <span className="text-xs text-green-400 font-medium">Intro</span>
          )}
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="mt-3 pt-3 border-t border-[#fffcf2]/10">
        <div className="flex items-center text-sm text-[#fffcf2]/70 group-hover:text-[#fffcf2] transition-colors">
          <span className="font-medium">View Details</span>
          <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}

/**
 * Featured intro package card with special styling
 */
export function FeaturedIntroCard({ product }: { product: MomenceProduct }) {
  const formattedPrice = product.price ? `£${product.price.toFixed(0)}` : 'Contact';

  return (
    <a
      href={product.purchaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...pixelAttrs(product, '/packages/intro')}
      className="block bg-gradient-to-br from-green-600 via-green-500 to-green-600 text-white rounded-2xl p-8 relative overflow-hidden shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:-translate-y-2"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 text-center space-y-5">
        {/* Icon */}
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
          <Sparkles className="h-8 w-8 text-white" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-3xl font-light">{product.name}</h3>

        {/* Price */}
        <div>
          <p className="font-serif text-5xl font-light">{formattedPrice}</p>
          <p className="font-sans text-sm text-white/90 font-medium mt-2 bg-white/20 inline-block px-4 py-1 rounded-full">
            First-time offer
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-white/90 leading-relaxed max-w-md mx-auto">
          {product.description || product.shortDescription}
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <span className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
            Claim Intro Offer
            <ExternalLink className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  );
}
