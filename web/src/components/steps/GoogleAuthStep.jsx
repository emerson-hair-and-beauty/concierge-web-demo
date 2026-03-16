"use client";
import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { typographyStyles } from "@/styles/typographyStyles";
import { signInWithGoogle } from "@/config/auth";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const DARK_GREEN = "#2D5A4A";

export default function GoogleAuthStep({ onComplete, onSkip }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Google sign in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", textAlign: "center", py: 4 }}>
      <Typography
        sx={{
          ...typographyStyles.h2,
          fontSize: { xs: "1.5rem", md: "1.9rem" },
          fontWeight: 800,
          color: DARK_GREEN,
          mb: 1.5,
        }}
      >
        Save Your Curl Profile
      </Typography>

      <Typography
        sx={{
          fontSize: "0.95rem",
          color: "#666",
          mb: 4,
          lineHeight: 1.6,
        }}
      >
        To access your personalized routine at any time and track your progress,
        let's create your account.
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        size="large"
        onClick={handleGoogleSignIn}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
        sx={{
          py: 1.8,
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          borderColor: "rgba(0,0,0,0.1)",
          color: "#444",
          mb: 2,
          "&:hover": {
            borderColor: "rgba(0,0,0,0.2)",
            bgcolor: "rgba(0,0,0,0.02)",
          },
        }}
      >
        {loading ? "Signing in..." : "Continue with Google"}
      </Button>

      <Button
        fullWidth
        variant="text"
        onClick={onSkip}
        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
        sx={{
          color: DARK_GREEN,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          opacity: 0.8,
          "&:hover": {
            opacity: 1,
            bgcolor: "transparent",
            textDecoration: "underline",
          },
        }}
      >
        Continue with email instead
      </Button>
    </Box>
  );
}
