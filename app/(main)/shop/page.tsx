import { pageMetadata } from '@/lib/site';
import Image from 'next/image';
import { ShoppingBag, Sparkles, ExternalLink } from 'lucide-react';
import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';

export const metadata = pageMetadata({
  title: 'Shop | Pilates Accessories & Merchandise',
  description: 'Shop Euforyc Studios merchandise: grip socks, tote bags and Pilates accessories, available at the studio in Edgware, London.',
  path: '/shop',
});

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
    description: 'Soft, secure and made for every class. Designed to keep you grounded in Reformer and Barre.',
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
  },
  {
    name: 'Euforyc Mat',
    tagline: 'Your foundation for every flow',
    description: 'A premium mat designed for comfort and stability. Whether it\'s Pilates, yoga or stretching, this mat supports your practice from the ground up.',
    price: '£38.00',
    image: '/euforyc-mat.jpg',
    momenceUrl: 'https://momence.com/euforyc/product/Euforyc-Mats/416935',
    badge: 'NEW',
    features: [
      'High-density cushioning',
      'Non-slip textured surface',
      'Lightweight and portable',
      'Ideal for Pilates, yoga & stretching'
    ]
  }
];

// "The Euforyc Difference" columns: hairline dividers between them on wider screens
const DIFF_ITEM =
  'group flex flex-col items-center gap-4 border-b border-[#1a260e]/15 px-2 py-10 text-center last:border-b-0 md:border-b-0 md:border-r md:px-8 md:py-4 md:last:border-r-0';
const DIFF_ICON = 'inline-flex h-14 w-14 items-center justify-center rounded-full bg-eu-beige text-eu-ink';

export default function Shop() {
  return (
    <div className="eu-page-top">
      {/* Hero Section */}
      <section className="relative">
        <div className="eu-wrap pb-[clamp(40px,5vw,72px)] pt-[clamp(48px,6vw,96px)]">
          <div className="grid grid-cols-1 items-end gap-y-7 lg:grid-cols-12 lg:gap-x-6">
            <div className="eu-rise lg:col-span-7">
              <div className="eu-chip mb-7">
                <Sparkles className="h-4 w-4 text-eu-ink" strokeWidth={1.5} aria-hidden="true" />
                <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-eu-green">Studio Essentials</span>
              </div>

              <h1 className="font-serif text-[clamp(44px,7.6vw,124px)] font-normal leading-[0.94] tracking-[0.01em] text-eu-ink">
                STUDIO SHOP
              </h1>
            </div>

            <p
              className="eu-rise max-w-xl font-sans text-[17px] leading-[1.75] text-eu-green md:text-lg lg:col-span-4 lg:col-start-9"
            >
              Thoughtfully curated essentials for your pilates practice
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="eu-wrap pb-[clamp(72px,9vw,140px)]">
        <div className="border-t border-[#1a260e]/15 pt-[clamp(40px,5vw,72px)]">
          <div className="mx-auto max-w-[560px] md:max-w-none">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col overflow-hidden rounded-[28px] bg-eu-beige md:grid md:grid-cols-2 lg:flex lg:flex-col"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute right-4 top-4 z-10 md:left-4 md:right-auto lg:left-auto lg:right-4">
                      <div className="rounded-full bg-eu-ink px-3.5 py-1.5">
                        <span className="font-sans text-[11px] font-medium tracking-[0.18em] text-eu-cream">{product.badge}</span>
                      </div>
                    </div>
                  )}

                  {/* Product Image */}
                  <a
                    href={product.momenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden bg-eu-beige md:h-full lg:h-auto"
                  >
                    <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[440px] lg:aspect-[4/5] lg:h-auto lg:min-h-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-eu group-hover:scale-105"
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 420px"
                        priority={index === 0}
                      />
                    </div>
                  </a>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    {/* Name & Tagline */}
                    <div className="space-y-2">
                      <h3 className="font-serif text-[28px] font-normal leading-tight text-eu-ink">
                        {product.name}
                      </h3>
                      <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-eu-sage">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mt-5 flex items-baseline gap-2">
                      <p className="font-serif text-[34px] leading-none text-eu-ink">{product.price}</p>
                      <span className="font-sans text-[12px] tracking-[0.16em] text-eu-sage">GBP</span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 font-sans text-[15px] leading-[1.65] text-eu-green">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mt-5 space-y-2 border-t border-[#1a260e]/15 pt-5">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="mt-[10px] h-1 w-1 flex-shrink-0 rounded-full bg-eu-green"></div>
                          <span className="font-sans text-[14.5px] leading-relaxed text-eu-green">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Buy Button */}
                    <div className="mt-auto pt-7">
                      <PillLink
                        href={product.momenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ink"
                        dot
                        className="eu-btn--block"
                      >
                        Add to Cart
                      </PillLink>

                      {/* In-studio note */}
                      <p className="mt-3 text-center font-sans text-[11.5px] uppercase tracking-[0.2em] text-eu-sage">
                        Available in studio
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="eu-wrap pb-[clamp(72px,9vw,140px)]">
        <div className="mx-auto max-w-[1180px] border-t border-[#1a260e]/15 pt-[clamp(56px,7vw,110px)]">
          {/* Section Header */}
          <div className="mb-8 text-center md:mb-14">
            <h2 className="mb-8 font-serif text-[clamp(38px,4.8vw,72px)] font-normal leading-[1.02] tracking-[-0.02em] text-eu-ink">
              The Euforyc <em>Difference</em>
            </h2>
            <div className="mx-auto h-[1px] w-16 bg-[#1a260e]/30"></div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className={DIFF_ITEM}>
              <div className={DIFF_ICON}>
                <Sparkles className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-normal leading-tight text-eu-ink">Studio Quality</h3>
                <p className="mx-auto max-w-xs font-sans text-[15.5px] leading-[1.6] text-eu-green">
                  Premium products we trust and use in our classes daily
                </p>
              </div>
            </div>

            <div className={DIFF_ITEM}>
              <div className={DIFF_ICON}>
                <ShoppingBag className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-normal leading-tight text-eu-ink">Easy Collection</h3>
                <p className="mx-auto max-w-xs font-sans text-[15.5px] leading-[1.6] text-eu-green">
                  Order online and collect at the studio or purchase in person
                </p>
              </div>
            </div>

            <div className={DIFF_ITEM}>
              <div className={DIFF_ICON}>
                <ExternalLink className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] font-normal leading-tight text-eu-ink">Secure Checkout</h3>
                <p className="mx-auto max-w-xs font-sans text-[15.5px] leading-[1.6] text-eu-green">
                  Safe and seamless checkout through our trusted platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="eu-on-dark relative mx-[clamp(10px,1.5vw,24px)] mb-[clamp(64px,8vw,120px)] overflow-hidden rounded-[32px] bg-eu-ink px-[clamp(20px,4.5vw,72px)] py-[clamp(72px,9vw,140px)] text-eu-cream md:rounded-eu-xl">
        <div className="relative text-center">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-[clamp(40px,5vw,76px)] font-normal leading-[1.02] tracking-[-0.02em] text-eu-cream">
                Ready to <em>Begin</em>?
              </h2>
              <p className="font-sans text-[17px] leading-relaxed text-[#F5F0E8] md:text-lg">
                Grab your essentials and book your next class
              </p>
            </div>

            <a
              href="/book"
              className="eu-btn eu-btn--cream eu-btn--stretch-mobile"
            >
              <span>Book Your Class</span>
              <span className="eu-btn__dot" aria-hidden="true">
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
