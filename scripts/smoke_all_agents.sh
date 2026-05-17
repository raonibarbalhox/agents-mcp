#!/usr/bin/env bash
# Smoke-test representative agents end-to-end against the live gateway.
# Output: ../QA_REPORT.md with per-agent response + latency + cost estimate.
#
# Usage: bash smoke_all_agents.sh
#
# Costs (rough): ~$1-3 total. Most agents are gpt-5.5 (first call ~50k input tokens).

set -uo pipefail

OUT="$(dirname "$0")/../QA_REPORT.md"
TS="$(date -Is)"

# 10 representative agents with curated test prompts
declare -A PROMPTS=(
  ["ravi-owner-jarvis"]="Em uma frase, qual o status do sistema OpenClaw agora? Responda em pt-BR."
  ["ravi-hb-sales"]="Cliente diz: 'Tá caro, preciso pensar.' Responda com objeção mineiro em 2 linhas."
  ["ravi-hb-wa"]="Mensagem WhatsApp curta (max 200 chars) reativando lead frio de PME de saúde que abandonou onboarding há 14 dias."
  ["coding"]="Em uma linha: prós/contras de usar Bun vs Node 22 em produção Cloudflare Worker."
  ["devops"]="Em 3 bullets: como configurar healthcheck periódico em Cloudflare Worker?"
  ["security"]="Em 2 linhas: principal risco LGPD ao guardar logs de API key em KV namespace?"
  ["marketing"]="3 headlines (max 8 palavras cada) para landing 'agentes IA brasileiros via MCP'."
  ["sales"]="Cold email 3 linhas para CTO de fintech BR sobre API de agentes IA pt-BR. Sem buzzword."
  ["navigator"]="Em uma linha: estado atual do mercado de MCP servers públicos (early 2026)."
  ["analysis"]="Em 3 bullets MECE: o que decide se launch de MCP server vira viral em comunidade dev BR?"
)

echo "# Agents End-to-End QA Report" > "$OUT"
echo "" >> "$OUT"
echo "> Generated: $TS" >> "$OUT"
echo "> Method: \`openclaw agent --agent <id> -m \"<prompt>\" --json\`" >> "$OUT"
echo "> Each agent gets a domain-appropriate prompt; we measure latency + tokens + quality." >> "$OUT"
echo "" >> "$OUT"
echo "| Agent | Status | Latency | Tokens | Model |" >> "$OUT"
echo "|---|---|---|---|---|" >> "$OUT"

declare -A RESULTS

for agent in "${!PROMPTS[@]}"; do
  prompt="${PROMPTS[$agent]}"
  echo "[$(date +%H:%M:%S)] Testing $agent ..."
  start=$(date +%s)
  raw=$(timeout 90 openclaw agent --agent "$agent" -m "$prompt" --json 2>&1)
  exit_code=$?
  end=$(date +%s)
  elapsed=$((end - start))

  if [ $exit_code -ne 0 ]; then
    RESULTS[$agent]="FAIL|${elapsed}s|n/a|n/a|$(echo "$raw" | tail -1 | head -c 100)"
    echo "| $agent | FAIL | ${elapsed}s | - | - |" >> "$OUT"
    continue
  fi

  # Extract from JSON (strip leading non-JSON warnings)
  json=$(echo "$raw" | awk '/^{/{found=1} found{print}')
  text=$(echo "$json" | jq -r '.result.payloads[0].text // .payloads[0].text // "(no text)"' 2>/dev/null)
  tokens=$(echo "$json" | jq -r '.result.meta.agentMeta.usage.total // .meta.agentMeta.usage.total // 0' 2>/dev/null)
  model=$(echo "$json" | jq -r '.result.meta.agentMeta.provider + "/" + .result.meta.agentMeta.model // .meta.agentMeta.model // "?"' 2>/dev/null)

  RESULTS[$agent]="OK|${elapsed}s|${tokens}|${model}|${text}"
  echo "| \`$agent\` | OK | ${elapsed}s | ${tokens} | ${model} |" >> "$OUT"
done

echo "" >> "$OUT"
echo "## Responses" >> "$OUT"
echo "" >> "$OUT"

for agent in "${!RESULTS[@]}"; do
  IFS='|' read -r status elapsed tokens model text <<< "${RESULTS[$agent]}"
  echo "### \`$agent\`" >> "$OUT"
  echo "" >> "$OUT"
  echo "**Prompt:** ${PROMPTS[$agent]}" >> "$OUT"
  echo "" >> "$OUT"
  echo "**Status:** $status · **Latency:** $elapsed · **Tokens:** $tokens · **Model:** $model" >> "$OUT"
  echo "" >> "$OUT"
  echo "**Response:**" >> "$OUT"
  echo "" >> "$OUT"
  echo '```' >> "$OUT"
  echo "$text" >> "$OUT"
  echo '```' >> "$OUT"
  echo "" >> "$OUT"
done

echo "## Summary" >> "$OUT"
echo "" >> "$OUT"
ok_count=0
fail_count=0
total_elapsed=0
total_tokens=0
for agent in "${!RESULTS[@]}"; do
  IFS='|' read -r status elapsed tokens model text <<< "${RESULTS[$agent]}"
  if [ "$status" = "OK" ]; then
    ok_count=$((ok_count + 1))
    elapsed_num=${elapsed%s}
    total_elapsed=$((total_elapsed + elapsed_num))
    total_tokens=$((total_tokens + ${tokens:-0}))
  else
    fail_count=$((fail_count + 1))
  fi
done
echo "- **Pass:** $ok_count / $((ok_count + fail_count))" >> "$OUT"
echo "- **Total elapsed:** ${total_elapsed}s" >> "$OUT"
echo "- **Total tokens:** $total_tokens" >> "$OUT"
echo "- **Avg latency:** $((total_elapsed / (ok_count > 0 ? ok_count : 1)))s per agent" >> "$OUT"

echo ""
echo "Report written to: $OUT"
echo "Pass: $ok_count / $((ok_count + fail_count)) · Total: ${total_elapsed}s · Tokens: $total_tokens"
