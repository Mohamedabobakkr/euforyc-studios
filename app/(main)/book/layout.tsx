import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Book a Pilates Class in Edgware',
  description: 'Book Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Sculpt Mat Pilates, Belly Dance or a 1:1 private session at Euforyc Studios in Edgware. First-time clients can try 3 classes for £60. Small women-only classes, booked online.',
  path: '/book',
});

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
