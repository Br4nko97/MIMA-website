"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useDictionary } from "@/lib/i18n/use-locale";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/shared/reveal";
import { Tilt } from "@/components/shared/tilt";
import { GlassCard } from "@/components/shared/glass-card";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import type { MemberWithStats } from "@/lib/supabase/types";

export function MembersPreview({ members }: { members: MemberWithStats[] }) {
  const { dict, locale } = useDictionary();

  return (
    <section className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="mono-caption mb-3">
                // {dict.landing.membersEyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">
                {dict.landing.membersTitle}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button asChild variant="outline" size="lg">
              <Link href="/members" data-cursor="link">
                {dict.landing.membersCta}
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((m, i) => (
            <StaggerItem key={m.id} className={i === 0 ? "xl:col-span-2 xl:row-span-2" : ""}>
              <Tilt className="h-full">
                <Link
                  href={`/members/${m.slug}`}
                  data-cursor="view"
                  data-cursor-label="Open dossier"
                  className="block h-full"
                >
                  <GlassCard
                    hoverable
                    className="group flex h-full flex-col overflow-hidden"
                  >
                    <div className={`relative ${i === 0 ? "aspect-[4/5] xl:aspect-[4/5]" : "aspect-[3/4]"}`}>
                      <MemberAvatar
                        nickname={m.nickname}
                        src={m.avatar_url}
                        rounded="card"
                        className="absolute inset-0 m-2 rounded-[14px]"
                      />
                      <div className="pointer-events-none absolute inset-2 rounded-[14px] bg-gradient-to-t from-black/85 via-black/0 to-black/30" />

                      <div className="absolute left-5 top-5 flex items-center gap-2">
                        <ClassifiedTag
                          label={`№ 0${m.display_order}`}
                          variant="default"
                        />
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
                          <div className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                            {m.nickname}
                          </div>
                          <div className="mt-0.5 text-sm text-[var(--color-fg-1)]">
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

                    <div className="grid grid-cols-3 divide-x divide-[var(--color-line)] border-t border-[var(--color-line)] text-center">
                      <div className="px-3 py-3">
                        <div className="mono-caption">
                          {dict.members.statLabels.aura}
                        </div>
                        <div className="mt-1 font-display text-xl font-bold">
                          {m.stats?.aura ?? "—"}
                        </div>
                      </div>
                      <div className="px-3 py-3">
                        <div className="mono-caption">
                          {locale === "it" ? "Danger" : "Threat"}
                        </div>
                        <div className="mt-1 font-display text-xl font-bold">
                          {m.stats?.danger ?? "—"}
                        </div>
                      </div>
                      <div className="px-3 py-3">
                        <div className="mono-caption">
                          {locale === "it" ? "Caos" : "Chaos"}
                        </div>
                        <div className="mt-1 font-display text-xl font-bold">
                          {m.stats?.chaos_generation ?? "—"}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </Tilt>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
