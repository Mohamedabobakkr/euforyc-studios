import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memberships | Euforyc Membership',
  description: 'Monthly Euforyc memberships in Edgware from £90/month. Use your credits across reformer, hot pilates, red light, barre and more. Unlimited from £280/month with exclusive perks.',
  keywords: ['pilates membership london', 'unlimited pilates london', 'monthly pilates membership edgware', 'reformer pilates membership', 'pilates unlimited classes uk'],
  alternates: { canonical: 'https://euforyc.co.uk/memberships' },
};

export default function MembershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
