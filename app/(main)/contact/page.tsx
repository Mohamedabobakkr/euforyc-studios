'use client';

import { useEffect, useRef, useState } from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import Map from '@/components/Map';
import HoneypotField from '@/components/HoneypotField';
import { TikTokIcon } from '@/components/icons/TikTokIcon';
import { submitEnquiry } from '@/lib/submit-enquiry';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

// Shown under a field when the server rejects its value
const FIELD_MESSAGES: Record<string, string> = {
  name: 'Please enter your name (up to 100 characters).',
  email: 'Please enter a valid email address, for example name@example.com.',
  phone: 'Please check your phone number (up to 40 characters).',
  message: 'Please enter a message (up to 5,000 characters).',
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p role="alert" className="mt-2 font-inter text-sm text-red-800">{message}</p>;
}

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'invalid' | 'error'>('idle');
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const sendingRef = useRef(false); // guards against double submits

  // Bring the first rejected field into view
  useEffect(() => {
    const first = invalidFields.find(field => field in FIELD_MESSAGES);
    if (first) document.getElementById(first)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [invalidFields]);

  const fieldError = (field: string) => (invalidFields.includes(field) ? FIELD_MESSAGES[field] : undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendingRef.current) return;
    sendingRef.current = true;
    setStatus('sending');

    const referral = String(new FormData(e.currentTarget).get('referral') ?? '');
    const result = await submitEnquiry({ formType: 'contact', ...formData, referral });

    if (result.status === 'sent') setFormData(emptyForm);
    setInvalidFields(result.status === 'invalid' ? result.fields : []);
    setStatus(result.status === 'sent' ? 'success' : result.status === 'invalid' ? 'invalid' : 'error');
    sendingRef.current = false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="section-padding py-24">
        <div className="container-width text-center">
          <h1 className="heading-primary mb-8">Get in Touch</h1>
          <p className="body-text text-xl max-w-3xl mx-auto">
            Have questions about our classes, membership options, or want to learn more
            about the Euforyc experience? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <h2 className="heading-secondary">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-inter text-sm font-medium text-[#1a260e] mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#1a260e]/20 bg-[#fffcf2] focus:border-[#1a260e] focus:outline-none transition-colors"
                    />
                    <FieldError message={fieldError('name')} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-inter text-sm font-medium text-[#1a260e] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#1a260e]/20 bg-[#fffcf2] focus:border-[#1a260e] focus:outline-none transition-colors"
                    />
                    <FieldError message={fieldError('email')} />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block font-inter text-sm font-medium text-[#1a260e] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#1a260e]/20 bg-[#fffcf2] focus:border-[#1a260e] focus:outline-none transition-colors"
                  />
                  <FieldError message={fieldError('phone')} />
                </div>

                <div>
                  <label htmlFor="message" className="block font-inter text-sm font-medium text-[#1a260e] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#1a260e]/20 bg-[#fffcf2] focus:border-[#1a260e] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your wellness goals or any questions you have..."
                  />
                  <FieldError message={fieldError('message')} />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p role="status" className="font-inter text-sm text-[#1a260e]">
                    Thank you, your message has been sent. We'll be in touch soon.
                  </p>
                )}

                {status === 'invalid' && (
                  <p role="alert" className="font-inter text-sm text-red-800">
                    Some of your details need checking. Please correct them and try again.
                  </p>
                )}

                {status === 'error' && (
                  <p role="alert" className="font-inter text-sm text-red-800">
                    Sorry, that didn't send. Please try again, or email us at{' '}
                    <a href="mailto:euforyc@gmail.com" className="underline">euforyc@gmail.com</a>
                    {' '}or call{' '}
                    <a href="tel:+447375710370" className="underline">+44 7375 710370</a>.
                  </p>
                )}

                <HoneypotField />
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="heading-secondary">Contact Information</h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-[#1a260e] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg font-light mb-2">Studio Location</h3>
                    <p className="body-text">
                      7 Holmstall Ave<br />
                      Edgware HA8 5HX<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-[#1a260e] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg font-light mb-2">Phone</h3>
                    <p className="body-text">
                      <a href="tel:+447375710370" className="hover:text-[#1a260e]/70 transition-colors">
                        +44 7375 710370
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-[#1a260e] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg font-light mb-2">Email</h3>
                    <p className="body-text">
                      <a href="mailto:euforyc@gmail.com" className="hover:text-[#1a260e]/70 transition-colors">
                        euforyc@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-[#1a260e] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg font-light mb-2">Studio Hours</h3>
                    <div className="body-text space-y-1">
                      <p>Monday - Friday: 6:45 AM - 8:00 PM</p>
                      <p>Saturday - Sunday: 8:45 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <h3 className="font-serif text-lg font-light mb-3">Follow Us</h3>
                    <div className="space-y-3">
                      <p>
                        <a
                          href="https://www.instagram.com/euforycstudios?igsh=b3A0aDNpbXEzczR2&utm_source=qr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-[#1a260e]/70 transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-[#1a260e] mr-2" />
                          <span>Instagram: @euforycstudios</span>
                        </a>
                      </p>
                      <p>
                        <a
                          href="https://www.tiktok.com/@euforyc"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-[#1a260e]/70 transition-colors"
                        >
                          <TikTokIcon className="h-5 w-5 text-[#1a260e] mr-2" />
                          <span>TikTok: @euforyc</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Map Section */}
      <section className="relative">
        {/* Decorative transition */}
        <div className="h-24 bg-gradient-to-b from-[#fffcf2] to-[#faf8f3]"></div>

        {/* Map Title with elegant styling */}
        <div className="absolute top-0 left-0 right-0 z-30 text-center">
          <div className="inline-block bg-[#fffcf2] px-12 py-4 rounded-full shadow-lg">
            <h2 className="font-serif text-3xl font-light text-[#1a260e] tracking-wider">FIND US</h2>
          </div>
        </div>

        {/* Full viewport map with aesthetic presentation */}
        <div className="relative" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
          <Map />
        </div>

        {/* Transportation Info with elegant design */}
        <div className="bg-gradient-to-b from-[#faf8f3] to-[#fffcf2] py-12">
          <div className="container-width text-center space-y-4">
            <div className="inline-flex items-center space-x-4 mb-4">
              <div className="h-px w-16 bg-[#1a260e]/20"></div>
              <p className="font-serif text-lg font-light text-[#1a260e] tracking-wider">GETTING HERE</p>
              <div className="h-px w-16 bg-[#1a260e]/20"></div>
            </div>
            <p className="font-sans text-sm text-[#1a260e]/70 max-w-2xl mx-auto">
              We're located in Edgware, easily accessible by public transport.
              Just a short walk from Edgware Station on the Northern Line.
            </p>
            <p className="font-sans text-xs text-[#1a260e]/50 tracking-wider uppercase">
              Bus routes: 32 • 142 • 186 • 204
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}