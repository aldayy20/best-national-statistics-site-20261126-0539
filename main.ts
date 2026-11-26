// NusaStats hand-in program (Node 22, standard library only). It copies the
// static site in app/ and the screenshots/ folder beside this file into the
// output directory and writes /output/dossier.json with the vendored make.fun
// library, exactly as the kit's starter does. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The run must be deterministic: the same input files always produce the same
// output bytes, so the grader's two runs match byte for byte.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps (from the kit's reference/gate.json): only
// text_max_bytes shapes the bytes; the others refuse an entry the scorer
// would refuse (more than 4 screenshots or one over 256 KiB; more than 993
// files and directories in app/ or 16 MiB of app files).
const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(out, 'dossier.json'), dossier);

// Fail loudly instead of handing in an empty dossier: the grader's two runs
// must both write the same real bytes, and an empty file would pass silently.
if (dossier.length === 0) throw new Error('dossier.json is empty');
console.log(`NusaStats handed in to ${out} (${dossier.length} byte dossier)`);
