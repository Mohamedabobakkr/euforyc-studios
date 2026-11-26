import { FLASH_PUBLIC_AT, FLASH_PUBLIC_PERCENT, FLASH_VIP_AT, FLASH_VIP_LIMIT, FLASH_VIP_PERCENT } from './config';

// "Add to calendar": one .ics file with the day's two openings, made in the
// browser. Nothing is sent anywhere.

const pad = (value: number) => String(value).padStart(2, '0');

// 20261127T120000Z
const stamp = (time: number) => {
  const d = new Date(time);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
};

// Commas, semicolons, backslashes and line breaks have a meaning in .ics text
const text = (value: string) => value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

// Lines longer than 75 characters are continued on the next line after a space
const fold = (line: string) => {
  const parts: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    parts.push(rest.slice(0, 74));
    rest = ` ${rest.slice(74)}`;
  }
  parts.push(rest);
  return parts.join('\r\n');
};

interface CalendarEvent {
  id: string;
  start: number;
  title: string;
  description: string;
}

/** The .ics file for the two moments the door opens: 12:00 and 18:00 */
export function buildFlashCalendar(pageUrl: string, createdAt: number = Date.now()): string {
  const events: CalendarEvent[] = [
    {
      id: 'flash-2026-password',
      start: FLASH_VIP_AT,
      title: 'Euforyc Black Friday: the door opens for password holders',
      description: `${FLASH_VIP_PERCENT}% off a 2-class pack for the first ${FLASH_VIP_LIMIT} people with the password. Enter it at ${pageUrl}`,
    },
    {
      id: 'flash-2026-everyone',
      start: FLASH_PUBLIC_AT,
      title: 'Euforyc Black Friday: the door opens for everyone',
      description: `${FLASH_PUBLIC_PERCENT}% off a 2-class pack, until midnight. The code is at ${pageUrl}`,
    },
  ];

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Euforyc Studios//Black Friday//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  events.forEach((event) => {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${event.id}@euforyc.co.uk`,
      `DTSTAMP:${stamp(createdAt)}`,
      `DTSTART:${stamp(event.start)}`,
      // A quarter of an hour: long enough to show in a calendar, short enough to read as "a moment"
      `DTEND:${stamp(event.start + 15 * 60 * 1000)}`,
      `SUMMARY:${text(event.title)}`,
      `DESCRIPTION:${text(event.description)}`,
      `URL:${pageUrl}`,
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${text(event.title)}`,
      'TRIGGER:-PT10M',
      'END:VALARM',
      'END:VEVENT'
    );
  });

  lines.push('END:VCALENDAR');
  return `${lines.map(fold).join('\r\n')}\r\n`;
}
