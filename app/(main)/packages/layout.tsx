import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Class Packages | Euforyc Package & Try It All Intro Offer',
    description: 'Pilates class packages at Euforyc Studios Edgware. Try It All intro offer £60 for 3 classes. Euforyc Package from £105, usable across all group classes, no contract. Save up to £66. Book online.',
    keywords: ['pilates packages london', 'reformer pilates package edgware', 'pilates intro offer london', 'pilates class bundles', 'cheap pilates packages uk'],
    alternates: { canonical: 'https://euforyc.co.uk/packages' },
};

export default function PackagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
