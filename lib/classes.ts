/**
 * Class types offered at Euforyc Studios.
 *
 * Each entry powers a page at /classes/[slug]. The evergreen copy, class size
 * and price live here; what changes week to week (formats on the timetable,
 * instructors, upcoming sessions, reviews) is read live from Momence and
 * matched to a class type by its title.
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
  groupSize: string;
  /** Price of a single class in pounds, from the studio price list */
  price: number;
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
const PRIVATE_COVERAGE =
  'Single sessions are £75. Packs of 4 (£250), 8 (£490) and 12 (£700) sessions are valid for 90 days. Private sessions are not included in group packages or memberships.';

const PRIVATE_SESSION_IMAGE = {
  src: '/privates.jpg',
  alt: 'Pilates reformers lined up beside curtained windows in the reformer room at Euforyc Studios, Edgware',
  width: 2947,
  height: 3419,
};

// Order matters: a title is assigned to the first class type it matches.
export const CLASS_TYPES: ClassType[] = [
  {
    slug: 'private-cadillac-reformer-pilates',
    name: '1:1 Private Cadillac Reformer Pilates',
    tagline: 'One-to-one sessions on the Cadillac Reformer.',
    summary:
      '1:1 Private Cadillac Reformer Pilates at Euforyc Studios is a 60-minute one-to-one session on the Cadillac Reformer, which combines a reformer with an overhead frame for spring, bar and strap work. Each session is planned around your goals, body and pace.',
    duration: '60 minutes',
    level: 'All levels, tailored to you',
    groupSize: 'One-to-one',
    price: 75,
    covered: PRIVATE_COVERAGE,
    expect: [
      'Your instructor starts by asking about your goals, experience and any injuries, then builds the session around them. Expect clear guidance and a programme that adapts as you progress.',
      'Sessions take place in the studio, in a women-only space.',
    ],
    goodFor: [
      'Working around an injury or a specific physical goal',
      'Clients who want variety beyond the standard reformer',
      'Anyone who prefers undivided attention',
    ],
    bring: ['Grip socks (mandatory)', 'Comfortable, fitted workout clothes', 'Water'],
    faqs: [
      {
        question: 'How much is a 1:1 Private Cadillac Reformer Pilates session?',
        answer:
          'A single 60-minute session is £75. Packs bring the price down: 4 sessions for £250, 8 for £490 and 12 for £700, each valid for 90 days.',
      },
    ],
    image: PRIVATE_SESSION_IMAGE,
    match: { include: ['cadillac'] },
  },
  {
    slug: 'private-reformer-pilates',
    name: '1:1 Private Reformer Pilates',
    tagline: 'One-to-one Reformer sessions built around you.',
    summary:
      '1:1 Private Reformer Pilates at Euforyc Studios is a 60-minute one-to-one session on the reformer, planned around your goals, body and pace. It suits complete beginners, anyone returning from injury, and clients who want focused technique work with an instructor’s full attention.',
    duration: '60 minutes',
    level: 'All levels, tailored to you',
    groupSize: 'One-to-one',
    price: 75,
    covered: PRIVATE_COVERAGE,
    expect: [
      'Your instructor starts by asking about your goals, experience and any injuries, then builds the session around them. Expect clear guidance, hands-on cueing and a programme that adapts as you progress.',
      'Sessions take place in the studio, in a women-only space.',
    ],
    goodFor: [
      'Learning the reformer before joining group classes',
      'Working around an injury or a specific physical goal',
      'Pregnancy, when we recommend private sessions and require medical clearance',
      'Anyone who prefers undivided attention',
    ],
    bring: ['Grip socks (mandatory)', 'Comfortable, fitted workout clothes', 'Water'],
    faqs: [
      {
        question: 'How much is a 1:1 Private Reformer Pilates session?',
        answer:
          'A single 60-minute session is £75. Packs bring the price down: 4 sessions for £250, 8 for £490 and 12 for £700, each valid for 90 days.',
      },
      {
        question: 'Do I need experience before booking a private session?',
        answer:
          'No. Private sessions are the easiest way to start, because the instructor works at your level and pace from the first minute.',
      },
    ],
    image: PRIVATE_SESSION_IMAGE,
    match: { include: ['1:1', '1-1', 'private'] },
  },
  {
    slug: 'red-light-hot-mat-pilates',
    name: 'Red Light Hot Mat Pilates',
    tagline: 'Heated mat Pilates on red light therapy mats.',
    summary:
      'Red Light Hot Mat Pilates at Euforyc Studios is a 45-minute, low-impact mat Pilates class taught in infrared heat on red light therapy mats. It is a full-body flow that works core, glutes, legs and arms, with mobility and deep stretch built in. All levels are welcome, with no more than 6 women per class.',
    duration: '45 minutes',
    level: 'All levels',
    groupSize: 'Up to 6 per class',
    price: 28,
    covered: GROUP_COVERAGE,
    expect: [
      'The room is warmed with infrared heat and each client works on a red light therapy mat. Classes are controlled and Pilates-based, with a stronger burn and moments of deep stretch.',
      'Protective goggles are worn under the red lights. The heat helps muscles warm up quickly, so expect to sweat.',
    ],
    goodFor: [
      'A sweatier, full-body Pilates workout that stays low impact',
      'Anyone curious about combining Pilates with red light therapy',
    ],
    bring: ['Your own towel (required)', 'Water', 'Comfortable, fitted workout clothes'],
    faqs: [
      {
        question: 'What is Red Light Hot Mat Pilates?',
        answer:
          'It is mat Pilates taught in an infrared-heated room while you work on a red light therapy mat. At Euforyc Studios the class lasts 45 minutes, is low impact and is open to all levels.',
      },
      {
        question: 'Is Red Light Hot Mat Pilates suitable for beginners?',
        answer:
          'Yes. The class is taught for all levels and instructors offer modifications. If you are new to heated classes, take breaks when you need them and drink plenty of water.',
      },
      {
        question: 'What do I need to bring to a red light class?',
        answer: 'Bring your own towel and water. Towels can be bought at the studio if you forget.',
      },
    ],
    image: {
      src: '/redlight-new.jpg',
      alt: 'Women wearing protective goggles hold a lunge on red light therapy mats during a Red Light Hot Mat Pilates class at Euforyc Studios',
      width: 2400,
      height: 1600,
    },
    // Red Light Stretch & Mobility is a separate recovery class, not this one
    match: { include: ['red light', 'redlight'], exclude: ['stretch'] },
  },
  {
    slug: 'hot-pilates',
    name: 'Hot Pilates',
    tagline: 'Pilates in an infrared-heated studio.',
    summary:
      'Hot Pilates at Euforyc Studios is a 45-minute Pilates class in an infrared-heated studio kept at around 32 to 35°C. Classes build strength with controlled movement and deep core work, are open to all levels, and have no more than 6 women per class.',
    duration: '45 minutes',
    level: 'All levels',
    groupSize: 'Up to 6 per class',
    price: 28,
    covered: GROUP_COVERAGE,
    expect: [
      'Infrared heaters warm the room to around 32 to 35°C. The heat warms muscles quickly, so movements feel deeper and you will sweat more than in an unheated class.',
      'Each class has a focus shown on the timetable, such as glutes and abs or core and posture, but every class keeps the control and alignment Pilates is known for.',
    ],
    goodFor: [
      'A higher-sweat workout that is still low impact',
      'Building core strength and flexibility',
      'Clients who enjoy heated classes such as hot yoga',
    ],
    bring: ['Your own towel (required)', 'Water', 'Comfortable, fitted workout clothes'],
    faqs: [
      {
        question: 'How hot is Hot Pilates at Euforyc Studios?',
        answer:
          'The studio is heated with infrared panels to around 32 to 35°C. Infrared heat warms the body directly, which many people find more comfortable than hot, humid air.',
      },
      {
        question: 'How many people are in a Hot Pilates class?',
        answer: 'Hot Pilates classes at Euforyc Studios have a maximum of 6 people.',
      },
      {
        question: 'Can beginners do Hot Pilates?',
        answer:
          'Yes. Hot Pilates classes at Euforyc Studios are open to all levels and instructors give modifications. Arrive hydrated and rest whenever you need to.',
      },
      {
        question: 'What should I bring to Hot Pilates?',
        answer: 'You must bring your own towel, plus water. Towels can be bought at the studio if you forget.',
      },
    ],
    image: {
      src: '/hotpilates-new.jpg',
      alt: 'The infrared-heated studio at Euforyc Studios, with oval mats on a wooden floor, arched mirrors and ceiling-mounted heaters',
      width: 1066,
      height: 1600,
    },
    match: { include: ['hot pilates'] },
  },
  {
    slug: 'sculpt-mat-pilates',
    name: 'Sculpt Mat Pilates',
    tagline: 'Equipment-based Pilates with weights, rings, balls and bands.',
    summary:
      'Sculpt Mat Pilates at Euforyc Studios is a 45-minute, equipment-based class that uses hand weights, Pilates rings, balls, blocks and resistance bands to strengthen and tone the whole body. Expect controlled movements, high repetitions and targeted pulses set to music, with no more than 6 women per class.',
    duration: '45 minutes',
    level: 'All levels',
    groupSize: 'Up to 6 per class',
    price: 20,
    covered: MOVE_COVERAGE,
    expect: [
      'Classes combine controlled Pilates movement with high repetitions and targeted pulses. Props add resistance and challenge your balance and endurance: hand weights, Pilates rings, balls, blocks and resistance bands.',
      'Sessions move to the rhythm of the music in an upbeat atmosphere, finishing with the signature Pilates burn.',
    ],
    goodFor: [
      'Toning and muscular endurance without heavy weights',
      'Clients who like an upbeat class set to music',
      'Pairing with Reformer classes for a balanced week',
    ],
    bring: ['Water', 'Comfortable, fitted workout clothes'],
    faqs: [
      {
        question: 'How much is a Sculpt Mat Pilates class at Euforyc Studios?',
        answer:
          'A single Sculpt Mat Pilates class is £20. The MOVE package covers Sculpt Mat Pilates and Belly Dance: 4 classes for £70 or 8 for £135.',
      },
      {
        question: 'What equipment is used in Sculpt Mat Pilates?',
        answer:
          'Hand weights, Pilates rings, balls, blocks and resistance bands, all provided by the studio.',
      },
    ],
    image: {
      src: '/matp.jpg',
      alt: 'The studio at Euforyc Studios lit in purple, with mats laid out beneath a neon sign reading Pretty and Powerful',
      width: 2716,
      height: 2969,
    },
    // Reformer and Hot Pilates formats can also carry "Tone & Sculpt" in their titles
    match: { include: ['sculpt'], exclude: ['reformer', 'hot'] },
  },
  {
    slug: 'reformer-pilates',
    name: 'Reformer Pilates',
    tagline: 'Small-group classes on the reformer, from beginner to intermediate.',
    summary:
      'Reformer Pilates at Euforyc Studios is a 45-minute group class on the reformer with no more than 8 women per class. Beginner and intermediate classes run throughout the week, each with its own focus shown on the timetable.',
    duration: '45 minutes',
    level: 'Beginner and intermediate classes',
    groupSize: 'Up to 8 per class',
    price: 28,
    covered: GROUP_COVERAGE,
    expect: [
      'A reformer is a bed-like frame with a sliding carriage, springs, straps and a footbar. The springs add resistance or support, which makes exercises more precise than on a mat and easy to adjust to your level.',
      'Classes labelled Beginner are the best place to start; Intermediate classes move faster and are best suited to clients who have used a reformer before.',
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
    // "Intermediate Cardio & Strength (Jumpboard)" has no "Reformer" in its title
    match: { include: ['reformer', 'jumpboard'] },
  },
  {
    slug: 'belly-dance',
    name: 'Belly Dance',
    tagline: 'Women-only belly dance classes for every level.',
    summary:
      'Belly Dance at Euforyc Studios is a women-only dance class for all levels, with no experience needed. Classes teach the foundations and playful combinations that build confidence, coordination and core strength, set to upbeat music.',
    duration: '45 to 60 minutes',
    level: 'All levels, no experience needed',
    groupSize: 'Up to 8 per class',
    price: 20,
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
        question: 'How much is a Belly Dance class at Euforyc Studios?',
        answer:
          'A single Belly Dance class is £20. The MOVE package covers Belly Dance and Sculpt Mat Pilates: 4 classes for £70 or 8 for £135.',
      },
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
];

/** Display order for the classes index and lists */
export const CLASS_ORDER = [
  'reformer-pilates',
  'hot-pilates',
  'red-light-hot-mat-pilates',
  'sculpt-mat-pilates',
  'belly-dance',
  'private-reformer-pilates',
  'private-cadillac-reformer-pilates',
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
