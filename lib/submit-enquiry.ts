/* ── Website enquiries — client-side submit helper for the Contact + Studio Hire forms ── */

const SUBMIT_TIMEOUT_MS = 30_000;

export type EnquiryResult =
  | { status: 'sent' }
  /** The server rejected one or more fields (named as the form names them) — nothing was sent */
  | { status: 'invalid'; fields: string[] }
  /** Network error, timeout or the email could not be delivered */
  | { status: 'failed' };

/**
 * POSTs a form to /api/enquiry. Resolves 'sent' only once the server confirms the
 * enquiry was delivered, 'invalid' when it rejected the details, and 'failed' for
 * any network error, timeout or other error response.
 */
export async function submitEnquiry(payload: Record<string, unknown>): Promise<EnquiryResult> {
  // AbortController + timer rather than AbortSignal.timeout(), which older iOS Safari lacks
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (res.ok) return { status: 'sent' };

    // 413: only an over-long message can make a submission too large
    if (res.status === 413) return { status: 'invalid', fields: ['message'] };
    if (res.status === 400) {
      const body: { fields?: unknown } | null = await res.json().catch(() => null);
      const fields: unknown[] = body && Array.isArray(body.fields) ? body.fields : [];
      // "rooms.0" → "rooms"
      const names = fields.filter((f): f is string => typeof f === 'string').map((f) => f.split('.')[0]);
      return { status: 'invalid', fields: Array.from(new Set(names)) };
    }
    return { status: 'failed' };
  } catch {
    return { status: 'failed' };
  } finally {
    clearTimeout(timer);
  }
}
