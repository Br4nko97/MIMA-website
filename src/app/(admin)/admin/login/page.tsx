import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth/require-admin";
import { LoginForm } from "@/components/admin/login-form";
import { AnimatedGradient } from "@/components/effects/animated-gradient";

export const metadata = {
  title: "Admin login",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const authed = await isAdminAuthenticated();
  if (authed) redirect("/admin");

  const { next } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <AnimatedGradient intensity="low" />
      </div>
      <div className="w-full max-w-md">
        <div className="mono-caption mb-3 text-[var(--color-aura-3)]">
          // RESTRICTED ACCESS
        </div>
        <h1 className="font-display text-4xl font-extrabold leading-none tracking-[-0.04em] md:text-5xl">
          <span className="aura-text">MIMA · CONSOLE</span>
        </h1>
        <p className="mt-4 max-w-sm text-sm text-[var(--color-fg-1)]">
          Solo personale autorizzato dal protocollo AURA. Tutti gli accessi sono registrati.
        </p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
