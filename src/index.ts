#!/usr/bin/env node
/**
 * @hyperboosters/hyperagents
 *
 * MCP server exposing 16 specialist agents from the OpenClaw runtime as MCP tools.
 * Multi-provider (OpenAI gpt-5.5, Gemini 2.5, Anthropic Claude, OpenRouter, Ollama).
 *
 * Requires:
 *   - OpenClaw CLI installed (`openclaw` in PATH)
 *   - OpenClaw gateway running (default: http://127.0.0.1:18789), OR
 *     `--local` mode with model provider API keys in shell env.
 *
 * Usage in Claude Desktop / Cursor / Codex / Windsurf:
 *   "mcpServers": {
 *     "hyperagents": {
 *       "command": "npx",
 *       "args": ["-y", "@hyperboosters/hyperagents"]
 *     }
 *   }
 *
 * Environment variables:
 *   HB_AGENTS_MODE       — "gateway" (default) or "local"
 *   HB_AGENTS_TIMEOUT_MS — per-call timeout in ms (default 120000)
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spawn } from "node:child_process";
import { AGENTS } from "./agents.js";

const MODE = process.env.HB_AGENTS_MODE === "local" ? "local" : "gateway";
const TIMEOUT_MS = Number(process.env.HB_AGENTS_TIMEOUT_MS) || 120000;

interface RunResult {
  text: string;
  meta?: Record<string, unknown>;
}

function runAgent(agentId: string, message: string): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    const args = ["agent", "--agent", agentId, "-m", message, "--json"];
    if (MODE === "local") args.push("--local");

    const child = spawn("openclaw", args, {
      env: process.env,
    });

    let stdout = "";
    let stderr = "";

    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error(`Agent ${agentId} timed out after ${TIMEOUT_MS}ms`));
    }, TIMEOUT_MS);

    child.stdout.on("data", (d) => {
      stdout += d.toString();
    });
    child.stderr.on("data", (d) => {
      stderr += d.toString();
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      reject(
        new Error(
          `Failed to spawn openclaw CLI. Is OpenClaw installed? ${err.message}`,
        ),
      );
    });

    child.on("close", (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        reject(
          new Error(
            `openclaw agent exited ${code}. stderr: ${stderr.slice(0, 500)}`,
          ),
        );
        return;
      }
      try {
        const jsonStart = stdout.indexOf("{");
        if (jsonStart < 0) {
          reject(new Error(`No JSON in CLI output. stdout: ${stdout.slice(0, 500)}`));
          return;
        }
        const parsed = JSON.parse(stdout.slice(jsonStart));
        const payloads =
          parsed.result?.payloads ?? parsed.payloads ?? [];
        const text = payloads.map((p: { text?: string }) => p.text ?? "").join("\n").trim();
        if (!text) {
          reject(new Error(`Empty response from agent ${agentId}`));
          return;
        }
        resolve({ text, meta: parsed.result?.meta ?? parsed.meta });
      } catch (err) {
        reject(
          new Error(
            `Failed to parse CLI output: ${(err as Error).message}. raw: ${stdout.slice(0, 500)}`,
          ),
        );
      }
    });
  });
}

// ── McpServer (replaces deprecated Server + setRequestHandler) ──────────────

const server = new McpServer({
  name: "hyperagents",
  version: "0.2.0",
});

for (const agent of AGENTS) {
  server.tool(
    agent.toolName,
    `${agent.description}\n\nExample: "${agent.example}"`,
    {
      message: z
        .string()
        .describe(
          `Your question, prompt, or task for ${agent.displayName}. Send a complete, self-contained prompt — the agent has no prior context from your conversation.`,
        ),
    },
    async ({ message }) => {
      if (!message.trim()) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Empty message. Provide a "message" argument with your prompt for ${agent.displayName}.`,
            },
          ],
          isError: true,
        };
      }

      try {
        const result = await runAgent(agent.id, message);
        const usage = result.meta?.agentMeta as
          | { usage?: { total?: number }; model?: string }
          | undefined;
        const footer = usage
          ? `\n\n_[${agent.displayName} · ${usage.model ?? "?"} · ${usage.usage?.total ?? "?"} tokens]_`
          : "";
        return {
          content: [
            {
              type: "text" as const,
              text: result.text + footer,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error calling ${agent.displayName}: ${(err as Error).message}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}

// ── Start ────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
