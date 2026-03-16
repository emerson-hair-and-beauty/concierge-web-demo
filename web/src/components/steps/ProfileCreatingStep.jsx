"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const DARK_GREEN = "#2D5A4A";
const SAGE = "#95ABA1";

const ANALYZING_ITEMS = [
  "Texture",
  "Density",
  "Moisture behaviour",
  "Humidity response",
  "Curl goals",
];

export default function ProfileCreatingStep({ onComplete }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress from 0 → 100 over 3.5 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / (3500 / 80);
      });
    }, 80);

    // Cycle through analysing items
    let itemIndex = 0;
    const itemInterval = setInterval(() => {
      itemIndex = (itemIndex + 1) % ANALYZING_ITEMS.length;
      setActiveIndex(itemIndex);
    }, 700);

    // Trigger onComplete after 3.5 seconds
    const timeout = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(itemInterval);
      if (onComplete) onComplete();
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(itemInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 6,
      }}
    >
      {/* Animated Icon */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "rgba(45,90,74,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          animation: "pulse 1.5s ease-in-out infinite",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)", opacity: 1 },
            "50%": { transform: "scale(1.1)", opacity: 0.8 },
            "100%": { transform: "scale(1)", opacity: 1 },
          },
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 40, color: DARK_GREEN }} />
      </Box>

      <Typography
        sx={{
          fontSize: { xs: "1.5rem", md: "1.9rem" },
          fontWeight: 800,
          color: DARK_GREEN,
          mb: 1,
          letterSpacing: "-0.01em",
        }}
      >
        Creating your curl profile…
      </Typography>

      <Typography sx={{ fontSize: "0.9rem", color: "#888", mb: 5 }}>
        This will only take a moment
      </Typography>

      {/* Progress bar */}
      <Box sx={{ width: "100%", maxWidth: 340, mb: 4 }}>
        <LinearProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          sx={{
            height: 6,
            borderRadius: 4,
            bgcolor: "rgba(0,0,0,0.06)",
            "& .MuiLinearProgress-bar": {
              bgcolor: DARK_GREEN,
              borderRadius: 4,
              transition: "transform 0.08s linear",
            },
          }}
        />
      </Box>

      {/* Analyzing list */}
      <Box sx={{ textAlign: "left", display: "inline-block" }}>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: SAGE,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            mb: 1.5,
          }}
        >
          Analyzing
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
          {ANALYZING_ITEMS.map((item, i) => (
            <Box
              key={item}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                opacity: i <= activeIndex ? 1 : 0.3,
                transition: "opacity 0.5s ease",
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: i <= activeIndex ? DARK_GREEN : "#ccc",
                  transition: "background 0.5s ease",
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: i === activeIndex ? 700 : 500,
                  color: i <= activeIndex ? DARK_GREEN : "#aaa",
                  transition: "all 0.5s ease",
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
