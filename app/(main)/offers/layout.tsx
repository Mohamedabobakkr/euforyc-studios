import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Offers & Intro Deals',
  description: 'Exclusive intro offers at Euforyc Studios Edgware. Try 3 reformer pilates classes for £60, 3 hot pilates classes for £50, or 3 barre classes for £60. First-time clients only. Book today.',
  keywords: ['pilates intro offer london', 'cheap pilates classes london', 'pilates trial offer edgware', 'reformer pilates deal london', 'first time pilates offer uk'],
  alternates: { canonical: 'https://euforyc.co.uk/offers' },
};

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
