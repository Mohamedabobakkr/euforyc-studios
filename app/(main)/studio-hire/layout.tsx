import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Studio Hire in Edgware | Birthdays, Private Pilates & Events',
  description: 'Hire Euforyc Studios in Edgware for birthdays, corporate events, private Pilates sessions and celebrations. Private group Pilates from £28 per person plus instructor fee. Studio hire is open to everyone.',
  path: '/studio-hire',
});

export default function StudioHireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
