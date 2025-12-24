"use client";
import ProfileSummary from "@/components/routine/ProfileSummary";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const selections = useOnboardingStore((s) => s.selections) || {};
  const generateRoutine = useOnboardingStore((s) => s.generateRoutine);

  const handleCreateRoutine = () => {
    // Start generating in background
    generateRoutine();
    // Navigate to result page
    router.push("/routine/result");
  };

  const profile = {
    porosity: selections.porosity_level || "Unknown",
    texture: selections.hair_texture || "—",
    density: selections.hair_density || "—",
    damage: selections.is_damaged || "—",
    scalp: selections.scalp_condition || "—",
  };

  return (
    <Container>
      <ProfileSummary
        profile={profile}
        onViewRoutine={handleCreateRoutine}
      />
    </Container>
  );
}
