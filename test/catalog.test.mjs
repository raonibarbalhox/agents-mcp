// Catalog integrity smoke tests — no OpenClaw gateway required.
// Validates the static AGENTS catalog that drives MCP tool registration.
// Run: npm test  (builds first, then `node --test`).

import { test } from "node:test";
import assert from "node:assert/strict";
import { AGENTS } from "../dist/agents.js";

const REQUIRED_FIELDS = ["id", "toolName", "displayName", "description", "example"];
// MCP tool names: alphanumeric + underscore (MCP/Anthropic-safe: ^[A-Za-z0-9_-]{1,64}$).
const TOOL_NAME_RE = /^[A-Za-z][A-Za-z0-9_]*$/;
// HyperBoosters convention: every public tool is namespaced HB_<function>.
const HB_PREFIX_RE = /^HB_/;

test("catalog exposes the expected number of agents", () => {
  assert.equal(AGENTS.length, 16, `expected 16 agents, got ${AGENTS.length}`);
});

test("every agent has all required non-empty string fields", () => {
  for (const a of AGENTS) {
    for (const f of REQUIRED_FIELDS) {
      assert.equal(typeof a[f], "string", `agent ${a.id ?? "?"} field ${f} must be string`);
      assert.ok(a[f].trim().length > 0, `agent ${a.id ?? "?"} field ${f} must be non-empty`);
    }
  }
});

test("agent ids are unique", () => {
  const ids = AGENTS.map((a) => a.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate agent id found");
});

test("tool names are unique, MCP-safe, and HB_-namespaced", () => {
  const names = AGENTS.map((a) => a.toolName);
  assert.equal(new Set(names).size, names.length, "duplicate toolName found");
  for (const n of names) {
    assert.match(n, TOOL_NAME_RE, `toolName "${n}" is not MCP-safe`);
    assert.match(n, HB_PREFIX_RE, `toolName "${n}" must be HB_-namespaced`);
  }
});

test("descriptions are substantial enough for LLM tool selection", () => {
  for (const a of AGENTS) {
    assert.ok(
      a.description.length >= 40,
      `agent ${a.id} description too short (${a.description.length} chars) for reliable tool selection`,
    );
  }
});
