import { create } from "zustand";
import { persist } from "zustand/middleware";

// Helper to parse the unstructured content string
const parseProductContent = (content) => {
  // Extract name (everything before "Ingredients:" or just the start)
  const nameMatch = content.split(/Ingredients:|How to use:/)[0].trim();
  // Clean up name if it ends with a dot
  const name = nameMatch.endsWith(".") ? nameMatch.slice(0, -1) : nameMatch;

  // Extract brand - simplistic assumption: First word or two, or just use name as brand for now if unknown
  const brand = "Recommended";

  // Extract Tags
  const tagsMatch = content.match(/Tags:\s*(.*?)(?=\.|Hair finish:|$)/);
  const tags = tagsMatch
    ? tagsMatch[1]
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 3)
    : []; // Limit to 3 tags

  return {
    name,
    brand,
    tags,
  };
};

// Helper to transform the API response into the format CustomRoutine expects
const transformRoutineData = (data) => {
  if (!data || !data.result) return null;

  return {
    profile: "Your Personalized Routine",
    steps: data.result.map((step) => ({
      title: step.step,
      icon:
        step.step === "Cleanse"
          ? "💧"
          : step.step === "Condition"
          ? "🚿"
          : step.step === "Treat"
          ? "✨"
          : step.step.includes("Style")
          ? "🎨"
          : "🧴",
      description: step.action,
      detailedInstructions: step.notes,
      keyIngredients: step.ingredients,
      recommendedProducts: step.products.map((p) =>
        parseProductContent(p.content)
      ),
    })),
  };
};
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
  apiRoutine: null,
  isGeneratingRoutine: false,
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

      generateRoutine: async () => {
        const { selections } = get();
        if (selections.apiRoutine || selections.isGeneratingRoutine) return;

        set((state) => ({
          selections: { ...state.selections, isGeneratingRoutine: true },
        }));

        try {
          const payload = {
            porosity: selections.porosity_level || "Unknown",
            scalp: selections.scalp_condition || "Normal",
            damage: selections.is_damaged || "No",
            density: selections.hair_density || "Medium",
            texture: selections.hair_texture || "Wavy",
          };

          const response = await fetch("/api/create-routine", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (data && data.result) {
            const transformed = transformRoutineData(data);
            set((state) => ({
              selections: {
                ...state.selections,
                apiRoutine: transformed,
                isGeneratingRoutine: false,
              },
            }));
          } else {
            set((state) => ({
              selections: { ...state.selections, isGeneratingRoutine: false },
            }));
          }
        } catch (error) {
          console.error("Error creating routine:", error);
          set((state) => ({
            selections: { ...state.selections, isGeneratingRoutine: false },
          }));
        }
      },
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
