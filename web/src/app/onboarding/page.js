"use client";
import ScalpConditionStep from "@/components/steps/ScalpConditionStep";
import { Box, Button, LinearProgress, Typography } from "@mui/material"; // Imported LinearProgress and Typography
import HairDensityStep from "@/components/steps/HairDensityStep";
import DamageLevelStep from "@/components/steps/DamageLevelStep";

import React, { useState } from "react";
import HairTextureStep from "@/components/steps/HairTextureStep";

// Define the custom color for easy reuse
const CUSTOM_COLOR = "#95ABA1";

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Scalp Condition",
      component: <ScalpConditionStep />,
    },
    {
      title: "Density",
      component: <HairDensityStep />,
    },
    // { title: "Porosity", component: <PorosityStep /> },
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

  const handleBack = () => {
    if (!isFirstStep) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{ width: { xs: "90%", sm: "70%", md: "50%" }, mx: "auto", mt: 5 }}>
      {/* 1. Linear Progress Bar with Label */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e0e0e0", // Light grey background track
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2D5A4A", // Custom color for the fill
                borderRadius: 5,
              },
            }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${
            activeStep + 1
          }/${totalSteps}`}</Typography>
        </Box>
      </Box>

      {/* 2. Current Step Component */}
      {steps[activeStep].component}

      {/* 3. Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          width: "100%",
          mx: "auto",
        }}
      >
        <Button
          onClick={handleBack}
          disabled={isFirstStep}
          variant="outlined"
          sx={{
            color: CUSTOM_COLOR,
            borderColor: CUSTOM_COLOR,
            "&:hover": {
              borderColor: CUSTOM_COLOR,
              backgroundColor: `${CUSTOM_COLOR}15`,
            },
            "&.Mui-disabled": {
              borderColor: "rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          variant="contained"
          sx={{
            backgroundColor: CUSTOM_COLOR,
            "&:hover": {
              backgroundColor: "#7D948A",
            },
            ...(isLastStep && {
              backgroundColor: CUSTOM_COLOR,
              "&:hover": {
                backgroundColor: "#7D948A",
              },
            }),
          }}
        >
          {isLastStep ? "Complete" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
