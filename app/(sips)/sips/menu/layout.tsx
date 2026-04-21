import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu | Euforyc Sips',
  description:
    'In-store menu for Euforyc Sips — ceremonial matcha, specialty coffee, protein shakes, smoothies, toasties, and bakery items in Edgware, London.',
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
