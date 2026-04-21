import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMS Sculpt Packages — Edgware London | Euforyc',
  description: 'EMS Sculpt body sculpting sessions at Euforyc Studios in Edgware, London. Electrical Muscle Stimulation for accelerated toning, fat reduction & muscle building. 4, 8 or 12 session packs available. Book today.',
  keywords: [
    'ems sculpt london',
    'ems training edgware',
    'ems body sculpting london',
    'electrical muscle stimulation london',
    'ems sculpt packages edgware',
    'body sculpting london',
    'ems toning sessions edgware',
    'muscle sculpting london',
    'ems fitness edgware',
    'best ems training london',
  ],
  alternates: { canonical: 'https://euforyc.co.uk/ems-sculpt' },
  openGraph: {
    title: 'EMS Sculpt Packages — Euforyc Studios',
    description: 'Accelerate your sculpting goals with EMS training at Euforyc Studios, Edgware. Packs of 4, 8 or 12 sessions — visible results in weeks. Book today.',
    url: 'https://euforyc.co.uk/ems-sculpt',
    type: 'website',
  },
};

export default function EmsSculptLayout({ children }: { children: React.ReactNode }) {
  return children;
}
