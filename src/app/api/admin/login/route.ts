import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { getSessionOptions, type AdminSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PASSWORD not configured on server" },
      { status: 500 },
    );
  }

  // Constant-time comparison
  if (!constantTimeEqual(parsed.data.password, expected)) {
    // Mild rate-limit by stalling a bit on failures
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  const session = await getIronSession<AdminSession>(
    cookieStore,
    getSessionOptions(),
  );
  session.authenticated = true;
  session.loginAt = Date.now();
  await session.save();

  return NextResponse.json({ ok: true });
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
