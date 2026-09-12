import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Merriweather, Homemade_Apple } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

/**
 * Merriweather, variable (founder switched from Fraunces, 2026-09-11). Weight is included by default; `opsz` adds optical
 * sizing so display and body cuts differ. The italic is loaded for the situation
 * paragraph (Module 2) only. Exposed to the theme as --font-serif.
 */
const merriweather = Merriweather({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-merriweather",
});

/** The handwritten face, used in three places only. Exposed as --font-hand. */
const homemadeApple = Homemade_Apple({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-homemade-apple",
});

/**
 * Absolute URLs for the canonical link and the Open Graph image come from
 * NEXT_PUBLIC_SITE_URL. Unset (a fresh clone, `next build` without env) it falls
 * back to localhost so the build never fails on metadata; in every deployment the
 * variable is set (context/production-checklist.md, section 3).
 */
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

const title = "Thoughtful Moments · Her Night, Your Hands";
const description = "One night at home, unmistakably yours. Dallas.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: title, template: "%s · Thoughtful Moments" },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Thoughtful Moments", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  // noindex for the 30-day test; the OG image and canonical still work for a shared link.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${merriweather.variable} ${homemadeApple.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
