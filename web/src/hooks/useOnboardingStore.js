import { create } from "zustand";
import { persist } from "zustand/middleware";
const initialSelections = {
  scalp_condition: null,
  hair_porosity: {
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
  },
  hair_texture: null,
  hair_density: null,
  is_damaged: null,
  porosity_level: null,
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
