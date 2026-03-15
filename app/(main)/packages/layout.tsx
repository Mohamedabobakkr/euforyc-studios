import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Class Packages | Reformer Pilates & Hot Pilates Bundles',
    description: 'Pilates class packages at Euforyc Studios Edgware. Reformer pilates intro offer 3 classes for £60, hot pilates 3 for £45. Save up to £160 on multi-class packages. Book online.',
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
