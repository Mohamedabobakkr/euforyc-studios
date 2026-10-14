import JsonLd from '@/components/JsonLd';
import { FAQS } from '@/lib/faqs';
import { breadcrumbSchema, pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'FAQ | Classes, Prices, Booking & What to Bring',
  description:
    'Answers to common questions about Euforyc Studios, a women-only Pilates studio in Edgware: class types, prices, the Try It All intro offer, booking and cancellation, what to wear, parking and pregnancy.',
  path: '/faq',
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema([{ name: 'FAQ', path: '/faq' }])} />
      {children}
    </>
  );
}
