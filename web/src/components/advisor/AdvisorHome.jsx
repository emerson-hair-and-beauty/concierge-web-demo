"use client";

import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import GoogleIcon from "@mui/icons-material/Google";
import AdvisorChat from "@/components/routine/AdvisorChat";
import { signInWithGoogle, signOutUser } from "@/config/auth";
import { useUserData } from "@/hooks/useUserData";

const BROWN = "#4A3D2D";

// The home screen in advisor-only mode (see src/config/features.js).
// The user signs in with Google. Then the advisor chat fills the page.
export default function AdvisorHome() {
  const { loading, isAuthenticated } = useUserData();
  const [signInError, setSignInError] = useState("");

  const handleSignIn = async () => {
    setSignInError("");
    try {
      await signInWithGoogle();
    } catch (error) {
      // The user closed the popup: this is not an error to show.
      if (error?.code === "auth/popup-closed-by-user") return;
      setSignInError("Sign-in failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: BROWN }} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <AdvisorChat variant="page" onSignOut={signOutUser} />;
  }

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <SpaIcon sx={{ fontSize: 56, color: BROWN, mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: 800, color: "#2B2318", mb: 1 }}>
        Concierge by Emerson
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: 420 }}>
        Tell me what&apos;s going on with your hair, and I&apos;ll help you work through it.
      </Typography>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={handleSignIn}
        sx={{
          bgcolor: BROWN,
          borderRadius: "14px",
          textTransform: "none",
          px: 4,
          py: 1.5,
          "&:hover": { bgcolor: "#2B2318" },
        }}
      >
        Continue with Google
      </Button>
      {signInError && (
        <Typography variant="body2" sx={{ color: "error.main", mt: 2 }}>
          {signInError}
        </Typography>
      )}
    </Box>
  );
}
