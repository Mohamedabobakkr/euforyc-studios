import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Massage Ritual — Edgware London | Euforyc',
  description: 'The Euforyc Massage Ritual — deeply restorative 30, 60 & 90 minute massages in Edgware, London. Pack of 3 sessions. Melt tension, restore calm, feel like you again. Book today.',
  keywords: [
    'massage london',
    'massage edgware',
    'deep tissue massage london',
    'relaxation massage london',
    'massage ritual london',
    'spa massage edgware',
    'luxury massage london',
    'swedish massage edgware',
    'back massage london',
    'best massage edgware',
  ],
  alternates: { canonical: 'https://euforyc.co.uk/massage' },
  openGraph: {
    title: 'The Euforyc Massage Ritual',
    description: 'A deeply restorative massage experience in Edgware, London. 30, 60 & 90 minute packs of 3 — melt tension, restore calm, come back to yourself.',
    url: 'https://euforyc.co.uk/massage',
    type: 'website',
  },
};

export default function MassageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
