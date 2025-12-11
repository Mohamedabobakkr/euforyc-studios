import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Class Packages - Euforyc Studios',
    description: 'Pilates class packages at Euforyc Studios London. Affordable reformer pilates, hot pilates & private session packages in Edgware. Book pilates classes online.',
};

export default function PackagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
