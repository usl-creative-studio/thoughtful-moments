import Link from "next/link";

/**
 * The footer line from the copy document:
 * Thoughtful Moments · Dallas, TX · hello@[domain] · Terms and refund policy · Privacy
 * No social icons until the accounts exist.
 */
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export function SiteFooter() {
  return (
    <footer className="container py-10 text-small text-warm-grey">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="small-caps tracking-caps text-ink">Thoughtful Moments</span>
        <span aria-hidden="true">·</span>
        <span>Dallas, TX</span>
        <span aria-hidden="true">·</span>
        {contactEmail ? (
          <a href={`mailto:${contactEmail}`} className="text-ink">
            {contactEmail}
          </a>
        ) : (
          // TODO(founder): set NEXT_PUBLIC_CONTACT_EMAIL once the hello@ mailbox exists.
          <span>hello@[domain]</span>
        )}
        <span aria-hidden="true">·</span>
        <Link href="/terms" className="text-ink">
          Terms and refund policy
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/privacy" className="text-ink">
          Privacy
        </Link>
      </p>
    </footer>
  );
}
