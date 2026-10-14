import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Pilates Memberships in Edgware',
  description: 'Monthly Euforyc memberships in Edgware from £90 a month. Use your credits across Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Sculpt Mat Pilates and Belly Dance. Unlimited is £280 a month with priority booking, a monthly massage and a guest pass.',
  path: '/memberships',
});

export default function MembershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
