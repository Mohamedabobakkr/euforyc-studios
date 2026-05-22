'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
    <div className="min-h-screen bg-[#fffcf2] text-[#1a260e]">
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#1a260e]/50 mb-6">
            Welcome to Euforyc
          </p>
          <h1 className="font-serif font-light text-4xl md:text-6xl leading-[1.1] mb-6">
            Your practice
            <br />
            <span className="italic">starts now</span>
          </h1>
          <p className="text-base md:text-lg text-[#1a260e]/70 max-w-lg mx-auto leading-relaxed">
            Your booking is confirmed. A confirmation email is on its way with everything you need to know.
          </p>
        </div>
      </section>

      {/* Order Summary (only if Momence passes us details) */}
      {(service || value || orderId) && (
        <section className="px-6 pb-12">
          <div className="max-w-xl mx-auto bg-white border border-[#1a260e]/10 rounded-2xl p-6 md:p-8">
            <p className="text-xs tracking-[0.2em] uppercase text-[#1a260e]/50 mb-4">Confirmation</p>
            <dl className="space-y-3 text-sm">
              {service && (
                <div className="flex justify-between gap-4 border-b border-[#1a260e]/5 pb-3">
                  <dt className="text-[#1a260e]/60">Service</dt>
                  <dd className="font-medium text-right">{service}</dd>
                </div>
              )}
              {value && (
                <div className="flex justify-between gap-4 border-b border-[#1a260e]/5 pb-3">
                  <dt className="text-[#1a260e]/60">Amount</dt>
                  <dd className="font-medium text-right">£{String(value).replace(/[^0-9.]/g, '')}</dd>
                </div>
              )}
              {orderId && (
                <div className="flex justify-between gap-4">
                  <dt className="text-[#1a260e]/60">Booking reference</dt>
                  <dd className="font-mono text-xs text-[#1a260e]/80 text-right break-all">{orderId}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      {/* What happens next */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#1a260e]/50 mb-3">Next steps</p>
            <h2 className="font-serif font-light text-2xl md:text-3xl">A few things to know</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-[#1a260e]/10 rounded-xl p-5">
              <p className="font-serif text-3xl mb-2 text-[#1a260e]/30">01</p>
              <h3 className="font-serif text-base mb-1.5">Check your email</h3>
              <p className="text-xs text-[#1a260e]/65 leading-relaxed">
                Confirmation + booking link arrive within 2 minutes. Check spam if you don&apos;t see it.
              </p>
            </div>
            <div className="bg-white border border-[#1a260e]/10 rounded-xl p-5">
              <p className="font-serif text-3xl mb-2 text-[#1a260e]/30">02</p>
              <h3 className="font-serif text-base mb-1.5">Book your classes</h3>
              <p className="text-xs text-[#1a260e]/65 leading-relaxed">
                Reserve your slots through the booking link. Morning classes fill fastest — book ahead.
              </p>
            </div>
            <div className="bg-white border border-[#1a260e]/10 rounded-xl p-5">
              <p className="font-serif text-3xl mb-2 text-[#1a260e]/30">03</p>
              <h3 className="font-serif text-base mb-1.5">What to bring</h3>
              <p className="text-xs text-[#1a260e]/65 leading-relaxed">
                Comfortable clothes you can move in. <strong className="text-[#1a260e]/85 font-medium">Grip socks</strong> are mandatory for Reformer &mdash; bring your own or buy a pair at the studio (one-time, reuse every class). For <strong className="text-[#1a260e]/85 font-medium">Hot Pilates</strong>, a towel is also mandatory &mdash; bring one or buy at the studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Upsell — high-emotion conversion moment */}
      <section className="bg-[#1a260e] text-[#fffcf2] px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#fffcf2]/50 mb-5">
            For your practice to last
          </p>
          <h2 className="font-serif font-light text-3xl md:text-4xl leading-[1.15] mb-5">
            Become a member,
            <br />
            <span className="italic">save up to 40%</span>
          </h2>
          <p className="text-sm md:text-base text-[#fffcf2]/75 leading-relaxed max-w-md mx-auto mb-8">
            Memberships start from £65/mo. Priority booking, unlimited options, and the lowest per-class rate we offer.
          </p>
          <Link
            href="/memberships"
            className="inline-flex items-center gap-2 bg-[#fffcf2] text-[#1a260e] px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase hover:scale-[1.02] transition-transform"
          >
            View memberships
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Community + Contact */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#1a260e]/50 mb-3">Stay close</p>
          <h2 className="font-serif font-light text-2xl md:text-3xl mb-6">Follow the journey</h2>
          <p className="text-sm text-[#1a260e]/65 max-w-md mx-auto mb-8 leading-relaxed">
            Class previews, member moments, studio news. Join us on Instagram.
          </p>
          <a
            href="https://instagram.com/euforycstudios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1a260e]/20 text-[#1a260e] px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#1a260e] hover:text-[#fffcf2] transition-colors"
          >
            @euforycstudios
          </a>

          <div className="mt-12 pt-10 border-t border-[#1a260e]/10 space-y-2 text-xs text-[#1a260e]/60">
            <p>Questions? We&apos;re here.</p>
            <p>
              <a href="mailto:euforyc@gmail.com" className="underline underline-offset-2 hover:text-[#1a260e]">
                euforyc@gmail.com
              </a>
              <span className="mx-2">·</span>
              <a href="tel:+447375710370" className="underline underline-offset-2 hover:text-[#1a260e]">
                +44 7375 710370
              </a>
            </p>
            <p className="pt-2">
              <Link href="/" className="underline underline-offset-2 hover:text-[#1a260e]">
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
      <div className="min-h-screen bg-[#fffcf2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#1a260e]/20 border-t-[#1a260e]" />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
