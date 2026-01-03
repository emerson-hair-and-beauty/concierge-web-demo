"use client";
import ScalpConditionStep from "@/components/steps/ScalpConditionStep";
import { Box, Button, LinearProgress, Typography, useTheme, useMediaQuery } from "@mui/material";
import { typographyStyles } from "../../styles/typographyStyles";
import HairDensityStep from "@/components/steps/HairDensityStep";

import DamageLevelStep from "@/components/steps/DamageLevelStep";
import PorosityStep from "@/components/steps/PorosityStep";

import React, { useState } from "react";
import HairTextureStep from "@/components/steps/HairTextureStep";
import { useRouter } from "next/navigation";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { useUserData } from "@/hooks/useUserData";

// Define the custom color for easy reuse
const CUSTOM_COLOR = "#95ABA1";

import { calculatePorosityLevel } from "@/utils/porosityScoring";
import { POROSITY_QUESTIONS } from "@/constants/onboardingData";

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  // Map active step index -> key used in the onboarding store
  const STEP_KEYS = [
    "scalp_condition",
    "hair_density",
    "hair_porosity",
    "is_damaged",
    "hair_texture",
  ];

  // read persisted selections from the zustand store
  const selections = useOnboardingStore((s) => s.selections) || {};
  const setSelection = useOnboardingStore((s) => s.setSelection);
  const saveSummary = useOnboardingStore((s) => s.saveSummary);
  const { user } = useUserData();

  // Helper to check if the current step is fully answered
  const isStepComplete = (key, value) => {
    if (!value) return false;
    if (key === "hair_porosity") {
      // Check if all questions in POROSITY_QUESTIONS have an answer in the value object
      return POROSITY_QUESTIONS.every(q => value[q.key] !== undefined && value[q.key] !== null);
    }
    return true; // Other steps are simple selections
  };

  // compute whether the current step has a selection
  const currentStepKey = STEP_KEYS[activeStep];
  const isSelected = isStepComplete(currentStepKey, selections[currentStepKey]);

  const steps = [
    {
      title: "Scalp Condition",
      component: <ScalpConditionStep />,
    },
    {
      title: "Density",
      component: <HairDensityStep />,
    },
    { title: "Porosity", component: <PorosityStep /> },
    { title: "Damage Level", component: <DamageLevelStep /> },
    {
      title: "Hair Texture",
      component: <HairTextureStep />,
    },
  ];

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;
  const totalSteps = steps.length;

  // Calculate progress percentage (activeStep + 1 / totalSteps * 100)
  const progress = ((activeStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleComplete = () => {
    if (isLastStep) {
      // Calculate porosity level
      const hairPorosity = selections.hair_porosity;
      if (hairPorosity) {
        const level = calculatePorosityLevel(hairPorosity);
        setSelection("porosity_level", level);
      }
      
      // Save summary to Firestore if user is logged in
      if (user) {
        saveSummary(user.uid);
      }
      
      router.push("/routine");
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{ 
      height: ["100vh", "100dvh"],
      display: "flex",
      flexDirection: "column",
      bgcolor: "#FDFCF9",
      overflow: "hidden",
      overflowX: "hidden"
    }}>
      {/* 1. Fixed Header: Progress Bar */}
      <Box sx={{ 
        width: "100%", 
        px: { xs: 2, sm: 4, md: 8 }, 
        pt: { xs: 2, md: 4 }, 
        pb: 1,
        flexShrink: 0 
      }}>
        <Box sx={{ maxWidth: "800px", mx: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box sx={{ flexGrow: 1, mr: 2 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: { xs: 6, md: 8 },
                  borderRadius: 4,
                  backgroundColor: "rgba(0,0,0,0.05)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#2D5A4A",
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
            <Box sx={{ minWidth: 40 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ...typographyStyles, fontWeight: 600, fontSize: "0.85rem" }}
              >
                {`${activeStep + 1}/${totalSteps}`}
              </Typography>
            </Box>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              ...typographyStyles, 
              color: "#2D5A4A", 
              fontWeight: 700,
              fontSize: { xs: "1rem", md: "1.25rem" }
            }}
          >
            {steps[activeStep].title}
          </Typography>
        </Box>
      </Box>

      {/* 2. Scrollable Body: Current Step Component */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: "auto", 
        width: "100%",
        px: { xs: 2, sm: 4, md: 8 },
        pb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        WebkitOverflowScrolling: "touch"
      }}>
        <Box sx={{ 
          width: "100%", 
          maxWidth: "800px",
          mt: { xs: 1, md: 2 }
        }}>
          {steps[activeStep].component}
        </Box>
      </Box>

      {/* 3. Anchored Footer: Navigation Buttons */}
      <Box sx={{ 
        width: "100%",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, md: 3 },
        flexShrink: 0,
        bgcolor: "#FFF",
        borderTop: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.02)"
      }}>
        <Box sx={{ 
          maxWidth: "800px", 
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          gap: 2
        }}>
          <Button
            onClick={handleBack}
            disabled={isFirstStep}
            variant="outlined"
            size={isMobile ? "medium" : "large"}
            sx={{
              minWidth: { xs: "90px", sm: 120 },
              color: CUSTOM_COLOR,
              borderColor: CUSTOM_COLOR,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                borderColor: CUSTOM_COLOR,
                backgroundColor: `${CUSTOM_COLOR}15`,
              },
              "&.Mui-disabled": {
                borderColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            Previous
          </Button>

          <Button
            onClick={isLastStep ? handleComplete : handleNext}
            variant="contained"
            disabled={!isSelected}
            size={isMobile ? "medium" : "large"}
            sx={{
              minWidth: { xs: "140px", sm: 180 },
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: { xs: "0.95rem", md: "1rem" },
              backgroundColor: isSelected ? "#426A5B" : CUSTOM_COLOR,
              boxShadow: isSelected ? "0 4px 12px rgba(66, 106, 91, 0.2)" : "none",
              "&:hover": {
                backgroundColor: isSelected ? "#365746" : "#7D948A",
              },
            }}
          >
            {isLastStep ? "Complete Analysis" : "Next Step"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
