import { create } from "zustand";
import { subscribeToAuthChanges } from "../config/auth";
import useOnboardingStore from "./useOnboardingStore";

export const useUserData = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, loading: false }),
  setLoading: (loading) => set({ loading }),
  clearUser: () => set({ user: null, isAuthenticated: false, loading: false }),
}));

// Initialize the auth listener
if (typeof window !== "undefined") {
  subscribeToAuthChanges((user) => {
    if (user) {
      useUserData.getState().setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      // Sync onboarding data from Firebase
      useOnboardingStore.getState().syncWithFirebase(user.uid);
    } else {
      useUserData.getState().clearUser();
      // Clear local storage / onboarding state on logout
      useOnboardingStore.getState().resetSelections();
    }
  });
}
