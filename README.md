<div align="center">

# HyperAgents

### 16 specialist AI agents as MCP tools — for Claude Desktop, Cursor, Codex, Windsurf, Cline, and every MCP-aware client.

[![npm version](https://img.shields.io/npm/v/@hyperboosters/hyperagents.svg?style=flat-square&color=8B5CF6&label=npm)](https://www.npmjs.com/package/@hyperboosters/hyperagents)
[![npm downloads](https://img.shields.io/npm/dm/@hyperboosters/hyperagents.svg?style=flat-square&color=10B981)](https://www.npmjs.com/package/@hyperboosters/hyperagents)
[![MCP compatible](https://img.shields.io/badge/MCP-compatible-orange.svg?style=flat-square)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%E2%89%A518-blue.svg?style=flat-square)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](./LICENSE)
[![Made in Brazil](https://img.shields.io/badge/made%20in-Brazil-yellow.svg?style=flat-square)](https://hyperboosters.com)

[Quickstart](#-quickstart-30-seconds) ·
[Agents](#-the-16-agents) ·
[Install Matrix](#-install-matrix) ·
[How It Works](#-how-it-works) ·
[Multi-Provider](#-multi-provider-llms) ·
[Roadmap](#-roadmap)

---

> Stop copy-pasting between tabs. Talk to **Ravi**, **Filipe**, **Tiago**, **João** and 12 other specialist agents **directly from your IDE / chat client**, with one `npx` install.

</div>

```text
You    : "Cursor, ask ravi_sales how to handle 'too expensive' objection
          from a clinic owner in pt-BR"
Cursor : [calls ravi_sales over MCP → gets sales script]
       : Here's a 3-step objection framework Ravi recommends: ...
```

## Why HyperAgents

| Problem | HyperAgents Solution |
|---|---|
| You bounce between ChatGPT, Claude, Gemini, in-product copilots | **One MCP install = 16 specialists** inside the AI client you already use |
| Generic agents give generic answers | Each agent is **persona-tuned + model-routed** for a specific job (sales, code, devops, security, …) |
| Brazilian context = bad output from US-trained models | **5 native pt-BR agents** trained on Brazilian SaaS/SMB market reality |
| You don't want to pick a model | Each agent has a **primary + fallback chain** across OpenAI gpt-5.5, Gemini 2.5, Claude, OpenRouter free tier, local Ollama |
| Multi-provider OAuth nightmare | OpenClaw handles auth once. MCP server just calls the agent — your client never sees a provider key |

---

## ⚡ Quickstart (30 seconds)

```bash
# 1. Make sure OpenClaw is running (one-time setup)
# https://docs.openclaw.ai/getting-started

# 2. Add HyperAgents to your MCP client config:
{
  "mcpServers": {
    "hyperagents": {
      "command": "npx",
      "args": ["-y", "@hyperboosters/hyperagents"]
    }
  }
}

# 3. Restart your client. 16 new tools appear:
#    ravi_jarvis, ravi_sales, ravi_whatsapp, coding_filipe,
#    devops_tomas, analysis_joao, marketing_tiago, ...
```

Done. Now ask your AI:

> "Use `analysis_joao` to give me a SWOT for entering BR healthcare SMB."

---

## 🧠 The 16 Agents

Agents are grouped by **persona role** + **model tier**. Pick by **what they're good at**, not which model they use.

### Brazilian Specialists (pt-BR native)

| Tool | Role | Model Tier | Best For |
|---|---|---|---|
| `ravi_jarvis` | Owner Jarvis (founder-mode generalist) | gpt-5.5 + gemini-2.5-pro reasoning | Infra, devops, business strategy, anything-goes BR context |
| `ravi_sales` | B2B Sales (HyperBoosters Comercial) | gpt-5.5 | Lead qualification, objection handling, pt-BR sales scripts |
| `ravi_whatsapp` | WhatsApp Strategist | gpt-5.5 | WA broadcasts, group dynamics, status copy, voice-note scripts |
| `analysis_joao` | Strategic Analysis | Ollama local (Gemma 4e4b) | MECE, SWOT, market sizing, pyramid principle — all in pt-BR |
| `marketing_tiago` | Marketing (free-tier) | OpenRouter Qwen3.6 | Content calendars, ad copy, growth hacks, bilingual |

### Engineering & Operations

| Tool | Role | Model Tier | Best For |
|---|---|---|---|
| `coding_filipe` | Senior Coding (Cid) | gpt-5.5 | Code review, refactoring, architecture, TS/Python/Go |
| `devops_tomas` | DevOps + SRE (Barret) | gpt-5.5 | CI/CD, K8s manifests, systemd units, observability |
| `security_audit` | App Security | Gemini 2.5 Flash | OWASP, threat modeling, RLS, OAuth, LGPD/GDPR |
| `sre_ops` | Reliability Engineer | gpt-5.5 | SLO/SLI design, postmortems, chaos engineering |
| `mcp_builder` | MCP Specialist (meta-agent) | Gemini 2.5 Flash | MCP protocol, plugin development, tool schema design |

### Product, Sales & Research

| Tool | Role | Model Tier | Best For |
|---|---|---|---|
| `pm_product` | Product Manager | gpt-5.5 | PRDs, sprint planning, RICE/MoSCoW, OKRs |
| `sales_lucas` | Outbound Sales (free-tier) | OpenRouter Llama 3.3 70B | Cold email, LinkedIn DMs (cheaper than ravi_sales) |
| `creative` | Creative — Copy & Concepts | OpenRouter Llama 3.3 | Brand naming, taglines, brainstorming, bilingual |
| `navigator_research` | Web Research Navigator (Barnabé) | OpenRouter Stepfun + web tools | Market research, competitor analysis, fact-checking |
| `brain_curator` | Memory Specialist | Gemini 2.5 Flash | Knowledge base organization, RAG strategy, memory hierarchies |
| `main` | RaoAI Main (generalist fallback) | Gemini 2.5 Flash | Fallback when no specialist fits |

> **Cost-aware routing:** free-tier agents (`creative`, `sales_lucas`, `marketing_tiago`, `navigator_research`) carry zero marginal cost. Premium agents (`ravi_*`, `coding_filipe`, `devops_tomas`, `pm_product`, `sre_ops`) use gpt-5.5 for max quality.

---

## 📦 Install Matrix

### Claude Desktop

Edit your config:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%/Claude/claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "hyperagents": {
      "command": "npx",
      "args": ["-y", "@hyperboosters/hyperagents"]
    }
  }
}
```

Restart Claude. Look for the 🔌 tool icon — 16 new tools.

### Cursor

`Settings → Tools & MCP → Add MCP Server`

```json
{
  "hyperagents": {
    "command": "npx",
    "args": ["-y", "@hyperboosters/hyperagents"]
  }
}
```

### Codex CLI

`~/.codex/config.toml`:

```toml
[[mcp_servers]]
name = "hyperagents"
command = "npx"
args = ["-y", "@hyperboosters/hyperagents"]
```

### Windsurf

`~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "hyperagents": {
      "command": "npx",
      "args": ["-y", "@hyperboosters/hyperagents"]
    }
  }
}
```

### Cline (VS Code)

Cline MCP settings → Add server:

```json
{
  "hyperagents": {
    "command": "npx",
    "args": ["-y", "@hyperboosters/hyperagents"]
  }
}
```

### Manual install (faster cold start)

```bash
npm install -g @hyperboosters/hyperagents
# Then in MCP config:
#   "command": "hyperagents-mcp"
```

---

## 🔧 How It Works

```
┌──────────────────────┐
│  Your MCP Client     │  Claude Desktop · Cursor · Codex · Windsurf
│  (the AI talks here) │
└──────────┬───────────┘
           │ stdio (MCP protocol)
           ▼
┌──────────────────────┐
│  hyperagents (npx)   │  16 tools registered
│  Node MCP server     │  ListTools / CallTool
└──────────┬───────────┘
           │ spawn: openclaw agent --agent <id> -m "<msg>" --json
           ▼
┌──────────────────────┐
│  OpenClaw Runtime    │  Agent loader, system prompt, memory, skills
│  (local or remote)   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│  Multi-provider model layer                              │
│  ├─ OpenAI (gpt-5.5, gpt-5.5-mini, gpt-5-mini)           │
│  ├─ Anthropic (claude-opus-4-7, sonnet-4-6, haiku-4-5)   │
│  ├─ Google (gemini-2.5-pro, gemini-2.5-flash)            │
│  ├─ OpenRouter (free tier: Llama, Qwen, Deepseek, …)     │
│  ├─ GitHub Copilot (gpt-5-mini)                          │
│  └─ Ollama (local — Gemma, Qwen, …)                      │
└──────────────────────────────────────────────────────────┘
```

### What happens on a call

1. Your AI client picks `coding_filipe` from the tool list and calls it with `{ message: "review this fn" }`.
2. The MCP server spawns: `openclaw agent --agent coding --json -m "review this fn"`.
3. OpenClaw loads the **coding** agent — system prompt + workspace memory + relevant skills.
4. The agent's **primary model** (gpt-5.5) runs the call. If it fails (rate limit, network), OpenClaw automatically falls back through the chain you configured.
5. Response is returned over stdio to your client, with a small footer showing model + token usage.

### One tool per agent vs. single orchestrator — what's the right design?

Both are valid. HyperAgents v0.2 picks **one tool per agent** because:

- LLMs **pick tools by description**. Sixteen rich descriptions teach the host LLM *when to use each specialist* far better than one generic `ask_agent({agent_id})` schema.
- Tool calls are **observable** in MCP clients — users can see "ah, it just called `security_audit`" without reading args.
- Per-agent rate limits / costs / billing are easier to track when each agent is a discrete surface.

A **single-orchestrator tool** (`hyperagent_run({agent, message})`) makes sense when:

- Your client UI hides tools (smaller cognitive load).
- You want **dynamic agent lists** — fetched from a remote config, not hard-coded.
- You're building a **router agent** that picks specialists programmatically.

Both modes are on the v0.3 roadmap. v0.2 ships per-agent because it's the **superior UX in current MCP clients** (Claude Desktop, Cursor) which show the tool inventory.

---

## 🌐 Multi-Provider LLMs

HyperAgents inherits OpenClaw's model layer. Each agent declares a **resolution chain**:

```jsonc
// example: agents/coding/agent.json
{
  "models": {
    "primary":   "openai/gpt-5.5",
    "fast":      "openai/gpt-5.5-mini",
    "reasoning": "google/gemini-2.5-pro",
    "fallback":  [
      "github-copilot/gpt-5-mini",
      "openrouter/qwen/qwen3-coder:free",
      "ollama/qwen3.5:9b-q4_K_M"
    ]
  }
}
```

OpenClaw resolves in order: **primary → first available fallback → throw**. You configure providers **once** at the OpenClaw layer:

```bash
# in ~/.openclaw/.env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...
OPENROUTER_API_KEY=sk-or-...
GITHUB_COPILOT_TOKEN=ghu_...        # gh auth login
OLLAMA_HOST=http://127.0.0.1:11434  # local
```

OAuth flows (Notion, Google Workspace, GitHub Copilot) are handled by OpenClaw's `auth login` command — the MCP server never sees raw tokens. Your AI client just sees: *"tool ran, here's the answer"*.

### "Will it work with ChatGPT 5.5?"

Yes. Agents with `models.primary = "openai/gpt-5.5"` route to gpt-5.5 by default. You can also override per call by editing the agent's `agent.json`, or by setting environment overrides:

```bash
HB_AGENTS_MODEL_OVERRIDE=openai/gpt-5.5 npx -y @hyperboosters/hyperagents
```

---

## 🎯 Real Usage Examples

Each example shows: **what you type → what your AI does → what comes back**.

### Sales scripts in pt-BR

> Cursor: *"Use ravi_sales to write a 3-message WhatsApp sequence to reactivate a cold lead who downloaded our ebook 60 days ago and never replied."*

```
[ravi_sales · gpt-5.5 · 1842 tokens]

Mensagem 1 (Dia 1 — quebra-gelo):
"Oi, [Nome]! Aqui é o Ravi da HyperBoosters. Lembrei de você
 hoje porque vi que baixou nosso ebook sobre [tópico]..."

Mensagem 2 (Dia 3 — valor): ...
Mensagem 3 (Dia 7 — escassez): ...
```

### Code review

> Claude Desktop: *"Ask coding_filipe to review this auth middleware: <paste code>"*

```
[coding_filipe · gpt-5.5 · 2106 tokens]

3 issues found, ranked by severity:

CRITICAL — token expiry check uses `<` instead of `<=` (line 23)
HIGH     — error from jwt.verify() is swallowed (line 31)
MEDIUM   — `req.user` is mutated; consider returning new obj
```

### Strategic analysis (Brazilian context)

> Codex CLI: *"navigator_research → find top 5 platforms competing with HyperBoosters in BR 2026"*

```
[navigator_research · openrouter/stepfun · 4218 tokens]

Top 5 (rank by share of voice + product fit):

1. Cuca AI ......... 18.5% — ferramenta de geração de conteúdo p/ MEI
2. Ravus Tech ...... 14.1% — automação RPA com agentes IA
...
```

---

## ⚙️ Configuration

### Environment variables (for the MCP server itself)

| Var | Default | Description |
|---|---|---|
| `HB_AGENTS_MODE` | `gateway` | `gateway` (uses local OpenClaw gateway) or `local` (embedded, requires provider keys directly in env) |
| `HB_AGENTS_TIMEOUT_MS` | `120000` | Per-call timeout in milliseconds |
| `HB_AGENTS_MODEL_OVERRIDE` | _(none)_ | Force a specific model across all calls (e.g., `openai/gpt-5.5`) |

### OpenClaw configuration

HyperAgents delegates to `openclaw`. Configure agents, models, providers via:

```bash
# View available agents
openclaw agents list

# View configured models
openclaw models

# Validate config
openclaw config validate --json
```

Full OpenClaw docs: https://docs.openclaw.ai

---

## 🛠️ Troubleshooting

<details>
<summary><b>Server starts but no tools appear in my client</b></summary>

- Restart the client fully (quit & relaunch — most MCP clients only load servers on startup).
- Check the client's MCP log. In Claude Desktop: `~/Library/Logs/Claude/mcp*.log`.
- Run `npx -y @hyperboosters/hyperagents` directly. You should see `Connected. 16 agents available.` on stderr.

</details>

<details>
<summary><b>"openclaw: command not found"</b></summary>

The MCP server spawns the `openclaw` CLI. Install it first: https://docs.openclaw.ai/getting-started

If it's installed but the MCP client can't find it, your client's PATH is restricted. Use absolute path:

```jsonc
{
  "hyperagents": {
    "command": "/full/path/to/npx",
    "args": ["-y", "@hyperboosters/hyperagents"],
    "env": { "PATH": "/usr/local/bin:/usr/bin:/bin:/full/path/to/openclaw/dir" }
  }
}
```

</details>

<details>
<summary><b>Agent call times out</b></summary>

Cold first calls take 10–20s while OpenClaw loads system prompt + memory. Bump the timeout:

```jsonc
{
  "hyperagents": {
    "command": "npx",
    "args": ["-y", "@hyperboosters/hyperagents"],
    "env": { "HB_AGENTS_TIMEOUT_MS": "180000" }
  }
}
```

</details>

<details>
<summary><b>"Empty response from agent X"</b></summary>

Usually means the model the agent uses is rate-limited and no fallback is configured. Check:

```bash
openclaw cron list   # any failed health checks?
openclaw models      # is the primary resolving?
```

Add fallbacks to the agent's `agent.json`.

</details>

---

## 🗺️ Roadmap

- [x] **v0.1 — Public launch** — 16 agents, stdio MCP, 5 verticals
- [x] **v0.2 — HyperAgents rebrand** — production-grade README, install matrix, multi-provider docs
- [ ] **v0.3 — Single orchestrator mode** — `hyperagent_run({agent, message})` for clients that prefer one tool
- [ ] **v0.3 — Streaming responses** (currently buffered)
- [ ] **v0.3 — Multi-turn sessions** — preserve conversation history per (client × agent)
- [ ] **v0.4 — HTTP / SSE transport** — run server remote, no local OpenClaw needed
- [ ] **v0.4 — Custom agents via config** — define your own agents in a YAML file consumed by the MCP server
- [ ] **v0.5 — Hosted SaaS** — `api.hyperboosters.com` with API keys, daily quotas, billing
- [ ] **v1.0 — Marketplace** — share/install community agent packs (`@hyperagents/devops-pack`, etc.)

[Open an issue](https://github.com/raonibarbalhox/agents-mcp/issues) to request what's next.

---

## 🤝 Contributing

Pull requests welcome. Especially:

- New agent specialists (open issue first with the persona + use case)
- Localized variants (we have pt-BR; we want es-ES, en-US accents, ja-JP …)
- Adapters for new MCP clients
- Quality fixtures for the smoke-test harness

```bash
git clone https://github.com/raonibarbalhox/agents-mcp
cd agents-mcp
npm install
npm run build
node dist/index.js   # MCP server runs on stdio
```

---

## 📚 Verticals

The `verticals/` directory ships **pre-configured agent packs** for specific niches:

| Vertical | Path | Agents Included |
|---|---|---|
| HyperBoosters Core | [`verticals/hyperboosters`](./verticals/hyperboosters) | Full 16-agent suite |
| Sales-focused | [`verticals/sales`](./verticals/sales) | ravi_sales, sales_lucas, marketing_tiago, navigator_research |
| MatchMob (B2B matching) | [`verticals/matchmob`](./verticals/matchmob) | analysis_joao, pm_product, creative, navigator_research |
| Trends Intelligence | [`verticals/trends`](./verticals/trends) | navigator_research, analysis_joao, marketing_tiago, brain_curator |
| AnotaMeu (note-taking SaaS) | [`verticals/anotameu`](./verticals/anotameu) | brain_curator, pm_product, creative |
| White-label / Parceiros | [`verticals/parceiros`](./verticals/parceiros) | Configurable subset |

Each vertical includes an `ONBOARDING.md` with positioning guidance.

---

## 🔒 Security & Trust

- The MCP server **never reads or forwards your provider API keys**. Those live in your OpenClaw config, on your machine.
- Tool calls are visible to you — your MCP client logs every call and its result.
- No telemetry, no analytics, no phone-home. Open source.
- We follow [LGPD](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd) and [GDPR](https://gdpr.eu/) principles. Reports: [security@hyperboosters.com](mailto:security@hyperboosters.com).

---

## 📜 License

MIT © [Raoni Barbalho](https://github.com/raonibarbalhox) — [HyperBoosters](https://hyperboosters.com)

---

<div align="center">

### Built with ⚡ by [HyperBoosters](https://hyperboosters.com)

**[Website](https://hyperboosters.com)** ·
**[OpenClaw docs](https://docs.openclaw.ai)** ·
**[npm](https://www.npmjs.com/package/@hyperboosters/hyperagents)** ·
**[Issues](https://github.com/raonibarbalhox/agents-mcp/issues)**

If HyperAgents saves you time, [star the repo](https://github.com/raonibarbalhox/agents-mcp) — that's how other developers find it.

</div>
