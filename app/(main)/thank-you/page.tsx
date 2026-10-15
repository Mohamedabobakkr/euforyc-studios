'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PillLink from '@/components/euforyc/PillLink';
import { resolveMomenceId } from '@/lib/momence-pricing';

function readParam(sp: URLSearchParams, keys: string[]): string {
  for (const k of keys) {
    const v = sp.get(k);
    if (v && v.trim().length > 0) return v.trim();
  }
  return '';
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    if (typeof window === 'undefined') return;
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq !== 'function') return;

    const orderId = readParam(searchParams, ['order_id', 'orderId', 'booking_id', 'bookingId', 'id', 'transaction_id']);
    const momenceId = readParam(searchParams, ['membershipId', 'productId', 'packageId', 'classId', 'eventId', 'id']);
    const rawValue = readParam(searchParams, ['value', 'amount', 'price', 'total']);
    const urlValue = parseFloat(rawValue.replace(/[^0-9.]/g, '')) || 0;
    const urlCurrency = readParam(searchParams, ['currency']);
    const urlServiceName = readParam(searchParams, ['service', 'service_name', 'item', 'product', 'name', 'content_name']);
    const urlType = readParam(searchParams, ['type', 'purchase_type', 'category', 'content_type']);
    const email = readParam(searchParams, ['email', 'em']);
    const phoneRaw = readParam(searchParams, ['phone', 'ph', 'mobile']);
    const firstName = readParam(searchParams, ['first_name', 'fname', 'firstName']);
    const lastName = readParam(searchParams, ['last_name', 'lname', 'lastName']);

    const resolved = resolveMomenceId(momenceId);
    const value = urlValue > 0 ? urlValue : (resolved?.value ?? 0);
    const currency = urlCurrency || resolved?.currency || 'GBP';
    const serviceName = urlServiceName || resolved?.contentName || '';
    const purchaseType = resolved?.contentType || urlType || '';

    let eventId = readParam(searchParams, ['event_id']);
    if (!eventId && orderId) {
      eventId = 'purchase_momence_' + orderId.replace(/[^A-Za-z0-9_-]/g, '').substring(0, 64);
    }
    if (!eventId && momenceId) {
      eventId = 'purchase_mid_' + momenceId.replace(/[^A-Za-z0-9_-]/g, '').substring(0, 32) + '_' + Math.floor(Date.now() / 60000);
    }
    if (!eventId) {
      eventId = 'purchase_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
    }

    try {
      const matching: Record<string, string> = { country: 'gb' };
      try {
        const stored = localStorage.getItem('euforyc_uid');
        if (stored) matching.external_id = stored;
      } catch {}
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        matching.em = email.trim().toLowerCase();
      }
      if (phoneRaw) {
        let ph = phoneRaw.replace(/\D/g, '');
        if (ph.length >= 10) {
          if (ph.charAt(0) === '0') ph = '44' + ph.substring(1);
          matching.ph = ph;
        }
      }
      if (firstName) matching.fn = firstName.trim().toLowerCase().substring(0, 100);
      if (lastName) matching.ln = lastName.trim().toLowerCase().substring(0, 100);
      fbq('init', '1085377523538304', matching);
    } catch {}

    const payload: Record<string, unknown> = {};
    if (value > 0) payload.value = value;
    payload.currency = currency.toUpperCase();
    if (serviceName) payload.content_name = serviceName.substring(0, 200);
    if (purchaseType) payload.content_type = purchaseType.substring(0, 50);
    const idForContent = orderId || momenceId;
    if (idForContent) {
      payload.content_ids = [idForContent.substring(0, 100)];
      payload.order_id = idForContent.substring(0, 100);
    }
    payload.num_items = 1;

    fbq('track', 'Purchase', payload, { eventID: eventId });
    firedRef.current = true;
  }, [searchParams]);

  const displayMomenceId = searchParams.get('membershipId') || searchParams.get('productId') || searchParams.get('packageId') || searchParams.get('classId') || '';
  const displayResolved = resolveMomenceId(displayMomenceId);
  const urlValueRaw = searchParams.get('value') || searchParams.get('amount') || searchParams.get('price') || '';
  const value = urlValueRaw || (displayResolved ? String(displayResolved.value) : '');
  const service = searchParams.get('service') || searchParams.get('service_name') || searchParams.get('item') || displayResolved?.contentName || '';
  const orderId = searchParams.get('order_id') || searchParams.get('booking_id') || '';

  return (
    <div className="eu-page-top min-h-screen bg-eu-cream text-eu-ink">
      {/* Hero */}
      <section className="px-5 pb-[clamp(40px,5vw,64px)] pt-[clamp(48px,6vw,96px)]">
        <div className="eu-rise mx-auto max-w-3xl text-center">
          <p className="eu-cap mb-6 text-eu-green">
            Welcome to Euforyc
          </p>
          <h1 className="mb-7 font-serif text-[clamp(48px,7vw,104px)] font-normal leading-[0.98] tracking-[-0.03em]">
            Your practice{' '}
            <br />
            <span className="italic">starts now</span>
          </h1>
          <p className="eu-lede !mx-auto max-w-lg">
            Your booking is confirmed. A confirmation email is on its way with everything you need to know.
          </p>
        </div>
      </section>

      {/* Order Summary (only if Momence passes us details) */}
      {(service || value || orderId) && (
        <section className="px-5 pb-12">
          <div className="mx-auto max-w-xl rounded-eu-md bg-eu-beige p-6 md:p-8">
            <p className="eu-cap mb-4 text-eu-green">Confirmation</p>
            <dl className="space-y-3 text-[15px]">
              {service && (
                <div className="flex justify-between gap-4 border-b border-[#1a260e]/15 pb-3">
                  <dt className="text-eu-sage">Service</dt>
                  <dd className="text-right font-medium">{service}</dd>
                </div>
              )}
              {value && (
                <div className="flex justify-between gap-4 border-b border-[#1a260e]/15 pb-3">
                  <dt className="text-eu-sage">Amount</dt>
                  <dd className="text-right font-medium">£{String(value).replace(/[^0-9.]/g, '')}</dd>
                </div>
              )}
              {orderId && (
                <div className="flex justify-between gap-4">
                  <dt className="text-eu-sage">Booking reference</dt>
                  <dd className="break-all text-right font-mono text-[13px] text-eu-ink">{orderId}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      {/* What happens next */}
      <section className="px-5 pb-[clamp(64px,8vw,110px)]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center md:mb-12">
            <p className="eu-cap mb-4 text-eu-green">Next steps</p>
            <h2 className="font-serif text-[clamp(32px,3.6vw,52px)] font-normal leading-[1.08] tracking-[-0.02em]">A few things to know</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-eu-md bg-eu-beige p-6 md:p-7">
              <p className="mb-3 font-serif text-[40px] italic leading-none text-eu-green">01</p>
              <h3 className="mb-2 font-serif text-[22px] leading-[1.2]">Check your email</h3>
              <p className="text-[15px] leading-[1.65] text-eu-green">
                Confirmation + booking link arrive within 2 minutes. Check spam if you don&apos;t see it.
              </p>
            </div>
            <div className="rounded-eu-md bg-eu-beige p-6 md:p-7">
              <p className="mb-3 font-serif text-[40px] italic leading-none text-eu-green">02</p>
              <h3 className="mb-2 font-serif text-[22px] leading-[1.2]">Book your classes</h3>
              <p className="text-[15px] leading-[1.65] text-eu-green">
                Reserve your slots through the booking link. Morning classes fill fastest — book ahead.
              </p>
            </div>
            <div className="rounded-eu-md bg-eu-beige p-6 md:p-7">
              <p className="mb-3 font-serif text-[40px] italic leading-none text-eu-green">03</p>
              <h3 className="mb-2 font-serif text-[22px] leading-[1.2]">What to bring</h3>
              <p className="text-[15px] leading-[1.65] text-eu-green">
                Comfortable clothes you can move in. <strong className="font-medium text-eu-ink">Grip socks</strong> are mandatory for Reformer &mdash; bring your own or buy a pair at the studio (one-time, reuse every class). For <strong className="font-medium text-eu-ink">Hot Pilates</strong> and <strong className="font-medium text-eu-ink">Sculpt Mat Pilates</strong>, a towel is also mandatory &mdash; bring one or buy at the studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Upsell — high-emotion conversion moment */}
      <section className="eu-on-dark mx-[clamp(10px,1.5vw,24px)] rounded-eu-xl bg-eu-ink px-5 py-[clamp(72px,9vw,130px)] text-eu-cream">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eu-cap mb-5 text-eu-beige">
            For your practice to last
          </p>
          <h2 className="mb-6 font-serif text-[clamp(36px,4.6vw,68px)] font-normal leading-[1.05] tracking-[-0.02em]">
            Become a member,{' '}
            <br />
            <span className="italic">save on every class</span>
          </h2>
          <p className="mx-auto mb-9 max-w-md text-[16px] leading-[1.7] text-eu-beige md:text-[17px]">
            The Euforyc Membership starts from £90/mo, with credits that work across the whole timetable. Go Unlimited for priority booking and exclusive perks.
          </p>
          <PillLink href="/memberships" variant="cream" dot stretchMobile>
            View memberships
          </PillLink>
        </div>
      </section>

      {/* Community + Contact */}
      <section className="px-5 py-[clamp(64px,8vw,110px)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eu-cap mb-4 text-eu-green">Stay close</p>
          <h2 className="mb-6 font-serif text-[clamp(32px,3.6vw,52px)] font-normal leading-[1.08] tracking-[-0.02em]">Follow the journey</h2>
          <p className="mx-auto mb-8 max-w-md text-[16px] leading-[1.7] text-eu-green">
            Class previews, member moments, studio news. Join us on Instagram.
          </p>
          <PillLink
            href="https://instagram.com/euforycstudios"
            target="_blank"
            rel="noopener noreferrer"
            variant="line"
            className="!text-[14px] !normal-case !tracking-[0.06em]"
          >
            @euforycstudios
          </PillLink>

          <div className="mt-12 space-y-2 border-t border-[#1a260e]/15 pt-10 text-[15px] text-eu-sage">
            <p>Questions? We&apos;re here.</p>
            <p>
              <a href="mailto:euforyc@gmail.com" className="inline-flex min-h-[44px] items-center text-eu-ink underline decoration-[#1a260e]/35 underline-offset-4 hover:decoration-[#1a260e]">
                euforyc@gmail.com
              </a>
              <span className="mx-2">·</span>
              <a href="tel:+447375710370" className="inline-flex min-h-[44px] items-center text-eu-ink underline decoration-[#1a260e]/35 underline-offset-4 hover:decoration-[#1a260e]">
                +44 7375 710370
              </a>
            </p>
            <p className="pt-2">
              <Link href="/" className="inline-flex min-h-[44px] items-center text-eu-ink underline decoration-[#1a260e]/35 underline-offset-4 hover:decoration-[#1a260e]">
                Back to euforyc.co.uk
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="eu-page-top flex min-h-screen items-center justify-center bg-eu-cream">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#1a260e]/20 border-t-[#1a260e]" />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
