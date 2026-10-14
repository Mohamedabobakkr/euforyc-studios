import Image from 'next/image';
import PillLink from '@/components/euforyc/PillLink';
import { MapPin, Users, Clock } from 'lucide-react';

// ─── Reveal Wrapper ───────────────────────────────────────────
// CSS scroll reveal (eu-rv): content stays visible where scroll-driven
// animations are unsupported or motion is reduced.
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`eu-rv ${className}`}>{children}</div>;
}

// ─── Parallax Image ───────────────────────────────────────────
// CSS scroll-driven parallax (eu-par) on an oversized frame
function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="eu-par absolute inset-x-0 -top-[8%] h-[116%]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </div>
    </div>
  );
}

// ─── Horizontal Rule ──────────────────────────────────────────
function Divider() {
  return (
    <div className="eu-wrap">
      <div className="h-px bg-[#1a260e]/15" />
    </div>
  );
}

export default function About() {
  return (
    <div className="bg-eu-cream">

      {/* ════════════════════════════════════════════════════════
          HERO — Full-bleed cinematic opening
         ════════════════════════════════════════════════════════ */}
      <section className="eu-on-dark relative flex h-[85vh] min-h-[620px] items-end overflow-hidden bg-eu-ink md:h-screen md:min-h-[720px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/about-hero.jpg"
            alt="Euforyc Studios interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay — heavier at bottom for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a260e] via-[#1a260e]/40 to-transparent" />
          <div className="absolute inset-0 bg-[#1a260e]/20" />
        </div>

        <div className="eu-wrap relative z-10 w-full pb-16 md:pb-24">
          <div className="max-w-4xl">
            <Reveal>
              <p className="eu-cap eu-cap-num mb-6 text-eu-beige">
                Our Story
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mb-6 font-serif text-[clamp(50px,7.6vw,124px)] font-normal leading-[0.95] tracking-[-0.035em] text-eu-cream md:mb-8">
                Where strength{' '}<br />
                meets <span className="italic">euphoria</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="max-w-xl text-[17px] leading-[1.7] text-eu-beige md:text-[19px]">
                A women-only boutique studio in Edgware, built on the belief that
                wellness should be transformative, joyful, and accessible to every body.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center pb-6 text-[#fffcf2]/30">
          <div className="h-12 w-px bg-gradient-to-b from-[#fffcf2]/40 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE NAME — Origin story
         ════════════════════════════════════════════════════════ */}
      <section className="py-[clamp(90px,11vw,170px)]">
        <div className="eu-wrap">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-6">
            {/* Text */}
            <div className="max-w-2xl lg:col-span-7">
              <Reveal>
                <p className="eu-cap eu-cap-num mb-7 text-eu-green">THE NAME</p>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="mb-9 font-serif text-[clamp(44px,5.6vw,88px)] font-normal leading-[1] tracking-[-0.025em] text-eu-ink">
                  <span className="font-normal">Euforyc</span>{' '}
                  <span className="text-[0.6em] font-normal italic text-eu-sage">/u·for·ic/</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-5 text-[17px] leading-[1.8] text-eu-green md:text-[18px]">
                  <p>
                    A word we created to embody our philosophy. It represents the
                    euphoric feeling that comes from consistent practice, the <em>&ldquo;you&rdquo;</em> in
                    your journey, and the organic transformation that happens when mind
                    and body work in harmony.
                  </p>
                  <p>
                    Every session is designed to bring you closer to that feeling —
                    where challenge meets joy, where strength meets grace, and where
                    your practice becomes a celebration of what your body can achieve.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Quote card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Decorative offset border */}
                  <div className="absolute -inset-3 rounded-[44px] border border-[#1a260e]/15" />

                  <div className="eu-on-dark relative overflow-hidden rounded-eu-lg bg-eu-ink p-9 md:p-12">
                    <div className="absolute left-8 top-6 select-none font-serif text-[8rem] leading-none text-[#fffcf2]/[0.08]" aria-hidden="true">
                      &ldquo;
                    </div>
                    <div className="relative">
                      <p className="mb-6 font-serif text-[clamp(32px,3vw,44px)] italic leading-[1.1] text-eu-cream">
                        euforyc is{' '}<br />everything
                      </p>
                      <div className="mb-5 h-px w-10 bg-[#fffcf2]/30" />
                      <p className="text-[15px] leading-[1.7] text-eu-beige">
                        Our mantra — a reminder that every feeling, every movement,
                        every breath is part of the euphoric journey.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ════════════════════════════════════════════════════════
          VISUAL BREAK — Full-width image
         ════════════════════════════════════════════════════════ */}
      <section className="relative mx-[clamp(10px,1.5vw,24px)] mt-[clamp(64px,8vw,120px)] h-[50vh] min-h-[340px] overflow-hidden rounded-eu-xl bg-eu-beige md:h-[65vh]">
        <ParallaxImage
          src="/hero/IMG_4879.JPG"
          alt="Euforyc Studios storefront exterior"
        />
        <div className="absolute inset-0 bg-[#1a260e]/10" />
      </section>

      {/* ════════════════════════════════════════════════════════
          CORE VALUES — Editorial grid
         ════════════════════════════════════════════════════════ */}
      <section className="py-[clamp(90px,11vw,170px)]">
        <div className="eu-wrap">
          <Reveal>
            <div className="mb-14 text-center md:mb-20">
              <p className="eu-cap mb-6 text-eu-green">WHAT GUIDES US</p>
              <h2 className="font-serif text-[clamp(40px,4.6vw,72px)] font-normal leading-[1.04] tracking-[-0.02em] text-eu-ink">
                Built on Three <span className="italic">Principles</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-0 border-t border-[#1a260e]/15 md:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Consistency',
                body: 'True transformation happens through regular practice. We believe in showing up for yourself, one session at a time — building strength and confidence through dedicated commitment.',
              },
              {
                number: '02',
                title: 'Patience',
                body: 'Your body is wise and deserves respect. We honor the process of growth, celebrating small victories and understanding that lasting change takes time. Every body moves at its own perfect pace.',
              },
              {
                number: '03',
                title: 'Euphoria',
                body: 'Movement should bring joy. We create an environment where challenge meets celebration, where you can push your limits while feeling supported — and every class leaves you feeling empowered.',
              },
            ].map((value, i) => (
              <Reveal key={value.number} delay={i * 0.08}>
                <div className={`h-full py-10 md:px-10 md:py-14 ${i === 0 ? 'md:pl-0' : ''} ${i < 2 ? 'border-b border-[#1a260e]/15 md:border-b-0 md:border-r' : ''}`}>
                  <span className="font-serif text-[22px] italic text-eu-green">{value.number}</span>
                  <h3 className="mb-5 mt-4 font-serif text-[clamp(32px,2.8vw,44px)] font-normal leading-[1.05] tracking-[-0.02em] text-eu-ink">{value.title}</h3>
                  <p className="text-[16px] leading-[1.8] text-eu-green">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE SPACE — Staggered image grid
         ════════════════════════════════════════════════════════ */}
      <section className="eu-on-dark mx-[clamp(10px,1.5vw,24px)] rounded-eu-xl bg-eu-ink py-[clamp(72px,9vw,140px)] text-eu-cream">
        <div className="eu-wrap">
          <Reveal>
            <div className="mb-12 text-center md:mb-20">
              <p className="eu-cap mb-6 text-eu-beige">THE SPACE</p>
              <h2 className="font-serif text-[clamp(40px,4.6vw,72px)] font-normal leading-[1.04] tracking-[-0.02em] text-eu-cream">
                Designed for <span className="italic">You</span>
              </h2>
            </div>
          </Reveal>

          {/* Asymmetric image grid */}
          <div className="mx-auto grid max-w-6xl grid-cols-12 gap-3 md:gap-4">
            {/* Large left image */}
            <Reveal className="col-span-12 md:col-span-7">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-eu-md md:aspect-[3/4]">
                <Image
                  src="/hero/IMG_5111.jpg"
                  alt="Reformer pilates session at Euforyc Studios"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 767px) calc(100vw - 60px), 640px"
                />
              </div>
            </Reveal>

            {/* Right column — two stacked */}
            <div className="col-span-12 grid gap-3 md:col-span-5 md:gap-4">
              <Reveal delay={0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-eu-md md:h-full md:aspect-auto">
                  <Image
                    src="/about-redlight.jpg"
                    alt="Red light therapy room at Euforyc Studios"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 767px) calc(100vw - 60px), 460px"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-eu-md md:h-full md:aspect-auto">
                  <Image
                    src="/privates.jpg"
                    alt="Private pilates sessions"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 767px) calc(100vw - 60px), 460px"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Studio features */}
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-[#fffcf2]/15 pt-10 md:mt-16 md:gap-x-14">
              {[
                { icon: MapPin, label: 'Edgware, North London' },
                { icon: Users, label: 'Small, Intimate Classes' },
                { icon: Clock, label: 'Flexible Scheduling' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-[15px] text-eu-beige">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  <span className="tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MISSION — Large editorial text
         ════════════════════════════════════════════════════════ */}
      <section className="py-[clamp(90px,11vw,170px)]">
        <div className="eu-wrap">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="eu-cap eu-cap-num mb-8 text-eu-green md:mb-10">OUR MISSION</p>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mb-10 font-serif text-[clamp(28px,3.4vw,50px)] font-normal leading-[1.3] tracking-[-0.01em] text-eu-ink">
                We&apos;re committed to creating a space where every woman can discover
                her strength, find her centre, and experience the pure joy of movement.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-3xl text-[17px] leading-[1.8] text-eu-green md:text-[18px]">
                Through expert instruction, premium facilities, and genuine community,
                we guide you toward a practice that transforms not just your body, but
                your entire relationship with wellness. Because when you feel strong
                in your body, confident in your practice, and connected to your
                community — that&apos;s when everything becomes euforyc.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* ════════════════════════════════════════════════════════
          CLOSING CTA — Cinematic
         ════════════════════════════════════════════════════════ */}
      <section className="eu-on-dark relative mx-[clamp(10px,1.5vw,24px)] mb-[clamp(56px,7vw,110px)] mt-[clamp(64px,8vw,120px)] overflow-hidden rounded-eu-xl bg-eu-ink py-[clamp(90px,11vw,170px)]">
        <div className="absolute inset-0">
          <Image
            src="/about-cta.jpg"
            alt="Euforyc Studios pilates session"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1a260e]/70" />
        </div>

        <div className="relative z-10 px-5 text-center">
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-8">
              <h2 className="font-serif text-[clamp(40px,5vw,80px)] font-normal leading-[1.04] tracking-[-0.02em] text-eu-cream">
                Ready to begin your{' '}<br />
                <span className="italic">euforyc</span> journey?
              </h2>
              <p className="mx-auto max-w-md text-[17px] leading-[1.7] text-eu-beige">
                Step into our studio and feel the difference. Your first class
                is where it all begins.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                <PillLink href="/book" variant="cream" dot stretchMobile>
                  BOOK YOUR FIRST CLASS
                </PillLink>
                <PillLink href="/offers" variant="ghost" stretchMobile>
                  View our intro offer →
                </PillLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
