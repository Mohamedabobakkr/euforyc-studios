import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skin Treatments & Services',
  description: 'Explore our full range of aesthetic treatments. Dermal fillers from £130, anti-wrinkle injections from £25, IV drips from £100, Profhilo, skin boosters, body contouring, laser hair removal & Dermalux phototherapy at our women-only clinic in Edgware.',
  keywords: ['skin treatments edgware', 'aesthetic services london', 'dermal fillers edgware', 'iv drips north london', 'skin clinic treatments', 'body contouring edgware', 'lip fillers price london'],
  alternates: { canonical: 'https://euforyc.co.uk/skin-studio' },
};

export default function SkinStudioPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
