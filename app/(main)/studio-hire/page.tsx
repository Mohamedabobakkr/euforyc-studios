'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
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
  ChevronDown,
  Calendar,
  MapPin,
  Heart,
  Flame,
  Star,
  Minus,
  Plus,
  Calculator,
} from 'lucide-react';
import Arrow from '@/components/euforyc/Arrow';
import HoneypotField from '@/components/HoneypotField';
import { getPerPerson } from '@/lib/studio-hire-pricing';
import { submitEnquiry } from '@/lib/submit-enquiry';

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
// CSS-only (eu-rv): content is always rendered visible, and only animates
// where scroll-driven animations are supported and motion is allowed.
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={`eu-rv ${className}`}>{children}</div>;
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
  return (
    <div className="eu-wrap">
      <div className="h-px bg-[#1a260e]/15" />
    </div>
  );
}

// ─── Locked Height ────────────────────────────────────────────
// Some mobile browsers shrink the viewport while the keyboard is open, which would shrink a
// full-screen section and jump everything below it. On touch devices, fix the height in px
// and only re-measure when the width changes (rotation).
function useLockedHeight() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: coarse)').matches) return;
    let width = window.innerWidth;
    const lock = () => {
      el.style.minHeight = '';
      el.style.minHeight = `${el.offsetHeight}px`;
    };
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      lock();
    };
    lock();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return ref;
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

const emptyForm: FormData = {
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
};

// ─── Field Errors ─────────────────────────────────────────────
// Shown under a field when the server rejects its value
const FIELD_MESSAGES: Record<string, string> = {
  name: 'Please enter your name (up to 100 characters).',
  email: 'Please enter a valid email address, for example name@example.com.',
  phone: 'Please enter your phone number (up to 40 characters).',
  eventType: 'Please choose the type of event.',
  guests: 'Please choose between 2 and 8 guests.',
  date: 'Please choose your preferred date.',
  time: 'Please choose your preferred time.',
  message: 'Please keep your notes under 5,000 characters.',
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p role="alert" className="mt-2 pl-1 text-sm leading-snug text-red-800">{message}</p>;
}

// ─── Field Styles ─────────────────────────────────────────────
// Rounded cream fields with a hairline border; 16px text so iOS doesn't zoom
const LABEL_CLASS = 'block font-sans text-[12px] font-normal tracking-[0.16em] uppercase text-eu-green mb-2.5 pl-1';
const FIELD_CLASS =
  'block w-full px-5 rounded-[14px] bg-eu-cream border text-base font-normal text-eu-ink placeholder:text-eu-stone transition-colors duration-300 focus:border-eu-ink';

export default function StudioHire() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [roomError, setRoomError] = useState(false);
  const sendingRef = useRef(false); // guards against double submits
  const formRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const heroRef = useLockedHeight();
  const heldRef = useRef<{ el: HTMLElement; top: number } | null>(null);

  // The success message is far shorter than the form it replaces, so bring it into view
  useEffect(() => {
    if (submitted) successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [submitted]);

  // Bring the first rejected field into view
  useEffect(() => {
    const first = invalidFields.find(field => field in FIELD_MESSAGES);
    if (first) document.getElementById(first)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [invalidFields]);

  const fieldError = (field: string) => (invalidFields.includes(field) ? FIELD_MESSAGES[field] : undefined);
  // Visual only: a field the server rejected gets a red border alongside its message
  const fieldClass = (field: string) =>
    `${FIELD_CLASS} ${fieldError(field) ? 'border-red-800' : 'border-[#1a260e]/20 hover:border-[#1a260e]/40'}`;

  // Choosing a room or extra mounts content further up the page (price estimates, "Selected"
  // tags). Safari has no scroll anchoring, so that would push the rest of the page down:
  // keep the control that was tapped exactly where it is on screen.
  const holdInPlace = (el: HTMLElement) => {
    heldRef.current = { el, top: el.getBoundingClientRect().top };
  };
  useLayoutEffect(() => {
    const held = heldRef.current;
    heldRef.current = null;
    if (!held) return;
    const moved = held.el.getBoundingClientRect().top - held.top;
    if (moved !== 0) window.scrollBy({ top: moved, behavior: 'instant' });
  }, [formData.rooms, formData.extras]);

  const toggleRoom = (room: string, control: HTMLElement) => {
    holdInPlace(control);
    setRoomError(false);
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

  const toggleExtra = (id: string, control: HTMLElement) => {
    holdInPlace(control);
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(id)
        ? prev.extras.filter(e => e !== id)
        : [...prev.extras, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendingRef.current) return;

    if (formData.rooms.length === 0) {
      setRoomError(true);
      roomsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    sendingRef.current = true;
    setSending(true);
    setSendError(false);
    setInvalidFields([]);

    const selectedExtras = formData.extras
      .map(id => extras.find(ex => ex.id === id)?.label)
      .filter(Boolean);
    const referral = String(new window.FormData(e.currentTarget).get('referral') ?? '');

    const result = await submitEnquiry({
      formType: 'studio-hire',
      ...formData,
      extras: selectedExtras,
      referral,
    });

    if (result.status === 'sent') {
      setFormData(emptyForm);
      setSubmitted(true);
    } else if (result.status === 'invalid') {
      setInvalidFields(result.fields);
    } else {
      setSendError(true);
    }
    setSending(false);
    sendingRef.current = false;
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const guestCount = parseInt(formData.guests || '2');
  const totalPerPerson = formData.rooms.length > 0 && guestCount > 0
    ? formData.rooms.reduce((sum, room) => sum + getPerPerson(room, guestCount), 0)
    : null;

  return (
    <div className="bg-eu-cream">

      {/* ════════════════════════════════════════════════════════
          HERO — Cinematic, dark, immersive (sits under the fixed header)
         ════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-eu-ink text-eu-cream rounded-b-[32px] md:rounded-b-eu-xl eu-on-dark">
        <div className="relative z-10 eu-wrap w-full text-center pt-[calc(var(--eu-header-space)_+_56px)] pb-32 md:pb-36">
          <Reveal>
            <p className="eu-cap text-eu-beige mb-7 inline-flex items-center gap-3.5 before:content-[''] before:w-[34px] before:h-px before:bg-current after:content-[''] after:w-[34px] after:h-px after:bg-current">
              Introducing
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-serif font-normal text-[clamp(64px,10.4vw,168px)] text-eu-cream leading-[0.9] tracking-[-0.03em] mb-8">
              Studio{' '}<br />
              <em className="italic text-eu-beige">Hire</em>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="w-16 h-px bg-[#fffcf2]/40 mx-auto mb-8" />
          </Reveal>

          <Reveal delay={0.22}>
            <p className="text-eu-beige text-[17px] md:text-lg leading-[1.75] max-w-2xl mx-auto mb-10 md:mb-12">
              Your event. Your people. Our space. Host birthdays, corporate events,
              private pilates sessions, gatherings, and celebrations in our premium
              boutique studio — open to <span className="text-eu-cream font-medium">everyone</span>.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center items-center">
              <button
                onClick={scrollToForm}
                className="eu-btn eu-btn--cream w-full sm:w-auto !justify-between"
              >
                Enquire Now
                <span className="eu-btn__dot">
                  <Arrow />
                </span>
              </button>
              <a
                href="#pricing"
                className="eu-ulink"
              >
                View pricing&nbsp;→
              </a>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-eu-beige text-[10.5px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#fffcf2]/50 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          OPEN TO EVERYONE — Key differentiator
         ════════════════════════════════════════════════════════ */}
      <section className="py-[clamp(80px,9vw,140px)] relative overflow-hidden">
        <div className="eu-wrap">
          <Reveal>
            <div className="text-center mb-12 md:mb-14">
              <div className="inline-flex items-center gap-3 mb-7">
                <div className="h-px w-10 bg-[#1a260e]/25" />
                <Heart className="h-4 w-4 text-eu-green" strokeWidth={1.5} />
                <div className="h-px w-10 bg-[#1a260e]/25" />
              </div>
              <h2 className="font-serif font-normal text-[clamp(42px,5.6vw,88px)] leading-none tracking-[-0.025em] text-eu-ink mb-7">
                Open to <em className="italic">Everyone</em>
              </h2>
              <p className="text-eu-green text-[17px] md:text-lg leading-[1.75] max-w-2xl mx-auto">
                While our regular classes are women-only, studio hire is open to
                <span className="font-medium text-eu-ink"> all genders</span>.
                Bring your friends, family, colleagues, or partner — whoever you
                want to share the experience with. It&apos;s your space, your rules.
              </p>
            </div>
          </Reveal>

          {/* Feature pills */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 max-w-3xl mx-auto">
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
                  className="flex items-center gap-2.5 min-h-[48px] px-5 border border-[#1a260e]/20 rounded-full text-eu-green text-[15px] hover:border-eu-ink hover:text-eu-ink transition-colors duration-300 cursor-default"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
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
      <section id="pricing" className="py-[clamp(88px,10vw,150px)] scroll-mt-[var(--eu-header-space)]">
        <div className="eu-wrap">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="eu-cap text-eu-green mb-5">PRICING</p>
              <h2 className="font-serif font-normal text-[clamp(42px,5.6vw,88px)] leading-none tracking-[-0.025em] text-eu-ink">
                Choose Your <em className="italic">Space</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Reformer Room Card */}
            <Reveal delay={0}>
              <div
                className="group relative cursor-pointer rounded-eu-md"
                onClick={(e) => toggleRoom('reformer', e.currentTarget)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleRoom('reformer', e.currentTarget);
                }}
                tabIndex={0}
                role="checkbox"
                aria-checked={formData.rooms.includes('reformer')}
                aria-label="Select Reformer Room"
              >
                {/* Offset border decoration */}
                <div className={`absolute -inset-2 border transition-colors duration-500 rounded-[36px] ${
                  formData.rooms.includes('reformer')
                    ? 'border-[#1a260e]/30'
                    : 'border-transparent group-hover:border-[#1a260e]/15'
                }`} />

                <div className={`relative p-7 md:p-10 rounded-eu-md transition-colors duration-500 ${
                  formData.rooms.includes('reformer')
                    ? 'bg-eu-ink text-eu-cream'
                    : 'bg-eu-beige text-eu-ink group-hover:bg-[#efe8dc]'
                }`}>
                  {/* Room badge */}
                  <div className="flex items-center justify-between gap-3 mb-7">
                    <div className={`inline-flex flex-shrink-0 items-center gap-2 min-h-[32px] px-3.5 rounded-full text-[11px] tracking-[0.18em] uppercase ${
                      formData.rooms.includes('reformer')
                        ? 'bg-[#fffcf2]/10 text-eu-beige'
                        : 'bg-eu-cream text-eu-green'
                    }`}>
                      <Star className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Reformer Room
                    </div>
                    <span className={`text-[11px] tracking-[0.14em] uppercase text-right ${
                      formData.rooms.includes('reformer') ? 'text-eu-beige' : 'text-eu-sage'
                    }`}>
                      Main Studio
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-7">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-[56px] md:text-7xl leading-none">£32</span>
                      <span className={`text-[15px] ${
                        formData.rooms.includes('reformer') ? 'text-eu-beige' : 'text-eu-sage'
                      }`}>
                        / person
                      </span>
                    </div>
                    <p className={`text-sm mt-3 ${
                      formData.rooms.includes('reformer') ? 'text-eu-beige' : 'text-eu-sage'
                    }`}>
                      From £32/person + instructor fee
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full mb-7 ${
                    formData.rooms.includes('reformer') ? 'bg-[#fffcf2]/15' : 'bg-[#1a260e]/15'
                  }`} />

                  {/* Features */}
                  <ul className="space-y-3.5">
                    {[
                      'Professional reformer equipment',
                      '2–8 guests per session',
                      'Price varies by group size',
                      '1-hour session',
                      'Instructor-led or self-guided',
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 strokeWidth={1.5} className={`h-4 w-4 flex-shrink-0 ${
                          formData.rooms.includes('reformer') ? 'text-eu-live' : 'text-eu-green'
                        }`} />
                        <span className={`text-[15px] ${
                          formData.rooms.includes('reformer') ? 'text-eu-cream' : 'text-eu-green'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Select indicator */}
                  <div className={`mt-8 flex items-center justify-center min-h-[52px] px-4 rounded-full border text-xs tracking-[0.16em] uppercase transition-colors duration-300 ${
                    formData.rooms.includes('reformer')
                      ? 'bg-[#fffcf2]/10 border-[#fffcf2]/25 text-eu-cream'
                      : 'border-[#1a260e]/30 text-eu-ink group-hover:bg-eu-ink group-hover:border-eu-ink group-hover:text-eu-cream'
                  }`}>
                    {formData.rooms.includes('reformer') ? 'Selected — tap to remove' : 'Tap to select'}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Hot Pilates Room Card */}
            <Reveal delay={0.1}>
              <div
                className="group relative cursor-pointer rounded-eu-md"
                onClick={(e) => toggleRoom('hot-pilates', e.currentTarget)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleRoom('hot-pilates', e.currentTarget);
                }}
                tabIndex={0}
                role="checkbox"
                aria-checked={formData.rooms.includes('hot-pilates')}
                aria-label="Select Hot Pilates Room"
              >
                {/* Offset border decoration */}
                <div className={`absolute -inset-2 border transition-colors duration-500 rounded-[36px] ${
                  formData.rooms.includes('hot-pilates')
                    ? 'border-[#1a260e]/30'
                    : 'border-transparent group-hover:border-[#1a260e]/15'
                }`} />

                <div className={`relative p-7 md:p-10 rounded-eu-md transition-colors duration-500 ${
                  formData.rooms.includes('hot-pilates')
                    ? 'bg-eu-ink text-eu-cream'
                    : 'bg-eu-beige text-eu-ink group-hover:bg-[#efe8dc]'
                }`}>
                  {/* Room badge */}
                  <div className="flex items-center justify-between gap-3 mb-7">
                    <div className={`inline-flex flex-shrink-0 items-center gap-2 min-h-[32px] px-3.5 rounded-full text-[11px] tracking-[0.18em] uppercase ${
                      formData.rooms.includes('hot-pilates')
                        ? 'bg-[#fffcf2]/10 text-eu-beige'
                        : 'bg-eu-cream text-eu-green'
                    }`}>
                      <Flame className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Hot Pilates Room
                    </div>
                    <span className={`text-[11px] tracking-[0.14em] uppercase text-right ${
                      formData.rooms.includes('hot-pilates') ? 'text-eu-beige' : 'text-eu-sage'
                    }`}>
                      Add-on or Standalone
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-7">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-[56px] md:text-7xl leading-none">£28</span>
                      <span className={`text-[15px] ${
                        formData.rooms.includes('hot-pilates') ? 'text-eu-beige' : 'text-eu-sage'
                      }`}>
                        / person
                      </span>
                    </div>
                    <p className={`text-sm mt-3 ${
                      formData.rooms.includes('hot-pilates') ? 'text-eu-beige' : 'text-eu-sage'
                    }`}>
                      From £28/person + instructor fee
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full mb-7 ${
                    formData.rooms.includes('hot-pilates') ? 'bg-[#fffcf2]/15' : 'bg-[#1a260e]/15'
                  }`} />

                  {/* Features */}
                  <ul className="space-y-3.5">
                    {[
                      'Infrared heated studio',
                      '2–8 guests per session',
                      'Price varies by group size',
                      '1-hour session',
                      'Hire alone or add to Reformer',
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 strokeWidth={1.5} className={`h-4 w-4 flex-shrink-0 ${
                          formData.rooms.includes('hot-pilates') ? 'text-eu-live' : 'text-eu-green'
                        }`} />
                        <span className={`text-[15px] ${
                          formData.rooms.includes('hot-pilates') ? 'text-eu-cream' : 'text-eu-green'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Select indicator */}
                  <div className={`mt-8 flex items-center justify-center min-h-[52px] px-4 rounded-full border text-xs tracking-[0.16em] uppercase transition-colors duration-300 ${
                    formData.rooms.includes('hot-pilates')
                      ? 'bg-[#fffcf2]/10 border-[#fffcf2]/25 text-eu-cream'
                      : 'border-[#1a260e]/30 text-eu-ink group-hover:bg-eu-ink group-hover:border-eu-ink group-hover:text-eu-cream'
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
                <div className="inline-flex items-center gap-3 min-h-[48px] px-6 py-3 bg-eu-ink rounded-[28px]">
                  <Sparkles className="h-4 w-4 text-eu-beige flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-eu-cream text-sm tracking-[0.06em]">Both rooms selected — the full experience</span>
                </div>
              </div>
            </Reveal>
          )}

          {/* You can select both hint */}
          {formData.rooms.length === 1 && (
            <Reveal>
              <p className="mt-8 text-center text-eu-sage text-sm">
                You can also select the {formData.rooms[0] === 'reformer' ? 'Hot Pilates Room' : 'Reformer Room'} to hire both
              </p>
            </Reveal>
          )}

          {/* Cost estimator */}
          {totalPerPerson !== null && totalPerPerson > 0 && (
            <Reveal>
              <div className="mt-8 text-center">
                <div className="inline-flex flex-col items-center gap-2 px-10 py-6 bg-eu-beige rounded-eu-sm">
                  <span className="eu-cap text-eu-sage">Per person</span>
                  <span className="font-serif text-3xl md:text-4xl text-eu-ink">
                    £{totalPerPerson}/person
                  </span>
                  <span className="text-eu-sage text-sm">+ instructor fee</span>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PRICE CALCULATOR — Interactive slider
         ════════════════════════════════════════════════════════ */}
      <section className="py-[clamp(80px,9vw,140px)] bg-eu-beige rounded-[32px] md:rounded-eu-xl mx-[clamp(10px,1.5vw,24px)]">
        <div className="eu-wrap">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-3 mb-5">
                <Calculator className="h-4 w-4 text-eu-green" strokeWidth={1.5} />
                <p className="eu-cap text-eu-green">PRICE CALCULATOR</p>
              </div>
              <h2 className="font-serif font-normal text-[clamp(42px,5.6vw,88px)] leading-none tracking-[-0.025em] text-eu-ink">
                See Your <em className="italic">Price</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-eu-cream border border-[#1a260e]/15 rounded-[28px] md:rounded-eu-lg overflow-hidden">

                {/* Room Selection */}
                <div className="px-5 pt-7 sm:px-8 sm:pt-8 md:px-10 md:pt-10">
                  <p className="eu-cap text-eu-green mb-4">1. Choose Your Room(s)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={(e) => toggleRoom('reformer', e.currentTarget)}
                      className={`relative flex items-center gap-3 min-h-[68px] pl-5 pr-11 py-4 border rounded-eu-sm text-left transition-colors duration-300 ${
                        formData.rooms.includes('reformer')
                          ? 'border-eu-ink bg-eu-ink text-eu-cream'
                          : 'border-[#1a260e]/20 text-eu-ink hover:border-eu-ink'
                      }`}
                    >
                      <Star className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <span className="block text-[15px] font-medium">Reformer Room</span>
                        <span className={`block text-[14px] mt-0.5 ${
                          formData.rooms.includes('reformer') ? 'text-eu-beige' : 'text-eu-sage'
                        }`}>From £35/person</span>
                      </div>
                      {formData.rooms.includes('reformer') && (
                        <CheckCircle2 className="h-4 w-4 absolute top-1/2 -translate-y-1/2 right-4 text-eu-beige" strokeWidth={1.5} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => toggleRoom('hot-pilates', e.currentTarget)}
                      className={`relative flex items-center gap-3 min-h-[68px] pl-5 pr-11 py-4 border rounded-eu-sm text-left transition-colors duration-300 ${
                        formData.rooms.includes('hot-pilates')
                          ? 'border-eu-ink bg-eu-ink text-eu-cream'
                          : 'border-[#1a260e]/20 text-eu-ink hover:border-eu-ink'
                      }`}
                    >
                      <Flame className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <span className="block text-[15px] font-medium">Hot Pilates Room</span>
                        <span className={`block text-[14px] mt-0.5 ${
                          formData.rooms.includes('hot-pilates') ? 'text-eu-beige' : 'text-eu-sage'
                        }`}>From £30/person</span>
                      </div>
                      {formData.rooms.includes('hot-pilates') && (
                        <CheckCircle2 className="h-4 w-4 absolute top-1/2 -translate-y-1/2 right-4 text-eu-beige" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Guest Slider */}
                <div className="px-5 py-8 sm:p-8 md:p-10">
                  <p className="eu-cap text-eu-green mb-6">2. How Many Guests?</p>

                  {/* Big number display */}
                  <div className="text-center mb-8">
                    <span className="font-serif text-[88px] md:text-[112px] text-eu-ink leading-none">
                      {formData.guests}
                    </span>
                    <span className="block eu-cap text-eu-sage mt-3">
                      guests
                    </span>
                  </div>

                  {/* Slider */}
                  <div className="relative">
                    {/* Track labels */}
                    <div className="flex flex-wrap justify-center gap-2 mb-2 md:flex-nowrap md:justify-between md:gap-0">
                      {[2, 3, 4, 5, 6, 7, 8].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, guests: String(n) }))}
                          className="group/n w-11 h-11 grid place-items-center rounded-full text-sm"
                        >
                          <span className={`grid place-items-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-colors duration-300 ${
                            parseInt(formData.guests) === n
                              ? 'bg-eu-ink text-eu-cream'
                              : 'text-eu-green group-hover/n:bg-eu-beige group-hover/n:text-eu-ink'
                          }`}>
                            {n}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Range slider */}
                    <div className="relative">
                      <input
                        type="range"
                        aria-label="Number of guests"
                        min="2"
                        max="8"
                        step="1"
                        value={formData.guests}
                        onChange={(e) => setFormData(prev => ({ ...prev, guests: e.target.value }))}
                        className="block w-full h-11 appearance-none cursor-pointer bg-transparent rounded-full
                          [&::-webkit-slider-runnable-track]:h-1
                          [&::-webkit-slider-runnable-track]:rounded-full
                          [&::-webkit-slider-runnable-track]:bg-[#1a260e]/15
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:-mt-3
                          [&::-webkit-slider-thumb]:w-7
                          [&::-webkit-slider-thumb]:h-7
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-eu-ink
                          [&::-webkit-slider-thumb]:cursor-grab
                          [&::-webkit-slider-thumb]:active:cursor-grabbing
                          [&::-webkit-slider-thumb]:transition-transform
                          [&::-webkit-slider-thumb]:duration-150
                          [&::-webkit-slider-thumb]:hover:scale-110
                          [&::-moz-range-track]:h-1
                          [&::-moz-range-track]:rounded-full
                          [&::-moz-range-track]:bg-[#1a260e]/15
                          [&::-moz-range-thumb]:w-7
                          [&::-moz-range-thumb]:h-7
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-eu-ink
                          [&::-moz-range-thumb]:border-0
                          [&::-moz-range-thumb]:cursor-grab
                          [&::-moz-range-thumb]:active:cursor-grabbing"
                      />
                      {/* Fill track */}
                      <div
                        className="absolute top-1/2 left-0 h-1 bg-eu-ink rounded-full pointer-events-none -translate-y-1/2"
                        style={{ width: `${((parseInt(formData.guests) - 2) / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Price Result */}
                <div className={`transition-colors duration-500 ${
                  formData.rooms.length === 0
                    ? 'bg-eu-beige px-5 py-8 sm:p-8 md:p-10'
                    : 'bg-eu-ink px-5 py-8 sm:p-8 md:p-10 eu-on-dark'
                }`}>
                  {formData.rooms.length === 0 ? (
                    <p className="text-center text-eu-sage text-[15px]">
                      Select a room above to see your price
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {/* Per-room breakdown */}
                      {/* Per-room breakdown */}
                      {formData.rooms.length > 1 && (
                        <div className="space-y-3 mb-2">
                          {formData.rooms.map(room => (
                            <div key={room} className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                {room === 'reformer'
                                  ? <Star className="h-3.5 w-3.5 text-eu-beige" strokeWidth={1.5} />
                                  : <Flame className="h-3.5 w-3.5 text-eu-beige" strokeWidth={1.5} />
                                }
                                <span className="text-[15px] text-eu-beige">
                                  {room === 'reformer' ? 'Reformer Room' : 'Hot Pilates Room'}
                                </span>
                              </div>
                              <span className="text-eu-cream text-[15px]">
                                £{getPerPerson(room, guestCount)}/person
                              </span>
                            </div>
                          ))}
                          <div className="h-px bg-[#fffcf2]/15" />
                        </div>
                      )}

                      {/* Main price display */}
                      <div className="text-center">
                        <p className="eu-cap text-eu-beige mb-4">
                          {guestCount} guests &middot; per person
                        </p>
                        <p className="font-serif text-[64px] md:text-7xl lg:text-8xl text-eu-cream leading-none">
                          £{formData.rooms.reduce((sum, room) => sum + getPerPerson(room, guestCount), 0)}
                        </p>
                        <p className="text-eu-beige text-sm mt-4">per person + instructor fee</p>

                        {formData.rooms.length === 2 && (
                          <div className="mt-5 inline-flex items-center gap-2 min-h-[32px] px-4 bg-[#fffcf2]/10 rounded-full">
                            <Sparkles className="h-3.5 w-3.5 text-eu-beige" strokeWidth={1.5} />
                            <span className="text-[11px] tracking-[0.14em] uppercase text-eu-beige">Both rooms selected</span>
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <button
                        type="button"
                        onClick={scrollToForm}
                        className="eu-btn eu-btn--cream eu-btn--block !whitespace-normal !text-left !leading-snug"
                      >
                        Enquire with these details
                        <span className="eu-btn__dot">
                          <Arrow />
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          HOW IT WORKS — Three steps
         ════════════════════════════════════════════════════════ */}
      <section className="py-[clamp(88px,10vw,150px)]">
        <div className="eu-wrap">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="eu-cap text-eu-green mb-5">HOW IT WORKS</p>
              <h2 className="font-serif font-normal text-[clamp(42px,5.6vw,88px)] leading-none tracking-[-0.025em] text-eu-ink">
                Three Simple <em className="italic">Steps</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
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
              <Reveal key={step.number} delay={i * 0.08} className="h-full">
                <div className="h-full p-7 md:p-8 rounded-eu-md border border-[#1a260e]/15">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="font-serif italic text-[44px] md:text-[52px] leading-none text-eu-green">{step.number}</span>
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-eu-beige">
                      <step.icon className="h-4 w-4 text-eu-green" strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="font-serif font-normal text-[28px] md:text-3xl text-eu-ink mb-3">{step.title}</h3>
                  <p className="text-[15px] md:text-base text-eu-green leading-[1.75]">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          EXTRAS — Add-ons section
         ════════════════════════════════════════════════════════ */}
      <section className="py-[clamp(72px,8vw,120px)] bg-eu-ink text-eu-cream rounded-[32px] md:rounded-eu-xl mx-[clamp(10px,1.5vw,24px)] eu-on-dark">
        <div className="eu-wrap">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="eu-cap text-eu-beige mb-5">MAKE IT SPECIAL</p>
              <h2 className="font-serif font-normal text-[clamp(42px,5.6vw,88px)] leading-none tracking-[-0.025em] text-eu-cream">
                Add <em className="italic">Extras</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {extras.map((extra, i) => (
              <Reveal key={extra.id} delay={i * 0.06} className="h-full">
                <button
                  type="button"
                  onClick={(e) => toggleExtra(extra.id, e.currentTarget)}
                  className={`w-full h-full text-left p-6 rounded-eu-sm border transition-colors duration-500 group ${
                    formData.extras.includes(extra.id)
                      ? 'bg-eu-cream border-eu-cream text-eu-ink'
                      : 'bg-[#fffcf2]/[0.04] border-[#fffcf2]/15 text-eu-cream hover:bg-[#fffcf2]/10 hover:border-[#fffcf2]/30'
                  }`}
                >
                  <extra.icon strokeWidth={1.5} className={`h-5 w-5 mb-5 transition-colors ${
                    formData.extras.includes(extra.id)
                      ? 'text-eu-ink'
                      : 'text-eu-beige'
                  }`} />
                  <h3 className={`font-serif text-xl font-normal leading-snug mb-2 ${
                    formData.extras.includes(extra.id)
                      ? 'text-eu-ink'
                      : 'text-eu-cream'
                  }`}>
                    {extra.label}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    formData.extras.includes(extra.id)
                      ? 'text-eu-green'
                      : 'text-eu-beige'
                  }`}>
                    {extra.description}
                  </p>
                  {formData.extras.includes(extra.id) && (
                    <div className="mt-4 flex items-center gap-1.5 eu-cap text-eu-green">
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Selected
                    </div>
                  )}
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="text-center text-eu-beige text-sm mt-8">
              Pricing for extras will be discussed during confirmation
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ENQUIRY FORM — The main event
         ════════════════════════════════════════════════════════ */}
      <section ref={formRef} className="py-[clamp(88px,10vw,150px)] scroll-mt-[var(--eu-header-space)]">
        <div className="eu-wrap">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <p className="eu-cap text-eu-green mb-5">ENQUIRE</p>
              <h2 className="font-serif font-normal text-[clamp(42px,5.6vw,88px)] leading-none tracking-[-0.025em] text-eu-ink mb-6">
                Book Your <em className="italic">Experience</em>
              </h2>
              <p className="text-eu-green text-[17px] leading-[1.75] max-w-xl mx-auto">
                Fill in the details below and we&apos;ll get back to you within 24 hours
                to confirm availability and finalise your booking.
              </p>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <Reveal>
                <div ref={successRef} className="text-center py-16 md:py-20 px-6 rounded-[28px] md:rounded-eu-lg bg-eu-beige">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-eu-cream mb-6">
                    <CheckCircle2 className="h-8 w-8 text-eu-green" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif font-normal text-3xl md:text-4xl text-eu-ink mb-4">
                    Enquiry Sent
                  </h3>
                  <p className="text-eu-green text-[17px]">
                    Thank you, we&apos;ve received your enquiry.
                    We&apos;ll be in touch soon!
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.05}>
                <form onSubmit={handleSubmit} className="space-y-10 rounded-[28px] md:rounded-eu-lg bg-eu-beige p-5 sm:p-8 md:p-12">
                  {/* Personal Details */}
                  <div>
                    <h3 className="font-serif text-2xl md:text-[28px] text-eu-ink font-normal mb-6 flex items-baseline gap-3">
                      <span className="font-serif italic text-lg text-eu-green">01</span>
                      Your Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={LABEL_CLASS}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          autoComplete="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`${fieldClass('name')} min-h-[52px] py-3`}
                        />
                        <FieldError message={fieldError('name')} />
                      </div>
                      <div>
                        <label htmlFor="email" className={LABEL_CLASS}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          autoComplete="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`${fieldClass('email')} min-h-[52px] py-3`}
                        />
                        <FieldError message={fieldError('email')} />
                      </div>
                    </div>
                    <div className="mt-5">
                      <label htmlFor="phone" className={LABEL_CLASS}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        autoComplete="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 ..."
                        className={`${fieldClass('phone')} min-h-[52px] py-3`}
                      />
                      <FieldError message={fieldError('phone')} />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div>
                    <h3 className="font-serif text-2xl md:text-[28px] text-eu-ink font-normal mb-6 flex items-baseline gap-3">
                      <span className="font-serif italic text-lg text-eu-green">02</span>
                      Event Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="eventType" className={LABEL_CLASS}>
                          Type of Event *
                        </label>
                        <div className="relative">
                          <select
                            id="eventType"
                            name="eventType"
                            required
                            value={formData.eventType}
                            onChange={handleChange}
                            className={`${fieldClass('eventType')} min-h-[52px] py-3 pr-12 appearance-none cursor-pointer`}
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
                          <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-eu-green" strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <FieldError message={fieldError('eventType')} />
                      </div>

                      <div>
                        <label htmlFor="guests" className={LABEL_CLASS}>
                          Number of Guests *
                        </label>
                        <div className="relative">
                          <select
                            id="guests"
                            name="guests"
                            required
                            value={formData.guests}
                            onChange={handleChange}
                            className={`${fieldClass('guests')} min-h-[52px] py-3 pr-12 appearance-none cursor-pointer`}
                          >
                            <option value="" disabled>Select number</option>
                            {[2, 3, 4, 5, 6, 7, 8].map(n => (
                              <option key={n} value={n}>{n} {n === 2 ? '(minimum)' : n === 8 ? '(maximum)' : ''} guests</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-eu-green" strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <FieldError message={fieldError('guests')} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                      <div ref={roomsRef}>
                        <label className={LABEL_CLASS}>
                          Room(s) * <span className="normal-case tracking-normal text-[14px] text-eu-sage">— select one or both</span>
                        </label>
                        <div className="flex flex-col gap-2.5">
                          <button
                            type="button"
                            onClick={(e) => toggleRoom('reformer', e.currentTarget)}
                            className={`flex items-center gap-3 min-h-[52px] px-5 py-3 border rounded-[14px] bg-eu-cream text-left text-base transition-colors duration-300 ${
                              formData.rooms.includes('reformer')
                                ? 'border-eu-ink shadow-[inset_0_0_0_1px_#1a260e] text-eu-ink'
                                : 'border-[#1a260e]/20 text-eu-green hover:border-[#1a260e]/40'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-[6px] border flex flex-shrink-0 items-center justify-center transition-colors ${
                              formData.rooms.includes('reformer')
                                ? 'border-eu-ink bg-eu-ink'
                                : 'border-[#1a260e]/40 bg-eu-cream'
                            }`}>
                              {formData.rooms.includes('reformer') && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-eu-cream" />
                              )}
                            </div>
                            Reformer Room
                          </button>
                          <button
                            type="button"
                            onClick={(e) => toggleRoom('hot-pilates', e.currentTarget)}
                            className={`flex items-center gap-3 min-h-[52px] px-5 py-3 border rounded-[14px] bg-eu-cream text-left text-base transition-colors duration-300 ${
                              formData.rooms.includes('hot-pilates')
                                ? 'border-eu-ink shadow-[inset_0_0_0_1px_#1a260e] text-eu-ink'
                                : 'border-[#1a260e]/20 text-eu-green hover:border-[#1a260e]/40'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-[6px] border flex flex-shrink-0 items-center justify-center transition-colors ${
                              formData.rooms.includes('hot-pilates')
                                ? 'border-eu-ink bg-eu-ink'
                                : 'border-[#1a260e]/40 bg-eu-cream'
                            }`}>
                              {formData.rooms.includes('hot-pilates') && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-eu-cream" />
                              )}
                            </div>
                            Hot Pilates Room
                          </button>
                        </div>
                        {roomError && formData.rooms.length === 0 && (
                          <p role="alert" className="mt-2 pl-1 text-sm leading-snug text-red-800">
                            Please select at least one room.
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="date" className={LABEL_CLASS}>
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
                          className={`${fieldClass('date')} min-h-[52px] py-3`}
                        />
                        <FieldError message={fieldError('date')} />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="time" className={LABEL_CLASS}>
                        Preferred Time *
                      </label>
                      <div className="relative">
                        <select
                          id="time"
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className={`${fieldClass('time')} min-h-[52px] py-3 pr-12 appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>Select time</option>
                          <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
                          <option value="Afternoon (12pm - 3pm)">Afternoon (12pm - 3pm)</option>
                          <option value="Late Afternoon (3pm - 6pm)">Late Afternoon (3pm - 6pm)</option>
                          <option value="Evening (6pm - 8pm)">Evening (6pm - 8pm)</option>
                          <option value="Flexible">Flexible / No preference</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-eu-green" strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <FieldError message={fieldError('time')} />
                    </div>
                  </div>

                  {/* Extras Selection (inline in form) */}
                  <div>
                    <h3 className="font-serif text-2xl md:text-[28px] text-eu-ink font-normal mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-serif italic text-lg text-eu-green">03</span>
                      Extras
                      <span className="text-eu-sage text-sm font-sans font-normal">(optional)</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {extras.map((extra) => (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={(e) => toggleExtra(extra.id, e.currentTarget)}
                          className={`min-h-[96px] p-4 rounded-[18px] border text-left transition-colors duration-300 ${
                            formData.extras.includes(extra.id)
                              ? 'border-eu-ink bg-eu-ink'
                              : 'border-[#1a260e]/20 bg-eu-cream hover:border-[#1a260e]/40'
                          }`}
                        >
                          <extra.icon strokeWidth={1.5} className={`h-5 w-5 mb-3 ${
                            formData.extras.includes(extra.id) ? 'text-eu-cream' : 'text-eu-green'
                          }`} />
                          <span className={`block text-sm leading-snug ${
                            formData.extras.includes(extra.id) ? 'text-eu-cream' : 'text-eu-ink'
                          }`}>
                            {extra.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <h3 className="font-serif text-2xl md:text-[28px] text-eu-ink font-normal mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-serif italic text-lg text-eu-green">04</span>
                      Anything Else?
                      <span className="text-eu-sage text-sm font-sans font-normal">(optional)</span>
                    </h3>
                    <textarea
                      id="message"
                      name="message"
                      aria-label="Anything else? (optional)"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your event, any special requirements, dietary needs for drinks, or anything else we should know..."
                      className={`${fieldClass('message')} py-4 leading-relaxed resize-none`}
                    />
                    <FieldError message={fieldError('message')} />
                  </div>

                  {/* Live Price Estimate */}
                  {totalPerPerson !== null && totalPerPerson > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:p-6 bg-eu-cream rounded-eu-sm border border-[#1a260e]/15">
                      <div>
                        <p className="eu-cap text-eu-sage mb-1.5">Per Person</p>
                        <p className="font-serif text-3xl text-eu-ink">
                          £{totalPerPerson}/person
                          <span className="font-sans text-sm text-eu-sage ml-2">+ instructor fee</span>
                        </p>
                      </div>
                      <div className="text-left sm:text-right text-sm text-eu-green">
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
                    disabled={sending}
                    className="eu-btn eu-btn--ink eu-btn--block disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Sending…' : 'Send Enquiry'}
                    <span className="eu-btn__dot">
                      <Send className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </button>

                  {invalidFields.length > 0 && (
                    <p role="alert" className="text-center text-[15px] text-red-800">
                      Some of your details need checking. Please correct them and try again.
                    </p>
                  )}

                  {sendError && (
                    <p role="alert" className="text-center text-[15px] leading-relaxed text-red-800">
                      Sorry, that didn&apos;t send. Please try again, or email us at{' '}
                      <a href="mailto:euforyc@gmail.com" className="inline-block py-2.5 underline underline-offset-2">euforyc@gmail.com</a>
                      {' '}or call{' '}
                      <a href="tel:+447375710370" className="inline-block py-2.5 underline underline-offset-2">+44 7375 710370</a>.
                    </p>
                  )}

                  <p className="text-center text-eu-sage text-sm">
                    You can also email us directly at{' '}
                    <a href="mailto:euforyc@gmail.com" className="inline-block py-3 text-eu-ink underline underline-offset-4 hover:text-eu-green transition-colors">
                      euforyc@gmail.com
                    </a>
                  </p>

                  <HoneypotField />
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CLOSING CTA
         ════════════════════════════════════════════════════════ */}
      <section className="relative py-[clamp(88px,10vw,150px)] overflow-hidden bg-eu-ink text-eu-cream rounded-[32px] md:rounded-eu-xl mx-[clamp(10px,1.5vw,24px)] mb-6 eu-on-dark">
        <div className="relative z-10 eu-wrap text-center">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-7">
              <h2 className="font-serif font-normal text-[clamp(42px,5.6vw,88px)] text-eu-cream leading-[1.02] tracking-[-0.025em]">
                Your next event<br />
                starts <em className="italic">here</em>
              </h2>
              <p className="text-eu-beige text-[17px] md:text-lg leading-[1.75] max-w-md mx-auto">
                Whether it&apos;s a birthday celebration, team bonding session,
                or a private pilates class with friends — we&apos;ve got the perfect space for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center items-center pt-2">
                <button
                  onClick={scrollToForm}
                  className="eu-btn eu-btn--cream w-full sm:w-auto !justify-between"
                >
                  Enquire Now
                  <span className="eu-btn__dot">
                    <Arrow />
                  </span>
                </button>
                <Link
                  href="/contact"
                  className="eu-ulink"
                >
                  Or get in touch&nbsp;→
                </Link>
              </div>

              {/* Location tag */}
              <div className="flex items-center justify-center gap-2 pt-6 text-eu-beige text-[13px]">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="tracking-[0.08em]">7-8 Holmstall Parade, Edgware, HA8 5HX</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
