import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffcf2]">
      <div className="text-center space-y-6 max-w-lg mx-auto px-4">
        <h1 className="font-serif text-6xl text-[#1a260e]">404</h1>
        <h2 className="font-serif text-3xl text-[#1a260e]">Page Not Found</h2>
        <p className="font-sans text-[#1a260e]/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#1a260e] text-[#fffcf2] px-8 py-3 font-sans text-sm tracking-[0.1em] uppercase transition-all duration-500 hover:bg-[#1a260e]/90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}