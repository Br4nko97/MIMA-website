import { NextResponse, type NextRequest } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth/require-admin";
import { createSupabaseAdminClient, isAdminAvailable } from "@/lib/supabase/admin";
import { slugify } from "@/lib/utils/slugify";

const ALLOWED_BUCKETS = ["members", "events", "stories", "media", "audio"] as const;
type AllowedBucket = (typeof ALLOWED_BUCKETS)[number];

export async function POST(req: NextRequest) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdminAvailable()) {
    return NextResponse.json(
      { ok: false, error: "Service role key not configured" },
      { status: 503 },
    );
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ ok: false, error: "Invalid form" }, { status: 400 });
  }

  const file = form.get("file");
  const bucketRaw = (form.get("bucket") ?? "media") as string;
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
  }

  if (!ALLOWED_BUCKETS.includes(bucketRaw as AllowedBucket)) {
    return NextResponse.json({ ok: false, error: "Invalid bucket" }, { status: 400 });
  }
  const bucket = bucketRaw as AllowedBucket;

  // Size guard (50MB)
  if (file.size > 50 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "File too large (max 50MB)" }, {
      status: 413,
    });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const safeName = slugify(file.name.replace(/\.[^.]+$/, "")) || "file";
  const key = `${Date.now()}-${safeName}.${ext}`;

  const supabase = createSupabaseAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage
    .from(bucket)
    .upload(key, buffer, {
      contentType: file.type || undefined,
      upsert: false,
    });
  if (upErr) {
    return NextResponse.json({ ok: false, error: upErr.message }, { status: 500 });
  }

  const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(key);
  return NextResponse.json({ ok: true, url: publicData.publicUrl, bucket, key });
}
