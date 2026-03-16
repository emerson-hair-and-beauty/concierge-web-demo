"use client";
import React from "react";
import { Box } from "@mui/material";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { HUMIDITY_RESPONSE_OPTIONS } from "@/constants/onboardingData";
import SingleRadioOnboarding from "@/components/onboarding/SingleRadioOnboarding";

export default function HumidityResponseStep() {
  // Stored as the label string (consistent with existing steps like HairDensityStep)
  const value = useOnboardingStore((s) => s.selections.humidity_response);

  const description = {
    title: "In humid weather, your curls usually…",
    description:
      "Humidity is one of the biggest curl challenges in the GCC. Understanding how your hair responds helps us build a protective routine.",
    footnote: "Humidity Response",
  };

  return (
    <Box>
      <SingleRadioOnboarding
        options={HUMIDITY_RESPONSE_OPTIONS}
        description={description}
        stepKey="humidity_response"
        value={value}
      />
    </Box>
  );
}
