import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Special Offers & Intro Deals',
  description: 'New to Euforyc? Try It All: 3 classes for £60. Ready to commit? 5% off your first month of any Euforyc Membership with code EUFORYC5 until 30 November 2026.',
  path: '/offers',
});

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
