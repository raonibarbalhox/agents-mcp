# White-Label Partner Kit

> Para sócios, agências, e parceiros que querem revender ou white-label agents HB.

## Modelo comercial

### Revenue Share
Parceiro indica/vende → HB processa pagamento → split mensal automático.

| Tier parceiro | Cota | Split |
|---|---|---|
| Indicador (referral) | sem comprometimento | 20% recorrente lifetime |
| Reseller (revende com markup) | mínimo 5 contas/mês | 30% recorrente |
| White-label (marca própria) | mínimo 20 contas/mês | 40% recorrente |

### White-Label Setup

Parceiro recebe:
- Domínio próprio (ex: `agentes.suamarca.com.br` apontando pro mesmo Worker via CNAME)
- Customização: logo, cores, nome do agente (ex: "Ana" em vez de "Ravi")
- Chave API dedicada com quota da combinada
- Dashboard isolado com seus clientes

HB mantém:
- Infra (gateway, modelos, custos OpenAI/Gemini)
- Atualizações de skills + agentes
- Compliance LGPD
- Suporte de 1ª linha em até 24h
- SLA 99.5% uptime

## Onboarding Parceiro (1-2 semanas)

### Semana 1: Setup técnico
- [ ] Owner cria conta `partner-{slug}` no admin
- [ ] Owner provisiona chave `hbk_live_partner_{slug}_xxx`
- [ ] Parceiro fornece logo SVG + cores (hex)
- [ ] HB customiza widget JS branded
- [ ] DNS: parceiro adiciona CNAME `agentes.suamarca.com.br` → `cdn.hyperboosters.com`
- [ ] HB ativa SSL automático
- [ ] Smoke test com 5 chamadas reais

### Semana 2: Comercial
- [ ] Parceiro recebe pitch deck branded (pptx + pdf)
- [ ] Demo combinada (parceiro convida 3 leads, HB co-pilota)
- [ ] Definir primeiro mês: meta de N contratos
- [ ] Setup webhook Stripe pra split automático
- [ ] Primeiro recebimento: split de comissão até dia 5 do mês seguinte

## Restrições

Parceiro NÃO pode:
- Vender chaves API individuais separado da plataforma HB
- Modificar comportamento de agentes além de UI/branding
- Garantir SLA acima do que HB oferece
- Usar marca HyperBoosters sem aprovação prévia
- Operar em vertical que HB já tenha exclusividade contratual

## Verticais reservadas (não white-label)

- Saúde (planejada HB direto)
- Financeiro/fintech (planejada HB direto)
- Educação técnica (planejada HB direto)

Verticais abertas para white-label:
- Imobiliário
- Hotelaria/turismo
- E-commerce/D2C
- Eventos
- Consultoria/agências
- Serviços locais (clínicas, oficinas, etc)
- Outros mediante análise

## Suporte

Slack/Telegram canal dedicado por parceiro ≥30 contas. Abaixo: e-mail prioritário.

## Killswitch (proteção HB)

Se parceiro:
- Abuso de uso (>3x do contratado) sem upgrade
- Não pagamento ≥30 dias
- Quebra de NDA / vaza segredos comerciais
- Comportamento anti-ético com cliente final

→ HB pausa chave API + comunica formalmente, dá 7 dias pra regularizar.
