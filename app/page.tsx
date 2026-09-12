import { Hero } from "@/components/hero";
import { Situation } from "@/components/situation";
import { HowItWorks } from "@/components/how-it-works";
import { YourPart } from "@/components/your-part";
import { Included } from "@/components/included";
import { Price } from "@/components/price";
import { Questions } from "@/components/questions";
import { FounderNote } from "@/components/founder-note";
import { Closing } from "@/components/closing";
import { StickyCta } from "@/components/sticky-cta";

/**
 * The landing page. Modules arrive with Prompts 2 to 8 of
 * usl-build/6-landing-page-build-sequence.md.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Situation />
      <HowItWorks />
      <YourPart />
      <Included />
      <Price />
      <Questions />
      <FounderNote />
      <Closing />
      <StickyCta />
    </>
  );
}
