"use client";

import { create } from "zustand";

export type CursorVariant = "default" | "link" | "view" | "drag" | "play";

interface CursorState {
  variant: CursorVariant;
  label: string | null;
  hidden: boolean;
  setVariant: (variant: CursorVariant, label?: string | null) => void;
  reset: () => void;
  setHidden: (hidden: boolean) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  variant: "default",
  label: null,
  hidden: false,
  setVariant: (variant, label = null) => set({ variant, label }),
  reset: () => set({ variant: "default", label: null }),
  setHidden: (hidden) => set({ hidden }),
}));
