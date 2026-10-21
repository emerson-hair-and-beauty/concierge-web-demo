"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import useOnboardingStore from "@/hooks/useOnboardingStore";

export default function RebuildRoutinePage() {
  const router = useRouter();
  const clearRoutine = useOnboardingStore((s) => s.clearRoutine);
  const generateRoutine = useOnboardingStore((s) => s.generateRoutine);

  const handleGenerate = () => {
    clearRoutine();
    generateRoutine();
    router.push("/routine/result");
  };

  return (
    <Box sx={{ maxWidth: 560, mx: "auto", px: 3, py: { xs: 6, md: 10 }, textAlign: "center" }}>
      <AutorenewIcon sx={{ fontSize: 56, color: "#C9972B", mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Rebuild My Routine
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
        We build a fresh routine from your saved hair profile. This replaces
        your current routine.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={handleGenerate}
        sx={{
          bgcolor: "#C9972B",
          borderRadius: "14px",
          px: 4,
          py: 1.5,
          fontWeight: 700,
          textTransform: "none",
          "&:hover": { bgcolor: "#A87B1F" },
        }}
      >
        Generate My Routine
      </Button>
    </Box>
  );
}
