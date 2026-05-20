import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import {
  type AdminSession,
  getSessionOptions,
} from "./session";

export async function getAdminSession(): Promise<AdminSession> {
  const cookieStore = await cookies();
  return getIronSession<AdminSession>(cookieStore, getSessionOptions());
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return Boolean(session.authenticated);
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }
  return session;
}
