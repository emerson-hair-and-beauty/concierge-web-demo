"use client";

import React from "react";
import { Box, Typography, Skeleton, alpha } from "@mui/material";
import RecommendationCard from "./RecommendationCard";
import { useRecommendations } from "@/hooks/useRecommendations";

const DARK_GREEN = "#2D5A4A";

export default function RecommendationsSection({ userId }) {
  const { recommendations, loading, error, accept, dismiss } =
    useRecommendations(userId);

  if (error) {
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: alpha("#D32F2F", 0.08),
          borderRadius: "12px",
          border: "1px solid #D32F2F",
          mb: 3,
        }}
      >
        <Typography sx={{ color: "#D32F2F", fontWeight: 600 }}>
          Failed to load recommendations
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: DARK_GREEN, mb: 1.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          For You Today
        </Typography>
        {[1, 2].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={120}
            sx={{ mb: 2, borderRadius: "12px" }}
          />
        ))}
      </Box>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <Box
        sx={{
          p: 3,
          bgcolor: alpha(DARK_GREEN, 0.04),
          borderRadius: "12px",
          border: `1px solid ${alpha(DARK_GREEN, 0.08)}`,
          mb: 3,
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: DARK_GREEN, fontWeight: 600, mb: 0.5 }}>
          Your routine is on track
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", color: "#999" }}>
          Check back tomorrow for personalized suggestions
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontSize: "0.9rem",
          fontWeight: 700,
          color: DARK_GREEN,
          mb: 1.5,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        For You Today
      </Typography>

      {recommendations.map((rec) => (
        <RecommendationCard
          key={rec.id}
          recommendation={rec}
          onAccept={accept}
          onDismiss={dismiss}
        />
      ))}

      <Typography
        sx={{
          fontSize: "0.75rem",
          color: "#999",
          mt: 2,
          fontStyle: "italic",
        }}
      >
        These suggestions are personalized based on your hair signals and current conditions.
      </Typography>
    </Box>
  );
}
