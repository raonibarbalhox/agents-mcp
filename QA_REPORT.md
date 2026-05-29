# Agents End-to-End QA Report

> Generated: 2026-05-16T23:10:29-03:00
> Method: `openclaw agent --agent <id> -m "<prompt>" --json`
> Each agent gets a domain-appropriate prompt; we measure latency + tokens + quality.

| Agent | Status | Latency | Tokens | Model |
|---|---|---|---|---|
| `devops` | OK | 25s | 45298 | openai/gpt-5.5 |
| `marketing` | OK | 17s | 44157 | openai/gpt-5.5 |
| `coding` | OK | 21s | 44414 | openai/gpt-5.5 |
| `sales` | OK | 22s | 43793 | openai/gpt-5.5 |
| `ravi-owner-jarvis` | OK | 24s | 50961 | openai/gpt-5.5 |
| `ravi-hb-wa` | OK | 27s | 45371 | openai/gpt-5.5 |
| `navigator` | OK | 31s | 46156 | openai/gpt-5.5 |
| `security` | OK | 16s | 44464 | openai/gpt-5.5 |
| `ravi-hb-sales` | OK | 21s | 49804 | openai/gpt-5.5 |
| `analysis` | OK | 21s | 45252 | openai/gpt-5.5 |

## Responses

### `devops`

**Prompt:** Em 3 bullets: como configurar healthcheck periódico em Cloudflare Worker?

**Status:** OK · **Latency:** 25s · **Tokens:** 45298 · **Model:** openai/gpt-5.5

**Response:**

```
- Defina um **Cron Trigger** no `wrangler.toml`:
```

### `marketing`

**Prompt:** 3 headlines (max 8 palavras cada) para landing 'agentes IA brasileiros via MCP'.

**Status:** OK · **Latency:** 17s · **Tokens:** 44157 · **Model:** openai/gpt-5.5

**Response:**

```
1. Agentes IA brasileiros conectados via MCP  
```

### `coding`

**Prompt:** Em uma linha: prós/contras de usar Bun vs Node 22 em produção Cloudflare Worker.

**Status:** OK · **Latency:** 21s · **Tokens:** 44414 · **Model:** openai/gpt-5.5

**Response:**

```
Bun ainda não roda como runtime de Cloudflare Workers; em produção use Node 22 apenas para build/tooling local, porque o Worker executa no runtime V8/workerd da Cloudflare.
```

### `sales`

**Prompt:** Cold email 3 linhas para CTO de fintech BR sobre API de agentes IA pt-BR. Sem buzzword.

**Status:** OK · **Latency:** 22s · **Tokens:** 43793 · **Model:** openai/gpt-5.5

**Response:**

```
Oi, [Nome], vi que vocês escalam produto financeiro com muita integração crítica.
```

### `ravi-owner-jarvis`

**Prompt:** Em uma frase, qual o status do sistema OpenClaw agora? Responda em pt-BR.

**Status:** OK · **Latency:** 24s · **Tokens:** 50961 · **Model:** openai/gpt-5.5

**Response:**

```
O OpenClaw está operacional agora: gateway e Mission Control estão ativos, com os principais daemons e workers rodando.
```

### `ravi-hb-wa`

**Prompt:** Mensagem WhatsApp curta (max 200 chars) reativando lead frio de PME de saúde que abandonou onboarding há 14 dias.

**Status:** OK · **Latency:** 27s · **Tokens:** 45371 · **Model:** openai/gpt-5.5

**Response:**

```
Oi, tudo bem? Vi que o onboarding ficou parado. Quer que eu te ajude a retomar em 10 min e deixar sua PME de saúde pronta para operar?
```

### `navigator`

**Prompt:** Em uma linha: estado atual do mercado de MCP servers públicos (early 2026).

**Status:** OK · **Latency:** 31s · **Tokens:** 46156 · **Model:** openai/gpt-5.5

**Response:**

```
Mercado de MCP servers públicos em early 2026: crescimento acelerado, mas ainda fragmentado e imaturo, com valor real migrando de “catálogos abertos” para registries curados, gateways corporativos e servidores auditáveis.
```

### `security`

**Prompt:** Em 2 linhas: principal risco LGPD ao guardar logs de API key em KV namespace?

**Status:** OK · **Latency:** 16s · **Tokens:** 44464 · **Model:** openai/gpt-5.5

**Response:**

```
Risco principal: exposição ou retenção indevida de segredo/dado pessoal associado, criando vazamento de credencial e rastreabilidade abusiva sob LGPD.
```

### `ravi-hb-sales`

**Prompt:** Cliente diz: 'Tá caro, preciso pensar.' Responda com objeção mineiro em 2 linhas.

**Status:** OK · **Latency:** 21s · **Tokens:** 49804 · **Model:** openai/gpt-5.5

**Response:**

```
*Ravi 🤖*: Entendo demais. Só cuidado pra não comparar preço com custo de continuar perdendo tempo e venda todo mês.
```

### `analysis`

**Prompt:** Em 3 bullets MECE: o que decide se launch de MCP server vira viral em comunidade dev BR?

**Status:** OK · **Latency:** 21s · **Tokens:** 45252 · **Model:** openai/gpt-5.5

**Response:**

```
- **Dor técnica clara e demonstrável:** resolve um problema frequente de dev BR em minutos, com demo reproduzível, antes/depois evidente e integração simples com stack real.
```

## Remaining 6 agents — QA 2026-05-28

> Completes coverage to 16/16. Same method (`openclaw agent --agent <id> -m … --json`), gateway live, openclaw 2026.5.27.
> (Agents logged by runtime `id`; public MCP tool names are now `HB_*` — see AGENTS.md.)

| Agent (id) | HB tool | Status | Latency | Tokens | Model |
|---|---|---|---|---|---|
| `sre` | `HB_sre` | OK | 14s | 13970 | gpt-5.5 |
| `pm` | `HB_product` | OK | 11s | 38840 | gpt-5.5 |
| `creative` | `HB_creative` | OK | 7s | 12816 | gpt-5.5 |
| `mcp-builder` | `HB_mcp_builder` | OK | 10s | 38982 | gpt-5.5 |
| `brain-curator` | `HB_memory` | OK | 11s | 38823 | gpt-5.5 |
| `main` | `HB_generalist` | OK | 7s | 39648 | gpt-5.5 |

Sample responses:
- `sre`: "SLO inicial: 99,9% disponibilidade mensal e p95 < 300ms / p99 < 800ms para requests válidas, carga 5k req/min."
- `pm`: "Contexto e objetivo · Requisitos funcionais · métricas de sucesso…" (PRD skeleton)
- `creative`: "Agera, NexoAI, Pronto, Bia, Zelo"
- `mcp-builder`: "Mapeie cada endpoint REST → tool MCP com nome, descrição e schema de entrada…"
- `brain-curator`: "Guarde só o que muda a próxima venda: identidade, contexto comercial, dores, objeções, funil, acordos, próximos passos. Esqueça ruído."
- `main`: "MCP é um padrão para conectar modelos de IA a ferramentas, dados e sistemas externos de forma estruturada e interoperável."

## Summary

- **Pass (first batch):** 10 / 10
- **Pass (remaining batch 2026-05-28):** 6 / 6
- **Total coverage:** 16 / 16 ✅
- **First batch:** 225s elapsed · 459670 tokens · avg 22s
- **Second batch:** ~60s elapsed · avg 10s (faster prompts)
