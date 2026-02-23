"use client";
import React from "react";
import JourneyDashboard from "@/components/routine/JourneyDashboard";
import { Box } from "@mui/material";

export default function InsightsPage() {
  return (
    <Box sx={{ bgcolor: "#FDFCF9", minHeight: '100vh' }}>
      <JourneyDashboard />
    </Box>
  );
}
