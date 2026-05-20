"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Database, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bootstrapSeed } from "@/lib/admin/actions";

interface BootstrapButtonProps {
  /** True when at least one table has rows. Shows a softer "re-sync" copy. */
  alreadyBootstrapped?: boolean;
}

export function BootstrapButton({ alreadyBootstrapped }: BootstrapButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  function run() {
    if (
      alreadyBootstrapped &&
      !confirm(
        "Il DB contiene già righe. Risincronizzare i seed sovrascrive (per id) i record originali con i valori di default. Continuare?",
      )
    ) {
      return;
    }
    startTransition(async () => {
      const res = await bootstrapSeed();
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setDone(true);
      toast.success(res.message ?? "Bootstrap completato");
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      variant={alreadyBootstrapped ? "ghost" : "aura"}
      size="sm"
      onClick={run}
      disabled={pending}
    >
      {done ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <Database className="h-3.5 w-3.5" />
      )}
      {pending
        ? "Sync…"
        : alreadyBootstrapped
          ? "Risincronizza seed"
          : "Bootstrap contenuti"}
    </Button>
  );
}
