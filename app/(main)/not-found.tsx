import PillLink from '@/components/euforyc/PillLink';

export default function NotFound() {
  return (
    <div className="eu-page-top flex min-h-screen items-center justify-center bg-eu-cream">
      <div className="mx-auto max-w-lg space-y-6 px-5 py-[clamp(64px,8vw,120px)] text-center">
        <h1 className="font-serif text-[clamp(110px,18vw,220px)] font-normal italic leading-[0.85] tracking-[-0.04em] text-eu-ink">404</h1>
        <h2 className="font-serif text-[clamp(32px,3.6vw,48px)] font-normal leading-[1.1] tracking-[-0.02em] text-eu-ink">Page Not Found</h2>
        <p className="eu-lede">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <PillLink href="/" variant="ink" dot stretchMobile>
            Back to Home
          </PillLink>
        </div>
      </div>
    </div>
  );
}
