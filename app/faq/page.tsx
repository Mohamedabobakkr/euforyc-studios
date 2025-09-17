import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ - Euforyc Studios',
  description: 'Get answers to common pilates questions at Euforyc Studios London. Learn about reformer pilates, hot pilates, classes for beginners, what to wear & more.',
};

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
    question: "What should I wear to pilates classes?",
    answer: "Wear comfortable, stretchy clothing that allows for full range of movement. Avoid loose clothing that might get caught in equipment. We recommend leggings and a fitted top. Grip socks are required for reformer classes (available for purchase at the studio). Remove jewelry before class."
  },
  {
    question: "How often should I do pilates for best results?",
    answer: "For optimal results, we recommend 2-3 pilates sessions per week. This allows your body to build strength and flexibility while giving adequate recovery time. Many of our clients see improvements in posture, core strength, and overall well-being within 4-6 weeks of consistent practice."
  },
  {
    question: "What is hot pilates and what are the benefits?",
    answer: "Hot pilates is performed in our infrared-heated room (around 32-35°C). The heat helps warm muscles quickly, increases flexibility, enhances detoxification through sweating, and can boost calorie burn. It's perfect for those who enjoy a more intense, sweat-inducing workout while still maintaining pilates' focus on controlled movement."
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
    answer: "Packages are pay-as-you-go options valid for 30 days, perfect for trying our classes or occasional practice. Memberships are monthly contracts (6-month minimum) offering better value, priority booking, and exclusive perks like free grip socks and matcha passes."
  },
  {
    question: "Do you offer private pilates sessions?",
    answer: "Yes, we offer one-on-one private pilates sessions tailored to your specific goals and needs. Private sessions are perfect for beginners, those with injuries, or anyone wanting personalized attention. We offer private session packages with significant savings compared to individual sessions."
  }
];

export default function FAQ() {
  return (
    <div className="pt-32">
      {/* Header */}
      <section className="section-padding py-24 bg-[#fffcf2]">
        <div className="container-width text-center">
          <h1 className="heading-primary mb-6">Frequently Asked Questions</h1>
          <p className="body-text text-xl max-w-3xl mx-auto">
            Everything you need to know about pilates classes, our studio, and getting started
            at Euforyc Studios in London.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[#fffcf2]">
        <div className="container-width">
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-lg border border-[#1a260e]/10 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#1a260e]/5 transition-colors">
                  <h3 className="font-serif text-lg font-light text-[#1a260e] pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown className="h-5 w-5 text-[#1a260e] transform group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="body-text text-[#1a260e]/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#1a260e] text-[#fffcf2]">
        <div className="container-width text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="heading-secondary text-[#fffcf2]">Ready to Start Your Pilates Journey?</h2>
            <p className="body-text text-[#fffcf2]/80">
              Join our welcoming community at London's premier pilates studio.
              Book your first class today and discover the transformative power of pilates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="inline-block bg-[#fffcf2] text-[#1a260e] px-8 py-4 font-serif hover:bg-[#fffcf2]/90 transition-colors duration-200"
              >
                VIEW PACKAGES
              </Link>
              <Link
                href="/book"
                className="inline-block border border-[#fffcf2] text-[#fffcf2] px-8 py-4 font-serif hover:bg-[#fffcf2] hover:text-[#1a260e] transition-colors duration-200"
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}