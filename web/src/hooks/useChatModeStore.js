import { create } from "zustand";

// Shared UI state so any page under /routine can open either floating chat
// widget (both are mounted once, in routine/layout.js).
const useChatModeStore = create((set) => ({
  openMode: null, // "empath" | "advisor" | null
  openEmpath: () => set({ openMode: "empath" }),
  openAdvisor: () => set({ openMode: "advisor" }),
  closeChat: () => set({ openMode: null }),
}));

export default useChatModeStore;
