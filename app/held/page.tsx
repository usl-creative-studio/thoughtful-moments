import type { Metadata } from "next";
import Link from "next/link";
import { DepositCompleted } from "@/components/deposit-completed";

/**
 * The Stripe return page (Prompt 4). Copy is verbatim from
 * usl-build/6-landing-page-copy.md, "Success and confirmation states". The
 * same tokens as the page: display-2 heading, one paragraph, a link back.
 * Stripe appends `session_id`; its presence gates the analytics event and
 * nothing else, since the webhook, not this page, is what confirms payment.
 */
export const metadata: Metadata = {
  title: "Your slot is held · Thoughtful Moments",
};

type Props = { searchParams: Promise<{ session_id?: string | string[] }> };

export default async function HeldPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const sessionId = typeof session_id === "string" && session_id !== "" ? session_id : undefined;

  return (
    <section className="container py-16 lg:py-24">
      <h1 className="text-display-2 font-medium">Your slot is held.</h1>
      <p className="measure mt-6 text-body">
        We will email you within two days to book the planning call. Your $500 is fully refundable
        until we confirm your date on that call.
      </p>
      <p className="mt-10">
        <Link href="/" className="text-body text-ink">
          Back to Her Night, Your Hands
        </Link>
      </p>
      <DepositCompleted sessionId={sessionId} />
    </section>
  );
}
