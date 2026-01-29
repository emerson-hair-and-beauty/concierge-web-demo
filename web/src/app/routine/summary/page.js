"use client";
import JourneyDashboard from "@/components/routine/JourneyDashboard";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";

export default function SummaryPage() {
  const router = useRouter();
  const { isAuthenticated } = useUserData();
  const selections = useOnboardingStore((s) => s.selections) || {};
  const generateRoutine = useOnboardingStore((s) => s.generateRoutine);
  const saveSummary = useOnboardingStore((s) => s.saveSummary);

  const handleCreateRoutine = async () => {
    try {
      if (!isAuthenticated) {
        // ... auth logic
      }
      generateRoutine();
      router.push("/routine/result");
    } catch (error) {
      console.error("Failed to create routine:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: "#FDFCF9", minHeight: '100vh' }}>
      <JourneyDashboard />
    </Box>
  );
}
