# Verticals Kit

Per-vertical agent bundles. Each subdir contains:

- `agents.json` — which agents are exposed
- `prompts/` — system prompt overrides + canned tasks
- `widget-snippet.html` — copy-paste embed for this vertical
- `MCP_CONFIG.md` — MCP setup for verticals' devs
- `ONBOARDING.md` — partner/client checklist

## Verticais HyperBoosters

| Vertical | Path | Domain | Agents | Owner |
|---|---|---|---|---|
| HyperBoosters (main) | `hyperboosters/` | hyperboosters.com | full 16 | Raoni |
| Sales | `sales/` | sales.hyperboosters.com | sales, marketing, analysis, ravi-hb-sales | Raoni |
| MatchMob | `matchmob/` | matchmob.hyperboosters.com | navigator, analysis, marketing | Raoni |
| Trends | `trends/` | trends.hyperboosters.com | navigator, analysis, brain-curator | Raoni |
| AnotaMeu | `anotameu/` | anotameu.com | (separate lane — read-only ref) | Raoni |
| Parceiros | `parceiros/` | (white-label) | configurable per partner | Raoni + partner |

## Como cada vertical usa

### Como cliente final (não-dev)
1. Página da vertical embute o widget (`<script src=cdn/ravi.js>`).
2. Visitante clica na bolha. Conversa com agente IA da vertical.
3. Agente responde com tom + domínio específico daquela vertical.

### Como dev parceiro
1. Instala MCP: `npm i -g @hyperboosters/agents-mcp`
2. Configura `data-agent="sales"` (ou "research", "trends" etc) no widget OU usa MCP tool específico
3. Recebe chave API restrita aos agentes da vertical

### Como parceiro/sócio white-label
1. Recebe `verticals/parceiros/PARTNER_KIT.tar.gz` (sub-set de tools + branding)
2. Configura domínio + credenciais
3. Cobra do cliente final, paga revenue share pra HB

## Pricing por vertical

| Vertical | Tier de entrada | Para quem |
|---|---|---|
| HB main | Pro R$97 | Devs/founders curiosos |
| Sales | Pro R$197 | Times de vendas BR (3-10 SDRs) |
| MatchMob | Business R$497 | Empresas que matcham mob/eventos |
| Trends | Pro R$197 | Marketing/conteúdo |
| AnotaMeu | Enterprise consultar | App de notas + IA |
| Parceiros | Revenue share 20-30% | Outras agências/founders |
