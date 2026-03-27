'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Clock,
  PartyPopper,
  Sparkles,
  GlassWater,
  Music,
  Send,
  CheckCircle2,
  ArrowRight,
  Calendar,
  MapPin,
  Heart,
  Flame,
  Star,
  Minus,
  Plus,
  Calculator,
} from 'lucide-react';

// ─── Intersection Observer ────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
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

// ─── Animated Counter ─────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const { ref, visible } = useInView(0.5);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, value]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

// ─── Divider ──────────────────────────────────────────────────
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

// ─── Floating Particles (Decorative) ──────────────────────────
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#fffcf2]/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `float ${4 + i * 0.8}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          from { transform: translateY(0px) scale(1); opacity: 0.3; }
          to { transform: translateY(-30px) scale(1.5); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

// ─── Extras/Add-ons ───────────────────────────────────────────
const extras = [
  { id: 'drinks', icon: GlassWater, label: 'Drinks & Refreshments', description: 'Matcha, smoothies, mocktails from Euforyc Sips' },
  { id: 'decorations', icon: PartyPopper, label: 'Decorations & Setup', description: 'Balloons, banners, and themed decor' },
  { id: 'music', icon: Music, label: 'Custom Playlist', description: 'Your own music or curated playlists' },
  { id: 'photography', icon: Sparkles, label: 'Photography', description: 'Capture the memories of your event' },
];

// ─── Form Data Type ───────────────────────────────────────────
type FormData = {
  name: string;
  email: string;
  phone: string;
  guests: string;
  rooms: string[]; // supports selecting one or both rooms
  date: string;
  time: string;
  eventType: string;
  extras: string[];
  message: string;
};

export default function StudioHire() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    rooms: [],
    date: '',
    time: '',
    eventType: '',
    extras: [],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const toggleRoom = (room: string) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.includes(room)
        ? prev.rooms.filter(r => r !== room)
        : [...prev.rooms, room],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Pricing: per-person rate by guest count
  const REFORMER_PP: Record<number, number> = {
    2: 80, 3: 70, 4: 60, 5: 50, 6: 40, 7: 35, 8: 32,
  };
  const HOT_PILATES_PP: Record<number, number> = {
    2: 70, 3: 60, 4: 50, 5: 42, 6: 36, 7: 32, 8: 28,
  };

  const getPerPerson = (room: string, guests: number) => {
    const table = room === 'reformer' ? REFORMER_PP : HOT_PILATES_PP;
    const clamped = Math.max(2, Math.min(8, guests));
    return table[clamped] ?? 0;
  };

  const toggleExtra = (id: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(id)
        ? prev.extras.filter(e => e !== id)
        : [...prev.extras, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedExtras = formData.extras
      .map(id => extras.find(ex => ex.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const roomLabels = formData.rooms.map(r => {
      const pp = getPerPerson(r, parseInt(formData.guests || '2'));
      return r === 'reformer' ? `Reformer Room (£${pp}/person)` : `Hot Pilates Room (£${pp}/person)`;
    });
    const roomLabel = roomLabels.length > 0 ? roomLabels.join(' + ') : 'Not selected';

    const subject = encodeURIComponent(`Studio Hire Enquiry — ${formData.name}`);
    const body = encodeURIComponent(
      `STUDIO HIRE ENQUIRY\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Event Type: ${formData.eventType}\n` +
      `Room(s): ${roomLabel}\n` +
      `Number of Guests: ${formData.guests}\n` +
      `Preferred Date: ${formData.date}\n` +
      `Preferred Time: ${formData.time}\n\n` +
      `Extras Requested: ${selectedExtras || 'None'}\n\n` +
      `Additional Notes:\n${formData.message || 'None'}\n`
    );

    window.location.href = `mailto:euforyc@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 5000);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const guestCount = parseInt(formData.guests || '2');
  const totalPerPerson = formData.rooms.length > 0 && guestCount > 0
    ? formData.rooms.reduce((sum, room) => sum + getPerPerson(room, guestCount), 0)
    : null;

  return (
    <div className="bg-[#fffcf2]">

      {/* ════════════════════════════════════════════════════════
          HERO — Cinematic, dark, immersive
         ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a260e]">
        <FloatingParticles />

        {/* Background gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#2a3a21]/30 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#3a4a31]/20 blur-[100px]" />
        </div>

        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-1/4 w-px h-full bg-[#fffcf2]" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-[#fffcf2]" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-[#fffcf2]" />
          <div className="absolute top-1/3 left-0 w-full h-px bg-[#fffcf2]" />
          <div className="absolute top-2/3 left-0 w-full h-px bg-[#fffcf2]" />
        </div>

        <div className="relative z-10 container-width px-6 text-center">
          <Reveal>
            <p className="text-[#fffcf2]/30 text-xs tracking-[0.4em] uppercase mb-6">
              Introducing
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-[#fffcf2] leading-[0.95] tracking-tight mb-6">
              Studio<br />
              <span className="italic font-light">Hire</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="w-16 h-px bg-[#fffcf2]/20 mx-auto mb-6" />
          </Reveal>

          <Reveal delay={0.22}>
            <p className="text-[#fffcf2]/50 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
              Your event. Your people. Our space. Host birthdays, corporate events,
              private pilates sessions, gatherings, and celebrations in our premium
              boutique studio — open to <span className="text-[#fffcf2]/80 font-normal">everyone</span>.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={scrollToForm}
                className="group inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-10 py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#fffcf2]/10"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#pricing"
                className="text-[#fffcf2]/40 text-sm tracking-wider hover:text-[#fffcf2]/70 transition-colors"
              >
                View pricing →
              </a>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[#fffcf2]/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#fffcf2]/30 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          OPEN TO EVERYONE — Key differentiator
         ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#1a260e]/[0.02] blur-[80px]" />

        <div className="container-width">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#1a260e]/20" />
                <Heart className="h-4 w-4 text-[#1a260e]/40" />
                <div className="h-px w-10 bg-[#1a260e]/20" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a260e] font-light mb-6">
                Open to <span className="italic">Everyone</span>
              </h2>
              <p className="text-[#1a260e]/60 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
                While our regular classes are women-only, studio hire is open to
                <span className="font-normal text-[#1a260e]/80"> all genders</span>.
                Bring your friends, family, colleagues, or partner — whoever you
                want to share the experience with. It&apos;s your space, your rules.
              </p>
            </div>
          </Reveal>

          {/* Feature pills */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                { icon: PartyPopper, text: 'Birthday Parties' },
                { icon: Users, text: 'Corporate Events' },
                { icon: Heart, text: 'Hen Dos' },
                { icon: Star, text: 'Private Classes' },
                { icon: Music, text: 'Social Gatherings' },
                { icon: Sparkles, text: 'Celebrations' },
              ].map(({ icon: Icon, text }, i) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-5 py-3 border border-[#1a260e]/10 rounded-full text-[#1a260e]/60 text-sm font-light hover:border-[#1a260e]/30 hover:text-[#1a260e]/80 transition-all duration-300 cursor-default"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ════════════════════════════════════════════════════════
          PRICING — Two elegant cards
         ════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 md:py-36 px-6 scroll-mt-32">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <p className="tagline text-[#1a260e]/40 mb-5">PRICING</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a260e] font-light">
                Choose Your <span className="italic">Space</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Reformer Room Card */}
            <Reveal delay={0}>
              <div
                className={`group relative cursor-pointer transition-all duration-500 ${
                  formData.rooms.includes('reformer') ? 'scale-[1.02]' : ''
                }`}
                onClick={() => toggleRoom('reformer')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleRoom('reformer');
                }}
                tabIndex={0}
                role="checkbox"
                aria-checked={formData.rooms.includes('reformer')}
                aria-label="Select Reformer Room"
              >
                {/* Offset border decoration */}
                <div className={`absolute -inset-2 border transition-all duration-500 rounded-sm ${
                  formData.rooms.includes('reformer')
                    ? 'border-[#1a260e]/20'
                    : 'border-transparent group-hover:border-[#1a260e]/10'
                }`} />

                <div className={`relative p-8 md:p-10 rounded-sm transition-all duration-500 ${
                  formData.rooms.includes('reformer')
                    ? 'bg-[#1a260e] text-[#fffcf2]'
                    : 'bg-[#faf8f3] text-[#1a260e] group-hover:bg-[#f5f0e8]'
                }`}>
                  {/* Room badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase ${
                      formData.rooms.includes('reformer')
                        ? 'bg-[#fffcf2]/10 text-[#fffcf2]/60'
                        : 'bg-[#1a260e]/5 text-[#1a260e]/40'
                    }`}>
                      <Star className="h-3 w-3" />
                      Reformer Room
                    </div>
                    <span className={`text-[10px] tracking-wider uppercase ${
                      formData.rooms.includes('reformer') ? 'text-[#fffcf2]/30' : 'text-[#1a260e]/20'
                    }`}>
                      Main Studio
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-5xl md:text-6xl font-light">£32</span>
                      <span className={`text-sm font-light ${
                        formData.rooms.includes('reformer') ? 'text-[#fffcf2]/40' : 'text-[#1a260e]/40'
                      }`}>
                        / person
                      </span>
                    </div>
                    <p className={`text-xs mt-2 ${
                      formData.rooms.includes('reformer') ? 'text-[#fffcf2]/30' : 'text-[#1a260e]/30'
                    }`}>
                      From £32/person + instructor fee
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full mb-6 ${
                    formData.rooms.includes('reformer') ? 'bg-[#fffcf2]/10' : 'bg-[#1a260e]/10'
                  }`} />

                  {/* Features */}
                  <ul className="space-y-3">
                    {[
                      'Professional reformer equipment',
                      '2–8 guests per session',
                      'Price varies by group size',
                      '1-hour session',
                      'Instructor-led or self-guided',
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${
                          formData.rooms.includes('reformer') ? 'text-[#fffcf2]/30' : 'text-[#1a260e]/30'
                        }`} />
                        <span className={`text-sm font-light ${
                          formData.rooms.includes('reformer') ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Select indicator */}
                  <div className={`mt-8 text-center py-3 rounded-sm text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                    formData.rooms.includes('reformer')
                      ? 'bg-[#fffcf2]/10 text-[#fffcf2]/60'
                      : 'border border-[#1a260e]/10 text-[#1a260e]/40 group-hover:border-[#1a260e]/20'
                  }`}>
                    {formData.rooms.includes('reformer') ? 'Selected — tap to remove' : 'Tap to select'}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Hot Pilates Room Card */}
            <Reveal delay={0.1}>
              <div
                className={`group relative cursor-pointer transition-all duration-500 ${
                  formData.rooms.includes('hot-pilates') ? 'scale-[1.02]' : ''
                }`}
                onClick={() => toggleRoom('hot-pilates')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleRoom('hot-pilates');
                }}
                tabIndex={0}
                role="checkbox"
                aria-checked={formData.rooms.includes('hot-pilates')}
                aria-label="Select Hot Pilates Room"
              >
                {/* Offset border decoration */}
                <div className={`absolute -inset-2 border transition-all duration-500 rounded-sm ${
                  formData.rooms.includes('hot-pilates')
                    ? 'border-[#1a260e]/20'
                    : 'border-transparent group-hover:border-[#1a260e]/10'
                }`} />

                <div className={`relative p-8 md:p-10 rounded-sm transition-all duration-500 ${
                  formData.rooms.includes('hot-pilates')
                    ? 'bg-[#1a260e] text-[#fffcf2]'
                    : 'bg-[#faf8f3] text-[#1a260e] group-hover:bg-[#f5f0e8]'
                }`}>
                  {/* Room badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase ${
                      formData.rooms.includes('hot-pilates')
                        ? 'bg-[#fffcf2]/10 text-[#fffcf2]/60'
                        : 'bg-[#1a260e]/5 text-[#1a260e]/40'
                    }`}>
                      <Flame className="h-3 w-3" />
                      Hot Pilates Room
                    </div>
                    <span className={`text-[10px] tracking-wider uppercase ${
                      formData.rooms.includes('hot-pilates') ? 'text-[#fffcf2]/30' : 'text-[#1a260e]/20'
                    }`}>
                      Add-on or Standalone
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-5xl md:text-6xl font-light">£28</span>
                      <span className={`text-sm font-light ${
                        formData.rooms.includes('hot-pilates') ? 'text-[#fffcf2]/40' : 'text-[#1a260e]/40'
                      }`}>
                        / person
                      </span>
                    </div>
                    <p className={`text-xs mt-2 ${
                      formData.rooms.includes('hot-pilates') ? 'text-[#fffcf2]/30' : 'text-[#1a260e]/30'
                    }`}>
                      From £28/person + instructor fee
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full mb-6 ${
                    formData.rooms.includes('hot-pilates') ? 'bg-[#fffcf2]/10' : 'bg-[#1a260e]/10'
                  }`} />

                  {/* Features */}
                  <ul className="space-y-3">
                    {[
                      'Infrared heated studio',
                      '2–8 guests per session',
                      'Price varies by group size',
                      '1-hour session',
                      'Hire alone or add to Reformer',
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${
                          formData.rooms.includes('hot-pilates') ? 'text-[#fffcf2]/30' : 'text-[#1a260e]/30'
                        }`} />
                        <span className={`text-sm font-light ${
                          formData.rooms.includes('hot-pilates') ? 'text-[#fffcf2]/70' : 'text-[#1a260e]/60'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Select indicator */}
                  <div className={`mt-8 text-center py-3 rounded-sm text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                    formData.rooms.includes('hot-pilates')
                      ? 'bg-[#fffcf2]/10 text-[#fffcf2]/60'
                      : 'border border-[#1a260e]/10 text-[#1a260e]/40 group-hover:border-[#1a260e]/20'
                  }`}>
                    {formData.rooms.includes('hot-pilates') ? 'Selected — tap to remove' : 'Tap to select'}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Both rooms selected badge */}
          {formData.rooms.length === 2 && (
            <Reveal>
              <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#1a260e] rounded-full">
                  <Sparkles className="h-4 w-4 text-[#fffcf2]/50" />
                  <span className="text-[#fffcf2] text-sm tracking-wider">Both rooms selected — the full experience</span>
                </div>
              </div>
            </Reveal>
          )}

          {/* You can select both hint */}
          {formData.rooms.length === 1 && (
            <Reveal>
              <p className="mt-8 text-center text-[#1a260e]/30 text-xs tracking-wide">
                You can also select the {formData.rooms[0] === 'reformer' ? 'Hot Pilates Room' : 'Reformer Room'} to hire both
              </p>
            </Reveal>
          )}

          {/* Cost estimator */}
          {totalPerPerson !== null && totalPerPerson > 0 && (
            <Reveal>
              <div className="mt-8 text-center">
                <div className="inline-flex flex-col items-center gap-2 px-8 py-5 bg-[#1a260e]/[0.03] rounded-sm">
                  <span className="text-[#1a260e]/40 text-xs tracking-wider uppercase">Per person</span>
                  <span className="font-serif text-2xl md:text-3xl text-[#1a260e] font-light">
                    £{totalPerPerson}/person
                  </span>
                  <span className="text-[#1a260e]/25 text-xs">+ instructor fee</span>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PRICE CALCULATOR — Interactive slider
         ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#faf8f3]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <Calculator className="h-4 w-4 text-[#1a260e]/30" />
                <p className="tagline text-[#1a260e]/40">PRICE CALCULATOR</p>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a260e] font-light">
                See Your <span className="italic">Price</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-[#fffcf2] border border-[#1a260e]/[0.06] rounded-sm overflow-hidden">

                {/* Room Selection */}
                <div className="p-8 md:p-10 pb-0">
                  <p className="text-xs tracking-wider uppercase text-[#1a260e]/35 mb-4">1. Choose Your Room(s)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => toggleRoom('reformer')}
                      className={`relative flex items-center gap-3 px-5 py-4 border rounded-sm text-left transition-all duration-300 ${
                        formData.rooms.includes('reformer')
                          ? 'border-[#1a260e] bg-[#1a260e] text-[#fffcf2]'
                          : 'border-[#1a260e]/10 text-[#1a260e]/60 hover:border-[#1a260e]/25'
                      }`}
                    >
                      <Star className="h-4 w-4 flex-shrink-0" />
                      <div>
                        <span className="block text-sm font-medium">Reformer Room</span>
                        <span className={`block text-xs mt-0.5 ${
                          formData.rooms.includes('reformer') ? 'text-[#fffcf2]/50' : 'text-[#1a260e]/30'
                        }`}>From £35/person</span>
                      </div>
                      {formData.rooms.includes('reformer') && (
                        <CheckCircle2 className="h-4 w-4 absolute top-3 right-3 text-[#fffcf2]/40" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleRoom('hot-pilates')}
                      className={`relative flex items-center gap-3 px-5 py-4 border rounded-sm text-left transition-all duration-300 ${
                        formData.rooms.includes('hot-pilates')
                          ? 'border-[#1a260e] bg-[#1a260e] text-[#fffcf2]'
                          : 'border-[#1a260e]/10 text-[#1a260e]/60 hover:border-[#1a260e]/25'
                      }`}
                    >
                      <Flame className="h-4 w-4 flex-shrink-0" />
                      <div>
                        <span className="block text-sm font-medium">Hot Pilates Room</span>
                        <span className={`block text-xs mt-0.5 ${
                          formData.rooms.includes('hot-pilates') ? 'text-[#fffcf2]/50' : 'text-[#1a260e]/30'
                        }`}>From £30/person</span>
                      </div>
                      {formData.rooms.includes('hot-pilates') && (
                        <CheckCircle2 className="h-4 w-4 absolute top-3 right-3 text-[#fffcf2]/40" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Guest Slider */}
                <div className="p-8 md:p-10">
                  <p className="text-xs tracking-wider uppercase text-[#1a260e]/35 mb-6">2. How Many Guests?</p>

                  {/* Big number display */}
                  <div className="text-center mb-8">
                    <span className="font-serif text-7xl md:text-8xl text-[#1a260e] font-light leading-none transition-all duration-300">
                      {formData.guests}
                    </span>
                    <span className="block text-[10px] tracking-[0.25em] uppercase text-[#1a260e]/25 mt-2">
                      guests
                    </span>
                  </div>

                  {/* Slider */}
                  <div className="relative px-2">
                    {/* Track labels */}
                    <div className="flex justify-between mb-3 px-1">
                      {[2, 3, 4, 5, 6, 7, 8].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, guests: String(n) }))}
                          className={`w-8 h-8 rounded-full text-xs transition-all duration-300 ${
                            parseInt(formData.guests) === n
                              ? 'bg-[#1a260e] text-[#fffcf2] scale-110'
                              : 'text-[#1a260e]/30 hover:text-[#1a260e]/60 hover:bg-[#1a260e]/5'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>

                    {/* Range slider */}
                    <div className="relative mt-2">
                      <input
                        type="range"
                        min="2"
                        max="8"
                        step="1"
                        value={formData.guests}
                        onChange={(e) => setFormData(prev => ({ ...prev, guests: e.target.value }))}
                        className="w-full h-1 appearance-none cursor-pointer bg-[#1a260e]/10 rounded-full outline-none
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-6
                          [&::-webkit-slider-thumb]:h-6
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-[#1a260e]
                          [&::-webkit-slider-thumb]:cursor-grab
                          [&::-webkit-slider-thumb]:active:cursor-grabbing
                          [&::-webkit-slider-thumb]:transition-transform
                          [&::-webkit-slider-thumb]:duration-150
                          [&::-webkit-slider-thumb]:hover:scale-125
                          [&::-webkit-slider-thumb]:active:scale-110
                          [&::-webkit-slider-thumb]:shadow-lg
                          [&::-moz-range-thumb]:w-6
                          [&::-moz-range-thumb]:h-6
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-[#1a260e]
                          [&::-moz-range-thumb]:border-0
                          [&::-moz-range-thumb]:cursor-grab
                          [&::-moz-range-thumb]:active:cursor-grabbing"
                      />
                      {/* Fill track */}
                      <div
                        className="absolute top-1/2 left-0 h-1 bg-[#1a260e] rounded-full pointer-events-none -translate-y-1/2"
                        style={{ width: `${((parseInt(formData.guests) - 2) / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Price Result */}
                <div className={`transition-all duration-500 ${
                  formData.rooms.length === 0
                    ? 'bg-[#1a260e]/[0.02] p-8 md:p-10'
                    : 'bg-[#1a260e] p-8 md:p-10'
                }`}>
                  {formData.rooms.length === 0 ? (
                    <p className="text-center text-[#1a260e]/25 text-sm font-light">
                      Select a room above to see your price
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {/* Per-room breakdown */}
                      {/* Per-room breakdown */}
                      {formData.rooms.length > 1 && (
                        <div className="space-y-3 mb-2">
                          {formData.rooms.map(room => (
                            <div key={room} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {room === 'reformer'
                                  ? <Star className="h-3.5 w-3.5 text-[#fffcf2]/30" />
                                  : <Flame className="h-3.5 w-3.5 text-[#fffcf2]/30" />
                                }
                                <span className="text-sm text-[#fffcf2]/60 font-light">
                                  {room === 'reformer' ? 'Reformer Room' : 'Hot Pilates Room'}
                                </span>
                              </div>
                              <span className="text-[#fffcf2]/80 text-sm font-light">
                                £{getPerPerson(room, guestCount)}/person
                              </span>
                            </div>
                          ))}
                          <div className="h-px bg-[#fffcf2]/10" />
                        </div>
                      )}

                      {/* Main price display */}
                      <div className="text-center">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#fffcf2]/25 mb-3">
                          {guestCount} guests &middot; per person
                        </p>
                        <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#fffcf2] font-light leading-none transition-all duration-300">
                          £{formData.rooms.reduce((sum, room) => sum + getPerPerson(room, guestCount), 0)}
                        </p>
                        <p className="text-[#fffcf2]/20 text-xs mt-3 tracking-wide">per person + instructor fee</p>

                        {formData.rooms.length === 2 && (
                          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-[#fffcf2]/[0.06] rounded-full">
                            <Sparkles className="h-3 w-3 text-[#fffcf2]/30" />
                            <span className="text-[10px] tracking-wider uppercase text-[#fffcf2]/40">Both rooms selected</span>
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <button
                        type="button"
                        onClick={scrollToForm}
                        className="group w-full flex items-center justify-center gap-2 bg-[#fffcf2] text-[#1a260e] py-4 font-sans text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.01] rounded-sm"
                      >
                        Enquire with these details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ════════════════════════════════════════════════════════
          HOW IT WORKS — Three steps
         ════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <p className="tagline text-[#1a260e]/40 mb-5">HOW IT WORKS</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a260e] font-light">
                Three Simple <span className="italic">Steps</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#1a260e]/10 max-w-4xl mx-auto">
            {[
              {
                number: '01',
                title: 'Enquire',
                body: 'Fill out the form below with your preferred date, time, and any extras you\'d like. We\'ll get back to you within 24 hours.',
                icon: Send,
              },
              {
                number: '02',
                title: 'Confirm',
                body: 'We\'ll finalise the details, match you with the perfect instructor, and confirm your booking with a secure payment link.',
                icon: Calendar,
              },
              {
                number: '03',
                title: 'Celebrate',
                body: 'Arrive at the studio, and we\'ll have everything set up and ready for you and your guests. Just bring the energy!',
                icon: PartyPopper,
              },
            ].map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08}>
                <div className={`py-10 md:py-14 md:px-8 ${i < 2 ? 'md:border-r border-b md:border-b-0 border-[#1a260e]/10' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs tracking-[0.3em] text-[#1a260e]/25 font-medium">{step.number}</span>
                    <step.icon className="h-4 w-4 text-[#1a260e]/25" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1a260e] mb-4">{step.title}</h3>
                  <p className="text-sm md:text-base text-[#1a260e]/60 font-light leading-[1.8]">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          EXTRAS — Add-ons section
         ════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 bg-[#1a260e]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[#fffcf2]/30 text-xs tracking-[0.35em] uppercase mb-5">MAKE IT SPECIAL</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#fffcf2] font-light">
                Add <span className="italic">Extras</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {extras.map((extra, i) => (
              <Reveal key={extra.id} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => toggleExtra(extra.id)}
                  className={`w-full text-left p-6 rounded-sm transition-all duration-500 group ${
                    formData.extras.includes(extra.id)
                      ? 'bg-[#fffcf2] text-[#1a260e]'
                      : 'bg-[#fffcf2]/5 text-[#fffcf2] hover:bg-[#fffcf2]/10'
                  }`}
                >
                  <extra.icon className={`h-5 w-5 mb-4 transition-colors ${
                    formData.extras.includes(extra.id)
                      ? 'text-[#1a260e]'
                      : 'text-[#fffcf2]/40'
                  }`} />
                  <h3 className={`text-sm font-medium tracking-wide mb-2 ${
                    formData.extras.includes(extra.id)
                      ? 'text-[#1a260e]'
                      : 'text-[#fffcf2]/80'
                  }`}>
                    {extra.label}
                  </h3>
                  <p className={`text-xs font-light leading-relaxed ${
                    formData.extras.includes(extra.id)
                      ? 'text-[#1a260e]/60'
                      : 'text-[#fffcf2]/30'
                  }`}>
                    {extra.description}
                  </p>
                  {formData.extras.includes(extra.id) && (
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-[#1a260e]/50">
                      <CheckCircle2 className="h-3 w-3" />
                      Selected
                    </div>
                  )}
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="text-center text-[#fffcf2]/20 text-xs mt-8 tracking-wide">
              Pricing for extras will be discussed during confirmation
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ENQUIRY FORM — The main event
         ════════════════════════════════════════════════════════ */}
      <section ref={formRef} className="py-24 md:py-36 px-6 scroll-mt-32">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-14 md:mb-20">
              <p className="tagline text-[#1a260e]/40 mb-5">ENQUIRE</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a260e] font-light mb-6">
                Book Your <span className="italic">Experience</span>
              </h2>
              <p className="text-[#1a260e]/50 text-base font-light max-w-xl mx-auto">
                Fill in the details below and we&apos;ll get back to you within 24 hours
                to confirm availability and finalise your booking.
              </p>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <Reveal>
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1a260e]/5 mb-6">
                    <CheckCircle2 className="h-8 w-8 text-[#1a260e]/60" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#1a260e] font-light mb-4">
                    Enquiry Sent
                  </h3>
                  <p className="text-[#1a260e]/50 font-light">
                    Check your email client — we&apos;ve prepared the message for you.
                    We&apos;ll be in touch soon!
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.05}>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Details */}
                  <div>
                    <h3 className="font-serif text-xl text-[#1a260e] font-light mb-6 flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.3em] text-[#1a260e]/25 font-sans uppercase">01</span>
                      Your Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block font-sans text-xs tracking-wider uppercase text-[#1a260e]/40 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full px-4 py-3.5 bg-transparent border-b border-[#1a260e]/15 focus:border-[#1a260e] focus:outline-none transition-colors text-[#1a260e] placeholder:text-[#1a260e]/20 text-sm font-light"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-sans text-xs tracking-wider uppercase text-[#1a260e]/40 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3.5 bg-transparent border-b border-[#1a260e]/15 focus:border-[#1a260e] focus:outline-none transition-colors text-[#1a260e] placeholder:text-[#1a260e]/20 text-sm font-light"
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <label htmlFor="phone" className="block font-sans text-xs tracking-wider uppercase text-[#1a260e]/40 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 ..."
                        className="w-full px-4 py-3.5 bg-transparent border-b border-[#1a260e]/15 focus:border-[#1a260e] focus:outline-none transition-colors text-[#1a260e] placeholder:text-[#1a260e]/20 text-sm font-light"
                      />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="pt-4">
                    <h3 className="font-serif text-xl text-[#1a260e] font-light mb-6 flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.3em] text-[#1a260e]/25 font-sans uppercase">02</span>
                      Event Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="eventType" className="block font-sans text-xs tracking-wider uppercase text-[#1a260e]/40 mb-2">
                          Type of Event *
                        </label>
                        <select
                          id="eventType"
                          name="eventType"
                          required
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-transparent border-b border-[#1a260e]/15 focus:border-[#1a260e] focus:outline-none transition-colors text-[#1a260e] text-sm font-light appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select event type</option>
                          <option value="Birthday Party">Birthday Party</option>
                          <option value="Corporate Event">Corporate Event</option>
                          <option value="Hen Do">Hen Do</option>
                          <option value="Private Class">Private Pilates Class</option>
                          <option value="Social Gathering">Social Gathering</option>
                          <option value="Team Building">Team Building</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="guests" className="block font-sans text-xs tracking-wider uppercase text-[#1a260e]/40 mb-2">
                          Number of Guests *
                        </label>
                        <select
                          id="guests"
                          name="guests"
                          required
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-transparent border-b border-[#1a260e]/15 focus:border-[#1a260e] focus:outline-none transition-colors text-[#1a260e] text-sm font-light appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select number</option>
                          {[2, 3, 4, 5, 6, 7, 8].map(n => (
                            <option key={n} value={n}>{n} {n === 2 ? '(minimum)' : n === 8 ? '(maximum)' : ''} guests</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                      <div>
                        <label className="block font-sans text-xs tracking-wider uppercase text-[#1a260e]/40 mb-3">
                          Room(s) * <span className="normal-case tracking-normal text-[#1a260e]/25">— select one or both</span>
                        </label>
                        <div className="flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => toggleRoom('reformer')}
                            className={`flex items-center gap-3 px-4 py-3 border rounded-sm text-left text-sm font-light transition-all duration-300 ${
                              formData.rooms.includes('reformer')
                                ? 'border-[#1a260e] bg-[#1a260e]/[0.03] text-[#1a260e]'
                                : 'border-[#1a260e]/10 text-[#1a260e]/50 hover:border-[#1a260e]/25'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all ${
                              formData.rooms.includes('reformer')
                                ? 'border-[#1a260e] bg-[#1a260e]'
                                : 'border-[#1a260e]/20'
                            }`}>
                              {formData.rooms.includes('reformer') && (
                                <CheckCircle2 className="h-3 w-3 text-[#fffcf2]" />
                              )}
                            </div>
                            Reformer Room
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleRoom('hot-pilates')}
                            className={`flex items-center gap-3 px-4 py-3 border rounded-sm text-left text-sm font-light transition-all duration-300 ${
                              formData.rooms.includes('hot-pilates')
                                ? 'border-[#1a260e] bg-[#1a260e]/[0.03] text-[#1a260e]'
                                : 'border-[#1a260e]/10 text-[#1a260e]/50 hover:border-[#1a260e]/25'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all ${
                              formData.rooms.includes('hot-pilates')
                                ? 'border-[#1a260e] bg-[#1a260e]'
                                : 'border-[#1a260e]/20'
                            }`}>
                              {formData.rooms.includes('hot-pilates') && (
                                <CheckCircle2 className="h-3 w-3 text-[#fffcf2]" />
                              )}
                            </div>
                            Hot Pilates Room
                          </button>
                        </div>
                        {formData.rooms.length === 0 && (
                          <input type="text" required value="" readOnly className="sr-only" tabIndex={-1} aria-hidden="true" />
                        )}
                      </div>

                      <div>
                        <label htmlFor="date" className="block font-sans text-xs tracking-wider uppercase text-[#1a260e]/40 mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3.5 bg-transparent border-b border-[#1a260e]/15 focus:border-[#1a260e] focus:outline-none transition-colors text-[#1a260e] text-sm font-light"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="time" className="block font-sans text-xs tracking-wider uppercase text-[#1a260e]/40 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-transparent border-b border-[#1a260e]/15 focus:border-[#1a260e] focus:outline-none transition-colors text-[#1a260e] text-sm font-light appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select time</option>
                        <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                        <option value="Afternoon (12pm - 3pm)">Afternoon (12pm - 3pm)</option>
                        <option value="Late Afternoon (3pm - 6pm)">Late Afternoon (3pm - 6pm)</option>
                        <option value="Evening (6pm - 8pm)">Evening (6pm - 8pm)</option>
                        <option value="Flexible">Flexible / No preference</option>
                      </select>
                    </div>
                  </div>

                  {/* Extras Selection (inline in form) */}
                  <div className="pt-4">
                    <h3 className="font-serif text-xl text-[#1a260e] font-light mb-6 flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.3em] text-[#1a260e]/25 font-sans uppercase">03</span>
                      Extras
                      <span className="text-[#1a260e]/20 text-xs font-sans font-light">(optional)</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {extras.map((extra) => (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra.id)}
                          className={`p-4 rounded-sm border text-left transition-all duration-300 ${
                            formData.extras.includes(extra.id)
                              ? 'border-[#1a260e] bg-[#1a260e]/[0.03]'
                              : 'border-[#1a260e]/10 hover:border-[#1a260e]/25'
                          }`}
                        >
                          <extra.icon className={`h-4 w-4 mb-2 ${
                            formData.extras.includes(extra.id) ? 'text-[#1a260e]' : 'text-[#1a260e]/30'
                          }`} />
                          <span className={`block text-xs font-light ${
                            formData.extras.includes(extra.id) ? 'text-[#1a260e]' : 'text-[#1a260e]/50'
                          }`}>
                            {extra.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="pt-4">
                    <h3 className="font-serif text-xl text-[#1a260e] font-light mb-6 flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.3em] text-[#1a260e]/25 font-sans uppercase">04</span>
                      Anything Else?
                      <span className="text-[#1a260e]/20 text-xs font-sans font-light">(optional)</span>
                    </h3>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your event, any special requirements, dietary needs for drinks, or anything else we should know..."
                      className="w-full px-4 py-3.5 bg-transparent border border-[#1a260e]/10 focus:border-[#1a260e] focus:outline-none transition-colors text-[#1a260e] placeholder:text-[#1a260e]/20 text-sm font-light resize-none rounded-sm"
                    />
                  </div>

                  {/* Live Price Estimate */}
                  {totalPerPerson !== null && totalPerPerson > 0 && (
                    <div className="flex items-center justify-between p-5 bg-[#1a260e]/[0.02] rounded-sm border border-[#1a260e]/5">
                      <div>
                        <p className="text-xs tracking-wider uppercase text-[#1a260e]/30 mb-1">Per Person</p>
                        <p className="font-serif text-2xl text-[#1a260e] font-light">
                          £{totalPerPerson}/person
                          <span className="text-sm text-[#1a260e]/30 ml-2">+ instructor fee</span>
                        </p>
                      </div>
                      <div className="text-right text-xs text-[#1a260e]/30 font-light">
                        {formData.rooms.map(r => (
                          <span key={r} className="block">
                            {r === 'reformer' ? 'Reformer' : 'Hot Pilates'}: £{getPerPerson(r, guestCount)}/pp
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-3 bg-[#1a260e] text-[#fffcf2] py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:scale-[1.01] hover:shadow-xl"
                  >
                    Send Enquiry
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-center text-[#1a260e]/25 text-xs font-light">
                    This opens your email client with the enquiry details pre-filled.
                    You can also email us directly at{' '}
                    <a href="mailto:euforyc@gmail.com" className="underline hover:text-[#1a260e]/50 transition-colors">
                      euforyc@gmail.com
                    </a>
                  </p>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CLOSING CTA
         ════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-[#1a260e]">
        <FloatingParticles />

        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2a3a21]/30 blur-[150px]" />
        </div>

        <div className="relative z-10 container-width text-center px-6">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-7">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#fffcf2] font-light leading-tight">
                Your next event<br />
                starts <span className="italic">here</span>
              </h2>
              <p className="text-[#fffcf2]/40 text-sm md:text-base font-light max-w-md mx-auto">
                Whether it&apos;s a birthday celebration, team bonding session,
                or a private pilates class with friends — we&apos;ve got the perfect space for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <button
                  onClick={scrollToForm}
                  className="group inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-10 py-5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#fffcf2]/10"
                >
                  Enquire Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <Link
                  href="/contact"
                  className="text-[#fffcf2]/40 text-sm tracking-wider hover:text-[#fffcf2]/70 transition-colors"
                >
                  Or get in touch →
                </Link>
              </div>

              {/* Location tag */}
              <div className="flex items-center justify-center gap-2 pt-6 text-[#fffcf2]/20 text-xs">
                <MapPin className="h-3 w-3" />
                <span className="tracking-wider">7 Holmstall Ave, Edgware HA8 5HX</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
