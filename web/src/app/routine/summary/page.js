"use client";
import ProfileSummary from "@/components/routine/ProfileSummary";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";
import { signInWithGoogle } from "@/config/auth";

export default function SummaryPage() {
  const router = useRouter();
  const { isAuthenticated } = useUserData();
  const selections = useOnboardingStore((s) => s.selections) || {};
  const generateRoutine = useOnboardingStore((s) => s.generateRoutine);
  const saveSummary = useOnboardingStore((s) => s.saveSummary);

  const handleCreateRoutine = async () => {
    try {
      if (!isAuthenticated) {
        const user = await signInWithGoogle();
        if (user) {
          // Save the summary to the new account
          await saveSummary(user.uid);
        }
      }
      
      // Start generating in background
      generateRoutine();
      // Navigate to result page
      router.push("/routine/result");
    } catch (error) {
      console.error("Failed to create routine:", error);
    }
  };

  const profile = {
    porosity: selections.porosity_level || "Unknown",
    texture: selections.hair_texture || "—",
    density: selections.hair_density || "—",
    damage: selections.is_damaged || "—",
    scalp: selections.scalp_condition || "—",
  };

  return (
    <Container sx={{ py: 4 }}>
      <ProfileSummary
        profile={profile}
        onViewRoutine={handleCreateRoutine}
      />
    </Container>
  );
}
