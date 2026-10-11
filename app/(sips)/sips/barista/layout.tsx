import type { Metadata } from 'next';

// Staff order screen — not for search results
export const metadata: Metadata = {
  title: 'Barista',
  robots: { index: false, follow: false },
};

export default function BaristaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
