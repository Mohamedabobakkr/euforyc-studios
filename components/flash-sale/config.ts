/**
 * Black Friday flash sale, Friday 27 November 2026: the public facts.
 *
 * Everything in this file is safe to ship to the browser: the times, the
 * prices and the words. The password, the two discount codes and the Momence
 * checkout link are NOT here and never may be. They live in server
 * environment variables and are read only by lib/flash-sale.ts.
 */

export const FLASH_PATH = '/flash';

// All times are London time on Friday 27 November 2026. The UK is on GMT
// (UTC+0) in November, so UTC and London time are the same.
/** 12:00:00, the door opens to password holders */
export const FLASH_VIP_AT = Date.UTC(2026, 10, 27, 12, 0, 0);
/** 18:00:00, the door opens to everyone */
export const FLASH_PUBLIC_AT = Date.UTC(2026, 10, 27, 18, 0, 0);
/** 23:59:59, the last second the sale is open */
export const FLASH_LAST_SECOND = Date.UTC(2026, 10, 27, 23, 59, 59);
/** Midnight, one second later: the sale is over from here on */
export const FLASH_ENDS_AT = FLASH_LAST_SECOND + 1000;

export const FLASH_DATE = 'Friday 27 November';

export type FlashPhase = 'teaser' | 'vip' | 'public' | 'ended';

/** Which part of the day a moment falls in. The server is the only authority on "now". */
export function phaseAt(now: number): FlashPhase {
  if (now < FLASH_VIP_AT) return 'teaser';
  if (now < FLASH_PUBLIC_AT) return 'vip';
  if (now < FLASH_ENDS_AT) return 'public';
  return 'ended';
}

/** The moment the given phase gives way to the next one; null once it is over */
export function nextPhaseAt(phase: FlashPhase): number | null {
  if (phase === 'teaser') return FLASH_VIP_AT;
  if (phase === 'vip') return FLASH_PUBLIC_AT;
  if (phase === 'public') return FLASH_ENDS_AT;
  return null;
}

/** What GET /api/flash/state answers with. `code` and `checkoutUrl` only when entitled. */
export interface FlashState {
  phase: FlashPhase;
  /** The server's clock, in milliseconds */
  serverNow: number;
  nextPhaseAt: number | null;
  /** True once the studio has marked the 20 password codes as used up */
  soldOutVip: boolean;
  /**
   * True only when the server has all five of the sale's secrets, each of
   * them valid. A plain yes or no in every phase: it never says which one is
   * missing, and it carries no value.
   */
  ready: boolean;
  code?: string;
  checkoutUrl?: string;
}

// ---------------------------------------------------------------------------
// The pack and its prices
// ---------------------------------------------------------------------------

export const FLASH_PACK_CLASSES = 2;
export const FLASH_PACK_PRICE = 56;
export const FLASH_VIP_PERCENT = 50;
export const FLASH_PUBLIC_PERCENT = 40;
/** Only this many 50% codes exist. Momence counts them, not this site. */
export const FLASH_VIP_LIMIT = 20;

// £28, £33.60: whole pounds without pence, otherwise two decimals
export const pounds = (amount: number) => `£${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;

const after = (percent: number) => Math.round(FLASH_PACK_PRICE * (100 - percent)) / 100;

export interface FlashPrice {
  percent: number;
  /** 28 or 33.6, for the tracking attributes */
  value: number;
  /** "£28" */
  price: string;
  /** "£14" */
  perClass: string;
}

const priceFor = (percent: number): FlashPrice => ({
  percent,
  value: after(percent),
  price: pounds(after(percent)),
  perClass: pounds(after(percent) / FLASH_PACK_CLASSES),
});

export const FLASH_PRICES: Record<'vip' | 'public', FlashPrice> = {
  vip: priceFor(FLASH_VIP_PERCENT),
  public: priceFor(FLASH_PUBLIC_PERCENT),
};

/** "£56" */
export const FLASH_USUAL_PRICE = pounds(FLASH_PACK_PRICE);
/** "£28": a class at the pack's usual price */
export const FLASH_USUAL_PER_CLASS = pounds(FLASH_PACK_PRICE / FLASH_PACK_CLASSES);

// ---------------------------------------------------------------------------
// The three moments on the timeline
// ---------------------------------------------------------------------------

export interface FlashStep {
  /** The phase during which this step is the lit one */
  phase: Exclude<FlashPhase, 'teaser'>;
  time: string;
  title: string;
  detail: string;
}

export const FLASH_STEPS: FlashStep[] = [
  {
    phase: 'vip',
    time: '12:00',
    title: 'Password holders',
    detail: `${FLASH_VIP_PERCENT}% off, ${FLASH_VIP_LIMIT} only`,
  },
  { phase: 'public', time: '18:00', title: 'Everyone', detail: `${FLASH_PUBLIC_PERCENT}% off` },
  { phase: 'ended', time: '23:59', title: 'Gone', detail: 'The codes expire' },
];

// ---------------------------------------------------------------------------
// The small print
// ---------------------------------------------------------------------------

export const FLASH_TERMS: string[] = [
  `${FLASH_PACK_CLASSES} classes, to use on any group class.`,
  'Valid for 30 days from the first class you book.',
  'One per person.',
  'Non-refundable and non-transferable.',
  'Not valid for privates, massages, treatments, workshops or events.',
];

// ---------------------------------------------------------------------------
// Tracking: the data-* attributes the layout's checkout click tracking reads.
// The discount code is never part of these, or of any URL.
// ---------------------------------------------------------------------------

export const FLASH_OFFER_ID = 'flash-2-classes';

export function flashTracking(tier: 'vip' | 'public') {
  const price = FLASH_PRICES[tier];
  return {
    'data-offer-id': FLASH_OFFER_ID,
    'data-content-name': `Black Friday Flash ${FLASH_PACK_CLASSES} Classes ${price.price}`,
    'data-content-type': 'euforyc_package',
    'data-content-category': FLASH_PATH,
    'data-value': String(price.value),
    'data-currency': 'GBP',
  };
}

// ---------------------------------------------------------------------------
// Before the page is drawn
// ---------------------------------------------------------------------------

/**
 * Set on <html>: the phase the layout is drawn for. The page's HTML is the
 * same static file all day, so the visitor's own clock picks the layout
 * before anything is painted and the server's answer corrects it if needed.
 * This only arranges the page. It cannot reveal a code: none is on the page.
 */
export const PHASE_ATTR = 'data-flash-phase';

/** Set on <html>: whether the opening animation plays ("play") or not ("skip") */
export const INTRO_ATTR = 'data-flash-intro';
export const INTRO_SEEN_KEY = 'euforyc_flash_intro';

/**
 * A one-line script that runs before the page is drawn. It sets the two
 * attributes above. The doors play once per browser session and never after
 * the sale is over; if the browser will not let us remember (storage
 * blocked), they simply play.
 */
export const BEFORE_PAINT = `(function(){var d=document.documentElement,n=Date.now(),p=n<${FLASH_VIP_AT}?'teaser':n<${FLASH_PUBLIC_AT}?'vip':n<${FLASH_ENDS_AT}?'public':'ended',m='play';try{if(p==='ended'||sessionStorage.getItem('${INTRO_SEEN_KEY}')){m='skip'}else{sessionStorage.setItem('${INTRO_SEEN_KEY}','1')}}catch(e){}d.setAttribute('${PHASE_ATTR}',p);d.setAttribute('${INTRO_ATTR}',m)})()`;
