"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[mima:error]", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mono-caption mb-4 text-[var(--color-danger)]">
        // SYSTEM ERROR · PROTOCOL AURA TEMPORARILY OFFLINE
      </div>
      <h1
        className="font-display font-extrabold leading-[0.85] tracking-[-0.05em]"
        style={{ fontSize: "clamp(4rem, 14vw, 10rem)" }}
      >
        <span className="aura-text">ERROR</span>
      </h1>
      <p className="mt-4 max-w-md font-serif text-xl italic text-[var(--color-fg-1)]">
        Anomalia rilevata. Il documento è stato temporaneamente compromesso.
      </p>
      {error?.digest ? (
        <div className="mono-caption mt-2 text-[var(--color-fg-2)]">
          REF: {error.digest}
        </div>
      ) : null}
      <div className="mt-10">
        <Button onClick={reset} variant="aura" size="lg">
          Ritenta operazione
        </Button>
      </div>
    </div>
  );
}
