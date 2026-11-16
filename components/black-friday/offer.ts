/**
 * Black Friday 2026: "One more, on us".
 *
 * Everything specific to the offer lives here: the end time, the extra
 * classes, which plans are part of it and their Momence checkout links.
 * Prices, class counts and terms are read from the site's own data
 * (components/pricing/plans.ts and lib/site.ts), never repeated here.
 *
 * PLACEHOLDERS — search this file for "PLACEHOLDER". Each one is waiting on
 * an answer from the studio. While a checkout link is null its button is
 * drawn as a marked "link pending" pill, never as a link, and the page stays
 * out of search engines, the sitemap and llms.txt (BF_HAS_PLACEHOLDERS).
 */
import { EUFORYC_PACKAGE, MEMBERSHIPS, type Membership, type PackOption } from '@/components/pricing/plans';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { PRICING } from '@/lib/site';

export const BF_PATH = '/black-friday';
export const BF_NAME = 'One more, on us';
export const BF_LINE = 'No price drops. Just a little more of what you love.';

// Sunday 29 November 2026, Europe/London. The UK is on GMT (UTC+0) in
// November, so UTC and London time are the same.
// PLACEHOLDER (time of day): 23:59:59 until the exact end time is confirmed.
export const BF_ENDS_AT = Date.UTC(2026, 10, 29, 23, 59, 59);
export const BF_END_DATE = 'Sunday 29 November 2026';

/** True once the offer's end time has passed */
export const blackFridayEnded = (now: number = Date.now()) => now >= BF_ENDS_AT;

// ---------------------------------------------------------------------------
// Memberships: same price, extra classes every month for the first 6 months
// ---------------------------------------------------------------------------

export const BF_BONUS_MONTHS = 6;

// Classes a month during the offer, by membership name
const CLASSES_WITH_BONUS: Record<string, number> = {
  'Euforyc 4': 5,
  'Euforyc 8': 10,
  'Euforyc 12': 15,
};

// PLACEHOLDER: the Black Friday checkout link for each membership, e.g.
// 'https://momence.com/m/123456'. null = not supplied yet.
const MEMBERSHIP_CHECKOUT: Record<string, string | null> = {
  'Euforyc 4': null,
  'Euforyc 8': null,
  'Euforyc 12': null,
  'Euforyc Unlimited': null,
};

export interface BfMembership {
  id: string;
  plan: Membership;
  /** Classes a month during the offer; null for Unlimited */
  classesWithBonus: number | null;
  /** Free classes across the bonus months; null for Unlimited */
  freeClasses: number | null;
  checkoutUrl: string | null;
}

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export const BF_MEMBERSHIPS: BfMembership[] = MEMBERSHIPS.map((plan) => {
  const classesWithBonus = plan.classes === null ? null : CLASSES_WITH_BONUS[plan.name];
  if (plan.classes !== null && !classesWithBonus) throw new Error(`No Black Friday bonus set for ${plan.name}`);
  return {
    id: `bf-${slug(plan.name)}`,
    plan,
    classesWithBonus,
    freeClasses: classesWithBonus && plan.classes ? (classesWithBonus - plan.classes) * BF_BONUS_MONTHS : null,
    checkoutUrl: MEMBERSHIP_CHECKOUT[plan.name] ?? null,
  };
});

/** The most free classes any membership gives across the bonus months (18) */
export const BF_MAX_FREE_CLASSES = Math.max(...BF_MEMBERSHIPS.map((m) => m.freeClasses ?? 0));

export const BF_UNLIMITED_GIFT = 'A complimentary dermaplaning facial at Euforyc Skin Studio';

/** "6-month minimum term, then monthly rolling" — from the site's membership terms */
export const MEMBERSHIP_TERM = PRICING.membership.note.split('. ')[0];

// ---------------------------------------------------------------------------
// Class packages: buy an eligible package, get 1 extra class
// ---------------------------------------------------------------------------

export const BF_PACKAGE_EXTRA_CLASSES = 1;

// PLACEHOLDER (which packages are eligible): the three Euforyc Package class
// packs, until the eligible list is confirmed. Add or remove names here.
// PLACEHOLDER (links): the Black Friday checkout link for each. null = not supplied yet.
const PACKAGE_CHECKOUT: Record<string, string | null> = {
  '4 Classes': null,
  '8 Classes': null,
  '12 Classes': null,
};

export interface BfPackage {
  id: string;
  option: PackOption;
  checkoutUrl: string | null;
}

export const BF_PACKAGES: BfPackage[] = EUFORYC_PACKAGE.filter((option) => option.name in PACKAGE_CHECKOUT).map(
  (option) => ({
    id: `bf-euforyc-package-${slug(option.name)}`,
    option,
    checkoutUrl: PACKAGE_CHECKOUT[option.name],
  })
);

/** "valid 30 days from your first class" — from the site's package terms */
export const PACKAGE_VALIDITY = PRICING.euforycPackage.note.split(', ').slice(-1)[0];

/** True while any checkout link is still missing */
export const BF_HAS_PLACEHOLDERS = [...BF_MEMBERSHIPS, ...BF_PACKAGES].some((offer) => !offer.checkoutUrl);

// ---------------------------------------------------------------------------
// Group classes the extra classes can be used on (the current class list)
// ---------------------------------------------------------------------------

export const BF_GROUP_CLASSES = ORDERED_CLASS_TYPES.filter((classType) => !classType.slug.startsWith('private')).map(
  (classType) => classType.name
);

// ---------------------------------------------------------------------------
// Tracking: the data-* attributes the layout's checkout click tracking reads
// ---------------------------------------------------------------------------

export function bfMembershipTracking(offer: BfMembership, category: string) {
  return {
    'data-offer-id': offer.id,
    'data-content-name': `Black Friday ${offer.plan.name} £${offer.plan.price}/mo`,
    'data-content-type': 'membership',
    'data-content-category': category,
    'data-value': String(offer.plan.price),
    'data-currency': 'GBP',
  };
}

export function bfPackageTracking(offer: BfPackage, category: string) {
  return {
    'data-offer-id': offer.id,
    'data-content-name': `Black Friday Euforyc Package ${offer.option.name} £${offer.option.price}`,
    'data-content-type': 'euforyc_package',
    'data-content-category': category,
    'data-value': String(offer.option.price),
    'data-currency': 'GBP',
  };
}

// ---------------------------------------------------------------------------
// FAQ and terms
// ---------------------------------------------------------------------------

export interface BfFaq {
  question: string;
  answer: string;
}

const bonusList = BF_MEMBERSHIPS.filter((m) => m.classesWithBonus)
  .map((m) => `${m.plan.name} goes from ${m.plan.classes} to ${m.classesWithBonus} classes a month`)
  .join(', ');

/** Answered from facts already confirmed. Also published as FAQ structured data. */
export const BF_FAQS: BfFaq[] = [
  {
    question: 'When does the offer end?',
    answer: `The offer ends on ${BF_END_DATE}, UK time.`,
  },
  {
    question: 'Has the price changed?',
    answer: `No. Every membership and class package is the same price as usual. With a membership you get extra classes every month for your first ${BF_BONUS_MONTHS} months: ${bonusList}.`,
  },
  {
    question: 'Is there a minimum term?',
    answer: `Yes. Euforyc Memberships have a ${MEMBERSHIP_TERM.charAt(0).toLowerCase()}${MEMBERSHIP_TERM.slice(1)}. Class packages have no contract and are ${PACKAGE_VALIDITY}.`,
  },
  {
    question: 'Which classes can I use them on?',
    answer: `Any Euforyc group class: ${BF_GROUP_CLASSES.join(', ')}.`,
  },
  {
    question: `Is the ${PRICING.introOffer.name} intro offer part of Black Friday?`,
    answer: `No. ${PRICING.introOffer.name} is our intro offer for first-time clients and is separate from this Black Friday offer.`,
  },
];

// PLACEHOLDER: questions that need an answer from the studio before they can
// be written. Shown on the page as marked "answer pending" rows, left out of
// the structured data. Move each into BF_FAQS once answered.
export const BF_FAQS_PENDING: string[] = [
  'Who qualifies: new sign-ups only, or existing members who upgrade too?',
  'Do unused extra classes roll over to the next month?',
  'How is the dermaplaning facial booked, and is it one facial or one every month?',
];

/** Plain-English terms, from confirmed facts only */
export const BF_TERMS: string[] = [
  `The offer ends on ${BF_END_DATE}, UK time.`,
  `Memberships stay at their usual monthly price. ${bonusList.charAt(0).toUpperCase()}${bonusList.slice(1)}, every month for your first ${BF_BONUS_MONTHS} months.`,
  `Euforyc Memberships have a ${MEMBERSHIP_TERM.charAt(0).toLowerCase()}${MEMBERSHIP_TERM.slice(1)}.`,
  `Euforyc Unlimited: ${BF_UNLIMITED_GIFT.charAt(0).toLowerCase()}${BF_UNLIMITED_GIFT.slice(1)}.`,
  `Class packages: buy an eligible class package and get ${BF_PACKAGE_EXTRA_CLASSES} extra class. Packages are ${PACKAGE_VALIDITY}.`,
  'Extra classes can be used on any Euforyc group class.',
  `The ${PRICING.introOffer.name} intro offer is not part of this offer.`,
];
