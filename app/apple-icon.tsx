import { ImageResponse } from "next/og";
import { og, serifFont } from "@/lib/og";

/** The same initial at the size a phone home screen asks for. See app/icon.tsx. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          fontSize: 132,
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
