import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secret Menu | Exclusive Matcha & Wellness Drinks',
  description: 'Discover the Euforyc Sips secret menu. Exclusive ceremonial matcha creations, wellness smoothie specials & seasonal drinks you won\'t find anywhere else. The best-kept secret in North West London\'s matcha scene.',
  keywords: ['euforyc sips secret menu', 'secret menu matcha london', 'secret menu cafe edgware', 'hidden menu matcha bar', 'exclusive matcha drinks london', 'secret matcha drinks', 'best secret menu cafe london', 'off menu drinks edgware'],
  alternates: { canonical: 'https://euforyc.co.uk/sips/secret-menu' },
};

export default function SecretMenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
