import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing | Pilates Classes & Packages',
  description: 'Transparent pricing at Euforyc Studios Edgware. Group class drop-ins £28 (Sculpt Mat Pilates & Belly Dance £20), Try It All intro offer 3 classes for £60, Euforyc Package from £105, MOVE package from £70, Euforyc Membership from £90/month.',
  keywords: ['pilates prices london', 'reformer pilates cost london', 'hot pilates price edgware', 'pilates class cost near me', 'pilates membership london', 'pilates pricing uk'],
  alternates: { canonical: 'https://euforyc.co.uk/pricing' },
};

export default function Pricing() {
  return (
    <div className="pt-32">
      {/* Header */}
      <section className="section-padding py-24 bg-[#fffcf2]">
        <div className="container-width text-center">
          <p className="tagline text-[#1a260e]/60 mb-4">TRANSPARENT PRICING</p>
          <h1 className="heading-primary mb-6">Price List</h1>
          <p className="body-text max-w-2xl mx-auto">
            Group class packages are valid for 30 days from your first class. First-time clients can start with our Try It All intro offer: 3 classes for £60, valid for 20 days from your first class.
          </p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width max-w-4xl">
          <div className="space-y-16">

            {/* Try It All Intro Offer Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Try It All</h2>
                <p className="tagline text-[#1a260e]/60">INTRO OFFER • ALL GROUP CLASSES</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 bg-[#1a260e]/5 px-4 rounded-lg">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Try It All (3 Classes)</h3>
                    <p className="text-xs text-[#1a260e]/60">First-time clients only • Valid 20 days from first class</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£60</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Drop-in Prices Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Drop-in Classes</h2>
                <p className="tagline text-[#1a260e]/60">SINGLE CLASS • PAY AS YOU GO</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Reformer Pilates</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£28</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Hot Pilates</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£28</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Red Light Hot Pilates</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£28</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Barre</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£28</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Mat Pilates</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£28</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Sculpt Mat Pilates</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£20</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Belly Dance</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£20</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Euforyc Membership Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Euforyc <span className="italic">Membership</span></h2>
                <p className="tagline text-[#1a260e]/60">ALL GROUP CLASSES • 6-MONTH MINIMUM TERM, MONTHLY ROLLING</p>
              </div>

              <div className="space-y-0">
                {[
                  { name: 'Euforyc 4', price: '£90', perClass: '£22.50 per class' },
                  { name: 'Euforyc 8', price: '£165', perClass: '£20.63 per class' },
                  { name: 'Euforyc 12', price: '£240', perClass: '£20 per class' },
                ].map((tier) => (
                  <div key={tier.name} className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl font-light">{tier.name}</h3>
                      <p className="text-xs text-[#1a260e]/60">{tier.perClass}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-2xl md:text-3xl font-light">{tier.price}<span className="font-sans text-sm text-[#1a260e]/60">/mo</span></p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center gap-4 py-5 bg-[#2a3a21] text-[#fffcf2] px-4 rounded-lg mt-4">
                  <div>
                    <p className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-[#fffcf2]/70 mb-1">Best Value</p>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Euforyc Unlimited</h3>
                    <p className="text-xs text-[#fffcf2]/70">Unlimited classes + exclusive perks</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£280<span className="font-sans text-sm text-[#fffcf2]/70">/mo</span></p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/memberships"
                  className="inline-flex items-center justify-center gap-2 bg-[#1a260e] text-[#fffcf2] px-8 py-4 font-sans text-sm tracking-wider uppercase hover:bg-[#1a260e]/90 transition-colors"
                >
                  VIEW MEMBERSHIPS
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Euforyc Package Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Euforyc <span className="italic">Package</span></h2>
                <p className="tagline text-[#1a260e]/60">ALL GROUP CLASSES • VALID 30 DAYS FROM FIRST CLASS • NO CONTRACT</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">4 Euforyc Classes</h3>
                    <p className="text-xs text-[#1a260e]/60">£26.25 per class</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£105</p>
                    <p className="text-sm text-green-600 font-medium">save £7</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">8 Euforyc Classes</h3>
                    <p className="text-xs text-[#1a260e]/60">£23.75 per class</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£190</p>
                    <p className="text-sm text-green-600 font-medium">save £34</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">12 Euforyc Classes</h3>
                    <p className="text-xs text-[#1a260e]/60">£22.50 per class</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£270</p>
                    <p className="text-sm text-green-600 font-medium">save £66</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">30 Days Unlimited</h3>
                    <p className="text-xs text-[#1a260e]/60">Unlimited Euforyc classes for 30 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£320</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MOVE Package Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">MOVE</h2>
                <p className="tagline text-[#1a260e]/60">SCULPT MAT PILATES &amp; BELLY DANCE • VALID 30 DAYS FROM FIRST CLASS • NO CONTRACT</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">4 MOVE Classes</h3>
                    <p className="text-xs text-[#1a260e]/60">£17.50 per class</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£70</p>
                    <p className="text-sm text-green-600 font-medium">save £10</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">8 MOVE Classes</h3>
                    <p className="text-xs text-[#1a260e]/60">£16.88 per class</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£135</p>
                    <p className="text-sm text-green-600 font-medium">save £25</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1-1 Private Cadillac Reformer Sessions */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">1-1 Private Cadillac Reformer</h2>
                <p className="tagline text-[#1a260e]/60">CADILLAC REFORMER • PERSONALIZED TRAINING • 60 MIN</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Single Session (Drop-in)</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£75</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">4 Sessions</h3>
                    <p className="text-xs text-[#1a260e]/60">Valid for 90 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£250</p>
                    <p className="text-sm text-green-600 font-medium">save £50</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">8 Sessions</h3>
                    <p className="text-xs text-[#1a260e]/60">Valid for 90 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£490</p>
                    <p className="text-sm text-green-600 font-medium">save £110</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">12 Sessions</h3>
                    <p className="text-xs text-[#1a260e]/60">Valid for 90 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£700</p>
                    <p className="text-sm text-green-600 font-medium">save £200</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center gap-2 bg-[#1a260e] text-[#fffcf2] px-8 py-4 font-sans text-sm tracking-wider uppercase hover:bg-[#1a260e]/90 transition-colors"
                >
                  VIEW PACKAGES
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Women's Circle Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Women&apos;s Circle</h2>
                <p className="tagline text-[#1a260e]/60">JOURNALING • REFLECTION • SISTERHOOD</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Guided Journaling</h3>
                    <p className="text-xs text-[#1a260e]/60">Tuesdays 9–9.45pm • 15 spaces</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£18</p>
                    <p className="text-xs text-[#1a260e]/60">per class</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Women&apos;s Circle</h3>
                    <p className="text-xs text-[#1a260e]/60">Sundays 4pm • 15 spaces</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£25</p>
                    <p className="text-xs text-[#1a260e]/60">per circle</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width text-center">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light mb-6">Ready to Start Your Journey?</h2>
          <p className="text-[#fffcf2]/80 mb-8 max-w-xl mx-auto">
            Join our community and discover the transformative power of movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 py-4 font-sans text-sm tracking-wider uppercase hover:bg-[#fffcf2]/90 transition-colors"
            >
              BOOK A CLASS
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 border border-[#fffcf2]/30 text-[#fffcf2] px-8 py-4 font-sans text-sm tracking-wider uppercase hover:bg-[#fffcf2]/10 transition-colors"
            >
              VIEW PACKAGES
            </Link>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width max-w-4xl">
          <div className="text-center space-y-6">
            <h3 className="font-serif text-2xl font-light">Terms & Conditions</h3>
            <div className="space-y-2 max-w-2xl mx-auto text-left">
              <p className="font-sans text-sm text-[#1a260e]/70">
                • Class packages (Euforyc Package and MOVE) are valid for 30 days from your first class attended (1-1 Cadillac packages: 90 days)
              </p>
              <p className="font-sans text-sm text-[#1a260e]/70">
                • Try It All is valid for 20 days from your first class attended
              </p>
              <p className="font-sans text-sm text-[#1a260e]/70">
                • Try It All is for first-time clients only, can only be bought once and cannot be combined with other offers
              </p>
              <p className="font-sans text-sm text-[#1a260e]/70">
                • All packages are non-refundable and non-transferable
              </p>
              <p className="font-sans text-sm text-[#1a260e]/70">
                • 24-hour cancellation policy applies to all bookings
              </p>
              <p className="font-sans text-sm text-[#1a260e]/70">
                • Prices are subject to change with 30 days notice
              </p>
              <p className="font-sans text-sm text-[#1a260e]/70">
                • Euforyc Memberships have a 6-month minimum term, then continue monthly until cancelled with two full billing cycles&apos; notice
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
