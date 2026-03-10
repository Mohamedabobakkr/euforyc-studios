import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Euforyc Studios',
  description: 'About Euforyc Studios - premier pilates studio in London Edgware. Learn our story, mission & values. Expert reformer pilates instructors, women-only boutique studio.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
