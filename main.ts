// The Long Roast: Lawmakers and the File They Cannot Convert
// make.fun entry — writes exactly one satirical sentence to /output/entry.txt.
// Deterministic: no input, no network, no randomness, no clock. Exit 0.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "Congress is ready to write four hundred pages of law to govern artificial intelligence, yet the senator holding the pen still emails his intern to ask why the bill will not turn into a PDF — as if the file, not the lawmaker, were the one refusing to cooperate.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate self-check: exactly one sentence, 1–320 characters (excluding the
// trailing newline the file carries). Fail loudly rather than emit a bad entry.
const body = SENTENCE.trim();
const terminators = (body.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !body.endsWith(".") || body.length > 320 || body.length < 1) {
  throw new Error(`invalid entry: ${terminators} terminator(s), ${body.length} chars`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), SENTENCE + "\n", "utf8");
