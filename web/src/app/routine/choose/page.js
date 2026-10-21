"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Card, CardActionArea, Typography } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import SpaIcon from "@mui/icons-material/Spa";

const OPTIONS = [
  {
    key: "rebuild",
    title: "Rebuild My Routine",
    subtitle: "Generate a fresh, personalized routine from your saved hair profile.",
    icon: AutorenewIcon,
    color: "#C9972B",
  },
  {
    key: "vitals",
    title: "Vitals Check-In",
    subtitle: "Rate your hair's moisture, definition, scalp, and breakage right now.",
    icon: HealthAndSafetyIcon,
    color: "#2D5A4A",
  },
  {
    key: "advisor",
    title: "Ask the Hair Advisor",
    subtitle: "Tell me what's going on with your hair and get real-time advice.",
    icon: SpaIcon,
    color: "#4A3D2D",
  },
];

export default function ChooseExperiencePage() {
  const router = useRouter();

  const handleChoice = (key) => {
    router.push(`/routine/choose/${key}`);
  };

  return (
    <Box sx={{ maxWidth: 1040, mx: "auto", px: 3, py: { xs: 4, md: 8 } }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, textAlign: "center" }}>
        How do you want to continue?
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 5, textAlign: "center" }}>
        Pick one way to get help with your hair today.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {OPTIONS.map(({ key, title, subtitle, icon: Icon, color }) => (
          <Card
            key={key}
            sx={{
              flex: 1,
              borderRadius: "20px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <CardActionArea
              onClick={() => handleChoice(key)}
              sx={{
                p: 4,
                height: "100%",
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Icon sx={{ fontSize: 48, color }} />
              <Typography variant="h6" sx={{ fontWeight: 700, textAlign: "center" }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
                {subtitle}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
