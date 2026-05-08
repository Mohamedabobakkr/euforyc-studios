import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spain Wellness Retreat — 16-23 July 2026 | Euforyc',
  description:
    'A 7-night women-only luxury Pilates retreat in Spain — created to celebrate Euforyc\'s 1st birthday. 16–23 July 2026 at Cortijo Banana, Andalusia. Daily Pilates, private chef, airport transfers, slow living. Packages from £1,250.',
  keywords: [
    'spain wellness retreat',
    'pilates retreat spain',
    'women only retreat spain',
    'luxury wellness retreat',
    'cortijo banana retreat',
    'andalusia pilates retreat',
    'wellness retreat 2026',
    'euforyc retreat',
    'pilates holiday spain',
    'women wellness retreat europe',
    'luxury pilates retreat',
    'birthday retreat',
  ],
  alternates: { canonical: 'https://euforyc.co.uk/spain-retreat' },
  openGraph: {
    title: 'Spain Wellness Retreat with Euforyc — 16-23 July 2026',
    description:
      'A 7-night women-only luxury Pilates retreat in Andalusia. Movement, sunshine, private chef meals, slow living. Packages from £1,250.',
    url: 'https://euforyc.co.uk/spain-retreat',
    type: 'website',
    images: [
      {
        url: 'https://euforyc.co.uk/retreat/hero-villa.jpg',
        width: 1200,
        height: 630,
        alt: 'Cortijo Banana — Spain Wellness Retreat with Euforyc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spain Wellness Retreat — Euforyc',
    description:
      '7 nights of movement, sunshine and slow living in Andalusia. 16–23 July 2026. From £1,250.',
    images: ['https://euforyc.co.uk/retreat/hero-villa.jpg'],
  },
};

export default function SpainRetreatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
