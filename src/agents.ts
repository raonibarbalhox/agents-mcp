// Catalog of OpenClaw agents exposed as MCP tools.
// Each entry maps a public tool name to the OpenClaw agent id + a hand-tuned
// description optimized for LLM tool selection in MCP clients.

export interface AgentDef {
  id: string;
  toolName: string;
  displayName: string;
  description: string;
  example: string;
}

// NOTE: `id` is the OpenClaw runtime agent id (`openclaw agent --agent <id>`).
// NEVER change it — it binds the MCP tool to the real agent. Only `toolName`
// (the public MCP tool name, HB_<function>), `displayName`, and `description`
// are presentation/selection metadata and safe to rename.

export const AGENTS: AgentDef[] = [
  {
    id: "ravi-owner-jarvis",
    toolName: "HB_orchestrator",
    displayName: "HB Orchestrator — Ravi (Owner Jarvis · pt-BR mineiro)",
    description:
      "Senior Brazilian Portuguese owner-proxy / orchestrator. Use for: infra/devops queries, system status, agent orchestration, business-strategy questions — anything you'd ask the founder. Speaks natural pt-BR mineiro. Best general-purpose Brazilian agent.",
    example: "Lista os crons ativos do sistema",
  },
  {
    id: "ravi-hb-sales",
    toolName: "HB_sales",
    displayName: "HB Sales — Ravi Comercial (B2B SMB · mineiro)",
    description:
      "Specialized B2B sales agent for HyperBoosters / SaaS / Brazilian SMB market. Use for: lead qualification, pt-BR sales scripts, objection handling, pricing conversations, closing techniques. Mineiro tone, builds rapport.",
    example: "Como abordar dono de clínica que quer automatizar agendamentos?",
  },
  {
    id: "ravi-hb-wa",
    toolName: "HB_whatsapp",
    displayName: "HB WhatsApp — Ravi WA Strategist",
    description:
      "WhatsApp-native sales and support strategist. Use for: WA broadcast copy, broadcast-list strategy, message timing, status best practices, group dynamics, voice-note scripts. Brazilian-market expertise.",
    example: "Roteiro de mensagem para reativar lead frio no WhatsApp",
  },
  {
    id: "sales",
    toolName: "HB_outbound",
    displayName: "HB Outbound — Lucas (cold email/DM · free-tier)",
    description:
      "Outbound sales specialist (free-tier pool: Llama 3.3 70B + Deepseek R1). Use for: cold email, LinkedIn DMs, B2B sales sequences in English or pt-BR. Cheaper than HB_sales but less persona.",
    example: "Cold email para CTO de fintech sobre produto X",
  },
  {
    id: "marketing",
    toolName: "HB_marketing",
    displayName: "HB Marketing — Tiago (conteúdo/ads/SEO)",
    description:
      "Marketing strategist (free-tier: Qwen 3.6 / Llama 3.3). Use for: content calendars, ad-copy variations, SEO topics, landing hero copy, growth hacks, brand positioning. pt-BR and English.",
    example: "5 hooks de Twitter para SaaS de IA brasileiro",
  },
  {
    id: "coding",
    toolName: "HB_engineer",
    displayName: "HB Engineer — Filipe (code review/arch · gpt-5.5)",
    description:
      "Senior software-engineer agent (gpt-5.5 primary). Use for: code review, refactoring, architecture decisions, debugging strategy, TypeScript/Python/Go. Gives file paths + line-level reasoning. NOT for code execution — use claude or codex for that.",
    example: "Review desta função React: <paste code>",
  },
  {
    id: "devops",
    toolName: "HB_devops",
    displayName: "HB DevOps — Tomás (CI/CD · infra)",
    description:
      "DevOps + infra agent (gpt-5.5 primary). Use for: CI/CD design, Kubernetes manifests, systemd units, Docker Compose, observability stack design, incident runbooks, infra cost optimization.",
    example: "Como configurar healthcheck no Cloudflare Worker?",
  },
  {
    id: "security",
    toolName: "HB_security",
    displayName: "HB Security — Auditor (OWASP/LGPD/RLS)",
    description:
      "Application-security agent. Use for: threat modeling, OWASP Top 10 review, secret rotation, RLS policy design, OAuth security, webhook signature validation, GDPR/LGPD compliance.",
    example: "Threat model para checkout Stripe com webhook",
  },
  {
    id: "sre",
    toolName: "HB_sre",
    displayName: "HB SRE — Reliability Engineer (SLO/error budget)",
    description:
      "Site-reliability specialist. Use for: SLO/SLI design, error-budget policies, incident postmortems, chaos-engineering plans, toil-reduction strategies, on-call rotation design.",
    example: "Defina SLO para API de checkout com 5k req/min",
  },
  {
    id: "analysis",
    toolName: "HB_analyst",
    displayName: "HB Analyst — João (SWOT/MECE · pt-BR)",
    description:
      "Strategic analyst (Ollama local, pt-BR). Use for: business frameworks (MECE, SWOT, Porter), market sizing, decision frameworks, JTBD, pyramid-principle communication. Brazilian context built-in.",
    example: "Análise SWOT para entrar no mercado de PMEs de saúde",
  },
  {
    id: "pm",
    toolName: "HB_product",
    displayName: "HB Product — Product Manager (PRD/roadmap)",
    description:
      "Product-manager agent. Use for: PRD writing, sprint planning, feature prioritization (RICE/MoSCoW), user-story mapping, OKR drafting, roadmap reasoning.",
    example: "Escreva PRD para feature de notificações push",
  },
  {
    id: "creative",
    toolName: "HB_creative",
    displayName: "HB Creative — Copy & Concepts (bilingual)",
    description:
      "Creative agent (free-tier Llama 3.3 70B). Use for: brand naming, taglines, ad-copy variations, brainstorming, headline generation. Bilingual pt-BR/en.",
    example: "10 nomes para SaaS de gestão para clínicas",
  },
  {
    id: "navigator",
    toolName: "HB_research",
    displayName: "HB Research — Barnabé (web search/competitor)",
    description:
      "Web research and navigation agent (Stepfun + Deepseek free). Use for: market research, competitor analysis, finding docs, news synthesis, fact-checking. Has web_search and web_fetch.",
    example: "Pesquise top 5 plataformas de IA para vendas no Brasil em 2026",
  },
  {
    id: "mcp-builder",
    toolName: "HB_mcp_builder",
    displayName: "HB MCP Builder — meta-agent (MCP/plugins)",
    description:
      "Meta-agent for building MCP servers, plugins, and integrations. Use for: MCP protocol questions, OpenClaw skill development, plugin architecture, tool-schema design.",
    example: "Como expor uma API REST como MCP server?",
  },
  {
    id: "brain-curator",
    toolName: "HB_memory",
    displayName: "HB Memory — Brain Curator (RAG/knowledge)",
    description:
      "Memory and knowledge-curation agent. Use for: organizing knowledge bases, summarizing long contexts, building memory hierarchies, deciding what to remember vs forget, RAG strategy.",
    example: "Como estruturar memória de longo prazo para agente de vendas?",
  },
  {
    id: "main",
    toolName: "HB_generalist",
    displayName: "HB Generalist — RaoAI Main (fallback · gpt-5.5)",
    description:
      "Generalist agent. Use as fallback when no specialist fits. gpt-5.5 + full tools but slower / more expensive than specialists. Prefer specialists when possible.",
    example: "Pergunta genérica sobre qualquer tópico",
  },
];
