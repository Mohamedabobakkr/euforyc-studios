import { pageMetadata } from '@/lib/site';
import Link from 'next/link';
import PillLink from '@/components/euforyc/PillLink';

export const metadata = pageMetadata({
  title: 'Prices | Pilates Classes, Packages & Memberships',
  description: 'Prices at Euforyc Studios in Edgware. Group class drop-ins £28 (Sculpt Mat Pilates and Belly Dance £20), Try It All intro offer 3 classes for £60, Euforyc Package from £105, MOVE package from £70, Euforyc Membership from £90 a month, private 1:1 sessions £75.',
  path: '/pricing',
});

// Shared styles for the price list rows
const group = 'grid grid-cols-12 gap-x-6 gap-y-7 border-t border-eu-ink pt-8 md:pt-10';
const groupHead = 'col-span-12 lg:col-span-4 space-y-4 lg:sticky lg:top-[calc(var(--eu-header-space)+32px)] lg:self-start';
const groupH2 = 'font-serif font-normal text-[clamp(34px,3.6vw,52px)] leading-[1.05] tracking-[-0.02em] text-eu-ink';
const groupCap = 'eu-cap text-eu-green leading-[1.8]';
const groupRows = 'col-span-12 lg:col-start-6 lg:col-span-7';
const groupCta = 'col-span-12 lg:col-start-6 lg:col-span-7 pt-2';
const row = 'flex justify-between items-center gap-5 py-5 md:py-6 border-b border-[#1a260e]/15';
const rowName = 'font-serif font-normal text-[22px] md:text-[26px] leading-[1.2]';
const rowLink = 'underline-offset-4 decoration-1 hover:underline';
const rowSub = 'text-[14px] text-eu-sage mt-1.5';
const rowPrice = 'font-serif font-normal text-[32px] md:text-[40px] leading-none tracking-[-0.02em] whitespace-nowrap';
const rowSave = 'inline-block mt-2.5 rounded-full bg-eu-beige px-3 py-1 text-[13px] text-eu-green whitespace-nowrap';
const perMonth = 'font-sans text-[14px] tracking-normal ml-1';

export default function Pricing() {
  return (
    <div className="eu-page-top">
      {/* Header */}
      <section className="bg-eu-cream pt-[clamp(48px,6vw,96px)] pb-[clamp(56px,7vw,110px)]">
        <div className="eu-wrap grid grid-cols-12 gap-x-6 items-end">
          <div className="col-span-12 lg:col-span-7 eu-fade-in">
            <p className="eu-cap eu-cap-num text-eu-green">TRANSPARENT PRICING</p>
            <h1 className="font-serif font-normal text-[clamp(52px,8.2vw,132px)] leading-[0.93] tracking-[-0.035em] text-eu-ink mt-6 md:mt-7">Price List</h1>
          </div>
          <div className="col-span-12 lg:col-start-8 lg:col-span-5 mt-7 lg:mt-0 eu-fade-in" style={{ animationDelay: '.15s' }}>
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-eu-green">
              Group class packages are valid for 30 days from your first class. First-time clients can start with our Try It All intro offer: 3 classes for £60, valid for 20 days from your first class.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="bg-eu-cream pb-[clamp(80px,9vw,140px)]">
        <div className="eu-wrap">
          <div className="space-y-[clamp(56px,7vw,96px)]">

            {/* Try It All Intro Offer Section */}
            <div className={`${group} eu-rv`}>
              <div className={groupHead}>
                <h2 className={groupH2}>Try It All</h2>
                <p className={groupCap}>INTRO OFFER • ALL GROUP CLASSES</p>
              </div>

              <div className={groupRows}>
                <div className="flex justify-between items-center gap-5 py-6 bg-eu-beige px-5 md:px-7 rounded-eu-sm">
                  <div>
                    <h3 className={rowName}>Try It All (3 Classes)</h3>
                    <p className={rowSub}>First-time clients only • Valid 20 days from first class</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£60</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Drop-in Prices Section */}
            <div className={`${group} eu-rv`}>
              <div className={groupHead}>
                <h2 className={groupH2}>Drop-in Classes</h2>
                <p className={groupCap}>SINGLE CLASS • PAY AS YOU GO</p>
              </div>

              <div className={groupRows}>
                <div className={row}>
                  <div>
                    <h3 className={rowName}><Link href="/classes/reformer-pilates" className={rowLink}>Reformer Pilates</Link></h3>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£28</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}><Link href="/classes/hot-pilates" className={rowLink}>Hot Pilates</Link></h3>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£28</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}><Link href="/classes/red-light-hot-mat-pilates" className={rowLink}>Red Light Hot Pilates</Link></h3>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£28</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}><Link href="/classes/barre" className={rowLink}>Barre</Link></h3>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£28</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}><Link href="/classes/sculpt-mat-pilates" className={rowLink}>Sculpt Mat Pilates</Link></h3>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£20</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}><Link href="/classes/belly-dance" className={rowLink}>Belly Dance</Link></h3>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£20</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Euforyc Membership Section */}
            <div className={`${group} eu-rv`}>
              <div className={groupHead}>
                <h2 className={groupH2}>Euforyc <em>Membership</em></h2>
                <p className={groupCap}>ALL GROUP CLASSES • 6-MONTH MINIMUM TERM, MONTHLY ROLLING</p>
              </div>

              <div className={groupRows}>
                {[
                  { name: 'Euforyc 4', price: '£90', perClass: '£22.50 per class' },
                  { name: 'Euforyc 8', price: '£165', perClass: '£20.63 per class' },
                  { name: 'Euforyc 12', price: '£240', perClass: '£20 per class' },
                ].map((tier) => (
                  <div key={tier.name} className={row}>
                    <div>
                      <h3 className={rowName}>{tier.name}</h3>
                      <p className={rowSub}>{tier.perClass}</p>
                    </div>
                    <div className="text-right">
                      <p className={rowPrice}>{tier.price}<span className={`${perMonth} text-eu-sage`}>/mo</span></p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center gap-5 py-6 bg-eu-green text-eu-cream px-5 md:px-7 rounded-eu-sm mt-4">
                  <div>
                    <p className="eu-cap text-[#F5F0E8] mb-2">Best Value</p>
                    <h3 className={rowName}>Euforyc Unlimited</h3>
                    <p className="text-[14px] text-[#F5F0E8] mt-1.5">Unlimited classes + exclusive perks</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£280<span className={`${perMonth} text-[#F5F0E8]`}>/mo</span></p>
                  </div>
                </div>
              </div>

              <div className={groupCta}>
                <PillLink href="/memberships" variant="ink" dot stretchMobile>
                  VIEW MEMBERSHIPS
                </PillLink>
              </div>
            </div>

            {/* Euforyc Package Section */}
            <div className={`${group} eu-rv`}>
              <div className={groupHead}>
                <h2 className={groupH2}>Euforyc <em>Package</em></h2>
                <p className={groupCap}>ALL GROUP CLASSES • VALID 30 DAYS FROM FIRST CLASS • NO CONTRACT</p>
              </div>

              <div className={groupRows}>
                <div className={row}>
                  <div>
                    <h3 className={rowName}>4 Euforyc Classes</h3>
                    <p className={rowSub}>£26.25 per class</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£105</p>
                    <p className={rowSave}>save £7</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}>8 Euforyc Classes</h3>
                    <p className={rowSub}>£23.75 per class</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£190</p>
                    <p className={rowSave}>save £34</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}>12 Euforyc Classes</h3>
                    <p className={rowSub}>£22.50 per class</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£270</p>
                    <p className={rowSave}>save £66</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}>30 Days Unlimited</h3>
                    <p className={rowSub}>Unlimited Euforyc classes for 30 days</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£320</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MOVE Package Section */}
            <div className={`${group} eu-rv`}>
              <div className={groupHead}>
                <h2 className={groupH2}>MOVE</h2>
                <p className={groupCap}>SCULPT MAT PILATES &amp; BELLY DANCE • VALID 30 DAYS FROM FIRST CLASS • NO CONTRACT</p>
              </div>

              <div className={groupRows}>
                <div className={row}>
                  <div>
                    <h3 className={rowName}>4 MOVE Classes</h3>
                    <p className={rowSub}>£17.50 per class</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£70</p>
                    <p className={rowSave}>save £10</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}>8 MOVE Classes</h3>
                    <p className={rowSub}>£16.88 per class</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£135</p>
                    <p className={rowSave}>save £25</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 1-1 Private Cadillac Reformer Sessions */}
            <div className={`${group} eu-rv`}>
              <div className={groupHead}>
                <h2 className={groupH2}><Link href="/classes/private-cadillac-reformer-pilates" className={rowLink}>1-1 Private Cadillac Reformer</Link></h2>
                <p className={groupCap}>CADILLAC REFORMER • PERSONALIZED TRAINING • 60 MIN</p>
              </div>

              <div className={groupRows}>
                <div className={row}>
                  <div>
                    <h3 className={rowName}>Single Session (Drop-in)</h3>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£75</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}>4 Sessions</h3>
                    <p className={rowSub}>Valid for 90 days</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£250</p>
                    <p className={rowSave}>save £50</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}>8 Sessions</h3>
                    <p className={rowSub}>Valid for 90 days</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£490</p>
                    <p className={rowSave}>save £110</p>
                  </div>
                </div>

                <div className={row}>
                  <div>
                    <h3 className={rowName}>12 Sessions</h3>
                    <p className={rowSub}>Valid for 90 days</p>
                  </div>
                  <div className="text-right">
                    <p className={rowPrice}>£700</p>
                    <p className={rowSave}>save £200</p>
                  </div>
                </div>
              </div>

              <div className={groupCta}>
                <PillLink href="/packages" variant="ink" dot stretchMobile>
                  VIEW PACKAGES
                </PillLink>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="eu-wrap">
        <section className="eu-on-dark rounded-eu-lg md:rounded-eu-xl bg-eu-ink text-eu-cream px-6 py-14 md:px-12 md:py-24">
          <div className="text-center">
            <h2 className="font-serif font-normal text-[clamp(38px,5vw,76px)] leading-[1.02] tracking-[-0.022em] mb-6">Ready to Start Your Journey?</h2>
            <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#F5F0E8] mb-9 max-w-xl mx-auto">
              Join our community and discover the transformative power of movement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <PillLink href="/book" variant="cream" dot stretchMobile>
                BOOK A CLASS
              </PillLink>
              <PillLink href="/packages" variant="ghost" stretchMobile>
                VIEW PACKAGES
              </PillLink>
            </div>
          </div>
        </section>
      </div>

      {/* Terms & Conditions */}
      <section className="bg-eu-cream pt-[clamp(56px,7vw,110px)] pb-[clamp(80px,9vw,140px)]">
        <div className="eu-wrap">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-[#1a260e]/15 pt-8 md:pt-10">
            <h3 className="col-span-12 lg:col-span-4 font-serif font-normal text-[30px] md:text-[40px] leading-[1.1] text-eu-ink">Terms & Conditions</h3>
            <div className="col-span-12 lg:col-start-6 lg:col-span-7 space-y-3 text-left">
              <p className="font-sans text-[15px] leading-[1.65] text-eu-green">
                • Class packages (Euforyc Package and MOVE) are valid for 30 days from your first class attended (1-1 Cadillac packages: 90 days)
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-eu-green">
                • Try It All is valid for 20 days from your first class attended
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-eu-green">
                • Try It All is for first-time clients only, can only be bought once and cannot be combined with other offers
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-eu-green">
                • All packages are non-refundable and non-transferable
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-eu-green">
                • 24-hour cancellation policy applies to all bookings
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-eu-green">
                • Prices are subject to change with 30 days notice
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-eu-green">
                • Euforyc Memberships have a 6-month minimum term, then continue monthly until cancelled with two full billing cycles&apos; notice
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
