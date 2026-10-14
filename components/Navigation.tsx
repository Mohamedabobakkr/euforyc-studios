'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { STUDIO } from '@/lib/site';
import styles from './Navigation.module.css';

type NavItem = {
  href: string;
  label: string;
};

// The five most visited pages: in the header bar and large in the menu
const priorityItems: NavItem[] = [
  { href: '/schedule', label: 'Timetable' },
  { href: '/packages-memberships', label: 'Memberships & Packages' },
  { href: '/offers', label: 'Intro Offer' },
  { href: '/classes', label: 'Our Classes' },
  { href: '/skin-studio', label: 'Skin Studio' },
];

// Every other page the menu has always linked to
const studioItems: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/gift-cards', label: 'Gifting' },
  { href: '/studio-hire', label: 'Studio Hire' },
  { href: '/shop', label: 'Merchandise' },
  { href: '/pricing', label: 'Price List' },
  { href: '/book', label: 'Booking' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Burger() {
  return (
    <span className={styles.burger} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // The button that opened the menu gets focus back when the menu is
  // dismissed (Close or Escape), but not after following a link
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef(false);

  const current = (href: string) => (pathname === href ? 'page' : undefined);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    openerRef.current = event.currentTarget;
    setIsOpen(true);
  };

  const dismissMenu = useCallback(() => {
    restoreFocusRef.current = true;
    setIsOpen(false);
  }, []);

  const followLink = useCallback(() => {
    restoreFocusRef.current = false;
    setIsOpen(false);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // While open: lock page scroll, move focus in, trap Tab, close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dismissMenu();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const opener = openerRef.current;
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      root.style.overflow = previousOverflow;
      if (restoreFocusRef.current && opener?.isConnected) opener.focus();
      restoreFocusRef.current = false;
    };
  }, [isOpen, dismissMenu]);

  return (
    <>
      <header className={styles.hdr}>
        <div className={styles.inner}>
          <nav className={styles.left} aria-label="Primary">
            <button
              type="button"
              className={`${styles.menuBtn} ${styles.mobileOnly}`}
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="site-menu"
            >
              <Burger />
            </button>
            <Link href="/schedule" className={styles.link} aria-current={current('/schedule')}>
              <span className="eu-live-dot" aria-hidden="true" />
              Timetable
            </Link>
            <Link href="/packages-memberships" className={styles.link} aria-current={current('/packages-memberships')}>
              Memberships &amp; Packages
            </Link>
            <Link href="/offers" className={styles.link} aria-current={current('/offers')}>
              Intro Offer
            </Link>
          </nav>

          <Link href="/" className={styles.logo} aria-label="Euforyc Studios home">
            <Image
              src="/logo.png"
              alt="Euforyc Studios"
              width={625}
              height={313}
              loading="eager"
              sizes="(max-width: 1100px) 96px, 148px"
            />
          </Link>

          <div className={styles.right}>
            <Link href="/classes" className={styles.link} aria-current={current('/classes')}>
              Classes
            </Link>
            <Link href="/skin-studio" className={`${styles.link} ${styles.skin}`}>
              Skin Studio
              <span className={styles.skinDot} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={openMenu}
              aria-expanded={isOpen}
              aria-controls="site-menu"
            >
              Menu
              <Burger />
            </button>
            <Link href="/schedule" className={styles.book}>
              Book
            </Link>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          ref={dialogRef}
          id="site-menu"
          className={styles.mega}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className={styles.megaTop}>
            <Image src="/logo.png" alt="Euforyc Studios" width={625} height={313} sizes="112px" />
            <button ref={closeRef} type="button" className={styles.menuBtn} onClick={dismissMenu}>
              Close
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className={styles.megaGrid}>
            <nav className={styles.megaMain} aria-label="Most visited">
              {priorityItems.map((item, index) => (
                <Link key={item.href} href={item.href} onClick={followLink} aria-current={current(item.href)}>
                  <span className={styles.megaNum} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav className={styles.megaSub} aria-labelledby="site-menu-studio">
              <h2 id="site-menu-studio">The studio</h2>
              {studioItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={followLink} aria-current={current(item.href)}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <a href={STUDIO.mapsUrl} className={styles.megaCard} target="_blank" rel="noopener noreferrer" onClick={followLink}>
              <Image
                src="/hero/IMG_4879.JPG"
                alt="The Euforyc Studios shopfront on Holmstall Parade"
                fill
                sizes="(max-width: 900px) 100vw, 30vw"
              />
              <span className={styles.megaCardIn}>
                <span className="eu-cap" style={{ color: '#F5F0E8' }}>
                  Visit us
                </span>
                <span className={styles.megaCardTitle} style={{ display: 'block' }}>
                  {STUDIO.address.street},{' '}
                  <br />
                  {STUDIO.address.locality}, {STUDIO.address.postcode}
                </span>
              </span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
