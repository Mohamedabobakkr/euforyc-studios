import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Arrow from '@/components/euforyc/Arrow';
import PillLink from '@/components/euforyc/PillLink';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { POLICIES, SITE_URL, STUDIO, breadcrumbSchema, pageMetadata } from '@/lib/site';
export const metadata = pageMetadata({
  title: 'Pilates Classes in Edgware | Reformer, Hot, Red Light & Sculpt Mat',
  description:
    'Every class at Euforyc Studios, a women-only Pilates studio in Edgware, North West London: Reformer Pilates, Hot Pilates, Red Light Hot Mat Pilates, Red Light Stretch & Mobility, Sculpt Mat Pilates, Barre, Belly Dance, 1:1 Private Reformer Pilates and 1:1 Private Cadillac Reformer Pilates.',
  path: '/classes',
});

const FACT_CHIP =
  'inline-flex min-h-[32px] items-center rounded-full border border-[#1a260e]/20 px-3.5 text-[11.5px] uppercase tracking-[0.12em] text-eu-green';

export default function ClassesPage() {
  const classes = ORDERED_CLASS_TYPES.map((classType) => ({
    classType,
    price: `£${classType.price}`,
  }));

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Classes at ${STUDIO.name}`,
    itemListElement: classes.map(({ classType }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: classType.name,
      url: `${SITE_URL}/classes/${classType.slug}`,
    })),
  };

  return (
    <div className="eu-page-top">
      <JsonLd data={listSchema} />
      <JsonLd data={breadcrumbSchema([{ name: 'Classes', path: '/classes' }])} />

      <section className="eu-wrap pb-[clamp(48px,6vw,88px)] pt-[clamp(48px,6vw,96px)]">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="eu-rise lg:col-span-7">
            <p className="eu-cap eu-cap-num text-eu-green">Women-only · Edgware, North West London</p>
            <h1 className="eu-h1 !mt-6">
              Our <em>Classes</em>
            </h1>
          </div>
          <p className="eu-lede eu-rise max-w-xl lg:col-span-5 lg:col-start-8" style={{ animationDelay: '.15s' }}>
            {STUDIO.shortDescription} Group classes run for 45 to 60 minutes with no more than 8 people, and first-time clients can try any three for £60.
          </p>
        </div>
      </section>

      <section className="rounded-t-eu-xl bg-eu-beige py-[clamp(64px,8vw,128px)]">
        <div className="eu-wrap">
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map(({ classType, price }) => (
              <Link key={classType.slug} href={`/classes/${classType.slug}`} className="eu-rv group block text-eu-ink hover:text-eu-ink">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-eu-ink sm:aspect-[4/5]">
                  <Image
                    src={classType.image.src}
                    alt={classType.image.alt}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-eu group-hover:scale-[1.04]"
                    sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 50vw, 33vw"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-eu-cream text-eu-ink transition-transform duration-500 ease-eu group-hover:-rotate-45"
                  >
                    <Arrow />
                  </span>
                </div>
                <div className="mt-6 space-y-3">
                  <h2 className="font-serif text-[30px] font-normal leading-[1.05] tracking-[-0.02em] text-eu-ink md:text-[34px]">
                    {classType.name}
                  </h2>
                  <p className="text-[15.5px] leading-[1.65] text-eu-green">{classType.tagline}</p>
                  <p className="flex flex-wrap gap-2 pt-1">
                    <span className={FACT_CHIP}>{classType.duration}</span>
                    <span className={FACT_CHIP}>{classType.groupSize}</span>
                    <span className={FACT_CHIP}>{price}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="eu-on-dark mx-[clamp(10px,1.5vw,24px)] mb-[clamp(56px,7vw,110px)] mt-6 rounded-eu-xl bg-eu-ink py-[clamp(72px,9vw,140px)] text-eu-cream">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="eu-h2">
            New to <em>Euforyc</em>?
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.75] text-eu-beige">
            Try It All gives first-time clients 3 classes for £60 across every group class, valid for 20 days from your first class. {POLICIES.gripSocks} {POLICIES.towel}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <PillLink href="/packages" variant="cream" dot stretchMobile>
              Intro offer
            </PillLink>
            <PillLink href="/schedule" variant="ghost" stretchMobile>
              View timetable
            </PillLink>
          </div>
        </div>
      </section>
    </div>
  );
}
