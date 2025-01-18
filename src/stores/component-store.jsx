import { create } from "zustand";

export const useComponentStore = create((set) => ({
  isHidden: true,
  changeVisibility: () => set((state) => ({ isHidden: !state.isHidden })),
}));
