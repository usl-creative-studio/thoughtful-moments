import { ImageResponse } from "next/og";
import { og, serifFont } from "@/lib/og";

/**
 * The favicon (Prompt 9): the wordmark's initial in the serif, ink on bone.
 * "T" for Thoughtful Moments; the build sequence said "F" from the Firsthand
 * rename the founder reverted (context/decisions.md, "Brand name is Thoughtful
 * Moments, not Firsthand"). A square of bone rather than a mark, so it sits
 * in a tab the way the wordmark sits on the page.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const serif = await serifFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: og.bone,
          color: og.ink,
          fontFamily: "Merriweather",
          fontSize: 24,
          lineHeight: 1,
        }}
      >
        T
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Merriweather", data: serif, weight: 500, style: "normal" }],
    },
  );
}
