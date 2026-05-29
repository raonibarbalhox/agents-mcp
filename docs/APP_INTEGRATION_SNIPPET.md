# Drop a Specialist Agent into any /app page in 5 minutes

> For: HyperBoosters Next.js app (`~/dev/Improvement/apps/web`, Next 16 App Router, Clerk, Tailwind/shadcn).
> The 10 `apiExposed` agents live at `api.hyperboosters.com`. The SDK wraps the REST calls.

---

## 1. Install + env

```bash
npm i @hyperboosters/hyperagents
```

**Vercel env var (server only — NEVER `NEXT_PUBLIC_`):**
```
HYPERAGENTS_API_KEY=hbk_live_your_key_here
```

---

## 2. Server proxy route

`apps/web/app/api/hyperagents/[slug]/run/route.ts`

```typescript
import { auth } from "@clerk/nextjs/server";
import { createHyperAgentsClient } from "@hyperboosters/hyperagents/client";
import { NextRequest, NextResponse } from "next/server";

const client = createHyperAgentsClient({
  apiKey: process.env.HYPERAGENTS_API_KEY!,
});

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const message = String(body.message ?? "").trim().slice(0, 4000);
  if (!message) return NextResponse.json({ error: "message required" }, { status: 400 });

  const result = await client.runAgent({ slug: params.slug, message });
  return NextResponse.json(result);
}
```

The `hbk_live_*` key **never touches the browser**. Clerk auth is enforced server-side.

---

## 3. Client hook

`apps/web/hooks/useHyperAgent.ts`

```typescript
"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import type { RunResult } from "@hyperboosters/hyperagents/client";

export function useHyperAgent(slug: string) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => { abortRef.current?.abort(); }, []);

  const run = useCallback(async (message: string) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/hyperagents/${encodeURIComponent(slug)}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        signal: abortRef.current.signal,
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setResult(await res.json());
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message);
    } finally { setLoading(false); }
  }, [slug]);

  return { run, loading, result, error };
}
```

---

## 4. Drop-in component

`apps/web/components/agents/AgentRunner.tsx`

```typescript
"use client";
import { useState } from "react";
import { useHyperAgent } from "@/hooks/useHyperAgent";

interface AgentRunnerProps {
  /** publicSlug — e.g. "sales", "ravi", "coding" */
  agent: string;
  placeholder?: string;
  label?: string;
}

export function AgentRunner({ agent, placeholder, label }: AgentRunnerProps) {
  const [input, setInput] = useState("");
  const { run, loading, result, error } = useHyperAgent(agent);

  return (
    <div className="flex flex-col gap-3">
      {label && <p className="text-sm font-medium text-foreground">{label}</p>}
      <textarea
        className="w-full min-h-[80px] rounded-md border border-input bg-background p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder={placeholder ?? "Ask the specialist…"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button
        className="self-end rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        disabled={loading || !input.trim()}
        onClick={() => run(input.trim())}
      >
        {loading ? "Thinking…" : "Ask"}
      </button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {result && (
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <p className="text-sm whitespace-pre-wrap">{result.text}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {result.agent} · {result.meta.model} · {result.meta.tokens} tokens
          </p>
        </div>
      )}
    </div>
  );
}
```

**Usage in any page:**
```tsx
import { AgentRunner } from "@/components/agents/AgentRunner";

// In your Server Component page, render this where needed:
<AgentRunner agent="sales" label="Ask HB Sales" placeholder="How do I qualify a lead?" />
<AgentRunner agent="coding" label="Code Review" />
<AgentRunner agent="ravi" />
```

---

## 5. Available agents (apiExposed=true, today)

| publicSlug | HB tool | Tier | Specialty |
|---|---|---|---|
| `ravi` | HB_orchestrator | free | Founder proxy — infra, strategy, anything |
| `sales` | HB_sales | pro | B2B sales, pt-BR scripts, objections |
| `whatsapp` | HB_whatsapp | pro | WA broadcast, voice notes, timing |
| `marketing` | HB_marketing | free | Content calendar, ads, SEO, copy |
| `coding` | HB_engineer | pro | Code review, arch, TypeScript/Python/Go |
| `devops` | HB_devops | pro | CI/CD, Docker, infra, runbooks |
| `security` | HB_security | business | OWASP, LGPD/GDPR, RLS, threat model |
| `analysis` | HB_analyst | pro | SWOT, MECE, market sizing (pt-BR) |
| `research` | HB_research | pro | Web research, competitors, fact-check |
| `pm` | HB_product | pro | PRD, roadmap, RICE/MoSCoW, OKRs |

**Gateway-only (not on API yet):** `sre`, `creative`, `outbound`, `mcp-builder`, `memory`, `generalist` — expose on the worker to unlock.

---

## 6. Security callout

> **Never call `api.hyperboosters.com` directly from the browser.**
> - `HYPERAGENTS_API_KEY` is a server secret — no `NEXT_PUBLIC_` prefix.
> - The proxy route (`/api/hyperagents/[slug]/run`) injects the key server-side and enforces Clerk auth.
> - The worker has `Access-Control-Allow-Origin: *` (CORS open) which invites unsafe browser calls — the server proxy is your security boundary.

---

## 7. Coordination note (multi-CLI active on Improvement)

Apply via a clean pathspec window:
```
Allowed:
  apps/web/app/api/hyperagents/**
  apps/web/hooks/useHyperAgent.ts
  apps/web/components/agents/AgentRunner.tsx
  apps/web/app/app/   (only the specific page you're adding the component to)

Not allowed (without explicit gate):
  git add -A
  apps/web/lib/agents/**  (other CLIs active here)
  any migration/RLS change
```

Full integration architecture in: `docs/INTEGRATION_PLAN.md`
