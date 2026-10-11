import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Class Packages | Euforyc Package & Try It All Intro Offer',
  description: 'Pilates class packages at Euforyc Studios in Edgware. Try It All intro offer: 3 classes for £60. Euforyc Package from £105 across all group classes, MOVE from £70 for Sculpt and Belly Dance. No contract. Book online.',
  path: '/packages',
});

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
