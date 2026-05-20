import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getMembers } from "@/lib/data/queries";
import { MemberFormClient } from "@/components/admin/member-form-client";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminMemberEditPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";

  const members = await getMembers();
  const member = isNew ? null : members.find((m) => m.id === id);
  if (!isNew && !member) notFound();

  return (
    <div>
      <div className="mb-6">
        <div className="mono-caption mb-2 text-[var(--color-aura-3)]">
          // {isNew ? "NEW SUBJECT" : "EDIT SUBJECT"}
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          {isNew ? "Nuovo soggetto" : (member?.nickname ?? "Subject")}
        </h1>
      </div>
      <MemberFormClient member={member} />
    </div>
  );
}
