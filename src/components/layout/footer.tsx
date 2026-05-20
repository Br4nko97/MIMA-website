"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/lib/i18n/use-locale";
import { classifiedCode } from "@/lib/utils/classified";

export function Footer() {
  const pathname = usePathname();
  const { dict, locale } = useDictionary();

  if (pathname?.startsWith("/admin")) return null;

  const code = classifiedCode("mima-archive-root", "MIMA");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-32 border-t border-[var(--color-line)] px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-extrabold tracking-[-0.04em]">
              MIMA
            </span>
            <span className="font-serif text-base italic text-[var(--color-fg-2)]">
              {dict.meta.tagline}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-[var(--color-fg-1)]">
            {dict.footer.disclaimer}
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="mono-caption mb-3">{dict.footer.archiveLabel}</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/members" data-cursor="link" className="text-[var(--color-fg-1)] hover:text-[var(--color-fg-0)] transition-colors">
                {dict.nav.members}
              </Link>
            </li>
            <li>
              <Link href="/tour" data-cursor="link" className="text-[var(--color-fg-1)] hover:text-[var(--color-fg-0)] transition-colors">
                {dict.nav.tour}
              </Link>
            </li>
            <li>
              <Link href="/stories" data-cursor="link" className="text-[var(--color-fg-1)] hover:text-[var(--color-fg-0)] transition-colors">
                {dict.nav.stories}
              </Link>
            </li>
            <li>
              <Link href="/media" data-cursor="link" className="text-[var(--color-fg-1)] hover:text-[var(--color-fg-0)] transition-colors">
                {dict.nav.media}
              </Link>
            </li>
            <li>
              <Link href="/timeline" data-cursor="link" className="text-[var(--color-fg-1)] hover:text-[var(--color-fg-0)] transition-colors">
                {dict.nav.timeline}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="mono-caption mb-3">Coordinate operative</div>
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-[var(--color-fg-2)]">Location</dt>
            <dd className="text-right text-[var(--color-fg-0)]">
              {dict.footer.locationLabel}
            </dd>
            <dt className="text-[var(--color-fg-2)]">Established</dt>
            <dd className="text-right text-[var(--color-fg-0)]">
              {dict.footer.establishedLabel}
            </dd>
            <dt className="text-[var(--color-fg-2)]">Document</dt>
            <dd className="text-right font-mono text-[var(--color-fg-0)]">
              {code}
            </dd>
            <dt className="text-[var(--color-fg-2)]">Locale</dt>
            <dd className="text-right uppercase text-[var(--color-fg-0)]">
              {locale}
            </dd>
          </dl>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-fg-2)] md:flex-row md:items-center">
        <span>© {year} MIMA — {dict.footer.builtBy}.</span>
        <span className="font-mono uppercase tracking-[0.18em]">
          PROTOCOL: AURA · CLEARANCE 5
        </span>
      </div>
    </footer>
  );
}
