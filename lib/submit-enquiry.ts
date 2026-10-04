/* ── Website enquiries — client-side submit helper for the Contact + Studio Hire forms ── */

const SUBMIT_TIMEOUT_MS = 30_000;

/**
 * POSTs a form to /api/enquiry. Resolves true only once the server confirms the
 * enquiry was delivered; any network error, timeout or error response resolves false.
 */
export async function submitEnquiry(payload: Record<string, unknown>): Promise<boolean> {
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
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
