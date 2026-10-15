'use client';

import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import PillLink from '@/components/euforyc/PillLink';
import { FAQS, type Faq } from '@/lib/faqs';

const FAQItem = ({ faq }: { faq: Faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#1a260e]/15">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="group flex min-h-[72px] w-full items-center justify-between gap-5 px-0 py-6 text-left md:py-8"
      >
        <h3 className="font-serif text-[21px] font-normal leading-[1.3] text-eu-ink transition-transform duration-500 ease-eu group-hover:translate-x-1 md:text-[27px]">
          {faq.question}
        </h3>
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#1a260e]/25 text-eu-ink transition-colors duration-300 group-hover:border-eu-ink group-hover:bg-eu-ink group-hover:text-eu-cream">
          {isOpen ? (
            <Minus strokeWidth={1.5} className="h-5 w-5 transform transition-transform duration-500 rotate-0" />
          ) : (
            <Plus strokeWidth={1.5} className="h-5 w-5 transform transition-transform duration-500 rotate-0 group-hover:rotate-90" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-opacity duration-500 ease-eu ${
          isOpen ? 'max-h-[1000px] pb-8 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-3xl md:pr-16">
          <p className="body-text">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="eu-page-top">
      {/* Hero Section */}
      <section className="eu-wrap pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,6vw,96px)]">
        <div className="text-center">
          <div className="eu-rise mx-auto max-w-5xl space-y-6">
            <h1 className="font-serif text-[clamp(52px,8.2vw,124px)] font-normal leading-[0.95] tracking-[-0.035em] text-eu-ink">
              Frequently Asked
            </h1>
            <p className="font-serif text-[clamp(52px,8.2vw,124px)] font-normal italic leading-[0.95] tracking-[-0.035em] text-eu-ink">
              Questions
            </p>
            <div className="mx-auto !mt-10 h-px w-24 bg-[#1a260e]/20"></div>
            <p className="eu-lede !mx-auto max-w-2xl">
              Everything you need to know about pilates classes, our studio, and getting started
              at Euforyc Studios in Edgware, North West London.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="eu-wrap pb-[clamp(64px,8vw,120px)]">
        <div>
          <div className="mx-auto max-w-4xl border-t border-[#1a260e]/15">
            {FAQS.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="eu-wrap pb-[clamp(56px,7vw,110px)]">
        <div className="mx-auto max-w-5xl rounded-eu-lg bg-eu-beige px-6 py-14 md:px-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <div className="space-y-5">
              <p className="body-text">
                Still have questions? We're here to help you start your pilates journey with confidence.
                Every question is a step closer to discovering what your body can achieve.
              </p>
              <p className="font-serif text-[clamp(30px,3.4vw,48px)] italic leading-[1.15] text-eu-ink">
                everything is euforyc
              </p>
            </div>

            <div className="pt-4">
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <PillLink href="/packages" variant="ink" dot stretchMobile>
                  VIEW PACKAGES
                </PillLink>
                <PillLink href="/contact" variant="line" stretchMobile>
                  CONTACT US
                </PillLink>
              </div>
              <p className="mt-6 text-center text-[15px] leading-[2.9] text-eu-sage">
                <Link href="/book" className="py-[14px] text-eu-ink underline-offset-4 hover:underline">Book your first class</Link> |
                <Link href="/about" className="py-[14px] text-eu-ink underline-offset-4 hover:underline"> Learn our story</Link> |
                <Link href="/team" className="py-[14px] text-eu-ink underline-offset-4 hover:underline"> Meet our team</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
