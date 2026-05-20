import { LandingHero } from "@/components/landing/hero";
import { ManifestSection } from "@/components/landing/manifest-section";
import { ClassifiedBanner } from "@/components/landing/classified-banner";
import { MembersPreview } from "@/components/landing/members-preview";
import { StatsSection } from "@/components/landing/stats-section";
import { RecentOps } from "@/components/landing/recent-ops";
import { EnterArchive } from "@/components/landing/enter-archive";
import { getMembers, getRecentEvents } from "@/lib/data/queries";

export const revalidate = 60;

export default async function LandingPage() {
  const [members, recentEvents] = await Promise.all([
    getMembers(),
    getRecentEvents(3),
  ]);

  return (
    <>
      <LandingHero />
      <ManifestSection />
      <ClassifiedBanner />
      <MembersPreview members={members} />
      <StatsSection />
      <RecentOps events={recentEvents} />
      <EnterArchive />
    </>
  );
}
