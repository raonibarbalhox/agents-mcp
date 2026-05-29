# Changelog

All notable changes to `@hyperboosters/hyperagents`.
Format: [Keep a Changelog](https://keepachangelog.com/). Versioning: [SemVer](https://semver.org/).

## [0.4.0] - 2026-05-29

### Changed (BREAKING)
- **MCP tool names renamed** from persona-based to function-based `HB_<function>` namespace.
  Update your MCP client config / prompts that reference old names:

  | Old | New |
  |-----|-----|
  | `ravi_jarvis` | `HB_orchestrator` |
  | `ravi_sales` | `HB_sales` |
  | `ravi_whatsapp` | `HB_whatsapp` |
  | `sales_lucas` | `HB_outbound` |
  | `marketing_tiago` | `HB_marketing` |
  | `coding_filipe` | `HB_engineer` |
  | `devops_tomas` | `HB_devops` |
  | `security_audit` | `HB_security` |
  | `sre_ops` | `HB_sre` |
  | `analysis_joao` | `HB_analyst` |
  | `pm_product` | `HB_product` |
  | `creative` | `HB_creative` |
  | `navigator_research` | `HB_research` |
  | `mcp_builder` | `HB_mcp_builder` |
  | `brain_curator` | `HB_memory` |
  | `main` | `HB_generalist` |

  Personas (Ravi, Filipe, João, Barnabé…) are preserved in each tool's display name and description.
  The underlying OpenClaw agent ids are unchanged — only the public MCP tool surface changed.

### Added
- Catalog integrity test suite (`npm test`): asserts 16 agents, unique ids/tool names, MCP-safe + `HB_`-namespaced names, description length.
- `prepublishOnly` now gates publish on `build + test`.
- This CHANGELOG.

### Fixed
- MCP server version no longer hardcoded — read from `package.json` at runtime so it never drifts from the published version.
- `scripts/publish.sh` referenced the pre-rebrand package name (`agents-mcp`) in its post-publish steps; updated to `hyperagents`.

## [0.3.0] - 2026-05-19
- Migrated to `McpServer` API (from deprecated `Server` + `setRequestHandler`).

## [0.2.0] - 2026-05-18
- Rebrand: `@hyperboosters/agents-mcp` → `@hyperboosters/hyperagents`.

[0.4.0]: https://github.com/raonibarbalhox/agents-mcp/releases/tag/v0.4.0
[0.3.0]: https://github.com/raonibarbalhox/agents-mcp/releases/tag/v0.3.0
[0.2.0]: https://github.com/raonibarbalhox/agents-mcp/releases/tag/v0.2.0
