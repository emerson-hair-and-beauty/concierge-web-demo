"use client";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { alpha, useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

// Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import OpacityIcon from "@mui/icons-material/Opacity";
import WavesIcon from "@mui/icons-material/Waves";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AirIcon from "@mui/icons-material/Air";
import CheckIcon from "@mui/icons-material/Check";
import RestoreIcon from "@mui/icons-material/Restore";

import useOnboardingStore from "@/hooks/useOnboardingStore";
import { useUserData } from "@/hooks/useUserData";
import { signOutUser } from "@/config/auth";
import { typographyStyles } from "../../styles/typographyStyles";
import { SCALP_OPTIONS } from "../../constants/onboardingData";

const DARK_GREEN = "#2D5A4A";
const MEDIUM_GREEN = "#426A5B";
const SAGE_GREEN = "#95ABA1";
const LIGHT_BG = "#E8F4F0";

/**
 * SidePagination Indicator Component
 */
const SidePagination = ({ activeSection, totalSections, onNavigate, disabled }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: 16, md: 32 },
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        zIndex: 1000,
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? "none" : "auto",
        transition: "opacity 0.3s ease",
      }}
    >
      {[...Array(totalSections)].map((_, i) => (
        <Box
          key={i}
          onClick={() => !disabled && onNavigate(i)}
          sx={{
            width: activeSection === i ? { xs: 12, md: 16 } : 8,
            height: activeSection === i ? 4 : 8,
            borderRadius: 4,
            bgcolor: activeSection === i ? DARK_GREEN : alpha(DARK_GREEN, 0.2),
            cursor: disabled ? "default" : "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: disabled ? alpha(DARK_GREEN, 0.2) : alpha(DARK_GREEN, 0.5),
            },
          }}
        />
      ))}
    </Box>
  );
};

export default function ProfileSummary({ onViewRoutine = () => {} }) {
  const theme = useTheme();
  const router = useRouter();
  const selections = useOnboardingStore((s) => s.selections) || {};
  const resetSelections = useOnboardingStore((s) => s.resetSelections);
  const { isAuthenticated } = useUserData();
  const { apiRoutine } = selections;

  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  // Intersection Observer to detect active section
  useEffect(() => {
    const options = {
      root: containerRef.current,
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute("data-section-index"));
          setActiveSection(index);
        }
      });
    }, options);

    const sections = containerRef.current?.querySelectorAll(".snap-section");
    sections?.forEach((section) => observer.observe(section));

    return () => sections?.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (index) => {
    const sections = containerRef.current?.querySelectorAll(".snap-section");
    if (sections?.[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
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

  const items = [
    { key: "porosity", label: "Porosity", value: selections.porosity_level, Icon: OpacityIcon },
    { key: "texture", label: "Texture", value: selections.hair_texture, Icon: WavesIcon },
    { key: "density", label: "Density", value: selections.hair_density, Icon: PeopleIcon },
    { key: "damage", label: "Damage Level", value: selections.is_damaged, Icon: FavoriteIcon },
    { key: "scalp", label: "Scalp Type", value: selections.scalp_condition, Icon: AirIcon },
  ];

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100vh",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        bgcolor: "#FDFCF9",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        
      }}
    >
      <SidePagination 
        activeSection={activeSection} 
        totalSections={3} 
        onNavigate={scrollToSection} 
        disabled={!isAuthenticated}
      />

      {/* SECTION 1: HEADER */}
      <Box
        className="snap-section"
        data-section-index="0"
        sx={{
          height: "100vh",
          scrollSnapAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background: `linear-gradient(135deg, ${alpha(DARK_GREEN, 0.03)} 0%, ${LIGHT_BG} 100%)`,
          px: 3,
        }}
      >
        <Box sx={{ maxWidth: 420, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              sx={{
                position: "absolute",
                top: 24,
                right: 24,
                color: DARK_GREEN,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Logout
            </Button>
          )}

          <Box sx={{ width: 64, height: 64, borderRadius: "50%", bgcolor: alpha(DARK_GREEN, 0.1), display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
            <AutoAwesomeIcon sx={{ fontSize: 32, color: DARK_GREEN }} />
          </Box>

          <Typography variant="h4" sx={{ ...typographyStyles, fontWeight: 700, color: DARK_GREEN, mb: 1.5, fontSize: { xs: "1.75rem", md: "2.5rem" } }}>
            Analysis Complete
          </Typography>
          <Typography variant="body1" sx={{ ...typographyStyles, color: "text.secondary", mb: 4, fontSize: "0.95rem" }}>
            We've analyzed your responses to create your personalized routine.
          </Typography>

          <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: 1,
            animation: "pulse 2s infinite",
            cursor: "pointer",
            mt: 4
          }} onClick={() => scrollToSection(1)}>
            <Typography variant="caption" sx={{ ...typographyStyles, color: DARK_GREEN, fontWeight: 700, letterSpacing: 1 }}>
              SCROLL TO VIEW RESULTS
            </Typography>
            <Box sx={{ width: 1.5, height: 32, bgcolor: DARK_GREEN, borderRadius: 1 }} />
          </Box>
        </Box>

        <style jsx global>{`
          @keyframes pulse {
            0% { opacity: 1; transform: translateY(0); }
            50% { opacity: 0.7; transform: translateY(5px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </Box>

      {/* SECTION 2: RESULTS */}
      <Box
        className="snap-section"
        data-section-index="1"
        sx={{
          height: "100vh",
          scrollSnapAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
          bgcolor: "#FDFCF9",
        }}
      >
        <Box sx={{ maxWidth: 420, width: "100%" }}>
          <Card
            elevation={0}
            sx={{
              width: "100%",
              p: { xs: 2.5, md: 3 },
              borderRadius: 5,
              border: "1px solid",
              borderColor: "rgba(0,0,0,0.08)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
            }}
          >
            <Typography variant="h6" align="center" sx={{ ...typographyStyles, mb: 3, color: DARK_GREEN, fontWeight: 700 }}>
              Your Hair Profile
            </Typography>

            <Stack spacing={2}>
              {items.map((item) => (
                <Box
                  key={item.key}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 1.5,
                    bgcolor: "#F8FAF9",
                    borderRadius: 3,
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateX(8px)" }
                  }}
                >
                  <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: alpha(DARK_GREEN, 0.08), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <item.Icon sx={{ fontSize: 20, color: DARK_GREEN }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ ...typographyStyles, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700, fontSize: "0.65rem" }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body1" sx={{ ...typographyStyles, fontWeight: 600, color: DARK_GREEN, fontSize: "0.95rem" }}>
                      {item.value ?? "—"}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Card>
        </Box>
      </Box>

      {/* SECTION 3: CTA */}
      <Box
        className="snap-section"
        data-section-index="2"
        sx={{
          //border: '1px solid red',
          height: "100vh",
          scrollSnapAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
          background: `linear-gradient(135deg, ${alpha(SAGE_GREEN, 0.05)} 0%, #FFF 100%)`,
        }}
      >
        <Box sx={{ maxWidth: 420, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h5" sx={{ ...typographyStyles, fontWeight: 700, color: DARK_GREEN, mb: 3 }}>
            What's Next?
          </Typography>

          <Box sx={{ textAlign: "left", mb: 4, bgcolor: alpha(DARK_GREEN, 0.02), p: 3, borderRadius: 5, border: "1px dashed", borderColor: alpha(DARK_GREEN, 0.15) }}>
            <List spacing={2}>
              {[
                { text: "Custom product recommendations", sub: "Based on your 3D hair analysis" },
                { text: "Step-by-step care routine", sub: "Daily and weekly schedules" },
                { text: "Expert guidance", sub: "Specifically for your hair texture" },
              ].map((item, i) => (
                <ListItem key={i} disableGutters sx={{ alignItems: "flex-start", mb: 1.5 }}>
                  <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                    <CheckIcon sx={{ color: DARK_GREEN, fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    secondary={item.sub}
                    primaryTypographyProps={{ sx: { ...typographyStyles, fontWeight: 700, color: DARK_GREEN, fontSize: "0.85rem" } }}
                    secondaryTypographyProps={{ sx: { ...typographyStyles, color: "text.secondary", fontSize: "0.75rem" } }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Stack spacing={1.5} sx={{ width: "100%" }}>
            {apiRoutine ? (
              <Button
                variant="outlined"
                fullWidth
                onClick={() => router.push("/onboarding")}
                sx={{ height: 56, borderRadius: 3, fontSize: "0.95rem", textTransform: "none", borderColor: DARK_GREEN, color: DARK_GREEN, fontWeight: 700, borderWidth: 1.5, "&:hover": { borderWidth: 1.5, bgcolor: alpha(DARK_GREEN, 0.05) } }}
              >
                Retake Quiz / Update Profile
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                onClick={onViewRoutine}
                sx={{ height: 56, borderRadius: 3, fontSize: "0.95rem", textTransform: "none", bgcolor: DARK_GREEN, fontWeight: 700, "&:hover": { bgcolor: MEDIUM_GREEN } }}
              >
                {isAuthenticated ? "Create My Routine" : "Sign Up with Google"}
              </Button>
            )}
            
            <Button
              variant="text"
              startIcon={<RestoreIcon />}
              onClick={resetSelections}
              sx={{ color: "text.secondary", textTransform: "none", fontWeight: 500 }}
            >
              Reset All Progress
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
