import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Our Story & Philosophy',
  description: 'Discover the story behind London\'s premier women-only pilates studio. Euforyc combines euphoria, you, and organic — creating a space where every woman discovers her strength through reformer pilates, hot pilates, and wellness in Edgware.',
  keywords: ['about euforyc studios', 'women only pilates london story', 'pilates studio philosophy', 'boutique pilates edgware', 'euforyc meaning', 'pilates studio edgware about'],
  alternates: {
    canonical: 'https://euforyc.co.uk/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
