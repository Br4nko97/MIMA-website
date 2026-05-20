"use client";

import { motion } from "framer-motion";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { Reveal } from "@/components/shared/reveal";
import { useDictionary } from "@/lib/i18n/use-locale";
import { classifiedCode } from "@/lib/utils/classified";
import type { MemberWithStats } from "@/lib/supabase/types";

export function MemberDetailHero({ member }: { member: MemberWithStats }) {
  const { dict } = useDictionary();
  const code = classifiedCode(member.slug, "SUBJ");

  return (
    <section className="relative">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        {/* Avatar */}
        <Reveal className="md:col-span-5" y={32}>
          <div className="relative">
            <MemberAvatar
              nickname={member.nickname}
              src={member.cover_url ?? member.avatar_url}
              rounded="xl"
              className="aspect-[4/5]"
            />

            {/* Classification badge floating */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute right-4 top-4 flex flex-col items-end gap-2"
            >
              <ClassifiedTag label={`№ 0${member.display_order}`} />
              {member.classification ? (
                <ClassifiedTag
                  label={member.classification}
                  variant={
                    member.classification === "LEGEND"
                      ? "aura"
                      : member.classification === "UNSTABLE"
                        ? "danger"
                        : member.classification === "CLASSIFIED"
                          ? "warn"
                          : "default"
                  }
                />
              ) : null}
            </motion.div>

            {/* Bottom strip */}
            <div className="mono-caption absolute bottom-4 left-4 right-4 flex items-center justify-between text-[var(--color-fg-0)]/80">
              <span>{code}</span>
              <span>last seen 03:42</span>
            </div>
          </div>
        </Reveal>

        {/* Info */}
        <div className="md:col-span-7">
          <Reveal>
            <div className="mono-caption mb-4 text-[var(--color-aura-3)]">
              {member.role_title ?? "—"}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              className="font-display font-extrabold leading-[0.85] tracking-[-0.05em]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
            >
              <span className="aura-text">{member.nickname}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-3 font-serif text-2xl italic text-[var(--color-fg-1)] md:text-3xl">
              {member.full_name}
            </div>
          </Reveal>

          {/* Metadata grid */}
          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--color-line)] pt-8">
              <div>
                <dt className="mono-caption">
                  {dict.members.classificationLabel}
                </dt>
                <dd className="mt-1 font-display text-xl font-bold">
                  {member.classification ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="mono-caption">{dict.members.schoolLabel}</dt>
                <dd className="mt-1 font-display text-xl font-bold">
                  {member.school ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="mono-caption">Doc. ref</dt>
                <dd className="mt-1 font-mono text-base text-[var(--color-fg-0)]">
                  {code}
                </dd>
              </div>
              <div>
                <dt className="mono-caption">Status</dt>
                <dd className="mt-1 flex items-center gap-2 text-base">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-[var(--color-success)]" />
                  <span>{member.is_active ? "Active" : "Dormant"}</span>
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Badges */}
          {member.badges && member.badges.length > 0 ? (
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {member.badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center rounded-full border border-[var(--color-line-strong)] bg-white/[0.02] px-3 py-1 text-xs uppercase tracking-wider text-[var(--color-fg-1)]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
