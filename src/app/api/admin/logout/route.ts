import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { getSessionOptions, type AdminSession } from "@/lib/auth/session";

export async function POST() {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSession>(
    cookieStore,
    getSessionOptions(),
  );
  session.destroy();
  return NextResponse.json({ ok: true });
}
