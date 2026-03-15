import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Pilates Class | Euforyc Studios London',
  description: 'Book your reformer pilates, hot pilates, barre, or private session at Euforyc Studios Edgware. First-time intro offers from £45. Small intimate classes. Book online now.',
  keywords: ['book pilates class london', 'reformer pilates booking edgware', 'book hot pilates london', 'pilates class booking near me', 'book private pilates session london'],
  alternates: { canonical: 'https://euforyc.co.uk/book' },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
