import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Price List - Euforyc Studios',
  description: 'Transparent pricing for all our Pilates classes. Choose from drop-in sessions, class passes, or monthly memberships.',
};

export default function Pricing() {
  return (
    <div className="pt-32">
      {/* Header */}
      <section className="section-padding py-24 bg-[#fffcf2]">
        <div className="container-width text-center">
          <h1 className="heading-primary mb-6">PRICE LIST</h1>
          <div className="w-24 h-[1px] bg-[#1a260e]/20 mx-auto"></div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width max-w-4xl">
          <div className="space-y-12">
            {/* Reformer Pilates (GROUP) Section */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Reformer Pilates (GROUP)</h2>
                <p className="tagline text-[#1a260e]/60">All classes valid for 30 days</p>
              </div>

              {/* Pricing Options */}
              <div className="space-y-6">
                {/* Single Class */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">Single Class Drop In</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£25</p>
                  </div>
                </div>

                {/* 4 Classes */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">4 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£90</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £10</p>
                  </div>
                </div>

                {/* 8 Classes */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">8 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£170</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £30</p>
                  </div>
                </div>

                {/* 12 Classes */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">12 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£240</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £60</p>
                  </div>
                </div>

                {/* Unlimited */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">Unlimited Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£300</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £100+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hot Pilates (Small Group) Section */}
            <div className="space-y-8 pt-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">Hot Pilates (Small Group)</h2>
                <p className="tagline text-[#1a260e]/60">All classes valid for 30 days</p>
              </div>

              <div className="space-y-6">
                {/* Single Class */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">Single Class Drop In</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£30</p>
                  </div>
                </div>

                {/* 4 Classes */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">4 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£110</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £10</p>
                  </div>
                </div>

                {/* 8 Classes */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">8 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£205</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £35</p>
                  </div>
                </div>

                {/* 12 Classes */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">12 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£290</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £70</p>
                  </div>
                </div>

                {/* Unlimited */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">Unlimited Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£350</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £130+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1-1 (Private) Sessions */}
            <div className="space-y-8 pt-8">
              <div className="text-center space-y-2">
                <h2 className="heading-secondary">1-1 (Private)</h2>
                <p className="tagline text-[#1a260e]/60">All sessions valid for 30 days</p>
              </div>

              <div className="space-y-6">
                {/* Single Session */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">Single Class Drop In</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£65</p>
                  </div>
                </div>

                {/* 4 Sessions */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">4 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£235</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £25</p>
                  </div>
                </div>

                {/* 8 Sessions */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">8 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£440</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £80</p>
                  </div>
                </div>

                {/* 12 Sessions */}
                <div className="flex justify-between items-center py-6 border-b border-[#1a260e]/10">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-light">12 Classes</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-light">£620</p>
                    <p className="font-sans text-sm text-green-700 font-medium">save £160</p>
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
          <h2 className="heading-secondary text-[#fffcf2] mb-6">Ready to Start Your Journey?</h2>
          <p className="body-text text-[#fffcf2]/80 mb-8">
            Join our community and discover the transformative power of Pilates
          </p>
          <a
            href="/book"
            className="inline-block bg-[#fffcf2] text-[#1a260e] px-8 py-4 font-serif text-lg hover:bg-[#fffcf2]/90 transition-colors duration-200"
          >
            BOOK YOUR CLASS
          </a>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width max-w-4xl">
          <div className="text-center space-y-6">
            <h3 className="font-serif text-2xl font-light">Terms & Conditions</h3>
            <div className="space-y-2 max-w-2xl mx-auto">
              <p className="font-sans text-sm text-[#1a260e]/70">
                • All classes and packages are valid for 30 days from purchase
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