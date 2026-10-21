"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import useChatModeStore from "@/hooks/useChatModeStore";

export default function VitalsCheckInPage() {
  const router = useRouter();
  const openEmpath = useChatModeStore((s) => s.openEmpath);

  useEffect(() => {
    openEmpath();
  }, [openEmpath]);

  return (
    <Box sx={{ maxWidth: 560, mx: "auto", px: 3, py: { xs: 6, md: 10 }, textAlign: "center" }}>
      <HealthAndSafetyIcon sx={{ fontSize: 56, color: "#2D5A4A", mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Vitals Check-In
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
        Rate your hair&apos;s moisture, definition, scalp, and breakage in the
        chat panel that just opened.
      </Typography>
      <Button
        variant="outlined"
        onClick={() => router.push("/routine/choose")}
        sx={{ borderRadius: "14px", textTransform: "none" }}
      >
        Back to options
      </Button>
    </Box>
  );
}
