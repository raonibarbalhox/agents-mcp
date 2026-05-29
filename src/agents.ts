// Catalog of OpenClaw agents exposed as MCP tools.
// Each entry maps a public tool name to the OpenClaw agent id + a hand-tuned
// description optimized for LLM tool selection in MCP clients.

export type AgentTier = "free" | "pro" | "business";

export interface AgentDef {
  /** OpenClaw runtime agent id — binds the tool to the real agent. NEVER change. */
  id: string;
  /** Public MCP tool name (HB_<function>) exposed to MCP clients. */
  toolName: string;
  /** Public REST slug at api.hyperboosters.com (/v1/agent/<publicSlug>/run). */
  publicSlug: string;
  displayName: string;
  description: string;
  example: string;
  /** Billing tier required on the public REST API. */
  tier: AgentTier;
  /** Whether this agent is currently exposed via the api.hyperboosters.com worker. */
  apiExposed: boolean;
}

// NOTE: `id` is the OpenClaw runtime agent id (`openclaw agent --agent <id>`).
// NEVER change it — it binds the MCP tool to the real agent. Only `toolName`
// (the public MCP tool name, HB_<function>), `displayName`, and `description`
// are presentation/selection metadata and safe to rename.

export const AGENTS: AgentDef[] = [
  {
    id: "ravi-owner-jarvis",
    toolName: "HB_orchestrator",
    publicSlug: "ravi",
    displayName: "HB Orchestrator — Ravi (Owner Jarvis · pt-BR mineiro)",
    description:
      "Senior Brazilian Portuguese owner-proxy / orchestrator. Use for: infra/devops queries, system status, agent orchestration, business-strategy questions — anything you'd ask the founder. Speaks natural pt-BR mineiro. Best general-purpose Brazilian agent.",
    example: "Lista os crons ativos do sistema",
    tier: "free",
    apiExposed: true,
  },
  {
    id: "ravi-hb-sales",
    toolName: "HB_sales",
    publicSlug: "sales",
    displayName: "HB Sales — Ravi Comercial (B2B SMB · mineiro)",
    description:
      "Specialized B2B sales agent for HyperBoosters / SaaS / Brazilian SMB market. Use for: lead qualification, pt-BR sales scripts, objection handling, pricing conversations, closing techniques. Mineiro tone, builds rapport.",
    example: "Como abordar dono de clínica que quer automatizar agendamentos?",
    tier: "pro",
    apiExposed: true,
  },
  {
    id: "ravi-hb-wa",
    toolName: "HB_whatsapp",
    publicSlug: "whatsapp",
    displayName: "HB WhatsApp — Ravi WA Strategist",
    description:
      "WhatsApp-native sales and support strategist. Use for: WA broadcast copy, broadcast-list strategy, message timing, status best practices, group dynamics, voice-note scripts. Brazilian-market expertise.",
    example: "Roteiro de mensagem para reativar lead frio no WhatsApp",
    tier: "pro",
    apiExposed: true,
  },
  {
    id: "sales",
    toolName: "HB_outbound",
    publicSlug: "outbound",
    displayName: "HB Outbound — Lucas (cold email/DM · free-tier)",
    description:
      "Outbound sales specialist (free-tier pool: Llama 3.3 70B + Deepseek R1). Use for: cold email, LinkedIn DMs, B2B sales sequences in English or pt-BR. Cheaper than HB_sales but less persona.",
    example: "Cold email para CTO de fintech sobre produto X",
    tier: "free",
    apiExposed: false,
  },
  {
    id: "marketing",
    toolName: "HB_marketing",
    publicSlug: "marketing",
    displayName: "HB Marketing — Tiago (conteúdo/ads/SEO)",
    description:
      "Marketing strategist (free-tier: Qwen 3.6 / Llama 3.3). Use for: content calendars, ad-copy variations, SEO topics, landing hero copy, growth hacks, brand positioning. pt-BR and English.",
    example: "5 hooks de Twitter para SaaS de IA brasileiro",
    tier: "free",
    apiExposed: true,
  },
  {
    id: "coding",
    toolName: "HB_engineer",
    publicSlug: "coding",
    displayName: "HB Engineer — Filipe (code review/arch · gpt-5.5)",
    description:
      "Senior software-engineer agent (gpt-5.5 primary). Use for: code review, refactoring, architecture decisions, debugging strategy, TypeScript/Python/Go. Gives file paths + line-level reasoning. NOT for code execution — use claude or codex for that.",
    example: "Review desta função React: <paste code>",
    tier: "pro",
    apiExposed: true,
  },
  {
    id: "devops",
    toolName: "HB_devops",
    publicSlug: "devops",
    displayName: "HB DevOps — Tomás (CI/CD · infra)",
    description:
      "DevOps + infra agent (gpt-5.5 primary). Use for: CI/CD design, Kubernetes manifests, systemd units, Docker Compose, observability stack design, incident runbooks, infra cost optimization.",
    example: "Como configurar healthcheck no Cloudflare Worker?",
    tier: "pro",
    apiExposed: true,
  },
  {
    id: "security",
    toolName: "HB_security",
    publicSlug: "security",
    displayName: "HB Security — Auditor (OWASP/LGPD/RLS)",
    description:
      "Application-security agent. Use for: threat modeling, OWASP Top 10 review, secret rotation, RLS policy design, OAuth security, webhook signature validation, GDPR/LGPD compliance.",
    example: "Threat model para checkout Stripe com webhook",
    tier: "business",
    apiExposed: true,
  },
  {
    id: "sre",
    toolName: "HB_sre",
    publicSlug: "sre",
    displayName: "HB SRE — Reliability Engineer (SLO/error budget)",
    description:
      "Site-reliability specialist. Use for: SLO/SLI design, error-budget policies, incident postmortems, chaos-engineering plans, toil-reduction strategies, on-call rotation design.",
    example: "Defina SLO para API de checkout com 5k req/min",
    tier: "pro",
    apiExposed: false,
  },
  {
    id: "analysis",
    toolName: "HB_analyst",
    publicSlug: "analysis",
    displayName: "HB Analyst — João (SWOT/MECE · pt-BR)",
    description:
      "Strategic analyst (Ollama local, pt-BR). Use for: business frameworks (MECE, SWOT, Porter), market sizing, decision frameworks, JTBD, pyramid-principle communication. Brazilian context built-in.",
    example: "Análise SWOT para entrar no mercado de PMEs de saúde",
    tier: "pro",
    apiExposed: true,
  },
  {
    id: "pm",
    toolName: "HB_product",
    publicSlug: "pm",
    displayName: "HB Product — Product Manager (PRD/roadmap)",
    description:
      "Product-manager agent. Use for: PRD writing, sprint planning, feature prioritization (RICE/MoSCoW), user-story mapping, OKR drafting, roadmap reasoning.",
    example: "Escreva PRD para feature de notificações push",
    tier: "pro",
    apiExposed: true,
  },
  {
    id: "creative",
    toolName: "HB_creative",
    publicSlug: "creative",
    displayName: "HB Creative — Copy & Concepts (bilingual)",
    description:
      "Creative agent (free-tier Llama 3.3 70B). Use for: brand naming, taglines, ad-copy variations, brainstorming, headline generation. Bilingual pt-BR/en.",
    example: "10 nomes para SaaS de gestão para clínicas",
    tier: "free",
    apiExposed: false,
  },
  {
    id: "navigator",
    toolName: "HB_research",
    publicSlug: "research",
    displayName: "HB Research — Barnabé (web search/competitor)",
    description:
      "Web research and navigation agent (Stepfun + Deepseek free). Use for: market research, competitor analysis, finding docs, news synthesis, fact-checking. Has web_search and web_fetch.",
    example: "Pesquise top 5 plataformas de IA para vendas no Brasil em 2026",
    tier: "pro",
    apiExposed: true,
  },
  {
    id: "mcp-builder",
    toolName: "HB_mcp_builder",
    publicSlug: "mcp-builder",
    displayName: "HB MCP Builder — meta-agent (MCP/plugins)",
    description:
      "Meta-agent for building MCP servers, plugins, and integrations. Use for: MCP protocol questions, OpenClaw skill development, plugin architecture, tool-schema design.",
    example: "Como expor uma API REST como MCP server?",
    tier: "pro",
    apiExposed: false,
  },
  {
    id: "brain-curator",
    toolName: "HB_memory",
    publicSlug: "memory",
    displayName: "HB Memory — Brain Curator (RAG/knowledge)",
    description:
      "Memory and knowledge-curation agent. Use for: organizing knowledge bases, summarizing long contexts, building memory hierarchies, deciding what to remember vs forget, RAG strategy.",
    example: "Como estruturar memória de longo prazo para agente de vendas?",
    tier: "pro",
    apiExposed: false,
  },
  {
    id: "main",
    toolName: "HB_generalist",
    publicSlug: "generalist",
    displayName: "HB Generalist — RaoAI Main (fallback · gpt-5.5)",
    description:
      "Generalist agent. Use as fallback when no specialist fits. gpt-5.5 + full tools but slower / more expensive than specialists. Prefer specialists when possible.",
    example: "Pergunta genérica sobre qualquer tópico",
    tier: "pro",
    apiExposed: false,
  },
];
