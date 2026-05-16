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

export const AGENTS: AgentDef[] = [
  {
    id: "ravi-owner-jarvis",
    toolName: "ravi_jarvis",
    displayName: "Ravi — Owner Jarvis",
    description:
      "Senior Brazilian Portuguese owner-proxy agent. Use for: infra/devops queries, system status, agent orchestration, business strategy questions, anything where you'd ask the founder. Speaks pt-BR mineiro natural. Best general-purpose Brazilian agent.",
    example: "Lista os crons ativos do sistema",
  },
  {
    id: "ravi-hb-sales",
    toolName: "ravi_sales",
    displayName: "Ravi — Sales (HyperBoosters Comercial)",
    description:
      "Specialized B2B sales agent for HyperBoosters / SaaS / Brazilian SMB market. Use for: lead qualification, sales scripts in pt-BR, objection handling, pricing conversations, closing techniques. Mineiro tone, builds rapport.",
    example: "Como abordar dono de clínica que quer automatizar agendamentos?",
  },
  {
    id: "ravi-hb-wa",
    toolName: "ravi_whatsapp",
    displayName: "Ravi — WhatsApp Strategist",
    description:
      "WhatsApp-native sales and support strategist. Use for: WA broadcast copy, broadcast list strategy, message timing, status best practices, group dynamics, voice note scripts. Brazilian market expertise.",
    example: "Roteiro de mensagem para reativar lead frio no WhatsApp",
  },
  {
    id: "sales",
    toolName: "sales_lucas",
    displayName: "Lucas — Outbound Sales",
    description:
      "Sales specialist (free-tier pool: Llama 3.3 70B + Deepseek R1). Use for: outbound cold email, LinkedIn DMs, B2B sales sequences in English or pt-BR. Cheaper than ravi_sales but less personality.",
    example: "Cold email para CTO de fintech sobre produto X",
  },
  {
    id: "marketing",
    toolName: "marketing_tiago",
    displayName: "Tiago — Marketing",
    description:
      "Marketing strategist (free-tier: Qwen 3.6 / Llama 3.3). Use for: content calendars, ad copy variations, SEO topics, landing page hero copy, growth hacks, brand positioning. Both pt-BR and English.",
    example: "5 hooks de Twitter para SaaS de IA brasileiro",
  },
  {
    id: "coding",
    toolName: "coding_filipe",
    displayName: "Filipe — Coding (Cid)",
    description:
      "Senior software engineer agent (gpt-5.5 primary). Use for: code review, refactoring suggestions, architecture decisions, debugging strategies, TypeScript/Python/Go. Provides specific file paths and line-level reasoning. NOT for actual code execution — use claude or codex for that.",
    example: "Review desta função React: <paste code>",
  },
  {
    id: "devops",
    toolName: "devops_tomas",
    displayName: "Tomás — DevOps (Barret)",
    description:
      "DevOps + SRE agent (gpt-5.5 primary). Use for: CI/CD design, Kubernetes manifests, systemd units, Docker Compose, observability stack design, incident runbooks, infra cost optimization.",
    example: "Como configurar healthcheck no Cloudflare Worker?",
  },
  {
    id: "security",
    toolName: "security_audit",
    displayName: "Security Auditor",
    description:
      "Application security agent. Use for: threat modeling, OWASP top 10 review, secret rotation procedures, RLS policy design, OAuth security, webhook signature validation, GDPR/LGPD compliance.",
    example: "Threat model para checkout Stripe com webhook",
  },
  {
    id: "sre",
    toolName: "sre_ops",
    displayName: "SRE — Reliability Engineer",
    description:
      "SRE specialist. Use for: SLO/SLI design, error budget policies, incident postmortems, chaos engineering plans, toil reduction strategies, on-call rotation design.",
    example: "Defina SLO para API de checkout com 5k req/min",
  },
  {
    id: "analysis",
    toolName: "analysis_joao",
    displayName: "João — Strategic Analysis",
    description:
      "Strategic analyst (Ollama local, pt-BR). Use for: business analysis frameworks (MECE, SWOT, Porter), market sizing, decision frameworks, JTBD, pyramid principle communication. Brazilian context built-in.",
    example: "Análise SWOT para entrar no mercado de PMEs de saúde",
  },
  {
    id: "pm",
    toolName: "pm_product",
    displayName: "Product Manager",
    description:
      "Product manager agent. Use for: PRD writing, sprint planning, feature prioritization (RICE/MoSCoW), user story mapping, OKR drafting, roadmap reasoning.",
    example: "Escreva PRD para feature de notificações push",
  },
  {
    id: "creative",
    toolName: "creative",
    displayName: "Creative — Copy & Concepts",
    description:
      "Creative agent (free-tier Llama 3.3 70B). Use for: brand naming, taglines, ad copy variations, brainstorming, headline generation. Bilingual pt-BR/en.",
    example: "10 nomes para SaaS de gestão para clínicas",
  },
  {
    id: "navigator",
    toolName: "navigator_research",
    displayName: "Barnabé — Web Research Navigator",
    description:
      "Web research and navigation agent (Stepfun + Deepseek free). Use for: market research, competitor analysis, finding documentation, news synthesis, fact-checking. Has web_search and web_fetch.",
    example: "Pesquise top 5 plataformas de IA para vendas no Brasil em 2026",
  },
  {
    id: "mcp-builder",
    toolName: "mcp_builder",
    displayName: "MCP Builder",
    description:
      "Meta-agent specialized in building MCP servers, plugins, and integrations. Use for: MCP protocol questions, OpenClaw skill development, plugin architecture, tool schema design.",
    example: "Como expor uma API REST como MCP server?",
  },
  {
    id: "brain-curator",
    toolName: "brain_curator",
    displayName: "Brain Curator — Memory Specialist",
    description:
      "Memory and knowledge curation agent. Use for: organizing knowledge bases, summarizing long contexts, building memory hierarchies, deciding what to remember vs forget, RAG strategy.",
    example: "Como estruturar memória de longo prazo para agente de vendas?",
  },
  {
    id: "main",
    toolName: "main",
    displayName: "RaoAI Main",
    description:
      "Generalist agent. Use as fallback when no specialist fits. gpt-5.5 + full tools but slower / more expensive than specialists. Prefer specialists when possible.",
    example: "Pergunta genérica sobre qualquer tópico",
  },
];
