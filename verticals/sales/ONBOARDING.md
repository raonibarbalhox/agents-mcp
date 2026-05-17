# Onboarding — HB Sales Vertical

> Para um time de vendas (SDR / AE / SDR Manager) começar a usar os agentes IA HB em ~10 minutos.

## Pré-requisitos

- Conta HyperBoosters com plano Pro ou Business
- Chave API ativa (`hbk_live_*` ou `hbk_test_*` para dev)
- Browser moderno (qualquer)

## Caminho 1 — Use sem instalar nada (web)

1. Abra https://sales.hyperboosters.com/console
2. Cole sua chave API
3. Tem 4 abas pré-configuradas:
   - **Cold Outreach** (agent: outbound) — cold email + DM
   - **Objection Handling** (agent: sales) — respostas para objeções
   - **WhatsApp** (agent: wa) — mensagens curtas de follow-up
   - **Deal Analysis** (agent: analysis) — post-mortem + SWOT

## Caminho 2 — Use dentro do Cursor / Claude Desktop (devs)

1. Instala MCP:
```bash
npm install -g @hyperboosters/agents-mcp
```

2. Adiciona ao Cursor MCP config (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "hb-sales": {
      "command": "hyperboosters-agents-mcp",
      "env": {
        "HB_API_KEY": "hbk_live_..."
      }
    }
  }
}
```

3. Reinicia Cursor. Tools `sales`, `outbound`, `marketing`, `analysis`, `wa` aparecem.

## Caminho 3 — Embute no seu CRM / dashboard

Cola este snippet (substitui `YOUR_API_KEY`):

```html
<script
  src="https://cdn.hyperboosters.com/ravi.js"
  data-agent="sales"
  data-api-key="YOUR_API_KEY"
  data-theme="dark"></script>
```

Bolha aparece bottom-right. Cliques abrem chat.

## Fluxos prontos pra usar HOJE

### 1. Cold Email em 30s

> "Cold email 4 linhas para CTO de fintech B2B em São Paulo sobre API de agentes IA em pt-BR. Termina com pergunta específica sobre stack atual."

### 2. Reativar lead frio no WhatsApp

> "Mensagem WA curta (<200 chars) reativando lead Mariana, founder de clínica de fisio em Belo Horizonte que reagiu mas não respondeu há 21 dias. Última conversa: ela tinha receio de adoção do time."

### 3. Lidar com objeção "está caro"

> "Cliente diz: 'Tá caro, preciso pensar.' Responda mineiro 2 linhas, mantendo abertura e oferecendo próximo passo concreto."

### 4. Análise pós-deal perdido

> "Perdemos deal para concorrente nacional preço 30% menor. Cliente alegou ROI difícil de provar em 60 dias. Análise MECE em 5 bullets do que melhorar no nosso pitch."

## Métricas de sucesso (primeiros 30 dias)

- [ ] 50+ mensagens enviadas via agente
- [ ] 5+ leads requalificados via análise IA
- [ ] 2+ deals fechados onde IA participou de pelo menos 1 mensagem
- [ ] Time relata "salvou X horas/semana" (qualitativo)

## Custos esperados

| Plano | Mensal | Calls/dia | Por SDR/dia |
|---|---|---|---|
| Pro | R$197 | 1000 | 30-50 calls = OK pra 3 SDRs |
| Business | R$497 | 10000 | 300-500 calls/dia = OK pra time grande |
| Enterprise | Sob consulta | Ilimitado | Time + integração CRM customizada |

## Suporte

- WhatsApp: +55 38 99812-6865
- E-mail: raoni@hyperboosters.com
- Docs: https://docs.hyperboosters.com/sales

## Próximos passos opcionais

- [ ] Integrar com seu CRM (Pipedrive, RD Station, HubSpot, Kommo)
- [ ] Webhook pós-conversa do widget pra logar em CRM
- [ ] Treinar agente custom com seu playbook de vendas (Enterprise)
- [ ] Bot WhatsApp dedicado (número exclusivo do seu time)
