import type { ReactNode } from "react";

/**
 * The shape of the two legal pages (Prompt 9): a display-2 title, an h2 per
 * section, and under each one a clearly marked note saying what the founder's
 * reviewed text must cover. Nothing here is legal text; the notes are the
 * brief, not the terms. Static, one column, same tokens as the page. No motion:
 * a man checking the refund terms is about to act.
 */

export type LegalSection = {
  heading: string;
  /** What the founder's reviewed text for this section must say. Shown, not hidden. */
  todo: string;
};

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

/** The placeholder for a section the founder has not written yet. Visible on purpose. */
function Todo({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-body text-warm-grey">
      <span className="small-caps tracking-caps text-caption text-ink">TODO, founder</span>
      <span className="block">{children}</span>
    </p>
  );
}

export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <article className="container measure py-16 lg:py-24">
      <h1 className="text-display-2 font-medium">{title}</h1>
      {/* TODO(founder): replace with the date the reviewed text goes live. */}
      <p className="mt-4 small-caps tracking-caps text-caption text-warm-grey">
        Draft. Reviewed text to follow.
      </p>

      {sections.map(({ heading, todo }) => (
        <section key={heading} className="mt-12">
          <h2 className="text-h3 font-medium">{heading}</h2>
          <Todo>{todo}</Todo>
        </section>
      ))}

      <section className="mt-12">
        <h2 className="text-h3 font-medium">Questions</h2>
        <p className="mt-3 text-body">
          Write to{" "}
          {contactEmail ? (
            <a href={`mailto:${contactEmail}`} className="text-ink">
              {contactEmail}
            </a>
          ) : (
            // TODO(founder): set NEXT_PUBLIC_CONTACT_EMAIL once the hello@ mailbox exists.
            <span>hello@[domain]</span>
          )}
          .
        </p>
      </section>
    </article>
  );
}
