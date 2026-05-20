"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_LOCALE, type Locale, getDictionary } from "./dictionaries";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: DEFAULT_LOCALE,
      setLocale: (locale) => set({ locale }),
      toggle: () => set({ locale: get().locale === "it" ? "en" : "it" }),
    }),
    {
      name: "mima-locale",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useDictionary() {
  const locale = useLocaleStore((s) => s.locale);
  return { dict: getDictionary(locale), locale };
}
