import { create } from "zustand";

export const useImageStore = create((set) => ({
  storedImage: null,
  addImageToStore: (img) => set({ storedImage: img }),
  removeStoredImage: () => set({ storedImage: null }),
}));

export const useCaptureImageStore = create((set) => ({
  isOpen: false,
  capturedImage: null,
  addCapturedImage: (img) => set({ capturedImage: img }),
  removeCapturedImage: () => set({ capturedImage: null }),
  changeIsOpen: (isOpen) => set({ isOpen }),
}));
