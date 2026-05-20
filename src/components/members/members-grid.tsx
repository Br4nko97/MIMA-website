"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tilt } from "@/components/shared/tilt";
import { GlassCard } from "@/components/shared/glass-card";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { StaggerContainer, StaggerItem } from "@/components/shared/reveal";
import { useDictionary } from "@/lib/i18n/use-locale";
import type { MemberWithStats } from "@/lib/supabase/types";

export function MembersGrid({ members }: { members: MemberWithStats[] }) {
  const { dict, locale } = useDictionary();

  return (
    <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <StaggerItem key={m.id}>
          <Tilt className="h-full">
            <Link
              href={`/members/${m.slug}`}
              data-cursor="view"
              data-cursor-label="Open dossier"
              className="block h-full"
            >
              <GlassCard hoverable className="group flex h-full flex-col">
                <div className="relative aspect-[4/5]">
                  <MemberAvatar
                    nickname={m.nickname}
                    src={m.avatar_url}
                    rounded="card"
                    className="absolute inset-0 m-2 rounded-[14px]"
                  />
                  <div className="pointer-events-none absolute inset-2 rounded-[14px] bg-gradient-to-t from-black/90 via-black/0 to-black/30" />

                  <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                    <ClassifiedTag label={`№ 0${m.display_order}`} />
                    {m.classification ? (
                      <ClassifiedTag
                        label={m.classification}
                        variant={
                          m.classification === "LEGEND"
                            ? "aura"
                            : m.classification === "UNSTABLE"
                              ? "danger"
                              : m.classification === "CLASSIFIED"
                                ? "warn"
                                : "default"
                        }
                      />
                    ) : null}
                  </div>

                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                    <div>
                      <div className="font-display text-3xl font-bold tracking-tight">
                        {m.nickname}
                      </div>
                      <div className="text-sm text-[var(--color-fg-1)]">
                        {m.full_name}
                      </div>
                      <div className="mono-caption mt-2 text-[var(--color-aura-3)]">
                        {m.role_title ?? "—"}
                      </div>
                    </div>
                    <motion.div
                      className="rounded-full bg-white/[0.08] p-2 backdrop-blur-sm"
                      whileHover={{ rotate: 45 }}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-4 divide-x divide-[var(--color-line)] border-t border-[var(--color-line)] text-center">
                  <Stat label={dict.members.statLabels.aura} value={m.stats?.aura} />
                  <Stat
                    label={locale === "it" ? "Danger" : "Threat"}
                    value={m.stats?.danger}
                  />
                  <Stat
                    label={locale === "it" ? "Caos" : "Chaos"}
                    value={m.stats?.chaos_generation}
                  />
                  <Stat
                    label={locale === "it" ? "Surv." : "Surv."}
                    value={m.stats?.survivability}
                  />
                </div>
              </GlassCard>
            </Link>
          </Tilt>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

function Stat({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="px-2 py-3">
      <div className="mono-caption text-[9px]">{label}</div>
      <div className="mt-1 font-display text-xl font-bold">{value ?? "—"}</div>
    </div>
  );
}
