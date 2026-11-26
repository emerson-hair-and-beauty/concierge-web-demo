"use client";

import React from "react";
import { Box, CircularProgress, LinearProgress, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const GREEN = "#2D5A4A";
const MUTED = "#8BA198";

// The stages match the events of the backend orchestrator. The backend reads
// the profile and the climate in one step, so they are one stage here.
const STAGES = [
  { key: "profile", label: (location) => location ? `Reading your hair profile and the climate in ${location}` : "Reading your hair profile and your climate" },
  { key: "routine", label: () => "Building your routine steps" },
  { key: "products", label: () => "Finding products for each step" },
];

// Shows the stages of routine generation as a checklist.
// `stage` is the generationStage value from useOnboardingStore.
export default function GenerationProgress({ stage, location }) {
  const current = Math.max(0, STAGES.findIndex((s) => s.key === stage));

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 520,
        p: { xs: 3, sm: 4 },
        borderRadius: "24px",
        border: "1px solid rgba(45, 90, 74, 0.12)",
        background: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexDirection: "column", gap: 2.5 }}>
        {STAGES.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <Box component="li" key={s.key} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {done && <CheckCircleIcon sx={{ color: GREEN, fontSize: 24 }} />}
                {active && <CircularProgress size={20} thickness={5} sx={{ color: GREEN }} />}
                {!done && !active && <RadioButtonUncheckedIcon sx={{ color: "rgba(45, 90, 74, 0.25)", fontSize: 24 }} />}
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: done || active ? GREEN : MUTED,
                  fontWeight: active ? 700 : 500,
                }}
              >
                {s.label(location)}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <LinearProgress
        sx={{
          mt: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: "rgba(45, 90, 74, 0.1)",
          "& .MuiLinearProgress-bar": { borderRadius: 2, backgroundColor: GREEN },
        }}
      />
    </Paper>
  );
}
