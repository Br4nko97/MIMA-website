import { requireAdmin } from "@/lib/auth/require-admin";
import { getMedia } from "@/lib/data/queries";
import { AdminMediaPanel } from "@/components/admin/admin-media-panel";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  await requireAdmin();
  const media = await getMedia();

  return (
    <div>
      <div className="mb-6">
        <div className="mono-caption mb-2 text-[var(--color-aura-3)]">// MEDIA</div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Materiale
        </h1>
        <p className="mt-2 text-sm text-[var(--color-fg-1)]">
          Carica un file e annotalo. L&apos;upload pubblica il file su Supabase Storage e
          aggiunge un record alla tabella media.
        </p>
      </div>
      <AdminMediaPanel rows={media} />
    </div>
  );
}
