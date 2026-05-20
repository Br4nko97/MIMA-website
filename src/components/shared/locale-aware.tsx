"use client";

import { useDictionary } from "@/lib/i18n/use-locale";

interface LocaleStringProps {
  it: string;
  en: string;
  className?: string;
}

/**
 * Tiny client wrapper that renders an IT or EN string based on the
 * Zustand locale store. Avoids passing render functions across the
 * Server/Client boundary (which would fail at runtime).
 */
export function LocaleString({ it, en, className }: LocaleStringProps) {
  const { locale } = useDictionary();
  return <span className={className}>{locale === "en" ? en : it}</span>;
}
