/**
 * @hyperboosters/hyperagents — REST client for api.hyperboosters.com
 *
 * ⚠️  SECURITY: The API key (hbk_live_*) is a SERVER-SIDE secret.
 * Never import or use this client in browser bundles or "use client" components.
 * Always call from a Next.js route handler / server action / edge function.
 */

export interface HyperAgentsClientOptions {
  apiKey: string;
  /** @default "https://api.hyperboosters.com" */
  baseUrl?: string;
  /** Custom fetch implementation (e.g. for testing). @default globalThis.fetch */
  fetch?: typeof fetch;
  /** Per-request timeout in ms. @default 130000 */
  timeoutMs?: number;
}

export interface AgentSummary {
  publicSlug: string;
  displayName: string;
  description: string;
  tier: "free" | "pro" | "business";
}

export interface RunResult {
  agent: string;
  text: string;
  meta: {
    model: string;
    tokens: number;
    duration_ms: number;
    quota_remaining: number;
  };
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatResult {
  ok: boolean;
  reply: string;
  model: string;
  provider: string;
  agent: string;
  usage: unknown;
  latency_ms: number;
  quota_remaining: number;
}

export interface MeResult {
  owner: string;
  plan: string;
  used_today: number;
  daily_limit: number;
  created_at: string;
}

export class HyperAgentsError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly body?: string,
  ) {
    super(message);
    this.name = "HyperAgentsError";
  }
}

function combineSignals(
  external: AbortSignal | undefined,
  timeoutMs: number,
): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error(`HyperAgents timeout after ${timeoutMs}ms`)), timeoutMs);
  const cleanup = () => clearTimeout(timer);
  external?.addEventListener("abort", () => { controller.abort(external.reason); cleanup(); }, { once: true });
  return { signal: controller.signal, cleanup };
}

export function createHyperAgentsClient(opts: HyperAgentsClientOptions) {
  const baseUrl = (opts.baseUrl ?? "https://api.hyperboosters.com").replace(/\/$/, "");
  const timeoutMs = opts.timeoutMs ?? 130_000;
  const _fetch = opts.fetch ?? globalThis.fetch.bind(globalThis);

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    signal?: AbortSignal,
  ): Promise<T> {
    const { signal: combined, cleanup } = combineSignals(signal, timeoutMs);
    try {
      const res = await _fetch(`${baseUrl}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${opts.apiKey}`,
        },
        body: body != null ? JSON.stringify(body) : undefined,
        signal: combined,
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new HyperAgentsError(`API error ${res.status} ${res.statusText}`, res.status, text);
      }
      return res.json() as Promise<T>;
    } finally {
      cleanup();
    }
  }

  return {
    /** List all publicly exposed agents (no auth required, key sent anyway). */
    async listAgents(): Promise<AgentSummary[]> {
      const data = await request<{ agents: AgentSummary[] }>("GET", "/v1/agents");
      return data.agents;
    },

    /** Invoke a specific agent by its publicSlug. */
    async runAgent(args: {
      slug: string;
      message: string;
      thinking?: boolean;
      signal?: AbortSignal;
    }): Promise<RunResult> {
      return request<RunResult>(
        "POST",
        `/v1/agent/${encodeURIComponent(args.slug)}/run`,
        { message: args.message, thinking: args.thinking },
        args.signal,
      );
    },

    /** OpenAI-compatible chat endpoint — routes to the best agent for the model string. */
    async chat(args: {
      messages: ChatMessage[];
      model?: string;
      system?: string;
      temperature?: number;
      signal?: AbortSignal;
    }): Promise<ChatResult> {
      const { signal, ...body } = args;
      return request<ChatResult>("POST", "/v1/chat", body, signal);
    },

    /** Get usage/quota info for the current API key. */
    async me(): Promise<MeResult> {
      return request<MeResult>("GET", "/v1/me");
    },
  };
}
