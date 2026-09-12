import Link from "next/link";

/**
 * The wordmark and nothing else: "Thoughtful Moments" in Fraunces, small caps,
 * letter-spaced, left-aligned. There is no logo file.
 */
export function SiteHeader() {
  return (
    <header className="container flex items-center py-6">
      <Link
        href="/"
        className="small-caps tracking-caps text-body font-medium text-ink no-underline"
      >
        Thoughtful Moments
      </Link>
    </header>
  );
}
