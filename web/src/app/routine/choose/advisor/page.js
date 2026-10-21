"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import useChatModeStore from "@/hooks/useChatModeStore";

export default function HairAdvisorPage() {
  const router = useRouter();
  const openAdvisor = useChatModeStore((s) => s.openAdvisor);

  useEffect(() => {
    openAdvisor();
  }, [openAdvisor]);

  return (
    <Box sx={{ maxWidth: 560, mx: "auto", px: 3, py: { xs: 6, md: 10 }, textAlign: "center" }}>
      <SpaIcon sx={{ fontSize: 56, color: "#4A3D2D", mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Ask the Hair Advisor
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
        Tell me what&apos;s going on with your hair in the chat panel that
        just opened, and I&apos;ll help you work through it.
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
