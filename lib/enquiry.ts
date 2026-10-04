/* ── Website enquiries (Contact + Studio Hire) — validation & email formatting ── */

import { z } from 'zod';
import { getPerPerson } from '@/lib/studio-hire-pricing';

// Single-line text: trimmed, with any line breaks/tabs collapsed to spaces
const line = (max: number) =>
  z.string().trim().min(1).max(max).transform((s) => s.replace(/\s+/g, ' '));

const email = z.string().trim().max(254).email();

const contactSchema = z.object({
  formType: z.literal('contact'),
  name: line(100),
  email,
  phone: z.string().trim().max(40).optional().default(''),
  message: z.string().trim().min(1).max(5000),
});

const studioHireSchema = z.object({
  formType: z.literal('studio-hire'),
  name: line(100),
  email,
  phone: line(40),
  eventType: line(100),
  guests: z.coerce.number().int().min(2).max(8),
  rooms: z.array(z.enum(['reformer', 'hot-pilates'])).min(1).max(2),
  date: line(40),
  time: line(100),
  extras: z.array(line(60)).max(10).optional().default([]),
  message: z.string().trim().max(5000).optional().default(''),
});

export const enquirySchema = z.discriminatedUnion('formType', [contactSchema, studioHireSchema]);
export type Enquiry = z.infer<typeof enquirySchema>;

interface Row {
  label: string;
  value: string;
  /** Free-text field typed by the customer (may be long / multi-line) */
  freeText?: boolean;
}

const TITLES: Record<Enquiry['formType'], string> = {
  contact: 'New contact enquiry',
  'studio-hire': 'New studio hire enquiry',
};

/** "2026-10-17" → "Sat 17 Oct 2026"; anything else is returned unchanged */
function formatPreferredDate(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const parsed = new Date(`${date}T12:00:00Z`);
  if (isNaN(parsed.getTime())) return date;
  return parsed
    .toLocaleDateString('en-GB', {
      timeZone: 'UTC',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .replace(',', '');
}

function formatSubmittedAt(submittedAt: Date): string {
  const formatted = submittedAt.toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${formatted} (UK time)`;
}

/** Every field the form collects, labelled, in the order the form shows them */
function buildRows(enquiry: Enquiry): Row[] {
  if (enquiry.formType === 'contact') {
    return [
      { label: 'Name', value: enquiry.name },
      { label: 'Email', value: enquiry.email },
      { label: 'Phone', value: enquiry.phone.replace(/\s+/g, ' ') || 'Not provided' },
      { label: 'Message', value: enquiry.message, freeText: true },
    ];
  }

  const rooms = enquiry.rooms
    .map((room) => {
      const pp = getPerPerson(room, enquiry.guests);
      return room === 'reformer' ? `Reformer Room (£${pp}/person)` : `Hot Pilates Room (£${pp}/person)`;
    })
    .join(' + ');

  return [
    { label: 'Name', value: enquiry.name },
    { label: 'Email', value: enquiry.email },
    { label: 'Phone', value: enquiry.phone },
    { label: 'Event type', value: enquiry.eventType },
    { label: 'Number of guests', value: String(enquiry.guests) },
    { label: 'Room(s)', value: rooms },
    { label: 'Preferred date', value: formatPreferredDate(enquiry.date) },
    { label: 'Preferred time', value: enquiry.time },
    { label: 'Extras requested', value: enquiry.extras.join(', ') || 'None' },
    { label: 'Additional notes', value: enquiry.message || 'None', freeText: true },
  ];
}

export function buildEmail(enquiry: Enquiry, submittedAt: Date): { subject: string; html: string; text: string } {
  const title = TITLES[enquiry.formType];
  const rows = buildRows(enquiry);
  const submitted = formatSubmittedAt(submittedAt);
  const replyHint = `Reply to this email to respond to ${enquiry.name} directly.`;

  const subject =
    enquiry.formType === 'contact'
      ? `${title}: ${enquiry.name}`
      : `${title}: ${enquiry.name}, ${enquiry.eventType}, ${formatPreferredDate(enquiry.date)}`;

  const cell = 'padding:10px 0;border-top:1px solid #e8e4d8;vertical-align:top;font-size:15px;line-height:1.5;';
  const htmlRows = rows
    .map(
      (row) =>
        `<tr>` +
        `<td style="${cell}padding-right:20px;color:#6b705f;white-space:nowrap;">${escapeHtml(row.label)}</td>` +
        `<td style="${cell}color:#1a260e;">${escapeHtml(row.value).replace(/\r?\n/g, '<br>')}</td>` +
        `</tr>`,
    )
    .join('');

  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;color:#1a260e;max-width:600px;">` +
    `<h2 style="margin:0 0 6px;font-size:20px;font-weight:normal;">${escapeHtml(title)}</h2>` +
    `<p style="margin:0 0 20px;font-size:13px;color:#6b705f;">Submitted ${escapeHtml(submitted)} via euforyc.co.uk</p>` +
    `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">${htmlRows}</table>` +
    `<p style="margin:20px 0 0;font-size:13px;color:#6b705f;">${escapeHtml(replyHint)}</p>` +
    `</div>`;

  const text = [
    title.toUpperCase(),
    `Submitted: ${submitted}`,
    '',
    ...rows.map((row) => (row.freeText ? `\n${row.label}:\n${row.value}` : `${row.label}: ${row.value}`)),
    '',
    replyHint,
  ].join('\n');

  return { subject, html, text };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
