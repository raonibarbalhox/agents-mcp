# Agentes — Referência Completa

> Todos os 16 agentes disponíveis em `@hyperboosters/hyperagents`.
>
> *All 16 agents available in `@hyperboosters/hyperagents`.*
>
> [← Voltar ao README](README.md)

---

## Especialistas Brasileiros (pt-BR nativo)

| Ferramenta | Nome | Modelo | Melhor para |
|------------|------|--------|-------------|
| `HB_orchestrator` | Ravi — Jarvis do Fundador | gpt-5.5 | Infra, devops, estratégia, contexto BR completo, qualquer coisa |
| `HB_sales` | Ravi — Vendas | gpt-5.5 | Qualificação de lead, scripts de venda, objeções, pt-BR |
| `HB_whatsapp` | Ravi — WhatsApp | gpt-5.5 | Broadcast, follow-up, roteiro de nota de voz, grupos |
| `HB_analyst` | João — Análise Estratégica | Ollama local | MECE, SWOT, market sizing, pirâmide — tudo em pt-BR |
| `HB_marketing` | Tiago — Marketing | OpenRouter Qwen3 (free) | Calendário de conteúdo, copy, growth hacks, bilíngue |

## Engenharia e Operações

| Ferramenta | Nome | Modelo | Melhor para |
|------------|------|--------|-------------|
| `HB_engineer` | Filipe — Engenheiro Sênior | gpt-5.5 | Code review, refatoração, arquitetura, TS/Python/Go |
| `HB_devops` | Tomás — DevOps | gpt-5.5 | CI/CD, Kubernetes, Docker Compose, runbooks de incidente |
| `HB_security` | Auditor de Segurança | Gemini 2.5 Flash | OWASP, threat modeling, RLS, OAuth, LGPD/GDPR |
| `HB_sre` | SRE — Confiabilidade | gpt-5.5 | SLO/SLI, error budget, postmortem, engenharia de caos |
| `HB_mcp_builder` | Construtor MCP | Gemini 2.5 Flash | Protocolo MCP, plugins, schema de ferramentas |

## Produto, Vendas e Pesquisa

| Ferramenta | Nome | Modelo | Melhor para |
|------------|------|--------|-------------|
| `HB_product` | Product Manager | gpt-5.5 | PRD, sprint planning, RICE/MoSCoW, OKRs |
| `HB_outbound` | Lucas — Outbound | OpenRouter Llama 3.3 (free) | Cold email, LinkedIn DMs — mais barato que HB_sales |
| `HB_creative` | Criativo — Copy & Conceitos | OpenRouter Llama 3.3 (free) | Naming, taglines, brainstorming, bilíngue |
| `HB_research` | Barnabé — Pesquisa | OpenRouter Stepfun (free) | Pesquisa web, concorrentes, fact-checking |
| `HB_memory` | Curador de Memória | Gemini 2.5 Flash | Base de conhecimento, estratégia de RAG, memória |
| `HB_generalist` | RaoAI — Generalista | Gemini 2.5 Flash | Fallback quando nenhum especialista se encaixa |

---

## Tiers de custo

**Gratuito** (custo marginal zero) — `HB_creative`, `HB_outbound`, `HB_marketing`, `HB_research`  
Usam OpenRouter free tier (Llama, Qwen, Deepseek).

**Premium** — `HB_orchestrator`, `HB_sales`, `HB_whatsapp`, `HB_engineer`, `HB_devops`, `HB_product`, `HB_sre`  
Usam gpt-5.5. Máxima qualidade.

**Local** — `HB_analyst`  
Ollama local. Zero custo de API. Requer Ollama rodando.

**Eficiente** — `HB_security`, `HB_mcp_builder`, `HB_memory`, `HB_generalist`  
Gemini 2.5 Flash. Boa relação custo/qualidade.

---

## Cadeia de fallback

Cada agente declara uma cadeia em `agent.json` dentro do OpenClaw:

```json
{
  "models": {
    "primary": "openai/gpt-5.5",
    "fallback": [
      "github-copilot/gpt-5-mini",
      "openrouter/qwen/qwen3-coder:free",
      "ollama/qwen3.5:9b-q4_K_M"
    ]
  }
}
```

OpenClaw resolve em ordem: primário → fallback[0] → fallback[1] → erro.  
Você não precisa fazer nada — o roteamento é automático.

---

*[← README](README.md)*
