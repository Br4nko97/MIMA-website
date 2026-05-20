import type { Metadata } from "next";
import { MembersGrid } from "@/components/members/members-grid";
import { PageHeader } from "@/components/layout/page-header";
import { getMembers } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Soggetti documentati",
  description: "Dossier individuale di ciascun membro del collettivo MIMA.",
};

export const revalidate = 60;

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div className="pb-24 pt-36 md:pt-44">
      <PageHeader
        eyebrowKey="members"
        countLabel={`${members.length.toString().padStart(2, "0")} subjects`}
      />
      <div className="mx-auto max-w-7xl px-6">
        <MembersGrid members={members} />
      </div>
    </div>
  );
}
