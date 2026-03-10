'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Users, Clock } from 'lucide-react';

// ─── Intersection Observer ────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Reveal Wrapper ───────────────────────────────────────────
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Parallax Image ───────────────────────────────────────────
function ParallaxImage({ src, alt, className = '', priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = (windowH - rect.top) / (windowH + rect.height);
      setOffset((progress - 0.5) * 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-100"
        style={{ transform: `translateY(${offset}px) scale(1.08)` }}
        priority={priority}
        quality={90}
      />
    </div>
  );
}

// ─── Horizontal Rule ──────────────────────────────────────────
function Divider() {
  const { ref, visible } = useInView(0.5);
  return (
    <div ref={ref} className="container-width px-6">
      <div
        className="h-px bg-[#1a260e]/10 mx-auto"
        style={{
          maxWidth: visible ? '100%' : '0%',
          transition: 'max-width 1.2s cubic-bezier(.22,1,.36,1)',
        }}
      />
    </div>
  );
}

export default function About() {
  return (
    <div className="bg-[#fffcf2]">

      {/* ════════════════════════════════════════════════════════
          HERO — Full-bleed cinematic opening
         ════════════════════════════════════════════════════════ */}
      <section className="relative h-[85vh] md:h-screen flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/about-hero.jpg"
            alt="Euforyc Studios interior"
            fill
            className="object-cover"
            priority
            quality={95}
          />
          {/* Gradient overlay — heavier at bottom for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a260e] via-[#1a260e]/40 to-transparent" />
          <div className="absolute inset-0 bg-[#1a260e]/20" />
        </div>

        <div className="relative z-10 container-width px-6 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[#fffcf2]/50 text-xs tracking-[0.35em] uppercase mb-4 md:mb-5">
                Our Story
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-[5.5rem] text-[#fffcf2] leading-[1.05] tracking-wide mb-5 md:mb-7">
                Where strength<br />
                meets <span className="italic">euphoria</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-[#fffcf2]/70 text-base md:text-lg font-light leading-relaxed max-w-xl">
                A women-only boutique studio in Edgware, built on the belief that
                wellness should be transformative, joyful, and accessible to every body.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#fffcf2]/30 pb-6">
          <div className="w-px h-12 bg-gradient-to-b from-[#fffcf2]/40 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE NAME — Origin story
         ════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div className="lg:col-span-7 max-w-2xl">
              <Reveal>
                <p className="tagline text-[#1a260e]/40 mb-6">THE NAME</p>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a260e] font-light leading-[1.15] mb-8">
                  <span className="font-normal">Euforyc</span>{' '}
                  <span className="text-[#1a260e]/40 font-light italic">/u·for·ic/</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-5 text-[#1a260e]/70 text-base md:text-lg font-light leading-[1.75]">
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
                <div className="relative">
                  {/* Decorative offset border */}
                  <div className="absolute -inset-3 border border-[#1a260e]/[0.06] rounded-sm" />

                  <div className="relative bg-[#1a260e] p-8 md:p-10 rounded-sm">
                    <div className="absolute top-6 left-8 text-[#fffcf2]/[0.06] font-serif text-[8rem] leading-none select-none">
                      &ldquo;
                    </div>
                    <div className="relative">
                      <p className="font-serif text-2xl md:text-3xl font-light text-[#fffcf2] leading-snug mb-5">
                        euforyc is<br />everything
                      </p>
                      <div className="w-10 h-px bg-[#fffcf2]/20 mb-4" />
                      <p className="text-sm text-[#fffcf2]/50 font-light leading-relaxed">
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
      <section className="relative h-[50vh] md:h-[65vh]">
        <ParallaxImage
          src="/hero/IMG_4879.JPG"
          alt="Euforyc Studios storefront exterior"
        />
        <div className="absolute inset-0 bg-[#1a260e]/10" />
      </section>

      {/* ════════════════════════════════════════════════════════
          CORE VALUES — Editorial grid
         ════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 px-6">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-16 md:mb-24">
              <p className="tagline text-[#1a260e]/40 mb-5">WHAT GUIDES US</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a260e] font-light">
                Built on Three <span className="italic">Principles</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#1a260e]/10">
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
                <div className={`py-10 md:py-14 md:px-10 ${i < 2 ? 'md:border-r border-b md:border-b-0 border-[#1a260e]/10' : ''}`}>
                  <span className="text-xs tracking-[0.3em] text-[#1a260e]/25 font-medium">{value.number}</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1a260e] mt-4 mb-5">{value.title}</h3>
                  <p className="text-sm md:text-base text-[#1a260e]/60 font-light leading-[1.8]">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE SPACE — Staggered image grid
         ════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 bg-[#1a260e]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-12 md:mb-20">
              <p className="text-[#fffcf2]/30 text-xs tracking-[0.35em] uppercase mb-5">THE SPACE</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#fffcf2] font-light">
                Designed for <span className="italic">You</span>
              </h2>
            </div>
          </Reveal>

          {/* Asymmetric image grid */}
          <div className="grid grid-cols-12 gap-3 md:gap-4 max-w-5xl mx-auto">
            {/* Large left image */}
            <Reveal className="col-span-12 md:col-span-7">
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden">
                <Image
                  src="/hero/IMG_5111.jpg"
                  alt="Reformer pilates session at Euforyc Studios"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  quality={85}
                />
              </div>
            </Reveal>

            {/* Right column — two stacked */}
            <div className="col-span-12 md:col-span-5 grid gap-3 md:gap-4">
              <Reveal delay={0.1}>
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                  <Image
                    src="/about-redlight.jpg"
                    alt="Red light therapy room at Euforyc Studios"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    quality={85}
                  />
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                  <Image
                    src="/privates.jpg"
                    alt="Private pilates sessions"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    quality={85}
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Studio features */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-14 mt-12 md:mt-16 pt-10 border-t border-[#fffcf2]/[0.08]">
              {[
                { icon: MapPin, label: 'Edgware, North London' },
                { icon: Users, label: 'Small, Intimate Classes' },
                { icon: Clock, label: 'Flexible Scheduling' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-[#fffcf2]/40 text-sm">
                  <Icon className="h-4 w-4" />
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
      <section className="py-24 md:py-36 px-6">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="tagline text-[#1a260e]/40 mb-8 md:mb-10">OUR MISSION</p>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="font-serif text-2xl md:text-3xl lg:text-[2.5rem] text-[#1a260e] font-light leading-[1.45] mb-8">
                We&apos;re committed to creating a space where every woman can discover
                her strength, find her centre, and experience the pure joy of movement.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[#1a260e]/60 text-base md:text-lg font-light leading-[1.8] max-w-3xl">
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
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/about-cta.jpg"
            alt="Euforyc Studios pilates session"
            fill
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-[#1a260e]/70" />
        </div>

        <div className="relative z-10 container-width text-center px-6">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-7">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#fffcf2] font-light leading-tight">
                Ready to begin your<br />
                <span className="italic">euforyc</span> journey?
              </h2>
              <p className="text-[#fffcf2]/60 text-sm md:text-base font-light max-w-md mx-auto">
                Step into our studio and feel the difference. Your first class
                is where it all begins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <Link
                  href="/book"
                  className="group inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-10 py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  BOOK YOUR FIRST CLASS
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/offers"
                  className="text-[#fffcf2]/50 text-sm tracking-wider hover:text-[#fffcf2] transition-colors"
                >
                  View intro offers →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
