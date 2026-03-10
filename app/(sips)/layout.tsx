import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'euforyc sips — wellness drinks',
  description: 'Hand-crafted wellness smoothies, ceremonial matcha, and specialty coffee at euforyc sips. Click & collect or explore our secret menu.',
  openGraph: {
    title: 'euforyc sips — wellness drinks',
    description: 'Hand-crafted wellness smoothies, ceremonial matcha, and specialty coffee at euforyc sips. Click & collect or explore our secret menu.',
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
