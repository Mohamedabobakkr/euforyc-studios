import Image from 'next/image';
import JsonLd from '@/components/JsonLd';
import Arrow from '@/components/euforyc/Arrow';
import { breadcrumbSchema, pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Our Team',
  description:
    'Meet the team behind Euforyc Studios, the women-only Pilates studio in Edgware, North West London.',
  path: '/team',
});

export default function Team() {
  return (
    <div className="eu-page-top">
      <JsonLd data={breadcrumbSchema([{ name: 'Team', path: '/team' }])} />

      {/* Hero Section */}
      <section className="eu-wrap pb-[clamp(56px,7vw,110px)] pt-[clamp(48px,6vw,96px)]">
        <div className="eu-rise text-center">
          <h1 className="eu-h1 !mb-8">
            Meet Our <em>Team</em>
          </h1>
          <p className="eu-lede !mx-auto max-w-2xl">
            Our passionate instructors are dedicated to guiding you on your wellness journey with
            expertise, energy, and unwavering attention to your personal growth.
          </p>
        </div>
      </section>

      {/* Lead Instructor Profile */}
      <section className="eu-wrap pb-[clamp(56px,7vw,110px)]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            {/* Image - Updated with correct file */}
            <div className="eu-arch relative aspect-[3/4] w-full">
              <Image
                src="/leadtrainer.jpg"
                alt="The lead instructor and co-founder of Euforyc Studios"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 767px) calc(100vw - 40px), 45vw"
              />
            </div>

            {/* Content */}
            <div className="space-y-7">
              <div>
                <h2 className="mb-3 font-serif text-[clamp(38px,4vw,60px)] font-normal leading-[1.04] tracking-[-0.02em] text-eu-ink">
                  Lead Instructor
                </h2>
                <p className="eu-cap text-eu-green">
                  Co-Founder & Master Pilates Instructor
                </p>
              </div>

              <blockquote className="border-l border-[#1a260e]/30 pl-6 font-serif text-[22px] italic leading-[1.4] text-eu-ink md:text-[24px]">
                "Every movement matters, every detail counts, and every client deserves personalized excellence."
              </blockquote>

              <div className="space-y-4">
                <p className="body-text">
                  With an unwavering commitment to precision and a genuine passion for helping others,
                  our lead instructor brings exceptional energy and expertise to every session. Known for
                  their meticulous attention to detail, they ensure each client receives personalized
                  guidance tailored to their unique needs and goals.
                </p>

                <p className="body-text">
                  Their approach combines technical excellence with infectious enthusiasm, creating an
                  environment where clients feel supported, motivated, and empowered. Whether you're a
                  beginner or advanced practitioner, you'll benefit from their helpful nature and ability
                  to break down complex movements into achievable steps.
                </p>
              </div>

              {/* Key Qualities */}
              <div className="space-y-4 border-t border-[#1a260e]/15 pt-7">
                <h3 className="eu-cap text-eu-ink">
                  Core Qualities
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="eu-chip">
                    High Attention to Detail
                  </span>
                  <span className="eu-chip">
                    Exceptionally Helpful
                  </span>
                  <span className="eu-chip">
                    Energetic & Motivating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="eu-wrap">
        <div className="mx-auto h-px w-full max-w-6xl bg-[#1a260e]/15"></div>
      </div>

      {/* Co-founder Profile */}
      <section className="eu-wrap pb-[clamp(80px,10vw,150px)] pt-[clamp(56px,7vw,110px)]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            {/* For desktop: Content first, then image */}
            <div className="order-2 space-y-7 md:order-1">
              <div>
                <h2 className="mb-3 font-serif text-[clamp(38px,4vw,60px)] font-normal leading-[1.04] tracking-[-0.02em] text-eu-ink">
                  Co-Founder
                </h2>
                <p className="eu-cap text-eu-green">
                  Business Director & Wellness Advocate
                </p>
              </div>

              <blockquote className="border-l border-[#1a260e]/30 pl-6 font-serif text-[22px] italic leading-[1.4] text-eu-ink md:text-[24px]">
                "True wellness comes from balance - honoring both body and mind in equal measure."
              </blockquote>

              <div className="space-y-4">
                <p className="body-text">
                  As the co-founder and business director, she brings vision and structure to our studio's
                  growth. With a background in business and a deep passion for wellness, she ensures that
                  Euforyc Studios maintains its commitment to excellence while fostering an inclusive
                  community.
                </p>

                <p className="body-text">
                  Her dedication to creating a supportive environment extends beyond the administrative
                  aspects of the studio. She works tirelessly to ensure that each client's experience
                  is seamless from booking to practice, and that our space remains a sanctuary for
                  transformation and growth.
                </p>
              </div>

              {/* Key Qualities */}
              <div className="space-y-4 border-t border-[#1a260e]/15 pt-7">
                <h3 className="eu-cap text-eu-ink">
                  Core Qualities
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="eu-chip">
                    Strategic Vision
                  </span>
                  <span className="eu-chip">
                    Community Builder
                  </span>
                  <span className="eu-chip">
                    Wellness Advocate
                  </span>
                </div>
              </div>
            </div>

            {/* Image - on the right side for desktop */}
            <div className="eu-arch relative order-1 aspect-[3/4] w-full md:order-2">
              <Image
                src="/cofounder.jpg"
                alt="The co-founder and business director of Euforyc Studios"
                fill
                className="object-cover"
                sizes="(max-width: 767px) calc(100vw - 40px), 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience the Difference */}
      <section className="eu-on-dark mx-[clamp(10px,1.5vw,24px)] mb-[clamp(56px,7vw,110px)] rounded-eu-xl bg-eu-ink py-[clamp(72px,9vw,140px)] text-eu-cream">
        <div className="px-5 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="eu-h2">
              Experience the <em>Difference</em>
            </h2>
            <p className="mx-auto max-w-2xl text-[17px] leading-[1.75] text-eu-beige md:text-[18px]">
              Book a session today and discover how our team's personalized attention, expert guidance,
              and positive energy can transform your Pilates practice.
            </p>
            <a
              href="/book"
              className="eu-btn eu-btn--cream eu-btn--stretch-mobile"
            >
              BOOK YOUR SESSION
              <span className="eu-btn__dot">
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
