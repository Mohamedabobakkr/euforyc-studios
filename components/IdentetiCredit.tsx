import type { CSSProperties } from 'react';

/**
 * "Site by Identeti" footer credit. The Identeti logo (public/identeti-logo.png,
 * 334×80, transparent) is a CSS mask filled with currentColor and sized in em,
 * so each footer sets its colour and size through the classes it passes.
 * The link's name is the visually hidden "Identeti".
 */
const visuallyHidden = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;

// The logo's small capitals are 51 of its 80 px; the tall "I." takes the full height.
const LOGO = { width: 334, height: 80, capitals: 51 };

type Props = {
  className?: string;
  linkClassName?: string;
  /** Height of the logo's small capitals, in em of the line it sits in. */
  capHeight?: number;
};

export default function IdentetiCredit({ className, linkClassName, capHeight = 0.72 }: Props) {
  const height = (capHeight * LOGO.height) / LOGO.capitals;
  const logo: CSSProperties = {
    display: 'block',
    height: `${height.toFixed(3)}em`,
    width: `${((height * LOGO.width) / LOGO.height).toFixed(3)}em`,
    backgroundColor: 'currentColor',
    WebkitMaskImage: 'url(/identeti-logo.png)',
    maskImage: 'url(/identeti-logo.png)',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    forcedColorAdjust: 'none',
  };
  return (
    <p className={className}>
      Site by{' '}
      <a href="https://identeti.com" target="_blank" rel="noopener" className={linkClassName}>
        <span style={visuallyHidden}>Identeti</span>
        <span aria-hidden="true" style={logo} />
      </a>
    </p>
  );
}
