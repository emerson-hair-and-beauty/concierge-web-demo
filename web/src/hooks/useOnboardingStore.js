import { create } from "zustand";
import { persist } from "zustand/middleware";
const initialSelections = {
  scalp_condition: null,
  hair_porosity: null, // reserved, ignored for now
  hair_texture: null,
  hair_density: null,
  is_damaged: null,
};

const useOnboardingStore = create(
  persist(
    (set, get) => ({
      selections: { ...initialSelections },

      setSelection: (key, value) =>
        set((state) => ({
          selections: { ...state.selections, [key]: value },
        })),

      resetSelections: () => set({ selections: { ...initialSelections } }),

      getSelections: () => get().selections,
    }),
    {
      name: "onboarding_store",
      // use localStorage when available (safe for SSR)
      getStorage: () =>
        typeof window !== "undefined" ? localStorage : undefined,
      // only persist selections object
      partialize: (state) => ({ selections: state.selections }),
    }
  )
);

export default useOnboardingStore;

export { initialSelections };
