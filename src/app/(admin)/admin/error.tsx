"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Admin-scoped error boundary. Shows the actual error message so we can
 * diagnose issues from the live site instead of the generic "ERROR" page.
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin:error]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-20 pt-32">
      <div className="mono-caption mb-3 text-[var(--color-danger)]">
        // ADMIN ERROR
      </div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        Qualcosa è andato storto
      </h1>
      <p className="mt-3 text-sm text-[var(--color-fg-1)]">
        L&apos;errore sotto è quello reale lanciato dal server. Copialo per il debug.
      </p>

      <div className="mt-6 rounded-2xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/[0.06] p-5">
        <div className="mono-caption mb-2 text-[var(--color-danger)]">
          {error.name ?? "Error"}
          {error.digest ? ` · digest ${error.digest}` : ""}
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs text-[var(--color-fg-0)]">
          {error.message || "Unknown error"}
        </pre>
        {error.stack ? (
          <details className="mt-3">
            <summary className="mono-caption cursor-pointer text-[var(--color-fg-2)]">
              stack trace
            </summary>
            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[10px] text-[var(--color-fg-2)]">
              {error.stack}
            </pre>
          </details>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={reset} variant="aura" size="sm">
          Ritenta
        </Button>
        <Button asChild variant="ghost" size="sm">
          <a href="/admin">Torna alla dashboard</a>
        </Button>
      </div>
    </div>
  );
}
