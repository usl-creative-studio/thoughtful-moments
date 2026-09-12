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

export const metadata: Metadata = {
  title: "Thoughtful Moments · Her Night, Your Hands",
  description: "One night at home, unmistakably yours. Dallas.",
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
