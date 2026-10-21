import { create } from "zustand";
import { persist } from "zustand/middleware";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/config/firebase";

// Catalog products carry structured metadata; prefer it over parsing the
// free-text description, which would otherwise become the whole "name".
const parseProduct = (p) => {
  const m = p.metadata || {};
  if (m.name) {
    return {
      name: m.name,
      brand: m.brand || "Recommended",
      tags: [m.category, m.primary_focus].filter((t) => t && t !== "None"),
    };
  }
  return parseProductContent(p.content || "");
};

// Helper to parse the unstructured content string
const parseProductContent = (content) => {
  // Extract name (everything before the first field label)
  const nameMatch = content.split(/Ingredients:|How to use:|Category:/)[0].trim();
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
      recommendedProducts: step.products.map(parseProduct),
    })),
  };
};
const initialSelections = {
  // New profile fields
  email: null,
  first_name: null,
  location: null, // Unified location field
  gender: null,
  hair_length: null,
  humidity_response: null, // "Frizz", "Limp", "No Effect"
  hair_goals: [], // Multi-select list
  hair_photo_url: null,
  // Core Hair Traits (OrchestratorInput)
  texture: null, // "Type 2", "Type 3", "Type 4"
  density: null, // "Low", "Medium", "High"
  moisture_behaviour: null, // "Low Porosity", "Medium Porosity", "High Porosity"
  
  // Temporary storage for survey answers
  hair_porosity: {
    q2: null,
    q3: null,
    q4: null,
  },
  
  // Legacy / Internal fields
  scalp_condition: null,
  is_damaged: null,

  // Environmental / lifestyle factors
  in_ac: null,           // "Yes, most of the day" or "Not really"
  has_filtration: null,  // "Yes, I have filtration" or "No filtration"

  apiRoutine: null,
  isGeneratingRoutine: false,
  thinkingText: "",
  generationError: null,
  debugLogs: [],
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

      clearRoutine: () => set((state) => ({
        selections: {
          ...state.selections,
          apiRoutine: null,
          generationError: null,
          debugLogs: [],
          thinkingText: ""
        }
      })),

      injectTestData: () => set((state) => ({
        selections: {
          ...initialSelections,
          first_name: "Jane",
          location: "Dubai, UAE",
          texture: "Type 3C",
          density: "High",
          moisture_behaviour: "High Porosity",
          humidity_response: "Frizz",
          hair_goals: ["Volume", "Definition"],
        }
      })),

      getSelections: () => get().selections,

      saveSummary: async (uid) => {
        if (!uid) return;
        const { selections } = get();
        const summaryData = {
          email: selections.email,
          first_name: selections.first_name,
          location: selections.location,
          gender: selections.gender,
          hair_length: selections.hair_length,
          humidity_response: selections.humidity_response,
          hair_goals: selections.hair_goals || [],
          hair_photo_url: selections.hair_photo_url || null,
          texture: selections.texture,
          density: selections.density,
          moisture_behaviour: selections.moisture_behaviour,
          scalp_condition: selections.scalp_condition,
          is_damaged: selections.is_damaged,
          in_ac: selections.in_ac,
          has_filtration: selections.has_filtration,
          updatedAt: serverTimestamp(),
        };
        try {
          await setDoc(doc(db, "users", uid, "data", "summary"), summaryData);
          console.log("Summary saved to Firestore");
        } catch (error) {
          console.error("Error saving summary:", error);
        }
      },

      saveRoutine: async (uid, routine) => {
        if (!uid || !routine) return;
        try {
          await setDoc(doc(db, "users", uid, "data", "routine"), {
            ...routine,
            updatedAt: serverTimestamp(),
          });
          console.log("Routine saved to Firestore");
        } catch (error) {
          console.error("Error saving routine:", error);
        }
      },

      syncWithFirebase: async (uid) => {
        if (!uid) return;
        try {
          // Sync Routine from Backend Scenario API
          const routineRes = await fetch(`/api/routine/${uid}`);
          if (routineRes.ok) {
            const routineData = await routineRes.json();
            if (routineData && Object.keys(routineData).length > 0) {
              set((state) => ({
                selections: {
                  ...state.selections,
                  apiRoutine: routineData,
                  updatedAt: routineData.updatedAt || new Date().toISOString()
                }
              }));
              console.log("Routine synced from Scenario API");
            }
          }

          // Sync Summary (Still from Firestore for now, or could move to Supabase)
          const summarySnap = await getDoc(doc(db, "users", uid, "data", "summary"));
          if (summarySnap.exists()) {
            const summaryData = summarySnap.data();
            set((state) => ({
              selections: {
                ...state.selections,
                ...summaryData,
                updatedAt: summaryData.updatedAt
              }
            }));
            console.log("Summary synced from Firestore");
          }
        } catch (error) {
          console.error("Error syncing profile:", error);
        }
      },

      generateRoutine: async () => {
        const { selections } = get();
        if (selections.apiRoutine || selections.isGeneratingRoutine) return;

        set((state) => ({
          selections: { 
            ...state.selections, 
            isGeneratingRoutine: true,
            generationError: null,
            thinkingText: "Connecting to concierge orchestrator...",
            debugLogs: ["Requested routine generation..."]
          },
        }));

        try {
          const user = auth.currentUser;
          const payload = {
            user_id: user?.uid || null,
            first_name: selections.first_name || "User",
            location: selections.location || "Dubai, UAE",
            texture: selections.texture || "Type 3",
            density: selections.density || "Medium",
            moisture_behaviour: selections.moisture_behaviour || "Medium Porosity",
            humidity_response: selections.humidity_response || "Frizz",
            hair_goals: selections.hair_goals || [],
            // Fallback/Legacy fields required by current backend
            porosity: selections.moisture_behaviour || "Medium Porosity",
            scalp: selections.scalp_condition || "Normal",
            damage: selections.is_damaged || "No",
          };

          const response = await fetch("/api/create-routine", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMsg = errorData.details || errorData.error || `HTTP ${response.status}`;
            throw new Error(errorMsg);
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let fullThinking = "";
          let contentBuffer = "";
          let baseRoutineParsed = false;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            // Split by newline or by potential JSON object boundaries if newlines are missing
            let lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (let line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;
              
              const fragments = trimmed.split(/}(?={)/).map((f, i, arr) => i < arr.length - 1 ? f + "}" : f);

              for (const fragment of fragments) {
                try {
                  const data = JSON.parse(fragment);
                  console.log("Stream data received:", data.type || "unknown", data);
                  
                  // Add to debug logs
                  const logMsg = `CHUNK: ${data.type || 'unknown'}`;
                  set((state) => ({
                    selections: {
                      ...state.selections,
                      debugLogs: [...state.selections.debugLogs, logMsg].slice(-20)
                    }
                  }));
                  
                  // 1. Handle Thinking/Reasoning
                  const thought = data.thought || data.reasoning;
                  if (thought) {
                    fullThinking += thought;
                    const sentences = fullThinking.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
                    const latestSentence = sentences[sentences.length - 1] || "";
                    set((state) => ({ selections: { ...state.selections, thinkingText: latestSentence } }));
                  }

                  // 2. Handle Content (the routine JSON in markdown)
                  if (data.type === 'content' && data.content) {
                    contentBuffer += data.content;
                    
                    // Same cleanup the backend orchestrator applies: some models
                    // fence the JSON in ```json, others (OpenAI) return it bare.
                    const cleaned = contentBuffer.replace(/```json|```/g, '').trim();
                    if (!baseRoutineParsed && cleaned.endsWith('}')) {
                      try {
                        const parsed = JSON.parse(cleaned);
                        const routineArray = parsed.routine || parsed.result || parsed;
                        if (Array.isArray(routineArray)) {
                          const transformed = {
                            profile: "Your Personalized Routine",
                            steps: routineArray.map(step => ({
                              title: step.step,
                              icon: step.step === "Cleanse" ? "💧" : step.step === "Condition" ? "🚿" : step.step === "Treat" ? "✨" : step.step.includes("Style") ? "🎨" : "🧴",
                              description: step.action,
                              detailedInstructions: step.notes,
                              keyIngredients: step.ingredients || [],
                              recommendedProducts: []
                            }))
                          };

                          set((state) => ({
                            selections: {
                              ...state.selections,
                              apiRoutine: transformed,
                              thinkingText: "Routine generated. Now finding products..."
                            }
                          }));
                          baseRoutineParsed = true;
                        }
                      } catch {
                        // Still streaming: the text is not complete JSON yet.
                      }
                    }
                  }

                  // 3. Handle Product Recommendations (incremental updates)
                  if (data.type === 'product_recommendation' && data.content) {
                    const prodData = data.content;
                    set((state) => {
                      const currentRoutine = state.selections.apiRoutine;
                      if (!currentRoutine) return state;

                      const updatedSteps = currentRoutine.steps.map(step => {
                        if (step.title === prodData.step) {
                          return {
                            ...step,
                            recommendedProducts: prodData.products.map(parseProduct)
                          };
                        }
                        return step;
                      });

                      return {
                        selections: {
                          ...state.selections,
                          apiRoutine: { ...currentRoutine, steps: updatedSteps },
                          thinkingText: `Found recommendations for ${prodData.step}...`
                        }
                      };
                    });
                  }

                  // 4. Handle Final Result (Legacy/Backup)
                  if (data.result || data.type === 'result') {
                    // This is the final routine object
                    const transformed = transformRoutineData(data.result ? data : { result: data.data || data });
                    if (transformed) {
                      console.log("Final routine received and transformed");
                      
                      // Save to Firestore from the client as well
                      const user = auth.currentUser;
                      if (user?.uid) {
                        get().saveRoutine(user.uid, transformed);
                      }

                      set((state) => ({
                        selections: {
                          ...state.selections,
                          apiRoutine: transformed,
                          isGeneratingRoutine: false,
                          thinkingText: ""
                        },
                      }));
                      return; // Done
                    }
                  }
                } catch (e) {
                  console.warn("Failed to parse stream line/fragment:", fragment, e);
                }
              }
            }
          }
          // Final check: if we have a routine, it's a success even if no 'result' chunk was sent
          const finalRoutine = get().selections.apiRoutine;
          if (finalRoutine) {
            console.log("Stream finished successfully with routine");
            
            // Save to Firestore
            const user = auth.currentUser;
            if (user?.uid) {
              get().saveRoutine(user.uid, finalRoutine);
            }

            set((state) => ({
              selections: { 
                ...state.selections, 
                isGeneratingRoutine: false,
                thinkingText: ""
              },
            }));
            return;
          }

          // If we reach here without setting a routine, something went wrong
          set((state) => ({
            selections: { 
              ...state.selections, 
              isGeneratingRoutine: false,
              generationError: "Stream closed unexpectedly before completion."
            },
          }));

        } catch (error) {
          console.error("Error creating routine:", error);
          set((state) => ({
            selections: { 
              ...state.selections, 
              isGeneratingRoutine: false,
              generationError: error.message || "Failed to generate routine",
              thinkingText: ""
            },
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
