# @hyperboosters/agents-mcp

> 16 Brazilian-trained AI agents — Ravi, Tiago, Filipe, João and more — as MCP tools for Claude Desktop, Cursor, Codex, Windsurf, and any MCP client.

Talk to specialist agents directly from your IDE or AI client. No web UI to switch to, no copy-paste between tabs.

```
"Cursor, ask ravi_sales how to handle objection: customer says it's too expensive"
"Claude, call coding_filipe to review this PR diff"
"Codex, ask navigator_research who are the top 5 BR AI platforms in 2026"
```

## Available Agents

| Tool | Role | Best For |
|---|---|---|
| `ravi_jarvis` | Owner Jarvis (pt-BR mineiro) | General Brazilian context, infra/devops, business strategy |
| `ravi_sales` | B2B Sales Specialist | Lead qualification, sales scripts, objection handling |
| `ravi_whatsapp` | WhatsApp Strategist | WA broadcasts, message timing, group dynamics |
| `sales_lucas` | Outbound Sales | Cold email, LinkedIn DMs (cheaper than ravi_sales) |
| `marketing_tiago` | Marketing | Content calendars, ad copy, SEO topics |
| `coding_filipe` | Senior Coding | Code review, refactoring, architecture |
| `devops_tomas` | DevOps + SRE | CI/CD, K8s, observability, runbooks |
| `security_audit` | Application Security | Threat modeling, OWASP, LGPD compliance |
| `sre_ops` | SRE | SLO/SLI design, incident postmortems |
| `analysis_joao` | Strategic Analysis | MECE, SWOT, market sizing (pt-BR) |
| `pm_product` | Product Manager | PRD writing, sprint planning |
| `creative` | Creative | Brand naming, taglines, brainstorming |
| `navigator_research` | Web Research | Market research, competitor analysis |
| `mcp_builder` | MCP Specialist | MCP/plugin development |
| `brain_curator` | Memory Specialist | Knowledge bases, RAG strategy |
| `main` | Generalist Fallback | When no specialist fits |

## Requirements

- Node.js >= 18
- [OpenClaw](https://docs.openclaw.ai) installed and running (`openclaw` in PATH)
- OpenClaw gateway running on `127.0.0.1:18789`, OR set `HB_AGENTS_MODE=local` and have provider API keys in shell env

## Install

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%/Claude/claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "hyperboosters-agents": {
      "command": "npx",
      "args": ["-y", "@hyperboosters/agents-mcp"]
    }
  }
}
```

Restart Claude Desktop. Tools appear in the tool list.

### Cursor

Settings → MCP Servers → Add new:

```json
{
  "hyperboosters-agents": {
    "command": "npx",
    "args": ["-y", "@hyperboosters/agents-mcp"]
  }
}
```

### Codex CLI

Edit `~/.codex/config.toml`:

```toml
[[mcp_servers]]
name = "hyperboosters-agents"
command = "npx"
args = ["-y", "@hyperboosters/agents-mcp"]
```

### Manual install (faster startup)

```bash
npm install -g @hyperboosters/agents-mcp
# Then in your MCP config use:
#   "command": "hyperboosters-agents-mcp"
```

## Usage Examples

Once installed, your AI client sees 16 new tools. Examples (in the AI client chat):

> Use `ravi_sales` to write a WhatsApp message reactivating a cold lead in a Brazilian SaaS context.

> Call `coding_filipe` to review this function and suggest improvements: <paste code>

> Ask `analysis_joao` for a SWOT analysis on entering the Brazilian healthcare SMB market.

> Use `navigator_research` to find the top 3 platforms that compete with HyperBoosters.

The agent runs on your local OpenClaw gateway, returns the text response, and your AI client integrates it into the conversation.

## Configuration

Environment variables (optional):

| Var | Default | Description |
|---|---|---|
| `HB_AGENTS_MODE` | `gateway` | `gateway` (use running gateway) or `local` (embedded, requires provider keys) |
| `HB_AGENTS_TIMEOUT_MS` | `120000` | Per-call timeout in ms |

## How It Works

1. MCP client (Claude/Cursor/Codex) spawns `npx -y @hyperboosters/agents-mcp` over stdio.
2. The MCP server lists 16 agents as tools.
3. When the client calls a tool, the server spawns `openclaw agent --agent <id> -m "<msg>" --json` and parses the response.
4. Returns the agent's text plus a footer with model + token usage.

## Cost / Performance Notes

- Each call invokes a real OpenClaw agent — costs flow through whatever provider that agent uses (openai/gpt-5.5, gemini-2.5-flash, free-tier OpenRouter, etc.).
- Typical first call: 10-20s (agent loads system prompt + memory).
- Subsequent calls in the same session: 3-8s (cached).
- Some agents (`creative`, `marketing_tiago`, `sales_lucas`) use free-tier models → zero marginal cost.
- Brazilian agents (`ravi_*`, `analysis_joao`) speak pt-BR mineiro natural.

## Roadmap

- [ ] HTTP transport (run MCP server remotely, no local OpenClaw needed)
- [ ] Hosted SaaS option (api.hyperboosters.com with API key)
- [ ] Streaming responses (currently buffered)
- [ ] Multi-turn session support (currently each call is fresh)
- [ ] Custom agent definitions via config file
- [ ] WhatsApp / Telegram bridge tools (deliver agent reply to your phone)

## License

MIT © Raoni Barbalho — HyperBoosters

## Links

- Website: https://hyperboosters.com
- OpenClaw: https://docs.openclaw.ai
- Twitter: TBD
- Issues: https://github.com/raonibarbalhox/agents-mcp/issues
