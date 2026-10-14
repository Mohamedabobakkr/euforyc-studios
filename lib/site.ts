/**
 * Single source of truth for Euforyc Studios business facts.
 *
 * Metadata, structured data, llms.txt and the class pages all read from here,
 * so a fact changed in this file changes everywhere. Search engines and AI
 * assistants cross-check these details between pages — keep them consistent.
 */
import type { Metadata } from 'next';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://euforyc.co.uk').replace(/\/$/, '');

export const STUDIO = {
  name: 'Euforyc Studios',
  shortDescription:
    'Euforyc Studios is a women-only boutique Pilates studio in Edgware, North West London, offering small-group Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Sculpt Mat Pilates, Barre and Belly Dance classes, plus 1:1 Private Reformer Pilates and 1:1 Private Cadillac Reformer Pilates.',
  phoneDisplay: '+44 7375 710370',
  phoneE164: '+447375710370',
  email: 'euforyc@gmail.com',
  // The address is written exactly like this everywhere on the site
  address: {
    street: '7-8 Holmstall Parade',
    locality: 'Edgware',
    postcode: 'HA8 5HX',
    country: 'GB',
  },
  addressLine: '7-8 Holmstall Parade, Edgware, HA8 5HX',
  // The pin on the studio's Google Maps listing (mapsUrl)
  geo: { latitude: 51.59727, longitude: -0.26388 },
  mapsUrl: 'https://maps.app.goo.gl/zZfyhD3X2BuS6SnL6',
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], label: 'Monday to Friday', opens: '06:45', closes: '20:00' },
    { days: ['Saturday', 'Sunday'], label: 'Saturday and Sunday', opens: '08:45', closes: '18:00' },
  ],
  transport: {
    // The only station named on visible pages
    station: 'Colindale station (Northern line) is around a 10–15 minute walk',
    buses: ['32', '142', '186', '204'],
  },
  // Neighbourhoods the studio is realistically reachable from. Used only in
  // structured data and llms.txt, never as visible page text.
  areas: ['Edgware', 'Burnt Oak', 'Colindale', 'Queensbury', 'Kingsbury', 'Mill Hill', 'Hendon', 'Stanmore', 'Canons Park', 'Harrow', 'Wembley', 'Barnet', 'Finchley'],
  social: {
    instagram: 'https://www.instagram.com/euforycstudios',
    tiktok: 'https://www.tiktok.com/@euforyc',
  },
  bookingUrl: `${SITE_URL}/schedule`,
} as const;

export const POLICIES = {
  womenOnly:
    'Euforyc Studios and Euforyc Skin Studio are women-only. The Euforyc Sips cafe in the same building is open to everyone.',
  gripSocks:
    'Grip socks are mandatory for Reformer Pilates. Bring your own or buy a pair at the studio.',
  towel:
    'Bring your own towel to Hot Pilates and Sculpt Mat Pilates. Towels can be bought at the studio if you forget.',
  redLightWear:
    "Red light only reaches skin that isn't covered, so wear minimal, fitted activewear, like a sports bra with shorts or leggings. Come with clean skin, as creams, oils and makeup can block the light. You don't need a towel for this class.",
  cancellation: 'Cancel at least 24 hours before class to keep your credit.',
  arrival:
    'Arrive 10 to 15 minutes before your first class to check in. Late arrivals may not be admitted.',
} as const;

export const PRICING = {
  introOffer: { name: 'Try It All', classes: 3, price: 60, note: 'First-time clients only, usable across all group classes, valid 20 days from your first class' },
  // Single class prices. Sculpt Mat Pilates and Belly Dance are £20.
  dropIn: { standard: 28, move: 20 },
  euforycPackage: {
    note: 'All group classes, no contract, valid 30 days from your first class',
    tiers: [
      { name: '4 classes', price: 105 },
      { name: '8 classes', price: 190 },
      { name: '12 classes', price: 270 },
      { name: '30 Days Unlimited', price: 320 },
    ],
  },
  movePackage: {
    note: 'Sculpt Mat Pilates and Belly Dance classes only, no contract, valid 30 days from your first class',
    tiers: [
      { name: '4 classes', price: 70 },
      { name: '8 classes', price: 135 },
    ],
  },
  membership: {
    note: '6-month minimum term, then monthly rolling. Credits work across the whole group timetable',
    tiers: [
      { name: 'Euforyc 4 (4 classes a month)', price: 90 },
      { name: 'Euforyc 8 (8 classes a month)', price: 165 },
      { name: 'Euforyc 12 (12 classes a month)', price: 240 },
      { name: 'Euforyc Unlimited', price: 280 },
    ],
  },
  privateSession: {
    note: '60-minute 1:1 Private Reformer Pilates or 1:1 Private Cadillac Reformer Pilates session; packs valid 90 days',
    tiers: [
      { name: 'Single session', price: 75 },
      { name: '4 sessions', price: 250 },
      { name: '8 sessions', price: 490 },
      { name: '12 sessions', price: 700 },
    ],
  },
} as const;

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og/euforyc-studios-reformer-studio-edgware.jpg`,
  width: 1200,
  height: 630,
  alt: 'The Reformer Pilates studio at Euforyc Studios in Edgware, with rows of reformers, a green moss wall and white curtains',
};

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path beginning with "/" — "/" for the homepage */
  path: string;
  keywords?: string[];
  image?: { url: string; width: number; height: number; alt: string };
  noindex?: boolean;
  /** Set when the title already contains the brand, to skip the layout's title template */
  absoluteTitle?: boolean;
}

/**
 * Builds page metadata with a self-referencing canonical and matching
 * Open Graph / Twitter tags. Every indexable page should use this so no page
 * inherits another page's canonical or og:url.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const socialTitle = absoluteTitle ? title : `${title} | ${STUDIO.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: STUDIO.name,
      locale: 'en_GB',
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** schema.org PostalAddress for the studio */
export const postalAddressSchema = {
  '@type': 'PostalAddress',
  streetAddress: STUDIO.address.street,
  addressLocality: STUDIO.address.locality,
  postalCode: STUDIO.address.postcode,
  addressCountry: STUDIO.address.country,
} as const;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.path === '/' ? SITE_URL : `${SITE_URL}${crumb.path}`,
    })),
  };
}
