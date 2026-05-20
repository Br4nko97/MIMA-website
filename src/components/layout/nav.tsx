"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useDictionary, useLocaleStore } from "@/lib/i18n/use-locale";
import { useAudioStore } from "@/lib/store/audio";
import { useUIStore } from "@/lib/store/ui";
import { useMounted } from "@/hooks/use-mounted";

const PUBLIC_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/members", key: "members" as const },
  { href: "/tour", key: "tour" as const },
  { href: "/stories", key: "stories" as const },
  { href: "/media", key: "media" as const },
  { href: "/timeline", key: "timeline" as const },
];

export function Nav() {
  const pathname = usePathname();
  const mounted = useMounted();
  const { dict, locale } = useDictionary();
  const toggleLocale = useLocaleStore((s) => s.toggle);
  const audioEnabled = useAudioStore((s) => s.enabled);
  const toggleAudio = useAudioStore((s) => s.toggle);
  const navOpen = useUIStore((s) => s.navOpen);
  const setNavOpen = useUIStore((s) => s.setNavOpen);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname, setNavOpen]);

  // Hide top-level public nav on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed left-0 right-0 top-0 z-[90] transition-all duration-500",
          scrolled ? "px-3 py-3" : "px-6 py-5",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex w-full max-w-7xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500",
            scrolled
              ? "glass-strong border border-[var(--color-line-strong)]"
              : "border border-transparent",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2 px-3 py-1.5"
            data-cursor="link"
            data-cursor-label="Home"
          >
            <span className="font-display text-xl font-extrabold tracking-[-0.04em]">
              MIMA
            </span>
            <span className="font-serif text-[10px] italic text-[var(--color-fg-2)] tracking-wider">
              archive
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {PUBLIC_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="link"
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-xs tracking-[0.18em] uppercase transition-colors",
                    active
                      ? "text-[var(--color-fg-0)]"
                      : "text-[var(--color-fg-2)] hover:text-[var(--color-fg-0)]",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-[var(--color-line-strong)]"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  ) : null}
                  <span className="relative">{dict.nav[link.key]}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleAudio}
              data-cursor="link"
              data-cursor-label={
                mounted
                  ? audioEnabled
                    ? dict.nav.audioOff
                    : dict.nav.audioOn
                  : ""
              }
              aria-label={
                mounted
                  ? audioEnabled
                    ? dict.nav.audioOff
                    : dict.nav.audioOn
                  : "Toggle audio"
              }
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-fg-1)] transition-colors hover:border-[var(--color-line-strong)] hover:text-[var(--color-fg-0)] md:inline-flex"
            >
              {mounted && audioEnabled ? (
                <Volume2 className="h-3.5 w-3.5" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleLocale}
              data-cursor="link"
              aria-label={dict.nav.languageLabel}
              className="inline-flex h-9 items-center gap-1 rounded-full border border-[var(--color-line)] px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-1)] transition-colors hover:border-[var(--color-line-strong)] hover:text-[var(--color-fg-0)]"
            >
              <span className={cn(locale === "it" && "text-[var(--color-fg-0)]")}>
                IT
              </span>
              <span className="text-[var(--color-fg-3)]">·</span>
              <span className={cn(locale === "en" && "text-[var(--color-fg-0)]")}>
                EN
              </span>
            </button>

            <button
              type="button"
              onClick={() => setNavOpen(!navOpen)}
              data-cursor="link"
              aria-label="Menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-fg-1)] transition-colors hover:border-[var(--color-line-strong)] hover:text-[var(--color-fg-0)] lg:hidden"
            >
              {navOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-2xl"
              onClick={() => setNavOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-3 top-24 rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-[var(--color-bg-1)]/95 p-2 backdrop-blur-2xl"
            >
              <ul className="divide-y divide-[var(--color-line)]">
                {PUBLIC_LINKS.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between px-4 py-4 text-2xl font-display tracking-tight transition-colors",
                          active
                            ? "text-[var(--color-fg-0)]"
                            : "text-[var(--color-fg-2)]",
                        )}
                      >
                        <span>{dict.nav[link.key]}</span>
                        <span className="mono-caption">0{i + 1}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
