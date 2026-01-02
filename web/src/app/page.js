"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, signUpWithGoogle, signOutUser } from "@/config/auth";
import { useUserData } from "@/hooks/useUserData";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Stack, 
  CircularProgress,
  Paper,
  Fade,
  useTheme,
  useMediaQuery
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function LandingPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, loading, isAuthenticated } = useUserData();
  const resetSelections = useOnboardingStore((s) => s.resetSelections);

  const handleAuth = async (authFunc) => {
    try {
      await authFunc();
      router.push("/routine");
    } catch (error) {
      console.error("Auth failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      resetSelections();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          height: "100vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          background: "linear-gradient(135deg, #FDFCF9 0%, #F5F1E8 100%)"
        }}
      >
        <CircularProgress sx={{ color: "#7B61FF" }} />
      </Box>
    );
  }

  // No automatic redirect to allow users to see the landing page

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #FDFCF9 0%, #F5F1E8 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative"
    }}>
        {/* Navigation / Header */}
        <Box sx={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          p: 3, 
          display: "flex", 
          justifyContent: "flex-end",
          zIndex: 10
        }}>
          {isAuthenticated ? (
            <Button 
              onClick={handleLogout}
              sx={{ 
                color: "#1A1A1A", 
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { bgcolor: "rgba(0,0,0,0.05)" }
              }}
            >
              Logout
            </Button>
          ) : (
            <Button 
              onClick={() => handleAuth(signInWithGoogle)}
              sx={{ 
                color: "#1A1A1A", 
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { bgcolor: "rgba(0,0,0,0.05)" }
              }}
            >
              Sign In
            </Button>
          )}
        </Box>

        {/* Decorative Elements */}
      <Box sx={{
        position: "absolute",
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(123, 97, 255, 0.1) 0%, transparent 70%)",
        zIndex: 0
      }} />
      <Box sx={{
        position: "absolute",
        bottom: -50,
        left: -50,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255, 101, 157, 0.05) 0%, transparent 70%)",
        zIndex: 0
      }} />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                letterSpacing: 2, 
                color: "#7B61FF", 
                fontWeight: 700,
                mb: 2,
                display: "block"
              }}
            >
              EMERSON HAIR & BEAUTY
            </Typography>
            <Typography 
              variant={isMobile ? "h2" : "h1"} 
              component="h1"
              sx={{ 
                fontWeight: 800, 
                color: "#1A1A1A",
                mb: 3,
                letterSpacing: "-0.02em",
                lineHeight: 1.1
              }}
            >
              Personalized Hair Care <br />
              <Box component="span" sx={{ 
                background: "linear-gradient(90deg, #7B61FF 0%, #FF659D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Tailored for You.
              </Box>
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "#666", 
                mb: 5, 
                maxWidth: "600px", 
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Discover your perfect routine with our AI-powered concierge. 
              Sign up today and get a customized plan designed specifically for your hair type and needs.
            </Typography>

            <Stack 
              direction="row" 
              spacing={2} 
              justifyContent="center"
              sx={{ mb: 6 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/onboarding")}
                sx={{
                  bgcolor: "#1A1A1A",
                  color: "#FFF",
                  px: 6,
                  py: 2,
                  borderRadius: "12px",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#333",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Get Started
              </Button>
            </Stack>

            <Stack 
              direction="row" 
              spacing={4} 
              justifyContent="center" 
              sx={{ color: "#888" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 20, color: "#4CAF50" }} />
                <Typography variant="body2">Free Analysis</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 20, color: "#4CAF50" }} />
                <Typography variant="body2">AI Recommendations</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleIcon sx={{ fontSize: 20, color: "#4CAF50" }} />
                <Typography variant="body2">Custom Plan</Typography>
              </Box>
            </Stack>
          </Box>
        </Fade>

      </Container>
    </Box>
  );
}
