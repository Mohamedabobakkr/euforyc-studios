'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Arrow from '@/components/euforyc/Arrow';
import styles from './home.module.css';

export interface ClassPanel {
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  groupSize: string;
  priceLabel: string;
  image: { src: string; alt: string };
}

/**
 * Desktop "Our Classes": photo panels that widen on hover or focus. With a
 * mouse or keyboard the open panel is one hover or Tab away, so a click goes
 * straight to the class page; on touch, the first tap opens a panel and the
 * second follows the link.
 */
export default function ClassPanels({ classes }: { classes: ClassPanel[] }) {
  const [active, setActive] = useState(0);
  const total = String(classes.length).padStart(2, '0');

  return (
    <div className={styles.panels}>
      {classes.map((item, i) => {
        const open = i === active;
        const number = String(i + 1).padStart(2, '0');
        return (
          <Link
            key={item.slug}
            href={`/classes/${item.slug}`}
            className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') setActive(i);
            }}
            onFocus={() => setActive(i)}
            onClick={(event) => {
              if (!open) {
                event.preventDefault();
                setActive(i);
              }
            }}
          >
            <span className={styles.panelImg}>
              <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 900px) 1px, 60vw" />
            </span>
            <span className={styles.panelShade} />
            <span className={styles.pClosed} aria-hidden="true">
              <span className="eu-cap">{number}</span>
              <span className={styles.pVertical}>{item.name}</span>
              <span className="eu-cap">{item.duration}</span>
            </span>
            <span className={`eu-cap ${styles.pNum}`} aria-hidden="true">
              {number} / {total}
            </span>
            <span className={styles.pOpen}>
              <span className={styles.pName}>{item.name}</span>
              <span className={styles.pSum}>{item.tagline}</span>
              <span className={styles.pFacts}>
                <span className={styles.fact}>{item.duration}</span>
                <span className={styles.fact}>{item.groupSize}</span>
                <span className={styles.fact}>{item.priceLabel}</span>
              </span>
              <span className={styles.pLink}>
                Discover the class <Arrow size={14} />
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
