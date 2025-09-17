import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Euforyc Studios',
  description: 'Get answers to common pilates questions at Euforyc Studios London. Learn about reformer pilates, hot pilates, classes for beginners, what to wear & more.',
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}