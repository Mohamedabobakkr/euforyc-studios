import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Euforyc Sips | Best Matcha Bar & Wellness Cafe in Edgware, North West London',
  description: 'The best matcha bar and wellness cafe in North West London. Ceremonial matcha lattes with cold foam, specialty coffee, collagen smoothies & wellness drinks in Edgware. Laptop-friendly, community-focused. Walk-ins welcome. Near Edgware Station.',
  alternates: { canonical: 'https://euforyc.co.uk/sips' },
};

export default function SipsPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
