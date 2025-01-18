import { create } from "zustand";

export const useAudioStore = create((set) => ({
  audio: null,
  addAudioToStore: (audio) => set({ audio }),
  removeAudioFromStore: () => set({ audio: null }),
}));
