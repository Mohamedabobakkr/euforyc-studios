/**
 * POST /api/enquiry
 * Receives the Contact and Studio Hire forms and emails each submission to the
 * studio via Resend. Succeeds only once Resend confirms it accepted the email —
 * anything else is an error, so the form can tell the visitor it didn't send.
 */

import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildEmail, enquirySchema, type Enquiry } from '@/lib/enquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_FROM = 'Euforyc Website <enquiries@euforyc.co.uk>';
const EMAIL_TO = 'euforyc@gmail.com';
const EMAIL_TIMEOUT_MS = 10_000;
const RETRY_DELAY_MS = 1_000;
const MAX_BODY_CHARS = 20_000;

interface SendFailure {
  reason: string;
  /** Network error, timeout, 5xx or 429 — worth one retry */
  temporary: boolean;
}

/** One attempt. Resolves null once Resend has accepted the email. Never throws. */
async function attemptSend(resend: Resend, enquiry: Enquiry, submittedAt: Date, idempotencyKey: string): Promise<SendFailure | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const { subject, html, text } = buildEmail(enquiry, submittedAt);

    const { data, error } = await Promise.race([
      resend.emails.send(
        {
          from: EMAIL_FROM,
          to: EMAIL_TO,
          replyTo: enquiry.email,
          subject,
          html,
          text,
        },
        // Same key on the retry, so a slow first attempt can't produce a duplicate email
        { idempotencyKey },
      ),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('Resend request timed out')), EMAIL_TIMEOUT_MS);
      }),
    ]);

    if (error) {
      const status = error.statusCode;
      return {
        reason: `${error.name} (${status ?? 'no response'}): ${error.message}`,
        temporary: status === null || status === 429 || status >= 500,
      };
    }
    if (!data?.id) {
      return { reason: 'Resend returned no email id', temporary: false };
    }
    return null;
  } catch (err) {
    // Timeouts and unexpected network errors
    return { reason: err instanceof Error ? err.message : 'Unknown error', temporary: true };
  } finally {
    clearTimeout(timer);
  }
}

/** Sends the enquiry email, retrying once after a temporary failure */
async function sendEmail(enquiry: Enquiry, submittedAt: Date): Promise<SendFailure | null> {
  let resend: Resend;
  try {
    resend = new Resend(process.env.RESEND_API_KEY);
  } catch {
    return { reason: 'RESEND_API_KEY is not set', temporary: false };
  }

  const idempotencyKey = randomUUID();
  const first = await attemptSend(resend, enquiry, submittedAt, idempotencyKey);
  if (!first || !first.temporary) return first;

  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
  const second = await attemptSend(resend, enquiry, submittedAt, idempotencyKey);
  return second && { ...second, reason: `${second.reason} (after retry; first attempt: ${first.reason})` };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_CHARS) {
      return NextResponse.json({ success: false, error: 'Submission too large' }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  // ── Honeypot: a hidden field real visitors never fill. Report success, send nothing. ──
  const honeypot = (body as { referral?: unknown } | null)?.referral;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  // ── Input validation ──
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid submission',
        fields: Array.from(new Set(parsed.error.issues.map((issue) => issue.path.join('.') || 'formType'))),
      },
      { status: 400 },
    );
  }

  const enquiry = parsed.data;
  const submittedAt = new Date();

  const failure = await sendEmail(enquiry, submittedAt);
  if (failure) {
    // One structured line for the Vercel logs — never the message body
    console.error(
      '[Enquiry] Email not sent:',
      JSON.stringify({
        formType: enquiry.formType,
        time: submittedAt.toISOString(),
        name: enquiry.name,
        email: enquiry.email,
        reason: failure.reason,
      }),
    );
    return NextResponse.json({ success: false, error: 'Enquiry could not be delivered' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
