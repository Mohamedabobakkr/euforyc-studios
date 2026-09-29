import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Offers & Intro Deals',
  description: 'New to Euforyc? Try It All: 3 classes for £60. Ready to commit? 5% off your first month of any Euforyc Membership with code EUFORYC5 until 30 November 2026.',
  keywords: ['pilates intro offer london', 'cheap pilates classes london', 'pilates trial offer edgware', 'reformer pilates deal london', 'first time pilates offer uk'],
  alternates: { canonical: 'https://euforyc.co.uk/offers' },
};

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
