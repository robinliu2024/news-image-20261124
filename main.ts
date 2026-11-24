// News Image 20261124 — one image that sums up 24 November 2026 world news.
// The image lives in this repository as entry.png (1024x1024 PNG, < 1 MiB).
// This program does nothing but copy those exact bytes to /output/entry.png,
// so every run produces identical output. No network access, no randomness.
// After the copy it reads the output back and compares it byte for byte with
// the source, so a short or corrupt write fails loudly instead of slipping by.
// The OUTPUT_DIR variable exists only for local testing; the harness always
// writes to /output, which is the default when it is unset.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const wanted = readFileSync(source);
const got = readFileSync(target);
if (!wanted.equals(got)) {
  throw new Error(
    `output mismatch: ${target} is ${got.length} bytes, expected ${wanted.length} bytes from ${source}`,
  );
}
console.log(`wrote ${target} (${got.length} bytes, byte-identical to entry.png)`);
