"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Fires `deposit_completed` once when /held mounts with a Stripe session id
 * in the URL. Renders nothing.
 *
 * `track` drops the call silently until `<Analytics />` has installed
 * `window.va`, and its effect runs after this one (it sits later in the
 * tree), so this waits for the queue before firing rather than firing into
 * nothing. React Strict Mode runs effects twice in development only; in
 * production this is one call per arrival.
 */

/** How long to wait for the analytics queue before giving up, in ms. */
const readyTimeout = 5000;
const readyInterval = 50;

export function DepositCompleted({ sessionId }: { sessionId: string | undefined }) {
  useEffect(() => {
    if (!sessionId) return;

    let waited = 0;
    const timer = setInterval(() => {
      waited += readyInterval;
      if (window.va) {
        clearInterval(timer);
        track("deposit_completed");
      } else if (waited >= readyTimeout) {
        clearInterval(timer);
      }
    }, readyInterval);

    return () => clearInterval(timer);
  }, [sessionId]);

  return null;
}
