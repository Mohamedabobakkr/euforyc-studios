'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  MapPin,
  Timer,
  Flame,
  Sun,
  Heart,
  MessageCircle,
  Sparkles,
  Star,
  Shield,
  Dumbbell,
  CalendarDays,
  ChevronDown,
} from 'lucide-react';

// ─── Countdown Hook ───────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// ─── Intersection Observer Hook ───────────────────────────────
function useInView(threshold = 0.15) {
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

// ─── Animated Section Wrapper ─────────────────────────────────
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── FAQ Accordion Item ───────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1a260e]/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
      >
        <h3 className="font-serif text-lg md:text-xl font-light text-[#1a260e] pr-6">{q}</h3>
        <ChevronDown
          className={`h-5 w-5 text-[#1a260e]/40 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? '200px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-[#1a260e]/70 pb-5 md:pb-6 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── Spots Counter ────────────────────────────────────────────
const TOTAL_SPOTS = 15;
const SPOTS_TAKEN = 7; // Update this as spots fill

// ─── Challenge Start Date ─────────────────────────────────────
const CHALLENGE_START = new Date(2026, 2, 10); // March 10 2026
const CHALLENGE_END = new Date(2026, 5, 30); // June 30 2026
const ENROLLMENT_DEADLINE = new Date(2026, 2, 31, 23, 59, 59); // End of March

// ─── Booking URL (replace with actual link) ───────────────────
const BOOKING_URL = 'https://momence.com/m/692759';

// ─── Offer Details ────────────────────────────────────────────
const CHALLENGE_PRICE = '£750';
const REGULAR_PRICE = '£1,100';
const SAVINGS = '£350';

// ─── Class Types ─────────────────────────────────────────────
const classTypes = ['Reformer Pilates', 'Hot Pilates', 'Red Light Pilates', 'Barre', 'Dance'];

// ─── What's Included ─────────────────────────────────────────
const included = [
  { icon: Sparkles, title: 'All-Access Classes', desc: '3 sessions per week — choose any class Euforyc offers: Reformer, Hot Pilates, Red Light, Barre, or Dance' },
  { icon: CalendarDays, title: '3 Months, 3x a Week', desc: 'March to June — a structured programme with progressive milestones to keep you on track' },
  { icon: MessageCircle, title: 'Private Group Chat', desc: 'Exclusive accountability group to keep you motivated and connected throughout the challenge' },
  { icon: Heart, title: 'Supportive Community', desc: 'Train alongside a small group of like-minded women all working toward the same goal' },
  { icon: Sun, title: 'Confidence & Discipline', desc: 'Build real habits, body confidence, and a mindset that carries you beyond the challenge' },
  { icon: Star, title: 'Real Results', desc: 'No extremes — sustainable movement, discipline & visible transformation by summer' },
  { icon: Dumbbell, title: 'Free 1-to-1 Posture Analysis', desc: 'A personalised assessment plus a full breakdown of Pilates principles — so we can tailor a programme to your goals' },
  { icon: Heart, title: 'Free Matcha Every Week', desc: 'Enjoy a complimentary matcha from our Sips bar once a week — because looking after your body should feel like a treat' },
];

// ─── Timeline ─────────────────────────────────────────────────
const timeline = [
  { month: 'March', title: 'Foundation', desc: 'Build your base — form, consistency & new habits. This is where the magic starts.' },
  { month: 'April', title: 'Momentum', desc: 'Push further — strength increases, confidence grows, you start seeing changes.' },
  { month: 'May–June', title: 'Transformation', desc: 'Bring it home — toned, strong, confident, and summer-ready.' },
];

// ─── FAQ Data ─────────────────────────────────────────────────
const faqs = [
  { q: 'I haven\'t worked out in ages — is this for me?', a: 'Absolutely. This challenge is designed to meet you where you are. Whether you\'re restarting or stepping into fitness for the first time, our instructors will guide every movement. No judgement, just support.' },
  { q: 'What types of classes are included?', a: 'Everything — Reformer Pilates, Hot Pilates, Red Light Pilates, Barre, and Dance classes. You pick whatever you want each week. The variety keeps things exciting and targets your body from every angle.' },
  { q: 'How does the group chat work?', a: 'Once you join, we\'ll add you to our private WhatsApp group. Expect weekly check-ins, motivation, tips, and real accountability from your fellow challengers and our team.' },
  { q: 'What if I miss a week?', a: 'Life happens! This isn\'t about perfection — it\'s about consistency. The group and our team will help you stay on track, and sessions are flexible to fit your schedule.' },
  { q: 'Can I join with a friend?', a: 'Yes! In fact, we encourage it. Having a gym partner massively boosts accountability. Just make sure she signs up too — remember, only 15 spots.' },
];

// ─── Main Page ────────────────────────────────────────────────
export default function SummerChallengePage() {
  const spotsLeft = TOTAL_SPOTS - SPOTS_TAKEN;
  const enrollmentDeadline = useMemo(() => ENROLLMENT_DEADLINE, []);
  const timeLeft = useCountdown(enrollmentDeadline);

  return (
    <div className="pt-24 pb-24 md:pb-0 bg-[#fffcf2]">

      {/* ════════════════════════════════════════════════════════
          HERO
         ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0">
          {/* Base gradient — warm sunset meets dark green */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a260e] via-[#1e2f12] to-[#2a1f0e]" />

          {/* Warm glow overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,183,77,0.12)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,138,101,0.08)_0%,_transparent_50%)]" />

          {/* Subtle grain */}
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          {/* Decorative circles */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-[#fffcf2]/[0.04]" />
          <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full border border-[#fffcf2]/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#fffcf2]/[0.02]" />
        </div>

        <div className="relative z-10 container-width text-center px-6">
          {/* Urgency countdown badge */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-amber-500/15 backdrop-blur-sm border border-amber-400/25 rounded-full px-3 py-1.5 md:px-5 md:py-2">
                <Timer className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-400" />
                <span className="text-xs md:text-sm text-amber-300 tracking-wider font-medium">
                  ENROLLMENT CLOSES: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                </span>
              </div>

              <div className="inline-flex items-center gap-2 bg-rose-500/15 backdrop-blur-sm border border-rose-400/25 rounded-full px-3 py-1.5 md:px-5 md:py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
                </span>
                <span className="text-xs md:text-sm text-rose-300 tracking-wider font-medium">
                  ONLY {spotsLeft} SPOTS LEFT
                </span>
              </div>
            </div>
          </Reveal>

          {/* Main headline */}
          <Reveal delay={0.1}>
            <p className="text-[#fffcf2]/50 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-5 font-light">
              Starts 10th March &nbsp;·&nbsp; Euforyc Studios
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="font-serif text-[2.8rem] leading-[1.05] md:text-6xl lg:text-8xl text-[#fffcf2] tracking-wide mb-5 md:mb-7">
              Summer Body<br />
              <span className="italic bg-gradient-to-r from-amber-200 via-orange-200 to-rose-200 bg-clip-text text-transparent">
                Challenge
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-[#fffcf2]/75 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-10 font-light leading-relaxed">
              3 classes a week, any class you want, for 3 months — Reformer Pilates, Hot Pilates,
              Red Light, Barre, Dance & more. Get toned, feel confident, and look your best by summer.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={BOOKING_URL}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-400 text-[#1a260e] px-8 md:px-10 py-4 md:py-5 font-sans text-sm tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(251,191,36,0.3)] rounded-sm"
              >
                JOIN THE CHALLENGE
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#whats-included"
                className="text-[#fffcf2]/60 text-sm tracking-wider hover:text-[#fffcf2] transition-colors"
              >
                See what&apos;s included →
              </a>
            </div>
          </Reveal>

          {/* Trust row */}
          <Reveal delay={0.35}>
            <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-[#fffcf2]/[0.08]">
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[#fffcf2]/45 text-xs md:text-sm">
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  <span>Only 15 Women</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Edgware, London</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>3 Months</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  <span>All Levels Welcome</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#fffcf2]/30">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#fffcf2]/30 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE PITCH — Emotional storytelling section
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="tagline text-[#1a260e]/50 mb-5">THIS IS YOUR SIGN</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.75rem] text-[#1a260e] font-light leading-[1.2] mb-6 md:mb-8">
                For the girls who&apos;ve been saying<br />
                <span className="italic">&ldquo;I want to get back into it&rdquo;</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5 text-[#1a260e]/70 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
                <p>
                  You know that feeling — you want to feel good in your body again, you want to
                  be consistent, you just need <em>something</em> to keep you on track. That&apos;s
                  exactly what this is.
                </p>
                <p>
                  For 3 months, you&apos;ll train 3 times a week — choosing any class Euforyc offers.
                  Reformer Pilates, Hot Pilates, Red Light, Barre, Dance — it&apos;s your all-access pass
                  to get toned, build strength, and become the best version of yourself.
                </p>
                <p className="text-[#1a260e]/90 font-normal">
                  No pressure. No extremes. Just a supportive space to help you stay on track
                  and actually transform how you feel in your body.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 md:mt-10 inline-flex items-center gap-3 bg-[#1a260e]/[0.04] rounded-full px-5 py-2.5">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-[#1a260e]/60 tracking-wide">
                  If you&apos;ve been waiting for the perfect time — <strong className="text-[#1a260e] font-medium">this is it</strong>.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WHAT'S INCLUDED
         ════════════════════════════════════════════════════════ */}
      <section id="whats-included" className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-16">
              <p className="text-[#fffcf2]/40 text-xs tracking-[0.3em] uppercase mb-4">EVERYTHING YOU GET</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light">
                What&apos;s Inside the <span className="italic">Challenge</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="group relative p-6 md:p-7 rounded-2xl border border-[#fffcf2]/[0.07] bg-[#fffcf2]/[0.03] hover:bg-[#fffcf2]/[0.06] transition-all duration-500 h-full">
                  {/* Warm glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.04)_0%,_transparent_70%)]" />

                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400/15 to-orange-400/10 flex items-center justify-center mb-4">
                      <item.icon className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="font-serif text-lg md:text-xl font-light mb-2">{item.title}</h3>
                    <p className="text-sm text-[#fffcf2]/55 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PRICING / OFFER CARD
         ════════════════════════════════════════════════════════ */}
      <section id="offer" className="py-12 md:py-20 bg-[#fffcf2]">
        <div className="container-width px-6">
          <Reveal>
            <div className="text-center mb-8 md:mb-12">
              <p className="tagline text-[#1a260e]/50 mb-4">THE OFFER</p>
              <h2 className="heading-secondary">
                Your All-Access <span className="italic">Summer Pass</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="max-w-2xl mx-auto">
              <a
                href={BOOKING_URL}
                className="group block relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Card background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e] via-[#1e2f12] to-[#2a1f0e]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.1)_0%,_transparent_60%)]" />

                <div className="relative p-7 md:p-10">
                  {/* Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-amber-400/15 rounded-full px-3 py-1 mb-4">
                        <Flame className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-xs text-amber-300 tracking-wider font-medium">SAVE {SAVINGS}</span>
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl text-[#fffcf2] font-light">
                        Summer Body Challenge
                      </h3>
                      <p className="text-sm text-[#fffcf2]/55 mt-1">3x per week &nbsp;·&nbsp; Any class &nbsp;·&nbsp; 3 months</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-2 justify-end">
                        <span className="font-serif text-4xl md:text-5xl text-[#fffcf2] font-light">{CHALLENGE_PRICE}</span>
                      </div>
                      <p className="text-sm text-[#fffcf2]/40 mt-1">
                        <span className="line-through">{REGULAR_PRICE}</span>
                      </p>
                    </div>
                  </div>

                  {/* Class types */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {classTypes.map((cls) => (
                      <span key={cls} className="px-3 py-1.5 rounded-full border border-[#fffcf2]/10 text-xs text-[#fffcf2]/70 tracking-wide">
                        {cls}
                      </span>
                    ))}
                  </div>

                  {/* What you get */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7 pt-6 border-t border-[#fffcf2]/10">
                    {[
                      '3 classes every week for 3 months',
                      'Access to ALL class types at Euforyc',
                      'Private WhatsApp accountability group',
                      'Flexible scheduling — book any session',
                      'Small group of 15 women max',
                      'Free 1-to-1 posture analysis included',
                      'Free matcha every week from our Sips bar',
                      'Pay once, commit fully, transform',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#fffcf2]/80">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-orange-400 text-[#1a260e] py-5 px-8 rounded-xl font-semibold text-base tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(251,191,36,0.25)] group-hover:scale-[1.02]">
                    <span>Join the Challenge — {CHALLENGE_PRICE}</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>

                  <p className="text-center text-xs text-[#fffcf2]/35 mt-3">
                    One-time payment &nbsp;·&nbsp; {spotsLeft} spots remaining &nbsp;·&nbsp; Starts March 2026
                  </p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3-MONTH TIMELINE
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <Reveal>
            <div className="text-center mb-10 md:mb-16">
              <p className="tagline text-[#1a260e]/50 mb-4">YOUR JOURNEY</p>
              <h2 className="heading-secondary">
                3 Months to a <span className="italic">Stronger You</span>
              </h2>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[23px] md:left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-400/40 via-orange-400/30 to-rose-400/20" />

              <div className="space-y-8 md:space-y-12">
                {timeline.map((phase, i) => (
                  <Reveal key={phase.month} delay={i * 0.08}>
                    <div className="flex gap-5 md:gap-7">
                      {/* Dot */}
                      <div className="relative flex-shrink-0">
                        <div className="w-[47px] h-[47px] md:w-[55px] md:h-[55px] rounded-full border-2 border-amber-400/30 flex items-center justify-center bg-[#fffcf2]">
                          <span className="text-xs font-semibold text-amber-600 tracking-wider">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="pt-1 md:pt-2">
                        <p className="text-xs tracking-[0.2em] uppercase text-amber-600/80 mb-1">{phase.month}</p>
                        <h3 className="font-serif text-xl md:text-2xl font-light text-[#1a260e] mb-2">{phase.title}</h3>
                        <p className="text-sm text-[#1a260e]/65 leading-relaxed">{phase.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SPOTS / SCARCITY SECTION
         ════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-[#fffcf2]">
        <div className="container-width px-6">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden">
                {/* Warm gradient bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50/60" />
                <div className="absolute inset-0 border border-amber-200/40 rounded-2xl" />

                <div className="relative p-7 md:p-10 text-center">
                  <div className="inline-flex items-center gap-2 bg-amber-500/10 rounded-full px-4 py-1.5 mb-5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </span>
                    <span className="text-xs tracking-wider text-amber-700 font-medium">LIMITED ENROLLMENT</span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl text-[#1a260e] font-light mb-3">
                    Only <span className="font-normal">{spotsLeft}</span> of {TOTAL_SPOTS} spots remaining
                  </h3>

                  <p className="text-sm text-[#1a260e]/60 mb-6 max-w-md mx-auto">
                    We&apos;re keeping this intimate — a small group so everyone gets real attention,
                    real accountability, and real results.
                  </p>

                  {/* Visual spots indicator */}
                  <div className="flex justify-center gap-1.5 mb-7">
                    {Array.from({ length: TOTAL_SPOTS }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-500 ${
                          i < SPOTS_TAKEN
                            ? 'bg-[#1a260e] scale-100'
                            : 'bg-[#1a260e]/10 scale-90'
                        }`}
                      />
                    ))}
                  </div>

                  <a
                    href={BOOKING_URL}
                    className="group inline-flex items-center gap-3 bg-[#1a260e] text-[#fffcf2] px-8 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-sm"
                  >
                    SECURE YOUR SPOT
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THIS IS FOR YOU IF…
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* For you */}
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4.5 w-4.5 text-green-600" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-[#1a260e]">This is for you if&hellip;</h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    'You want to feel stronger and more toned by summer',
                    'You\'ve been wanting to get back into fitness',
                    'You need accountability to stay consistent',
                    'You love Pilates or want to try it',
                    'You want a supportive women-only space',
                    'You\'re ready to commit to 3 months of growth',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#1a260e]/75">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Not for you */}
            <Reveal delay={0.08}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-[#1a260e]/5 flex items-center justify-center">
                    <Sparkles className="h-4.5 w-4.5 text-[#1a260e]/50" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-[#1a260e]">What this isn&apos;t&hellip;</h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    'Not a crash diet or extreme fitness programme',
                    'Not about perfection — it\'s about progress',
                    'No judgement, no pressure, no toxic culture',
                    'Not a solo journey — you\'ll have a whole team',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-4 h-px bg-[#1a260e]/20 mt-2.5 flex-shrink-0" />
                      <span className="text-sm text-[#1a260e]/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ
         ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="heading-secondary">Common Questions</h2>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-center mt-8 md:mt-12">
                <p className="text-sm text-[#1a260e]/50 mb-4">Still have questions?</p>
                <Link href="/contact" className="btn-minimal">
                  GET IN TOUCH
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FINAL CTA
         ════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark gradient bg with warm accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a260e] via-[#1e2f12] to-[#2a1f0e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(251,191,36,0.08)_0%,_transparent_60%)]" />

        <div className="relative z-10 container-width text-center px-6">
          <Reveal>
            <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
              {/* Urgency */}
              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/25 rounded-full px-4 py-2">
                <Timer className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-amber-300 font-medium">
                  {timeLeft.days > 0
                    ? `Only ${timeLeft.days} days left to join`
                    : 'Last chance — enrollment closing soon'}
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#fffcf2] font-light leading-tight">
                Give yourself the<br />
                <span className="italic bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  push you deserve
                </span>
              </h2>

              <p className="text-[#fffcf2]/65 text-sm md:text-base max-w-lg mx-auto">
                {CHALLENGE_PRICE} for 3 months of all-access classes, 3x a week. Normally {REGULAR_PRICE}.
                Join {TOTAL_SPOTS} women this March — you don&apos;t want to miss this.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <a
                  href={BOOKING_URL}
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-400 text-[#1a260e] px-8 md:px-10 py-4 md:py-5 font-sans text-sm tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(251,191,36,0.3)] rounded-sm"
                >
                  JOIN THE SUMMER BODY CHALLENGE
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <p className="text-[#fffcf2]/35 text-xs tracking-wider">
                {spotsLeft} of {TOTAL_SPOTS} spots remaining &nbsp;·&nbsp; Starts {CHALLENGE_START.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STICKY MOBILE CTA
         ════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fffcf2]/95 backdrop-blur-md border-t border-[#1a260e]/10 md:hidden z-50">
        <a
          href={BOOKING_URL}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-[#1a260e] w-full py-4 text-sm tracking-[0.1em] uppercase rounded-lg active:scale-[0.98] transition-transform font-semibold"
        >
          JOIN NOW — {CHALLENGE_PRICE} ({spotsLeft} SPOTS LEFT)
          <Flame className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
