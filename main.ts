// One Emoji, One Smile — entry: a single sunflower.
// The gate: /output/entry.txt must be UTF-8 text of 1 to 8 characters,
// not only white space. One emoji, nothing else, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🌻"; // U+1F33B SUNFLOWER — one code point, one grapheme, 4 UTF-8 bytes.

function graphemeCount(s: string): number {
  try {
    return [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(s)].length;
  } catch {
    return [...s].length;
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Loud gate checks: exactly one grapheme, one code point, within 1-8 chars.
if (graphemeCount(EMOJI) !== 1) throw new Error(`gate: expected exactly 1 grapheme, got ${graphemeCount(EMOJI)}`);
if ([...EMOJI].length !== 1) throw new Error(`gate: expected exactly 1 code point, got ${[...EMOJI].length}`);
if (EMOJI.length > 8) throw new Error(`gate: entry exceeds 8 characters (${EMOJI.length})`);
if (!EMOJI.trim()) throw new Error("gate: entry is only whitespace");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
console.log(`wrote ${EMOJI} (${Buffer.byteLength(EMOJI, "utf8")} bytes, 1 grapheme) to ${join(outDir, "entry.txt")}`);
