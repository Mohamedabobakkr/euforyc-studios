/**
 * Frequently asked questions — the single source for both the visible FAQ
 * page and its structured data, so the two can never disagree.
 */
import { POLICIES, STUDIO } from './site';

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'Is Euforyc Studios women-only?',
    answer: `Yes. ${POLICIES.womenOnly}`,
  },
  {
    question: 'Where is Euforyc Studios and what is the nearest station?',
    answer: `We are at ${STUDIO.addressLine}. The nearest Underground station is ${STUDIO.transport.nearestStation}. ${STUDIO.transport.otherStations}. Bus routes ${STUDIO.transport.buses.join(', ')} stop nearby.`,
  },
  {
    question: 'How much do classes cost?',
    answer:
      'Drop-in group classes are £28, and Sculpt and Belly Dance classes are £20. First-time clients can buy Try It All: 3 classes for £60. The Euforyc Package is £105 for 4 classes, £190 for 8, £270 for 12, or £320 for 30 Days Unlimited. Memberships start at £90 a month for 4 classes, and private 1:1 sessions are £75.',
  },
  {
    question: 'What is reformer pilates and how is it different from mat pilates?',
    answer:
      'Reformer pilates uses a specialized piece of equipment called a reformer, which has springs, pulleys, and a moving carriage. This provides resistance and support, making exercises more challenging and offering greater variety than traditional mat pilates. The reformer allows for precise movement control and can accommodate all fitness levels.',
  },
  {
    question: 'Do you offer pilates classes for beginners in London?',
    answer:
      'Yes! We welcome beginners to our pilates studio in Edgware, London. Our expert instructors provide modifications for all exercises and offer guidance throughout each class. On the Reformer, look for classes labelled Beginner. We recommend starting with our Try It All intro offer (3 classes for £60, usable across all our group classes) to get familiar with our studio and teaching style.',
  },
  {
    question: "What's the difference between Try It All, the Euforyc Package, and memberships? Which one is best for me?",
    answer:
      "Try It All (3 classes for £60, first-time clients only, valid for 20 days from your first class) is perfect for first-timers to experience our studio and teaching style across all our group classes. The Euforyc Package (4, 8 or 12 classes from £105, or 30 Days Unlimited for £320) is a flexible pay-as-you-go option with no contract, usable across all group classes and valid for 30 days from your first class (not purchase date), ideal for occasional practice or trying different class types. We also offer MOVE (4 classes £70 or 8 classes £135) for Sculpt and Belly Dance classes, valid 30 days from your first class. The Euforyc Membership has a 6-month minimum term (then rolling monthly) and offers the best value, with credits that work across our whole group timetable. Which is best for you? It depends on your goals and schedule - if you're new, start with Try It All. If you plan to attend regularly (2+ times per week), a membership offers the best value. For occasional practice or flexibility, packages are your best choice.",
  },
  {
    question: 'What should I wear to pilates classes?',
    answer: `Wear comfortable, stretchy clothing that allows for full range of movement. Avoid loose clothing that might get caught in equipment. We recommend leggings and a fitted top. ${POLICIES.gripSocks} ${POLICIES.towel} Remove jewelry before class.`,
  },
  {
    question: 'How often should I do pilates for best results?',
    answer:
      'For optimal results, we recommend 2-3 pilates sessions per week. This allows your body to build strength and flexibility while giving adequate recovery time. Many of our clients see improvements in posture, core strength, and overall well-being within 4-6 weeks of consistent practice.',
  },
  {
    question: 'What is hot pilates and what are the benefits?',
    answer: `Hot pilates is performed in our infrared-heated room (around 32-35°C). The heat helps warm muscles quickly, increases flexibility, enhances detoxification through sweating, and can boost calorie burn. It's perfect for those who enjoy a more intense, sweat-inducing workout while still maintaining pilates' focus on controlled movement. ${POLICIES.towel}`,
  },
  {
    question: 'Is pilates suitable for pregnant women?',
    answer:
      'Pilates can be excellent for pregnancy when properly modified. However, we require medical clearance from your healthcare provider before joining classes. Our instructors can provide pregnancy-safe modifications. We recommend private sessions during pregnancy for personalized attention and safety.',
  },
  {
    question: 'Do you offer postnatal or mum and baby Pilates?',
    answer:
      'Yes. Mommy + Me Mat Pilates is a gentle postnatal class where your baby stays beside you. It is suitable from around 6 weeks postpartum once you have been cleared to exercise, and babies are welcome until they are confidently crawling.',
  },
  {
    question: 'How do I book pilates classes at your Edgware studio?',
    answer:
      'You can book classes online through our booking system or by calling us directly. We recommend booking in advance as our small class sizes (maximum 8 people) fill up quickly. First-time clients should start with our Try It All intro offer for the best value.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: `${POLICIES.cancellation} ${POLICIES.arrival}`,
  },
  {
    question: 'Do you have parking available at the studio?',
    answer: `Yes, we have convenient parking available for all clients. We are at ${STUDIO.addressLine}, easily accessible by car and public transport from Burnt Oak, Colindale, Queensbury, Kingsbury, Mill Hill and Hendon.`,
  },
  {
    question: 'What makes your pilates studio different from others in London?',
    answer:
      'Euforyc Studios is a boutique women-only pilates studio focusing on small class sizes, premium equipment, and expert instruction. We offer both traditional reformer pilates and infrared hot pilates in a supportive, community-focused environment. Our personalized approach ensures every client receives individual attention.',
  },
  {
    question: 'Can pilates help with back pain and posture?',
    answer:
      'Yes, pilates is excellent for improving posture and can help alleviate back pain by strengthening core muscles and improving spinal alignment. Our instructors work with clients to address specific concerns and provide modifications as needed. For serious injuries, we recommend consulting your healthcare provider first.',
  },
  {
    question: 'What is the difference between your packages and memberships?',
    answer:
      "The Euforyc Package is pay-as-you-go with no contract: 4, 8 or 12 classes (from £105) or 30 Days Unlimited (£320), usable across all group classes and valid for 30 days starting from your first class, perfect for trying our classes or occasional practice. We also offer MOVE (4 classes £70 or 8 classes £135) for Sculpt and Belly Dance classes, valid 30 days from your first class. The Euforyc Membership is billed monthly with a 6-month minimum term, then continues monthly until cancelled with two full billing cycles' notice. Choose Euforyc 4, 8 or 12 (from £90/month), with credits you can use across the whole group timetable, or Euforyc Unlimited (£280/month) for unlimited classes plus priority booking, a monthly massage, a guest pass and more. Memberships can be frozen for up to 4 weeks per 6 months.",
  },
  {
    question: 'Do you offer private pilates sessions?',
    answer:
      'Yes, we offer one-on-one private pilates sessions tailored to your specific goals and needs. Private sessions are 60 minutes on the Reformer or Cadillac and cost £75, with packs of 4, 8 and 12 sessions available at a lower price per session. They are perfect for beginners, those with injuries, or anyone wanting personalized attention.',
  },
];
