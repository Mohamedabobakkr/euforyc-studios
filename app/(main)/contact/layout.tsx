import { STUDIO, pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact & Directions | Edgware, North West London',
  description: `Contact ${STUDIO.name} at ${STUDIO.addressLine}. Call ${STUDIO.phoneDisplay} or email ${STUDIO.email}. Nearest station: ${STUDIO.transport.nearestStation}.`,
  path: '/contact',
});

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
