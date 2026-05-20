"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/lib/i18n/use-locale";
import { GlassCard } from "@/components/shared/glass-card";

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const { dict } = useDictionary();
  const [password, setPassword] = useState("");
  const [pending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (!res.ok) {
          toast.error(dict.admin.loginError);
          setPassword("");
          return;
        }
        router.replace(next && next.startsWith("/admin") ? next : "/admin");
        router.refresh();
      } catch (err) {
        toast.error(dict.common.error);
        console.error(err);
      }
    });
  }

  return (
    <GlassCard variant="strong" className="mt-10 p-8">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">{dict.admin.passwordLabel}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={dict.admin.passwordPlaceholder}
            autoComplete="current-password"
            autoFocus
            required
          />
        </div>
        <Button
          type="submit"
          variant="aura"
          size="lg"
          className="w-full"
          disabled={pending}
        >
          {pending ? "…" : dict.admin.loginCta}
        </Button>
      </form>
    </GlassCard>
  );
}
