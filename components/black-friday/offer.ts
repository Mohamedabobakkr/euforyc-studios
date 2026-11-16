/**
 * Black Friday 2026: "More, on us".
 *
 * Everything specific to the offer lives here: the end time, the extra
 * classes, which plans are part of it and their Momence checkout links.
 * Prices, class counts and terms are read from the site's own data
 * (components/pricing/plans.ts and lib/site.ts), never repeated here.
 *
 * Checkout links are the Black Friday products the studio created in
 * Momence. If one is ever set to null its button is drawn as a marked
 * "link pending" pill, never as a link, and the page stays out of search
 * engines, the sitemap and llms.txt (BF_HAS_PLACEHOLDERS).
 */
import {
  EUFORYC_PACKAGE,
  MEMBERSHIPS,
  MOVE_PACKAGE,
  type Membership,
  type PackOption,
} from '@/components/pricing/plans';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { PRICING } from '@/lib/site';

export const BF_PATH = '/black-friday';
export const BF_NAME = 'More, on us';
export const BF_LINE = 'No price drops. Just a little more of what you love.';

// Sunday 29 November 2026, Europe/London. The UK is on GMT (UTC+0) in
// November, so UTC and London time are the same. The offer runs to the end
// of the day: 23:59:59.
export const BF_ENDS_AT = Date.UTC(2026, 10, 29, 23, 59, 59);
export const BF_END_DATE = 'Sunday 29 November 2026';

/** True once the offer's end time has passed */
export const blackFridayEnded = (now: number = Date.now()) => now >= BF_ENDS_AT;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

// "23:59", the end time as a UK clock reads it
const BF_END_CLOCK = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/London',
}).format(BF_ENDS_AT);

/**
 * How long the offer has left, in plain words: "13 days left", then "Ends
 * tomorrow night", "Ends tonight at 23:59" and "Final hour". Empty once it
 * has ended. The offer ends at the end of a UK day, so whole days left are
 * the same as calendar days left in the UK.
 */
export function bfTimeLeft(now: number = Date.now()): string {
  const remaining = BF_ENDS_AT - now;
  if (remaining <= 0) return '';
  const days = Math.floor(remaining / DAY_MS);
  if (days >= 2) return `${days} days left`;
  if (days === 1) return 'Ends tomorrow night';
  if (remaining > HOUR_MS) return `Ends tonight at ${BF_END_CLOCK}`;
  return 'Final hour';
}

/**
 * A one-line script that runs before the page is drawn. If the page's HTML
 * was built before the end time and the offer has ended since, it marks
 * <html> so CSS can hide the offer straight away, until React takes over.
 */
export const HIDE_IF_ENDED = `if(Date.now()>=${BF_ENDS_AT})document.documentElement.setAttribute('data-bf-ended','')`;

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

// The Black Friday membership for each plan, in Momence
const MEMBERSHIP_CHECKOUT: Record<string, string | null> = {
  'Euforyc 4': 'https://momence.com/m/982800',
  'Euforyc 8': 'https://momence.com/m/982801',
  'Euforyc 12': 'https://momence.com/m/982805',
  'Euforyc Unlimited': 'https://momence.com/m/982806',
};

export interface BfMembership {
  id: string;
  plan: Membership;
  /** Classes a month during the offer; null for Unlimited */
  classesWithBonus: number | null;
  /** Free classes across the bonus months; null for Unlimited */
  freeClasses: number | null;
  /** "£18": the monthly price shared across the classes with the bonus; null for Unlimited */
  perClassWithBonus: string | null;
  /** "£22.50": the same, across the usual number of classes; null for Unlimited */
  perClassUsual: string | null;
  /** Classes across the bonus months with the offer (30) and without it (24); null for Unlimited */
  classesInBonusMonths: number | null;
  classesUsuallyInBonusMonths: number | null;
  /** "£135": the free classes at the membership's usual price per class; null for Unlimited */
  freeClassesWorth: string | null;
  checkoutUrl: string | null;
}

// £18, £16.50, £22.50: whole pounds without pence, otherwise two decimals
const pounds = (amount: number) => `£${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

export const BF_MEMBERSHIPS: BfMembership[] = MEMBERSHIPS.map((plan) => {
  const classesWithBonus = plan.classes === null ? null : CLASSES_WITH_BONUS[plan.name];
  if (plan.classes !== null && !classesWithBonus) throw new Error(`No Black Friday bonus set for ${plan.name}`);
  return {
    id: `bf-${slug(plan.name)}`,
    plan,
    classesWithBonus,
    freeClasses: classesWithBonus && plan.classes ? (classesWithBonus - plan.classes) * BF_BONUS_MONTHS : null,
    perClassWithBonus: classesWithBonus ? pounds(plan.price / classesWithBonus) : null,
    perClassUsual: classesWithBonus && plan.classes ? pounds(plan.price / plan.classes) : null,
    classesInBonusMonths: classesWithBonus ? classesWithBonus * BF_BONUS_MONTHS : null,
    classesUsuallyInBonusMonths: classesWithBonus && plan.classes ? plan.classes * BF_BONUS_MONTHS : null,
    freeClassesWorth:
      classesWithBonus && plan.classes
        ? pounds(((classesWithBonus - plan.classes) * BF_BONUS_MONTHS * plan.price) / plan.classes)
        : null,
    checkoutUrl: MEMBERSHIP_CHECKOUT[plan.name] ?? null,
  };
});

/** The most free classes any membership gives across the bonus months (18) */
export const BF_MAX_FREE_CLASSES = Math.max(...BF_MEMBERSHIPS.map((m) => m.freeClasses ?? 0));

/** "£360": what those free classes are worth at that membership's usual price per class */
export const BF_MAX_FREE_CLASSES_WORTH =
  BF_MEMBERSHIPS.find((m) => m.freeClasses === BF_MAX_FREE_CLASSES)?.freeClassesWorth ?? '';

export const BF_UNLIMITED_GIFT = 'A complimentary dermaplaning facial at Euforyc Skin Studio';
/** One facial a month, for the same months as the extra classes */
export const BF_UNLIMITED_GIFT_EVERY = `one every month for your first ${BF_BONUS_MONTHS} months`;

/** "6-month minimum term, then monthly rolling" — from the site's membership terms */
export const MEMBERSHIP_TERM = PRICING.membership.note.split('. ')[0];

// ---------------------------------------------------------------------------
// Class packages: buy an eligible package, get 1 extra class
// ---------------------------------------------------------------------------

export const BF_PACKAGE_EXTRA_CLASSES = 1;

// The eligible packages and their Black Friday products in Momence: the
// Euforyc Package 4, 8 and 12 Classes and the MOVE Package 4 and 8 Classes.
// (30 Days Unlimited is not part of the offer.)
const EUFORYC_PACKAGE_CHECKOUT: Record<string, string | null> = {
  '4 Classes': 'https://momence.com/m/982809',
  '8 Classes': 'https://momence.com/m/982810',
  '12 Classes': 'https://momence.com/m/982814',
};

const MOVE_PACKAGE_CHECKOUT: Record<string, string | null> = {
  '4 Classes': 'https://momence.com/m/982817',
  '8 Classes': 'https://momence.com/m/982819',
};

/** "Sculpt Mat Pilates and Belly Dance classes only" — from the site's MOVE Package terms */
export const MOVE_PACKAGE_COVERS = PRICING.movePackage.note.split(', ')[0];

export interface BfPackage {
  id: string;
  kind: 'euforyc_package' | 'move_package';
  /** "Euforyc Package" or "MOVE Package" */
  label: string;
  /** Which classes the package can be used on */
  covers: string;
  /** "£26.25": the extra class at the package's usual price per class */
  extraClassWorth: string;
  option: PackOption;
  checkoutUrl: string | null;
}

const bfPackages = (
  kind: BfPackage['kind'],
  label: string,
  covers: string,
  options: PackOption[],
  checkout: Record<string, string | null>
): BfPackage[] =>
  options
    .filter((option) => option.name in checkout)
    .map((option) => ({
      id: `bf-${slug(label)}-${slug(option.name)}`,
      kind,
      label,
      covers,
      // "4 Classes" at £105 is £26.25 a class
      extraClassWorth: pounds((option.price / parseInt(option.name, 10)) * BF_PACKAGE_EXTRA_CLASSES),
      option,
      checkoutUrl: checkout[option.name],
    }));

export const BF_PACKAGES: BfPackage[] = [
  ...bfPackages(
    'euforyc_package',
    'Euforyc Package',
    PRICING.euforycPackage.note.split(', ')[0],
    EUFORYC_PACKAGE,
    EUFORYC_PACKAGE_CHECKOUT
  ),
  ...bfPackages('move_package', 'MOVE Package', MOVE_PACKAGE_COVERS, MOVE_PACKAGE, MOVE_PACKAGE_CHECKOUT),
];

/** "£26.25": the most an extra class is worth across the eligible packages */
export const BF_MAX_EXTRA_CLASS_WORTH = BF_PACKAGES.reduce(
  (best, offer) => (parseFloat(offer.extraClassWorth.slice(1)) > parseFloat(best.slice(1)) ? offer.extraClassWorth : best),
  '£0'
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
    'data-content-name': `Black Friday ${offer.label} ${offer.option.name} £${offer.option.price}`,
    'data-content-type': offer.kind,
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

// "4, 8 and 12": the usual classes a month, which is what memberships go back to
const usualClasses = BF_MEMBERSHIPS.filter((m) => m.plan.classes).map((m) => String(m.plan.classes));
const usualClassesList = `${usualClasses.slice(0, -1).join(', ')} and ${usualClasses[usualClasses.length - 1]}`;

/** What ends with the offer. All of it follows from the offer's own terms. */
export const BF_AFTER_MEMBERSHIPS = `After ${BF_END_DATE}, memberships go back to ${usualClassesList} classes a month.`;
export const BF_AFTER_PACKAGES = `The extra class only comes with packages bought by ${BF_END_DATE}.`;

const lowerFirst = (text: string) => `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
const upperFirst = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

// "Euforyc Package 4, 8 or 12 Classes, or MOVE Package 4 or 8 Classes"
const eligiblePackages = BF_PACKAGES.map((offer) => offer.label)
  .filter((label, index, labels) => labels.indexOf(label) === index)
  .map((label) => {
    const sizes = BF_PACKAGES.filter((offer) => offer.label === label).map((offer) => offer.option.name.split(' ')[0]);
    const list = sizes.length > 1 ? `${sizes.slice(0, -1).join(', ')} or ${sizes[sizes.length - 1]}` : sizes[0];
    return `${label} ${list} Classes`;
  })
  .join(', or ');

const moveNote = `The MOVE Package is for ${MOVE_PACKAGE_COVERS}.`;

/** Also published as FAQ structured data */
export const BF_FAQS: BfFaq[] = [
  {
    question: 'When does the offer end?',
    answer: `The offer ends on ${BF_END_DATE}, UK time.`,
  },
  {
    question: `What happens after ${BF_END_DATE}?`,
    answer: `The offer closes. Memberships go back to ${usualClassesList} classes a month and class packages to their usual number of classes. If you join before then, you keep your extra classes every month for your first ${BF_BONUS_MONTHS} months.`,
  },
  {
    question: 'Has the price changed?',
    answer: `No. Every membership and class package is the same price as usual. With a membership you get extra classes every month for your first ${BF_BONUS_MONTHS} months: ${bonusList}.`,
  },
  {
    question: 'I am already a member. Can I get this offer?',
    answer: 'Yes, when you upgrade. Existing members need to upgrade their membership to qualify for this offer.',
  },
  {
    question: 'How does the dermaplaning facial work?',
    answer: `It comes with Euforyc Unlimited: ${lowerFirst(BF_UNLIMITED_GIFT)}, ${BF_UNLIMITED_GIFT_EVERY}. Once you have joined, you book it with your membership.`,
  },
  {
    question: 'Which class packages are part of it?',
    answer: `${eligiblePackages}. Each comes with ${BF_PACKAGE_EXTRA_CLASSES} extra class at the usual price.`,
  },
  {
    question: 'Which classes can I use them on?',
    answer: `Any Euforyc group class: ${BF_GROUP_CLASSES.join(', ')}. ${moveNote}`,
  },
  {
    question: 'Do unused classes roll over to the next month?',
    // The site's standing membership term (see /memberships)
    answer: 'No. As with every Euforyc Membership, unused credits don’t roll over.',
  },
  {
    question: 'Is there a minimum term?',
    answer: `Yes. Euforyc Memberships have a ${lowerFirst(MEMBERSHIP_TERM)}. Class packages have no contract and are ${PACKAGE_VALIDITY}.`,
  },
  {
    question: `Is the ${PRICING.introOffer.name} intro offer part of Black Friday?`,
    answer: `No. ${PRICING.introOffer.name} is our intro offer for first-time clients and is separate from this Black Friday offer.`,
  },
];

/** Plain-English terms */
export const BF_TERMS: string[] = [
  `The offer ends on ${BF_END_DATE}, UK time.`,
  `Memberships stay at their usual monthly price. ${upperFirst(bonusList)}, every month for your first ${BF_BONUS_MONTHS} months.`,
  `Euforyc Memberships have a ${lowerFirst(MEMBERSHIP_TERM)}. Unused credits don’t roll over.`,
  'Existing members need to upgrade their membership to qualify.',
  `Euforyc Unlimited: ${lowerFirst(BF_UNLIMITED_GIFT)}, ${BF_UNLIMITED_GIFT_EVERY}, booked with your membership.`,
  `Class packages: buy an eligible class package (${eligiblePackages}) and get ${BF_PACKAGE_EXTRA_CLASSES} extra class. Packages are ${PACKAGE_VALIDITY}.`,
  `Extra classes can be used on any Euforyc group class. ${moveNote}`,
  `The ${PRICING.introOffer.name} intro offer is not part of this offer.`,
  '“Worth” figures use the usual price per class of the same membership or class package.',
];
