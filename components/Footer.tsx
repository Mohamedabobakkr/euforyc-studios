import Link from 'next/link';
import Image from 'next/image';
import PillLink from '@/components/euforyc/PillLink';
import { STUDIO } from '@/lib/site';
import styles from './Footer.module.css';

type FooterLink = { href: string; label: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Book',
    links: [
      { href: '/schedule', label: 'Timetable' },
      { href: '/book', label: 'Book a Class' },
      { href: '/packages-memberships', label: 'Memberships & Packages' },
      { href: '/packages', label: 'Class Packages' },
      { href: '/offers', label: 'Intro Offer' },
      { href: '/gift-cards', label: 'Gift cards' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { href: '/about', label: 'About' },
      { href: '/team', label: 'Team' },
      { href: '/classes', label: 'Classes' },
      { href: '/studio-hire', label: 'Studio Hire' },
      // Skin Studio has its own site; a plain link in the same tab
      { href: 'https://euforycskin.co.uk/', label: 'Skin Studio' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/faq', label: 'FAQ' },
      { href: '/pricing', label: 'Price List' },
      { href: '/reviews', label: 'Reviews' },
      { href: '/shop', label: 'Shop' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      // The Instagram link the footer has always used
      { href: 'https://www.instagram.com/euforycstudios?igsh=b3A0aDNpbXEzczR2&utm_source=qr', label: 'Instagram', external: true },
      { href: STUDIO.social.tiktok, label: 'TikTok', external: true },
      { href: `mailto:${STUDIO.email}`, label: STUDIO.email },
      { href: `tel:${STUDIO.phoneE164}`, label: STUDIO.phoneDisplay },
    ],
  },
];

const Footer = () => {
  return (
    <footer className={`${styles.footer} eu-on-dark`}>
      <div className="eu-wrap">
        <div className={styles.top}>
          <h2 className={styles.title}>
            Your first class{' '}
            <br />
            is <em>waiting</em>.
          </h2>
          <PillLink href="/schedule" variant="cream" dot stretchMobile>
            Book a class
          </PillLink>
        </div>

        <div className={styles.cols}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Euforyc Studios home">
              <Image src="/logo.png" alt="Euforyc Studios" width={625} height={313} sizes="176px" />
            </Link>
            <p className={styles.about}>
              A women-only space for Pilates, wellness and community in the heart of North West London.
            </p>
            <address className={styles.address}>{STUDIO.addressLine}</address>
          </div>

          {columns.map((column) => (
            <nav key={column.title} className={styles.col} aria-labelledby={`footer-${column.title.toLowerCase()}`}>
              <h2 id={`footer-${column.title.toLowerCase()}`}>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : link.href.startsWith('/') ? (
                      <Link href={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={`${styles.bottom} eu-cap`}>
          <span>© {new Date().getFullYear()} Euforyc Studios</span>
          <span>Pilates • Wellness • Strength</span>
          <Link href="/terms">Terms of Service</Link>
          <p className={styles.legal} style={{ textTransform: 'none', letterSpacing: 'normal' }}>
            All rights reserved. All content, designs, graphics, and code are protected by copyright. Unauthorized
            use, copying, or reproduction is strictly prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
