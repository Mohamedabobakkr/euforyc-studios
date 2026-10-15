/**
 * Euforyc Social on the homepage ("This month at Euforyc").
 *
 * Facts are copied from the Euforyc Social site's data
 * (euforycsocial: src/data/mock/trips.ts and src/data/mock/club.ts) — keep
 * them in step with that site. Links open euforycsocial.co.uk.
 *
 * A card without `image` shows its `word` large on ink instead of a photo.
 * To give the padel card a photo, add /public/social/padel-london.jpg and set
 * its `image`.
 */

export interface SocialCard {
  id: string;
  /** The date chip: small line, large line, small line (each optional) */
  badge: { top?: string; big?: string; bottom?: string };
  kicker: string;
  title: string;
  line: string;
  /** An optional second line, such as the price */
  note?: string;
  href: string;
  /** The link's words; without one the card shows only an arrow */
  cta?: string;
  image?: { src: string; alt: string; position: string };
  /** Shown on the photo-less card */
  word: string;
}

export const SOCIAL_CARDS: SocialCard[] = [
  {
    id: 'siwa-2027',
    badge: { top: 'Apr', big: '13', bottom: '2027' },
    kicker: 'Euforyc Social · Retreat',
    title: 'Siwa, Egypt',
    line: '13–20 April 2027 · 8 places · Cairo & the Siwa Oasis',
    note: '£1,900 per person',
    href: 'https://euforycsocial.co.uk/next-trip',
    cta: 'Apply',
    image: {
      src: '/social/siwa-bayt-gagy.jpg',
      alt: 'The infinity pool at Bayt Gagy villa, looking over the salt lake at the Siwa Oasis',
      position: '50% 20%',
    },
    word: 'Siwa',
  },
  {
    id: 'marrakesh-2026',
    badge: { top: 'Jul', big: '2026' },
    kicker: 'Euforyc Social · Retreat',
    title: 'Marrakesh, Morocco',
    line: '17–24 July 2026 · our first retreat, sold out',
    href: 'https://euforycsocial.co.uk/marrakesh-2026',
    cta: 'See the trip',
    image: {
      src: '/social/marrakesh-group.jpg',
      alt: 'Seven women from the Euforyc Social Marrakesh retreat standing together on a tiled courtyard at night',
      position: '50% 35%',
    },
    word: 'Marrakesh',
  },
  {
    id: 'padel-london',
    badge: { top: 'Monthly' },
    kicker: 'Euforyc Social · London',
    title: 'Padel social',
    line: 'London is our home, and our socials are the heartbeat of the community.',
    href: 'https://euforycsocial.co.uk/club',
    word: 'Padel',
  },
];

export const SOCIAL_MEMBERSHIP = {
  text: 'Euforyc Social · Founding Membership £5 a month, by application',
  href: 'https://euforycsocial.co.uk/membership',
};

/** The founder's line, used as the sub-heading */
export const SOCIAL_LINE = 'Come alone. Most of us do.';
