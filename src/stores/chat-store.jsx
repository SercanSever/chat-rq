import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../lib/firebase";
import { useUserStore } from "./user-store";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;
  },
}));
