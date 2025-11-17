import type { Metadata } from 'next';
import Image from 'next/image';
import { Gift, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gift Cards - Euforyc Studios',
  description: 'Give the gift of euforyc. Euforyc Studios gift cards for pilates classes in London. Perfect for birthdays, celebrations, or self-care.',
};

export default function GiftCards() {
  return (
    <>
      <div className="pt-32">
        {/* Hero Section */}
        <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#fffcf2] via-[#f5f1e8] to-[#fffcf2]">
          {/* Content */}
          <div className="container-width z-10 relative px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div className="space-y-6 animate-fade-up text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1a260e]/10 backdrop-blur-sm rounded-full mb-4">
                  <Gift className="h-10 w-10 text-[#1a260e]" />
                </div>
                <h1 className="font-serif text-5xl md:text-7xl text-[#1a260e] tracking-wider">
                  GIVE THE GIFT
                  <span className="block mt-2">OF EUFORYC</span>
                </h1>
                <p className="tagline text-[#1a260e]/70 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
                  Share the transformative power of Pilates with someone special
                </p>
              </div>

              {/* Right: Gift Card Image */}
              <div className="relative w-full max-w-lg mx-auto lg:mx-0">
                <a
                  href="https://momence.com/euforyc/gift-card-checkout/75303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <div className="relative aspect-[1.586/1] w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <Image
                      src="/giftcardfront.jpg"
                      alt="Euforyc Studios gift card front"
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                      quality={100}
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="heading-secondary">The Perfect Gift</h2>
              <p className="body-text text-lg">
                A Euforyc Studios gift card is more than just a present, it is an invitation to transformation,
                self-care, and strength. Whether it is for a birthday, celebration, or simply showing you care,
                give the gift of mindful movement and lasting wellness.
              </p>
            </div>
          </div>
        </section>

        {/* Gift Card Options Section */}
        <section className="section-padding bg-gradient-to-b from-[#fffcf2] to-[#f5f1e8]">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-secondary mb-4">Choose Your Amount</h2>
                <p className="tagline text-[#1a260e]/60">Flexible gift card values for any occasion</p>
              </div>

              {/* Gift Card Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Left: Gift Card Images - Front & Back */}
                <div className="space-y-6">
                  <a
                    href="https://momence.com/euforyc/gift-card-checkout/75303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group cursor-pointer"
                  >
                    <div className="relative aspect-[1.586/1] w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                      <Image
                        src="/giftcardfront.jpg"
                        alt="Euforyc Studios gift card front design"
                        fill
                        className="object-contain drop-shadow-2xl rounded-lg"
                        quality={100}
                      />
                    </div>
                    <p className="text-center text-sm text-[#1a260e]/60 mt-3 font-sans tracking-wide">FRONT</p>
                  </a>
                  <a
                    href="https://momence.com/euforyc/gift-card-checkout/75303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group cursor-pointer"
                  >
                    <div className="relative aspect-[1.586/1] w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                      <Image
                        src="/giftcardback.jpg"
                        alt="Euforyc Studios gift card back design"
                        fill
                        className="object-contain drop-shadow-2xl rounded-lg"
                        quality={100}
                      />
                    </div>
                    <p className="text-center text-sm text-[#1a260e]/60 mt-3 font-sans tracking-wide">BACK</p>
                  </a>
                </div>

                {/* Right: Popular Amounts */}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl mb-6 text-[#1a260e]">Popular Amounts</h3>
                  <div className="space-y-3">
                    {[
                      { amount: '£60', description: 'Perfect for a 3-class intro package' },
                      { amount: '£90', description: 'Great for a 4-class reformer package' },
                      { amount: '£170', description: 'Ideal for an 8-class package' },
                      { amount: '£240', description: 'Perfect for a 12-class package' },
                      { amount: 'Custom', description: 'Choose any amount that works for you' }
                    ].map((option, index) => (
                      <a
                        key={index}
                        href="https://momence.com/euforyc/gift-card-checkout/75303"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-[#1a260e]/10 hover:bg-white/80 transition-all duration-300 group/item cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <div>
                          <p className="font-serif text-xl text-[#1a260e] group-hover/item:scale-105 transition-transform duration-300">
                            {option.amount}
                          </p>
                          <p className="text-sm text-[#1a260e]/60 mt-1">
                            {option.description}
                          </p>
                        </div>
                        <Sparkles className="h-5 w-5 text-[#1a260e]/40 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href="https://momence.com/euforyc/gift-card-checkout/75303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#1a260e] text-[#fffcf2] px-12 py-5 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#1a260e]/90 hover:scale-[1.02] hover:shadow-xl"
                >
                  <Gift className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  PURCHASE GIFT CARD
                  <ExternalLink className="h-4 w-4 opacity-60" />
                </a>
                <p className="text-sm text-[#1a260e]/60 mt-4">
                  Secure checkout powered by Momence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-padding bg-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-secondary">How It Works</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a260e] rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                    <span className="font-serif text-2xl text-[#fffcf2]">1</span>
                  </div>
                  <h3 className="font-serif text-xl">Choose Your Amount</h3>
                  <p className="text-sm text-[#1a260e]/70">
                    Select from our popular amounts or choose a custom value that is perfect for your recipient
                  </p>
                </div>

                <div className="text-center space-y-4 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a260e] rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                    <span className="font-serif text-2xl text-[#fffcf2]">2</span>
                  </div>
                  <h3 className="font-serif text-xl">Personalize Your Gift</h3>
                  <p className="text-sm text-[#1a260e]/70">
                    Add a personal message and choose when you would like the gift card delivered via email
                  </p>
                </div>

                <div className="text-center space-y-4 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a260e] rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                    <span className="font-serif text-2xl text-[#fffcf2]">3</span>
                  </div>
                  <h3 className="font-serif text-xl">They Start Their Journey</h3>
                  <p className="text-sm text-[#1a260e]/70">
                    Your recipient can redeem their gift card for any classes or packages at Euforyc Studios
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-gradient-to-b from-[#fffcf2] to-[#f5f1e8]">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-secondary">Why Choose Our Gift Cards</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="flex gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#1a260e] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="h-6 w-6 text-[#fffcf2]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg mb-2">{benefit.title}</h3>
                      <p className="text-sm text-[#1a260e]/70">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
          <div className="container-width">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#fffcf2]/10 backdrop-blur-sm rounded-full">
                <Gift className="h-8 w-8 text-[#fffcf2]" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl">
                Ready to Give the Gift of Wellness?
              </h2>
              <p className="text-[#fffcf2]/80 text-lg">
                Purchase a gift card today and share the transformative power of Pilates with someone you care about.
              </p>
              <div className="pt-4">
                <a
                  href="https://momence.com/euforyc/gift-card-checkout/75303"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#fffcf2] text-[#1a260e] px-12 py-5 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#fffcf2]/90 hover:scale-[1.02] hover:shadow-xl"
                >
                  <Gift className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  PURCHASE GIFT CARD
                  <ExternalLink className="h-4 w-4 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
