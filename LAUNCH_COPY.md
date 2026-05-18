# Launch Copy — @hyperboosters/hyperagents

Pronto pra você revisar e postar. Pega o que achar bom, ajusta o que quiser, posta.

---

## LinkedIn — Post longo (storytelling)

**Headline**: Construí um pacote npm que coloca 16 agentes IA brasileiros dentro do seu Cursor

Por que? Porque eu cansei.

Cansei de pagar gringo. Cansei de pedir pra IA em inglês quando o cliente fala português. Cansei de ter agente especialista bom mas só EU usar.

Então peguei 16 agentes que rodam no meu OpenClaw aqui (Ravi de vendas, Tiago de marketing, Filipe de código, João de análise estratégica — mineiros, falando português de verdade) e empacotei como MCP — protocolo que Cursor, Claude Desktop, Codex CLI, Windsurf entendem nativamente.

Resultado: qualquer desenvolvedor instala em 30 segundos:

```bash
npm install -g @hyperboosters/hyperagents
```

Depois adiciona 3 linhas no config do Cursor e pronto — dentro do Cursor ele digita:

> "Use ravi_sales pra escrever WhatsApp reativando lead frio"

E o Cursor chama o Ravi, que responde no português mineiro, ele integra a resposta na conversa.

Cobertura:
✅ ravi_jarvis — assistente pessoal genérico
✅ ravi_sales — script de venda B2B
✅ ravi_whatsapp — broadcast, timing, copy WA
✅ coding_filipe — code review sênior
✅ marketing_tiago — copy + calendário
✅ analysis_joao — SWOT, MECE em pt-BR
✅ + 10 outros (devops, security, sre, pm, creative, navigator, research...)

Free tier (10 chamadas/dia) sem cartão. Pro tier R$97/mês.

Repo + docs: github.com/raonibarbalhox/agents-mcp
npm: npmjs.com/package/@hyperboosters/hyperagents

Próximo passo: API REST hospedada pra quem não quer instalar OpenClaw local + embed widget pra qualquer site. Sai semana que vem.

Se você é dev brasileiro tentando construir agentes em português que **realmente** funcionem — me chama no DM. Quero ouvir o que falta.

#IA #AI #Brasil #SaaS #Cursor #DesenvolvedoresBR

---

## Twitter/X — Thread (10 tweets)

**T1 (hook):**
🇧🇷 Acabei de publicar npm package que coloca 16 agentes IA brasileiros dentro do Cursor/Claude/Codex.

Ravi vende. Tiago faz marketing. Filipe revisa código.

Todos falam português mineiro. De verdade — não tradução zoada de gringo.

🧵👇

**T2:**
Por trás:

- OpenClaw rodando local com 16 agentes especializados
- Cada agente tem persona + skills + memória própria
- Falam pt-BR nativo, não "olá, como vai" robótico

Faltava só: distribuição.

**T3 (a sacada):**
MCP (Model Context Protocol) — padrão criado pela Anthropic pra ferramentas conversarem com IAs.

Tipo USB pra IA.

Publiquei @hyperboosters/hyperagents → qualquer IDE/cliente MCP-compatible vê meus agentes como tools.

**T4 (demo):**
Install em 30s:

```
npm install -g @hyperboosters/hyperagents
```

Cole no `~/.cursor/mcp.json`:
```
{
  "hyperboosters-agents": {
    "command": "hyperagents-mcp"
  }
}
```

Reinicia o Cursor. 16 tools novas.

**T5 (uso real):**
No Cursor agora você digita:

> "use ravi_sales para escrever mensagem WhatsApp reativando lead frio de PME que abandonou onboarding há 3 semanas"

E recebe resposta em pt-BR mineiro, contextualizada, pronta pra mandar.

**T6 (os 16):**
ravi_jarvis (generalista)
ravi_sales (vendas B2B)
ravi_whatsapp (estratégia WA)
coding_filipe (code review)
marketing_tiago (copy + calendário)
devops_tomas (CI/CD, infra)
security_audit (LGPD/OWASP)
sre_ops (SLO/incidentes)
analysis_joao (SWOT, MECE)
+ 7 outros

**T7 (preço):**
Free: 10 chamadas/dia (grátis pra sempre)
Pro: R$97/mês — 1k chamadas/dia
Business: R$497/mês — 10k/dia

Custo por chamada cai muito quando volume sobe.

**T8 (limitação honesta):**
MVP precisa OpenClaw + provider key local. Funciona melhor pra dev tech-savvy que já tá no terreno.

Próximo: API REST hospedada (api.hyperboosters.com) — qualquer um chama via HTTP sem instalar nada.

**T9 (roadmap):**
- Embed widget: bolha de chat em qualquer site
- WhatsApp dedicado: cliente compra número, agente atende
- Notion/Slack/Discord plugins
- White-label pra outros founders

**T10 (CTA):**
Se faz sentido pra você:
- ⭐ github.com/raonibarbalhox/agents-mcp
- 📦 npmjs.com/package/@hyperboosters/hyperagents
- 💬 DM se quiser falar

Construído publicamente. Vai melhorar todo dia. 🛠️

---

## WhatsApp Status (em 3 partes)

**Status 1 (texto):**
Lancei algo MUITO bom hoje 🚀

16 agentes IA brasileiros dentro do Cursor/Claude/Codex.

Falam mineiro de verdade.
3 linhas pra instalar.
Free pra começar.

→ npmjs.com/package/@hyperboosters/hyperagents

**Status 2 (screencast 30s):**
[Grava tela: abre Cursor, digita "use ravi_sales pra escrever ...", recebe resposta em pt-BR, mostra tools list com 16 agentes]

**Status 3 (CTA):**
Quem instalar HOJE pode pedir agente customizado pro seu nicho. Me chama.

---

## Reddit — r/ClaudeAI + r/cursor

**Title**: I published an npm MCP server with 16 specialist AI agents (Brazilian Portuguese native)

**Body**:

After ~6 months building specialist agents on top of OpenClaw (sales, marketing, code review, security audit, etc.), I realized they were all stuck on my local machine.

So I packaged them as an MCP server: `npm install -g @hyperboosters/hyperagents`

Add to your Cursor/Claude Desktop/Codex config:
```json
{
  "hyperboosters-agents": {
    "command": "npx",
    "args": ["-y", "@hyperboosters/hyperagents"]
  }
}
```

Now you have 16 new tools, each backed by a different specialized agent with its own system prompt, personality, and tool allowlist. The Brazilian-trained agents (`ravi_jarvis`, `ravi_sales`, `analysis_joao`) speak Portuguese natively — not translated.

**Requirements**: OpenClaw CLI installed + gateway running. (Or `HB_AGENTS_MODE=local` with provider API keys in shell.)

Repo: github.com/raonibarbalhox/agents-mcp
npm: npmjs.com/package/@hyperboosters/hyperagents

Building this in public. Next: HTTP transport (no local OpenClaw needed) + hosted API at api.hyperboosters.com.

Happy to answer questions about the architecture or take suggestions on agents to add.

---

## Screencast roteiro (60s)

**00:00–00:08** — Abre Cursor, abre arquivo TypeScript. Voz: "Acabei de publicar 16 agentes IA brasileiros no npm. Vou mostrar como funciona em 1 minuto."

**00:08–00:18** — Mostra tela do `~/.cursor/mcp.json`. Cursor reinicia. Voz: "3 linhas pra instalar. Aqui no Cursor já tá conectado."

**00:18–00:30** — Abre chat do Cursor. Digita: "Use o ravi_sales para escrever uma mensagem de WhatsApp reativando um lead frio de PME que abandonou onboarding". Cursor pensa.

**00:30–00:48** — Resposta aparece em pt-BR mineiro. Voz: "Resposta natural, em português de verdade, com contexto de PME, tom mineiro. Não tradução."

**00:48–00:55** — Mostra tools list (ravi_sales, coding_filipe, marketing_tiago, etc.). Voz: "16 agentes especializados. Cada um com persona própria."

**00:55–01:00** — Texto na tela: "npm install -g @hyperboosters/hyperagents · Free tier · hyperboosters.com". Voz: "Link no comentário. Free tier sem cartão. Vai lá testar."

---

## E-mail outbound (founder-to-founder)

**Assunto**: 16 agentes IA brasileiros, drop-in no Cursor — quer testar?

Olá [Nome],

Vi que você tá construindo [produto] e mexendo com IA em pt-BR. Imaginei que talvez te interesse:

Lancei hoje `@hyperboosters/hyperagents` — pacote npm que coloca 16 agentes IA brasileiros (Ravi de vendas, Tiago de marketing, Filipe de code review, etc.) dentro do Cursor/Claude Desktop/Codex em 30 segundos.

Diferencial vs ChatGPT/Claude direto:
- Falam pt-BR mineiro natural (não tradução)
- Cada um especialista no seu vertical
- Plug direto no seu IDE — sem trocar de aba

Free tier sem cartão (10 chamadas/dia). Pro R$97/mês.

npm: npmjs.com/package/@hyperboosters/hyperagents

Se testar e tiver feedback, adoraria ouvir. Tô refinando rápido.

Abs,
Raoni
HyperBoosters
hyperboosters.com

---

## Aviso: customizar antes de postar

- Substituir `github.com/raonibarbalhox/agents-mcp` pelo URL real do repo (após push)
- Substituir `npmjs.com/package/@hyperboosters/hyperagents` quando publicado
- Conferir disponibilidade do nome `@hyperboosters` no npm — se não disponível, alternativas: `@hyperb`, `@hb-agents`, `@hb-claw`
- Gravar screencast antes de postar Twitter/Reddit (visual content drives 5-10x engagement)
- Postar em horário que seu público está online: LinkedIn = ter/qua/qui 9-11h BRT; Twitter = qualquer hora útil
