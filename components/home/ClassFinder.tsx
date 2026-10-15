'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PillLink from '@/components/euforyc/PillLink';
import type { ClassPanel } from './ClassPanels';
import styles from './home.module.css';
import { spotsText, stillUpcoming, type SlimEvent } from './types';

type Goal = 'strength' | 'sweat' | 'tone' | 'recover' | 'fun' | 'private';
type Level = 'new' | 'some' | 'regular';
type When = 'morning' | 'midday' | 'evening' | 'weekend';

const GOALS: [Goal, string][] = [
  ['strength', 'Strength & posture'],
  ['sweat', 'A real sweat'],
  ['tone', 'Tone & sculpt'],
  ['recover', 'Recover & reset'],
  ['fun', 'Dance & have fun'],
  ['private', 'One-to-one attention'],
];
const LEVELS: [Level, string][] = [
  ['new', 'Completely new'],
  ['some', 'Tried it before'],
  ['regular', 'I go regularly'],
];
const WHENS: [When, string][] = [
  ['morning', 'Mornings'],
  ['midday', 'Midday'],
  ['evening', 'Evenings'],
  ['weekend', 'Weekends'],
];

// Which class in lib/classes.ts answers each goal
const GOAL_CLASS: Record<Goal, string> = {
  strength: 'reformer-pilates',
  sweat: 'hot-pilates',
  tone: 'sculpt-mat-pilates',
  recover: 'red-light-stretch-mobility',
  fun: 'belly-dance',
  private: 'private-reformer-pilates',
};

function inWindow(event: SlimEvent, when: When): boolean {
  if (when === 'weekend') return event.weekday === 'Sat' || event.weekday === 'Sun';
  if (when === 'morning') return event.hour < 12;
  if (when === 'midday') return event.hour >= 12 && event.hour < 17;
  return event.hour >= 17;
}

interface ClassFinderProps {
  classes: ClassPanel[];
  /** Group classes in the coming week */
  events: SlimEvent[];
  renderedAt: number;
  tryItAll: { href: string; label: string; tracking: Record<string, string> };
}

/**
 * "Find your class": three questions, then a class from lib/classes.ts with
 * real upcoming times from the live timetable.
 */
export default function ClassFinder({ classes, events, renderedAt, tryItAll }: ClassFinderProps) {
  const [goal, setGoal] = useState<Goal>('strength');
  const [level, setLevel] = useState<Level>('new');
  const [when, setWhen] = useState<When>('evening');
  const [now, setNow] = useState(renderedAt);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const slug = GOAL_CLASS[goal];
  const match = classes.find((item) => item.slug === slug) ?? classes[0];
  const beginner = goal === 'strength' && level === 'new';
  const isPrivate = goal === 'private';

  let sessions = stillUpcoming(events, now).filter((event) => event.slug === slug);
  if (beginner) {
    const beginnerOnly = sessions.filter((event) => /beginner/i.test(event.title));
    if (beginnerOnly.length > 0) sessions = beginnerOnly;
  }
  const atThatTime = sessions.filter((event) => inWindow(event, when));
  const closest = atThatTime.length === 0 && sessions.length > 0;
  const slots = (closest ? sessions : atThatTime).slice(0, 2);

  const name = beginner ? `Beginner ${match.name}` : match.name;
  const why = beginner
    ? 'Start with a class labelled Beginner — your instructor sets your springs and walks you through the machine.'
    : match.tagline;

  const questions = [
    { n: 'i.', label: 'What are you looking for?', options: GOALS, value: goal, set: setGoal },
    { n: 'ii.', label: 'How familiar is Pilates?', options: LEVELS, value: level, set: setLevel },
    { n: 'iii.', label: 'When suits you best?', options: WHENS, value: when, set: setWhen },
  ] as const;

  return (
    <div className={styles.qzGrid}>
      <div>
        {questions.map((question) => (
          <fieldset key={question.n} className={styles.qzStep}>
            <legend className={styles.qzLabel}>
              <span className={styles.qzN} aria-hidden="true">
                {question.n}
              </span>
              <span className={styles.qzQ}>{question.label}</span>
            </legend>
            <div className={styles.opts}>
              {question.options.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={styles.op}
                  aria-pressed={question.value === value}
                  onClick={() => (question.set as (next: string) => void)(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className={styles.result}>
        <div className={styles.resImg}>
          <Image key={match.slug} src={match.image.src} alt={match.image.alt} fill sizes="(max-width: 900px) 100vw, 45vw" />
          <span className={`eu-cap ${styles.resTag}`}>Your match</span>
        </div>
        <div className={styles.resIn}>
          <div aria-live="polite">
            <h3 className={styles.resName}>{name}</h3>
            <p className={styles.resWhy}>{why}</p>
          </div>
          <div className={styles.resFacts}>
            <span>{match.duration}</span>
            <span>{match.groupSize}</span>
            <span>{match.priceLabel}</span>
          </div>

          {isPrivate || slots.length === 0 ? (
            <ul className={styles.slots} style={{ marginTop: 20 }}>
              <li>
                <Link href="/schedule" className={styles.slot}>
                  <span>
                    <b>See times</b> · on the live timetable
                  </span>
                </Link>
              </li>
            </ul>
          ) : (
            <>
              <p className={styles.slotsNote}>
                {closest ? 'Nothing at that time this week. The closest times:' : 'Coming up on the timetable:'}
              </p>
              <ul className={styles.slots}>
                {slots.map((slot) => (
                  <li key={slot.id}>
                    <a
                      href={slot.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.slot}
                      data-content-name={slot.title}
                      data-content-category="class_booking"
                      data-content-type="class"
                    >
                      <span>
                        <b>{slot.time}</b> · {slot.dayLabel}
                      </span>
                      <span className={styles.slotMeta}>
                        {slot.instructor ? `${slot.instructor} · ` : ''}
                        {spotsText(slot)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className={styles.resCtas}>
            {isPrivate ? (
              <PillLink href={`/classes/${match.slug}`} variant="ink" dot>
                See private sessions
              </PillLink>
            ) : level === 'regular' ? (
              <PillLink href={`/classes/${match.slug}`} variant="ink" dot>
                About this class
              </PillLink>
            ) : (
              <PillLink href={tryItAll.href} variant="ink" dot target="_blank" rel="noopener noreferrer" {...tryItAll.tracking}>
                {tryItAll.label}
              </PillLink>
            )}
            <PillLink href="/schedule" variant="line">
              See timetable
            </PillLink>
          </div>
        </div>
      </div>
    </div>
  );
}
