'use client';

import { useEffect, useRef, useState } from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import Map from '@/components/Map';
import HoneypotField from '@/components/HoneypotField';
import { TikTokIcon } from '@/components/icons/TikTokIcon';
import Arrow from '@/components/euforyc/Arrow';
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

// Shared look for the form fields: cream, hairline border, 16px text so iOS doesn't zoom
const LABEL_CLASS = 'mb-2 block font-sans text-[12.5px] font-normal uppercase tracking-[0.16em] text-eu-green';
const FIELD_CLASS =
  'block w-full border bg-eu-cream px-5 font-sans text-[16px] leading-normal text-eu-ink transition-colors placeholder:text-eu-stone hover:border-[#1a260e]/60 focus:border-eu-ink';
const fieldBorder = (hasError: boolean) => (hasError ? 'border-red-800' : 'border-[#1a260e]/35');

// Contact rows: icon in a soft circle beside the details
const INFO_ROW = 'flex items-start gap-5 border-b border-[#1a260e]/15 py-6';
const INFO_ICON = 'grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-eu-beige text-eu-ink';
const INFO_TITLE = 'mb-1 font-serif text-[22px] font-normal leading-tight text-eu-ink';
const INFO_LINK =
  'inline-flex min-h-[44px] items-center underline decoration-[#1a260e]/30 underline-offset-[5px] transition-colors hover:text-eu-ink hover:decoration-eu-ink';
const SOCIAL_LINK =
  'inline-flex min-h-[48px] items-center gap-3 rounded-full border border-[#1a260e]/25 px-5 font-sans text-[15px] text-eu-ink transition-colors hover:border-eu-ink hover:bg-eu-ink hover:text-eu-cream';

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p role="alert" className="mt-2 pl-5 font-sans text-[14px] leading-snug text-red-800">{message}</p>;
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
    <div className="eu-page-top">
      {/* Hero Section */}
      <section className="eu-wrap pb-[clamp(40px,5vw,72px)] pt-[clamp(48px,6vw,96px)]">
        <div className="grid grid-cols-1 items-end lg:grid-cols-12 lg:gap-x-6">
          <h1 className="eu-rise m-0 font-serif text-[clamp(56px,8.4vw,136px)] font-normal leading-[0.92] tracking-[-0.035em] text-eu-ink lg:col-span-7">
            Get in <em>Touch</em>
          </h1>
          <p
            className="eu-rise mt-7 max-w-xl font-sans text-[17px] leading-[1.75] text-eu-green lg:col-span-4 lg:col-start-9 lg:mt-0"
          >
            Have questions about our classes, membership options, or want to learn more
            about the Euforyc experience? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="eu-wrap pb-[clamp(80px,9vw,140px)]">
        <div className="grid grid-cols-1 gap-y-16 border-t border-[#1a260e]/15 pt-[clamp(40px,5vw,72px)] lg:grid-cols-12 lg:gap-x-6">
          {/* Contact Form */}
          <div className="min-w-0 lg:col-span-7">
            <h2 className="font-serif text-[clamp(36px,4vw,60px)] font-normal leading-[1.04] tracking-[-0.02em] text-eu-ink">
              Send us a <em>Message</em>
            </h2>

            <form
              onSubmit={handleSubmit}
              className="relative mt-8 space-y-6 overflow-hidden rounded-[28px] bg-eu-beige p-5 sm:p-8 md:rounded-eu-lg md:p-10"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                <div>
                  <label htmlFor="name" className={LABEL_CLASS}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    autoComplete="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`${FIELD_CLASS} ${fieldBorder(!!fieldError('name'))} min-h-[52px] rounded-full py-3`}
                  />
                  <FieldError message={fieldError('name')} />
                </div>
                <div>
                  <label htmlFor="email" className={LABEL_CLASS}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`${FIELD_CLASS} ${fieldBorder(!!fieldError('email'))} min-h-[52px] rounded-full py-3`}
                  />
                  <FieldError message={fieldError('email')} />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className={LABEL_CLASS}>
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  autoComplete="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${FIELD_CLASS} ${fieldBorder(!!fieldError('phone'))} min-h-[52px] rounded-full py-3`}
                />
                <FieldError message={fieldError('phone')} />
              </div>

              <div>
                <label htmlFor="message" className={LABEL_CLASS}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`${FIELD_CLASS} ${fieldBorder(!!fieldError('message'))} min-h-[168px] resize-none rounded-eu-sm py-4`}
                  placeholder="Tell us about your wellness goals or any questions you have..."
                />
                <FieldError message={fieldError('message')} />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="eu-btn eu-btn--ink eu-btn--block disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
                <span className="eu-btn__dot" aria-hidden="true">
                  <Arrow />
                </span>
              </button>

              {status === 'success' && (
                <p role="status" className="rounded-eu-sm border border-[#1a260e]/15 bg-eu-cream px-5 py-4 font-sans text-[15px] leading-relaxed text-eu-ink">
                  Thank you, your message has been sent. We'll be in touch soon.
                </p>
              )}

              {status === 'invalid' && (
                <p role="alert" className="rounded-eu-sm border border-red-800/40 bg-eu-cream px-5 py-4 font-sans text-[15px] leading-relaxed text-red-800">
                  Some of your details need checking. Please correct them and try again.
                </p>
              )}

              {status === 'error' && (
                <p role="alert" className="rounded-eu-sm border border-red-800/40 bg-eu-cream px-5 py-4 font-sans text-[15px] leading-relaxed text-red-800">
                  Sorry, that didn't send. Please try again, or email us at{' '}
                  <a href="mailto:euforyc@gmail.com" className="underline underline-offset-4">euforyc@gmail.com</a>
                  {' '}or call{' '}
                  <a href="tel:+447375710370" className="underline underline-offset-4">+44 7375 710370</a>.
                </p>
              )}

              <HoneypotField />
            </form>
          </div>

          {/* Contact Information */}
          <div className="min-w-0 lg:col-span-4 lg:col-start-9">
            <h2 className="font-serif text-[clamp(36px,4vw,60px)] font-normal leading-[1.04] tracking-[-0.02em] text-eu-ink">
              Contact <em>Information</em>
            </h2>

            <div className="mt-8 border-t border-[#1a260e]/15">
              {/* Address */}
              <div className={INFO_ROW}>
                <span className={INFO_ICON}>
                  <MapPin className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className={INFO_TITLE}>Studio Location</h3>
                  <p className="body-text">
                    7-8 Holmstall Parade,<br />
                    Edgware, HA8 5HX
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className={INFO_ROW}>
                <span className={INFO_ICON}>
                  <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className={INFO_TITLE}>Phone</h3>
                  <p className="body-text">
                    <a href="tel:+447375710370" className={INFO_LINK}>
                      +44 7375 710370
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className={INFO_ROW}>
                <span className={INFO_ICON}>
                  <Mail className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className={INFO_TITLE}>Email</h3>
                  <p className="body-text">
                    <a href="mailto:euforyc@gmail.com" className={`${INFO_LINK} break-all`}>
                      euforyc@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className={INFO_ROW}>
                <span className={INFO_ICON}>
                  <Clock className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className={INFO_TITLE}>Studio Hours</h3>
                  <div className="body-text space-y-1">
                    <p>Monday - Friday: <span className="whitespace-nowrap">6:45 AM - 8:00 PM</span></p>
                    <p>Saturday - Sunday: <span className="whitespace-nowrap">8:45 AM - 6:00 PM</span></p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="py-6">
                <div className="min-w-0">
                  <h3 className={`${INFO_TITLE} mb-4`}>Follow Us</h3>
                  <div className="flex flex-wrap gap-3">
                    <p>
                      <a
                        href="https://www.instagram.com/euforycstudios?igsh=b3A0aDNpbXEzczR2&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={SOCIAL_LINK}
                      >
                        <Instagram className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        <span>Instagram: @euforycstudios</span>
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://www.tiktok.com/@euforyc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={SOCIAL_LINK}
                      >
                        <TikTokIcon className="h-[18px] w-[18px] flex-shrink-0" />
                        <span>TikTok: @euforyc</span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Map Section */}
      <section className="eu-wrap pb-[clamp(90px,10vw,150px)]">
        {/* Map Title */}
        <div className="border-t border-[#1a260e]/15 pt-[clamp(40px,5vw,72px)]">
          <h2 className="font-serif text-[clamp(34px,4vw,56px)] font-normal leading-none tracking-[0.06em] text-eu-ink">FIND US</h2>
        </div>

        {/* Map */}
        <div className="relative mt-8 h-[520px] md:mt-10 md:h-[clamp(540px,56vw,720px)]">
          <Map />
        </div>

        {/* Transportation Info */}
        <div className="mt-4 grid grid-cols-1 gap-y-4 rounded-[28px] bg-eu-beige p-6 sm:p-8 md:mt-6 md:grid-cols-12 md:gap-x-6 md:rounded-eu-lg md:p-12">
          <div className="flex items-center gap-4 md:col-span-4 md:row-span-2 md:self-start md:pt-2">
            <div className="h-px w-7 flex-none bg-eu-green" aria-hidden="true"></div>
            <p className="font-sans text-[12px] font-normal uppercase tracking-[0.22em] text-eu-green">GETTING HERE</p>
          </div>
          <p className="max-w-2xl font-sans text-[17px] leading-[1.7] text-eu-green md:col-span-8 md:col-start-5">
            We're located in Edgware, easily accessible by public transport.
            Colindale station (Northern line) is around a 10–15 minute walk.
          </p>
          <p className="font-sans text-[12.5px] uppercase tracking-[0.12em] text-eu-sage sm:tracking-[0.18em] md:col-span-8 md:col-start-5">
            Bus routes: 32 • 142 • 186 • 204
          </p>
        </div>
      </section>
    </div>
  );
}
