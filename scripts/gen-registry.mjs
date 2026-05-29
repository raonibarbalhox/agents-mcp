#!/usr/bin/env node
// Generates registry.json — a compact machine-readable SSOT of the 16 agents.
// Usage (from repo root, after build): node scripts/gen-registry.mjs
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { AGENTS } = await import(`${root}/dist/agents.js`);

const registry = AGENTS.map(({ id, toolName, publicSlug, displayName, tier, apiExposed }) => ({
  id, toolName, publicSlug, displayName, tier, apiExposed,
}));

const outPath = path.join(root, "registry.json");
writeFileSync(outPath, JSON.stringify(registry, null, 2) + "\n", "utf8");
console.log(`registry.json: ${registry.length} agents written to ${outPath}`);
