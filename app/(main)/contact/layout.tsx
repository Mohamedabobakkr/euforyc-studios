import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Euforyc Studios Edgware, London',
  description: 'Get in touch with Euforyc Studios in Edgware, London. Visit us at 7 Holmstall Ave, HA8 5HX. Call +44 7375 710370 or email us. Near Edgware Station, Northern Line.',
  keywords: ['contact euforyc studios', 'pilates studio edgware contact', 'euforyc phone number', 'pilates studio near edgware station', 'edgware fitness studio contact'],
  alternates: { canonical: 'https://euforyc.co.uk/contact' },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Euforyc Studios',
  description: 'Contact information for Euforyc Studios in Edgware, London',
  url: 'https://euforyc.co.uk/contact',
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': 'https://euforyc.co.uk/#organization',
    name: 'Euforyc Studios',
    telephone: '+447375710370',
    email: 'euforyc@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7 Holmstall Ave',
      addressLocality: 'Edgware',
      addressRegion: 'London',
      postalCode: 'HA8 5HX',
      addressCountry: 'GB',
    },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
