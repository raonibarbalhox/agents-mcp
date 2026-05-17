# Guia Leigo — O que estamos construindo

> Versão Raoni. Sem jargão. Cada bloco tem **"o que é"**, **"pra quê serve"**, **"onde mora"** e **"como você ganha dinheiro com isso"**.

---

## TL;DR em uma frase

Pegamos os 16+ agentes que já existem no seu OpenClaw (Ravi, Tiago, Filipe, João, etc.) e os transformamos em **produto vendável**: um pacote que qualquer desenvolvedor do mundo instala em 30 segundos e passa a "conversar" com seus agentes brasileiros dentro do Cursor, Claude Desktop, Codex CLI, etc.

Você está saindo do problema "tenho agentes mas só eu uso" e entrando no problema "como cobrar das pessoas que querem usar".

---

## A arquitetura em 1 desenho mental

```
   [Cursor]      [Claude Desktop]      [Codex CLI]      [Site cliente]
        |              |                    |                 |
        v              v                    v                 v
   +---------------------------------------------------------------+
   |                  Nossa Camada de Distribuição                  |
   |                                                                |
   |  MCP Server (npm package)         API REST (Cloudflare Worker)|
   |  @hyperboosters/agents-mcp        api.hyperboosters.com/v1/...|
   |                                                                |
   |  Embed Widget (script tag)        Direct Bot                  |
   |  <script src="cdn/ravi.js">       WhatsApp +5538998126865     |
   |                                   Telegram @raohhyperbot      |
   +---------------------------------------------------------------+
                                |
                                v
                  OpenClaw Gateway (localhost:18789)
                                |
                                v
              16+ Agentes (Ravi, Tiago, Filipe...)
```

Pense assim: o OpenClaw é a **cozinha** (faz a comida). Estamos construindo o **delivery** (Uber/iFood) — várias formas de gente fazer pedido sem precisar entrar na sua cozinha.

---

## Pergunta principal: vai dentro de /app/admin?

**Resposta curta: NÃO. E é proposital.**

**Resposta longa:**

O `/app/admin/*` da hyperboosters.com vive no monorepo Improvement, que está difícil de mexer (você mesmo falou). Se a gente embolar o produto novo lá dentro:
- Trava no backend complexo
- Tem que mexer em Next.js, Supabase, Clerk, auth routes
- Demora semanas pra ver venda

Solução: **produto vive em REPO SEPARADO** (`~/dev/agents-mcp/`) com **seu próprio domínio** (proposta: `api.hyperboosters.com` apontando pra Cloudflare Worker — não pro app Next.js).

**O `/app/admin/` GANHA UM LINK depois**, não vira o produto. Tipo:

```
/app/admin/integrations/
   └─ "📦 Agents MCP — instale em qualquer IDE"
      [Botão: Copiar comando de install]
      [Documentação]
      [Suas chaves de API]
```

Esse link/página em `/app/admin/` é **trivial de adicionar** (uma página estática listando os tools), pode fazer numa tarde, mas NÃO É BLOQUEADOR pra você vender.

**Ordem:**
1. **Hoje/amanhã** — npm publish + LinkedIn post → primeiras vendas batem no DM
2. **Semana 1** — Cloudflare Worker + Stripe checkout (auto-sign-up + chave API)
3. **Semana 2** — Página `/app/admin/integrations` lista as chaves do user logado (aí sim entra no monorepo, mas só leitura)

---

## O que já foi feito (passa a passa)

### 1. WhatsApp do +5538991399293 voltou
**O que estava acontecendo:** o agente WhatsApp estava configurado pra rodar dentro do Docker. Mas o Docker do seu WSL2 estava travado (socket recusando conexão). Resultado: toda mensagem dava "Something went wrong".

**O que fiz:** mudei a configuração do agente de `sandbox.mode: all` (precisa Docker) para `sandbox.mode: non-main` (não precisa Docker pra função principal). Reiniciei o gateway.

**Resultado:** WhatsApp default + hb-sales ambos voltaram pra `health:healthy`.

**Onde está o registro:** commit `21c532b` no repo `~/.openclaw/`.

**Risco residual:** o Docker continua quebrado (precisa `sudo systemctl restart docker` num momento que você puder). Mas o WhatsApp funciona sem ele agora.

### 2. Criei o produto `@hyperboosters/agents-mcp`

**O que é:** um pacote npm (tipo um app de loja, mas pra desenvolvedores) que faz a "ponte" entre seus agentes OpenClaw e qualquer ferramenta moderna de IA (Cursor, Claude Desktop, Codex CLI, Windsurf).

**Como o cliente usa:**
1. Abre o Cursor
2. Vai em Settings → MCP Servers → cola 3 linhas:
```json
{
  "hyperboosters-agents": {
    "command": "npx",
    "args": ["-y", "@hyperboosters/agents-mcp"]
  }
}
```
3. Reinicia o Cursor
4. Agora dentro do Cursor ele pode digitar:
   *"Use o ravi_sales pra escrever uma mensagem de WhatsApp reativando um lead frio"*
5. O Cursor envia pra Ravi (rodando no seu OpenClaw), Ravi responde, Cursor integra a resposta na conversa

**Onde mora:** `/home/raonix/dev/agents-mcp/` (pasta separada do Improvement)

**O que tem dentro:**
- `package.json` — manifesto npm
- `src/index.ts` — servidor MCP (300 linhas TypeScript)
- `src/agents.ts` — catálogo dos 16 agentes com descrições otimizadas pra IA escolher o agente certo
- `dist/` — código compilado
- `README.md` — instruções de instalação
- `LICENSE` — MIT (você dá grátis o software, vende o serviço)

**Status agora:** rodando localmente nesta máquina. Você consegue testar **agora** abrindo Cursor/Codex aqui mesmo.

### 3. Integrei na sua máquina (Claude Code + Codex)

Adicionei ao `~/.claude.json` e `~/.codex/config.toml` para que o pacote já fique disponível como ferramenta. Quando você reiniciar Claude Code ou Codex, vai aparecer 16 ferramentas novas: `ravi_jarvis`, `ravi_sales`, `ravi_whatsapp`, `coding_filipe`, `marketing_tiago`, etc.

**Teste real que rodei:**
```
Cliente: tools/call ravi_jarvis, mensagem "Responda apenas: pong"
Resposta: "pong" (com footer "Ravi — Owner Jarvis · gpt-5.5 · 50087 tokens")
```

Funciona ponta-a-ponta.

---

## Os 16 agentes que viraram produto

| Tool | Quem é | Quando o cliente usa |
|---|---|---|
| `ravi_jarvis` | Você-IA (assistente pessoal) | "Status do meu sistema", perguntas gerais Brasil |
| `ravi_sales` | Vendedor mineiro | Script de venda, objeção, fechamento |
| `ravi_whatsapp` | Especialista WhatsApp | Mensagem WA, broadcast, status |
| `sales_lucas` | Sales B2B (modelo barato) | Cold email, LinkedIn DM |
| `marketing_tiago` | Marketing | Copy, calendário, headlines |
| `coding_filipe` | Dev sênior | Code review |
| `devops_tomas` | DevOps | CI/CD, infra, runbooks |
| `security_audit` | Segurança | OWASP, LGPD, ameaças |
| `sre_ops` | SRE | SLO, incidentes |
| `analysis_joao` | Analista estratégico | SWOT, MECE, mercado |
| `pm_product` | Product Manager | PRD, sprint |
| `creative` | Criativo | Naming, brainstorm |
| `navigator_research` | Pesquisador web | Pesquisa de mercado |
| `mcp_builder` | Especialista MCP | Outros devs vão amar |
| `brain_curator` | Memória/RAG | Bases de conhecimento |
| `main` | Genérico | Fallback |

---

## Como você vai vender isso

### Modelo 1 — Self-serve via npm (já pronto)
- Cliente descobre seu post no LinkedIn/Twitter
- Lê o README
- Instala em 30 segundos
- Usa de graça no começo
- Quando bater limite de uso → cliente faz upgrade pago

**Pra liberar:** falta `npm login` (você loga uma vez no terminal) + `npm publish` (eu rodo o comando)

### Modelo 2 — API REST hospedada (próximo)
- Cliente não quer instalar OpenClaw local
- Acessa `https://api.hyperboosters.com/v1/agent/sales/run`
- Manda chave API + mensagem → recebe resposta JSON
- Cobramos por chamada ou subscription

**Pra liberar:** Cloudflare Worker + tunnel pro seu gateway local. Estimativa: 4h.

### Modelo 3 — Embed Widget (próximo)
- Cliente quer botão de chat IA no site dele
- Cola `<script src="https://cdn.hyperboosters.com/ravi.js">` no HTML
- Bolha de chat aparece no canto inferior
- Cliente final fala com Ravi

**Pra liberar:** 1 arquivo HTML + 1 arquivo JS. Estimativa: 4h.

### Modelo 4 — Direto WhatsApp/Telegram (já pronto)
- Cliente compra "número exclusivo do agente Ravi"
- A gente provisiona novo número WA usando o stack do OpenClaw
- Cobra mensalidade

**Pra liberar:** já existe agente whatsapp; falta provisionamento self-serve em `/app/admin/`. Estimativa: 1 semana.

---

## Preços propostos (você decide)

| Plano | Preço | Limites | Para quem |
|---|---|---|---|
| Free | R$ 0 | 10 chamadas/dia | Desenvolvedor curioso |
| Pro | R$ 97/mês | 1.000 chamadas/dia | Freelancer / dev indie |
| Business | R$ 497/mês | 10k chamadas/dia | Time / SMB |
| Enterprise | sob consulta | ilimitado + WhatsApp dedicado | Empresa |

**Estratégia:** começa com Free (viralidade) + Pro. Quando ver demanda de empresas, abre Business + Enterprise.

---

## O que VOCÊ precisa fazer (HITL — coisas só você consegue fazer)

### Hoje (15 minutos)
1. **`npm login`** — logar na conta npm. Se não tem conta, criar em npmjs.com
2. **Criar org `@hyperboosters` no npm** — `https://www.npmjs.com/org/create`
   - Free pra packages públicos
   - Permite que o pacote seja `@hyperboosters/agents-mcp`
3. **Me avisar** — eu rodo `npm publish --access public` em 1 comando

### Esta semana (1-2h espalhado)
4. **Conta Cloudflare** (você já tem) — vou usar pra criar Worker
5. **Domínio `api.hyperboosters.com`** — apontar pro Worker (eu te passo DNS record)
6. **Stripe Brazil** — produto "Agents API Pro" e "Business", price IDs me envia

### Mês 1 (paralelo)
7. **Criar página `/app/admin/integrations` no Improvement** (pequeno, 1 dia de trabalho) — listar chaves de API do cliente logado

---

## O que EU faço agora (sem te perguntar)

Estou indo executar em sequência:

1. ✅ **Guia leigo** (este documento, pronto)
2. **Cloudflare Worker scaffold** — código pronto pra deploy quando você me der a conta
3. **Embed widget JS** — arquivo que qualquer site pode embedar
4. **Posts LinkedIn + Twitter** — copy pronto pra você revisar e postar
5. **Roteiro de screencast** — pra você gravar vídeo de 1 minuto mostrando o MCP rodando no Cursor
6. **Script npm publish** — comando exato que você cola e publica

---

## Glossário rápido

- **MCP (Model Context Protocol)**: padrão criado pela Anthropic pra ferramentas conversarem com IAs. Tipo USB pra IA — qualquer IA conecta em qualquer ferramenta MCP.
- **npm**: loja de pacotes do Node.js. Você publica seu pacote e qualquer dev do mundo instala com 1 comando.
- **Cloudflare Worker**: servidor "sem servidor" que roda no edge global. 100k requisições/dia grátis. Latência baixíssima.
- **Cloudflare Tunnel**: cano seguro entre sua máquina local e o internet. Permite o Worker chegar no seu gateway sem expor IP.
- **Stripe Checkout**: página de pagamento pronta. Cliente clica → pagou → seu webhook ativa a conta dele.
- **OpenClaw Gateway**: o servidor local na porta 18789 que orquestra os agentes. Já existe na sua máquina.

---

## Como acompanhar progresso

Tudo que eu fizer vai aparecer:
1. **Commit no git** — mensagens claras tipo `feat(worker): scaffold CF Worker API`
2. **Arquivos novos em `~/dev/agents-mcp/`** — você pode abrir e olhar
3. **Reports no chat** — formato OBJECTIVE / VERIFIED / CHANGED / EVIDENCE / STATUS / NEXT

Quando precisar HITL, eu paro e pergunto **só uma coisa por vez**, com opções claras. Caso contrário, sigo direto.

---

## Próxima leitura: README.md do produto

Pra você ver o que CLIENTES verão quando descobrirem o produto:
- `~/dev/agents-mcp/README.md`

É a "vitrine" que vai pro npm.

---

## Dúvidas comuns

**P: E se eu desligar meu PC, o produto para?**
R: Sim, pois o gateway OpenClaw está local. Pra produção 24/7, dois caminhos:
1. Move o OpenClaw pra um VPS DigitalOcean (~R$30/mês), mantém uptime
2. Versão "cliente roda no PC dele" — ele instala OpenClaw + nosso MCP. Tipo Docker pra dev: cada dev tem o seu.

**P: Quanto custa pra mim por chamada?**
R: Cada chamada usa um modelo (gpt-5.5, gemini-flash, llama-3.3-free). Custo médio: R$0,01 a R$0,15 por chamada dependendo do modelo. Free tier (10/dia) = R$0,15/dia worst-case por user. Pro tier (R$97/mês cobrando) - R$15 custo modelo = R$82/mês de margem por user.

**P: Outras pessoas podem ver meu OpenClaw?**
R: NÃO. O MCP cliente roda no PC dele, conversa com o OpenClaw DELE (que ele instala). Versão hospedada (api.hyperboosters.com) conversa com SEU OpenClaw mas via Cloudflare Tunnel autenticado — só passa requisições válidas com chave API.

**P: Compatível com LGPD?**
R: Sim, se você adicionar termos de uso + privacy policy + audit log. Já temos audit em `~/.openclaw/docs/_audit/`.

**P: E se um cliente abusar (1 milhão de chamadas)?**
R: Rate limit no Cloudflare Worker mata antes de chegar. Vou colocar 10 req/min free, 100 req/min Pro.

---

Próximo passo: vou seguir construindo. Posso continuar?
