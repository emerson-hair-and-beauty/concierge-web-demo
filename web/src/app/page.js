"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, signOutUser } from "@/config/auth";
import { useUserData } from "@/hooks/useUserData";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Stack, 
  CircularProgress,
  Fade,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  Avatar,
  alpha
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ScienceIcon from "@mui/icons-material/Science";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import VerifiedIcon from "@mui/icons-material/Verified";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { typographyStyles } from "../styles/typographyStyles";

const DARK_GREEN = "#2D5A4A";
const MEDIUM_GREEN = "#426A5B";
const SAGE_GREEN = "#95ABA1";
const SAND_GOLD = "#FFD97B"; // Updated to vibrant gold for maximum contrast
const LIGHT_BG = "#FDFCF9";

export default function LandingPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { loading, isAuthenticated } = useUserData();
  const resetSelections = useOnboardingStore((s) => s.resetSelections);
  const scrollContainerRef = useRef(null);

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

  const features = [
    { 
      step: "01", 
      title: "Know Your Hair", 
      desc: "Stop the guessing game. Get professional clarity on what your hair actually needs in under 2 minutes.",
      icon: <ScienceIcon />, 
      outcome: "Immediate Clarity"
    },
    { 
      step: "02", 
      title: "Professional Precision", 
      desc: "Walk away with an expert-level understanding of your porosity and texture—no salon visit required.",
      icon: <AutoAwesomeIcon />, 
      outcome: "Salon Secret"
    },
    { 
      step: "03", 
      title: "Effortless Mornings", 
      desc: "Wake up to a step-by-step ritual designed to give you your best hair days, every single day.",
      icon: <HealthAndSafetyIcon />, 
      outcome: "Daily Confidence"
    },
    { 
      step: "04", 
      title: "Peace of Mind", 
      desc: "Never miss a treatment again. Your routine automatically fits into your life, handled by your calendar.",
      icon: <CalendarMonthIcon />, 
      outcome: "Automated Care"
    },
    { 
      step: "05", 
      title: "Fuel Your Motivation", 
      desc: "Turn hair care into a rewarding journey. Watch your Glow Score rise as you hit your goals.",
      icon: <EmojiEventsIcon />, 
      outcome: "Joyful Progress"
    },
    { 
      step: "06", 
      title: "Rituals That Stick", 
      desc: "Build lasting hair health with psychologist-backed techniques that make consistency feel second nature.",
      icon: <PsychologyIcon />, 
      outcome: "Lasting Health"
    }
  ];

  if (loading) {
    return (
      <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: LIGHT_BG }}>
        <CircularProgress sx={{ color: DARK_GREEN }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      height: "100vh", 
      overflowY: "scroll", 
      scrollSnapType: "y mandatory",
      bgcolor: LIGHT_BG, 
      color: DARK_GREEN,
      "&::-webkit-scrollbar": { display: "none" },
      msOverflowStyle: "none",
      scrollbarWidth: "none",
    }}>
      {/* 1. Immersive Hero Section */}
      <Box sx={{ 
        position: "relative",
        height: "100vh",
        minHeight: "650px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        scrollSnapAlign: "start",
        backgroundImage: `url('https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=2000')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#FFF",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(to bottom, ${alpha(DARK_GREEN, 0.8)} 0%, ${alpha(DARK_GREEN, 0.4)} 50%, ${alpha(DARK_GREEN, 0.9)} 100%)`,
          zIndex: 1
        }
      }}>
        {/* Header (Overlayed) */}
        <Box sx={{ 
          p: { xs: 2.5, md: 4 }, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          maxWidth: "1400px", 
          width: "100%",
          mx: "auto",
          position: "relative",
          zIndex: 10 
        }}>
          <Typography variant="h6" sx={{ ...typographyStyles, fontWeight: 800, letterSpacing: 1.5, color: "#FFF", fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
            EMERSON
          </Typography>
          <Stack direction="row" spacing={{ xs: 1.5, md: 2 }} alignItems="center">
            {isAuthenticated ? (
              <Button onClick={handleLogout} sx={{ color: "#FFF", fontWeight: 600, textTransform: "none", fontSize: { xs: "0.85rem", md: "0.95rem" } }}>Logout</Button>
            ) : (
              <Button onClick={() => handleAuth(signInWithGoogle)} sx={{ color: "#FFF", fontWeight: 600, textTransform: "none", fontSize: { xs: "0.85rem", md: "0.95rem" } }}>Sign In</Button>
            )}
            <Button 
              variant="contained" 
              onClick={() => router.push("/onboarding")}
              sx={{ 
                bgcolor: "#266837", 
                color: "#FFF", 
                borderRadius: "100px", 
                px: { xs: 2, md: 3 }, 
                py: { xs: 0.8, md: 1 },
                fontWeight: 700, 
                textTransform: "none", 
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                "&:hover": { bgcolor: alpha("#266837", 0.9), transform: "translateY(-1px)" } 
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Box>

        {/* Hero Content */}
        <Container maxWidth="md" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, textAlign: "center", pt: { xs: 4, md: 8 }, pb: { xs: 8, md: 10 } }}>
          <Fade in timeout={1500}>
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: 8, color: SAND_GOLD, fontWeight: 700, mb: 2, display: "block", fontSize: { xs: "0.6rem", md: "0.75rem" }, opacity: 0.9 }}>
                LUXURY HAIR CONCIERGE
              </Typography>
              
              <Typography variant={isMobile ? "h4" : "h2"} sx={{ 
                ...typographyStyles, 
                fontWeight: 800, 
                mb: 2.5, 
                letterSpacing: "-0.01em", 
                lineHeight: { xs: 1.3, md: 1.1 },
                fontSize: { xs: "2rem", md: "4rem" },
                color: "#FFF"
              }}>
                <Box component="span" sx={{ color: "#FFF", mb: 0.5, display: "block" }}>Your Hair's Unique</Box>
                <Box component="span" sx={{ color: SAND_GOLD, fontStyle: "italic", fontWeight: 400 }}>Perfect Routine</Box>
              </Typography>

              <Typography variant="body1" sx={{ 
                color: "rgba(255,255,255,0.85)", 
                mb: { xs: 5, md: 6 }, 
                maxWidth: "480px", 
                mx: "auto", 
                fontWeight: 500, 
                fontSize: { xs: "0.9rem", md: "1.05rem" },
                lineHeight: 1.7
              }}>
                Discover an AI-powered analysis tailored to your specific texture and environment. 
                Real science meets luxury care.
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/onboarding")}
                sx={{
                  bgcolor: "#266837",
                  color: "#FFF",
                  px: { xs: 5, md: 7 },
                  py: { xs: 1.8, md: 2.2 },
                  borderRadius: "100px",
                  fontSize: { xs: "0.95rem", md: "1.1rem" },
                  fontWeight: 800,
                  textTransform: "none",
                  boxShadow: `0 10px 40px rgba(0,0,0,0.3)`,
                  "&:hover": { bgcolor: alpha("#266837", 0.9), transform: "translateY(-2px)" },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                Start Free Analysis
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* 2. Social Proof / Expert Section */}
      <Box sx={{ 
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        scrollSnapAlign: "start",
        bgcolor: alpha(DARK_GREEN, 0.02), 
        borderBottom: "1px solid", 
        borderColor: alpha(DARK_GREEN, 0.05),
        position: "relative",
        zIndex: 5,
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative", textAlign: { xs: "center", md: "left" } }}>
                <Avatar 
                  sx={{ width: { xs: 60, md: 70 }, height: { xs: 60, md: 70 }, mb: 2, bgcolor: DARK_GREEN, boxShadow: 6, mx: { xs: "auto", md: 0 } }}>
                  <VerifiedIcon sx={{ fontSize: { xs: 30, md: 35 } }} />
                </Avatar>
                <Typography variant="h6" sx={{ ...typographyStyles, fontWeight: 800, mb: 1, color: DARK_GREEN, fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                  Built by Experts
                </Typography>
                <Typography variant="body2" sx={{ color: MEDIUM_GREEN, fontSize: { xs: "0.85rem", md: "0.95rem" }, lineHeight: 1.6, maxWidth: 450, mx: { xs: "auto", md: 0 } }}>
                  Our framework is developed by hair care specialists who have served over 
                  <Box component="span" sx={{ fontWeight: 800, color: DARK_GREEN }}> 500 curlers across the Middle East</Box>. We understand the unique challenges of heat, humidity, and water quality.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1.5}>
                {[
                  { icon: <ScienceIcon sx={{ fontSize: 18 }} />, title: "3D Hair Analysis", desc: "Granular assessment of porosity, texture, and damage." },
                  { icon: <HealthAndSafetyIcon sx={{ fontSize: 18 }} />, title: "Scalp Health First", desc: "Routines designed to protect and nourish from the root." },
                  { icon: <AutoAwesomeIcon sx={{ fontSize: 18 }} />, title: "Bespoke Curation", desc: "No generic templates. Every routine is generated from scratch." }
                ].map((item, i) => (
                  <Card key={i} elevation={0} sx={{ p: 2, borderRadius: 3, display: "flex", gap: 2, alignItems: "center", bgcolor: "#FFF", border: "1px solid", borderColor: alpha(DARK_GREEN, 0.05) }}>
                    <Box sx={{ color: DARK_GREEN, display: "flex" }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: DARK_GREEN, fontSize: { xs: "0.8rem", md: "0.85rem" } }}>{item.title}</Typography>
                      <Typography variant="caption" sx={{ color: MEDIUM_GREEN, fontSize: "0.75rem" }}>{item.desc}</Typography>
                    </Box>
                  </Card>
                ))}
            </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 3. REFINED PATH TO PERFECT HAIR: CAROUSEL SECTION */}
      <Box sx={{ 
        height: "100vh",
        minHeight: "650px",
        display: "flex",
        alignItems: "center",
        scrollSnapAlign: "start",
        py: 12, 
        overflow: "hidden" 
      }}>
          <Stack spacing={4} sx={{ textAlign: "center", width: "100%" }}>
            <Typography variant="h4" sx={{ ...typographyStyles, fontWeight: 800, color: DARK_GREEN }}>
              Your Path to Perfect Hair
            </Typography>
            
            <Box 
              ref={scrollContainerRef}
              sx={{ 
                display: "flex", 
                gap: 3, 
                overflowX: "auto", 
                pb: 4,
                width: "100%",
                px: { xs: 2, md: 0 },
                scrollSnapType: "x mandatory",
                "&::-webkit-scrollbar": { display: "none" },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {features.map((item, i) => (
                <Box key={i} sx={{ minWidth: { xs: "280px", md: "350px" }, scrollSnapAlign: "center" }}>
                  <Card 
                    elevation={0} 
                    sx={{ 
                      p: 4, 
                      height: "100%", 
                      display: "flex", 
                      flexDirection: "column", 
                      bgcolor: alpha(DARK_GREEN, 0.02),
                      border: "1px solid",
                      borderColor: alpha(DARK_GREEN, 0.08),
                      borderRadius: 6,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: SAGE_GREEN,
                        bgcolor: "#FFF",
                        transform: "translateY(-8px)",
                        boxShadow: `0 12px 30px ${alpha(DARK_GREEN, 0.06)}`
                      }
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: alpha(DARK_GREEN, 0.05), display: "flex", alignItems: "center", justifyContent: "center", color: DARK_GREEN }}>
                        {item.icon}
                      </Box>
                      <Typography variant="h2" sx={{ color: alpha(DARK_GREEN, 0.05), fontWeight: 900, lineHeight: 1 }}>
                        {item.step}
                      </Typography>
                    </Box>
                    
                    <Typography variant="caption" sx={{ color: SAGE_GREEN, fontWeight: 700, letterSpacing: 1.5, mb: 1, display: "block" }}>
                      {item.outcome.toUpperCase()}
                    </Typography>
                    
                    <Typography variant="h6" sx={{ fontWeight: 800, color: DARK_GREEN, mb: 2 }}>{item.title}</Typography>
                    
                    <Typography variant="body2" sx={{ color: MEDIUM_GREEN, lineHeight: 1.6, flexGrow: 1 }}>{item.desc}</Typography>
                    
                    <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: alpha(DARK_GREEN, 0.05) }}>
                      <Button 
                        variant="text" 
                        endIcon={<NorthEastIcon sx={{ fontSize: 14 }} />}
                        sx={{ color: DARK_GREEN, fontWeight: 700, p: 0, textTransform: "none", opacity: 0.6, "&:hover": { opacity: 1, bgcolor: "transparent" } }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
               <Box sx={{ position: "relative", width: 40, height: 2, bgcolor: alpha(DARK_GREEN, 0.1), borderRadius: 1 }}>
                  <Box sx={{ 
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    width: "40%", 
                    height: "100%", 
                    bgcolor: DARK_GREEN, 
                    borderRadius: 1, 
                    animation: "swipeGuide 2s infinite ease-in-out" 
                  }} />
               </Box>
               <Typography variant="caption" sx={{ color: DARK_GREEN, fontWeight: 700, opacity: 0.6, letterSpacing: 1 }}>
                  SWIPE FOR MORE
               </Typography>
            </Box>
          </Stack>

        <style jsx global>{`
          @keyframes swipeGuide {
            0% { left: 0; width: 30%; }
            50% { left: 70%; width: 30%; }
            100% { left: 0; width: 30%; }
          }
        `}</style>
      </Box>

      {/* 4. Footer / Final CTA */}
      <Box sx={{ 
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scrollSnapAlign: "start",
        bgcolor: DARK_GREEN, 
        color: "#FFF", 
        textAlign: "center" 
      }}>
        <Container maxWidth="sm">
          <Typography variant="h5" sx={{ ...typographyStyles, fontWeight: 700, mb: 3, fontSize: { xs: "1.5rem", md: "2rem" } }}>
            Ready for your best hair days?
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => router.push("/onboarding")}
            sx={{ bgcolor: "#FFF", color: DARK_GREEN, px: 5, py: 1.5, borderRadius: "100px", fontWeight: 800, textTransform: "none", fontSize: "0.95rem", "&:hover": { bgcolor: SAND_GOLD, color: DARK_GREEN } }}
          >
            Start My Analysis
          </Button>
          <Typography variant="body2" sx={{ mt: 4, opacity: 0.5, fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} Emerson Hair & Beauty. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
