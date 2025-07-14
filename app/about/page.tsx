import type { Metadata } from 'next';
import { Heart, Target, Zap } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us - Euforyc Studios',
  description: 'Learn about our story, mission, and the meaning behind Euforyc Studios. Discover our core values of Consistency, Patience, and Euphoria.',
};

export default function About() {
  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="section-padding py-24">
        <div className="container-width">
          <div className="text-center mb-16">
            <h1 className="heading-primary mb-8">Our Story</h1>
            <p className="body-text text-xl max-w-3xl mx-auto">
              Euforyc Studios was born from a simple belief: that wellness should be 
              accessible, transformative, and joyful. We're more than a studio – 
              we're a community dedicated to helping you discover your strongest self.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section-padding bg-brand-black text-brand-beige">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="heading-secondary text-brand-beige">The Name</h2>
              <p className="body-text text-brand-beige/80 text-lg">
                <strong>Euforyc</strong> <em>/u-for-ic/</em> – a word we created to embody 
                our philosophy. It represents the euphoric feeling that comes from 
                consistent practice, the "you" in your journey, and the organic 
                transformation that happens when mind and body work in harmony.
              </p>
              <p className="body-text text-brand-beige/80">
                Every session at Euforyc is designed to bring you closer to that 
                feeling – where challenge meets joy, where strength meets grace, 
                and where your practice becomes a celebration of what your body can achieve.
              </p>
            </div>
            <div className="bg-brand-green/20 rounded-none p-8 text-center">
              <p className="font-playfair text-3xl font-light text-brand-beige mb-4">
                "euforyc is everything"
              </p>
              <p className="font-inter text-sm text-brand-beige/80 italic">
                Our mantra that reminds us every feeling, every movement, 
                every breath is part of the euphoric journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Our Core Values</h2>
            <p className="body-text max-w-2xl mx-auto">
              Three principles guide everything we do at Euforyc Studios, 
              from how we teach to how we create community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Consistency */}
            <div className="text-center space-y-6">
              <div className="bg-brand-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-10 w-10 text-brand-green" />
              </div>
              <h3 className="font-playfair text-2xl font-light">Consistency</h3>
              <p className="body-text">
                True transformation happens through regular practice. We believe in 
                showing up for yourself, one session at a time, building strength 
                and confidence through dedicated commitment to your wellness journey.
              </p>
            </div>

            {/* Patience */}
            <div className="text-center space-y-6">
              <div className="bg-brand-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-10 w-10 text-brand-green" />
              </div>
              <h3 className="font-playfair text-2xl font-light">Patience</h3>
              <p className="body-text">
                Your body is wise and deserves respect. We honor the process of 
                growth, celebrating small victories and understanding that lasting 
                change takes time. Every body moves at its own perfect pace.
              </p>
            </div>

            {/* Euphoria */}
            <div className="text-center space-y-6">
              <div className="bg-brand-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-10 w-10 text-brand-green" />
              </div>
              <h3 className="font-playfair text-2xl font-light">Euphoria</h3>
              <p className="body-text">
                Movement should bring joy. We create an environment where challenge 
                meets celebration, where you can push your limits while feeling 
                supported, and where every class leaves you feeling empowered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding bg-brand-green/5">
        <div className="container-width text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="heading-secondary">Our Mission</h2>
            <p className="body-text text-lg leading-relaxed">
              At Euforyc Studios, we're committed to creating a space where everyone 
              can discover their strength, find their center, and experience the pure 
              joy of movement. Through expert instruction, premium facilities, and 
              genuine community, we guide you toward a practice that transforms not 
              just your body, but your entire relationship with wellness.
            </p>
            <p className="body-text text-lg leading-relaxed">
              Because when you feel strong in your body, confident in your practice, 
              and connected to your community – that's when everything becomes euforyc.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}