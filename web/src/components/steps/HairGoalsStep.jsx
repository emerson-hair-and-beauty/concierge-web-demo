"use client";
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { typographyStyles } from "@/styles/typographyStyles";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { HAIR_GOALS_OPTIONS } from "@/constants/onboardingData";
import CheckIcon from "@mui/icons-material/Check";

const DARK_GREEN = "#2D5A4A";

export default function HairGoalsStep() {
  const goals = useOnboardingStore((s) => s.selections.hair_goals) || [];
  const setSelection = useOnboardingStore((s) => s.setSelection);

  const toggle = (value) => {
    const current = goals || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setSelection("hair_goals", updated);
  };

  return (
    <Box sx={{ maxWidth: 560, mx: "auto" }}>
      <Typography
        sx={{
          ...typographyStyles.h2,
          fontSize: { xs: "1.5rem", md: "1.9rem" },
          fontWeight: 800,
          color: DARK_GREEN,
          mb: 0.5,
        }}
      >
        What do you want most from your curls?
      </Typography>
      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#666",
          mb: 3.5,
          lineHeight: 1.6,
        }}
      >
        Select all that apply — we'll prioritise what matters most to you.
      </Typography>

      <Stack spacing={1.5}>
        {HAIR_GOALS_OPTIONS.map((goal) => {
          const isSelected = goals.includes(goal.value);
          return (
            <Box
              key={goal.value}
              onClick={() => toggle(goal.value)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2.5,
                py: 1.75,
                borderRadius: "14px",
                border: "1.5px solid",
                borderColor: isSelected ? DARK_GREEN : "rgba(0,0,0,0.1)",
                bgcolor: isSelected ? "rgba(45,90,74,0.07)" : "#FFF",
                cursor: "pointer",
                transition: "all 0.18s ease",
                "&:hover": {
                  borderColor: DARK_GREEN,
                  bgcolor: isSelected
                    ? "rgba(45,90,74,0.1)"
                    : "rgba(45,90,74,0.03)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? DARK_GREEN : "#333",
                }}
              >
                {goal.label}
              </Typography>
              {isSelected && (
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: DARK_GREEN,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckIcon sx={{ color: "#FFF", fontSize: 14 }} />
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>

      {goals.length === 0 && (
        <Typography
          sx={{
            textAlign: "center",
            color: "#aaa",
            fontSize: "0.8rem",
            mt: 3,
          }}
        >
          Select at least one goal to continue
        </Typography>
      )}
    </Box>
  );
}
