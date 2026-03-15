import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions | Euforyc Studios London',
  description: 'Find answers to common questions about Euforyc Studios in Edgware. Class types, booking, cancellation policy, what to wear, parking, membership info, intro offers & more.',
  keywords: ['euforyc faq', 'pilates questions', 'reformer pilates faq', 'pilates studio questions edgware', 'pilates booking help', 'pilates cancellation policy', 'what to wear pilates', 'pilates for beginners faq'],
  alternates: {
    canonical: 'https://euforyc.co.uk/faq',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is reformer pilates and how is it different from mat pilates?',
      acceptedAnswer: { '@type': 'Answer', text: 'Reformer pilates uses a specialized piece of equipment called a reformer, which has springs, pulleys, and a moving carriage. This provides resistance and support, making exercises more challenging and offering greater variety than traditional mat pilates. The reformer allows for precise movement control and can accommodate all fitness levels.' },
    },
    {
      '@type': 'Question',
      name: 'Do you offer pilates classes for beginners in London?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes! We welcome beginners to our pilates studio in Edgware, London. Our expert instructors provide modifications for all exercises and offer guidance throughout each class. We recommend starting with our intro package of 3 classes for £60 to get familiar with our studio and teaching style.' },
    },
    {
      '@type': 'Question',
      name: "What's the difference between the intro offer, packages, and memberships? Which one is best for me?",
      acceptedAnswer: { '@type': 'Answer', text: 'The intro offer (3 classes for £60) is perfect for first-timers to experience our studio and teaching style. Packages are flexible pay-as-you-go options valid for 30 days from your first class booking, ideal for occasional practice or trying different class types. Memberships require a 6-month commitment but offer the best value with priority booking and exclusive perks.' },
    },
    {
      '@type': 'Question',
      name: 'What should I wear to pilates classes?',
      acceptedAnswer: { '@type': 'Answer', text: 'Wear comfortable, stretchy clothing that allows for full range of movement. Avoid loose clothing that might get caught in equipment. We recommend leggings and a fitted top. Grip socks are required for reformer classes (available for purchase at the studio). Remove jewelry before class.' },
    },
    {
      '@type': 'Question',
      name: 'How often should I do pilates for best results?',
      acceptedAnswer: { '@type': 'Answer', text: 'For optimal results, we recommend 2-3 pilates sessions per week. This allows your body to build strength and flexibility while giving adequate recovery time. Many of our clients see improvements in posture, core strength, and overall well-being within 4-6 weeks of consistent practice.' },
    },
    {
      '@type': 'Question',
      name: 'What is hot pilates and what are the benefits?',
      acceptedAnswer: { '@type': 'Answer', text: 'Hot pilates is performed in our infrared-heated room (around 32-35°C). The heat helps warm muscles quickly, increases flexibility, enhances detoxification through sweating, and can boost calorie burn. It\'s perfect for those who enjoy a more intense, sweat-inducing workout while still maintaining pilates\' focus on controlled movement.' },
    },
    {
      '@type': 'Question',
      name: 'Is pilates suitable for pregnant women?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pilates can be excellent for pregnancy when properly modified. However, we require medical clearance from your healthcare provider before joining classes. Our instructors can provide pregnancy-safe modifications. We recommend private sessions during pregnancy for personalized attention and safety.' },
    },
    {
      '@type': 'Question',
      name: 'How do I book pilates classes at your Edgware studio?',
      acceptedAnswer: { '@type': 'Answer', text: 'You can book classes online through our booking system or by calling us directly. We recommend booking in advance as our small class sizes (maximum 8 people) fill up quickly. First-time clients should start with our intro package for the best value.' },
    },
    {
      '@type': 'Question',
      name: 'Do you have parking available at the studio?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, we have convenient parking available for all clients. Our Edgware location at 7 Holmstall Ave is easily accessible by car and public transport, serving North London areas including Barnet, Mill Hill, and Finchley.' },
    },
    {
      '@type': 'Question',
      name: 'What makes your pilates studio different from others in London?',
      acceptedAnswer: { '@type': 'Answer', text: 'Euforyc Studios is a boutique women-only pilates studio focusing on small class sizes, premium equipment, and expert instruction. We offer both traditional reformer pilates and infrared hot pilates in a supportive, community-focused environment. Our personalized approach ensures every client receives individual attention.' },
    },
    {
      '@type': 'Question',
      name: 'Can pilates help with back pain and posture?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, pilates is excellent for improving posture and can help alleviate back pain by strengthening core muscles and improving spinal alignment. Our instructors work with clients to address specific concerns and provide modifications as needed. For serious injuries, we recommend consulting your healthcare provider first.' },
    },
    {
      '@type': 'Question',
      name: 'Do you offer private pilates sessions?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, we offer one-on-one private pilates sessions tailored to your specific goals and needs. Private sessions are perfect for beginners, those with injuries, or anyone wanting personalized attention. We offer private session packages with significant savings compared to individual sessions.' },
    },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}