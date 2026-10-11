'use client';

import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { FAQS, type Faq } from '@/lib/faqs';

const FAQItem = ({ faq }: { faq: Faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#1a260e]/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 px-0 flex items-center justify-between text-left hover:opacity-70 transition-all duration-500 group"
      >
        <h3 className="font-serif text-xl md:text-2xl font-light text-[#1a260e] pr-6 leading-relaxed">
          {faq.question}
        </h3>
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          {isOpen ? (
            <Minus className="h-5 w-5 text-[#1a260e] transition-all duration-500 transform rotate-0" />
          ) : (
            <Plus className="h-5 w-5 text-[#1a260e] transition-all duration-500 transform rotate-0 group-hover:rotate-90" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? 'max-h-[1000px] pb-8' : 'max-h-0'
        }`}
      >
        <div className="pr-14">
          <p className="body-text text-[#1a260e]/80 leading-relaxed text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative bg-[#fffcf2]">
        <div className="container-width text-center">
          <div className="space-y-8 animate-fade-up">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a260e] tracking-wider leading-[0.9] font-light">
              Frequently Asked
            </h1>
            <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a260e] tracking-wider leading-[0.9] font-light italic">
              Questions
            </p>
            <div className="w-32 h-[1px] bg-[#1a260e]/20 mx-auto mt-8"></div>
            <p className="body-text text-lg max-w-2xl mx-auto text-[#1a260e]/70 leading-relaxed">
              Everything you need to know about pilates classes, our studio, and getting started
              at Euforyc Studios in Edgware, North West London.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            {FAQS.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <p className="body-text text-lg text-[#1a260e]/80 leading-relaxed">
                Still have questions? We're here to help you start your pilates journey with confidence.
                Every question is a step closer to discovering what your body can achieve.
              </p>
              <p className="font-serif text-2xl md:text-3xl text-[#1a260e] italic opacity-90">
                everything is euforyc
              </p>
            </div>

            <div className="pt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/packages"
                  className="inline-block bg-[#1a260e] text-[#fffcf2] px-12 py-4 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#1a260e]/90 hover:scale-[1.02]"
                >
                  VIEW PACKAGES
                </Link>
                <Link
                  href="/contact"
                  className="inline-block border border-[#1a260e] text-[#1a260e] px-12 py-4 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#1a260e] hover:text-[#fffcf2] hover:scale-[1.02]"
                >
                  CONTACT US
                </Link>
              </div>
              <p className="text-xs text-[#1a260e]/60 text-center mt-4">
                <Link href="/book" className="hover:underline">Book your first class</Link> |
                <Link href="/about" className="hover:underline"> Learn our story</Link> |
                <Link href="/team" className="hover:underline"> Meet our team</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}