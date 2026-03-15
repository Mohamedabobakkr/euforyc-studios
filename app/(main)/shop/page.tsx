import type { Metadata } from 'next';
import Image from 'next/image';
import { ShoppingBag, Sparkles, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop | Pilates Accessories & Merchandise',
  description: 'Shop Euforyc Studios merchandise. Premium grip socks, tote bags, and pilates accessories in Edgware, London. Perfect for your studio practice or as gifts.',
  keywords: ['pilates grip socks', 'pilates accessories london', 'euforyc merchandise', 'pilates tote bag', 'studio accessories uk'],
  alternates: { canonical: 'https://euforyc.co.uk/shop' },
};

interface Product {
  name: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  momenceUrl: string;
  features: string[];
  badge?: string;
}

const products: Product[] = [
  {
    name: 'EPS Grip Socks',
    tagline: 'Move with confidence and control',
    description: 'Soft, secure and made for every class. Designed to keep you grounded in Reformer, mat Pilates, Barre and yoga.',
    price: '£10.99',
    image: '/gripsocks.png',
    momenceUrl: 'https://momence.com/euforyc/product/EPS-Grip-Socks/342282',
    badge: 'ESSENTIAL',
    features: [
      'Premium breathable cotton blend',
      'Full-sole non-slip grip pattern',
      'Snug cuff for secure fit',
      'Perfect for all studio classes'
    ]
  },
  {
    name: 'EPS Tote Bag',
    tagline: 'Your everyday studio companion',
    description: 'A soft, sturdy canvas tote that carries everything you need for class and beyond. From studio to street with effortless style.',
    price: '£16.99',
    image: '/totebag.jpg',
    momenceUrl: 'https://momence.com/euforyc/product/EPS-Tote-Bag/342289',
    badge: 'BESTSELLER',
    features: [
      'Durable cotton canvas',
      'Comfortable shoulder straps',
      'Spacious main compartment',
      'Neutral versatile design'
    ]
  }
];

export default function Shop() {
  return (
    <div className="pt-24 md:pt-32">
      {/* Hero Section - Mobile-First Enhanced */}
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-[#f5f1e8] via-[#fffcf2] to-[#fffcf2] overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-24 md:w-32 h-24 md:h-32 bg-[#1a260e]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-32 md:w-40 h-32 md:h-40 bg-[#1a260e]/5 rounded-full blur-3xl"></div>

        <div className="container-width text-center relative z-10 px-5 md:px-4">
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#1a260e]/10 mb-1 md:mb-2">
              <Sparkles className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#1a260e]" />
              <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-[#1a260e]/80 uppercase">Studio Essentials</span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#1a260e] tracking-wider leading-tight px-4">
              STUDIO SHOP
            </h1>

            <p className="font-sans text-base md:text-lg text-[#1a260e]/70 max-w-xl mx-auto leading-relaxed px-4">
              Thoughtfully curated essentials for your pilates practice
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid - Mobile-First Premium Design */}
      <section className="py-10 md:py-16 lg:py-20 bg-[#fffcf2]">
        <div className="container-width px-6 md:px-6">
          <div className="max-w-sm md:max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 lg:gap-12">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl md:rounded-3xl overflow-hidden shadow-md md:shadow-md hover:shadow-2xl transition-all duration-500 md:hover:-translate-y-2"
                >
                  {/* Badge - Mobile Optimized */}
                  {product.badge && (
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 z-10">
                      <div className="bg-[#1a260e] text-[#fffcf2] px-2.5 md:px-3 py-1 rounded-full shadow-lg">
                        <span className="font-sans text-[9px] md:text-[10px] tracking-[0.15em] font-medium">{product.badge}</span>
                      </div>
                    </div>
                  )}

                  {/* Product Image - Mobile-First */}
                  <a
                    href={product.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative overflow-hidden bg-gradient-to-br from-[#f5f1e8] to-[#fffcf2] active:opacity-90 transition-opacity"
                  >
                    <div className="aspect-[4/5] md:aspect-[4/3] relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-[#1a260e]/0 group-hover:bg-[#1a260e]/5 transition-all duration-500"></div>
                    </div>
                  </a>

                  {/* Product Details - Mobile-Optimized Spacing */}
                  <div className="p-4 md:p-6 space-y-2.5 md:space-y-4">
                    {/* Name & Tagline */}
                    <div className="space-y-1 md:space-y-2">
                      <h3 className="font-serif text-lg md:text-2xl font-light text-[#1a260e] tracking-wide">
                        {product.name}
                      </h3>
                      <p className="font-sans text-[9px] md:text-xs tracking-[0.15em] text-[#1a260e]/60 uppercase">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Price - Mobile Enhanced */}
                    <div className="flex items-baseline gap-1.5">
                      <p className="font-serif text-xl md:text-3xl text-[#1a260e]">{product.price}</p>
                      <span className="font-sans text-[10px] md:text-xs text-[#1a260e]/50">GBP</span>
                    </div>

                    {/* Description - Mobile Readable */}
                    <p className="font-sans text-xs md:text-sm text-[#1a260e]/70 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features - Mobile-Friendly Spacing */}
                    <div className="pt-1 md:pt-2 space-y-1.5 md:space-y-1.5">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2 md:gap-2">
                          <div className="w-1 h-1 md:w-1 md:h-1 rounded-full bg-[#1a260e]/30 mt-1 md:mt-1.5 flex-shrink-0"></div>
                          <span className="font-sans text-[11px] md:text-xs text-[#1a260e]/70 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Buy Button - Mobile-First Touch Target */}
                    <a
                      href={product.momenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full mt-3 md:mt-6"
                    >
                      <div className="group relative bg-[#1a260e] text-[#fffcf2] py-3 md:py-3 px-5 md:px-6 text-center overflow-hidden transition-all duration-300 active:scale-[0.98] md:hover:bg-[#2a3a21] rounded-lg md:rounded-none">
                        <div className="relative z-10 flex items-center justify-center gap-2 md:gap-2">
                          <span className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-medium">Add to Cart</span>
                          <ExternalLink className="h-3.5 md:h-4 w-3.5 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                      </div>
                    </a>

                    {/* In-studio note */}
                    <p className="text-center font-sans text-[8px] md:text-[10px] text-[#1a260e]/40 tracking-wider uppercase pt-1 md:pt-2">
                      Available in studio
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Mobile-First */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#fffcf2] to-[#f5f1e8]">
        <div className="container-width px-5 md:px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[#1a260e] mb-3 px-4">
                The Euforyc Difference
              </h2>
              <div className="w-16 h-[1px] bg-[#1a260e]/20 mx-auto"></div>
            </div>

            {/* Benefits Grid - Mobile Optimized */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center space-y-3 md:space-y-4 group px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-[#1a260e]/10 group-hover:border-[#1a260e]/30 transition-all duration-300 shadow-sm">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-[#1a260e]" />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <h3 className="font-serif text-base md:text-lg font-light">Studio Quality</h3>
                  <p className="font-sans text-xs md:text-xs text-[#1a260e]/70 leading-relaxed max-w-xs mx-auto">
                    Premium products we trust and use in our classes daily
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3 md:space-y-4 group px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-[#1a260e]/10 group-hover:border-[#1a260e]/30 transition-all duration-300 shadow-sm">
                  <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-[#1a260e]" />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <h3 className="font-serif text-base md:text-lg font-light">Easy Collection</h3>
                  <p className="font-sans text-xs md:text-xs text-[#1a260e]/70 leading-relaxed max-w-xs mx-auto">
                    Order online and collect at the studio or purchase in person
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3 md:space-y-4 group px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-[#1a260e]/10 group-hover:border-[#1a260e]/30 transition-all duration-300 shadow-sm">
                  <ExternalLink className="h-5 w-5 md:h-6 md:w-6 text-[#1a260e]" />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <h3 className="font-serif text-base md:text-lg font-light">Secure Checkout</h3>
                  <p className="font-sans text-xs md:text-xs text-[#1a260e]/70 leading-relaxed max-w-xs mx-auto">
                    Safe and seamless checkout through our trusted platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile-First Elegant */}
      <section className="relative py-14 md:py-20 bg-[#1a260e] text-[#fffcf2] overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="container-width text-center relative z-10 px-5 md:px-4">
          <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#fffcf2] px-4">
                Ready to Begin?
              </h2>
              <p className="font-sans text-sm md:text-base text-[#fffcf2]/80 leading-relaxed px-4">
                Grab your essentials and book your next class
              </p>
            </div>

            <a
              href="/book"
              className="group inline-flex items-center justify-center gap-3 bg-[#fffcf2] text-[#1a260e] px-8 md:px-8 py-4 md:py-4 font-sans text-sm tracking-[0.2em] uppercase hover:bg-[#fffcf2]/95 active:scale-[0.98] transition-all duration-300 md:hover:gap-4 rounded-lg md:rounded-none shadow-lg w-full max-w-xs md:w-auto"
            >
              <span>Book Your Class</span>
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
