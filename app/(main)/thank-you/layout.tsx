import { pageMetadata } from '@/lib/site';

// Post-purchase confirmation page — not for search results
export const metadata = pageMetadata({
  title: 'Thank You',
  description: 'Your booking with Euforyc Studios is confirmed.',
  path: '/thank-you',
  noindex: true,
});

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
