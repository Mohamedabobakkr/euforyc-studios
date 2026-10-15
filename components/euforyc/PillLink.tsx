import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import Arrow from './Arrow';

type Variant = 'ink' | 'cream' | 'ghost' | 'line';

interface PillLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: Variant;
  /** Shows the round arrow "dot" at the end of the button */
  dot?: boolean;
  /** Full width on phones */
  stretchMobile?: boolean;
  children: ReactNode;
}

/**
 * Pill button from the studio design system. Internal paths use next/link;
 * anything else (Momence checkout, mail, maps) is a plain anchor, so the
 * site-wide booking click tracking in the layout still sees it.
 */
export default function PillLink({
  href,
  variant = 'ink',
  dot = false,
  stretchMobile = false,
  className = '',
  children,
  ...rest
}: PillLinkProps) {
  const classes = ['eu-btn', `eu-btn--${variant}`, stretchMobile ? 'eu-btn--stretch-mobile' : '', className]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      {children}
      {dot && (
        <span className="eu-btn__dot">
          <Arrow />
        </span>
      )}
    </>
  );

  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
