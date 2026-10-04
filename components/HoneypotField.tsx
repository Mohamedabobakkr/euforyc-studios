/**
 * Spam trap for the enquiry forms: an extra field that is off-screen, not tabbable
 * and hidden from assistive tech. Real visitors never fill it; bots that fill every
 * field do, and /api/enquiry quietly discards those submissions.
 */
export default function HoneypotField() {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="referral">Leave this field empty</label>
      <input type="text" id="referral" name="referral" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
