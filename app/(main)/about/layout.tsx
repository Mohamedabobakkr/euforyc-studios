import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About Us | Our Story & Philosophy',
  description: 'The story behind Euforyc Studios, a women-only boutique Pilates studio in Edgware, North West London. Euforyc combines euphoria, you and organic: a space where every woman can build strength through Reformer Pilates, Hot Pilates and wellness.',
  path: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
