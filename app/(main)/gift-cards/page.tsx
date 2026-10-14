import { pageMetadata } from '@/lib/site';
import Image from 'next/image';
import { Gift, Heart, Sparkles } from 'lucide-react';
import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';

export const metadata = pageMetadata({
  title: 'Gift Cards | Pilates Gift Vouchers',
  description: 'Give the gift of wellness. Euforyc Studios gift cards for Reformer Pilates, Hot Pilates, private sessions and more in Edgware, London. For birthdays, celebrations and self-care treats.',
  path: '/gift-cards',
});

// Section headings share the homepage's display type
const H2_CLASS = 'font-serif text-[clamp(38px,4.8vw,72px)] font-normal leading-[1.02] tracking-[-0.02em] text-eu-ink';

export default function GiftCards() {
  return (
    <>
      <div className="eu-page-top">
        {/* Hero Section */}
        <section className="relative">
          {/* Content */}
          <div className="eu-wrap pb-[clamp(72px,9vw,140px)] pt-[clamp(40px,5vw,80px)]">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-x-6">
              {/* Left: Text Content */}
              <div className="eu-fade-in text-center lg:col-span-6 lg:text-left">
                <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#1a260e]/20">
                  <Gift className="h-7 w-7 text-eu-ink" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h1 className="font-serif text-[clamp(40px,5.6vw,96px)] font-normal leading-[0.98] tracking-[0.02em] text-eu-ink">
                  GIVE THE GIFT{' '}
                  <span className="mt-2 block">OF <em>EUFORYC</em></span>
                </h1>
                <p className="mx-auto mt-7 max-w-xl font-serif text-[clamp(20px,1.8vw,26px)] italic leading-[1.4] text-eu-green lg:mx-0">
                  Share the transformative power of Pilates with someone special
                </p>
              </div>

              {/* Right: Gift Card Image */}
              <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
                <a
                  href="https://momence.com/euforyc/gift-card-checkout/75303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer rounded-[28px] bg-eu-beige px-[clamp(24px,6vw,80px)] py-[clamp(40px,7vw,96px)] md:rounded-eu-xl"
                >
                  <div className="relative aspect-[1320/915] w-full -rotate-2 overflow-hidden rounded-[14px] shadow-[0_34px_60px_-30px_rgba(26,38,14,0.55)] transition-transform duration-700 ease-eu group-hover:rotate-0 group-hover:scale-[1.03]">
                    <Image
                      src="/giftcardfront.jpg"
                      alt="Euforyc Studios gift card front"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1023px) 80vw, 520px"
                      priority
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="eu-wrap pb-[clamp(72px,9vw,140px)]">
          <div className="grid grid-cols-1 items-end gap-y-6 border-t border-[#1a260e]/15 pt-[clamp(48px,5vw,72px)] lg:grid-cols-12 lg:gap-x-6">
            <h2 className={`${H2_CLASS} lg:col-span-6`}>The Perfect <em>Gift</em></h2>
            <p className="font-sans text-[17px] leading-[1.75] text-eu-green md:text-lg lg:col-span-5 lg:col-start-8">
              A Euforyc Studios gift card is more than just a present, it is an invitation to transformation,
              self-care, and strength. Whether it is for a birthday, celebration, or simply showing you care,
              give the gift of mindful movement and lasting wellness.
            </p>
          </div>
        </section>

        {/* Gift Card Options Section */}
        <section className="mx-[clamp(10px,1.5vw,24px)] rounded-[32px] bg-eu-beige py-[clamp(72px,9vw,140px)] md:rounded-eu-xl">
          <div className="eu-wrap">
            <div className="mx-auto max-w-[1180px]">
              <div className="mb-12 text-center md:mb-16">
                <h2 className={`${H2_CLASS} mb-5`}>Choose Your <em>Amount</em></h2>
                <p className="eu-tagline">Flexible gift card values for any occasion</p>
              </div>

              {/* Gift Card Display */}
              <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
                {/* Left: Gift Card Images - Front & Back */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-8">
                  <a
                    href="https://momence.com/euforyc/gift-card-checkout/75303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block cursor-pointer"
                  >
                    <div className="relative aspect-[1320/915] w-full overflow-hidden rounded-[10px] shadow-[0_24px_44px_-26px_rgba(26,38,14,0.55)] transition-transform duration-500 ease-eu group-hover:-translate-y-1 md:rounded-[14px]">
                      <Image
                        src="/giftcardfront.jpg"
                        alt="Euforyc Studios gift card front design"
                        fill
                        className="object-cover"
                        sizes="(max-width: 767px) 45vw, 560px"
                      />
                    </div>
                    <p className="mt-3 text-center font-sans text-[12px] uppercase tracking-[0.22em] text-eu-sage">FRONT</p>
                  </a>
                  <a
                    href="https://momence.com/euforyc/gift-card-checkout/75303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block cursor-pointer"
                  >
                    <div className="relative aspect-[1320/915] w-full overflow-hidden rounded-[10px] shadow-[0_24px_44px_-26px_rgba(26,38,14,0.55)] transition-transform duration-500 ease-eu group-hover:-translate-y-1 md:rounded-[14px]">
                      <Image
                        src="/giftcardback.jpg"
                        alt="Euforyc Studios gift card back design"
                        fill
                        className="object-cover"
                        sizes="(max-width: 767px) 45vw, 560px"
                      />
                    </div>
                    <p className="mt-3 text-center font-sans text-[12px] uppercase tracking-[0.22em] text-eu-sage">BACK</p>
                  </a>
                </div>

                {/* Right: Popular Amounts */}
                <div className="min-w-0">
                  <h3 className="mb-6 font-serif text-[clamp(26px,2.4vw,34px)] font-normal text-eu-ink">Popular Amounts</h3>
                  <div className="space-y-3">
                    {[
                      { amount: '£60', description: 'Perfect for a 3-class intro package' },
                      { amount: '£90', description: 'Great towards a Euforyc Package' },
                      { amount: '£170', description: 'Ideal for an 8-class package' },
                      { amount: '£240', description: 'Perfect for a 12-class package' },
                      { amount: 'Custom', description: 'Choose any amount that works for you' }
                    ].map((option, index) => (
                      <a
                        key={index}
                        href="https://momence.com/euforyc/gift-card-checkout/75303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/item flex min-h-[80px] cursor-pointer items-center justify-between gap-4 rounded-eu-sm border border-[#1a260e]/15 bg-eu-cream py-4 pl-6 pr-4 transition-colors duration-300 hover:border-eu-ink"
                      >
                        <div className="min-w-0">
                          <p className="font-serif text-[28px] leading-none text-eu-ink">
                            {option.amount}
                          </p>
                          <p className="mt-2 font-sans text-[15px] leading-snug text-eu-green">
                            {option.description}
                          </p>
                        </div>
                        <span
                          className="grid h-11 w-11 flex-none place-items-center rounded-full border border-[#1a260e]/25 text-eu-ink transition-[transform,background-color,color] duration-500 ease-eu group-hover/item:-rotate-45 group-hover/item:border-eu-ink group-hover/item:bg-eu-ink group-hover/item:text-eu-cream"
                          aria-hidden="true"
                        >
                          <Arrow />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <PillLink
                  href="https://momence.com/euforyc/gift-card-checkout/75303"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ink"
                  dot
                  stretchMobile
                >
                  PURCHASE GIFT CARD
                </PillLink>
                <p className="mt-4 font-sans text-[14px] text-eu-sage">
                  Secure checkout powered by Momence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="eu-wrap py-[clamp(72px,9vw,140px)]">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-12 text-center md:mb-16">
              <h2 className={H2_CLASS}>How It <em>Works</em></h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="group space-y-3 rounded-eu-md border border-[#1a260e]/15 p-7 md:p-8">
                <div className="mb-4">
                  <span className="font-serif text-[52px] italic leading-none text-eu-green">1</span>
                </div>
                <h3 className="font-serif text-[26px] font-normal leading-tight text-eu-ink">Choose Your Amount</h3>
                <p className="font-sans text-[15.5px] leading-[1.65] text-eu-green">
                  Select from our popular amounts or choose a custom value that is perfect for your recipient
                </p>
              </div>

              <div className="group space-y-3 rounded-eu-md border border-[#1a260e]/15 p-7 md:p-8">
                <div className="mb-4">
                  <span className="font-serif text-[52px] italic leading-none text-eu-green">2</span>
                </div>
                <h3 className="font-serif text-[26px] font-normal leading-tight text-eu-ink">Personalize Your Gift</h3>
                <p className="font-sans text-[15.5px] leading-[1.65] text-eu-green">
                  Add a personal message and choose when you would like the gift card delivered via email
                </p>
              </div>

              <div className="group space-y-3 rounded-eu-md border border-[#1a260e]/15 p-7 md:p-8">
                <div className="mb-4">
                  <span className="font-serif text-[52px] italic leading-none text-eu-green">3</span>
                </div>
                <h3 className="font-serif text-[26px] font-normal leading-tight text-eu-ink">They Start Their Journey</h3>
                <p className="font-sans text-[15.5px] leading-[1.65] text-eu-green">
                  Your recipient can redeem their gift card for any classes or packages at Euforyc Studios
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="eu-wrap pb-[clamp(72px,9vw,140px)]">
          <div className="mx-auto max-w-[1180px] border-t border-[#1a260e]/15 pt-[clamp(56px,7vw,110px)]">
            <div className="mb-12 text-center md:mb-16">
              <h2 className={H2_CLASS}>Why Choose Our Gift <em>Cards</em></h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  icon: Heart,
                  title: 'Thoughtful & Meaningful',
                  description: 'Give the gift of self-care, strength, and transformation'
                },
                {
                  icon: Sparkles,
                  title: 'Flexible & Convenient',
                  description: 'Redeemable for any class type or package at Euforyc Studios'
                },
                {
                  icon: Gift,
                  title: 'Instant Delivery',
                  description: 'Digital gift cards delivered instantly or scheduled for a special date'
                },
                {
                  icon: Heart,
                  title: 'Valid for 90 Days',
                  description: 'Gift cards are valid for 90 days from the date of purchase'
                }
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="group flex gap-5 rounded-eu-md bg-eu-beige p-6 md:p-8"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eu-ink">
                      <benefit.icon className="h-5 w-5 text-eu-cream" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-2 font-serif text-[22px] font-normal leading-tight text-eu-ink">{benefit.title}</h3>
                    <p className="font-sans text-[15.5px] leading-[1.6] text-eu-green">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="eu-on-dark mx-[clamp(10px,1.5vw,24px)] mb-[clamp(64px,8vw,120px)] rounded-[32px] bg-eu-ink px-[clamp(20px,4.5vw,72px)] py-[clamp(72px,9vw,140px)] text-eu-cream md:rounded-eu-xl">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#fffcf2]/30">
                <Gift className="h-7 w-7 text-eu-cream" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h2 className="font-serif text-[clamp(38px,5vw,76px)] font-normal leading-[1.02] tracking-[-0.02em] text-eu-cream">
                Ready to Give the Gift of <em>Wellness</em>?
              </h2>
              <p className="mx-auto max-w-xl font-sans text-[17px] leading-[1.7] text-[#F5F0E8] md:text-lg">
                Purchase a gift card today and share the transformative power of Pilates with someone you care about.
              </p>
              <div className="pt-2">
                <PillLink
                  href="https://momence.com/euforyc/gift-card-checkout/75303"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="cream"
                  dot
                  stretchMobile
                >
                  PURCHASE GIFT CARD
                </PillLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
