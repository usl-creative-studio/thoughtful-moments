import { ImageResponse } from "next/og";
import { og, serifFont } from "@/lib/og";

/**
 * The link preview (Prompt 9): bone ground, the headline in the serif, the
 * wordmark bottom left. Nothing else: no photograph (the placeholders are
 * generated and labelled as such), no price, no badge. Generated once at build.
 */
export const alt = `${og.wordmark}. ${og.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const serif = await serifFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px 96px",
          backgroundColor: og.bone,
          color: og.ink,
          fontFamily: "Merriweather",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            maxWidth: 900,
          }}
        >
          <span>You love her.</span>
          <span>That was never the question.</span>
        </div>
        {/* Small caps are not available to satori; uppercase at caption size, letter-spaced, stands in. */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {og.wordmark}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Merriweather", data: serif, weight: 500, style: "normal" }],
    },
  );
}
