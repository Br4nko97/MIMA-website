import { AdminShell } from "@/components/admin/admin-shell";
import { isAdminAuthenticated } from "@/lib/auth/require-admin";

export const metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();
  // Admin login page renders without shell
  return authed ? <AdminShell>{children}</AdminShell> : <>{children}</>;
}
