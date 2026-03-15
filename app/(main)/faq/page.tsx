'use client';

import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const faqs = [
  {
    question: "What is reformer pilates and how is it different from mat pilates?",
    answer: "Reformer pilates uses a specialized piece of equipment called a reformer, which has springs, pulleys, and a moving carriage. This provides resistance and support, making exercises more challenging and offering greater variety than traditional mat pilates. The reformer allows for precise movement control and can accommodate all fitness levels."
  },
  {
    question: "Do you offer pilates classes for beginners in London?",
    answer: "Yes! We welcome beginners to our pilates studio in Edgware, London. Our expert instructors provide modifications for all exercises and offer guidance throughout each class. We recommend starting with our intro package of 3 classes for £60 to get familiar with our studio and teaching style."
  },
  {
    question: "What's the difference between the intro offer, packages, and memberships? Which one is best for me?",
    answer: "The intro offer (3 classes for £60) is perfect for first-timers to experience our studio and teaching style. Packages are flexible pay-as-you-go options valid for 30 days from your first class booking (not purchase date), ideal for occasional practice or trying different class types. Memberships require a 6-month commitment but offer the best value with priority booking and exclusive perks. Which is best for you? It depends on your goals and schedule - if you're new, start with the intro offer. If you plan to attend regularly (2+ times per week), a membership offers the best value. For occasional practice or flexibility, packages are your best choice."
  },
  {
    question: "What should I wear to pilates classes?",
    answer: "Wear comfortable, stretchy clothing that allows for full range of movement. Avoid loose clothing that might get caught in equipment. We recommend leggings and a fitted top. Grip socks are required for all classes — if you don't have a pair, they are available for purchase at the studio. For hot pilates classes, you must also bring your own towel; towels are available for purchase at the studio if needed. Both items are mandatory to attend. Remove jewelry before class."
  },
  {
    question: "How often should I do pilates for best results?",
    answer: "For optimal results, we recommend 2-3 pilates sessions per week. This allows your body to build strength and flexibility while giving adequate recovery time. Many of our clients see improvements in posture, core strength, and overall well-being within 4-6 weeks of consistent practice."
  },
  {
    question: "What is hot pilates and what are the benefits?",
    answer: "Hot pilates is performed in our infrared-heated room (around 32-35°C). The heat helps warm muscles quickly, increases flexibility, enhances detoxification through sweating, and can boost calorie burn. It's perfect for those who enjoy a more intense, sweat-inducing workout while still maintaining pilates' focus on controlled movement. Please note: you must bring your own towel to hot pilates classes. Towels and grip socks are both required and available for purchase at the studio if needed."
  },
  {
    question: "Is pilates suitable for pregnant women?",
    answer: "Pilates can be excellent for pregnancy when properly modified. However, we require medical clearance from your healthcare provider before joining classes. Our instructors can provide pregnancy-safe modifications. We recommend private sessions during pregnancy for personalized attention and safety."
  },
  {
    question: "How do I book pilates classes at your Edgware studio?",
    answer: "You can book classes online through our booking system or by calling us directly. We recommend booking in advance as our small class sizes (maximum 8 people) fill up quickly. First-time clients should start with our intro package for the best value."
  },
  {
    question: "Do you have parking available at the studio?",
    answer: "Yes, we have convenient parking available for all clients. Our Edgware location at 7 Holmstall Ave is easily accessible by car and public transport, serving North London areas including Barnet, Mill Hill, and Finchley."
  },
  {
    question: "What makes your pilates studio different from others in London?",
    answer: "Euforyc Studios is a boutique women-only pilates studio focusing on small class sizes, premium equipment, and expert instruction. We offer both traditional reformer pilates and infrared hot pilates in a supportive, community-focused environment. Our personalized approach ensures every client receives individual attention."
  },
  {
    question: "Can pilates help with back pain and posture?",
    answer: "Yes, pilates is excellent for improving posture and can help alleviate back pain by strengthening core muscles and improving spinal alignment. Our instructors work with clients to address specific concerns and provide modifications as needed. For serious injuries, we recommend consulting your healthcare provider first."
  },
  {
    question: "What is the difference between your packages and memberships?",
    answer: "Packages are pay-as-you-go options valid for 30 days starting from your first class, perfect for trying our classes or occasional practice. Memberships are monthly contracts (6-month minimum) offering better value, priority booking, and exclusive perks like free grip socks and matcha passes."
  },
  {
    question: "Do you offer private pilates sessions?",
    answer: "Yes, we offer one-on-one private pilates sessions tailored to your specific goals and needs. Private sessions are perfect for beginners, those with injuries, or anyone wanting personalized attention. We offer private session packages with significant savings compared to individual sessions."
  }
];

const FAQItem = ({ faq }: { faq: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#1a260e]/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 px-0 flex items-center justify-between text-left hover:opacity-70 transition-all duration-500 group"
      >
        <h3 className="font-serif text-xl md:text-2xl font-light text-[#1a260e] pr-6 leading-relaxed">
          {faq.question}
        </h3>
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          {isOpen ? (
            <Minus className="h-5 w-5 text-[#1a260e] transition-all duration-500 transform rotate-0" />
          ) : (
            <Plus className="h-5 w-5 text-[#1a260e] transition-all duration-500 transform rotate-0 group-hover:rotate-90" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? 'max-h-96 pb-8' : 'max-h-0'
        }`}
      >
        <div className="pr-14">
          <p className="body-text text-[#1a260e]/80 leading-relaxed text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative bg-[#fffcf2]">
        <div className="container-width text-center">
          <div className="space-y-8 animate-fade-up">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a260e] tracking-wider leading-[0.9] font-light">
              Frequently Asked
            </h1>
            <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a260e] tracking-wider leading-[0.9] font-light italic">
              Questions
            </p>
            <div className="w-32 h-[1px] bg-[#1a260e]/20 mx-auto mt-8"></div>
            <p className="body-text text-lg max-w-2xl mx-auto text-[#1a260e]/70 leading-relaxed">
              Everything you need to know about pilates classes, our studio, and getting started
              at Euforyc Studios in London.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <p className="body-text text-lg text-[#1a260e]/80 leading-relaxed">
                Still have questions? We're here to help you start your pilates journey with confidence.
                Every question is a step closer to discovering what your body can achieve.
              </p>
              <p className="font-serif text-2xl md:text-3xl text-[#1a260e] italic opacity-90">
                everything is euforyc
              </p>
            </div>

            <div className="pt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/packages"
                  className="inline-block bg-[#1a260e] text-[#fffcf2] px-12 py-4 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#1a260e]/90 hover:scale-[1.02]"
                >
                  VIEW PACKAGES
                </Link>
                <Link
                  href="/contact"
                  className="inline-block border border-[#1a260e] text-[#1a260e] px-12 py-4 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#1a260e] hover:text-[#fffcf2] hover:scale-[1.02]"
                >
                  CONTACT US
                </Link>
              </div>
              <p className="text-xs text-[#1a260e]/60 text-center mt-4">
                <Link href="/book" className="hover:underline">Book your first class</Link> |
                <Link href="/about" className="hover:underline"> Learn our story</Link> |
                <Link href="/team" className="hover:underline"> Meet our team</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}