import "server-only";
import { createSupabaseAdminClient, isAdminAvailable } from "@/lib/supabase/admin";

/**
 * Reports current DB row counts vs seed counts so the dashboard can decide
 * whether to show the bootstrap button. Plain server function — must NOT
 * be a Server Action ("use server") because calling actions from Server
 * Components in Next.js 15 can interact badly with the RSC stream.
 */
export async function getDbStatus(): Promise<{
  ok: boolean;
  configured: boolean;
  tables?: Record<string, number>;
  error?: string;
}> {
  if (!isAdminAvailable()) {
    return { ok: false, configured: false };
  }
  try {
    const supabase = createSupabaseAdminClient();
    const tables = ["members", "events", "stories", "media", "timeline_entries"];
    const counts: Record<string, number> = {};
    for (const t of tables) {
      const { count, error } = await supabase
        .from(t)
        .select("*", { count: "exact", head: true });
      if (error) {
        return { ok: false, configured: true, error: `${t}: ${error.message}` };
      }
      counts[t] = count ?? 0;
    }
    return { ok: true, configured: true, tables: counts };
  } catch (e) {
    return {
      ok: false,
      configured: true,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
