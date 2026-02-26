import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'euforyc sips — secret menu',
  description: 'The secret menu at euforyc sips. Wellness smoothies, ceremonial matcha, specialty coffee, and Ramadan exclusives. Ask for it by name.',
  openGraph: {
    title: 'euforyc sips — secret menu',
    description: 'The secret menu at euforyc sips. Wellness smoothies, ceremonial matcha, specialty coffee, and Ramadan exclusives.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function SipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
