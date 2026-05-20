"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Single root client-side provider wrapper.
 * Mounts effect components (cursor, lenis, audio) and exposes a Toaster.
 * Keeps the root layout server-rendered for max performance.
 */
export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {children}
      {mounted ? (
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast:
                "glass-strong !border-[var(--color-line-strong)] !text-[var(--color-fg-0)]",
            },
          }}
        />
      ) : null}
    </>
  );
}
