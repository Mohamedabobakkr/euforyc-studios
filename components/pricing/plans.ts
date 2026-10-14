/**
 * Memberships, packages and private packs as they appear on /memberships,
 * /packages and /pricing: the same names, prices, savings and Momence
 * checkout links. Prices come from PRICING in lib/site.ts.
 */
import { PRICING } from '@/lib/site';

const priceOf = (tiers: readonly { name: string; price: number }[], name: string) => {
  const tier = tiers.find((t) => t.name.startsWith(name));
  if (!tier) throw new Error(`No price for ${name}`);
  return tier.price;
};

const CLASS_TYPES = 'Reformer, Hot Pilates, Red Light, Sculpt Mat Pilates, Barre & Belly Dance';

export interface Membership {
  name: string;
  sub: string;
  price: number;
  /** Classes a month; null for unlimited */
  classes: number | null;
  perClass: string;
  features: string[];
  note?: string;
  url: string;
}

const m = PRICING.membership.tiers;

export const MEMBERSHIPS: Membership[] = [
  {
    name: 'Euforyc 4',
    sub: 'Once a week',
    price: priceOf(m, 'Euforyc 4'),
    classes: 4,
    perClass: '£22.50 per class',
    features: ['4 class credits per month', 'Use across the full group timetable', CLASS_TYPES],
    url: 'https://momence.com/m/937341',
  },
  {
    name: 'Euforyc 8',
    sub: 'Twice a week',
    price: priceOf(m, 'Euforyc 8'),
    classes: 8,
    perClass: '£20.63 per class',
    features: ['8 class credits per month', 'Use across the full group timetable', CLASS_TYPES],
    url: 'https://momence.com/m/937345',
  },
  {
    name: 'Euforyc 12',
    sub: 'Three times a week',
    price: priceOf(m, 'Euforyc 12'),
    classes: 12,
    perClass: '£20 per class',
    features: ['12 class credits per month', 'Use across the full group timetable', CLASS_TYPES],
    url: 'https://momence.com/m/937346',
  },
  {
    name: 'Euforyc Unlimited',
    sub: 'The complete Euforyc experience',
    price: priceOf(m, 'Euforyc Unlimited'),
    classes: null,
    perClass: 'Best value · unlimited classes',
    features: [
      'Unlimited Euforyc classes',
      '24 hour priority booking',
      '1 free 30-minute massage per month',
      '1 guest class pass per month',
      '1 complimentary nutrition consultation + personalised nutrition starter plan with our Registered Dietitian (one-time joining benefit)',
      'Exclusive Euforyc tote bag when joining (one-time)',
      '10% off all food and drinks at Euforyc Sips',
      '10% off Euforyc merchandise',
      '10% off treatments at Euforyc Skin Studio',
      'Complimentary Euforyc Social membership',
      'Preferential pricing on selected Euforyc events and experiences',
    ],
    note: "Massage and guest pass are non-transferable, don't roll over and expire each month.",
    url: 'https://momence.com/m/937348',
  },
];

export interface PackOption {
  name: string;
  price: number;
  note?: string;
  url: string;
}

const p = PRICING.euforycPackage.tiers;
const mv = PRICING.movePackage.tiers;
const pr = PRICING.privateSession.tiers;

export const EUFORYC_PACKAGE: PackOption[] = [
  { name: '4 Classes', price: priceOf(p, '4 classes'), note: 'save £7', url: 'https://momence.com/m/632399' },
  { name: '8 Classes', price: priceOf(p, '8 classes'), note: 'save £34', url: 'https://momence.com/m/632400' },
  { name: '12 Classes', price: priceOf(p, '12 classes'), note: 'save £66', url: 'https://momence.com/m/632401' },
  { name: '30 Days Unlimited', price: priceOf(p, '30 Days Unlimited'), note: 'Unlimited', url: 'https://momence.com/m/938674' },
];

export const MOVE_PACKAGE: PackOption[] = [
  { name: '4 Classes', price: priceOf(mv, '4 classes'), note: 'save £10', url: 'https://momence.com/m/707786' },
  { name: '8 Classes', price: priceOf(mv, '8 classes'), note: 'save £25', url: 'https://momence.com/m/707788' },
];

export const PRIVATE_PACKS: PackOption[] = [
  { name: '4 Sessions', price: priceOf(pr, '4 sessions'), note: 'save £50', url: 'https://momence.com/m/473317' },
  { name: '8 Sessions', price: priceOf(pr, '8 sessions'), note: 'save £110', url: 'https://momence.com/m/473318' },
  { name: '12 Sessions', price: priceOf(pr, '12 sessions'), note: 'save £200', url: 'https://momence.com/m/473321' },
];

export const PRIVATE_SINGLE = priceOf(pr, 'Single session');

export const TRY_IT_ALL = {
  name: PRICING.introOffer.name,
  classes: PRICING.introOffer.classes,
  price: PRICING.introOffer.price,
  url: 'https://momence.com/m/631782',
};

// EUFORYC5: 5% off the first month of a membership, until 30 November 2026,
// 23:59 Europe/London (GMT in November). Same deadline as /offers.
export const PROMO_CODE = 'EUFORYC5';
export const PROMO_ENDS_AT = Date.UTC(2026, 10, 30, 23, 59, 59);

/** data-* attributes the layout's booking click tracking reads */
export function membershipTracking(plan: Membership, category: string) {
  return {
    'data-offer-id': `membership-${plan.name.toLowerCase().replace(/\s+/g, '-')}`,
    'data-content-name': `${plan.name} £${plan.price}/mo`,
    'data-content-type': 'membership',
    'data-content-category': category,
    'data-value': String(plan.price),
    'data-currency': 'GBP',
  };
}

export function packTracking(kind: 'euforyc_package' | 'move_package' | 'private_pack', option: PackOption, category: string) {
  return {
    'data-offer-id': `${kind.replace('_', '-')}-${option.name.toLowerCase().replace(/\s+/g, '-')}`,
    'data-content-name': `${option.name} £${option.price}`,
    'data-content-type': kind,
    'data-content-category': category,
    'data-value': String(option.price),
    'data-currency': 'GBP',
  };
}

export function tryItAllTracking(category: string) {
  return {
    'data-offer-id': 'try-all',
    'data-content-name': `${TRY_IT_ALL.name} ${TRY_IT_ALL.classes} Classes £${TRY_IT_ALL.price}`,
    'data-content-type': 'intro_offer',
    'data-content-category': category,
    'data-value': String(TRY_IT_ALL.price),
    'data-currency': 'GBP',
  };
}
