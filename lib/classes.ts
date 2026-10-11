/**
 * Class types offered at Euforyc Studios.
 *
 * Each entry powers a page at /classes/[slug]. The evergreen copy lives here;
 * anything that changes week to week (formats on the timetable, instructors,
 * drop-in price, spaces per class, upcoming sessions, reviews) is read live
 * from Momence and matched to a class type by its title.
 */

export interface ClassFaq {
  question: string;
  answer: string;
}

export interface ClassType {
  slug: string;
  name: string;
  /** Short label for cards and lists */
  tagline: string;
  /** Direct, self-contained answer to "what is this class at Euforyc?" */
  summary: string;
  duration: string;
  level: string;
  /** Used when the live timetable is unavailable */
  fallbackGroupSize: string;
  fallbackDropIn: string;
  /** Which packages and memberships cover this class */
  covered: string;
  expect: string[];
  goodFor: string[];
  bring: string[];
  faqs: ClassFaq[];
  image: { src: string; alt: string; width: number; height: number };
  /** Lower-case fragments matched against Momence class titles */
  match: { include: string[]; exclude?: string[] };
}

const GROUP_COVERAGE =
  'Covered by the Try It All intro offer, the Euforyc Package and every Euforyc Membership.';
const MOVE_COVERAGE =
  'Covered by the MOVE package (4 classes £70, 8 classes £135) as well as Try It All, the Euforyc Package and every Euforyc Membership.';

// Order matters: a title is assigned to the first class type it matches.
export const CLASS_TYPES: ClassType[] = [
  {
    slug: 'private-pilates',
    name: 'Private 1:1 Pilates',
    tagline: 'One-to-one Reformer and Cadillac sessions built around you.',
    summary:
      'Private Pilates at Euforyc Studios is a 60-minute one-to-one session on the Reformer or Cadillac, planned around your goals, body and pace. It suits complete beginners, anyone returning from injury, and clients who want focused technique work with an instructor’s full attention.',
    duration: '60 minutes',
    level: 'All levels, tailored to you',
    fallbackGroupSize: 'One-to-one',
    fallbackDropIn: '£75',
    covered:
      'Single sessions are £75. Packs of 4 (£250), 8 (£490) and 12 (£700) sessions are valid for 90 days. Private sessions are not included in group packages or memberships.',
    expect: [
      'Your instructor starts by asking about your goals, experience and any injuries, then builds the session around them. Expect clear guidance, hands-on cueing and a programme that adapts as you progress.',
      'Sessions take place in the studio on a Reformer or Cadillac, in a women-only space.',
    ],
    goodFor: [
      'Learning the Reformer before joining group classes',
      'Working around an injury or a specific physical goal',
      'Pregnancy, when we recommend private sessions and require medical clearance',
      'Anyone who prefers undivided attention',
    ],
    bring: ['Grip socks', 'Comfortable, fitted workout clothes', 'Water'],
    faqs: [
      {
        question: 'How much is a private Pilates session at Euforyc Studios?',
        answer:
          'A single 60-minute private session is £75. Packs bring the price down: 4 sessions for £250, 8 for £490 and 12 for £700, each valid for 90 days.',
      },
      {
        question: 'Do I need experience before booking a private session?',
        answer:
          'No. Private sessions are the easiest way to start, because the instructor works at your level and pace from the first minute.',
      },
    ],
    image: {
      src: '/privates.jpg',
      alt: 'Pilates reformers lined up beside curtained windows in the reformer room at Euforyc Studios, Edgware',
      width: 2947,
      height: 3419,
    },
    match: { include: ['1:1', '1-1', 'private'] },
  },
  {
    slug: 'red-light-pilates',
    name: 'Red Light Hot Pilates',
    tagline: 'Infrared-heated mat Pilates on red light therapy mats.',
    summary:
      'Red Light Hot Pilates at Euforyc Studios is a 45-minute, low-impact mat Pilates class taught in infrared heat on red light therapy mats. It is a full-body flow that works core, glutes, legs and arms, with mobility and deep stretch built in, and all levels are welcome. A slower Red Light Stretch & Mobility class is also on the timetable for recovery days.',
    duration: '45 minutes',
    level: 'All levels',
    fallbackGroupSize: 'Small group',
    fallbackDropIn: '£28',
    covered: GROUP_COVERAGE,
    expect: [
      'The room is warmed with infrared heat and each client works on a red light therapy mat. Classes are controlled and Pilates-based, with a stronger burn than a standard mat class and moments of deep stretch.',
      'Protective goggles are worn under the red lights. The heat helps muscles warm up quickly, so expect to sweat.',
    ],
    goodFor: [
      'A sweatier, full-body Pilates workout that stays low impact',
      'Recovery days, with the Stretch & Mobility format',
      'Anyone curious about combining Pilates with red light therapy',
    ],
    bring: ['Your own towel (required)', 'Grip socks', 'Water'],
    faqs: [
      {
        question: 'What is Red Light Hot Pilates?',
        answer:
          'It is mat Pilates taught in an infrared-heated room while you work on a red light therapy mat. At Euforyc Studios the class lasts 45 minutes, is low impact and is open to all levels.',
      },
      {
        question: 'Is Red Light Hot Pilates suitable for beginners?',
        answer:
          'Yes. The class is taught for all levels and instructors offer modifications. If you are new to heated classes, take breaks when you need them and drink plenty of water.',
      },
      {
        question: 'What do I need to bring to a red light class?',
        answer:
          'Bring your own towel and water. Towels and grip socks can be bought at the studio if you forget.',
      },
    ],
    image: {
      src: '/redlight-new.jpg',
      alt: 'Women wearing protective goggles hold a lunge on red light therapy mats during a Red Light Hot Pilates class at Euforyc Studios',
      width: 2400,
      height: 1600,
    },
    match: { include: ['red light', 'redlight'] },
  },
  {
    slug: 'hot-pilates',
    name: 'Hot Pilates',
    tagline: 'Mat Pilates in an infrared-heated studio.',
    summary:
      'Hot Pilates at Euforyc Studios is a 45-minute mat Pilates class in an infrared-heated room, kept at around 32 to 35°C. Classes build strength with controlled movement and deep core work, and are open to all levels. Formats on the timetable include Glutes & Abs, Full Body Flow, Core & Posture and Tone & Sculpt.',
    duration: '45 minutes',
    level: 'All levels',
    fallbackGroupSize: 'Small group',
    fallbackDropIn: '£28',
    covered: GROUP_COVERAGE,
    expect: [
      'Infrared heaters warm the room to around 32 to 35°C. The heat warms muscles quickly, so movements feel deeper and you will sweat more than in a standard mat class.',
      'Each format has a focus, such as glutes and abs or core and posture, but every class keeps the control and alignment Pilates is known for.',
    ],
    goodFor: [
      'A higher-sweat workout that is still low impact',
      'Building core strength and flexibility',
      'Clients who enjoy heated classes such as hot yoga',
    ],
    bring: ['Your own towel (required)', 'Grip socks', 'Water'],
    faqs: [
      {
        question: 'How hot is Hot Pilates at Euforyc Studios?',
        answer:
          'The studio is heated with infrared panels to around 32 to 35°C. Infrared heat warms the body directly, which many people find more comfortable than hot, humid air.',
      },
      {
        question: 'Can beginners do Hot Pilates?',
        answer:
          'Yes. Hot Pilates classes at Euforyc Studios are open to all levels and instructors give modifications. Arrive hydrated and rest whenever you need to.',
      },
      {
        question: 'What should I bring to Hot Pilates?',
        answer:
          'You must bring your own towel, plus water. Towels and grip socks are available to buy at the studio.',
      },
    ],
    image: {
      src: '/hotpilates-new.jpg',
      alt: 'The infrared-heated mat studio at Euforyc Studios, with oval mats on a wooden floor, arched mirrors and ceiling-mounted heaters',
      width: 1066,
      height: 1600,
    },
    match: { include: ['hot pilates', 'hot yoga'] },
  },
  {
    slug: 'reformer-pilates',
    name: 'Reformer Pilates',
    tagline: 'Small-group classes on the reformer, from beginner to intermediate.',
    summary:
      'Reformer Pilates at Euforyc Studios is a 45-minute group class on the reformer with no more than 8 women per class. Beginner and intermediate classes run throughout the week in formats including Full Body Flow, Glutes & Abs, Core & Posture, Back & Core, Tone & Sculpt, Stretch & Mobility and Jumpboard cardio.',
    duration: '45 minutes',
    level: 'Beginner and intermediate classes',
    fallbackGroupSize: 'Up to 8 per class',
    fallbackDropIn: '£28',
    covered: GROUP_COVERAGE,
    expect: [
      'A reformer is a bed-like frame with a sliding carriage, springs, straps and a footbar. The springs add resistance or support, which makes exercises more precise than on a mat and easy to adjust to your level.',
      'Each class has a clear focus shown on the timetable. Classes labelled Beginner are the best place to start; Intermediate classes move faster and are best suited to clients who have used a reformer before.',
    ],
    goodFor: [
      'Building strength, core control and posture with low impact',
      'Beginners, in classes labelled Beginner',
      'Experienced clients, in Intermediate and Jumpboard classes',
    ],
    bring: ['Grip socks (mandatory)', 'Fitted workout clothes', 'Water'],
    faqs: [
      {
        question: 'Is Reformer Pilates at Euforyc Studios suitable for beginners?',
        answer:
          'Yes. Look for classes labelled Beginner on the timetable. Instructors explain the machine, set your springs and offer modifications, and classes are capped at 8 so you get individual attention.',
      },
      {
        question: 'How many people are in a Reformer Pilates class?',
        answer: 'Reformer classes at Euforyc Studios have a maximum of 8 people.',
      },
      {
        question: 'How much is a Reformer Pilates class in Edgware?',
        answer:
          'A single drop-in Reformer class at Euforyc Studios is £28. First-time clients can use the Try It All intro offer of 3 classes for £60, and packages start from £105 for 4 classes.',
      },
      {
        question: 'Do I need grip socks for Reformer Pilates?',
        answer:
          'Yes, grip socks are mandatory on the reformer. Bring your own or buy a pair at the studio.',
      },
    ],
    image: {
      src: '/reformer-new.jpg',
      alt: 'A client in a pike position on a Pilates reformer at Euforyc Studios, a women-only studio in Edgware',
      width: 1066,
      height: 1600,
    },
    match: { include: ['reformer'] },
  },
  {
    slug: 'sculpt',
    name: 'Tone & Sculpt',
    tagline: 'Mat Pilates with weights, bands and a Pilates ball.',
    summary:
      'Tone & Sculpt at Euforyc Studios is a 45-minute mat class that combines Pilates precision with strength training, using hand weights, resistance bands and a Pilates ball. It is a higher-energy, upbeat class and runs in Upper Body, Lower Body and Full Body formats so you can choose your focus.',
    duration: '45 minutes',
    level: 'All levels',
    fallbackGroupSize: 'Small group',
    fallbackDropIn: '£20',
    covered: MOVE_COVERAGE,
    expect: [
      'Classes mix standing sequences with mat work. Expect high repetitions, controlled pulses and light props that add resistance while keeping the core-focused, alignment-led principles of Pilates.',
      'Upper Body targets arms, shoulders, back and core. Lower Body targets glutes, thighs, hamstrings and core. Full Body works everything in one session.',
    ],
    goodFor: [
      'Toning and muscular endurance without heavy weights',
      'Clients who want a faster pace than classical mat Pilates',
      'Pairing with Reformer classes for a balanced week',
    ],
    bring: ['Grip socks', 'Water', 'Fitted workout clothes'],
    faqs: [
      {
        question: 'What is the difference between Upper Body, Lower Body and Full Body Tone & Sculpt?',
        answer:
          'All three are 45-minute mat Pilates classes with weights, bands and a Pilates ball. Upper Body focuses on arms, shoulders, back and core; Lower Body on glutes, thighs, hamstrings and core; Full Body works arms, abs, glutes and legs in one class.',
      },
      {
        question: 'How much is a Sculpt class at Euforyc Studios?',
        answer:
          'Sculpt classes are £20 as a drop-in. The MOVE package covers Sculpt and Belly Dance classes: 4 classes for £70 or 8 for £135.',
      },
    ],
    image: {
      src: '/matp.jpg',
      alt: 'The mat studio at Euforyc Studios lit in purple, with mats laid out beneath a neon sign reading Pretty and Powerful',
      width: 2716,
      height: 2969,
    },
    match: { include: ['sculpt'] },
  },
  {
    slug: 'barre',
    name: 'Barre',
    tagline: 'Ballet-inspired, low-impact strength and balance.',
    summary:
      'Barre at Euforyc Studios is a 45-minute, low-impact class that blends ballet-inspired movement with Pilates and strength training to build flexibility, balance and core strength. Barre Essentials is beginner-friendly and needs no dance experience.',
    duration: '45 minutes',
    level: 'Beginner-friendly',
    fallbackGroupSize: 'Up to 8 per class',
    fallbackDropIn: '£28',
    covered: GROUP_COVERAGE,
    expect: [
      'Classes use the ballet barre for support through small, controlled movements that work legs, glutes and core. The pace is steady and instructions are clear, so you can move at your own level.',
    ],
    goodFor: [
      'Improving balance, posture and lower-body tone',
      'Beginners and anyone new to Barre',
      'A low-impact alternative to high-intensity classes',
    ],
    bring: ['Grip socks', 'Water', 'Fitted workout clothes'],
    faqs: [
      {
        question: 'Do I need ballet or dance experience for Barre?',
        answer:
          'No. Barre Essentials at Euforyc Studios is designed for beginners. The movements are ballet-inspired, but no dance background is needed.',
      },
    ],
    image: {
      src: '/hero/IMG_8698.JPG',
      alt: 'A client extends one leg along the ballet barre in front of arched mirrors at Euforyc Studios',
      width: 3648,
      height: 5472,
    },
    match: { include: ['barre'] },
  },
  {
    slug: 'belly-dance',
    name: 'Belly Dance',
    tagline: 'Women-only belly dance classes for every level.',
    summary:
      'Belly Dance at Euforyc Studios is a women-only dance class for all levels, with no experience needed. Classes teach foundations and playful combinations that build confidence, coordination and core strength in a relaxed setting.',
    duration: '45 to 60 minutes',
    level: 'All levels, no experience needed',
    fallbackGroupSize: 'Small group',
    fallbackDropIn: 'From £15',
    covered: MOVE_COVERAGE,
    expect: [
      'Classes start with basic technique, then build short combinations to music, with space for freestyle. The atmosphere is relaxed and social, and the studio is women-only.',
    ],
    goodFor: [
      'A fun way to get cardio in without a gym workout',
      'Complete beginners',
      'Building confidence and core strength through dance',
    ],
    bring: ['Comfortable clothes you can move in', 'Water'],
    faqs: [
      {
        question: 'Are belly dance classes at Euforyc Studios women-only?',
        answer:
          'Yes. Euforyc Studios is a women-only studio, and all belly dance classes are taught in a women-only environment.',
      },
      {
        question: 'Do I need dance experience?',
        answer: 'No. Classes welcome all levels and start from the basics.',
      },
    ],
    image: {
      src: '/dance-new.jpg',
      alt: 'A belly dancer in a beaded costume leans back in a studio portrait',
      width: 1117,
      height: 1600,
    },
    match: { include: ['belly'] },
  },
  {
    slug: 'mum-and-baby-pilates',
    name: 'Mommy + Me Mat Pilates',
    tagline: 'Gentle postnatal mat Pilates with your baby beside you.',
    summary:
      'Mommy + Me Mat Pilates at Euforyc Studios is a gentle, postnatal-friendly 45-minute mat class where you bring your baby with you. It focuses on core and pelvic-floor strength with plenty of modifications, and is suitable from around 6 weeks postpartum once you have been cleared to exercise.',
    duration: '45 minutes',
    level: 'Postnatal, all levels',
    fallbackGroupSize: 'Small group',
    fallbackDropIn: '£25',
    covered: 'Booked per class as a drop-in. Ask the studio which packages apply.',
    expect: [
      'Controlled mat Pilates with a focus on core and pelvic floor, taught at a relaxed pace. You can pause whenever you need to: feeding, changing, cuddles and baby noises are all welcome.',
      'Babies are welcome from around 6 weeks until they are confidently crawling.',
    ],
    goodFor: [
      'New mums returning to exercise after birth',
      'Rebuilding core and pelvic-floor strength',
      'Meeting other local mums in a women-only space',
    ],
    bring: ['Whatever your baby needs to be comfortable', 'Grip socks', 'Water'],
    faqs: [
      {
        question: 'When can I start postnatal Pilates after giving birth?',
        answer:
          'Mommy + Me Mat Pilates at Euforyc Studios is suitable from around 6 weeks postpartum, as long as you have been cleared to exercise by your healthcare provider.',
      },
      {
        question: 'Can I bring my baby to Pilates?',
        answer:
          'Yes, in the Mommy + Me class. Babies are welcome from around 6 weeks old until they are confidently crawling, and you can stop to feed or settle them at any point.',
      },
    ],
    image: {
      src: '/hotpilates-new.jpg',
      alt: 'The mat studio at Euforyc Studios with oval mats, white curtains and arched mirrors',
      width: 1066,
      height: 1600,
    },
    match: { include: ['mommy', 'mummy', 'mum +', 'mum and baby', 'postnatal'] },
  },
  {
    slug: 'guided-journaling',
    name: 'Guided Journaling & Women’s Circle',
    tagline: 'Slow evenings of reflection, journaling and sisterhood.',
    summary:
      'Guided Journaling and Women’s Circle are quiet, women-only sessions at Euforyc Studios built around reflection rather than exercise. Guided Journaling uses thoughtful prompts to help you clear your mind and set intentions; Women’s Circle is a longer workshop of reflection, remembrance and sisterhood. No experience is needed.',
    duration: '45 minutes for Guided Journaling',
    level: 'Open to all',
    fallbackGroupSize: 'Up to 15 spaces',
    fallbackDropIn: 'From £18',
    covered: 'Guided Journaling is £18 per session and Women’s Circle is £25 per circle.',
    expect: [
      'Sessions are led in a calm setting with prompts and gentle spiritual reflection. Sharing is always optional.',
    ],
    goodFor: [
      'Slowing down after a busy week',
      'Setting intentions or working through thoughts on paper',
      'Meeting other women in a gentle, supportive space',
    ],
    bring: ['A notebook and pen if you have a favourite', 'An open mind'],
    faqs: [
      {
        question: 'Do I need journaling experience?',
        answer: 'No. Sessions are guided with prompts, so you only need to bring yourself.',
      },
    ],
    image: {
      src: '/og/euforyc-studios-shopfront-edgware.jpg',
      alt: 'The Euforyc Studios shopfront on Holmstall Avenue in Edgware, with the cafe seating outside',
      width: 1200,
      height: 630,
    },
    match: { include: ['journal', 'circle'] },
  },
];

/** Display order for the classes index and navigation */
export const CLASS_ORDER = [
  'reformer-pilates',
  'hot-pilates',
  'red-light-pilates',
  'sculpt',
  'barre',
  'belly-dance',
  'mum-and-baby-pilates',
  'private-pilates',
  'guided-journaling',
];

export const ORDERED_CLASS_TYPES: ClassType[] = CLASS_ORDER.map(
  (slug) => CLASS_TYPES.find((c) => c.slug === slug)!
);

export function getClassType(slug: string): ClassType | undefined {
  return CLASS_TYPES.find((c) => c.slug === slug);
}

/** Finds the class type a Momence class title belongs to */
export function classTypeForTitle(title: string): ClassType | undefined {
  const lower = title.toLowerCase();
  return CLASS_TYPES.find(
    (c) =>
      c.match.include.some((fragment) => lower.includes(fragment)) &&
      !(c.match.exclude || []).some((fragment) => lower.includes(fragment))
  );
}
