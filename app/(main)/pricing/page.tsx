import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing | Pilates Classes & Packages',
  description: 'Transparent pricing for all classes at Euforyc Studios Edgware. Reformer pilates from £28, hot pilates from £22, barre from £25, sculpt mat pilates from £20, red light pilates from £30, private sessions from £65. Packages & memberships available.',
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
            All packages are valid for 30 days from your first class. First-time clients can enjoy our special intro offers.
          </p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width max-w-4xl">
          <div className="space-y-16">

            {/* Reformer Pilates (GROUP) Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Reformer Pilates (Group)</h2>
                <p className="tagline text-[#1a260e]/60">EQUIPMENT-BASED • MAX 8 PER CLASS • 45 MIN</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Single Class (Drop-in)</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£28</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">4 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£100</p>
                    <p className="text-sm text-green-600 font-medium">save £12</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">8 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£190</p>
                    <p className="text-sm text-green-600 font-medium">save £34</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">12 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£270</p>
                    <p className="text-sm text-green-600 font-medium">save £66</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Unlimited</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£340</p>
                    <p className="text-sm text-green-600 font-medium">save £100+</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 bg-[#1a260e]/5 px-4 rounded-lg mt-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Intro Offer (3 Classes)</h3>
                    <p className="text-xs text-[#1a260e]/60">First-time clients only • Valid 20 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£60</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hot Pilates Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Hot Pilates</h2>
                <p className="tagline text-[#1a260e]/60">INFRARED HEATED • MAX 7 PER CLASS • 45 MIN</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Single Class (Drop-in)</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£22</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">4 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£75</p>
                    <p className="text-sm text-green-600 font-medium">save £13</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">8 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£140</p>
                    <p className="text-sm text-green-600 font-medium">save £36</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">12 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£200</p>
                    <p className="text-sm text-green-600 font-medium">save £64</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Unlimited</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£300</p>
                    <p className="text-sm text-green-600 font-medium">save £60+</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 bg-[#1a260e]/5 px-4 rounded-lg mt-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Intro Offer (3 Classes)</h3>
                    <p className="text-xs text-[#1a260e]/60">First-time clients only • Valid 30 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£50</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Light Hot Pilates Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Red Light Hot Pilates</h2>
                <p className="tagline text-[#1a260e]/60">HOT PILATES + RED LIGHT THERAPY • PREMIUM</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Single Class (Drop-in)</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£30</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 bg-[#1a260e]/5 px-4 rounded-lg mt-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Intro Offer (3 Classes)</h3>
                    <p className="text-xs text-[#1a260e]/60">First-time clients only • Valid 30 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£65</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sculpt Mat Pilates Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Sculpt Mat Pilates</h2>
                <p className="tagline text-[#1a260e]/60">STRENGTH-FOCUSED • MAT WORK • 45 MIN</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Single Class (Drop-in)</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£20</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Barre Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Barre</h2>
                <p className="tagline text-[#1a260e]/60">BALLET-INSPIRED • SCULPT & TONE • 45 MIN</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Single Class (Drop-in)</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£25</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 bg-[#1a260e]/5 px-4 rounded-lg mt-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Intro Offer (3 Classes)</h3>
                    <p className="text-xs text-[#1a260e]/60">First-time clients only • Valid 30 days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£60</p>
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
            </div>

            {/* Dance Classes Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Dance Classes</h2>
                <p className="tagline text-[#1a260e]/60">DABKE • BELLY DANCE • AFRO</p>
              </div>

              <div className="space-y-0">
                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Single Class (Drop-in)</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£15</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">4 Classes</h3>
                    <p className="text-xs text-[#1a260e]/60">Mix & match any dance style</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£65</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">8 Classes</h3>
                    <p className="text-xs text-[#1a260e]/60">Mix & match any dance style</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£90</p>
                    <p className="text-sm text-green-600 font-medium">save £30</p>
                  </div>
                </div>
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
                    <p className="text-xs text-[#1a260e]/60">per class · August</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 bg-[#1a260e]/5 px-4 rounded-lg mt-4 mb-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Journaling Intro (3 Sessions)</h3>
                    <p className="text-xs text-[#1a260e]/60">Claimable once • New & existing clients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£40</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-[#1a260e]/10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Women&apos;s Circle</h3>
                    <p className="text-xs text-[#1a260e]/60">Sundays 4pm • 15 spaces</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£25</p>
                    <p className="text-xs text-[#1a260e]/60">per circle · August</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 bg-[#1a260e]/5 px-4 rounded-lg mt-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light">Circle Intro (3 Circles)</h3>
                    <p className="text-xs text-[#1a260e]/60">Claimable once • New & existing clients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl font-light">£60</p>
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
                • All class packages are valid for 30 days from your first class attended
              </p>
              <p className="font-sans text-sm text-[#1a260e]/70">
                • Intro offers are valid for 20-30 days from purchase (see individual offers)
              </p>
              <p className="font-sans text-sm text-[#1a260e]/70">
                • Intro offers are for first-time clients only and cannot be combined with other offers
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
