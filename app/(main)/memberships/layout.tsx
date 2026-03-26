import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memberships | Unlimited Pilates',
  description: 'Monthly pilates memberships at Euforyc Studios Edgware. Unlimited reformer pilates from £290/month, hot pilates from £260/month. Priority booking & exclusive perks. 6-month commitment.',
  keywords: ['pilates membership london', 'unlimited pilates london', 'monthly pilates membership edgware', 'reformer pilates membership', 'pilates unlimited classes uk'],
  alternates: { canonical: 'https://euforyc.co.uk/memberships' },
};

export default function MembershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
