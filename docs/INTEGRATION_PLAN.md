# HyperAgents — Ultra Integration Plan

> Goal: make the 16 HyperBoosters specialist agents **dead-easy to drop into any part of HyperBoosters**, starting with `hyperboosters.com/app` (`~/dev/Improvement/apps/web`).
> Status: PLAN (no code applied to Improvement — multi-CLI active there). Grounded in 2026-05-29 read-only recon.

---

## 1. Reality map — two agent planes that don't touch

**Plane A — In-app product agents** (`apps/web/lib/agents/` + `lib/agent-runtime/`)
- The *customer's* hosted agents (WhatsApp/Telegram), fully self-hosted in Next.js, calling Gemini/OpenRouter/Groq via `llm-runner.ts`.
- Identity: 5 marketing personas (`registry.ts`) + 3 runtime templates (`templates.ts`). Clerk multi-tenant, policy/approval/audit.
- **Does NOT use the 16 specialists.** Zero overlap.

**Plane B — The 16 specialists** (Ravi, Filipe, João, Barnabé…)
- `agents-mcp` (`@hyperboosters/hyperagents` v0.4.0) — MCP/CLI surface for Claude Desktop/Cursor (spawns `openclaw agent`).
- `agents-api-worker` — **LIVE** REST at `api.hyperboosters.com`, key-gated (free 10 / pro 1000 / business 10000 calls/day), Stripe-billed, proxies → `gateway-tunnel.hyperboosters.com` → WSL `hb-agent-adapter:18795` → OpenClaw `:18789`.

**The gap:** the 16 specialists have **zero presence in `/app`**. To put them there, the app must call `api.hyperboosters.com` (Plane B's HTTP layer) — that's the only browser/serverless-reachable path. The OpenClaw gateway is local-only; the embed/runtime paths in the app are Plane A and unrelated.

---

## 2. The integration spine (recommended architecture)

Four layers, built once, consumed everywhere (app, AnotaMeu, embed-widget, future surfaces):

```
┌─ Canonical registry (1 JSON, SSOT)  ── kills the 4-vocabulary drift
│     id ↔ publicSlug ↔ tier ↔ persona ↔ displayName ↔ description
├─ @hyperboosters/agents-client (npm)  ── typed SDK: listAgents(), runAgent(), chat()
│     wraps api.hyperboosters.com; shared request/response types
├─ Next server proxy  /app/api/hyperagents/[slug]/run  ── injects hbk_ key server-side
│     never exposes the API key to the browser; adds Clerk auth + per-org quota
└─ React primitives  useHyperAgent() + <AgentRunner agent="HB_sales"/>  ── drop-in UI
```

**Why this shape:**
- `api.hyperboosters.com` already exists, is live, billed, and tier-gated — **do not reinvent**; the app becomes just another API consumer.
- The API key `hbk_live_*` is a bearer secret → must be called from a **Next server route**, never the browser (CORS is `*`, which invites unsafe client calls). The proxy is the security boundary.
- A typed client + canonical registry means "drop an agent into any page" = `<AgentRunner agent="HB_sales" />` with autocomplete, no hand-rolled fetch.

---

## 3. Phased plan

### P0 — Easy integration into /app (the priority)
Goal: a developer adds a working specialist agent to any `/app` page in <5 min.

1. **Canonical registry** (lane: `agents-mcp`). Single `registry.json` (or `registry.ts` → emits json) mapping the 16: `{ id, publicSlug, toolName(HB_*), displayName, persona, description, tier, model }`. Ship in the npm package. This becomes the SSOT all surfaces import.
2. **`@hyperboosters/agents-client`** (lane: new repo or `agents-mcp/packages/client`). Tiny typed SDK:
   - `listAgents()` → from `/v1/agents` (or bundled registry)
   - `runAgent({ slug, message, signal })` → `/v1/agent/:slug/run`
   - `chat({ agent, messages })` → `/v1/chat` (OpenAI-compat)
   - Shared `types.ts` (request/response) — replaces the inlined shapes in the worker.
3. **Next server proxy** (lane: `Improvement`, coordinate — other CLIs active). `app/api/hyperagents/[slug]/run/route.ts`: Clerk-authed → injects `HYPERAGENTS_API_KEY` (Vercel server env) → calls client SDK → streams/returns. Adds per-org rate accounting if desired.
4. **React primitives** (lane: `Improvement`). `useHyperAgent(slug)` hook + `<AgentRunner agent="HB_sales" />` component (input → calls proxy → renders answer + token/cost footer). Reuse existing UI atoms (KpiStrip, etc.).
5. **One reference integration**: wire one real page (e.g. an "Ask a Specialist" panel in `/app`) to prove the 5-min path.

**Acceptance:** import `<AgentRunner>` on a new page, pick any of 16, get a live answer, key never in browser, Clerk-scoped.

### P1 — Harden + de-drift
- Fix slug drift: worker `whatsapp`↔mcp `wa`, expose missing `creative`, align all to canonical registry.
- Resolve API-key exposure: short-lived per-session token minted by the proxy, or strict origin pinning on the worker for the app surface.
- Real streaming (worker SSE is fake-chunked after full buffer) — stream from gateway for first-token latency in app chat UX.
- `business` Stripe price mapping in worker `PRICE_TO_PLAN` (today business = manual KV).

### P2 — Converge the two planes (optional, higher effort)
- Let Plane A's `chat/[publicToken]` reuse `llm-runner` (today it hand-rolls a raw Gemini fetch, no fallback) — or route it through the client SDK.
- Consider exposing select specialists *inside* the customer product (e.g. a "marketing specialist" assist in the CRM) via the same client.
- Unify the 4 id vocabularies (personas / templates / dock / 16) behind the canonical registry where they semantically overlap (e.g. "Ravi").

### P3 — Distribution polish
- `agents-embed-widget` (`cdn.hyperboosters.com/ravi.js`) consumes the same client SDK → consistent behavior across MCP / API / widget / app.
- Per-client white-label packs (verticals/parceiros already scaffolds this).

---

## 4. Lanes (respect repo isolation — workspace rule #6)

| Lane | Repo | P0 work | Risk |
|---|---|---|---|
| MCP/SSOT | `agents-mcp` | canonical registry + client SDK scaffold | low — my isolated lane |
| API | `agents-api-worker` | expose registry-aligned `/v1/agents`, fix slug drift, business price | med — touches live billing worker (gate) |
| APP | `Improvement` | server proxy route + `useHyperAgent`/`<AgentRunner>` + 1 ref page | **coord — multiple CLIs active**; read-only until a clear pathspec window |

Each lane = separate diff. No cross-repo single refactor.

---

## 5. Gaps / what's missing (today → blocker for "easy")

1. **No shared agent client/SDK** — every consumer hand-rolls fetch; worker types are inlined. → build `@hyperboosters/agents-client`.
2. **No canonical registry** — 4 disjoint id vocabularies (5 personas / 3 templates / 5 dock stubs / 16 specialists). "Ravi" means 3 different things. → one SSOT JSON.
3. **API key is a raw secret with `*` CORS** — unsafe to call from browser; needs a server proxy in the app. → P0 proxy route.
4. **Slug drift** worker↔mcp (`whatsapp`/`wa`), `creative` not exposed by worker. → align to registry.
5. **`agent_runs.organization_id` is UUID but Clerk org ids are text** (`process-inbound.ts:125` drops to null) — if app-side runs rely on org attribution, fix the type first.
6. **No real streaming** — worker fake-chunks; app chat UX will feel laggy (120s buffered).
7. **Two model-call paths in the app** (`llm-runner` vs raw Gemini in `chat/[publicToken]`) — tech debt, not a blocker for B-plane integration.
8. **business tier has no self-serve Stripe price** — manual KV only.

---

## 6. Recommendation (what I'd do first)

1. **Build the canonical registry + client SDK in `agents-mcp` now** (my lane, zero risk, unblocks everyone). Output: `registry.json` shipped in the package + `@hyperboosters/agents-client` (or a `client/` export) with `listAgents/runAgent/chat` + types.
2. **Hand `Improvement` a ready-to-paste server proxy route + `<AgentRunner>` component** (as a PR-able patch or doc), so whichever CLI owns the app lane drops it in without reinventing — respecting that other CLIs are live there.
3. **Then** fix worker drift + business price (api lane, gated since it's live billing).

This makes the priority real: once the SDK + proxy + `<AgentRunner>` exist, adding a specialist to any `/app` page is one import.

---
*Plan only. agents-mcp is the safe lane to start. Improvement edits require a coordinated pathspec window (multiple CLIs active).*
