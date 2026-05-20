"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Users,
  CalendarRange,
  ScrollText,
  Image as ImageIcon,
  GitGraph,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useDictionary } from "@/lib/i18n/use-locale";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/admin", key: "dashboard" as const, icon: LayoutDashboard, exact: true },
  { href: "/admin/members", key: "members" as const, icon: Users },
  { href: "/admin/events", key: "events" as const, icon: CalendarRange },
  { href: "/admin/stories", key: "stories" as const, icon: ScrollText },
  { href: "/admin/media", key: "media" as const, icon: ImageIcon },
  { href: "/admin/timeline", key: "timeline" as const, icon: GitGraph },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { dict } = useDictionary();

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("Sessione chiusa");
      router.replace("/admin/login");
      router.refresh();
    } catch {
      toast.error(dict.common.error);
    }
  }

  return (
    <div className="relative min-h-screen pt-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-20 md:grid-cols-[240px,1fr]">
        <aside className="hidden md:block">
          <div className="sticky top-28 space-y-1">
            <div className="mb-4 px-3">
              <div className="mono-caption">// CONSOLE</div>
              <div className="font-display text-lg font-bold">MIMA · admin</div>
            </div>
            {LINKS.map((l) => {
              const active = l.exact ? pathname === l.href : pathname?.startsWith(l.href);
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-cursor="link"
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-white/[0.06] text-[var(--color-fg-0)] ring-1 ring-[var(--color-line-strong)]"
                      : "text-[var(--color-fg-1)] hover:bg-white/[0.04] hover:text-[var(--color-fg-0)]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{dict.admin.sections[l.key]}</span>
                </Link>
              );
            })}

            <div className="my-4 h-px bg-[var(--color-line)]" />

            <Link
              href="/"
              data-cursor="link"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[var(--color-fg-1)] hover:bg-white/[0.04] hover:text-[var(--color-fg-0)]"
            >
              <ArrowUpRight className="h-4 w-4" />
              <span>Front-end</span>
            </Link>

            <button
              type="button"
              onClick={logout}
              data-cursor="link"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-[var(--color-fg-1)] hover:bg-white/[0.04] hover:text-[var(--color-danger)]"
            >
              <LogOut className="h-4 w-4" />
              <span>{dict.admin.logoutCta}</span>
            </button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="-mx-6 mb-2 flex items-center gap-3 overflow-x-auto border-b border-[var(--color-line)] px-6 pb-3 md:hidden">
          {LINKS.map((l) => {
            const active = l.exact ? pathname === l.href : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 text-xs uppercase tracking-wider",
                  active
                    ? "border-transparent bg-white text-black"
                    : "border-[var(--color-line-strong)] text-[var(--color-fg-1)]",
                )}
              >
                {dict.admin.sections[l.key]}
              </Link>
            );
          })}
          <Button
            type="button"
            onClick={logout}
            variant="ghost"
            size="sm"
            className="shrink-0"
          >
            <LogOut className="h-3 w-3" />
          </Button>
        </div>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
