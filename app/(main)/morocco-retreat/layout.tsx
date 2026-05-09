import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marrakesh Wellness Retreat — 17-24 July 2026 | Euforyc',
  description:
    'A 7-night women-only luxury Pilates retreat in Marrakesh, Morocco — created to celebrate Euforyc\'s 1st birthday. 17–24 July 2026. Daily Pilates, private chef, Moroccan cooking workshop, massage and dessert experience. Limited to 9 guests.',
  keywords: [
    'morocco wellness retreat',
    'marrakesh wellness retreat',
    'pilates retreat morocco',
    'women only retreat morocco',
    'luxury wellness retreat',
    'marrakech pilates retreat',
    'wellness retreat 2026',
    'euforyc retreat',
    'pilates holiday morocco',
    'women wellness retreat',
    'luxury pilates retreat',
    'birthday retreat',
    'moroccan cooking retreat',
  ],
  alternates: { canonical: 'https://euforyc.co.uk/morocco-retreat' },
  openGraph: {
    title: 'Marrakesh Wellness Retreat with Euforyc — 17-24 July 2026',
    description:
      'A 7-night women-only luxury Pilates retreat in Marrakesh. Movement, sunshine, private chef, cooking workshop, massage. Only 9 spaces.',
    url: 'https://euforyc.co.uk/morocco-retreat',
    type: 'website',
    images: [
      {
        url: 'https://euforyc.co.uk/retreat/hero-villa.jpg',
        width: 1200,
        height: 630,
        alt: 'Marrakesh Wellness Retreat with Euforyc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marrakesh Wellness Retreat — Euforyc',
    description:
      '7 nights of movement, sunshine and slow living in Marrakesh. 17–24 July 2026. Only 9 spaces.',
    images: ['https://euforyc.co.uk/retreat/hero-villa.jpg'],
  },
};

export default function MoroccoRetreatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
