import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared by the Open Graph image and the favicon (Prompt 9): the tokens from
 * app/globals.css as plain values, since satori reads no CSS, and the serif as
 * a font file it can parse. Merriweather 500 static instance (OFL), fetched from
 * Google Fonts and vendored so image generation needs no network at build.
 * Merriweather, not Fraunces: context/decisions.md, "Merriweather replaces Fraunces".
 */
export const og = {
  bone: "#f4efe6",
  ink: "#1c1917",
  warmGrey: "#6b625b",
  headline: "You love her. That was never the question.",
  wordmark: "Thoughtful Moments",
} as const;

export async function serifFont(): Promise<ArrayBuffer> {
  const file = await readFile(join(process.cwd(), "app/fonts/merriweather-500.ttf"));
  // A Node Buffer's ArrayBuffer may be a shared pool; copy the exact bytes out.
  return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
}
