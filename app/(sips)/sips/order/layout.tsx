import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Online | Matcha, Coffee & Wellness Drinks',
  description: 'Order ahead from Euforyc Sips in Edgware. Ceremonial matcha lattes, specialty coffee with cold foam, collagen smoothies & wellness drinks. Skip the queue — click & collect. Best matcha bar in North West London.',
  keywords: ['order matcha edgware', 'order matcha online london', 'euforyc sips menu', 'matcha bar menu london', 'click and collect cafe edgware', 'order coffee edgware', 'matcha delivery edgware', 'order ahead cafe london', 'cold foam drinks order', 'wellness drinks order london'],
  alternates: { canonical: 'https://euforyc.co.uk/sips/order' },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
