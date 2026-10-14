import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Massage Ritual in Edgware, London',
  description: 'The Euforyc Massage Ritual: restorative 30, 60 and 90 minute massages in Edgware, London, sold as packs of 3 sessions. Melt tension, restore calm and feel like yourself again.',
  path: '/massage',
});

export default function MassageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
