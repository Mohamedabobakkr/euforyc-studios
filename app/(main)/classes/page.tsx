import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { ORDERED_CLASS_TYPES } from '@/lib/classes';
import { POLICIES, SITE_URL, STUDIO, breadcrumbSchema, pageMetadata } from '@/lib/site';
import { getUpcomingEvents, liveFactsFor } from '@/lib/studio-data';

export const revalidate = 600;

export const metadata = pageMetadata({
  title: 'Pilates Classes in Edgware | Reformer, Hot, Red Light, Sculpt & Barre',
  description:
    'Every class at Euforyc Studios, a women-only Pilates studio in Edgware, North West London: Reformer Pilates, Hot Pilates, Red Light Hot Pilates, Tone & Sculpt, Barre, Belly Dance, mum and baby Pilates and private 1:1 sessions.',
  path: '/classes',
});

export default async function ClassesPage() {
  const events = await getUpcomingEvents();

  const classes = ORDERED_CLASS_TYPES.map((classType) => {
    const live = liveFactsFor(classType, events);
    const price = live.priceRange
      ? live.priceRange.min === live.priceRange.max
        ? `£${live.priceRange.min}`
        : `From £${live.priceRange.min}`
      : classType.fallbackDropIn;
    return { classType, price };
  });

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
    <div className="pt-32">
      <JsonLd data={listSchema} />
      <JsonLd data={breadcrumbSchema([{ name: 'Classes', path: '/classes' }])} />

      <section className="section-padding pb-12 bg-[#fffcf2]">
        <div className="container-width text-center space-y-6">
          <p className="tagline">Women-only · Edgware, North West London</p>
          <h1 className="heading-primary">Our Classes</h1>
          <p className="body-text max-w-3xl mx-auto">
            {STUDIO.shortDescription} Most group classes run for 45 minutes with no more than 8 people, and first-time clients can try any three for £60.
          </p>
        </div>
      </section>

      <section className="section-padding pt-8 bg-[#fffcf2]">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {classes.map(({ classType, price }) => (
              <Link key={classType.slug} href={`/classes/${classType.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/5] bg-[#1a260e]/5">
                  <Image
                    src={classType.image.src}
                    alt={classType.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-6 space-y-3">
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-[#1a260e]">{classType.name}</h2>
                  <p className="font-sans text-base font-light leading-relaxed text-[#1a260e]/80">{classType.tagline}</p>
                  <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-[#1a260e]/50">
                    {classType.duration} · {price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width max-w-4xl text-center space-y-8">
          <h2 className="heading-secondary text-[#fffcf2]">New to Euforyc?</h2>
          <p className="font-sans text-base md:text-lg font-light leading-relaxed text-[#fffcf2]/80">
            Try It All gives first-time clients 3 classes for £60 across every group class, valid for 20 days from your first class. {POLICIES.gripSocks} {POLICIES.towel}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="inline-block bg-[#fffcf2] text-[#1a260e] px-10 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:bg-[#fffcf2]/90"
            >
              Intro offer
            </Link>
            <Link
              href="/schedule"
              className="inline-block border border-[#fffcf2] text-[#fffcf2] px-10 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:bg-[#fffcf2] hover:text-[#1a260e]"
            >
              View timetable
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
