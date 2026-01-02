"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { Box, CircularProgress } from "@mui/material";

export default function RoutineRoot() {
  const router = useRouter();
  const selections = useOnboardingStore((s) => s.selections) || {};
  const { apiRoutine } = selections;

  useEffect(() => {
    if (apiRoutine) {
      router.replace("/routine/result");
    } else {
      router.replace("/routine/summary");
    }
  }, [apiRoutine, router]);

  return (
    <Box sx={{ 
      height: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <CircularProgress sx={{ color: "#2D5A4A" }} />
    </Box>
  );
}
