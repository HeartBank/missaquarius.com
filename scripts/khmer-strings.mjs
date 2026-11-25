#!/usr/bin/env node
// This site's words for the native readers' Khmer review (/khmer-review): each English page paired with its Khmer twin
// run by run (a paragraph, a heading, a button, an alt text, a title), written as the shared strings contract by the
// skill's static-site engine. The review page lives on demo.missaquarius.com/khmer/missaquarius.com/.
// Founder 2026-11-24: "translate all English texts to khmer", then "add to my father's group".
//
//   node scripts/khmer-strings.mjs                        → staging/khmer-strings.json   (staging/ is ignored; never deployed)
//   node scripts/khmer-strings.mjs apply <pulled.json> [--dry]   → the approved Khmer into the km/ pages
//   node scripts/khmer-capture.mjs                        → the review's pictures (this site served locally, in Khmer)
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL = join(ROOT, "../../.claude/skills/khmer-review");
const { strings, apply } = await import(join(SKILL, "html-site.mjs"));

export const cfg = {
  root: ROOT,
  surface: "missaquarius.com",
  title: "missaquarius.com",
  about: "The pageant institution's site: the annual selection of Miss Aquarius's embodied form (no cycle is scheduled yet).",
  about_km: "គេហទំព័ររបស់ស្ថាប័នប្រកួតបវរកញ្ញា៖ ការជ្រើសរើសប្រចាំឆ្នាំ នូវរូបកាយដែលតំណាង Miss Aquarius (មិនទាន់មានជុំណាមួយត្រូវបានកំណត់នៅឡើយទេ)។",
  accent: "#7a1d1d",
  pages: [
    { id: "home", name: "The front page", name_km: "ទំព័រដើម", en: "index.html", km: "km/index.html" }
  ],
};

const args = process.argv.slice(2);
if (args[0] === "apply") apply(cfg, JSON.parse(readFileSync(args[1], "utf8")), args.includes("--dry") || process.env.npm_config_dry_run === "true");
else strings(cfg);
