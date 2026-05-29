# HyperAgents

> **16 agentes IA brasileiros como ferramentas MCP** — para Cursor, Claude Desktop, Codex, Windsurf e qualquer cliente MCP.
>
> *16 Brazilian AI agents as MCP tools — plug into Cursor, Claude Desktop, Codex, Windsurf or any MCP-aware client.*

[![npm](https://img.shields.io/npm/v/@hyperboosters/hyperagents.svg)](https://www.npmjs.com/package/@hyperboosters/hyperagents) [![npm downloads](https://img.shields.io/npm/dm/@hyperboosters/hyperagents.svg)](https://www.npmjs.com/package/@hyperboosters/hyperagents) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Made in Brazil](https://img.shields.io/badge/Made%20in-Brazil-009c3b.svg)]()

---

## O que é isso?

Você já usa Cursor, Claude Desktop ou Codex no dia a dia.

Com HyperAgents, você adiciona 16 especialistas de IA — com contexto brasileiro — diretamente no cliente que já usa. Sem trocar de aba, sem nova conta, sem configuração complexa.

Uma linha de configuração e está pronto.

*You already use Cursor, Claude Desktop, or Codex. HyperAgents adds 16 specialist AI agents — with Brazilian context — directly into the client you already use. One config line and you're done.*

---

## Instalação rápida (30 segundos)

Adicione ao config do seu cliente MCP:

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

Reinicie o cliente. 16 ferramentas novas aparecem.

*Restart your client. 16 new tools appear.*

→ [Instruções por cliente](#instalação-por-cliente)

---

## Os 5 principais agentes

| Ferramenta | O que faz | Custo |
|------------|-----------|-------|
| **`HB_orchestrator`** | Assistente fundador (Ravi) — infra, devops, estratégia, contexto BR completo | gpt-5.5 |
| **`HB_sales`** | Vendas B2B em pt-BR (Ravi) — scripts, objeções, qualificação de lead | gpt-5.5 |
| **`HB_engineer`** | Code review, arquitetura, debug (Filipe) — TypeScript / Python / Go | gpt-5.5 |
| **`HB_analyst`** | SWOT, MECE, market sizing (João) — frameworks de negócio em pt-BR | Ollama local |
| **`HB_research`** | Pesquisa web, concorrentes, fact-checking (Barnabé) | OpenRouter free |

→ [Ver todos os 16 agentes e tiers de custo](AGENTS.md)

---

## Como funciona

```
Você (Cursor / Claude Desktop / Codex / Windsurf)
        ↓  MCP stdio
@hyperboosters/hyperagents  ←  16 ferramentas registradas
        ↓  openclaw agent --json
OpenClaw (runtime local)
        ↓  roteamento automático
[ OpenAI · Anthropic · Google · OpenRouter · Ollama ]
```

Cada agente tem cadeia de fallback automática: se o modelo primário falhar (rate limit, timeout), o próximo assume sem intervenção.

*Each agent has an automatic fallback chain: if the primary model fails, the next one takes over without intervention.*

---

## Instalação por cliente

**Claude Desktop**

```json
// macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
// Windows: %APPDATA%\Claude\claude_desktop_config.json
{
  "mcpServers": {
    "hyperagents": {
      "command": "npx",
      "args": ["-y", "@hyperboosters/hyperagents"]
    }
  }
}
```

**Cursor** → Settings → Tools & MCP → Add MCP Server

```json
{
  "hyperagents": {
    "command": "npx",
    "args": ["-y", "@hyperboosters/hyperagents"]
  }
}
```

**Codex CLI** → `~/.codex/config.toml`

```toml
[[mcp_servers]]
name = "hyperagents"
command = "npx"
args = ["-y", "@hyperboosters/hyperagents"]
```

**Windsurf** → `~/.codeium/windsurf/mcp_config.json`

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

**Cline (VS Code)** → Cline MCP Settings → Add Server

```json
{
  "hyperagents": {
    "command": "npx",
    "args": ["-y", "@hyperboosters/hyperagents"]
  }
}
```

**Instalação global** (cold start mais rápido / faster cold start):

```bash
npm install -g @hyperboosters/hyperagents
# No config: "command": "hyperagents-mcp"
```

---

## Pré-requisito

HyperAgents usa **OpenClaw** como runtime local.

→ [Instalar OpenClaw](https://docs.openclaw.ai/getting-started)

Configure as chaves dos providers em `~/.openclaw/.env`:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...
OPENROUTER_API_KEY=sk-or-...   # free tier disponível
OLLAMA_HOST=http://127.0.0.1:11434
```

*HyperAgents uses OpenClaw as a local runtime. Configure provider keys in `~/.openclaw/.env`. Free-tier agents (OpenRouter) work without paid keys.*

---

## Verticais

Configurações pré-montadas para nichos específicos.
*Pre-built agent configs for specific niches.*

| Vertical | Domínio | Descrição |
|----------|---------|-----------|
| `hyperboosters` | hyperboosters.com | Suite completa — todos os 16 agentes |
| `sales` | sales.hyperboosters.com | Agentes para gestão de vendas em empresas |
| `anotameu` | anotameu.com | Agentes para gestão de pedidos online |
| `matchmob` | — | Matching e análise B2B |
| `trends` | — | Inteligência e tendências de mercado |
| `parceiros` | — | White-label configurável |

→ [Ver configurações](verticals/)

---

## Roadmap

- [x] v0.1 — Launch — 16 agentes via MCP stdio
- [x] v0.2 — HyperAgents — rebrand, multi-provider, README
- [ ] v0.3 — Modo orquestrador único (`hyperagent_run`)
- [ ] v0.3 — Streaming de respostas
- [ ] v0.4 — Transporte HTTP/SSE — sem OpenClaw local necessário
- [ ] v0.4 — Agentes customizados via YAML
- [ ] v0.5 — SaaS hospedado — `api.hyperboosters.com`

---

## Contribuindo

Pull requests bem-vindos:
- Novos agentes especialistas (abra uma issue primeiro)
- Variantes localizadas (pt-BR já existe; queremos es-ES, en-US, ja-JP)
- Adaptadores para novos clientes MCP

```bash
git clone https://github.com/raonibarbalhox/agents-mcp
cd agents-mcp
npm install
npm run build
node dist/index.js   # MCP server via stdio
```

---

## Segurança

O servidor MCP **nunca lê nem repassa suas chaves de provider**. Elas ficam no seu OpenClaw local, na sua máquina.

Sem telemetria. Sem analytics. Sem phone-home. Open source.

Relatórios de segurança: security@hyperboosters.com

---

MIT © [Raoni Barbalho](https://hyperboosters.com) — HyperBoosters  
[hyperboosters.com](https://hyperboosters.com) · [npm](https://www.npmjs.com/package/@hyperboosters/hyperagents) · [Issues](https://github.com/raonibarbalhox/agents-mcp/issues)

*Se HyperAgents te poupa tempo, deixa uma ⭐ — é como outros desenvolvedores encontram o projeto.*  
*If HyperAgents saves you time, leave a ⭐ — that's how other developers find the project.*
