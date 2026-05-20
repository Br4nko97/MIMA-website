"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/shared/glass-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileUpload } from "./file-upload";
import {
  upsertMember,
  deleteMember,
  upsertMemberStats,
} from "@/lib/admin/actions";
import type { MemberWithStats } from "@/lib/supabase/types";
import { STAT_KEYS, type StatKey } from "@/lib/content/members-seed";
import { slugify } from "@/lib/utils/slugify";

interface MemberFormProps {
  member: MemberWithStats | null;
}

function joinArr(arr?: string[] | null): string {
  return arr?.join("\n") ?? "";
}
function splitArr(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function MemberFormClient({ member }: MemberFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [form, setForm] = useState({
    slug: member?.slug ?? "",
    full_name: member?.full_name ?? "",
    nickname: member?.nickname ?? "",
    role_title: member?.role_title ?? "",
    school: member?.school ?? "Fermi",
    classification: member?.classification ?? "DOCUMENTED",
    avatar_url: member?.avatar_url ?? "",
    cover_url: member?.cover_url ?? "",
    bio_it: member?.bio_it ?? "",
    bio_en: member?.bio_en ?? "",
    favorite_phrases: joinArr(member?.favorite_phrases),
    achievements: joinArr(member?.achievements),
    badges: (member?.badges ?? []).join(", "),
    display_order: member?.display_order ?? 99,
    is_active: member?.is_active ?? true,
  });

  const initialStats = Object.fromEntries(
    STAT_KEYS.map((k) => [k, member?.stats?.[k as StatKey] ?? 50]),
  ) as Record<StatKey, number>;
  const [stats, setStats] = useState(initialStats);

  function update<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function save() {
    const slug = form.slug || slugify(form.nickname);
    const payload = {
      ...form,
      slug,
      role_title: form.role_title || null,
      school: (form.school || null) as "Fermi" | "D'Este" | "Altro" | null,
      classification: form.classification || null,
      avatar_url: form.avatar_url || null,
      cover_url: form.cover_url || null,
      bio_it: form.bio_it || null,
      bio_en: form.bio_en || null,
      favorite_phrases: splitArr(form.favorite_phrases),
      achievements: splitArr(form.achievements),
      badges: form.badges
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    startTransition(async () => {
      const res = await upsertMember(payload, member?.id);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      // Also upsert stats if we have member id (only on edit; for new, we'd need the id back — simplified)
      if (member?.id) {
        const statRes = await upsertMemberStats({ member_id: member.id, ...stats });
        if (!statRes.ok) toast.warning(`Member saved but stats failed: ${statRes.error}`);
      }
      toast.success("Saved");
      router.push("/admin/members");
      router.refresh();
    });
  }

  async function remove() {
    if (!member?.id) return;
    if (!confirm("Eliminare definitivamente?")) return;
    startTransition(async () => {
      const res = await deleteMember(member.id);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Deleted");
      router.push("/admin/members");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-end gap-2">
        {member?.id ? (
          <Button variant="destructive" size="sm" onClick={remove} disabled={pending}>
            <Trash2 className="h-3.5 w-3.5" /> Elimina
          </Button>
        ) : null}
        <Button variant="aura" onClick={save} disabled={pending}>
          <Save className="h-4 w-4" />
          {pending ? "…" : "Salva"}
        </Button>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="bio">Bio · IT/EN</TabsTrigger>
          <TabsTrigger value="lore">Frasi · Achievements</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <GlassCard variant="strong" className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Nickname</Label>
              <Input
                value={form.nickname}
                onChange={(e) => update("nickname", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                placeholder={slugify(form.nickname)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Nome completo</Label>
              <Input
                value={form.full_name}
                onChange={(e) => update("full_name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Ruolo</Label>
              <Input
                value={form.role_title}
                onChange={(e) => update("role_title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Scuola</Label>
              <select
                value={form.school}
                onChange={(e) => update("school", e.target.value)}
                className="h-11 rounded-xl border border-[var(--color-line-strong)] bg-white/[0.03] px-4 text-sm"
              >
                <option value="Fermi">Fermi</option>
                <option value="D'Este">D&apos;Este</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Classification</Label>
              <select
                value={form.classification}
                onChange={(e) => update("classification", e.target.value)}
                className="h-11 rounded-xl border border-[var(--color-line-strong)] bg-white/[0.03] px-4 text-sm"
              >
                <option>PUBLIC</option>
                <option>DOCUMENTED</option>
                <option>RESTRICTED</option>
                <option>CLASSIFIED</option>
                <option>UNSTABLE</option>
                <option>LEGEND</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Display order</Label>
              <Input
                type="number"
                value={form.display_order}
                onChange={(e) => update("display_order", parseInt(e.target.value || "0", 10))}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <FileUpload
                bucket="members"
                label="Avatar URL"
                value={form.avatar_url}
                onChange={(url) => update("avatar_url", url)}
                accept="image/*"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <FileUpload
                bucket="members"
                label="Cover URL"
                value={form.cover_url}
                onChange={(url) => update("cover_url", url)}
                accept="image/*"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Badges (separate by comma)</Label>
              <Input
                value={form.badges}
                onChange={(e) => update("badges", e.target.value)}
                placeholder="fondatore, vettore del caos"
              />
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="bio">
          <GlassCard variant="strong" className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Bio IT</Label>
              <Textarea
                value={form.bio_it}
                onChange={(e) => update("bio_it", e.target.value)}
                className="min-h-[260px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Bio EN</Label>
              <Textarea
                value={form.bio_en}
                onChange={(e) => update("bio_en", e.target.value)}
                className="min-h-[260px]"
              />
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="lore">
          <GlassCard variant="strong" className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Frasi celebri (una per riga)</Label>
              <Textarea
                value={form.favorite_phrases}
                onChange={(e) => update("favorite_phrases", e.target.value)}
                className="min-h-[260px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Achievements (uno per riga)</Label>
              <Textarea
                value={form.achievements}
                onChange={(e) => update("achievements", e.target.value)}
                className="min-h-[260px]"
              />
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="stats">
          <GlassCard variant="strong" className="p-6">
            {!member?.id ? (
              <div className="text-sm text-[var(--color-fg-2)]">
                Salva prima il soggetto, poi modifica le statistiche.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {STAT_KEYS.map((k) => (
                  <div key={k} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`stat-${k}`} className="capitalize">
                        {k.replace(/_/g, " ")}
                      </Label>
                      <span className="font-mono text-sm tabular-nums">
                        {stats[k]}
                      </span>
                    </div>
                    <input
                      id={`stat-${k}`}
                      type="range"
                      min={0}
                      max={100}
                      value={stats[k]}
                      onChange={(e) =>
                        setStats((s) => ({
                          ...s,
                          [k]: parseInt(e.target.value, 10),
                        }))
                      }
                      className="h-1.5 w-full appearance-none rounded-full bg-white/[0.08] accent-[var(--color-aura-1)]"
                    />
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
