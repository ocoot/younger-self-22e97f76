// One Line to Your Younger Self — entry program.
//
// Writes a single line, in English, addressed to the writer's younger self,
// to $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output/entry.txt).
// The line is a fixed string chosen in this session: a specific, costly piece
// of foreknowledge only an older self could carry — the money about to be lent
// to a best friend is already gone, and the turn is to lend it anyway.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The money you're about to lend your best friend is already gone \u2014 lend it anyway, and buy the cheaper lesson.";

function main(): void {
  // The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
  // not only whitespace. Refuse to write anything that fails it.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line is only whitespace");
  }
  if (LINE.includes("\n")) {
    throw new Error("line must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
