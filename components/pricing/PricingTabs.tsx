'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import PillLink from '@/components/euforyc/PillLink';
import {
  EUFORYC_PACKAGE,
  MEMBERSHIPS,
  MOVE_PACKAGE,
  PRIVATE_PACKS,
  PRIVATE_SINGLE,
  TRY_IT_ALL,
  membershipTracking,
  packTracking,
  tryItAllTracking,
  type PackOption,
} from './plans';
import styles from './pricing.module.css';

const TABS = [
  { id: 'memberships', label: 'Memberships' },
  { id: 'packages', label: 'Packages' },
  { id: 'private', label: 'Private 1:1' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const CATEGORY = '/packages-memberships';

function Tick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

function Options({
  options,
  kind,
}: {
  options: PackOption[];
  kind: 'euforyc_package' | 'move_package' | 'private_pack';
}) {
  return (
    <ul className={styles.opts} style={{ ['--cols' as string]: options.length }}>
      {options.map((option) => (
        <li key={option.url}>
          <a
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.opt}
            {...packTracking(kind, option, CATEGORY)}
          >
            <span className={styles.optN}>{option.name}</span>
            <span className={styles.optP}>£{option.price}</span>
            {option.note && <span className={styles.optS}>{option.note}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Memberships / Packages / Private 1:1. Every panel is in the HTML (inactive
 * ones are hidden), so all prices stay readable without JavaScript.
 */
export default function PricingTabs({
  packageNote,
  moveNote,
  privateFor,
  membershipNote,
}: {
  packageNote: string;
  moveNote: string;
  privateFor: string[];
  membershipNote: string[];
}) {
  const [tab, setTab] = useState<TabId>('memberships');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs, as screen reader users expect
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className={styles.tabsSec} id="options" aria-labelledby="options-title">
      <div className={`${styles.tabsHead} eu-rv`}>
        <h2 id="options-title" className="eu-h2">
          Choose your <em>rhythm</em>
        </h2>
        <div className={styles.seg} role="tablist" aria-label="Pricing options">
          {TABS.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-controls={`panel-${item.id}`}
              aria-selected={tab === item.id}
              tabIndex={tab === item.id ? 0 : -1}
              className={styles.sg}
              onClick={() => setTab(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Memberships */}
      <div role="tabpanel" id="panel-memberships" aria-labelledby="tab-memberships" hidden={tab !== 'memberships'}>
        <ul className={styles.tiers}>
          {MEMBERSHIPS.map((plan) => {
            const dark = plan.classes === null;
            return (
              <li key={plan.name}>
                <article className={`${styles.tier} ${dark ? `${styles.tierDark} eu-on-dark` : ''}`}>
                  {dark && <span className={styles.badge}>Best value</span>}
                  <div>
                    <h3 className={styles.tName}>{plan.name}</h3>
                    <div className={styles.tSub}>{plan.sub}</div>
                  </div>
                  <div>
                    <div className={styles.tPrice}>
                      <span className={styles.big}>£{plan.price}</span>
                      <span>/ month</span>
                    </div>
                    <div className={styles.tPc}>{plan.perClass}</div>
                  </div>
                  <ul className={styles.tList}>
                    {/* Unlimited's full list of perks is in its own section below */}
                    {plan.features.slice(0, dark ? 4 : undefined).map((feature) => (
                      <li key={feature}>
                        <Tick />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {dark && plan.features.length > 4 && (
                      <li>
                        <Tick />
                        <a href="#unlimited-title" className="underline underline-offset-4">
                          And {plan.features.length - 4} more Unlimited perks
                        </a>
                      </li>
                    )}
                  </ul>
                  <PillLink
                    href={plan.url}
                    variant={dark ? 'cream' : 'ink'}
                    className="eu-btn--block"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...membershipTracking(plan, CATEGORY)}
                  >
                    Join {plan.name}
                  </PillLink>
                </article>
              </li>
            );
          })}
        </ul>
        <div className={styles.fine}>
          {membershipNote.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div role="tabpanel" id="panel-packages" aria-labelledby="tab-packages" hidden={tab !== 'packages'}>
        <div className={styles.pkGrid}>
          <div className={`${styles.introCard} eu-on-dark`}>
            <Image
              src="/hero/IMG_8686.JPG"
              alt="A member stretching on a reformer"
              fill
              sizes="(max-width: 1000px) 100vw, 40vw"
              style={{ objectPosition: '50% 25%' }}
            />
            <div className={styles.introShade} />
            <div className={styles.introIn}>
              <span className={`eu-cap ${styles.introLabel}`}>First-time clients</span>
              <h3 className={styles.introName}>
                Try It <em>All</em>
              </h3>
              <div className={styles.introPrice}>
                <span className={styles.big}>£{TRY_IT_ALL.price}</span>
                <span>for {TRY_IT_ALL.classes} classes</span>
              </div>
              <p>Any three group classes. Valid 20 days from your first class.</p>
              <PillLink
                href={TRY_IT_ALL.url}
                variant="cream"
                dot
                target="_blank"
                rel="noopener noreferrer"
                {...tryItAllTracking(CATEGORY)}
              >
                Get Try It All
              </PillLink>
            </div>
          </div>
          <div className={styles.pkStack}>
            <div className={styles.pk}>
              <div className={styles.pkH}>
                <h3>
                  Euforyc <em>Package</em>
                </h3>
                <span>{packageNote}</span>
              </div>
              <Options options={EUFORYC_PACKAGE} kind="euforyc_package" />
            </div>
            <div className={styles.pk}>
              <div className={styles.pkH}>
                <h3>
                  <em>MOVE</em>
                </h3>
                <span>{moveNote}</span>
              </div>
              <Options options={MOVE_PACKAGE} kind="move_package" />
            </div>
          </div>
        </div>
      </div>

      {/* Private 1:1 */}
      <div role="tabpanel" id="panel-private" aria-labelledby="tab-private" hidden={tab !== 'private'}>
        <div className={styles.pkGrid}>
          <div className={`${styles.introCard} eu-on-dark`}>
            <Image src="/ps.jpg" alt="The Cadillac reformer in the private studio" fill sizes="(max-width: 1000px) 100vw, 40vw" />
            <div className={styles.introShade} />
            <div className={styles.introIn}>
              <span className={`eu-cap ${styles.introLabel}`}>One-to-one · 60 minutes</span>
              <h3 className={styles.introName}>
                Private <em>sessions</em>
              </h3>
              <div className={styles.introPrice}>
                <span className={styles.big}>£{PRIVATE_SINGLE}</span>
                <span>single session</span>
              </div>
              <p>1:1 Private Reformer or 1:1 Private Cadillac Reformer — planned around your goals, body and pace.</p>
            </div>
          </div>
          <div className={styles.pkStack}>
            <div className={styles.pk}>
              <div className={styles.pkH}>
                <h3>
                  Session <em>packs</em>
                </h3>
                <span>Valid 90 days · not included in group packages or memberships</span>
              </div>
              <Options options={PRIVATE_PACKS} kind="private_pack" />
            </div>
            <div className={`${styles.pk} ${styles.pkBeige}`}>
              <div className={styles.pkH}>
                <h3>
                  Who it’s <em>for</em>
                </h3>
              </div>
              <ul className={styles.who}>
                {privateFor.map((line, i) => (
                  <li key={line}>
                    <span aria-hidden="true">{['i.', 'ii.', 'iii.', 'iv.', 'v.'][i]}</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
