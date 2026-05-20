"use client";

import { create } from "zustand";

interface AudioState {
  enabled: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  enabled: false,
  volume: 0.35,
  toggle: () => set((s) => ({ enabled: !s.enabled })),
  setVolume: (v) => set({ volume: Math.max(0, Math.min(1, v)) }),
}));
