import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getMemberBySlug, getMembers } from "@/lib/data/queries";
import { MemberAvatar } from "@/components/shared/member-avatar";
import { MemberStatsRadar } from "@/components/members/member-stats-radar";
import { GlassCard } from "@/components/shared/glass-card";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { MemberDetailHero } from "@/components/members/member-detail-hero";
import { LocaleString } from "@/components/shared/locale-aware";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) return { title: "Soggetto sconosciuto" };
  return {
    title: `${member.nickname} · ${member.full_name}`,
    description: member.bio_it ?? undefined,
  };
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) notFound();

  const others = (await getMembers()).filter((m) => m.id !== member.id).slice(0, 6);

  return (
    <article className="pb-32 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Button asChild variant="ghost" size="sm" className="mb-10">
            <Link href="/members" data-cursor="link">
              <ArrowLeft className="h-4 w-4" /> All subjects
            </Link>
          </Button>
        </Reveal>

        <MemberDetailHero member={member} />

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Bio + phrases + achievements */}
          <div className="space-y-12 md:col-span-7">
            <Section titleIt="Background" titleEn="Background" code="01">
              <p className="font-serif text-xl leading-[1.6] text-[var(--color-fg-1)] md:text-2xl">
                <LocaleString
                  it={member.bio_it ?? "—"}
                  en={member.bio_en ?? "—"}
                />
              </p>
            </Section>

            {member.favorite_phrases && member.favorite_phrases.length > 0 ? (
              <Section
                titleIt="Citazioni documentate"
                titleEn="Documented quotes"
                code="02"
              >
                <ul className="space-y-4">
                  {member.favorite_phrases.map((p, i) => (
                    <li
                      key={i}
                      className="border-l-2 border-[var(--color-aura-1)]/60 pl-5 font-serif text-lg italic text-[var(--color-fg-1)] md:text-xl"
                    >
                      &ldquo;{p}&rdquo;
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {member.achievements && member.achievements.length > 0 ? (
              <Section titleIt="Riconoscimenti" titleEn="Recognitions" code="03">
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {member.achievements.map((a, i) => (
                    <li key={i}>
                      <GlassCard className="p-5">
                        <div className="mono-caption mb-2 text-[var(--color-aura-3)]">
                          № {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="text-sm text-[var(--color-fg-0)]">{a}</div>
                      </GlassCard>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}
          </div>

          {/* Radar + metadata */}
          <aside className="md:col-span-5">
            <Section
              titleIt="Profilo operativo"
              titleEn="Operational profile"
              code="04"
            >
              <GlassCard className="p-6 md:p-8">
                <MemberStatsRadar stats={member.stats} />
              </GlassCard>
            </Section>
          </aside>
        </div>

        {/* Related */}
        <section className="mt-24">
          <Reveal>
            <div className="mono-caption mb-3">// Related subjects</div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              Altri soggetti del collettivo
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {others.map((o) => (
              <Link
                key={o.id}
                href={`/members/${o.slug}`}
                data-cursor="view"
                className="group"
              >
                <GlassCard hoverable className="overflow-hidden">
                  <div className="aspect-[3/4]">
                    <MemberAvatar
                      nickname={o.nickname}
                      src={o.avatar_url}
                      rounded="card"
                      className="h-full w-full rounded-none"
                    />
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div>
                      <div className="font-display text-sm font-bold">
                        {o.nickname}
                      </div>
                      <div className="mono-caption">{o.role_title ?? "—"}</div>
                    </div>
                    <ArrowUpRight className="h-3 w-3 text-[var(--color-fg-2)] transition-colors group-hover:text-[var(--color-fg-0)]" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function Section({
  titleIt,
  titleEn,
  code,
  children,
}: {
  titleIt: string;
  titleEn: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Reveal>
        <div className="mb-5 flex items-baseline gap-3">
          <span className="mono-caption text-[var(--color-aura-3)]">§ {code}</span>
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            <LocaleString it={titleIt} en={titleEn} />
          </h2>
        </div>
      </Reveal>
      {children}
    </section>
  );
}
