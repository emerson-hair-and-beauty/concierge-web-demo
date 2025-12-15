import useOnboardingStore from "./useOnboardingStore";

// Helper wrapper for common operations
export function setAnswer(key, value) {
  useOnboardingStore.getState().setSelection(key, value);
}

export function resetAnswers() {
  useOnboardingStore.getState().resetSelections();
}

export function useAnswer(key) {
  return useOnboardingStore((state) => state.selections[key]);
}

export default useOnboardingStore;
